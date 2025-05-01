# Quick Fix for "submission_date column" Error

If you're seeing this error:
```
Error: Supabase error: Could not find the 'submission_date' column of 'reports' in the schema cache
```

Here's how to fix it immediately:

## Option 1: Add the Missing Column (Quickest)

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run this SQL query:

```sql
ALTER TABLE reports 
ADD COLUMN IF NOT EXISTS submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW();
```

## Option 2: Recreate the Table (Complete Reset)

If you want to start fresh, run this SQL:

```sql
-- Drop the existing table if it's causing problems
DROP TABLE IF EXISTS reports;

-- Create a fresh table with all required fields
CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  report_identifier UUID NOT NULL,
  harmful_link TEXT NOT NULL,
  experience TEXT NOT NULL,
  email TEXT,
  submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on report_identifier for faster lookups
CREATE INDEX idx_report_identifier ON reports(report_identifier);

-- Add RLS (Row Level Security) policies for protection
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Only allow inserts from authenticated users or anon keys
CREATE POLICY "Allow anonymous inserts" ON reports
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
```

After making either change:
1. Restart your Next.js development server
2. Try submitting a report again

## Need More Help?

See the complete `SUPABASE_SETUP.md` guide for more detailed instructions. 