import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ScrollProgressBar Component
 * Displays a visual indicator of scroll progress at the top of the page
 */

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="scroll-progress-bar fixed top-0 left-0 right-0 h-[4px] z-[10000] origin-left"
      style={{
        scaleX,
        background: "var(--gradient-luxe)",
        boxShadow: "0 0 15px var(--luxe-blue)",
      }}
    />
  );
}
