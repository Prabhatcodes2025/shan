import { createClient } from '@supabase/supabase-js';

export const SITE_CONTENT_TABLE = 'site_content';
export const SITE_CONTENT_KEY = 'main';
export const CONTACT_ENQUIRIES_TABLE = 'contact_enquiries';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? '';

if (import.meta.env.PROD) {
  console.info('[Supabase config]', {
    hasUrl: Boolean(supabaseUrl),
    hasAnonKey: Boolean(supabaseAnonKey),
    urlHost: supabaseUrl ? new URL(supabaseUrl).host : '',
  });
}

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const backendMode = isSupabaseConfigured ? 'supabase' : 'local';
export const backendLabel = isSupabaseConfigured ? 'Supabase' : 'Browser storage';

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
