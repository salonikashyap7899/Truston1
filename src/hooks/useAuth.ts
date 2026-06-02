import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { ensureFirstAdmin } from "@/lib/admin-server-fn";

async function checkAdminRole(userId: string): Promise<boolean> {
  const { data: roles, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);

  if (!error && roles?.some((r) => r.role === "admin")) return true;

  try {
    await ensureFirstAdmin({ data: userId });
  } catch {
    // first-admin assignment failed or not applicable
  }

  const { data: finalRoles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);

  return !!finalRoles?.some((r) => r.role === "admin");
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const handleUser = async (u: User | null) => {
      if (!isMounted) return;
      if (!u) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      try {
        const admin = await checkAdminRole(u.id);
        if (isMounted) {
          setIsAdmin(admin);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      if (isMounted) {
        setSession(s);
        setUser(s?.user ?? null);
      }
      handleUser(s?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (isMounted) {
        setSession(s);
        setUser(s?.user ?? null);
      }
      handleUser(s?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { session, user, isAdmin, loading };
}
