# Supabase Database Connection Fix

## 🚨 **Current Issue**
The Supabase database server at `db.qhdcweyyyiwgpkgnjelu.supabase.co:5432` is not reachable.

**Error**: `Can't reach database server at db.qhdcweyyyiwgpkgnjelu.supabase.co:5432`

## 🔍 **Root Cause Analysis**
The database server is not responding, which typically means:
1. **Supabase project is paused** (most common)
2. **Project was deleted or suspended**
3. **Connection string is incorrect**
4. **Network/firewall issues**

## 🛠️ **Solution Steps**

### **Step 1: Check Supabase Project Status**

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Sign in** with your account
3. **Find your project** (weed-wiki or similar)
4. **Check project status**:
   - If paused: Click "Resume" or "Restart"
   - If deleted: You'll need to create a new project
   - If active: Check the connection string

### **Step 2: Verify Connection String**

**✅ CORRECT FORMAT (Pooler Connection)**:
```
postgresql://postgres.PROJECT_REF:PASSWORD@aws-REGION.pooler.supabase.com:5432/postgres
```

**❌ INCORRECT FORMAT (Direct Connection)**:
```
postgresql://postgres:PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres
```

**To get the correct connection string**:
1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Database**
3. Copy the **Connection string** from the "Connection parameters" section
4. **Use the Pooler connection** (recommended for production)
5. Make sure it includes the correct password with special characters

### **Step 3: Create New Supabase Project (If Needed)**

If the project is deleted or you can't access it:

1. **Go to**: https://supabase.com/dashboard
2. **Click**: "New Project"
3. **Fill in**:
   - **Name**: `weed-wiki`
   - **Database Password**: `MasterTHC420` (or generate a new one)
   - **Region**: Choose closest to your location
4. **Wait** for project to be created (2-3 minutes)
5. **Copy** the new connection string

### **Step 4: Update Vercel Environment Variables**

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select** your `weed-wiki` project
3. **Go to**: Settings → Environment Variables
4. **Update** `DATABASE_URL` with the correct connection string
5. **Redeploy** the project

### **Step 5: Create Database Tables**

Once the connection is working, you need to create the database tables:

1. **Go to Supabase Dashboard** → **SQL Editor**
2. **Run** this SQL script:

```sql
-- Create the database tables
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Strain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "summary" TEXT,
    "lineage" TEXT,
    "thcMin" DOUBLE PRECISION,
    "thcMax" DOUBLE PRECISION,
    "cbdMin" DOUBLE PRECISION,
    "cbdMax" DOUBLE PRECISION,
    "terpenes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Strain_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Grow" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "strainId" TEXT,
    "title" TEXT NOT NULL,
    "visibility" TEXT NOT NULL DEFAULT 'private',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Grow_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "GrowEntry" (
    "id" TEXT NOT NULL,
    "growId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "photoPath" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metrics" TEXT,
    CONSTRAINT "GrowEntry_pkey" PRIMARY KEY ("id")
);

-- Create indexes
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "Strain_name_key" ON "Strain"("name");

-- Create foreign key constraints
ALTER TABLE "Grow" ADD CONSTRAINT "Grow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Grow" ADD CONSTRAINT "Grow_strainId_fkey" FOREIGN KEY ("strainId") REFERENCES "Strain"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "GrowEntry" ADD CONSTRAINT "GrowEntry_growId_fkey" FOREIGN KEY ("growId") REFERENCES "Grow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Insert admin user
INSERT INTO "User" ("id", "email", "name", "password", "role") 
VALUES ('admin-123', 'admin@example.com', 'Admin User', '$2a$10$rQZ8K5Yz8K5Yz8K5Yz8K5e', 'ADMIN')
ON CONFLICT ("email") DO NOTHING;
```

### **Step 6: Test the Connection**

1. **Visit**: https://weedwiki.voxhash.dev/api/health
2. **Expected response**:
```json
{
  "status": "healthy",
  "database": "connected",
  "userCount": 1,
  "timestamp": "2025-01-14T21:00:00.000Z"
}
```

## 🔧 **Alternative: Use Supabase CLI**

If you prefer using the CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref qhdcweyyyiwgpkgnjelu

# Push schema
supabase db push
```

## 📞 **Support**

If you continue to have issues:
1. Check Supabase status page: https://status.supabase.com/
2. Verify your Supabase account is active
3. Try creating a completely new project
4. Contact Supabase support if needed

## ✅ **Success Indicators**

- Health check returns `"status": "healthy"`
- Registration works without 500 errors
- Login works without 401 errors
- You can create grow logs successfully
