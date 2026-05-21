import React, { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export const ScrollMorphingText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  return (
    <div ref={ref} className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{
            opacity: useTransform(
              scrollYProgress,
              [i / text.length, (i + 1) / text.length],
              [0.3, 1],
            ),
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export const ParallaxDepth = ({
  children,
  depth = 1,
  className = "",
}: {
  children: ReactNode;
  depth?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [depth * 100, -depth * 100]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};
