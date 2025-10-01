#!/bin/bash

# AWS Deployment Script for Agilent Maritime
# This script deploys the application to AWS using App Runner

set -e

echo "🚀 Starting AWS deployment for Agilent Maritime..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if user is logged in
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

echo "✅ AWS CLI is configured"

# Set variables
BUCKET_NAME="agilent-maritime-frontend-$(date +%s)"
REGION="us-east-1"
APP_NAME="agilent-maritime"

echo "📦 Building React application..."
npm run build

echo "🪣 Creating S3 bucket for frontend..."
aws s3 mb s3://$BUCKET_NAME --region $REGION

echo "📤 Uploading frontend to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete

echo "🌐 Creating CloudFront distribution..."
aws cloudfront create-distribution \
    --distribution-config file://aws-deployment/cloudfront-config.json \
    --query 'Distribution.Id' \
    --output text

echo "🗄️ Setting up Neon PostgreSQL database..."
echo "Please follow the steps in aws-deployment/neon-setup.md to:"
echo "1. Create a Neon account at https://neon.tech"
echo "2. Create a new project: agilent-maritime"
echo "3. Get your connection string"
echo "4. Update the DATABASE_URL in apprunner.yaml"

echo "🚀 Creating App Runner service..."
aws apprunner create-service \
    --service-name $APP_NAME \
    --source-configuration file://aws-deployment/apprunner.yaml \
    --instance-configuration '{
        "Cpu": "0.25 vCPU",
        "Memory": "0.5 GB"
    }'

echo "✅ Deployment completed!"
echo "🌐 Frontend: https://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo "🔧 Backend: Check App Runner console for service URL"
echo "🗄️ Database: Check RDS console for connection details"
