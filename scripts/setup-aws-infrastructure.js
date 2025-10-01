#!/usr/bin/env node

/**
 * AWS Infrastructure Setup Script
 * Creates DynamoDB table and S3 bucket for Agilent Maritime
 */

import { DynamoDBClient, CreateTableCommand, DescribeTableCommand } from '@aws-sdk/client-dynamodb';
import { S3Client, CreateBucketCommand, PutBucketCorsCommand, HeadBucketCommand } from '@aws-sdk/client-s3';
import { IAMClient, CreateRoleCommand, AttachRolePolicyCommand } from '@aws-sdk/client-iam';

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const iamClient = new IAMClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'agilent-maritime-contacts';
const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'agilent-maritime-assets';
const REGION = process.env.AWS_REGION || 'us-east-1';

async function createDynamoDBTable() {
  console.log('🗄️  Setting up DynamoDB table...');
  
  try {
    // Check if table exists
    await dynamoClient.send(new DescribeTableCommand({ TableName: TABLE_NAME }));
    console.log(`✅ DynamoDB table '${TABLE_NAME}' already exists`);
    return;
  } catch (error) {
    if (error.name !== 'ResourceNotFoundException') {
      throw error;
    }
  }
  
  try {
    const command = new CreateTableCommand({
      TableName: TABLE_NAME,
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH', // Partition key
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST', // On-demand billing
      Tags: [
        {
          Key: 'Project',
          Value: 'AgilentMaritime',
        },
        {
          Key: 'Environment',
          Value: 'Production',
        },
      ],
    });
    
    await dynamoClient.send(command);
    console.log(`✅ DynamoDB table '${TABLE_NAME}' created successfully`);
  } catch (error) {
    console.error('❌ Failed to create DynamoDB table:', error.message);
    throw error;
  }
}

async function createS3Bucket() {
  console.log('☁️  Setting up S3 bucket...');
  
  try {
    // Check if bucket exists
    await s3Client.send(new HeadBucketCommand({ Bucket: BUCKET_NAME }));
    console.log(`✅ S3 bucket '${BUCKET_NAME}' already exists`);
  } catch (error) {
    if (error.name === 'NotFound') {
      try {
        // Create bucket
        const createCommand = new CreateBucketCommand({
          Bucket: BUCKET_NAME,
          CreateBucketConfiguration: {
            LocationConstraint: REGION === 'us-east-1' ? undefined : REGION,
          },
        });
        
        await s3Client.send(createCommand);
        console.log(`✅ S3 bucket '${BUCKET_NAME}' created successfully`);
      } catch (createError) {
        console.error('❌ Failed to create S3 bucket:', createError.message);
        throw createError;
      }
    } else {
      console.error('❌ Error checking S3 bucket:', error.message);
      throw error;
    }
  }
  
  // Configure CORS for the bucket
  try {
    const corsCommand = new PutBucketCorsCommand({
      Bucket: BUCKET_NAME,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ['*'],
            AllowedMethods: ['GET', 'HEAD'],
            AllowedOrigins: ['*'],
            ExposeHeaders: ['ETag'],
            MaxAgeSeconds: 3000,
          },
        ],
      },
    });
    
    await s3Client.send(corsCommand);
    console.log(`✅ CORS configured for S3 bucket '${BUCKET_NAME}'`);
  } catch (error) {
    console.error('⚠️  Failed to configure CORS (non-critical):', error.message);
  }
}

async function createIAMRole() {
  console.log('🔐 Setting up IAM role for Amplify...');
  
  const roleName = 'AgilentMaritime-AmplifyRole';
  
  try {
    // Create IAM role for Amplify
    const roleCommand = new CreateRoleCommand({
      RoleName: roleName,
      AssumeRolePolicyDocument: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Service: 'amplify.amazonaws.com',
            },
            Action: 'sts:AssumeRole',
          },
        ],
      }),
      Description: 'IAM role for Agilent Maritime Amplify app',
    });
    
    await iamClient.send(roleCommand);
    console.log(`✅ IAM role '${roleName}' created successfully`);
    
    // Attach policies
    const policies = [
      'arn:aws:iam::aws:policy/AmazonS3FullAccess',
      'arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess',
      'arn:aws:iam::aws:policy/CloudFrontFullAccess',
    ];
    
    for (const policyArn of policies) {
      try {
        await iamClient.send(new AttachRolePolicyCommand({
          RoleName: roleName,
          PolicyArn: policyArn,
        }));
        console.log(`✅ Attached policy: ${policyArn}`);
      } catch (error) {
        console.error(`⚠️  Failed to attach policy ${policyArn}:`, error.message);
      }
    }
    
  } catch (error) {
    if (error.name === 'EntityAlreadyExistsException') {
      console.log(`✅ IAM role '${roleName}' already exists`);
    } else {
      console.error('❌ Failed to create IAM role:', error.message);
      throw error;
    }
  }
}

async function main() {
  console.log('🚀 Setting up AWS Infrastructure for Agilent Maritime\n');
  
  // Check environment variables
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.error('❌ AWS credentials not found. Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY');
    process.exit(1);
  }
  
  console.log(`🌍 Region: ${REGION}`);
  console.log(`🗄️  DynamoDB Table: ${TABLE_NAME}`);
  console.log(`☁️  S3 Bucket: ${BUCKET_NAME}\n`);
  
  try {
    await createDynamoDBTable();
    await createS3Bucket();
    await createIAMRole();
    
    console.log('\n🎉 AWS Infrastructure setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Run: npm run upload-assets');
    console.log('2. Run: npm run build');
    console.log('3. Deploy to Amplify');
    console.log(`\n🌐 S3 Assets URL: https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/public/`);
    
  } catch (error) {
    console.error('\n❌ Infrastructure setup failed:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);
