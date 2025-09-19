const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Cleaning up sensitive files from repository...');

// Files that should be removed from git tracking
const filesToRemove = [
  // Sensitive documentation
  'TEST_USERS.md',
  'VERCEL_ENV_SETUP.md',
  'PRODUCTION_TROUBLESHOOTING.md',
  'SECURITY_CLEANUP_SUMMARY.md',
  'SUPABASE_DATABASE_FIX.md',
  'VERCEL_DEPLOYMENT.md',
  
  // Database dumps and exports
  'weed-wiki-database.sql',
  
  // Environment files
  '.env.example',
  
  // Setup scripts that might contain sensitive data
  'setup-database.js',
  'setup-supabase.js',
  
  // Scripts that might contain sensitive data
  'scripts/check-env-vars.js',
  'scripts/check-production-db.js',
  'scripts/create-test-users.js',
  'scripts/test-auth-locally.js',
  'scripts/test-password-verification.js',
  'scripts/test-vercel-build.js',
  'scripts/verify-repo-schema.js',
  'scripts/extract-strains-from-sql.js',
  'scripts/all-strains.json',
  
  // Lock files (optional - some teams prefer to keep these)
  'package-lock.json'
];

// Files that should be added to .gitignore but kept locally
const filesToKeepLocally = [
  'TEST_USERS.md',
  'VERCEL_ENV_SETUP.md',
  'scripts/check-env-vars.js',
  'scripts/check-production-db.js',
  'scripts/create-test-users.js',
  'scripts/test-auth-locally.js',
  'scripts/test-password-verification.js'
];

console.log('📋 Files to remove from git tracking:');
filesToRemove.forEach(file => {
  console.log(`  - ${file}`);
});

console.log('\n📋 Files to keep locally but ignore in git:');
filesToKeepLocally.forEach(file => {
  console.log(`  - ${file}`);
});

// Check if files exist and remove them from git
let removedCount = 0;
let keptCount = 0;

filesToRemove.forEach(file => {
  try {
    // Check if file exists in git
    execSync(`git ls-files --error-unmatch "${file}"`, { stdio: 'pipe' });
    
    // Remove from git tracking
    execSync(`git rm --cached "${file}"`, { stdio: 'pipe' });
    console.log(`✅ Removed from git: ${file}`);
    removedCount++;
    
    // If it's in the keep locally list, restore it
    if (filesToKeepLocally.includes(file)) {
      execSync(`git checkout HEAD -- "${file}"`, { stdio: 'pipe' });
      console.log(`📁 Kept locally: ${file}`);
      keptCount++;
    }
  } catch (error) {
    // File not tracked by git or doesn't exist
    console.log(`ℹ️  Not tracked: ${file}`);
  }
});

console.log(`\n📊 Summary:`);
console.log(`  - Removed from git: ${removedCount} files`);
console.log(`  - Kept locally: ${keptCount} files`);

console.log('\n🔒 Security recommendations:');
console.log('1. Never commit .env files or any file containing secrets');
console.log('2. Use environment variables for all sensitive data');
console.log('3. Regularly audit your repository for sensitive information');
console.log('4. Use tools like git-secrets or truffleHog to scan for secrets');

console.log('\n✅ Cleanup complete! Remember to commit these changes.');
