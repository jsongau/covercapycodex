const SUPABASE_URL =
  "https://hfvbeqlefwvwjlrbyxpbj.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_wlfujszvn2logC3KNL3MsA_AW1F42kf";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
