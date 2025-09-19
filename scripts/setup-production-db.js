const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const allStrains = require('./all-strains');

const prisma = new PrismaClient();

async function setupDatabase() {
  console.log('🚀 Setting up production database...');

  try {
    // First, try to push the schema to create tables
    console.log('📋 Pushing database schema...');
    const { execSync } = require('child_process');
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
    console.log('✅ Database schema pushed successfully');

    // Wait a moment for the database to be ready
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Now seed the database
    console.log('🌱 Seeding database...');
    
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@weedwiki.com' },
      update: {},
      create: {
        email: 'admin@weedwiki.com',
        name: 'Admin User',
        password: adminPassword,
        role: 'ADMIN',
        bio: 'System administrator for Nuvana Club',
        location: 'Global'
      },
    });

    // Create contributor user
    const contributorPassword = await bcrypt.hash('contrib123', 10);
    const contributorUser = await prisma.user.upsert({
      where: { email: 'contributor@weedwiki.com' },
      update: {},
      create: {
        email: 'contributor@weedwiki.com',
        name: 'Contributor User',
        password: contributorPassword,
        role: 'CONTRIBUTOR',
        bio: 'Cannabis enthusiast and strain researcher',
        location: 'California, USA'
      },
    });

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 10);
    const regularUser = await prisma.user.upsert({
      where: { email: 'user@weedwiki.com' },
      update: {},
      create: {
        email: 'user@weedwiki.com',
        name: 'Regular User',
        password: userPassword,
        role: 'USER',
        bio: 'Cannabis enthusiast exploring strains',
        location: 'Oregon, USA'
      },
    });

    console.log('✅ Users created:', adminUser.email, contributorUser.email, regularUser.email);

    // Create all 518 strains
    console.log(`🌱 Creating ${allStrains.length} strains...`);
    
    for (const strainData of allStrains) {
      const strain = await prisma.strain.upsert({
        where: { name: strainData.name },
        update: {},
        create: strainData,
      });
      console.log(`✅ Strain created: ${strain.name}`);
    }

    console.log('🎉 Production database setup complete!');
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();
