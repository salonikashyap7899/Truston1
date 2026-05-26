import React from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {children}
      {/* 
        This is a simple "curtain" overlay that slides down when the component mounts.
        In a real Next.js/React-Router setup with AnimatePresence, we would animate this 
        on exit as well. Here we just use a mount animation to give a smooth entrance.
      */}
      <motion.div
        className="fixed inset-0 z-[9998] bg-[var(--ink)] pointer-events-none origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />
    </>
  );
}
