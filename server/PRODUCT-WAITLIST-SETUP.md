# Product Waitlist Email Setup

## Overview
The product waitlist feature allows users to sign up for early access to A.T.L.A.S. ENGINE. When a user submits their email:
1. Admin (matthew@mrecai.com) receives a notification email
2. User receives a confirmation email

## Database Setup

Run the SQL in `database-setup.sql` in your Supabase SQL Editor to create the `product_waitlist` table.

## Environment Variables

Make sure these are set in your `.env` file:

```env
# Admin email for notifications
ADMIN_EMAIL=matthew@mrecai.com

# SMTP2GO Configuration (already configured)
SMTP2GO_API_KEY=your_api_key
SMTP2GO_HOST=mail.smtp2go.com
SMTP2GO_PORT=2525
SMTP2GO_USER=your_username
SMTP2GO_PASS=your_password
SMTP2GO_FROM=MRE Consulting <ai@mrecai.com>
```

## API Endpoint

**POST** `/api/product-waitlist`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "You're in. MRECAI will reach out before June 1.",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "product": "A.T.L.A.S. ENGINE",
    "created_at": "2026-05-06T..."
  }
}
```

## Files Modified/Created

### Backend
- ✅ `server/src/controllers/productWaitlistController.ts` - Controller for waitlist signup
- ✅ `server/src/routes/productWaitlistRoutes.ts` - Route definition
- ✅ `server/src/services/emailService.ts` - Added email templates
- ✅ `server/src/server.ts` - Registered new route
- ✅ `server/database-setup.sql` - Database schema

### Frontend
- ✅ `client/src/pages/Products.tsx` - Connected form to API

## Testing

1. Start the server: `npm run dev` (in server directory)
2. Open the Products page
3. Enter an email and submit
4. Check:
   - matthew@mrecai.com receives notification
   - User receives confirmation email
   - Entry is saved in Supabase `product_waitlist` table

## Email Templates

### Admin Notification
- Subject: "New A.T.L.A.S. ENGINE Waitlist Signup"
- Contains: User email, product name, launch date

### User Confirmation
- Subject: "You're on the A.T.L.A.S. ENGINE Waitlist"
- Contains: Welcome message, what happens next, contact info
