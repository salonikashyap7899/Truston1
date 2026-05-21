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
        // 1. Check if user already has admin role
        const { data: roles, error: rolesError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId);

        if (!rolesError && roles && roles.some((r) => r.role === "admin")) {
          if (isMounted) setIsAdmin(true);
          return;
        }

        // 2. Try server-side assignment (bypasses RLS, works even if migrations aren't applied)
        const result = await ensureFirstAdmin({ data: userId });

        if (result.success && isMounted) {
          setIsAdmin(true);
          return;
        }

        // 3. If server fn says admin already exists, double-check this user's roles again
        //    (covers the case where the trigger ran but RLS blocked the first read)
        if (result.reason === "admin_exists") {
          const { data: retry } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", userId);
          if (retry && retry.some((r) => r.role === "admin")) {
            if (isMounted) setIsAdmin(true);
            return;
          }
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
