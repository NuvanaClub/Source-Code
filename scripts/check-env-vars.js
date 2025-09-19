console.log('🔍 Checking environment variables...');

const requiredVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'DISCORD_CLIENT_ID',
  'DISCORD_CLIENT_SECRET',
  'TWITTER_CLIENT_ID',
  'TWITTER_CLIENT_SECRET'
];

console.log('📋 Environment Variables Status:');
console.log('================================');

requiredVars.forEach(varName => {
  const value = process.env[varName];
  const status = value ? '✅ Set' : '❌ Missing';
  const displayValue = value ? (varName.includes('SECRET') || varName.includes('URL') ? '***' : value) : 'Not set';
  console.log(`${status} ${varName}: ${displayValue}`);
});

console.log('\n🌍 Environment Info:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('VERCEL:', process.env.VERCEL);
console.log('VERCEL_ENV:', process.env.VERCEL_ENV);

console.log('\n🔧 NextAuth Configuration:');
console.log('NEXTAUTH_SECRET length:', process.env.NEXTAUTH_SECRET?.length || 'Not set');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL || 'Not set');
