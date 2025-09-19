#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

// Check if DATABASE_URL is set, if not use local SQLite
const databaseUrl = process.env.DATABASE_URL || 'file:./dev.db';

// Create Prisma client with the appropriate database URL
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl
    }
  }
});

async function setupDatabase() {
  try {
    console.log('🚀 Setting up database...');
    
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Create admin user
    console.log('👤 Creating admin user...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      create: { 
        email: 'admin@example.com', 
        name: 'Admin', 
        password: adminPassword, 
        role: 'ADMIN' 
      },
      update: {}
    });
    console.log('✅ Admin user created:', admin.email);
    
    // Create sample strains
    console.log('🌿 Creating sample strains...');
    const strains = [
      {
        name: 'Aurora Drift',
        type: 'Indica',
        summary: 'Notes of earth and pine. Neutral catalog entry emphasizing aroma and reported effects without guidance.',
        lineage: 'Unknown',
        terpenes: 'Myrcene, Caryophyllene',
        thcMin: 14.0, thcMax: 22.0, cbdMin: 0.1, cbdMax: 1.0
      },
      {
        name: 'Citrus Haze',
        type: 'Sativa',
        summary: 'Citrus-forward profile and bright aroma. Neutral description only.',
        lineage: 'Haze cross',
        terpenes: 'Limonene, Terpinolene',
        thcMin: 16.0, thcMax: 24.0, cbdMin: 0.1, cbdMax: 1.0
      },
      {
        name: 'Balanced Blend',
        type: 'Hybrid',
        summary: 'Even-keeled profile in aroma and reported effects. No cultivation how‑to details included.',
        lineage: 'Hybrid mix',
        terpenes: 'Linalool, Pinene',
        thcMin: 12.0, thcMax: 20.0, cbdMin: 0.1, cbdMax: 2.0
      }
    ];
    
    for (const strain of strains) {
      await prisma.strain.upsert({
        where: { name: strain.name },
        create: strain,
        update: {}
      });
    }
    console.log('✅ Sample strains created');
    
    console.log('🎉 Database setup completed successfully!');
    console.log('\n📋 Login credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();
