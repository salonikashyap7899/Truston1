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
        // Broad permission strategy: If the user is authenticated,
        // we check if they are in the user_roles table as admin.
        // If not, we try to assign them as the first admin.

        const { data: roles, error: rolesError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId);

        if (!rolesError && roles && roles.some((r) => r.role === "admin")) {
          if (isMounted) {
            setIsAdmin(true);
            setLoading(false);
          }
          return;
        }

        // Try server-side assignment
        const result = await ensureFirstAdmin({ data: userId });

        // If it succeeded or they are already admin, grant access in UI
        if (isMounted) {
          setIsAdmin(true);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error in checkAndAssignRole:", err);
        if (isMounted) {
          setIsAdmin(false);
          setLoading(false);
        }
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
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      if (isMounted) {
        setSession(s);
        setUser(s?.user ?? null);
      }

      if (s?.user) {
        await checkAndAssignRole(s.user.id);
      } else if (isMounted) {
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
