# 🌿 Nuvana Club v2.0.0

> **Nuvana Club** - A comprehensive, legal-first cannabis strain catalog and private grow logging platform. Built with Next.js, Prisma, and Tailwind CSS for modern web development.

[![Version](https://img.shields.io/badge/version-2.0.0-green.svg)](https://github.com/VoxHash/nuvana-club)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/next.js-14.2+-black.svg)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/prisma-5.10+-blue.svg)](https://prisma.io/)
[![Tailwind](https://img.shields.io/badge/tailwind-3.4+-blue.svg)](https://tailwindcss.com/)

## ✨ Features

### 🌿 **Comprehensive Strain Catalog**
- **518+ Cannabis Strains**: Complete database with detailed information
- **Advanced Search & Filtering**: By type, THC%, CBD%, terpenes, and tags
- **Smart Tagging System**: Fruity, earthy, relaxing, energizing, and more
- **Strain Images**: Professional image gallery with admin management
- **SEO Optimized**: Dynamic meta tags, Open Graph, and sitemap generation

### 🌱 **Private Grow Logging**
- **Structured Log Entries**: Stage, height, leaf count, temperature, humidity, pH
- **Growth Metrics Charts**: Visual progress tracking with Recharts
- **Export Functionality**: PDF and CSV export with embedded images
- **Public/Private Toggle**: Share your grows or keep them private
- **User Profiles**: Public profiles showcasing shared grow logs

### 🔐 **Authentication & Security**
- **Multiple Login Options**: Credentials, Google, Discord, Twitter OAuth
- **Role-Based Access Control**: USER, CONTRIBUTOR, ADMIN roles
- **Secure Middleware**: Protected routes and authorization
- **Audit Logging**: Track user actions and compliance events
- **Legal-First Design**: Educational content with compliance safeguards

### 🎨 **Modern User Experience**
- **Dark/Light Theme**: Toggle with localStorage persistence
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Skeleton Loaders**: Optimistic UI updates for better UX
- **Favorites System**: Save strains and grow logs
- **Comment System**: Community engagement on strain pages

### 🛠️ **Admin Features**
- **Strain Management**: Add, edit, delete strains with pagination
- **Image Management**: Upload and manage strain images
- **User Management**: Role assignment and user oversight
- **Audit Dashboard**: Monitor user activity and compliance
- **Bulk Import**: Import large datasets from JSON/CSV

### 🌍 **SEO & Growth**
- **Dynamic OG Images**: Auto-generated social media previews
- **RSS Feeds**: New strain entries feed
- **Sitemap Generation**: Automatic XML sitemap updates
- **Meta Optimization**: Comprehensive SEO meta tags
- **Performance**: Optimized for Core Web Vitals

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL (production) or SQLite (development)
- Git

### Installation

#### Method 1: Local Development (SQLite)

1. **Clone Repository**
   ```bash
   git clone https://github.com/VoxHash/nuvana-club.git
   cd nuvana-club
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Database Setup**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open Application**
   - Navigate to [http://localhost:3000](http://localhost:3000)

#### Method 2: Docker Development (MySQL)

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

#### Method 3: Production Deployment (Vercel)

1. **Fork Repository**
2. **Connect to Vercel**
3. **Set Environment Variables** (see Environment Variables section)
4. **Deploy**

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/weedwiki"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

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

### Database Configuration

#### Development (SQLite)
```bash
npm run db:switch-sqlite
npm run db:push
npm run db:seed
```

#### Production (PostgreSQL)
```bash
npm run db:switch-postgres
npm run db:push
npm run db:seed
```

## 🎯 Usage

### Strain Catalog
- **Browse**: View all 518+ strains with filtering
- **Search**: Find strains by name, type, or characteristics
- **Filter**: By THC%, CBD%, type, and tags
- **Details**: Comprehensive strain information and images
- **Favorites**: Save strains for later reference

### Grow Logging
- **Create Logs**: Start tracking your grows
- **Add Entries**: Log daily progress with structured data
- **View Charts**: Visualize growth metrics over time
- **Export Data**: Generate PDF or CSV reports
- **Share Publicly**: Make logs visible to the community

### Admin Panel
- **Manage Strains**: Add, edit, delete strain entries
- **Upload Images**: Manage strain image galleries
- **User Management**: Oversee user roles and activity
- **Audit Logs**: Monitor compliance and user actions

## 📁 Project Structure

```
weed-wiki/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── admin/                    # Admin panel
│   ├── api/                      # API routes
│   ├── grow/                     # Grow logging
│   ├── strains/                  # Strain catalog
│   └── layout.js                 # Root layout
├── components/                   # React components
│   ├── Form.js                   # Form components
│   ├── ThemeProvider.js          # Theme management
│   ├── FavoriteButton.js         # Favorites functionality
│   └── ...
├── lib/                          # Utility libraries
│   ├── auth.js                   # NextAuth configuration
│   ├── prisma.js                 # Database client
│   └── user-utils.js             # User management
├── prisma/                       # Database schema
│   ├── schema.prisma             # Prisma schema
│   └── seed.js                   # Database seeding
├── scripts/                      # Build and utility scripts
├── styles/                       # Global styles
└── public/                       # Static assets
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Push schema changes
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio
npm run db:migrate       # Run migrations

# Database Switching
npm run db:switch-sqlite # Switch to SQLite (development)
npm run db:switch-postgres # Switch to PostgreSQL (production)

# Production
npm run vercel-build     # Vercel build command
```

### Database Management

#### Local Development
```bash
# Use SQLite for local development
npm run db:switch-sqlite
npm run db:push
npm run db:seed
```

#### Production
```bash
# Use PostgreSQL for production
npm run db:switch-postgres
npm run db:push
npm run db:seed
```

### Adding New Strains

1. **Via Admin Panel** (Recommended)
   - Login as ADMIN
   - Navigate to `/admin/strains`
   - Use the "Add New Strain" form

2. **Via Database Seeding**
   - Add strain data to `scripts/all-strains.js`
   - Run `npm run db:seed`

3. **Via API**
   - POST to `/api/strains` with strain data

## 🔒 Security & Compliance

### Legal-First Design
- **Educational Content Only**: No cultivation instructions
- **Neutral Information**: Factual strain data without promotion
- **Compliance Safeguards**: Built-in legal gate and audit logging
- **Jurisdiction Support**: Per-region compliance profiles

### Security Features
- **Role-Based Access**: Granular permissions system
- **Secure Authentication**: NextAuth with multiple providers
- **Input Validation**: Comprehensive data validation
- **Audit Logging**: Track all user actions
- **Environment Protection**: Sensitive data in environment variables

## 📊 Supported Features

### Strain Data
- **Basic Info**: Name, type, summary, lineage
- **Cannabinoids**: THC and CBD ranges
- **Terpenes**: Detailed terpene profiles
- **Tags**: Searchable characteristics
- **Images**: Multiple images per strain

### Grow Logging
- **Structured Fields**: Stage, height, leaf count, environment
- **Freeform Notes**: Additional observations
- **Visual Charts**: Growth progress visualization
- **Export Options**: PDF and CSV formats
- **Privacy Controls**: Public/private visibility

### User Management
- **Authentication**: Multiple login methods
- **Roles**: USER, CONTRIBUTOR, ADMIN
- **Profiles**: Public user profiles
- **Favorites**: Save strains and logs
- **Comments**: Community engagement

## 🔧 Troubleshooting

### Common Issues

**Database Connection Issues:**
- Check `DATABASE_URL` environment variable
- Ensure database server is running
- Verify connection credentials

**Authentication Problems:**
- Check `NEXTAUTH_SECRET` and `NEXTAUTH_URL`
- Verify OAuth provider credentials
- Check callback URLs

**Build Errors:**
- Clear `.next` directory
- Reinstall dependencies
- Check Node.js version compatibility

**Image Upload Issues:**
- Check file permissions
- Verify upload directory exists
- Check file size limits

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/VoxHash/nuvana-club/issues)
- **Discussions**: [GitHub Discussions](https://github.com/VoxHash/nuvana-club/discussions)
- **Documentation**: See project documentation files

## 📋 Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📚 Documentation

- **[Changelog](CHANGELOG.md)** - Version history and updates
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Roadmap](ROADMAP.md)** - Development roadmap
- **[Development Goals](DEVELOPMENT_GOALS.md)** - Detailed objectives
- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[GitHub Topics](GITHUB_TOPICS.md)** - Repository topics
- **[Security Audit](SECURITY_AUDIT.md)** - Security and compliance information

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- **Next.js** - React framework for production
- **Prisma** - Next-generation ORM
- **Tailwind CSS** - Utility-first CSS framework
- **NextAuth** - Authentication for Next.js
- **Vercel** - Deployment platform
- **Community** - Feedback and contributions

---

**Made with ❤️ by VoxHash**

*Nuvana Club - Legal-first cannabis education and grow logging!* 🌿✨