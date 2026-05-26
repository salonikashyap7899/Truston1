import React, { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Floating Image Component
export const FloatingImage = ({
  src,
  alt,
  delay = 0,
  duration = 6,
  className = "",
}: {
  src: string;
  alt: string;
  delay?: number;
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-bronze/0 via-transparent to-ink/10 pointer-events-none" />
    </motion.div>
  );
};

// Luxury Parallax Section
export const LuxuryParallax = ({
  children,
  offset = 50,
}: {
  children: ReactNode;
  offset?: number;
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, offset]);

  return <motion.div style={{ y }}>{children}</motion.div>;
};

// Staggered Text Animation
export const StaggeredText = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const words = text.split(" ");

  return (
    <motion.div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + index * 0.05,
            duration: 0.5,
          }}
          viewport={{ once: true }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Animated Counter
export const AnimatedCounter = ({
  value,
  duration = 2,
  suffix = "",
}: {
  value: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

// Hover Card with Glow
export const HoverGlowCard = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-bronze/20 to-transparent rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <motion.div
        className="relative z-10 bg-black/40 backdrop-blur-sm border border-bronze/20 rounded-lg p-6"
        whileHover={{
          borderColor: "rgba(180, 142, 73, 0.6)",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Page Transition Wrapper
export const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

// Animated Gradient Text
export const AnimatedGradientText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <motion.div
      className={`bg-gradient-to-r from-bronze via-blue-500 to-bronze bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ["0% center", "100% center", "0% center"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
    >
      {text}
    </motion.div>
  );
};

// Scroll Reveal Container
export const ScrollRevealContainer = ({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.8,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};

// Luxury Glass Card
export const LuxuryGlassCard = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-bronze/30 transition-colors ${className}`}
      whileHover={{ borderColor: "rgba(180, 142, 73, 0.3)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

// Animated Icon
export const AnimatedIcon = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Blur In Effect
export const BlurInEffect = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};
