import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"logo" | "text" | "exit">("logo");

  useEffect(() => {
    // Snappy timing: total ~2 seconds
    const t1 = setTimeout(() => setPhase("text"), 500); // tagline appears at 0.5s
    const t2 = setTimeout(() => setPhase("exit"), 1400); // exit curtain at 1.4s
    const t3 = setTimeout(() => setVisible(false), 2000); // unmount at 2.0s
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "oklch(0.13 0.02 250)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
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
                transition={{ duration: 1, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>

          {/* Floating ambient blue orbs */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(45,107,196,0.12) 0%, transparent 70%)",
              top: "5%",
              left: "15%",
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[360px] h-[360px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(45,107,196,0.08) 0%, transparent 70%)",
              bottom: "10%",
              right: "10%",
            }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />

          {/* Dark ink curtain — slides UP to reveal the page beneath */}
          <motion.div
            className="absolute inset-0 origin-bottom z-10"
            style={{ backgroundColor: "oklch(0.13 0.02 250)" }}
            initial={{ scaleY: 0 }}
            animate={phase === "exit" ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Content */}
          <div className="relative z-[5] flex flex-col items-center gap-5">
            {/* Logo with pulse rings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center"
            >
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute rounded-full"
                  style={{
                    width: 72 + ring * 32,
                    height: 72 + ring * 32,
                    border: "1px solid rgba(45,107,196,0.18)",
                  }}
                  animate={{ scale: [1, 1.07, 1], opacity: [0.6, 0.1, 0.6] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: ring * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
              <img
                src="/logo.png"
                alt="TrustOn"
                className="h-16 w-16 object-contain brightness-110 relative z-10"
              />
            </motion.div>

            {/* Brand name */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="font-bold tracking-[0.3em] uppercase text-white"
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "clamp(2rem, 7vw, 4.5rem)",
                }}
              >
                TRUST<span style={{ color: "oklch(0.50 0.155 245)" }}>ON</span>
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-10 h-px" style={{ background: "rgba(45,107,196,0.5)" }} />
                <span
                  className="text-[9px] uppercase tracking-[0.5em]"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  Premium Estate · Lucknow
                </span>
                <div className="w-10 h-px" style={{ background: "rgba(45,107,196,0.5)" }} />
              </div>
            </motion.div>

            {/* Tagline */}
            <AnimatePresence>
              {phase !== "logo" && (
                <motion.p
                  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif italic text-base md:text-lg text-center"
                  style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Georgia, serif" }}
                >
                  Own the Ground. Build the Legacy.
                </motion.p>
              )}
            </AnimatePresence>

            {/* Loading bar */}
            <motion.div
              className="w-36 h-px relative overflow-hidden mt-1"
              style={{ background: "rgba(255,255,255,0.07)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{
                  background: "linear-gradient(90deg, oklch(0.50 0.155 245), oklch(0.65 0.12 240))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
