import { createClient } from '@supabase/supabase-js';

// Default Demo Supabase project configuration
const DEFAULT_SUPABASE_URL = 'https://ijcadjkycoursargthbm.supabase.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy';

export function getStoredSupabaseConfig() {
  const url = localStorage.getItem('supabase_url') || DEFAULT_SUPABASE_URL;
  const key = localStorage.getItem('supabase_anon_key') || '';
  return { url, key };
}

export function saveSupabaseConfig(url, key) {
  if (url) localStorage.setItem('supabase_url', url);
  if (key) localStorage.setItem('supabase_anon_key', key);
  else localStorage.removeItem('supabase_anon_key');
}

export function createCustomSupabaseClient(url, key) {
  if (!url || !key) return null;
  try {
    return createClient(url, key);
  } catch (err) {
    console.error('Failed to create Supabase client:', err);
    return null;
  }
}
