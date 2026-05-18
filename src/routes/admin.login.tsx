import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — TrustOn" }, { name: "robots", content: "noindex" }] }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) navigate({ to: "/admin" });
  }, [user, isAdmin, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. You are now the admin.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 bg-cream">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-10">
          <span className="text-bronze text-3xl font-serif italic">Trust</span>
          <span className="text-ink text-3xl font-serif">On</span>
        </Link>
        <div className="bg-white card-shadow rounded-md p-10">
          <p className="text-bronze text-[11px] uppercase tracking-luxe mb-3">Admin Access</p>
          <h1 className="font-display text-3xl mb-8">
            {mode === "signin" ? "Sign in" : "Create admin account"}
          </h1>
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="text-[11px] uppercase tracking-luxe text-foreground/70">Email</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border border-border rounded-sm px-4 py-3 bg-cream focus:outline-none focus:border-bronze"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-luxe text-foreground/70">Password</label>
              <input
                type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full border border-border rounded-sm px-4 py-3 bg-cream focus:outline-none focus:border-bronze"
              />
            </div>
            <button
              type="submit" disabled={busy}
              className="w-full bg-ink text-cream py-3 rounded-full text-[11px] uppercase tracking-luxe hover:bg-bronze transition-colors disabled:opacity-60"
            >
              {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-foreground/60">
            {mode === "signin" ? "First time setup? " : "Already have access? "}
            <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-bronze underline">
              {mode === "signin" ? "Create the admin account" : "Sign in"}
            </button>
          </p>
        </div>
        {user && !isAdmin && (
          <p className="mt-6 text-center text-sm text-destructive">
            Signed in but not an admin. Contact the site owner.
          </p>
        )}
      </div>
    </main>
  );
}
