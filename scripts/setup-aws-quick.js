#!/usr/bin/env node

/**
 * Quick AWS Setup Script for Agilent Maritime
 * This script sets up the basic AWS infrastructure needed for deployment
 */

const { S3Client, CreateBucketCommand, PutBucketPolicyCommand } = require("@aws-sdk/client-s3");
const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb");
const { IAMClient, CreateUserCommand, AttachUserPolicyCommand, CreateAccessKeyCommand } = require("@aws-sdk/client-iam");
const fs = require("fs");
const path = require("path");
require('dotenv').config();

// Configuration
const AWS_REGION = process.env.VITE_AWS_REGION || 'us-east-1';
const S3_BUCKET_NAME = process.env.VITE_S3_BUCKET_NAME || `agilent-maritime-assets-${Date.now()}`;
const DYNAMODB_TABLE_NAME = process.env.VITE_DYNAMODB_TABLE_NAME || 'AgilentMaritimeContacts';

// Initialize AWS clients
const s3Client = new S3Client({ region: AWS_REGION });
const dynamodbClient = new DynamoDBClient({ region: AWS_REGION });
const iamClient = new IAMClient({ region: AWS_REGION });

async function createS3Bucket() {
  console.log(`\n🚀 Creating S3 bucket: ${S3_BUCKET_NAME}`);
  
  try {
    // Create bucket
    await s3Client.send(new CreateBucketCommand({ 
      Bucket: S3_BUCKET_NAME,
      CreateBucketConfiguration: {
        LocationConstraint: AWS_REGION === 'us-east-1' ? undefined : AWS_REGION
      }
    }));
    console.log(`✅ S3 bucket created: ${S3_BUCKET_NAME}`);

    // Set bucket policy for public read access
    const bucketPolicy = {
      Version: "2012-10-17",
      Statement: [
        {
          Sid: "PublicReadGetObject",
          Effect: "Allow",
          Principal: "*",
          Action: "s3:GetObject",
          Resource: `arn:aws:s3:::${S3_BUCKET_NAME}/public/*`
        }
      ]
    };

    await s3Client.send(new PutBucketPolicyCommand({
      Bucket: S3_BUCKET_NAME,
      Policy: JSON.stringify(bucketPolicy)
    }));
    console.log(`✅ S3 bucket policy set for public read access`);

    return S3_BUCKET_NAME;
  } catch (error) {
    if (error.name === 'BucketAlreadyOwnedByYou' || error.name === 'BucketAlreadyExists') {
      console.log(`⚠️  S3 bucket ${S3_BUCKET_NAME} already exists`);
      return S3_BUCKET_NAME;
    } else {
      console.error(`❌ Error creating S3 bucket:`, error.message);
      throw error;
    }
  }
}

async function createDynamoDBTable() {
  console.log(`\n🚀 Creating DynamoDB table: ${DYNAMODB_TABLE_NAME}`);
  
  try {
    await dynamodbClient.send(new CreateTableCommand({
      TableName: DYNAMODB_TABLE_NAME,
      KeySchema: [
        { AttributeName: "id", KeyType: "HASH" }
      ],
      AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }));
    console.log(`✅ DynamoDB table created: ${DYNAMODB_TABLE_NAME}`);
    return DYNAMODB_TABLE_NAME;
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log(`⚠️  DynamoDB table ${DYNAMODB_TABLE_NAME} already exists`);
      return DYNAMODB_TABLE_NAME;
    } else {
      console.error(`❌ Error creating DynamoDB table:`, error.message);
      throw error;
    }
  }
}

