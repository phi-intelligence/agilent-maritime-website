# Manual CLI Deployment Plan
## Agilent Maritime Static Site on AWS S3 + CloudFront

### Overview
This plan converts your full-stack Agilent Maritime application to a static site and deploys it manually using AWS CLI commands.

**Cost Reduction**: $90-275/month → $5-18/month
**Performance**: Global CDN delivery, faster loading
**Reliability**: 99.9% uptime, no server management

---

## Phase 1: AWS Account Setup

### 1.1 Create AWS Account
1. Go to https://aws.amazon.com/
2. Click "Create an AWS Account"
3. Complete registration (add payment method)
4. Wait for account verification

### 1.2 Install AWS CLI
```bash
# On Pop!_OS/Linux
sudo apt update
sudo apt install awscli -y

# Verify installation
aws --version
```

### 1.3 Create IAM User
**Via AWS Console:**
1. Go to IAM → Users → Create user
2. Username: `agilent-maritime-deployer`
3. Attach policies:
   - `AmazonS3FullAccess`
   - `CloudFrontFullAccess`
   - `IAMReadOnlyAccess`
4. **Save credentials**: Access Key ID + Secret Access Key

### 1.4 Configure AWS CLI
```bash
aws configure
```
Enter when prompted:
- AWS Access Key ID: [Your Access Key]
- AWS Secret Access Key: [Your Secret Key]
- Default region name: `us-east-1`
- Default output format: `json`

**Test configuration:**
```bash
aws sts get-caller-identity
```

---

## Phase 2: Prepare Application for Static Deployment

### 2.1 Update Package Dependencies
```bash
# Backup original package.json
cp package.json package.json.backup

# Copy static configuration
cp package.static.json package.json

# Install dependencies
npm install

# Install additional packages for static site
npm install fuse.js
```

### 2.2 Replace Contact Form
Update your contact form components to use Formspree instead of server API:

**Get Formspree Form ID:**
1. Go to https://formspree.io/
2. Create account (free tier: 50 submissions/month)
3. Create new form
4. Get form ID (e.g., `xvgkqyqw`)

**Update Contact Form:**
Replace API call in contact form with:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

### 2.3 Build Static Site
```bash
# Build the application
npm run build

# Check build output
ls -la static-build/
```

**Expected output structure:**
```
static-build/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   ├── images/
│   ├── videos/
│   └── models/
└── api/
    └── language/
        ├── en.json
        ├── es.json
        └── [other languages]
```

---

## Phase 3: Create S3 Bucket

### 3.1 Create Bucket via AWS CLI
```bash
# Create bucket (replace with unique name)
aws s3 mb s3://agilent-maritime-static-YOUR_UNIQUE_ID

# Example: aws s3 mb s3://agilent-maritime-static-abc123xyz
```

**Note**: Bucket name must be globally unique. Use random suffix if needed.

### 3.2 Configure Static Website Hosting
```bash
# Enable static website hosting
aws s3 website s3://agilent-maritime-static-YOUR_UNIQUE_ID \
  --index-document index.html \
  --error-document index.html
```

