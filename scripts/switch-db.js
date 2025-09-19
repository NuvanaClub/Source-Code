const fs = require('fs');
const path = require('path');

// Check for local development (SQLite) vs production (PostgreSQL)
const isVercel = process.env.VERCEL === '1';
const isLocalDev = !isVercel && process.env.NODE_ENV !== 'production';

// Use SQLite for local development, PostgreSQL for everything else
const useSQLite = isLocalDev;

console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`Vercel: ${process.env.VERCEL ? 'Yes' : 'No'}`);
console.log(`isLocalDev: ${isLocalDev}`);
console.log(`Using ${useSQLite ? 'SQLite' : 'PostgreSQL'} schema...`);

const sourceSchema = useSQLite 
  ? 'prisma/schema.sqlite.prisma' 
  : 'prisma/schema.prisma';

const targetSchema = 'prisma/schema.prisma';

try {
  // Read the appropriate schema file
  const schemaContent = fs.readFileSync(sourceSchema, 'utf8');
  
  // Write to the main schema file
  fs.writeFileSync(targetSchema, schemaContent);
  
  console.log(`✅ Schema switched to ${useSQLite ? 'SQLite' : 'PostgreSQL'}`);
} catch (error) {
  console.error('❌ Error switching schema:', error.message);
  process.exit(1);
}
