import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

/**
 * ScrollAnimations.tsx
 * Enhanced scroll-triggered animations for floating images and rich text visibility
 */

/* ── Floating Image on Scroll ─────────────────────────── */
export function FloatingImageScroll({
  src,
  alt,
  className = "",
  intensity = 1,
}: {
  src: string;
  alt: string;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Floating effect: moves up and down as user scrolls
  const y = useTransform(scrollYProgress, [0, 1], [100 * intensity, -100 * intensity]);

  // Subtle scale effect for depth
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  // Rotation for dynamic feel
  const rotate = useTransform(scrollYProgress, [0, 1], [-2 * intensity, 2 * intensity]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, rotate }}
      className={`relative overflow-hidden rounded-lg ${className}`}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  );
}

/* ── Parallax Image Container ─────────────────────────── */
export function ParallaxImage({
  src,
  alt,
  speed = 0.5,
  className = "",
}: {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={`relative overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  );
}

/* ── Staggered Text Reveal ────────────────────────────── */
export function StaggeredTextReveal({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: string;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const words = children.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: 0.5,
            delay: idx * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

/* ── Scroll-Triggered Scale Animation ─────────────────── */
export function ScaleOnScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Slide and Fade on Scroll ─────────────────────────── */
export function SlideInOnScroll({
  children,
  direction = "up",
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 60, x: 0 };
      case "down":
        return { y: -60, x: 0 };
      case "left":
        return { x: 60, y: 0 };
      case "right":
        return { x: -60, y: 0 };
      default:
        return { y: 60, x: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initialPos }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initialPos }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Rich Text Highlight Animation ────────────────────── */
export function HighlightText({
  children,
  className = "",
  highlightColor = "var(--luxe-cyan)",
}: {
  children: ReactNode;
  className?: string;
  highlightColor?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.span
      ref={ref}
      className={`relative inline-block ${className}`}
      initial={{ backgroundPosition: "100% 0" }}
      animate={inView ? { backgroundPosition: "0% 0" } : { backgroundPosition: "100% 0" }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        backgroundImage: `linear-gradient(90deg, ${highlightColor}20 0%, ${highlightColor}40 100%)`,
        backgroundSize: "200% 100%",
        backgroundPosition: "100% 0",
        paddingLeft: "0.25rem",
        paddingRight: "0.25rem",
      }}
    >
      {children}
    </motion.span>
  );
}

/* ── Floating Card with Shadow ────────────────────────── */
export function FloatingCard({
  children,
  className = "",
  intensity = 1,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], [50 * intensity, -50 * intensity]);

  return (
    <motion.div
      ref={ref}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        y: scrollY,
      }}
      className={`transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ── Image with Zoom on Scroll ────────────────────────── */
export function ZoomImageOnScroll({
  src,
  alt,
  className = "",
  maxZoom = 1.2,
}: {
  src: string;
  alt: string;
  className?: string;
  maxZoom?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, maxZoom]);

  return (
    <motion.div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} style={{ scale }} className="w-full h-full object-cover" />
    </motion.div>
  );
}

/* ── Reveal on Scroll with Blur ──────────────────────── */
export function BlurReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Counter with Animation ──────────────────────────── */
export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  className = "",
}: {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.span ref={ref} className={className}>
      {inView && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {to}
          {suffix}
        </motion.span>
      )}
      {!inView && `${from}${suffix}`}
    </motion.span>
  );
}
