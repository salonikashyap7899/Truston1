import { motion, type Variants, useInView, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useRef, useEffect } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 60, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Reveal({
  children,
  delay = 0,
  className,
  direction,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "left" | "right";
}) {
  const v = direction === "left" ? slideLeft : direction === "right" ? slideRight : variants;
  return (
    <motion.div
      className={className}
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionEyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-[11px] uppercase tracking-luxe flex items-center gap-3 justify-center mb-5 ${light ? "text-white/60" : "text-luxe-cyan font-bold"}`}
    >
      <span className={`inline-block w-10 h-px ${light ? "bg-white/40" : "bg-luxe-cyan"}`} />
      {children}
      <span className={`inline-block w-10 h-px ${light ? "bg-white/40" : "bg-luxe-cyan"}`} />
    </p>
  );
}

export function CountUp({
  to,
  suffix = "",
  duration = 2,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (inView) count.set(to);
  }, [inView, to, count]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}
