import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

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

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!loading && user && isAdmin) navigate({ to: "/admin" });
  }, [user, isAdmin, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        setMessage("Account created! Signing you in…");
        await new Promise((r) => setTimeout(r, 1500));
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      }
    } catch (err) {
      const msg = (err as Error).message ?? "Something went wrong. Please try again.";
      if (msg.toLowerCase().includes("invalid login credentials")) {
        setError("Incorrect email or password.");
      } else if (msg.toLowerCase().includes("user already registered")) {
        setError("An account with this email already exists. Please sign in.");
        setMode("signin");
      } else {
        setError(msg);
      }
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

          {/* Tab switcher */}
          <div className="flex bg-white/5 rounded-2xl p-1 mb-8">
            <button
              onClick={() => { setMode("signin"); setError(""); setMessage(""); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                mode === "signin" ? "bg-white text-[#04090f] shadow" : "text-white/50 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("signup"); setError(""); setMessage(""); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                mode === "signup" ? "bg-white text-[#04090f] shadow" : "text-white/50 hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>

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
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#00BFFF]/50 focus:bg-white/8 transition-all"
              />
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-white/50 text-xs font-medium uppercase tracking-widest mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#00BFFF]/50 focus:bg-white/8 transition-all"
                />
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <span className="shrink-0 mt-0.5">⚠</span>
                <span>{error}</span>
              </div>
            )}

            {message && (
              <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                <span>✓</span>
                <span>{message}</span>
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
                  {mode === "signup" ? "Creating account…" : "Signing in…"}
                </>
              ) : (
                mode === "signup" ? "Create Account" : "Sign In"
              )}
            </button>
          </form>

          {/* Access denied info */}
          {user && !isAdmin && !loading && (
            <div className="mt-6 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4 text-center">
              <p className="text-amber-200 text-sm font-medium mb-1">No admin access</p>
              <p className="text-amber-200/60 text-xs leading-relaxed">
                This account is not set up as an admin. If you are the website owner, please contact support or use the first registered account.
              </p>
              <button
                onClick={() => supabase.auth.signOut()}
                className="mt-3 text-xs text-white/40 hover:text-white transition-colors"
              >
                Sign out and try another account
              </button>
            </div>
          )}
        </div>

        {/* Back to site */}
        <p className="text-center mt-6 text-white/25 text-xs">
          <Link to="/" className="hover:text-white/50 transition-colors">← Back to website</Link>
        </p>
      </div>
    </div>
  );
}
