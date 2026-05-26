import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SplitTextRevealProps {
  text: string | React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  type?: "words" | "lines" | "characters";
}

export function SplitTextReveal({
  text,
  className = "",
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
  type = "words",
}: SplitTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  // If the text is not a string, we just animate it as a single block
  if (typeof text !== "string") {
    return (
      <div ref={ref} className={`overflow-hidden inline-block ${className}`}>
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {text}
        </motion.div>
      </div>
    );
  }

  // Split logic based on type
  let tokens: string[] = [];
  if (type === "words") {
    tokens = text.split(" ");
  } else if (type === "characters") {
    tokens = text.split("");
  } else {
    // Basic line splitting by newline if provided, else just one line
    tokens = text.split("\n");
  }

  return (
    <div ref={ref} className={className}>
      {tokens.map((token, idx) => (
        <span
          key={idx}
          className={`inline-block overflow-hidden ${
            type === "words" ? "mr-[0.25em]" : ""
          } ${type === "lines" ? "block w-full" : ""}`}
        >
          <motion.span
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration,
              delay: delay + idx * stagger,
              ease: [0.16, 1, 0.3, 1], // Custom luxury easing
            }}
            className="inline-block"
          >
            {token === " " && type === "characters" ? "\u00A0" : token}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
