# Complete AWS S3 + CloudFront Deployment Guide
## Agilent Maritime Static Website

### Prerequisites
- AWS Account (free tier available)
- Domain name (optional, can use CloudFront URL)
- Basic terminal/command line knowledge

---

## Phase 1: AWS Setup

### Step 1: Create AWS Account
1. Go to https://aws.amazon.com/
2. Click "Create an AWS Account"
3. Follow the setup process
4. Add payment method (required but won't be charged initially)

### Step 2: Install AWS CLI
```bash
# On Pop!_OS/Linux
sudo apt update
sudo apt install awscli -y

# Verify installation
aws --version
```

### Step 3: Configure AWS CLI
```bash
aws configure
```
Enter your credentials when prompted:
- AWS Access Key ID: [Your Access Key]
- AWS Secret Access Key: [Your Secret Key]
- Default region name: us-east-1
- Default output format: json

### Step 4: Create IAM User
1. Go to AWS Console → IAM
2. Create user: `agilent-maritime-deployer`
3. Attach policies:
   - AmazonS3FullAccess
   - CloudFrontFullAccess
   - IAMReadOnlyAccess
4. Save credentials (Access Key ID & Secret Access Key)

---

## Phase 2: Prepare Application for Static Deployment

### Step 1: Install Static Dependencies
```bash
# Copy static package.json
cp package.static.json package.json

# Install dependencies
npm install

# Install additional packages for static site
npm install fuse.js
```

### Step 2: Update Contact Form
Replace the contact form in your components to use Formspree or similar service.

### Step 3: Build Static Site
```bash
# Build the static site
npm run build

# Check the build output
ls -la static-build/
```

---

## Phase 3: AWS S3 Setup

### Step 1: Create S3 Bucket
1. Go to AWS Console → S3
2. Click "Create bucket"
3. Bucket name: `agilent-maritime-static-[random]` (must be globally unique)
4. Region: US East (N. Virginia) us-east-1
5. Uncheck "Block all public access"
6. Create bucket

### Step 2: Configure Static Website Hosting
1. Select your bucket → Properties tab
2. Scroll to "Static website hosting"
3. Enable: "Static website hosting"
4. Index document: `index.html`
5. Error document: `index.html`
6. Save changes

### Step 3: Set Bucket Policy
1. Go to bucket → Permissions tab
2. Scroll to "Bucket policy"
3. Click "Edit"
4. Paste this policy (replace BUCKET_NAME):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
        }
    ]
}
```

---

## Phase 4: CloudFront Distribution

### Step 1: Create CloudFront Distribution
1. Go to AWS Console → CloudFront
2. Click "Create distribution"

### Step 2: Configure Origin
- Origin domain: `your-bucket-name.s3.us-east-1.amazonaws.com`
- Origin path: (leave empty)
- Origin access: Legacy access identities

### Step 3: Default Cache Behavior
- Viewer protocol policy: Redirect HTTP to HTTPS
- Allowed HTTP methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
- Cache policy: Managed-CachingOptimized

### Step 4: Function Associations (for SPA routing)
1. Viewer request → Create new function
2. Function name: `spa-routing`
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

### Step 5: Distribution Settings
- Price class: Use all edge locations
- SSL certificate: Default CloudFront certificate
- Default root object: index.html
- Custom error pages:
  - HTTP Error Code: 403
  - Response Page Path: /index.html
  - HTTP Response Code: 200

### Step 6: Create Distribution
Click "Create distribution" and wait 10-15 minutes for deployment.

---

## Phase 5: Deploy Application

### Step 1: Build Static Site
```bash
npm run build
```

### Step 2: Deploy to S3
```bash
# Replace YOUR_BUCKET_NAME with your actual bucket name
aws s3 sync static-build/ s3://YOUR_BUCKET_NAME --delete
```

### Step 3: Create CloudFront Invalidation
```bash
# Replace YOUR_DISTRIBUTION_ID with your CloudFront distribution ID
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### Step 4: Test Your Site
1. Go to CloudFront console
2. Copy the distribution domain name
3. Test in browser

---

## Phase 6: Custom Domain (Optional)

### Step 1: Request SSL Certificate
1. Go to AWS Certificate Manager
2. Request public certificate
3. Add domain names: `agilentmaritime.com`, `www.agilentmaritime.com`
4. Validate via DNS

### Step 2: Update CloudFront Distribution
1. Go to CloudFront → Your distribution
2. Edit settings
3. Alternate domain names: Add your domains
4. SSL certificate: Select your certificate
5. Save changes

### Step 3: Configure Route 53
1. Go to Route 53 → Hosted zones
2. Create hosted zone for your domain
3. Create A record:
   - Name: (leave empty for root domain)
   - Type: A
   - Alias: Yes
   - Route traffic to: CloudFront distribution
4. Create CNAME record for www subdomain

---

## Cost Estimation

### Monthly Costs (USD):
- **S3 Storage**: ~$2-5 (for 200MB of assets)
- **S3 Requests**: ~$1-3 (for website traffic)
- **CloudFront**: ~$2-10 (for data transfer)
- **Route 53**: ~$0.50 (hosted zone)
- **Certificate Manager**: FREE
- **Total**: ~$5-18/month

### Free Tier Limits:
- S3: 5GB storage, 20,000 GET requests
- CloudFront: 1TB data transfer, 10,000,000 requests
- Route 53: 1 hosted zone

---

## Troubleshooting

### Common Issues:

1. **403 Forbidden Error**:
   - Check S3 bucket policy
   - Ensure public read access is enabled

2. **404 on Page Refresh**:
   - Ensure CloudFront function is configured
   - Check custom error pages

3. **Assets Not Loading**:
   - Check S3 bucket permissions
   - Verify CloudFront cache behavior

4. **Build Errors**:
   - Check Node.js version (18+ recommended)
   - Clear node_modules and reinstall

### Useful Commands:
```bash
# Check AWS CLI configuration
aws configure list

# List S3 buckets
aws s3 ls

# Sync files to S3
aws s3 sync static-build/ s3://your-bucket-name --delete

# List CloudFront distributions
aws cloudfront list-distributions

# Create CloudFront invalidation
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

---

## Next Steps After Deployment

1. **Set up monitoring** with CloudWatch
2. **Configure backups** for S3 bucket
3. **Set up CI/CD** pipeline for automatic deployments
4. **Add analytics** (Google Analytics, CloudWatch)
5. **Optimize images** for better performance
6. **Set up error tracking** (Sentry, etc.)

---

## Support and Resources

- AWS Documentation: https://docs.aws.amazon.com/
- S3 Static Website Hosting: https://docs.aws.amazon.com/s3/latest/userguide/WebsiteHosting.html
- CloudFront: https://docs.aws.amazon.com/cloudfront/
- AWS Free Tier: https://aws.amazon.com/free/

---

**Note**: This guide assumes you have basic knowledge of command line and web development. If you encounter issues, refer to AWS documentation or seek help from AWS support.

