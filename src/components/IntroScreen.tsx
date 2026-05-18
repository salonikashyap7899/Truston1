import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"logo" | "text" | "exit">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 800);
    const t2 = setTimeout(() => setPhase("exit"), 2200);
    const t3 = setTimeout(() => setVisible(false), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--ink)] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Animated vertical grid lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 bottom-0 w-px"
                style={{ left: `${(i + 1) * (100 / 9)}%`, background: "rgba(255,255,255,0.04)" }}
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>

          {/* Floating ambient orbs */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, oklch(0.50 0.155 245 / 0.12) 0%, transparent 70%)", top: "10%", left: "20%" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, oklch(0.50 0.155 245 / 0.08) 0%, transparent 70%)", bottom: "10%", right: "15%" }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* Dark curtain exit — slides UP to reveal the page */}
          <motion.div
            className="absolute inset-0 bg-[var(--ink)] origin-bottom z-10"
            initial={{ scaleY: 0 }}
            animate={phase === "exit" ? { scaleY: 1 } : { scaleY: 0 }}
            style={{ transformOrigin: "bottom" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Logo + content */}
          <div className="relative z-[5] flex flex-col items-center gap-6">
            {/* Logo with animated rings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center"
            >
              {/* Pulse rings */}
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute rounded-full border border-[var(--bronze)]/20"
                  style={{ width: 80 + ring * 36, height: 80 + ring * 36 }}
                  animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.1, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: ring * 0.4, ease: "easeInOut" }}
                />
              ))}
              <img
                src="/logo.png"
                alt="TrustOn"
                className="h-20 w-20 object-contain brightness-110 relative z-10"
              />
            </motion.div>

            {/* Brand name — letter reveal */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="font-bold tracking-[0.3em] uppercase text-white"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
              >
                TRUST<span className="text-[var(--bronze)]">ON</span>
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-[var(--bronze)]/40" />
                <span className="text-[9px] uppercase tracking-[0.5em] text-white/25">
                  Premium Estate · Lucknow
                </span>
                <div className="w-12 h-px bg-[var(--bronze)]/40" />
              </div>
            </motion.div>

            {/* Tagline */}
            <AnimatePresence>
              {phase !== "logo" && (
                <motion.p
                  initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif italic text-lg md:text-xl text-white/40 text-center"
                >
                  Own the Ground. Build the Legacy.
                </motion.p>
              )}
            </AnimatePresence>

            {/* Loading bar */}
            <motion.div
              className="w-40 h-px bg-white/8 relative overflow-hidden mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--bronze)] to-[oklch(0.65_0.12_240)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
