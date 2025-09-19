const fs = require('fs');

console.log('🔍 Verifying repository schema for Vercel deployment...');

// Read the current schema
const schemaContent = fs.readFileSync('prisma/schema.prisma', 'utf8');
const provider = schemaContent.match(/provider = "(\w+)"/)?.[1];

console.log(`📋 Current schema provider: ${provider}`);

if (provider === 'postgresql') {
  console.log('✅ Repository schema is correctly set to PostgreSQL');
  console.log('🚀 Ready for Vercel deployment!');
} else {
  console.log('❌ Repository schema is NOT PostgreSQL');
  console.log('⚠️  This will cause Vercel deployment issues');
  console.log('   Please ensure prisma/schema.prisma uses provider = "postgresql"');
  process.exit(1);
}
