import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.92 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative flex items-center gap-2 bg-white/95 backdrop-blur-sm text-[var(--ink)] text-[11px] font-medium tracking-wider uppercase px-5 py-3 shadow-2xl whitespace-nowrap"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            Chat Now on WhatsApp
            {/* Arrow */}
            <div
              className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0"
              style={{
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderLeft: "8px solid rgba(255,255,255,0.95)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <div className="relative">
        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "rgba(37,211,102,0.3)" }}
          animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "rgba(37,211,102,0.2)" }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
        />

        <motion.a
          href="https://wa.me/919616061166?text=Hi%2C%20I%20am%20interested%20in%20TrustOn%20Prime%20Estate."
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.12, y: 0 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-[58px] h-[58px] rounded-full flex items-center justify-center shadow-2xl z-10"
          style={{
            background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
            boxShadow: "0 8px 30px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.15)",
          }}
          aria-label="Chat on WhatsApp"
        >
          {/* Modern WhatsApp SVG */}
          <svg
            viewBox="0 0 32 32"
            className="w-[28px] h-[28px] fill-white drop-shadow"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.345.633 4.55 1.737 6.455L2.667 29.333l7.085-1.718A13.27 13.27 0 0016 29.333c7.364 0 13.333-5.97 13.333-13.333S23.364 2.667 16 2.667zM16 27a11.3 11.3 0 01-5.753-1.577l-.414-.245-4.144 1.025 1.05-3.998-.272-.42A11.248 11.248 0 014.8 16C4.8 9.834 9.834 4.8 16 4.8S27.2 9.834 27.2 16 22.166 27 16 27zm6.17-8.383c-.337-.168-2-.99-2.31-1.102-.31-.113-.536-.168-.762.168-.226.337-.875 1.102-1.073 1.328-.198.226-.395.254-.732.085-.337-.169-1.423-.524-2.71-1.672-.9-.8-1.527-1.824-1.706-2.162-.18-.337-.019-.52.134-.688.138-.149.337-.39.505-.585.168-.196.224-.337.337-.563.113-.226.056-.423-.028-.592-.085-.169-.762-1.847-1.045-2.53-.276-.665-.556-.575-.762-.585-.197-.01-.422-.012-.647-.012-.225 0-.59.084-.9.422-.308.337-1.176 1.15-1.176 2.808s1.204 3.258 1.372 3.484c.169.226 2.37 3.623 5.743 5.082.803.347 1.43.555 1.918.71.806.256 1.54.22 2.119.133.646-.097 1.99-.814 2.27-1.6.282-.788.282-1.46.197-1.6-.085-.14-.31-.225-.647-.394z" />
          </svg>
        </motion.a>
      </div>
    </div>
  );
}
