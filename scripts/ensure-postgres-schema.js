const fs = require('fs');

console.log('🔧 Ensuring PostgreSQL schema for Vercel...');

// Read the current schema
const schemaContent = fs.readFileSync('prisma/schema.prisma', 'utf8');

// Check if it's already PostgreSQL
if (schemaContent.includes('provider = "postgresql"')) {
  console.log('✅ Schema is already PostgreSQL');
} else {
  console.log('❌ Schema is not PostgreSQL, this will cause Vercel deployment issues');
  console.log('Current provider:', schemaContent.match(/provider = "(\w+)"/)?.[1]);
}

// Verify the schema file
const provider = schemaContent.match(/provider = "(\w+)"/)?.[1];
console.log(`📋 Current schema provider: ${provider}`);

if (provider === 'postgresql') {
  console.log('🎉 Schema is correctly set to PostgreSQL for Vercel deployment');
} else {
  console.log('⚠️  WARNING: Schema should be PostgreSQL for Vercel deployment');
  console.log('   Please ensure prisma/schema.prisma uses provider = "postgresql"');
}
