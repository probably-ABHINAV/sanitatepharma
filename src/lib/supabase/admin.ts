import { createClient } from '@supabase/supabase-js';

/**
 * Admin Supabase client using SERVICE_ROLE key.
 * ⚠️ ONLY use in admin API routes — never expose to the client.
 * This client bypasses Row Level Security.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
