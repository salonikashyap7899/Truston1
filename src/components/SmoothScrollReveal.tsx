import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SmoothScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  className?: string;
}

export function SmoothScrollReveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.8,
  className = "",
}: SmoothScrollRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  const variants = {
    up: {
      hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
    down: {
      hidden: { opacity: 0, y: -60, filter: "blur(8px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
    left: {
      hidden: { opacity: 0, x: 60, filter: "blur(8px)" },
      visible: { opacity: 1, x: 0, filter: "blur(0px)" },
    },
    right: {
      hidden: { opacity: 0, x: -60, filter: "blur(8px)" },
      visible: { opacity: 1, x: 0, filter: "blur(0px)" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggeredContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: StaggeredContainerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}

interface ParallaxScrollProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxScroll({ children, offset = 50, className = "" }: ParallaxScrollProps) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}
