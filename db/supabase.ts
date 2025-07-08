import { createClient } from "@supabase/supabase-js";

// Create a Supabase client that will use the cookie set by your server
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  {
    global: {
      // The cookie will be automatically included in requests
      // No need to manually set headers
    },
    auth: {
      // Disable Supabase Auth features since we're using our own auth
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);

export default supabaseClient;

async function supabase() {
  // Method 1: Get the current session (most reliable)
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  const jwt = session?.access_token;

  console.log("JWT Token:", jwt);
}

supabase();