### 3.3 Set Bucket Policy for Public Access
Create file `bucket-policy.json`:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::agilent-maritime-static-YOUR_UNIQUE_ID/*"
        }
    ]
}
```

Apply policy:
```bash
aws s3api put-bucket-policy \
  --bucket agilent-maritime-static-YOUR_UNIQUE_ID \
  --policy file://bucket-policy.json
```

### 3.4 Disable Block Public Access
```bash
aws s3api put-public-access-block \
  --bucket agilent-maritime-static-YOUR_UNIQUE_ID \
  --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
```

---

## Phase 4: Deploy to S3

### 4.1 Upload Static Files
```bash
# Sync files to S3 bucket
aws s3 sync static-build/ s3://agilent-maritime-static-YOUR_UNIQUE_ID --delete

# Check upload
aws s3 ls s3://agilent-maritime-static-YOUR_UNIQUE_ID --recursive
```

### 4.2 Test S3 Website
```bash
# Get website URL
aws s3api get-bucket-website --bucket agilent-maritime-static-YOUR_UNIQUE_ID
```

**Website URL**: `http://agilent-maritime-static-YOUR_UNIQUE_ID.s3-website-us-east-1.amazonaws.com`

---

## Phase 5: Create CloudFront Distribution

### 5.1 Create CloudFront Function for SPA Routing
**Via AWS Console:**
1. Go to CloudFront → Functions
2. Create function: `spa-routing`
3. Function code:
```javascript
function handler(event) {
    var request = event.request;
    var uri = request.uri;
    
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    }
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }
    
    return request;
}
```
4. Publish function

### 5.2 Create CloudFront Distribution
**Via AWS Console:**
1. Go to CloudFront → Create distribution
2. **Origin settings:**
   - Origin domain: `agilent-maritime-static-YOUR_UNIQUE_ID.s3.us-east-1.amazonaws.com`
   - Origin path: (leave empty)
   - Origin access: Legacy access identities

3. **Default cache behavior:**
   - Viewer protocol policy: Redirect HTTP to HTTPS
   - Allowed HTTP methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
   - Cache policy: Managed-CachingOptimized
   - Origin request policy: Managed-CORS-S3Origin

4. **Function associations:**
   - Viewer request: spa-routing

5. **Distribution settings:**
   - Price class: Use all edge locations
   - SSL certificate: Default CloudFront certificate
   - Default root object: index.html

6. **Custom error pages:**
   - HTTP Error Code: 403
   - Response Page Path: /index.html
   - HTTP Response Code: 200
   - Error Caching Minimum TTL: 0

7. **Create distribution** (takes 10-15 minutes)

### 5.3 Get CloudFront Distribution ID
```bash
# List distributions
aws cloudfront list-distributions --query 'DistributionList.Items[?Comment==`agilent-maritime-static-YOUR_UNIQUE_ID`].Id' --output text
```

**Note the Distribution ID** (e.g., `E1234567890ABC`)

---

## Phase 6: Deploy and Test

### 6.1 Deploy to S3
```bash
# Build and deploy
npm run build
aws s3 sync static-build/ s3://agilent-maritime-static-YOUR_UNIQUE_ID --delete
```

### 6.2 Invalidate CloudFront Cache
```bash
# Create invalidation (replace with your distribution ID)
aws cloudfront create-invalidation \
  --distribution-id E1234567890ABC \
  --paths "/*"
```

### 6.3 Test Deployment
```bash
# Get CloudFront domain
aws cloudfront get-distribution --id E1234567890ABC --query 'Distribution.DomainName' --output text
```

**Test URLs:**
- S3 Website: `http://agilent-maritime-static-YOUR_UNIQUE_ID.s3-website-us-east-1.amazonaws.com`
- CloudFront: `https://d1234567890abc.cloudfront.net`

---

## Phase 7: Custom Domain (Optional)

### 7.1 Request SSL Certificate
```bash
# Request certificate via AWS CLI
aws acm request-certificate \
  --domain-name agilentmaritime.com \
  --subject-alternative-names www.agilentmaritime.com \
  --validation-method DNS \
  --region us-east-1
```

### 7.2 Create Route 53 Hosted Zone
```bash
# Create hosted zone
aws route53 create-hosted-zone \
  --name agilentmaritime.com \
  --caller-reference $(date +%s)
```

### 7.3 Update CloudFront Distribution
**Via AWS Console:**
1. Edit distribution
2. Alternate domain names: `agilentmaritime.com`, `www.agilentmaritime.com`
3. SSL certificate: Select your certificate
4. Save changes

### 7.4 Create DNS Records
```bash
# Create A record for root domain
aws route53 change-resource-record-sets \
  --hosted-zone-id YOUR_HOSTED_ZONE_ID \
  --change-batch file://dns-records.json
```

**dns-records.json:**
```json
{
  "Changes": [
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "agilentmaritime.com",
        "Type": "A",
        "AliasTarget": {
          "DNSName": "d1234567890abc.cloudfront.net",
          "EvaluateTargetHealth": false,
          "HostedZoneId": "Z2FDTNDATAQYW2"
        }
      }
    },
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "www.agilentmaritime.com",
        "Type": "CNAME",
        "TTL": 300,
        "ResourceRecords": [
          {
            "Value": "agilentmaritime.com"
          }
        ]
      }
    }
  ]
}
```

---

## Phase 8: Monitoring and Maintenance

### 8.1 Set Up Billing Alerts
**Via AWS Console:**
1. Go to Billing → Budgets
2. Create budget for $20/month
3. Set up email alerts

### 8.2 Monitor Usage
```bash
# Check S3 storage
aws s3 ls s3://agilent-maritime-static-YOUR_UNIQUE_ID --recursive --human-readable --summarize

# Check CloudFront metrics
aws cloudfront get-distribution --id E1234567890ABC --query 'Distribution.Status'
```

### 8.3 Update Deployment Process
```bash
# Standard update process
npm run build
aws s3 sync static-build/ s3://agilent-maritime-static-YOUR_UNIQUE_ID --delete
aws cloudfront create-invalidation --distribution-id E1234567890ABC --paths "/*"
```

---

## Cost Estimation

### Monthly Costs (USD):
- **S3 Storage**: $2-5 (200MB assets)
- **S3 Requests**: $1-3 (website traffic)
- **CloudFront**: $2-10 (data transfer)
- **Route 53**: $0.50 (hosted zone)
- **Certificate Manager**: FREE
- **Total**: $5-18/month

### Free Tier Limits:
- S3: 5GB storage, 20,000 GET requests
- CloudFront: 1TB data transfer, 10,000,000 requests
- Route 53: 1 hosted zone

---

## Troubleshooting Commands

### Common Issues and Solutions:

**403 Forbidden Error:**
```bash
# Check bucket policy
aws s3api get-bucket-policy --bucket agilent-maritime-static-YOUR_UNIQUE_ID

# Check public access block
aws s3api get-public-access-block --bucket agilent-maritime-static-YOUR_UNIQUE_ID
```

**404 on Page Refresh:**
```bash
# Check CloudFront function
aws cloudfront get-function --name spa-routing

# Check distribution configuration
aws cloudfront get-distribution --id E1234567890ABC --query 'Distribution.DistributionConfig'
```

**Assets Not Loading:**
```bash
# Check S3 sync
aws s3 sync static-build/ s3://agilent-maritime-static-YOUR_UNIQUE_ID --dryrun

# Check file permissions
aws s3 ls s3://agilent-maritime-static-YOUR_UNIQUE_ID/assets/ --recursive
```

**Build Errors:**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Summary

This manual deployment process converts your full-stack Agilent Maritime application to a static site, reducing costs by 90% while improving performance and reliability. The process involves:

1. AWS account setup and CLI configuration
2. Converting server dependencies to static solutions
3. Creating S3 bucket with static hosting
4. Setting up CloudFront distribution with SPA routing
5. Deploying and testing the static site
6. Optional custom domain configuration

All steps are performed manually via AWS CLI commands, giving you full control over the deployment process.
