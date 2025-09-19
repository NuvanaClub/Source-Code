#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

console.log('🚀 Supabase Database Setup Script');
console.log('=====================================');

// Get connection string from command line or environment
const connectionString = process.argv[2] || process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ Please provide a DATABASE_URL');
  console.log('Usage: node setup-supabase.js "postgresql://postgres:password@host:5432/postgres"');
  process.exit(1);
}

console.log('🔗 Using connection string:', connectionString.replace(/:[^:@]+@/, ':***@'));

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionString
    }
  }
});

async function setupDatabase() {
  try {
    console.log('⏳ Connecting to database...');
    await prisma.$connect();
    console.log('✅ Connected successfully!');

    console.log('⏳ Creating tables...');
    
    // Create tables using raw SQL
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "name" TEXT,
        "password" TEXT NOT NULL,
        "role" TEXT NOT NULL DEFAULT 'USER',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "User_pkey" PRIMARY KEY ("id")
      );
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Strain" (
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
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Grow" (
        "id" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "strainId" TEXT,
        "title" TEXT NOT NULL,
        "visibility" TEXT NOT NULL DEFAULT 'private',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Grow_pkey" PRIMARY KEY ("id")
      );
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "GrowEntry" (
        "id" TEXT NOT NULL,
        "growId" TEXT NOT NULL,
        "note" TEXT NOT NULL,
        "photoPath" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "metrics" TEXT,
        CONSTRAINT "GrowEntry_pkey" PRIMARY KEY ("id")
      );
    `;

    console.log('✅ Tables created successfully!');

    // Create indexes
    console.log('⏳ Creating indexes...');
    await prisma.$executeRaw`CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");`;
    await prisma.$executeRaw`CREATE UNIQUE INDEX IF NOT EXISTS "Strain_name_key" ON "Strain"("name");`;
    console.log('✅ Indexes created successfully!');

    // Create foreign key constraints
    console.log('⏳ Creating foreign key constraints...');
    await prisma.$executeRaw`ALTER TABLE "Grow" ADD CONSTRAINT "Grow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;`;
    await prisma.$executeRaw`ALTER TABLE "Grow" ADD CONSTRAINT "Grow_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "Strain"("id") ON DELETE SET NULL ON UPDATE CASCADE;`;
    await prisma.$executeRaw`ALTER TABLE "GrowEntry" ADD CONSTRAINT "GrowEntry_growId_fkey" FOREIGN KEY ("growId") REFERENCES "Grow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;`;
    console.log('✅ Foreign key constraints created successfully!');

    // Check if admin user exists
    console.log('⏳ Checking for admin user...');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminUser = await prisma.user.findUnique({ where: { email: adminEmail } });
    
    if (!adminUser) {
      console.log('⏳ Creating admin user...');
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await prisma.user.create({
        data: {
          id: 'admin-123',
          email: adminEmail,
          name: 'Admin User',
          password: hashedPassword,
          role: 'ADMIN'
        }
      });
      console.log('✅ Admin user created successfully!');
    } else {
      console.log('✅ Admin user already exists');
    }

    // Add some sample strains
    console.log('⏳ Adding sample strains...');
    const strains = [
      {
        id: 'strain-1',
        name: 'Blue Dream',
        type: 'Hybrid',
        summary: 'A balanced hybrid with sweet berry aroma',
        thcMin: 15.0,
        thcMax: 24.0,
        cbdMin: 0.1,
        cbdMax: 0.2
      },
      {
        id: 'strain-2',
        name: 'OG Kush',
        type: 'Indica',
        summary: 'Classic indica with earthy pine flavor',
        thcMin: 18.0,
        thcMax: 26.0,
        cbdMin: 0.1,
        cbdMax: 0.3
      }
    ];

    for (const strain of strains) {
      await prisma.strain.upsert({
        where: { name: strain.name },
        update: {},
        create: strain
      });
    }
    console.log('✅ Sample strains added successfully!');

    // Test the setup
    console.log('⏳ Testing setup...');
    const userCount = await prisma.user.count();
    const strainCount = await prisma.strain.count();
    
    console.log('📊 Database Summary:');
    console.log(`   Users: ${userCount}`);
    console.log(`   Strains: ${strainCount}`);
    
    console.log('🎉 Database setup completed successfully!');
    console.log('');
    console.log('🔑 Admin credentials:');
    console.log('   Email: ' + (process.env.ADMIN_EMAIL || 'admin@example.com'));
    console.log('   Password: ' + (process.env.ADMIN_PASSWORD || 'admin123'));
    console.log('');
    console.log('🌐 Test your app at: https://nuvana.club');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();
