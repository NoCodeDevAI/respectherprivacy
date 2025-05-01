# Supabase Setup Guide for My Safe Report

This guide will help you configure Supabase to work with the My Safe Report application.

## 1. Create a Supabase Account and Project

1. Go to [Supabase](https://supabase.com/) and sign up for an account if you don't have one
2. Create a new project and note down the URL and anon key

## 2. Set Up Environment Variables

Create a `.env.local` file in the root of your project with the following content:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Replace `your-project-id` and `your-anon-key` with your actual Supabase project details.

## 3. Create the Reports Table (Simple Version)

The application now uses a simplified table structure that doesn't require all fields. This is the minimal table structure needed:

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the following SQL query to create a minimal table:

```sql
-- Simple version with only required fields
CREATE TABLE IF NOT EXISTS reports (
  id SERIAL PRIMARY KEY,
  report_identifier UUID NOT NULL,
  harmful_link TEXT NOT NULL, 
  experience TEXT NOT NULL,
  email TEXT
);

-- Create an index on report_identifier for faster lookups
CREATE INDEX IF NOT EXISTS idx_report_identifier ON reports(report_identifier);

-- Add RLS (Row Level Security) policies for protection
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Only allow inserts from authenticated users or anon keys
CREATE POLICY "Allow anonymous inserts" ON reports
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
```

## Optional: Create Helper RPC Function

You can create a helper function to automatically create the table if it doesn't exist:

```sql
CREATE OR REPLACE FUNCTION create_reports_table_if_not_exists()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create the reports table if it doesn't exist
  EXECUTE '
    CREATE TABLE IF NOT EXISTS reports (
      id SERIAL PRIMARY KEY,
      report_identifier UUID NOT NULL,
      harmful_link TEXT NOT NULL,
      experience TEXT NOT NULL,
      email TEXT
    );
    
    -- Create an index on report_identifier for faster lookups
    CREATE INDEX IF NOT EXISTS idx_report_identifier ON reports(report_identifier);
  ';
END;
$$;
```

## 4. Test the Setup

1. Restart your Next.js development server
2. Submit a test report on the website
3. Check your Supabase database to confirm the report was stored correctly

## Troubleshooting

### "Cannot find submission_date column" Error

If you see this error:
```
Error: Supabase error: Could not find the 'submission_date' column of 'reports' in the schema cache
```

This means your table schema doesn't match what the application expects. The simplest solution is to recreate your table with the SQL above.

Alternatively, you can add the missing column:

```sql
ALTER TABLE reports 
ADD COLUMN IF NOT EXISTS submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW();
```

### Other Issues

If you encounter any other issues:

1. Check your Supabase URL and anon key in the `.env.local` file
2. Verify the reports table is created with the correct structure
3. Check the network tab in your browser's developer tools for API error details
4. See the console logs for any error messages

Currently, the application is set up to use mock data in development mode if Supabase is not configured. To use the real database, make sure to configure the environment variables correctly. 