async function createIAMUser() {
  console.log(`\n🚀 Creating IAM user for deployment`);
  
  const userName = 'agilent-maritime-deployer';
  
  try {
    // Create user
    await iamClient.send(new CreateUserCommand({
      UserName: userName,
      Path: '/'
    }));
    console.log(`✅ IAM user created: ${userName}`);

    // Attach policies
    const policies = [
      'arn:aws:iam::aws:policy/AdministratorAccess-Amplify',
      'arn:aws:iam::aws:policy/AmazonS3FullAccess',
      'arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess'
    ];

    for (const policyArn of policies) {
      try {
        await iamClient.send(new AttachUserPolicyCommand({
          UserName: userName,
          PolicyArn: policyArn
        }));
        console.log(`✅ Policy attached: ${policyArn.split('/').pop()}`);
      } catch (error) {
        console.log(`⚠️  Policy may already be attached: ${policyArn.split('/').pop()}`);
      }
    }

    // Create access key
    const accessKeyResponse = await iamClient.send(new CreateAccessKeyCommand({
      UserName: userName
    }));

    console.log(`\n🔑 Access Key Created:`);
    console.log(`Access Key ID: ${accessKeyResponse.AccessKey.AccessKeyId}`);
    console.log(`Secret Access Key: ${accessKeyResponse.AccessKey.SecretAccessKey}`);
    console.log(`\n⚠️  IMPORTANT: Save these credentials securely!`);

    return {
      accessKeyId: accessKeyResponse.AccessKey.AccessKeyId,
      secretAccessKey: accessKeyResponse.AccessKey.SecretAccessKey
    };
  } catch (error) {
    if (error.name === 'EntityAlreadyExistsException') {
      console.log(`⚠️  IAM user ${userName} already exists`);
      return null;
    } else {
      console.error(`❌ Error creating IAM user:`, error.message);
      throw error;
    }
  }
}

async function updateEnvFile(bucketName, tableName, credentials) {
  console.log(`\n📝 Updating environment file`);
  
  const envPath = path.join(process.cwd(), '.env');
  let envContent = '';
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // Update or add environment variables
  const updates = {
    'VITE_AWS_REGION': AWS_REGION,
    'VITE_S3_BUCKET_NAME': bucketName,
    'VITE_DYNAMODB_TABLE_NAME': tableName
  };

  if (credentials) {
    updates['VITE_AWS_ACCESS_KEY_ID'] = credentials.accessKeyId;
    updates['VITE_AWS_SECRET_ACCESS_KEY'] = credentials.secretAccessKey;
  }

  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `${key}=${value}`);
    } else {
      envContent += `\n${key}=${value}`;
    }
  }

  fs.writeFileSync(envPath, envContent);
  console.log(`✅ Environment file updated: ${envPath}`);
}

async function main() {
  console.log(`\n🚀 Starting AWS Infrastructure Setup for Agilent Maritime`);
  console.log(`Region: ${AWS_REGION}`);
  console.log(`S3 Bucket: ${S3_BUCKET_NAME}`);
  console.log(`DynamoDB Table: ${DYNAMODB_TABLE_NAME}`);

  try {
    // Check if AWS credentials are configured
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.log(`\n⚠️  AWS credentials not found in environment`);
      console.log(`Please run: aws configure`);
      console.log(`Or set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables`);
      process.exit(1);
    }

    // Create infrastructure
    const bucketName = await createS3Bucket();
    const tableName = await createDynamoDBTable();
    const credentials = await createIAMUser();
    
    // Update environment file
    await updateEnvFile(bucketName, tableName, credentials);

    console.log(`\n✅ AWS Infrastructure Setup Complete!`);
    console.log(`\n📋 Next Steps:`);
    console.log(`1. Upload assets: npm run upload-assets`);
    console.log(`2. Build application: npm run build`);
    console.log(`3. Deploy to Amplify: Follow AWS_DEPLOYMENT_PLAN.md`);
    console.log(`\n🔗 Resources Created:`);
    console.log(`- S3 Bucket: ${bucketName}`);
    console.log(`- DynamoDB Table: ${tableName}`);
    if (credentials) {
      console.log(`- IAM User: agilent-maritime-deployer`);
    }

  } catch (error) {
    console.error(`\n❌ Setup failed:`, error.message);
    process.exit(1);
  }
}

// Run the setup
if (require.main === module) {
  main();
}

module.exports = { createS3Bucket, createDynamoDBTable, createIAMUser };
