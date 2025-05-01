import { createClient } from '@supabase/supabase-js';
import { PostgrestError } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    const err = error as Error | PostgrestError;
    return {
      success: false,
      message: err.message || 'Failed to submit message. Please try again.'
    };
  }
}