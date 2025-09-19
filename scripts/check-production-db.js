const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDatabase() {
  console.log('🔍 Checking production database...');

  try {
    // Check if we can connect
    console.log('📡 Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // Check user count
    console.log('👥 Checking users...');
    const userCount = await prisma.user.count();
    console.log(`📊 Total users: ${userCount}`);

    if (userCount > 0) {
      const users = await prisma.user.findMany({
        select: {
          email: true,
          name: true,
          role: true,
          createdAt: true
        },
        orderBy: { createdAt: 'asc' }
      });
      
      console.log('👤 Users in database:');
      users.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.email} (${user.role}) - ${user.name}`);
      });
    }

    // Check strain count
    console.log('🌱 Checking strains...');
    const strainCount = await prisma.strain.count();
    console.log(`📊 Total strains: ${strainCount}`);

    if (strainCount > 0) {
      const strains = await prisma.strain.findMany({
        select: {
          name: true,
          type: true,
          createdAt: true
        },
        orderBy: { createdAt: 'asc' },
        take: 5
      });
      
      console.log('🌿 First 5 strains:');
      strains.forEach((strain, index) => {
        console.log(`  ${index + 1}. ${strain.name} (${strain.type})`);
      });
    }

    // Test a specific user lookup
    console.log('🔐 Testing user lookup...');
    const testUser = await prisma.user.findUnique({
      where: { email: 'admin@weedwiki.com' }
    });
    
    if (testUser) {
      console.log('✅ Admin user found:', {
        email: testUser.email,
        name: testUser.name,
        role: testUser.role,
        hasPassword: !!testUser.password
      });
    } else {
      console.log('❌ Admin user not found');
    }

  } catch (error) {
    console.error('❌ Database check failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
