# Supabase Setup Instructions

This document contains manual configuration steps required in the Supabase dashboard.

## 1. Enable Row Level Security (RLS)

Run this SQL in Supabase SQL Editor (https://supabase.com/dashboard/project/YOUR_PROJECT/sql):

```sql
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
ON opportunities FOR SELECT
USING (true);
```

## 2. Configure Auth Redirect URLs

Go to: Authentication → URL Configuration

Add these redirect URLs:
- Development: `http://localhost:5173/app`
- Production: `https://your-production-domain.com/app` (replace with your Railway URL)

## 3. Verify Anon Key

The anon key in `.env.local` should match the one in your Supabase dashboard:
- Go to: Settings → API
- Copy "anon public" key
- Paste into `VITE_SUPABASE_ANON_KEY` in `.env.local`

## 4. Test Magic Link Auth

1. Set `VITE_DEV_AUTH_BYPASS=false` in `.env.local`
2. Run `npm run dev`
3. Visit `http://localhost:5173/app`
4. Should redirect to `/login`
5. Enter your email, click "Send Magic Link"
6. Check email inbox (including spam)
7. Click link in email
8. Should redirect back to `/app` and show dashboard

## Troubleshooting

**Magic link doesn't arrive:**
- Check Supabase Logs (Authentication → Logs)
- Verify email provider settings (Settings → Auth → Email)
- Check redirect URL is whitelisted (step 2 above)

**"Invalid login credentials" error:**
- Email/password auth must be enabled: Authentication → Providers → Email
- Check RLS policies are applied (step 1 above)

**Session doesn't persist after refresh:**
- Check browser localStorage (should contain `sb-<project-id>-auth-token`)
- Verify `supabase.auth.getSession()` is being called in `AuthContext.tsx`
