const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const allStrains = require('./all-strains');

const prisma = new PrismaClient();

async function resetAndSeed() {
  console.log('🔄 Resetting and seeding production database...');
  console.log('🌍 Environment:', process.env.NODE_ENV);
  console.log('🔗 Database URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');

  try {
    // Test database connection first
    console.log('📡 Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // First, clear existing strains
    console.log('🗑️  Clearing existing strains...');
    await prisma.strain.deleteMany({});
    console.log('✅ Existing strains cleared');

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
        bio: 'System administrator for Weed Wiki',
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
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < allStrains.length; i++) {
      try {
        const strainData = allStrains[i];
        const strain = await prisma.strain.create({
          data: strainData,
        });
        successCount++;
        if (i % 50 === 0 || i < 10) { // Log every 50 strains or first 10
          console.log(`✅ Strain ${i + 1}/${allStrains.length} created: ${strain.name}`);
        }
      } catch (error) {
        errorCount++;
        console.error(`❌ Error creating strain ${i + 1}:`, error.message);
        if (errorCount > 10) {
          console.error('❌ Too many errors, stopping strain creation');
          break;
        }
      }
    }
    
    console.log(`📊 Strain creation complete: ${successCount} successful, ${errorCount} errors`);

    console.log('🎉 Production database reset and seeded successfully!');
  } catch (error) {
    console.error('❌ Error resetting and seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

resetAndSeed();
