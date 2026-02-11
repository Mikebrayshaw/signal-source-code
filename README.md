# Signal Source Code

React application for build-signals.com with Supabase authentication.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the `.env.local` file (already included in the repo) and update values if needed:

```bash
# .env.local is already configured with default values
# No changes needed for local development
```

**Environment variables:**
- `VITE_DEV_AUTH_BYPASS` — set to `"true"` to skip login (dev mode), `"false"` to test real auth
- `VITE_SUPABASE_URL` — Supabase project URL (already set)
- `VITE_SUPABASE_ANON_KEY` — Supabase anon/public key (already set)

### 3. Start development server

```bash
npm run dev
```

Visit `http://localhost:5173/app` — you'll be auto-logged in (dev bypass enabled by default).

### 4. Test real authentication (optional)

To test magic link login locally:

1. Edit `.env.local` and set `VITE_DEV_AUTH_BYPASS=false`
2. Follow setup instructions in `docs/supabase-setup.md`
3. Restart dev server: `npm run dev`
4. Visit `/app` — you'll be redirected to `/login`

### 5. Production deployment

Set these environment variables in Railway:

```bash
VITE_DEV_AUTH_BYPASS=false
VITE_SUPABASE_URL=https://njwvtksauogsmberxrbd.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
NODE_ENV=production
PORT=8080
```

See `docs/supabase-setup.md` for Supabase dashboard configuration.

## Development

- Built with Vite + React + TypeScript
- Styled with Tailwind CSS
- Authentication via Supabase
- Deployed on Railway

## Project Structure

```
src/
├── context/        # React contexts (auth, etc.)
├── lib/            # Utilities and types
├── pages/          # Page components
└── App.tsx         # Main app component
```
