import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

/**
 * SwipeReveal: A cinematic text reveal where a background swipe effect (overlay)
 * slides across the text as it reveals, inspired by high-end luxury websites.
 */
export function SwipeReveal({ children, className, delay = 0, once = true }: TextRevealProps) {
  return (
    <div className={`relative overflow-hidden inline-block ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: [0, 1, 1, 0], y: ["100%", "0%", "0%", "-100%"] }}
        viewport={{ once }}
        transition={{
          duration: 1.2,
          delay,
          times: [0, 0.4, 0.6, 1],
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-luxe-cyan z-10 origin-bottom"
      />
    </div>
  );
}

export function TextReveal({ children, className, delay = 0, once = true }: TextRevealProps) {
  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i + delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.8,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 45,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap", perspective: "1000px" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.25em", display: "inline-block" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function CharReveal({ children, className, delay = 0, once = true }: TextRevealProps) {
  const letters = Array.from(children);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i + delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(4px)",
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <motion.div
      style={{ display: "inline-flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          key={index}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
