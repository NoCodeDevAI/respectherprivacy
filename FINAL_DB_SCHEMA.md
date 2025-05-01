# Complete Database Schema for My Safe Report

## Create the Reports Table

This SQL script creates a complete, fully compatible database table for your reports application:

```sql
-- Drop the existing table if needed
DROP TABLE IF EXISTS reports;

-- Create the reports table with proper defaults and constraints
CREATE TABLE reports (
  -- Primary key with auto-increment
  id SERIAL PRIMARY KEY,
  
  -- Report identifier with format RPT-#######
  report_identifier TEXT NOT NULL,
  
  -- Default status for new reports
  status TEXT NOT NULL DEFAULT 'pending',
  
  -- Content fields
  harmful_link TEXT NOT NULL,
  experience TEXT NOT NULL,
  email TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Prevent duplicate harmful links
  CONSTRAINT unique_harmful_link UNIQUE (harmful_link)
);

-- Create an index on report_identifier for faster lookups
CREATE INDEX idx_report_identifier ON reports(report_identifier);

-- Add Row Level Security (RLS)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Allow inserts from authenticated users or anon keys
CREATE POLICY "Allow anonymous inserts" ON reports
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow select access for admin users (optional)
CREATE POLICY "Allow all selects for admin" ON reports
  FOR SELECT
  TO authenticated
  USING (true);
```

## How to Use This Schema

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Paste the entire SQL script above and run it
4. This will create a fresh table with the exact structure needed

## Table Structure Explanation

| Column            | Type                    | Description                                      |
|-------------------|-------------------------|--------------------------------------------------|
| id                | SERIAL                  | Auto-incrementing primary key                    |
| report_identifier | TEXT                    | Unique identifier with format RPT-#######        |
| status            | TEXT                    | Status of the report (default: 'pending')        |
| harmful_link      | TEXT                    | The URL of the harmful content (must be unique)  |
| experience        | TEXT                    | User's description of their experience           |
| email             | TEXT                    | Optional user email for contact                  |
| created_at        | TIMESTAMP WITH TIME ZONE| When the report was created                      |
| updated_at        | TIMESTAMP WITH TIME ZONE| When the report was last updated                 |

## Additional Setup (Optional)

### Create an Update Trigger for updated_at

```sql
-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_reports_modtime
BEFORE UPDATE ON reports
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
```

### Create a View for Admin Dashboard (Optional)

```sql
-- Create a view for the admin dashboard
CREATE VIEW reports_admin_view AS
SELECT 
  id,
  report_identifier,
  status,
  harmful_link,
  experience,
  email,
  created_at,
  updated_at
FROM reports
ORDER BY created_at DESC;
```

## Handling Duplicate Links

If you want to modify an existing table to add the unique constraint:

```sql
-- Add unique constraint to an existing table
ALTER TABLE reports
ADD CONSTRAINT unique_harmful_link UNIQUE (harmful_link);
```

Or if you want to drop the constraint later:

```sql
-- Remove unique constraint if needed
ALTER TABLE reports
DROP CONSTRAINT unique_harmful_link;
```

## Notes

1. The application generates the `report_identifier` with format `RPT-#######`
2. We're not using a database default for report_identifier as the app handles it
3. The SQL includes Row Level Security (RLS) with appropriate policies
4. This schema includes a unique constraint on harmful_link to prevent duplicates
5. The application code will handle the unique constraint violation with a user-friendly message 