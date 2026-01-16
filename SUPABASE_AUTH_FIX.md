# Fixing Supabase Authentication 500 Error

If you're getting a 500 error when trying to sign up, here are the most common causes and solutions:

## Solution 1: Disable Email Confirmation (Recommended for Development)

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Settings**
3. Under **Email Auth**, find **Enable email confirmations**
4. **Disable** email confirmations for development
5. Save the changes

This will allow users to sign up and immediately sign in without email verification.

## Solution 2: Configure Email Templates

If you want to keep email confirmation enabled:

1. Go to **Authentication** > **Email Templates**
2. Make sure the **Confirm signup** template is properly configured
3. Update the redirect URL to match your app: `{{ .SiteURL }}/admin`
4. Test the email delivery

## Solution 3: Check Database Triggers

The 500 error might be caused by a database trigger failing. Check your Supabase logs:

1. Go to **Logs** > **Postgres Logs**
2. Look for any errors related to `auth.users` table
3. Common issues:
   - Triggers that reference non-existent tables
   - RLS policies blocking inserts
   - Missing functions or extensions

## Solution 4: Verify Environment Variables

Make sure your `.env` file has the correct values:

```env
VITE_SUPABASE_URL=https://unqntnzjxuyammlgfqci.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key
```

**Important**: 
- Don't include `/auth/v1` in the URL - just the base URL
- Make sure there are no extra spaces or quotes
- Restart your dev server after changing `.env`

## Solution 5: Check Supabase Project Status

1. Go to your Supabase project dashboard
2. Check if the project is paused or has any issues
3. Make sure the project is active and running

## Solution 6: Test with Supabase CLI

You can test authentication directly:

```bash
# Install Supabase CLI if needed
npm install -g supabase

# Test signup
curl -X POST 'https://unqntnzjxuyammlgfqci.supabase.co/auth/v1/signup' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

## Quick Fix (Most Common)

For development, the quickest fix is to **disable email confirmation**:

1. Supabase Dashboard → Authentication → Settings
2. Toggle OFF "Enable email confirmations"
3. Save
4. Try signing up again

## If Issues Persist

1. Check the browser console for detailed error messages
2. Check Supabase project logs: **Logs** > **API Logs**
3. Verify your Supabase project is not paused
4. Make sure you're using the correct project URL and anon key

## Testing After Fix

1. Clear your browser cache
2. Restart your dev server: `npm run dev`
3. Try signing up with a new email address
4. If email confirmation is disabled, you should be able to sign in immediately

