import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500); // Wait a bit at 100%
          return 100;
        }
        // Random increment between 5 and 15
        return prev + Math.floor(Math.random() * 10) + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-[var(--ink)] flex flex-col items-center justify-center pointer-events-auto"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl tracking-[0.2em] text-white uppercase"
            >
              Truston
            </motion.div>

            {/* Progress Number */}
            <motion.div className="absolute top-12 font-sans text-xs tracking-widest text-[var(--bronze)] font-light">
              {progress}%
            </motion.div>

            {/* Progress Bar Container */}
            <div className="absolute top-20 w-48 h-px bg-white/20 overflow-hidden">
              <motion.div
                className="h-full bg-[var(--bronze)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
