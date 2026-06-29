// Supabase client used by both browser and SSR.
import "./ws-polyfill"; // Polyfill WebSocket for Node.js < 22 (no-op in browsers)
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Public values — safe to hardcode (publishable key is not a secret).
// Override via VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY env vars if needed.
const SUPABASE_URL_DEFAULT = "https://riphytslpvrasnbcfpaw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY_DEFAULT = "sb_publishable_hnVWD6AsHeGlIx5rLGLZ3g_EWm9mDL5";

function createSupabaseClient() {
  const SUPABASE_URL =
    import.meta.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    SUPABASE_URL_DEFAULT;

  const SUPABASE_PUBLISHABLE_KEY =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    SUPABASE_PUBLISHABLE_KEY_DEFAULT;

  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";
export const supabase: ReturnType<typeof createSupabaseClient> = new Proxy(
  {},
  {
    get(_, prop, receiver) {
      if (!_supabase) _supabase = createSupabaseClient();
      return Reflect.get(_supabase, prop, receiver);
    },
  },
) as ReturnType<typeof createSupabaseClient>;
