# AWS Amplify + S3 + DynamoDB Deployment Plan

## Overview
This guide will deploy the Agilent Maritime website to AWS using:
- **AWS Amplify** for hosting and CI/CD
- **S3** for static asset storage
- **DynamoDB** for contact form data
- **IAM** for secure access management

## Prerequisites
- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Node.js and npm installed
- Git repository (GitHub/GitLab/Bitbucket)

## Phase 1: AWS Account Setup & Credentials

### 1.1 Create AWS Account (if needed)
- Sign up at https://aws.amazon.com
- Complete verification process
- Set up billing alerts

### 1.2 Create IAM User for Deployment
```bash
# Create IAM user with programmatic access
aws iam create-user --user-name agilent-maritime-deployer

# Attach necessary policies
aws iam attach-user-policy --user-name agilent-maritime-deployer --policy-arn arn:aws:iam::aws:policy/AdministratorAccess-Amplify
aws iam attach-user-policy --user-name agilent-maritime-deployer --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
aws iam attach-user-policy --user-name agilent-maritime-deployer --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess
aws iam attach-user-policy --user-name agilent-maritime-deployer --policy-arn arn:aws:iam::aws:policy/IAMFullAccess

# Create access keys
aws iam create-access-key --user-name agilent-maritime-deployer
```

### 1.3 Configure Local Environment
```bash
# Configure AWS CLI
aws configure

# Set environment variables
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_DEFAULT_REGION="us-east-1"
```

## Phase 2: Environment Configuration

### 2.1 Create Environment File
Create `.env` file in project root:
```bash
# AWS Credentials
VITE_AWS_ACCESS_KEY_ID=your-access-key-id
VITE_AWS_SECRET_ACCESS_KEY=your-secret-access-key
VITE_AWS_REGION=us-east-1

# S3 Configuration
VITE_S3_BUCKET_NAME=agilent-maritime-assets-$(date +%s)

# DynamoDB Configuration
VITE_DYNAMODB_TABLE_NAME=AgilentMaritimeContacts
```

### 2.2 Update Environment Variables
```bash
# Copy example file
cp env.example .env

# Edit with your values
nano .env
```

## Phase 3: AWS Infrastructure Setup

### 3.1 Create S3 Bucket
```bash
# Create S3 bucket for assets
aws s3 mb s3://$VITE_S3_BUCKET_NAME --region $VITE_AWS_REGION

# Set bucket policy for public read access
aws s3api put-bucket-policy --bucket $VITE_S3_BUCKET_NAME --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::'$VITE_S3_BUCKET_NAME'/public/*"
    }
  ]
}'
```

### 3.2 Create DynamoDB Table
```bash
# Create DynamoDB table
aws dynamodb create-table \
  --table-name $VITE_DYNAMODB_TABLE_NAME \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --region $VITE_AWS_REGION
```

### 3.3 Upload Assets to S3
```bash
# Run asset upload script
npm run upload-assets

# Verify upload
aws s3 ls s3://$VITE_S3_BUCKET_NAME/public/ --recursive
```

## Phase 4: AWS Amplify Setup

### 4.1 Connect Repository to Amplify
1. Go to AWS Amplify Console
2. Click "New app" → "Host web app"
3. Connect your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository
5. Choose branch (usually `main` or `master`)

### 4.2 Configure Build Settings
The `amplify.yml` file is already configured, but verify these settings:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: /static-build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
appRoot: client
```

### 4.3 Set Environment Variables in Amplify
In Amplify Console → App Settings → Environment Variables:

```
VITE_AWS_REGION=us-east-1
VITE_S3_BUCKET_NAME=your-bucket-name
VITE_DYNAMODB_TABLE_NAME=AgilentMaritimeContacts
VITE_AWS_ACCESS_KEY_ID=your-access-key
VITE_AWS_SECRET_ACCESS_KEY=your-secret-key
```

## Phase 5: Deploy Application

### 5.1 Trigger Deployment
```bash
# Commit and push changes
git add .
git commit -m "Add AWS Amplify deployment configuration"
git push origin main
```

### 5.2 Monitor Build Process
1. Go to Amplify Console
2. Click on your app
3. Monitor the build process in real-time
4. Check for any build errors

### 5.3 Verify Deployment
1. Once build completes, get the app URL
2. Test all pages and functionality
3. Verify contact form works with DynamoDB
4. Check admin panel functionality

## Phase 6: Post-Deployment Configuration

### 6.1 Custom Domain (Optional)
1. In Amplify Console → Domain Management
2. Add your custom domain
3. Configure SSL certificate
4. Update DNS records

### 6.2 Set Up Monitoring
1. Enable CloudWatch monitoring
2. Set up alerts for errors
3. Monitor performance metrics

### 6.3 Security Hardening
1. Review IAM permissions
2. Enable MFA for AWS account
3. Set up CloudTrail for audit logging
4. Configure WAF if needed

## Phase 7: Testing & Verification

### 7.1 Functional Testing
- [ ] Homepage loads correctly
- [ ] All navigation works
- [ ] Contact form submits to DynamoDB
- [ ] Admin panel shows contacts
- [ ] All assets load from S3
- [ ] Multi-language support works
- [ ] Mobile responsiveness

### 7.2 Performance Testing
- [ ] Page load times < 3 seconds
- [ ] Images and videos load properly
- [ ] 3D models render correctly
- [ ] No console errors

### 7.3 Security Testing
- [ ] HTTPS enabled
- [ ] No sensitive data exposed
- [ ] Contact form validation works
- [ ] Admin access is secure

## Phase 8: Maintenance & Updates

### 8.1 Regular Updates
- Monitor AWS costs
- Update dependencies regularly
- Backup DynamoDB data
- Review security settings

### 8.2 Scaling Considerations
- Monitor DynamoDB usage
- Consider CloudFront for global CDN
- Set up auto-scaling if needed
- Monitor S3 storage costs

## Troubleshooting

### Common Issues
1. **Build Failures**: Check environment variables
2. **Asset Loading**: Verify S3 bucket permissions
3. **Database Errors**: Check DynamoDB table exists
4. **CORS Issues**: Configure S3 CORS policy

### Debug Commands
```bash
# Check AWS credentials
aws sts get-caller-identity

# List S3 buckets
aws s3 ls

# Check DynamoDB tables
aws dynamodb list-tables

# View Amplify apps
aws amplify list-apps
```

## Cost Estimation

### Monthly Costs (Approximate)
- **Amplify Hosting**: $1-5 (based on traffic)
- **S3 Storage**: $0.5-2 (based on asset size)
- **DynamoDB**: $1-5 (based on requests)
- **Data Transfer**: $0.5-2 (based on traffic)
- **Total**: $3-14/month

### Cost Optimization
- Use S3 Intelligent Tiering
- Set up DynamoDB auto-scaling
- Monitor usage with AWS Cost Explorer
- Set up billing alerts

## Next Steps After Deployment

1. **SEO Optimization**
   - Submit sitemap to Google
   - Set up Google Analytics
   - Optimize meta tags

2. **Performance Monitoring**
   - Set up CloudWatch dashboards
   - Monitor Core Web Vitals
   - Implement error tracking

3. **Backup Strategy**
   - Regular DynamoDB backups
   - S3 versioning enabled
   - Code repository backups

4. **Security Enhancements**
   - Enable AWS WAF
   - Set up security scanning
   - Implement rate limiting

This plan provides a complete roadmap for deploying your Agilent Maritime website to AWS with all necessary components configured and optimized for production use.
