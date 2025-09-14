# Vercel Environment Variables Setup

## The Issue
Vercel is looking for a secret named "database_url" (lowercase) but you created "DATABASE_URL" (uppercase).

## Solution: Use Environment Variables Instead of Secrets

### Step 1: Remove the vercel.json env references
The `vercel.json` file was referencing secrets that don't exist. I've removed those references.

### Step 2: Set Environment Variables in Vercel Dashboard

1. **Go to your Vercel project dashboard**
2. **Navigate to Settings > Environment Variables**
3. **Add these as Environment Variables (NOT Secrets):**

```
Name: DATABASE_URL
Value: postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres
Environment: Production, Preview, Development

Name: NEXTAUTH_SECRET
Value: [YOUR-32-CHAR-SECRET]
Environment: Production, Preview, Development

Name: NEXTAUTH_URL
Value: https://your-app-name.vercel.app
Environment: Production, Preview, Development
```

### Step 3: Alternative - Fix the Secret Names

If you prefer to use secrets, create them with these exact names:

1. **Go to Settings > Environment Variables**
2. **Create these secrets:**
   - `database_url` (lowercase)
   - `nextauth_secret` (lowercase)
   - `nextauth_url` (lowercase)
3. **Then set the environment variables to reference them:**
   ```
   DATABASE_URL = @database_url
   NEXTAUTH_SECRET = @nextauth_secret
   NEXTAUTH_URL = @nextauth_url
   ```

## Recommended Approach
Use **Environment Variables** (Step 2) as it's simpler and more straightforward.

## After Setting Variables
1. **Redeploy your project** from the Vercel dashboard
2. **Or push a new commit** to trigger a new deployment
