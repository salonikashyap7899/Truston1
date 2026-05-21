import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ScrollProgressBar Component
 * Displays a visual indicator of scroll progress at the top of the page
 */

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return <motion.div className="scroll-progress-bar" style={{ scaleX }} />;
}
