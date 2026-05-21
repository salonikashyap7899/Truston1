import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Admin Login — TrustOn" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [isSetupDone, setIsSetupDone] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading && user && isAdmin) navigate({ to: "/admin" });
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    const checkSetup = async () => {
      const { data, error } = await (supabase as any).rpc("is_setup_completed");
      if (!error) {
        setIsSetupDone(data);
        // If setup is not done, default to signup mode
        if (data === false) setMode("signup");
      }
    };
    checkSetup();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${origin}/admin` },
        });
        if (error) throw error;

        // Wait for auth state and trigger to complete
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Refresh session to get the latest auth state
        await supabase.auth.refreshSession();

        toast.success("Account created. Checking admin permissions...");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      toast.error((err as Error).message);
      console.error("Auth error:", err);
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
              <label className="text-[11px] uppercase tracking-luxe text-foreground/70">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border border-border rounded-sm px-4 py-3 bg-cream focus:outline-none focus:border-bronze"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-luxe text-foreground/70">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full border border-border rounded-sm px-4 py-3 bg-cream focus:outline-none focus:border-bronze"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-ink text-cream py-3 rounded-full text-[11px] uppercase tracking-luxe hover:bg-bronze transition-colors disabled:opacity-60"
            >
              {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          {isSetupDone !== null && (
            <p className="mt-6 text-center text-sm text-foreground/60">
              {mode === "signin" ? "First time setup? " : "Already have access? "}
              <button
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="text-bronze underline"
              >
                {mode === "signin" ? "Create the admin account" : "Sign in"}
              </button>
            </p>
          )}
        </div>
        {user && !isAdmin && !loading && (
          <div className="mt-6 p-4 bg-destructive/10 rounded-md border border-destructive/20 text-center">
            <p className="text-sm text-destructive font-medium">Signed in but not an admin.</p>
            <p className="mt-1 text-xs text-destructive/80">
              If you just created this account, please wait a moment and refresh. Otherwise, contact
              the site owner.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-xs font-bold uppercase tracking-wider text-destructive hover:underline"
            >
              Refresh Now
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
