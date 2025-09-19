# Weed Wiki 🌿

A modern, full-stack cannabis strain catalog and personal grow logging application built with Next.js, Prisma, and NextAuth. Features a neutral strain database and personal grow tracking with legal-first design principles.

[![GitHub stars](https://img.shields.io/github/stars/voxhash/weed-wiki?style=social)](https://github.com/voxhash/weed-wiki)
[![GitHub forks](https://img.shields.io/github/forks/voxhash/weed-wiki?style=social)](https://github.com/voxhash/weed-wiki/fork)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)

> **Legal-First Design**: This application provides neutral strain information and personal logging capabilities without cultivation instructions.

## 🎯 Demo

![Weed Wiki Demo](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Weed+Wiki+Demo)

> **Live Demo**: https://weedwiki.voxhash.dev | **Video Demo**: [Watch on YouTube](https://youtube.com/@voxhash)

## ✨ Features

- **🌿 Strain Catalog**: Browse and search cannabis strains with detailed information
- **📊 Strain Details**: THC/CBD ranges, terpenes, lineage, and strain summaries
- **📝 Personal Grow Logs**: Track your personal growing journey with photos and notes
- **👤 User Authentication**: Secure login with NextAuth and role-based access
- **🔐 Admin Panel**: Manage strains and user content (Admin role)
- **📸 Photo Uploads**: Add photos to your grow log entries
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **⚡ Fast & Modern**: Built with Next.js 14 App Router and Prisma ORM
- **🛡️ Legal-First**: No cultivation instructions, neutral information only

## 🎯 Why This Project?

I built Weed Wiki to demonstrate:

- **Full-Stack Development Skills**: Modern React/Next.js frontend with server-side rendering
- **Database Design**: Efficient data modeling with Prisma ORM and PostgreSQL
- **Authentication**: NextAuth integration with credentials and role-based access
- **File Handling**: Image uploads and storage management
- **UI/UX Design**: Responsive, modern interface with Tailwind CSS
- **Production Readiness**: Proper configuration, documentation, and deployment setup

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **NextAuth** - Authentication for Next.js

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Modern database ORM
- **PostgreSQL** - Production database
- **SQLite** - Development database
- **bcryptjs** - Password hashing

### Database
- **SQLite** - Local database for development
- **PostgreSQL** - Production database (Supabase)
- **Prisma** - Type-safe database access

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 🚀 Quick Start

### Option 1: Local Development (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/voxhash/weed-wiki
   cd weed-wiki
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and configure your settings:
   ```env
   # Database
   DATABASE_URL="file:./prisma/dev.db"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   
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

4. **Setup database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin/strains (Admin role required)

### Option 2: Docker Development

1. **Clone and setup**
   ```bash
   git clone https://github.com/voxhash/weed-wiki
   cd weed-wiki
   cp .env.example .env
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Setup database**
   ```bash
   docker-compose exec app npm run db:push
   docker-compose exec app npm run db:seed
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Database: localhost:3306 (MySQL)
   - Redis: localhost:6379

## 📖 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signin` | User sign in |
| POST | `/api/auth/signout` | User sign out |
| POST | `/api/register` | User registration |

### Strain Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/strains` | Get all strains |
| GET | `/api/strains/[id]` | Get specific strain |
| POST | `/api/strains/create` | Create new strain (Admin) |

### Grow Log Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/grow` | Get user's grow logs |
| POST | `/api/grow/create` | Create new grow log |
| POST | `/api/grow/[id]/entry` | Add entry to grow log |

## 🗄️ Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  role      String   @default("USER")
  grows     Grow[]
  createdAt DateTime @default(now())
}

model Strain {
  id        String   @id @default(cuid())
  name      String   @unique
  type      String?
  summary   String?
  lineage   String?
  thcMin    Float?
  thcMax    Float?
  cbdMin    Float?
  cbdMax    Float?
  terpenes  String?
  grows     Grow[]
  createdAt DateTime @default(now())
}

model Grow {
  id         String      @id @default(cuid())
  user       User        @relation(fields: [userId], references: [id])
  userId     String
  strain     Strain?     @relation(fields: [strainId], references: [id])
  strainId   String?
  title      String
  visibility String      @default("private")
  entries    GrowEntry[]
  createdAt  DateTime    @default(now())
}

model GrowEntry {
  id        String   @id @default(cuid())
  grow      Grow     @relation(fields: [growId], references: [id])
  growId    String
  note      String
  photoPath String?
  metrics   String?
  createdAt DateTime @default(now())
}
```

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
```

### Database Management

```bash
npm run db:push      # Push Prisma schema to database
npm run db:seed      # Run seed script to populate database
```

## 📁 Project Structure

```
weed-wiki/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── admin/               # Admin panel
│   │   └── strains/
│   ├── api/                 # API routes
│   │   ├── auth/
│   │   ├── register/
│   │   └── upload/
│   ├── grow/                # Grow log pages
│   │   ├── [id]/
│   │   ├── new/
│   │   └── api/
│   ├── strains/             # Strain catalog
│   │   └── [id]/
│   ├── layout.js            # Root layout
│   └── page.js              # Home page
├── components/              # Reusable components
├── lib/                     # Utility libraries
│   ├── auth.js              # NextAuth configuration
│   └── prisma.js            # Prisma client
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.js              # Database seeding
├── public/
│   └── uploads/             # Uploaded files
└── styles/
    └── globals.css          # Global styles
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

## 🚀 Production Deployment

### Complete Vercel + Supabase Deployment Guide

#### Step 1: Setup Supabase Database

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Sign up/Login and create a new project
   - Choose a region close to your users
   - Wait for the project to be ready (2-3 minutes)

2. **Get Database Connection String**
   - Go to Settings > Database
   - Copy the "Connection string" (URI format)
   - It should look like: `postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres`
   - Replace `[YOUR-PASSWORD]` with your database password

#### Step 2: Deploy to Vercel

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your `VoxHash/weed-wiki` repository
   - **IMPORTANT**: Select the `live` branch (not main)
   - Framework: Next.js (auto-detected)

2. **Configure Environment Variables**
   In Vercel project settings, add these environment variables:
   ```
   DATABASE_URL = postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres
   NEXTAUTH_SECRET = [GENERATE-A-SECURE-32-CHAR-SECRET]
   NEXTAUTH_URL = https://your-app-name.vercel.app
   ```

   **To generate NEXTAUTH_SECRET:**
   ```bash
   # Run this in your terminal
   openssl rand -base64 32
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Your app will be live at `https://your-app-name.vercel.app`

#### Step 3: Setup Production Database

**Method 1: Using Supabase Dashboard (Recommended)**
1. Go to your Supabase project dashboard
2. Click on "SQL Editor"
3. Run this SQL to create the tables:

```sql
-- Create User table
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Create Strain table
CREATE TABLE "Strain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "summary" TEXT,
    "lineage" TEXT,
    "thcMin" DOUBLE PRECISION,
    "thcMax" DOUBLE PRECISION,
    "cbdMin" DOUBLE PRECISION,
    "cbdMax" DOUBLE PRECISION,
    "terpenes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Strain_pkey" PRIMARY KEY ("id")
);

-- Create Grow table
CREATE TABLE "Grow" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "strainId" TEXT,
    "title" TEXT NOT NULL,
    "visibility" TEXT NOT NULL DEFAULT 'private',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Grow_pkey" PRIMARY KEY ("id")
);

-- Create GrowEntry table
CREATE TABLE "GrowEntry" (
    "id" TEXT NOT NULL,
    "growId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "photoPath" TEXT,
    "metrics" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GrowEntry_pkey" PRIMARY KEY ("id")
);

-- Create unique constraints
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Strain_name_key" ON "Strain"("name");

-- Add foreign key constraints
ALTER TABLE "Grow" ADD CONSTRAINT "Grow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Grow" ADD CONSTRAINT "Grow_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "Strain"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "GrowEntry" ADD CONSTRAINT "GrowEntry_growId_fkey" FOREIGN KEY ("growId") REFERENCES "Grow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
```

4. Click "Run" to execute the SQL

**Method 2: Using Local Setup Script**
1. Clone your repository locally
2. Create a `.env.local` file with your production DATABASE_URL
3. Run the setup script:

```bash
# Set your production database URL
export DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres"

# Run the setup script
node setup-database.js
```

#### Step 4: Test Your Production App

1. **Basic Functionality Test**
   - Visit your Vercel URL
   - Test user registration
   - Test login with admin credentials:
     - Email: `admin@example.com`
     - Password: `admin123`
   - Test strain browsing
   - Test grow log creation

2. **Admin Panel Test**
   - Login as admin
   - Go to `/admin/strains`
   - Test creating new strains
   - Verify admin functionality

#### Step 5: Troubleshooting

**Common Issues and Solutions:**

1. **Database Connection Errors**
   - **Problem**: "Database connection failed"
   - **Solution**: Verify DATABASE_URL is correct and includes password

2. **Authentication Issues**
   - **Problem**: "User ID not found in session"
   - **Solution**: Check NEXTAUTH_SECRET and NEXTAUTH_URL are set correctly

3. **Build Errors**
   - **Problem**: Build fails on Vercel
   - **Solution**: Check Vercel function logs for specific errors

4. **CORS Issues**
   - **Problem**: API calls fail
   - **Solution**: Ensure NEXTAUTH_URL matches your Vercel domain exactly

**Debug Steps:**
1. Check Vercel function logs
2. Test API endpoints individually
3. Verify environment variables in Vercel dashboard
4. Check Supabase connection in dashboard

#### Step 6: Production Checklist

- [ ] Supabase project created
- [ ] Database connection string obtained
- [ ] Vercel project connected to live branch
- [ ] Environment variables configured
- [ ] Database tables created
- [ ] Admin user created
- [ ] Sample data seeded
- [ ] App tested in production
- [ ] All features working correctly

## 🔒 Security Notes

- Use strong, unique secrets
- Enable Row Level Security in Supabase
- Set up proper CORS policies
- Monitor database usage
- Regular security updates

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all checks pass

### Ideas for Contributions
- Add strain search and filtering
- Implement grow log analytics
- Add strain comparison features
- Create mobile app version
- Add strain recommendation system

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚖️ Legal Disclaimer

This application is designed for educational and informational purposes only. It does not provide cultivation instructions or encourage illegal activities. Users are responsible for complying with all applicable laws and regulations in their jurisdiction.

## 🎯 Future Enhancements

- [ ] Advanced strain search and filtering
- [ ] Grow log analytics and insights
- [ ] Strain comparison tools
- [ ] Community features and sharing
- [ ] Mobile app (React Native)
- [ ] Strain recommendation system
- [ ] Export/import functionality
- [ ] Advanced photo management

## 📞 Connect with Me

- **GitHub**: [@voxhash](https://github.com/voxhash)
- **LinkedIn**: [Connect with me](https://linkedin.com/in/voxhash)
- **Portfolio**: [View my work](https://voxhash.dev)
- **Email**: [Get in touch](mailto:contact@voxhash.dev)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=voxhash/weed-wiki&type=Date)](https://star-history.com/#voxhash/weed-wiki&Date)

---

<div align="center">

**Built with ❤️ by [@voxhash](https://github.com/voxhash)**

*AI Engineer | Blockchain, Web3 and Smart Contracts*

[![GitHub followers](https://img.shields.io/github/followers/voxhash?style=social)](https://github.com/voxhash)
[![Twitter Follow](https://img.shields.io/twitter/follow/voxhash?style=social)](https://twitter.com/voxhash)

</div>