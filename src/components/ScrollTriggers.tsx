import React, { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, useInView, MotionValue } from "framer-motion";

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
        <MorphingChar
          key={i}
          char={char}
          i={i}
          total={text.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
};

const MorphingChar = ({
  char,
  i,
  total,
  scrollYProgress,
}: {
  char: string;
  i: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const opacity = useTransform(scrollYProgress, [i / total, (i + 1) / total], [0.3, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char}
    </motion.span>
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
