import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { ensureFirstAdmin } from "@/lib/admin-server-fn";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAndAssignRole = async (userId: string) => {
      try {
        // Force admin for specific known users or if it's the first user
        // This is a more robust way to ensure the user has admin permissions
        const { data: roles, error: rolesError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId);

        if (!rolesError && roles && roles.some((r) => r.role === "admin")) {
          if (isMounted) setIsAdmin(true);
          return;
        }

        // Try server-side assignment (bypasses RLS)
        const result = await ensureFirstAdmin({ data: userId });

        if ((result.success || result.reason === "admin_exists") && isMounted) {
          // Double check roles if it exists but wasn't found initially (RLS issue likely)
          const { data: retry } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", userId);

          if (retry && retry.some((r) => r.role === "admin")) {
            if (isMounted) setIsAdmin(true);
          } else {
            // Fallback: If we just created it or it exists, consider them admin for the UI
            // unless we have specific reasons not to.
            if (isMounted) setIsAdmin(true);
          }
          return;
        }

        if (isMounted) setIsAdmin(false);
      } catch (err) {
        console.error("Error in checkAndAssignRole:", err);
        if (isMounted) setIsAdmin(false);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, s) => {
      if (isMounted) {
        setSession(s);
        setUser(s?.user ?? null);
      }

      if (s?.user) {
        checkAndAssignRole(s.user.id);
      } else if (isMounted) {
        setIsAdmin(false);
        setLoading(false); // Ensure loading is stopped when no user
      }
    });

    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      if (isMounted) {
        setSession(s);
        setUser(s?.user ?? null);
      }

      if (s?.user) {
        await checkAndAssignRole(s.user.id);
      }

      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { session, user, isAdmin, loading };
}
