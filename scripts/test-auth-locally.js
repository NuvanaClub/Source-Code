const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testAuthLocally() {
  console.log('🔐 Testing authentication locally...');

  try {
    // Simulate the exact auth.js authorize function
    const credentials = {
      email: 'admin@weedwiki.com',
      password: 'admin123'
    };

    console.log('📝 Testing credentials:', credentials);

    if (!credentials?.email || !credentials?.password) {
      console.log('❌ Missing credentials');
      return null;
    }

    console.log('✅ Credentials present');

    const user = await prisma.user.findUnique({ 
      where: { email: credentials.email } 
    });

    console.log('👤 User lookup result:', {
      found: !!user,
      email: user?.email,
      name: user?.name,
      role: user?.role,
      hasPassword: !!user?.password
    });

    if (!user || !user.password) {
      console.log('❌ User not found or no password');
      return null;
    }

    console.log('✅ User found with password');

    const ok = await bcrypt.compare(credentials.password, user.password);
    console.log('🔑 Password comparison result:', ok);

    if (!ok) {
      console.log('❌ Password comparison failed');
      return null;
    }

    const result = { 
      id: user.id, 
      email: user.email, 
      name: user.name, 
      role: user.role, 
      image: user.image 
    };

    console.log('✅ Authentication successful:', result);
    return result;

  } catch (error) {
    console.error('❌ Authentication error:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

testAuthLocally();
