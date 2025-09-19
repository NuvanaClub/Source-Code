const { PrismaClient } = require('@prisma/client');

async function setupVercel() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🚀 Setting up Vercel database...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected');
    
    // Check if tables exist by trying to count users
    const userCount = await prisma.user.count();
    console.log(`📊 Found ${userCount} users`);
    
    if (userCount === 0) {
      console.log('🌱 Database is empty, consider running seed script');
    }
    
    console.log('✅ Vercel setup completed');
  } catch (error) {
    console.error('❌ Setup failed:', error);
    
    if (error.message.includes('relation "User" does not exist')) {
      console.log('💡 Database tables not created yet. Run migrations first.');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupVercel();
