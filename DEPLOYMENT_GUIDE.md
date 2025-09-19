# 🚀 Nuvana Club Deployment Guide

> **Complete deployment guide for Nuvana Club** - From local development to production deployment on Vercel with PostgreSQL

## 🎯 Quick Start

### Prerequisites
- Node.js 18+
- Git
- PostgreSQL database (for production)
- Vercel account (for deployment)

### 1. Local Development Setup

#### Clone and Install
```bash
git clone https://github.com/VoxHash/nuvana-club.git
cd nuvana-club
npm install
```

#### Environment Configuration
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

#### Database Setup (SQLite for Development)
```bash
npm run db:switch-sqlite
npm run db:push
npm run db:seed
```

#### Start Development Server
```bash
npm run dev
```

### 2. Production Deployment (Vercel)

#### Database Setup (PostgreSQL Required)

**Option A: Vercel Postgres (Recommended)**
1. Go to your Vercel dashboard
2. Select your project
3. Go to "Storage" tab
4. Click "Create Database" → "Postgres"
5. Choose a name (e.g., "weed-wiki-db")
6. Select a region close to your users
7. Click "Create"

**Option B: Supabase (Free tier available)**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string

**Option C: PlanetScale (Free tier available)**
1. Go to [planetscale.com](https://planetscale.com)
2. Create a new database
3. Get the connection string

#### Environment Variables Setup

In your Vercel project settings, add these environment variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://nuvana.club"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
DISCORD_CLIENT_ID="your-discord-client-id"
DISCORD_CLIENT_SECRET="your-discord-client-secret"
TWITTER_CLIENT_ID="your-twitter-client-id"
TWITTER_CLIENT_SECRET="your-twitter-client-secret"

# Feature Flags
ENABLE_SENSITIVE="true"
```

#### Deploy to Vercel

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run vercel-build`
   - Output Directory: `.next`

3. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Visit your deployed URL

## 🔧 Environment Configuration

### Required Environment Variables

#### Database
```env
DATABASE_URL="postgresql://username:password@host:port/database"
```

#### NextAuth
```env
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://nuvana.club"
```

#### OAuth Providers (Optional)
```env
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
DISCORD_CLIENT_ID="your-discord-client-id"
DISCORD_CLIENT_SECRET="your-discord-client-secret"
TWITTER_CLIENT_ID="your-twitter-client-id"
TWITTER_CLIENT_SECRET="your-twitter-client-secret"
```

#### Feature Flags
```env
ENABLE_SENSITIVE="true"
```

### OAuth Provider Setup

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.vercel.app/api/auth/callback/google` (production)

#### Discord OAuth
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to OAuth2 section
4. Add redirect URIs:
   - `http://localhost:3000/api/auth/callback/discord` (development)
   - `https://your-domain.vercel.app/api/auth/callback/discord` (production)

#### Twitter OAuth
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app
3. Set callback URL:
   - `http://localhost:3000/api/auth/callback/twitter` (development)
   - `https://your-domain.vercel.app/api/auth/callback/twitter` (production)

## 🐳 Docker Development

### Using Docker Compose

1. **Start Services**
   ```bash
   docker-compose up -d
   ```

2. **Setup Database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

3. **Access Application**
   - Web: [http://localhost:3000](http://localhost:3000)
   - Database: [http://localhost:8080](http://localhost:8080) (Adminer)

### Docker Services
- **Next.js App**: Port 3000
- **MySQL Database**: Port 3306
- **Adminer**: Port 8080 (Database management)

## 🔍 Troubleshooting

### Common Issues

#### Database Connection Issues
**Problem**: Database connection errors
**Solution**:
- Check `DATABASE_URL` environment variable
- Ensure database server is running
- Verify connection credentials
- Check network connectivity

#### Authentication Problems
**Problem**: OAuth login not working
**Solution**:
- Check OAuth provider credentials
- Verify callback URLs
- Check `NEXTAUTH_SECRET` and `NEXTAUTH_URL`
- Review browser console for errors

#### Build Errors
**Problem**: Vercel build failing
**Solution**:
- Check Node.js version compatibility
- Verify all environment variables are set
- Check build logs for specific errors
- Ensure database is accessible from Vercel

#### Image Upload Issues
**Problem**: Image uploads not working
**Solution**:
- Check file permissions
- Verify upload directory exists
- Check file size limits
- Review server logs

### Health Checks

#### Database Health
Visit: `https://nuvana.club/api/health`

**Expected Response**:
```json
{
  "status": "healthy",
  "database": "connected",
  "users": 3,
  "strains": 518,
  "grows": 1
}
```

#### Authentication Test
1. Try logging in with credentials
2. Test OAuth providers
3. Check user roles and permissions
4. Verify session persistence

## 📊 Performance Optimization

### Database Optimization
- Use connection pooling
- Optimize queries with indexes
- Monitor query performance
- Regular database maintenance

### Application Optimization
- Enable Next.js optimizations
- Use CDN for static assets
- Implement caching strategies
- Monitor Core Web Vitals

### Vercel Optimization
- Use Vercel Edge Functions
- Optimize bundle size
- Enable compression
- Use Vercel Analytics

## 🔒 Security Considerations

### Environment Security
- Never commit `.env` files
- Use strong, unique secrets
- Rotate secrets regularly
- Monitor access logs

### Database Security
- Use strong passwords
- Enable SSL connections
- Regular security updates
- Monitor database access

### Application Security
- Validate all inputs
- Use HTTPS in production
- Implement rate limiting
- Regular security audits

## 📈 Monitoring & Analytics

### Vercel Analytics
- Enable Vercel Analytics
- Monitor Core Web Vitals
- Track user behavior
- Performance insights

### Database Monitoring
- Monitor connection counts
- Track query performance
- Set up alerts
- Regular backups

### Application Monitoring
- Error tracking
- Performance monitoring
- User analytics
- Security monitoring

## 🚀 Advanced Deployment

### Custom Domain
1. Add domain in Vercel dashboard
2. Configure DNS records
3. Update `NEXTAUTH_URL`
4. Test all functionality

### Staging Environment
1. Create staging branch
2. Deploy to staging URL
3. Test all features
4. Deploy to production

### CI/CD Pipeline
- Automated testing
- Code quality checks
- Security scanning
- Automated deployment

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [NextAuth Documentation](https://next-auth.js.org/)

### Support
- [GitHub Issues](https://github.com/VoxHash/weed-wiki/issues)
- [GitHub Discussions](https://github.com/VoxHash/weed-wiki/discussions)
- [Vercel Support](https://vercel.com/support)

---

**Made with ❤️ by VoxHash**

*Nuvana Club - Legal-first cannabis education platform!* 🌿✨
