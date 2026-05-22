import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
      // @ts-expect-error is_setup_completed is a custom RPC not yet in types.ts
      const { data, error } = await supabase.rpc("is_setup_completed");
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
    <main className="min-h-screen flex items-center justify-center px-6 py-24 bg-ink relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-luxe-blue/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-luxe-cyan/10 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />

      <div className="w-full max-w-lg relative z-10">
        <Link to="/" className="flex flex-col items-center justify-center gap-4 mb-16 group">
          <img
            src="/logo.png"
            alt="TrustOn"
            className="h-20 w-auto brightness-125 group-hover:scale-110 transition-transform duration-700"
          />
          <div className="text-center">
            <span className="text-white text-3xl font-display tracking-tight">TrustOn</span>
            <span className="block text-[10px] uppercase tracking-[0.6em] text-luxe-cyan font-bold mt-2">
              Billion Dollar Empire
            </span>
          </div>
        </Link>

        <div className="glass-premium rounded-[40px] p-12 md:p-16 border border-white/5 shadow-luxe">
          <p className="text-luxe-cyan text-[10px] uppercase tracking-[0.5em] mb-4 font-bold">
            Secure Access
          </p>
          <h1 className="font-display text-4xl text-white mb-10 tracking-tight">
            {mode === "signin" ? "System Authentication" : "Register Architect"}
          </h1>

          <form onSubmit={submit} className="space-y-8">
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-3 block">
                Email Identity
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-full px-8 py-4 text-white focus:outline-none focus:border-luxe-cyan/50 transition-colors font-light"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-3 block">
                Security Key
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-full px-8 py-4 text-white focus:outline-none focus:border-luxe-cyan/50 transition-colors font-light"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="btn-magnetic btn-luxe w-full py-5 rounded-full shadow-luxe disabled:opacity-50"
            >
              {busy
                ? "Processing..."
                : mode === "signin"
                  ? "Authorize Entry"
                  : "Initialize Account"}
            </button>
          </form>

          {isSetupDone !== null && (
            <p className="mt-10 text-center text-[11px] uppercase tracking-widest text-white/20 font-bold">
              {mode === "signin" ? "Unauthorized? " : "Authorized? "}
              <button
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="text-luxe-cyan hover:underline ml-2"
              >
                {mode === "signin" ? "Request Access" : "Authenticate"}
              </button>
            </p>
          )}
        </div>

        {user && !isAdmin && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 glass-premium p-8 rounded-[32px] border border-red-500/20 text-center"
          >
            <p className="text-sm text-red-400 font-bold uppercase tracking-widest">
              Access Refused
            </p>
            <p className="mt-3 text-xs text-white/40 leading-relaxed">
              Account recognized but lacking administrative clearance. Verify credentials or contact
              systems administrator.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 text-[10px] font-bold uppercase tracking-widest text-luxe-cyan hover:underline"
            >
              Re-Sync System
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
