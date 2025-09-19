const fs = require('fs');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const isProduction = environment === 'production';

console.log(`Switching to ${isProduction ? 'PostgreSQL' : 'SQLite'} schema...`);

const sourceSchema = isProduction 
  ? 'prisma/schema.prisma' 
  : 'prisma/schema.sqlite.prisma';

const targetSchema = 'prisma/schema.prisma';

try {
  // Read the appropriate schema file
  const schemaContent = fs.readFileSync(sourceSchema, 'utf8');
  
  // Write to the main schema file
  fs.writeFileSync(targetSchema, schemaContent);
  
  console.log(`✅ Schema switched to ${isProduction ? 'PostgreSQL' : 'SQLite'}`);
} catch (error) {
  console.error('❌ Error switching schema:', error.message);
  process.exit(1);
}
