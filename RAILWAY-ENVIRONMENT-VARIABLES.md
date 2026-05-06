# Railway Environment Variables Setup

## Current Issue
The server is failing to start because Supabase environment variables are not set in Railway.

## Required Environment Variables

### 1. Supabase Variables (REQUIRED)
Go to [Supabase Dashboard](https://supabase.com/dashboard) → Your Project → Settings → API

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here
```

**Important:** Use the `service_role` key (not the `anon` key) for `SUPABASE_SERVICE_KEY`

### 2. Email Service Variables (REQUIRED)
```env
SMTP2GO_API_KEY=your-smtp2go-api-key
SMTP2GO_HOST=mail.smtp2go.com
SMTP2GO_PORT=2525
SMTP2GO_USER=your-smtp2go-username
SMTP2GO_PASS=your-smtp2go-password
SMTP2GO_FROM=MRE Consulting <ai@mrecai.com>
ADMIN_EMAIL=matthew@mrecai.com
```

### 3. Application Variables
```env
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-frontend-url.com
```

## How to Add Variables in Railway

### Step 1: Go to Railway Dashboard
1. Open [Railway Dashboard](https://railway.app/dashboard)
2. Select your project
3. Click on your **Server** service

### Step 2: Add Variables
1. Click on the **Variables** tab
2. Click **+ New Variable**
3. Add each variable one by one:
   - Variable name (e.g., `SUPABASE_URL`)
   - Variable value (paste the value)
4. Click **Add**

### Step 3: Deploy
After adding all variables, Railway will automatically redeploy your service.

## Where to Get the Values

### Supabase Values:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → Use for `SUPABASE_URL`
   - **anon public** key → Use for `SUPABASE_ANON_KEY`
   - **service_role** key → Use for `SUPABASE_SERVICE_KEY` ⚠️ Keep this secret!

### SMTP2GO Values:
1. Go to [SMTP2GO Dashboard](https://www.smtp2go.com/)
2. Get your API key and SMTP credentials
3. Use the values provided by SMTP2GO

## Verification

After adding all variables, check the Railway logs. You should see:
```
✅ Supabase connected successfully
✅ SMTP2GO email service is ready
🚀 Server running on port 5000 in production mode
```

## Quick Checklist

- [ ] `SUPABASE_URL` added
- [ ] `SUPABASE_ANON_KEY` added
- [ ] `SUPABASE_SERVICE_KEY` added (use service_role key)
- [ ] `SMTP2GO_API_KEY` added
- [ ] `SMTP2GO_HOST` = `mail.smtp2go.com`
- [ ] `SMTP2GO_PORT` = `2525`
- [ ] `SMTP2GO_USER` added
- [ ] `SMTP2GO_PASS` added
- [ ] `SMTP2GO_FROM` = `MRE Consulting <ai@mrecai.com>`
- [ ] `ADMIN_EMAIL` = `matthew@mrecai.com`
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `5000`
- [ ] `CLIENT_URL` = your frontend URL
- [ ] Railway redeployed automatically
- [ ] Check logs for success messages

## Troubleshooting

If deployment still fails:
1. Check Railway logs for specific error messages
2. Verify all variable names are spelled correctly (case-sensitive)
3. Ensure no extra spaces in variable values
4. Confirm Supabase project is active
5. Test SMTP2GO credentials separately
