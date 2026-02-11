-- Enable Row Level Security on opportunities table
-- This must be run manually in Supabase SQL Editor after deployment

ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

-- Allow public read-only access (no auth required for viewing signals)
CREATE POLICY "Allow public read access"
ON opportunities FOR SELECT
USING (true);

-- Note: Write access is restricted to service role only (used by GitHub Actions)
-- No additional policies needed since frontend only reads data
