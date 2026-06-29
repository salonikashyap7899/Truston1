import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const ALLOWED_ADMIN_EMAIL = "trustondevelopers@gmail.com";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — TrustOn" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user && isAdmin) navigate({ to: "/admin" });
  }, [user, isAdmin, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email.trim().toLowerCase() !== ALLOWED_ADMIN_EMAIL) {
      setError("Access denied. You are not authorised to access this panel.");
      return;
    }

    setBusy(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        if (signInError.message.toLowerCase().includes("invalid login credentials")) {
          setError("Incorrect email or password.");
        } else {
          setError(signInError.message);
        }
      }
    } catch (err) {
      setError((err as Error).message ?? "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div data-admin-panel className="min-h-screen bg-[#04090f] flex items-center justify-center px-4">
      {/* Subtle background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-[#00BFFF]/6 blur-[120px]" />
        <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-[#00BFFF]/4 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Logo + Brand */}
        <div className="text-center mb-10">
          <Link to="/">
            <img src="/logo.png" alt="TrustOn" className="h-14 w-auto mx-auto mb-4 brightness-110" />
          </Link>
          <h1 className="text-white text-2xl font-semibold tracking-tight">TrustOn Admin</h1>
          <p className="text-white/35 text-sm mt-1">Manage your website content</p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-white/50 text-xs font-medium uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#00BFFF]/50 focus:bg-white/8 transition-all"
              />
            </div>

            <div>
              <label className="block text-white/50 text-xs font-medium uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#00BFFF]/50 focus:bg-white/8 transition-all"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <span className="shrink-0 mt-0.5">⚠</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full bg-[#00BFFF] text-[#04090f] font-bold py-3.5 rounded-xl text-sm disabled:opacity-50 hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              {busy ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#04090f]/30 border-t-[#04090f] rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

        </div>

        {/* Back to site */}
        <p className="text-center mt-6 text-white/25 text-xs">
          <Link to="/" className="hover:text-white/50 transition-colors">← Back to website</Link>
        </p>
      </div>
    </div>
  );
}
