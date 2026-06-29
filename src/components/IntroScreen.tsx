import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

export function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("intro_seen")) {
      setVisible(false);
      return;
    }
    // Skip intro on slow/mobile connections automatically
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (isMobile) {
      setVisible(false);
      sessionStorage.setItem("intro_seen", "1");
    }
  }, []);

  const handleExit = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    document.body.style.overflow = "";
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("intro_seen", "1");
    }, 600);
  }, [exiting]);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";

    // Auto-exit after 2.5 seconds — fast, cinematic, doesn't block users
    const timeout = setTimeout(handleExit, 2500);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(timeout);
    };
  }, [visible, handleExit]);

  useEffect(() => {
    if (!visible) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") handleExit(); };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [visible, handleExit]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#080807]"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Full-screen video */}
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          onEnded={handleExit}
          onCanPlay={(e) => (e.currentTarget.play().catch(() => {}))}
          style={{ willChange: "auto" }}
        >
          <source src="/opening-web.mp4" type="video/mp4" />
        </video>

        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080807]/80 via-transparent to-[#080807]/30 pointer-events-none" />

        {/* Exit curtain */}
        <motion.div
          className="absolute inset-0 bg-[#080807] origin-bottom pointer-events-none"
          initial={{ scaleY: 0 }}
          animate={exiting ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Bottom content — explore button (appears quickly) */}
        <motion.div
          className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4 z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <button
            onClick={handleExit}
            className="group relative inline-flex items-center gap-3 border border-[#00BFFF]/50 text-[#00BFFF] px-8 py-3 text-xs uppercase tracking-[0.3em] font-medium overflow-hidden transition-all duration-300 hover:border-[#00BFFF] rounded-full"
            style={{ backdropFilter: "blur(8px)", background: "rgba(0,191,255,0.05)" }}
          >
            <span className="relative z-10">Explore Website</span>
            <span className="relative z-10">→</span>
            <span className="absolute inset-0 bg-[#00BFFF]/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
