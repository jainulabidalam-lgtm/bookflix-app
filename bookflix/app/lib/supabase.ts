import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fail-safe initialization to prevent runtime crashes if env vars are missing
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createSupabaseClient(supabaseUrl, supabaseAnonKey)
  : null as any; 

if (!supabase) {
  console.warn("Supabase is missing environment variables. App may not function correctly.");
}
