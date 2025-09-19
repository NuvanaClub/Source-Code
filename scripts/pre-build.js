const fs = require('fs');
const path = require('path');

console.log('🔧 Pre-build script running...');

// Check environment
const isVercel = process.env.VERCEL === '1';
const isProduction = process.env.NODE_ENV === 'production';
const isLocalDev = process.env.NODE_ENV === 'development' && !isVercel;

console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`Vercel: ${isVercel ? 'Yes' : 'No'}`);
console.log(`Local Dev: ${isLocalDev ? 'Yes' : 'No'}`);

// For Vercel, always use PostgreSQL schema
// For local development, use SQLite schema
const useSQLite = isLocalDev;

console.log(`Will use ${useSQLite ? 'SQLite' : 'PostgreSQL'} schema`);

const sourceSchema = useSQLite 
  ? 'prisma/schema.sqlite.prisma' 
  : 'prisma/schema.prisma';

console.log(`Source schema: ${sourceSchema}`);

const targetSchema = 'prisma/schema.prisma';

try {
  // Read the appropriate schema file
  const schemaContent = fs.readFileSync(sourceSchema, 'utf8');
  
  // Write to the main schema file
  fs.writeFileSync(targetSchema, schemaContent);
  
  console.log(`✅ Pre-build: Schema set to ${useSQLite ? 'SQLite' : 'PostgreSQL'}`);
  
  // Verify the schema was written correctly
  const writtenContent = fs.readFileSync(targetSchema, 'utf8');
  const provider = writtenContent.match(/provider = "(\w+)"/)?.[1];
  console.log(`✅ Pre-build: Confirmed provider is ${provider}`);
  
} catch (error) {
  console.error('❌ Pre-build error:', error.message);
  process.exit(1);
}
