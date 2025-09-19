// Simulate Vercel environment
process.env.VERCEL = '1';
process.env.NODE_ENV = 'production';

console.log('🧪 Testing Vercel build simulation...');
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Vercel: ${process.env.VERCEL}`);

// Test the switch-db.js script
const { execSync } = require('child_process');

try {
  console.log('\n📋 Running switch-db.js in Vercel simulation...');
  const output = execSync('node scripts/switch-db.js', { encoding: 'utf8' });
  console.log(output);
  
  // Check the schema file
  const fs = require('fs');
  const schemaContent = fs.readFileSync('prisma/schema.prisma', 'utf8');
  const provider = schemaContent.match(/provider = "(\w+)"/)?.[1];
  
  console.log(`\n✅ Schema provider: ${provider}`);
  
  if (provider === 'postgresql') {
    console.log('🎉 SUCCESS: Vercel simulation uses PostgreSQL!');
  } else {
    console.log('❌ ERROR: Vercel simulation should use PostgreSQL!');
  }
  
} catch (error) {
  console.error('❌ Test failed:', error.message);
}
