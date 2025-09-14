# Development Workflow

## Branch Strategy

### **Main Branch** (`main`)
- **Purpose**: Open-source, clean code repository
- **Content**: Production-ready code without sensitive data
- **Visibility**: Public repository
- **Usage**: Source of truth for open-source development

### **Live Branch** (`live`)
- **Purpose**: Deployment and testing branch
- **Content**: Code ready for Vercel deployment
- **Visibility**: Private (if needed)
- **Usage**: Testing changes before merging to main

## Workflow Process

### 1. **Development on Live Branch**
```bash
# Switch to live branch for testing
git checkout live

# Make your changes
# ... edit files ...

# Commit changes
git add .
git commit -m "Feature: Add new functionality"

# Push to live branch for testing
git push origin live
```

### 2. **Test on Vercel**
- Changes pushed to `live` branch automatically deploy to Vercel
- Test all functionality on `https://weedwiki.voxhash.dev`
- Verify no sensitive data is exposed

### 3. **Merge to Main (Open Source)**
```bash
# Switch to main branch
git checkout main

# Merge tested changes from live
git merge live

# Push to main (open source)
git push origin main
```

## Security Guidelines

### **Never Commit to Main:**
- ❌ Database connection strings
- ❌ API keys or secrets
- ❌ Admin credentials
- ❌ Production environment variables
- ❌ Personal information

### **Safe for Main Branch:**
- ✅ Environment variable placeholders
- ✅ Documentation with generic examples
- ✅ Configuration templates
- ✅ Open-source code

### **Environment Variables**
- Store sensitive data in Vercel environment variables
- Use `.env.example` files for documentation
- Never commit `.env` files

## File Structure

### **Safe Files (Main Branch)**
```
├── .env.example          # Environment variable template
├── README.md            # Project documentation
├── package.json         # Dependencies
├── prisma/schema.prisma # Database schema
└── app/                 # Application code
```

### **Sensitive Files (Live Branch Only)**
```
├── .env                 # Local environment variables
├── setup-database.js    # Database setup with credentials
└── test-*.js           # Test scripts with real data
```

## Quick Commands

### **Start Development**
```bash
git checkout live
npm install
npm run dev
```

### **Deploy Changes**
```bash
git add .
git commit -m "Your changes"
git push origin live
# Wait for Vercel deployment
```

### **Release to Open Source**
```bash
git checkout main
git merge live
git push origin main
```

## Best Practices

1. **Always test on live branch first**
2. **Clean sensitive data before merging to main**
3. **Use environment variables for secrets**
4. **Document configuration in .env.example**
5. **Keep commit messages descriptive**
6. **Review changes before merging to main**

## Emergency Cleanup

If sensitive data is accidentally committed:

```bash
# Remove sensitive files
git rm --cached sensitive-file.txt

# Clean commit history (use with caution)
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch sensitive-file.txt' \
  --prune-empty --tag-name-filter cat -- --all

# Force push to clean remote history
git push origin --force --all
```

## Environment Setup

### **Local Development**
```bash
# Copy environment template
cp .env.example .env

# Edit with your local values
nano .env

# Install dependencies
npm install

# Run development server
npm run dev
```

### **Production Deployment**
1. Set environment variables in Vercel dashboard
2. Deploy from `live` branch
3. Test on production URL
4. Merge to `main` when ready
