const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUsers() {
  console.log('👥 Creating test users...');

  try {
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@weedwiki.com' },
      update: {
        password: adminPassword,
        name: 'Admin User',
        role: 'ADMIN',
        bio: 'System administrator for Nuvana Club',
        location: 'Global'
      },
      create: {
        email: 'admin@weedwiki.com',
        name: 'Admin User',
        password: adminPassword,
        role: 'ADMIN',
        bio: 'System administrator for Nuvana Club',
        location: 'Global'
      },
    });
    console.log('✅ Admin user created/updated:', adminUser.email);

    // Create contributor user
    const contributorPassword = await bcrypt.hash('contrib123', 10);
    const contributorUser = await prisma.user.upsert({
      where: { email: 'contributor@weedwiki.com' },
      update: {
        password: contributorPassword,
        name: 'Contributor User',
        role: 'CONTRIBUTOR',
        bio: 'Cannabis enthusiast and strain researcher',
        location: 'California, USA'
      },
      create: {
        email: 'contributor@weedwiki.com',
        name: 'Contributor User',
        password: contributorPassword,
        role: 'CONTRIBUTOR',
        bio: 'Cannabis enthusiast and strain researcher',
        location: 'California, USA'
      },
    });
    console.log('✅ Contributor user created/updated:', contributorUser.email);

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 10);
    const regularUser = await prisma.user.upsert({
      where: { email: 'user@weedwiki.com' },
      update: {
        password: userPassword,
        name: 'Regular User',
        role: 'USER',
        bio: 'Cannabis enthusiast exploring strains',
        location: 'Oregon, USA'
      },
      create: {
        email: 'user@weedwiki.com',
        name: 'Regular User',
        password: userPassword,
        role: 'USER',
        bio: 'Cannabis enthusiast exploring strains',
        location: 'Oregon, USA'
      },
    });
    console.log('✅ Regular user created/updated:', regularUser.email);

    console.log('🎉 All test users created successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('ADMIN: admin@weedwiki.com / admin123');
    console.log('CONTRIBUTOR: contributor@weedwiki.com / contrib123');
    console.log('USER: user@weedwiki.com / user123');

  } catch (error) {
    console.error('❌ Error creating test users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUsers();
