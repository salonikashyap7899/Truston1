import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAndAssignRole = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId);
        
        if (!error && data && data.length > 0) {
          if (isMounted) {
            setIsAdmin(data.some((r) => r.role === "admin"));
          }
        } else if (!error && (!data || data.length === 0)) {
          // No roles found - if this is the first user, assign admin
          const { data: allRoles } = await supabase
            .from("user_roles")
            .select("id");

          if (!allRoles || allRoles.length === 0) {
            // No admins exist yet, assign this user as admin
            const { error: insertError } = await supabase
              .from("user_roles")
              .insert({ user_id: userId, role: "admin" });

            if (!insertError && isMounted) {
              setIsAdmin(true);
            } else if (insertError) {
              console.error("Error assigning admin role:", insertError);
            }
          }
        }
      } catch (err) {
        console.error("Error checking role:", err);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        checkAndAssignRole(s.user.id);
      } else {
        if (isMounted) {
          setIsAdmin(false);
        }
      }
    });

    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
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
