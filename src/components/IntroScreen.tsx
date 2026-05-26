import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

export function IntroScreen() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("intro_seen")) {
      setVisible(false);
    }
  }, []);

  const handleExit = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("intro_seen", "1");
      document.body.style.overflow = "";
    }, 900);
  }, [exiting]);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

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
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Full-screen video */}
        <video
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onEnded={handleExit}
          style={{ willChange: "transform" }}
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VID-20260515-WA0026-bIjcfqcc0KU7HUhsoHZDzfjIC9TT1C.mp4"
            type="video/mp4"
          />
        </video>

        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080807]/80 via-transparent to-[#080807]/30 pointer-events-none" />

        {/* ── TRUSTON CIRCLE LOGO (top center) ── */}
        <motion.div
          className="absolute top-[12%] left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Concentric rings */}
          <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
            {[160, 120, 84].map((size, i) => (
              <motion.div
                key={size}
                className="absolute rounded-full border"
                style={{
                  width: size,
                  height: size,
                  borderColor: `rgba(0,191,255,${0.18 - i * 0.05})`,
                }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 18 + i * 7, repeat: Infinity, ease: "linear" }}
              />
            ))}
            {/* Centre badge */}
            <div className="relative z-10 flex flex-col items-center justify-center w-16 h-16 rounded-full border border-[#00BFFF]/40 bg-[#080807]/60"
              style={{ backdropFilter: "blur(8px)" }}>
              <span className="text-white font-serif text-[10px] uppercase tracking-[0.15em] leading-none">
                TRUST
              </span>
              <span className="text-[#00BFFF] font-serif text-[10px] uppercase tracking-[0.15em] leading-none">
                ON
              </span>
            </div>
          </div>
        </motion.div>


        {/* Exit curtain */}
        <motion.div
          className="absolute inset-0 bg-[#080807] origin-bottom pointer-events-none"
          initial={{ scaleY: 0 }}
          animate={exiting ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Bottom content — explore button */}
        <motion.div
          className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-6 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={handleExit}
            className="group relative inline-flex items-center gap-4 border border-[#00BFFF]/50 text-[#00BFFF] px-10 py-4 text-xs uppercase tracking-[0.3em] font-medium overflow-hidden transition-all duration-500 hover:border-[#00BFFF] rounded-full"
            style={{ backdropFilter: "blur(8px)", background: "rgba(0,191,255,0.05)" }}
          >
            <span className="relative z-10">Explore Website</span>
            <motion.span
              className="relative z-10 text-base"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
            <span className="absolute inset-0 bg-[#00BFFF]/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
          </button>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
