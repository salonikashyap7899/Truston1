import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

/**
 * Smooth fade-in and slight scale up on scroll
 */
export function SmoothFadeIn({
  children,
  delay = 0,
  duration = 0.8,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Smooth parallax effect for background elements
 */
export function SmoothParallax({
  children,
  offset = 50,
  speed = 0.5,
}: {
  children: ReactNode;
  offset?: number;
  speed?: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

/**
 * Smooth stagger effect for lists and grids
 */
export function SmoothStagger({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
}: {
  children: ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
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
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {Array.isArray(children) ? (
        children.map((child, i) => (
          <motion.div key={i} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
}

/**
 * Smooth slide-in animation
 */
export function SmoothSlideIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
}: {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directionMap = {
    up: { initial: { y: 60 }, animate: { y: 0 } },
    down: { initial: { y: -60 }, animate: { y: 0 } },
    left: { initial: { x: 60 }, animate: { x: 0 } },
    right: { initial: { x: -60 }, animate: { x: 0 } },
  };

  const { initial, animate } = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ ...initial, opacity: 0 }}
      animate={isInView ? { ...animate, opacity: 1 } : { ...initial, opacity: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Smooth scale animation
 */
export function SmoothScale({
  children,
  delay = 0,
  duration = 0.8,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Smooth text reveal character by character
 */
export function SmoothTextReveal({
  text,
  delay = 0,
  staggerDelay = 0.03,
}: {
  text: string;
  delay?: number;
  staggerDelay?: number;
}) {
  return (
    <div className="inline-block">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          viewport={{ once: true }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

/**
 * Smooth number counter with smooth animation
 */
export function SmoothCounter({
  from = 0,
  to = 100,
  duration = 2,
  delay = 0,
  suffix = "",
}: {
  from?: number;
  to?: number;
  duration?: number;
  delay?: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref}>
      {isInView && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay, duration: 0.4 }}
        >
          <Counter from={from} to={to} duration={duration} delay={delay} suffix={suffix} />
        </motion.span>
      )}
    </motion.div>
  );
}

function Counter({ from, to, duration, delay, suffix }: any) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll();

  const count = useTransform(scrollYProgress, [0, 1], [from, to]);

  return (
    <motion.span
      ref={nodeRef}
      suppressHydrationWarning
      onUpdate={(latest: any) => {
        if (nodeRef.current) {
          nodeRef.current.textContent = `${Math.round(latest)}${suffix}`;
        }
      }}
    >
      {from}
      {suffix}
    </motion.span>
  );
}
