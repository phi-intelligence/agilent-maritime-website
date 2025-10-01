# 🚀 AWS Amplify + DynamoDB + S3 Deployment Guide

## 📋 Prerequisites

### Required AWS Services:
- **AWS Amplify** (Hosting)
- **DynamoDB** (Database)
- **S3** (Asset Storage)
- **IAM** (Permissions)
- **CloudFront** (CDN - optional)

### Required Tools:
- Node.js 18+
- AWS CLI configured
- Git repository

---

## 🔧 Step 1: Environment Setup

### 1.1 Install Dependencies
```bash
npm install
```

### 1.2 Configure Environment Variables
Copy `env.example` to `.env` and fill in your AWS credentials:

```bash
cp env.example .env
```

Edit `.env` with your AWS details:
```env
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here

# S3 Configuration
S3_BUCKET_NAME=agilent-maritime-assets

# DynamoDB Configuration
DYNAMODB_TABLE_NAME=agilent-maritime-contacts

# Frontend Environment Variables
VITE_AWS_REGION=us-east-1
VITE_S3_BUCKET_NAME=agilent-maritime-assets
VITE_DYNAMODB_TABLE_NAME=agilent-maritime-contacts
VITE_AWS_ACCESS_KEY_ID=your_access_key_here
VITE_AWS_SECRET_ACCESS_KEY=your_secret_key_here
```

---

## 🏗️ Step 2: AWS Infrastructure Setup

### 2.1 Create AWS Resources
```bash
# Set up DynamoDB table, S3 bucket, and IAM roles
node scripts/setup-aws-infrastructure.js
```

This script will:
- ✅ Create DynamoDB table: `agilent-maritime-contacts`
- ✅ Create S3 bucket: `agilent-maritime-assets`
- ✅ Configure CORS for S3
- ✅ Create IAM role for Amplify

### 2.2 Upload Assets to S3
```bash
# Upload all 87 organized assets to S3
npm run upload-assets
```

This will upload:
- 🎥 Videos (10 files)
- 🖼️ Images (75 files)
- 🎮 3D Models (2 files)

---

## 🚀 Step 3: Amplify Deployment

### 3.1 Initialize Amplify App
```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure
```

### 3.2 Create Amplify App
```bash
# Initialize Amplify in your project
amplify init

# Add hosting
amplify add hosting
```

### 3.3 Configure Amplify Build Settings

The `amplify.yml` file is already configured with:
- ✅ Build commands
- ✅ Environment variables
- ✅ Output directory: `static-build`

### 3.4 Deploy to Amplify
```bash
# Build and deploy
npm run build
amplify publish
```

---

## 🔧 Step 4: Environment Configuration in Amplify

### 4.1 Set Environment Variables in Amplify Console

Go to AWS Amplify Console → Your App → Environment Variables:

```
VITE_AWS_REGION=us-east-1
VITE_S3_BUCKET_NAME=agilent-maritime-assets
VITE_DYNAMODB_TABLE_NAME=agilent-maritime-contacts
VITE_AWS_ACCESS_KEY_ID=your_access_key
VITE_AWS_SECRET_ACCESS_KEY=your_secret_key
```

### 4.2 Configure IAM Permissions

Create IAM policy for Amplify:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::agilent-maritime-assets/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Scan",
        "dynamodb:Query"
      ],
      "Resource": "arn:aws:dynamodb:us-east-1:*:table/agilent-maritime-contacts"
    }
  ]
}
```

---

## 🧪 Step 5: Testing & Verification

### 5.1 Test Asset Loading
```bash
# Test S3 asset URLs
curl https://agilent-maritime-assets.s3.us-east-1.amazonaws.com/public/videos/Ship.mp4
```

### 5.2 Test DynamoDB Connection
```bash
# Test contact form submission
# Check DynamoDB table for new contacts
```

### 5.3 Test Admin Dashboard
- ✅ Contact management
- ✅ Mark as responded
- ✅ Delete contacts
- ✅ Export CSV

---

## 📊 Step 6: Monitoring & Maintenance

### 6.1 CloudWatch Monitoring
- Monitor DynamoDB read/write capacity
- Monitor S3 storage usage
- Monitor Amplify build logs

### 6.2 Cost Optimization
- **DynamoDB**: On-demand billing (pay per request)
- **S3**: Standard storage class
- **CloudFront**: Optional CDN for global distribution

### 6.3 Backup Strategy
- **DynamoDB**: Point-in-time recovery enabled
- **S3**: Versioning enabled
- **Code**: Git repository backup

---

## 🚨 Troubleshooting

### Common Issues:

#### 1. Asset Loading Errors
```bash
# Check S3 bucket permissions
aws s3 ls s3://agilent-maritime-assets/public/

# Verify CORS configuration
aws s3api get-bucket-cors --bucket agilent-maritime-assets
```

#### 2. DynamoDB Connection Errors
```bash
# Test DynamoDB table
aws dynamodb describe-table --table-name agilent-maritime-contacts

# Check IAM permissions
aws iam get-role --role-name AgilentMaritime-AmplifyRole
```

#### 3. Amplify Build Failures
- Check environment variables in Amplify console
- Verify build logs in Amplify console
- Ensure all dependencies are in package.json

---

## 📈 Performance Optimization

### 6.1 Asset Optimization
- ✅ Images: WebP format for modern browsers
- ✅ Videos: MP4 with H.264 codec
- ✅ 3D Models: GLB format for efficiency

### 6.2 CDN Configuration
- CloudFront distribution for global assets
- Cache headers optimized for static assets
- Gzip compression enabled

### 6.3 Database Optimization
- DynamoDB on-demand billing
- Proper indexing for queries
- Connection pooling for API calls

---

## 🎯 Final Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   AWS Amplify   │    │   Amazon S3     │    │   DynamoDB      │
│                 │    │                 │    │                 │
│ • Frontend Host │    │ • Static Assets │    │ • Contact Data  │
│ • CI/CD Pipeline│    │ • Videos/Images │    │ • Admin Data    │
│ • Environment   │    │ • 3D Models     │    │ • User Sessions │
│   Variables     │    │ • Global CDN    │    │ • Analytics     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   CloudFront    │
                    │                 │
                    │ • Global CDN    │
                    │ • Edge Caching  │
                    │ • SSL/TLS       │
                    └─────────────────┘
```

---

## ✅ Deployment Checklist

- [ ] AWS credentials configured
- [ ] Environment variables set
- [ ] DynamoDB table created
- [ ] S3 bucket created and configured
- [ ] Assets uploaded to S3
- [ ] Amplify app initialized
- [ ] Build configuration verified
- [ ] Environment variables in Amplify console
- [ ] IAM permissions configured
- [ ] Contact form tested
- [ ] Admin dashboard tested
- [ ] Asset loading verified
- [ ] Performance optimized
- [ ] Monitoring configured

---

## 🎉 Success!

Your Agilent Maritime website is now deployed on AWS with:
- ✅ **Amplify Hosting**: Fast, global frontend hosting
- ✅ **DynamoDB**: Scalable NoSQL database
- ✅ **S3 Storage**: Reliable asset storage
- ✅ **Mobile Responsive**: 100% mobile-friendly
- ✅ **Multi-language**: 9 language support
- ✅ **3D Animations**: Optimized for web
- ✅ **Admin Dashboard**: Full contact management

**Live URL**: `https://your-amplify-app-id.amplifyapp.com`
