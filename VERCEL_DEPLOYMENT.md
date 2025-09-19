# Vercel Deployment Guide

## 🚀 Quick Setup

### 1. Database Setup (Required)

You need a PostgreSQL database for production. Here are the recommended options:

#### Option A: Vercel Postgres (Recommended)
1. Go to your Vercel dashboard
2. Select your project
3. Go to "Storage" tab
4. Click "Create Database" → "Postgres"
5. Choose a name (e.g., "weed-wiki-db")
6. Select a region close to your users
7. Click "Create"

#### Option B: Supabase (Free tier available)
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string

#### Option C: PlanetScale (Free tier available)
1. Go to [planetscale.com](https://planetscale.com)
2. Create a new database
3. Get the connection string

### 2. Environment Variables

In your Vercel dashboard, go to Settings → Environment Variables and add:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="https://your-domain.vercel.app"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
DISCORD_CLIENT_ID="your-discord-client-id"
DISCORD_CLIENT_SECRET="your-discord-client-secret"
TWITTER_CLIENT_ID="your-twitter-client-id"
TWITTER_CLIENT_SECRET="your-twitter-client-secret"

# Feature Flags
ENABLE_SENSITIVE=true
```

### 3. Deploy

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect it's a Next.js project
4. The build process will:
   - Switch to PostgreSQL schema
   - Generate Prisma client
   - Run database migrations
   - Build the application

### 4. Database Migration

After deployment, you need to run the database migration:

```bash
# Using Vercel CLI
vercel env pull .env.local
npx prisma migrate deploy

# Or using Vercel dashboard
# Go to Functions tab and run a one-time migration
```

### 5. Seed Database (Optional)

To populate your database with sample data:

```bash
# Using Vercel CLI
vercel env pull .env.local
npm run db:seed
```

## 🔧 Troubleshooting

### Common Issues

1. **"Invalid datasource URL" error**
   - Make sure `DATABASE_URL` is set correctly
   - Ensure it starts with `postgresql://`
   - Check that the database is accessible

2. **"Table doesn't exist" error**
   - Run database migrations: `npx prisma migrate deploy`
   - Check that the schema was applied correctly

3. **"Environment variable not found" error**
   - Verify all required environment variables are set in Vercel
   - Make sure they're available in the correct environment (Production/Preview)

### Manual Database Setup

If automatic migration fails, you can manually set up the database:

1. Connect to your PostgreSQL database
2. Run the SQL from `weed-wiki-database.sql` (if available)
3. Or use Prisma Studio: `npx prisma studio`

## 📊 Monitoring

- Check Vercel Function logs for any runtime errors
- Monitor database connections and performance
- Set up alerts for critical errors

## 🔄 Updates

When you update your schema:

1. Update the schema files
2. Push to GitHub
3. Vercel will automatically redeploy
4. Run migrations if needed: `npx prisma migrate deploy`

## 💡 Tips

- Use Vercel's preview deployments to test changes
- Keep your database credentials secure
- Monitor your database usage to avoid hitting limits
- Consider using connection pooling for high traffic
