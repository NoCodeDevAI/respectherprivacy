import { createClient } from '@supabase/supabase-js';

// Use default placeholder values for development if not configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example-key';

// Check if running in development and warn about missing configuration
if (process.env.NODE_ENV === 'development' && 
    (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
  console.warn(
    'Supabase environment variables are missing. ' + 
    'The app will use mock data for reports. ' + 
    'To use real database, set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);