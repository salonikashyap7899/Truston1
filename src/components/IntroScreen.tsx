import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"logo" | "text" | "exit">("logo");

  useEffect(() => {
    // Cinematic but faster timing: total ~1.3 seconds
    const t1 = setTimeout(() => setPhase("text"), 300); // tagline appears at 0.3s
    const t2 = setTimeout(() => setPhase("exit"), 800); // exit curtain at 0.8s
    const t3 = setTimeout(() => setVisible(false), 1300); // unmount at 1.3s
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
          style={{ backgroundColor: "var(--background)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Animated vertical grid lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 bottom-0 w-px"
                style={{ left: `${(i + 1) * (100 / 13)}%`, background: "rgba(100,200,255,0.03)" }}
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.2, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>

          {/* Floating ambient luxury orbs */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, var(--luxe-cyan), transparent 75%)",
              opacity: 0.15,
              top: "-10%",
              right: "5%",
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[450px] h-[450px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, var(--luxe-blue), transparent 75%)",
              opacity: 0.1,
              bottom: "5%",
              left: "10%",
            }}
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* Dark curtain — slides UP to reveal the page beneath */}
          <motion.div
            className="absolute inset-0 origin-bottom z-10"
            style={{ backgroundColor: "var(--background)" }}
            initial={{ scaleY: 0 }}
            animate={phase === "exit" ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Content */}
          <div className="relative z-[5] flex flex-col items-center gap-8">
            {/* Logo with pulse rings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center"
            >
              {[1, 2, 3, 4].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute rounded-full"
                  style={{
                    width: 80 + ring * 40,
                    height: 80 + ring * 40,
                    border: "1px solid var(--luxe-cyan)",
                    opacity: 0.1,
                  }}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.05, 0.4] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: ring * 0.4,
                    ease: "easeInOut",
                  }}
                />
              ))}
              <img
                src="/logo.png"
                alt="TrustOn"
                className="h-20 w-20 object-contain brightness-125 relative z-10"
              />
            </motion.div>

            {/* Brand name */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="font-display tracking-tight text-white leading-none"
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 6rem)",
                }}
              >
                TRUST<span className="text-luxe-cyan">ON</span>
              </h1>
              <div className="flex items-center gap-6">
                <motion.div
                  className="h-px bg-luxe-cyan shadow-[0_0_8px_var(--luxe-cyan)]"
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/40">
                  Billion Dollar Legacy
                </span>
                <motion.div
                  className="h-px bg-luxe-cyan shadow-[0_0_8px_var(--luxe-cyan)]"
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </motion.div>

            {/* Tagline */}
            <AnimatePresence>
              {phase !== "logo" && (
                <motion.p
                  initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif italic text-lg md:text-xl text-center text-white/30"
                >
                  Architecture of the Future.
                </motion.p>
              )}
            </AnimatePresence>

            {/* Loading Progress */}
            <div className="w-48 h-px relative overflow-hidden mt-2 bg-white/5">
              <motion.div
                className="absolute inset-y-0 left-0 bg-luxe-cyan shadow-[0_0_10px_var(--luxe-cyan)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
