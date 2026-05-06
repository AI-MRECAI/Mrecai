# Railway Deployment Fix

## Issue
Railway build is failing with "npm: command not found" because it's trying to run `cd server` but the configuration is incorrect.

## Solution

You need to configure Railway to use the `server` directory as the **Root Directory** for your service.

### Steps to Fix in Railway Dashboard:

1. **Go to Railway Dashboard** → Your Project → Server Service

2. **Click on Settings**

3. **Scroll to "Root Directory"**

4. **Set Root Directory to:** `server`

5. **Save Changes**

6. **Redeploy** (Railway will automatically redeploy)

### Alternative: Use Railway CLI

If you have Railway CLI installed:

```bash
railway up --service server
```

## What This Does

By setting the root directory to `server`, Railway will:
- Run `npm install` in the server directory
- Run `npm run build` in the server directory  
- Run `npm start` in the server directory
- Use the `nixpacks.toml` configuration in the server directory

## Verify Configuration

After setting the root directory, Railway should use these files:
- ✅ `server/nixpacks.toml` - Build configuration
- ✅ `server/package.json` - Dependencies
- ✅ `server/railway.json` - Railway-specific settings

## Expected Build Output

After fixing, you should see:
```
✓ Installing dependencies with npm
✓ Building TypeScript files
✓ Starting server with npm start
```

## Environment Variables

Make sure these are set in Railway:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SMTP2GO_API_KEY`
- `SMTP2GO_HOST`
- `SMTP2GO_PORT`
- `SMTP2GO_USER`
- `SMTP2GO_PASS`
- `SMTP2GO_FROM`
- `ADMIN_EMAIL=matthew@mrecai.com`
- `CLIENT_URL` (your frontend URL)
- `PORT=5000`
- `NODE_ENV=production`
