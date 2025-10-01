# Neon DB Setup for Agilent Maritime

## 🗄️ Database Setup Steps

### 1. Create Neon Account
1. Go to [neon.tech](https://neon.tech)
2. Sign up with GitHub/Google
3. Create a new project: `agilent-maritime`

### 2. Get Connection String
```bash
# Your Neon connection string will look like:
postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/agilent_maritime?sslmode=require
```

### 3. Update Environment Variables
```bash
# In your App Runner configuration
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/agilent_maritime?sslmode=require"
```

### 4. Run Database Migrations
```bash
# Connect to Neon and run migrations
npx drizzle-kit push
```

## 🚀 Benefits of Neon DB

### ✅ Serverless PostgreSQL
- No server management
- Auto-scaling based on usage
- Global edge locations
- Zero maintenance

### ✅ Cost-Effective
- Free tier: 0.5GB storage, 10GB transfer
- Pro tier: $19/month for 10GB storage
- Pay only for what you use

### ✅ Developer Experience
- Database branching (like Git)
- Instant provisioning
- Built-in connection pooling
- Automatic backups

### ✅ Global Performance
- Edge locations worldwide
- Fast connection times
- Optimized for serverless

## 🔧 Configuration

### Environment Variables
```bash
NODE_ENV=production
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/agilent_maritime?sslmode=require
PORT=3000
```

### Drizzle Configuration
```typescript
// drizzle.config.ts
export default {
  schema: "./shared/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
};
```
