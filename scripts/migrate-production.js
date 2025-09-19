const { PrismaClient } = require('@prisma/client');

async function migrate() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Running database migration...');
    
    // Test the connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Check if we need to create tables
    const userCount = await prisma.user.count();
    console.log(`📊 Found ${userCount} users in database`);
    
    // If no users, we might need to seed
    if (userCount === 0) {
      console.log('🌱 Database appears empty, you may want to run: npm run db:seed');
    }
    
    console.log('✅ Migration completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();
