# Production Troubleshooting Guide

## Current Issues Fixed

### 1. Authentication Issues (401 Errors)
**Problem**: `POST /api/auth/callback/credentials` returning 401 Unauthorized
**Root Cause**: JWT callback not properly setting user ID in token
**Solution**: 
- Enhanced JWT callback to use `token.sub` as fallback for `token.id`
- Improved session callback to handle missing ID field
- Added comprehensive logging for debugging

### 2. Registration Issues (500 Errors)
**Problem**: `POST /api/register` returning 500 Internal Server Error
**Root Cause**: Database connection or table creation issues
**Solution**:
- Added detailed logging to registration API
- Created health check endpoint at `/api/health`
- Improved error handling and response headers

## Testing Steps

### 1. Check Database Health
Visit: `https://weedwiki.voxhash.dev/api/health`

**Expected Response**:
```json
{
  "status": "healthy",
  "database": "connected",
  "userCount": 0,
  "timestamp": "2025-01-14T18:56:20.762Z"
}
```

**If Unhealthy**: Database tables may not be created. Follow the Supabase setup guide in README.md.

### 2. Test Registration
1. Go to `https://weedwiki.voxhash.dev/register`
2. Fill out the registration form
3. Check Vercel function logs for detailed error messages

### 3. Test Login
1. Go to `https://weedwiki.voxhash.dev/login`
2. Use admin credentials:
   - Email: `admin@example.com` (or check your environment variables)
   - Password: `admin123` (or check your environment variables)
3. Check Vercel function logs for authentication flow

## Common Issues and Solutions

### Database Connection Issues
**Symptoms**: 500 errors, health check fails
**Solution**: 
1. Verify DATABASE_URL in Vercel environment variables
2. Check if Supabase database tables are created
3. Run the SQL script from README.md in Supabase dashboard

### Authentication Flow Issues
**Symptoms**: 401 errors, can't login
**Solution**:
1. Check NEXTAUTH_SECRET and NEXTAUTH_URL in Vercel
2. Verify the domain matches exactly
3. Check Vercel function logs for JWT callback errors

### Session Issues
**Symptoms**: User ID undefined, can't create grow logs
**Solution**:
1. Check if SessionProvider is properly configured
2. Verify JWT and session callbacks are working
3. Check browser console for client-side errors

## Debugging Commands

### Check Vercel Function Logs
1. Go to Vercel dashboard
2. Navigate to Functions tab
3. Click on any function to see logs
4. Look for console.log messages from our enhanced logging

### Test API Endpoints
```bash
# Health check
curl https://weedwiki.voxhash.dev/api/health

# Registration test
curl -X POST https://weedwiki.voxhash.dev/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
```

## Next Steps

1. **Wait for Vercel deployment** (2-3 minutes)
2. **Test the health endpoint** to verify database connectivity
3. **Try registration** with a new account
4. **Try login** with admin credentials
5. **Check Vercel logs** for any remaining errors

## Files Modified

- `lib/auth.js` - Fixed JWT and session callbacks
- `app/api/register/route.js` - Added comprehensive logging
- `app/api/health/route.js` - New health check endpoint
- Both `main` and `live` branches updated

## Support

If issues persist:
1. Check Vercel function logs for specific error messages
2. Verify all environment variables are set correctly
3. Ensure Supabase database is properly configured
4. Test locally with production database URL if needed
