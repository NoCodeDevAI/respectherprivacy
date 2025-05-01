# Fix for Row Level Security (RLS) Policy Error

If you're seeing this error:
```
Error: Supabase error: new row violates row-level security policy for table "reports"
```

This is caused by Row Level Security being enabled on your `reports` table, but the policies aren't configured to allow anonymous inserts.

## Quick Solution

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the following SQL query:

```sql
-- Option 1: Allow inserts from authenticated users or anon keys (Recommended for your case)
CREATE POLICY "Allow anonymous inserts" ON reports
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Option 2: If you need to enable selects for testing
CREATE POLICY "Allow anonymous selects" ON reports
  FOR SELECT
  TO anon, authenticated
  USING (true);
```

## Turn Off RLS Temporarily (Alternative Option)

If you're still in development and want to simplify things, you can temporarily disable RLS:

```sql
-- Temporarily disable RLS (only for development)
ALTER TABLE reports DISABLE ROW LEVEL SECURITY;
```

**Warning**: Only do this in development. In production, you should properly configure RLS policies instead of disabling it.

## Customize For Your Schema

Based on your custom table schema with the auto-generated report identifiers:

```sql
-- Enable RLS but with proper policies for your schema
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert reports (but they can't select later)
CREATE POLICY "Allow anonymous inserts" ON reports
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Optional: Allow users to select only reports they created
-- This would require tracking the user's anonymous ID or session
CREATE POLICY "Allow selecting own reports" ON reports
  FOR SELECT
  TO anon, authenticated
  USING (true); -- Replace with condition if you track user ownership
```

After making these changes:
1. Restart your Next.js development server
2. Try submitting a report again 