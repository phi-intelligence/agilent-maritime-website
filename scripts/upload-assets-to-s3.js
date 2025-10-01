#!/usr/bin/env node

/**
 * S3 Asset Upload Script for Agilent Maritime
 * Uploads all organized assets to S3 bucket
 */

import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// S3 Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'agilent-maritime-assets';
const ASSETS_DIR = join(__dirname, '..', 'client', 'public', 'assets');

// MIME type mapping
const mimeTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.json': 'application/json',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.html': 'text/html',
};

function getMimeType(filename) {
  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return mimeTypes[ext] || 'application/octet-stream';
}

async function uploadFile(filePath, s3Key) {
  try {
    const fileContent = readFileSync(filePath);
    const mimeType = getMimeType(filePath);
    
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: fileContent,
      ContentType: mimeType,
      CacheControl: 'public, max-age=31536000', // 1 year cache
      Metadata: {
        'uploaded-by': 'agilent-maritime-deployment',
        'upload-date': new Date().toISOString(),
      },
    });

    await s3Client.send(command);
    console.log(`✅ Uploaded: ${s3Key}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to upload ${s3Key}:`, error.message);
    return false;
  }
}

async function getAllFiles(dir, baseDir = dir) {
  const files = [];
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...await getAllFiles(fullPath, baseDir));
    } else {
      const relativePath = relative(baseDir, fullPath);
      files.push({
        localPath: fullPath,
        s3Key: `public/${relativePath}`,
      });
    }
  }
  
  return files;
}

async function checkExistingFiles() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: 'public/',
    });
    
    const response = await s3Client.send(command);
    return response.Contents?.map(obj => obj.Key) || [];
  } catch (error) {
    console.log('No existing files found or bucket is empty');
    return [];
  }
}

async function main() {
  console.log('🚀 Starting S3 Asset Upload...\n');
  
  // Check if required environment variables are set
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.error('❌ AWS credentials not found. Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY');
    process.exit(1);
  }
  
  if (!process.env.S3_BUCKET_NAME) {
    console.error('❌ S3_BUCKET_NAME not found. Please set S3_BUCKET_NAME environment variable');
    process.exit(1);
  }
  
  console.log(`📦 Bucket: ${BUCKET_NAME}`);
  console.log(`📁 Assets Directory: ${ASSETS_DIR}\n`);
  
  try {
    // Get all files to upload
    const files = await getAllFiles(ASSETS_DIR);
    console.log(`📋 Found ${files.length} files to upload\n`);
    
    // Check existing files
    const existingFiles = await checkExistingFiles();
    console.log(`📊 Found ${existingFiles.length} existing files in S3\n`);
    
    let uploadedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    // Upload files
    for (const file of files) {
      if (existingFiles.includes(file.s3Key)) {
        console.log(`⏭️  Skipped (exists): ${file.s3Key}`);
        skippedCount++;
        continue;
      }
      
      const success = await uploadFile(file.localPath, file.s3Key);
      if (success) {
        uploadedCount++;
      } else {
        errorCount++;
      }
    }
    
    console.log('\n📊 Upload Summary:');
    console.log(`✅ Uploaded: ${uploadedCount} files`);
    console.log(`⏭️  Skipped: ${skippedCount} files`);
    console.log(`❌ Errors: ${errorCount} files`);
    console.log(`📦 Total: ${files.length} files`);
    
    if (errorCount === 0) {
      console.log('\n🎉 All assets uploaded successfully!');
      console.log(`🌐 Assets available at: https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/public/`);
    } else {
      console.log('\n⚠️  Some files failed to upload. Please check the errors above.');
    }
    
  } catch (error) {
    console.error('❌ Upload failed:', error);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);
