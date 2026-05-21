import React, { ReactNode } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

// Glass Morphism Card with premium effects
export const PremiumGlassCard = ({
  children,
  className = "",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) => {
  return (
    <motion.div
      className={`
        backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 
        border border-white/20 rounded-3xl p-8 
        hover:border-white/40 transition-colors duration-300
        shadow-2xl shadow-black/20
        ${className}
      `}
      whileHover={hover ? { y: -4, borderColor: "rgba(255,255,255,0.45)" } : {}}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
};

// Premium glow effect
export const GlowEffect = ({
  children,
  className = "",
  glowColor = "bronze",
}: {
  children: ReactNode;
  className?: string;
  glowColor?: "bronze" | "blue" | "purple";
}) => {
  const glowColors = {
    bronze: "from-bronze/30 to-blue-600/20",
    blue: "from-blue-400/30 to-cyan-400/20",
    purple: "from-purple-400/30 to-pink-400/20",
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          absolute inset-0 bg-gradient-to-r ${glowColors[glowColor]} 
          rounded-full blur-3xl opacity-0 group-hover:opacity-100 
          transition-opacity duration-300
        `}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Luxury shadow elevation
export const LuxuryShadow = ({
  children,
  level = 1,
}: {
  children: ReactNode;
  level?: 1 | 2 | 3;
}) => {
  const shadows = {
    1: "shadow-lg shadow-black/20",
    2: "shadow-2xl shadow-black/30",
    3: "shadow-2xl shadow-black/40",
  };

  return <div className={shadows[level]}>{children}</div>;
};

// Premium text with gradient
export const PremiumGradientText = ({
  text,
  className = "",
  colors = "from-bronze via-blue-400 to-bronze",
}: {
  text: string;
  className?: string;
  colors?: string;
}) => {
  return (
    <motion.span
      className={`bg-gradient-to-r ${colors} bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ["0% center", "100% center", "0% center"],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
    >
      {text}
    </motion.span>
  );
};

// Shimmer effect for text
export const ShimmerText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <motion.div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <span className="relative">{text}</span>
    </motion.div>
  );
};

// Glitch effect for text
export const GlitchText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        x: [0, 2, -2, 2, 0],
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 4,
      }}
    >
      <span>{text}</span>
      <span className="absolute inset-0 text-sky-400/30 mix-blend-screen blur-px">{text}</span>
      <span className="absolute inset-0 text-cyan-500/30 mix-blend-screen translate-x-1 blur-px">
        {text}
      </span>
    </motion.div>
  );
};

// Typewriter effect
export const TypewriterText = ({
  text,
  speed = 0.05,
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) => {
  return (
    <motion.span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * speed }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Morphing blob background
export const MorphingBlob = ({
  className = "",
  size = "w-96 h-96",
}: {
  className?: string;
  size?: string;
}) => {
  return (
    <div className={`absolute ${size} ${className}`}>
      <motion.div
        className="w-full h-full bg-gradient-to-r from-bronze/20 to-blue-600/20 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.2, 0.9, 1.1, 1],
          borderRadius: [
            "30% 70% 70% 30%",
            "30% 30% 70% 70%",
            "70% 30% 30% 70%",
            "70% 70% 30% 30%",
            "30% 70% 70% 30%",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// Scroll-triggered floating animation
export const ScrollFloat = ({
  children,
  offset = 100,
  className = "",
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// Staggered container for animations
export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  className = "",
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

// Animated underline
export const AnimatedUnderline = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <span>{text}</span>
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-bronze to-blue-600"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      />
    </div>
  );
};

// Hover lift effect with enhanced shadow
export const HoverLift = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -12,
        boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

// Scroll reveal with parallax
export const ParallaxReveal = ({
  children,
  offset = 50,
  className = "",
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
};

// Neon glow button effect
export const NeonGlowButton = ({
  children,
  className = "",
  glowColor = "from-bronze to-blue-600",
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}) => {
  return (
    <motion.button
      className={`
        relative px-8 py-3 rounded-lg font-semibold
        bg-gradient-to-r ${glowColor}
        border border-transparent
        overflow-hidden
        ${className}
      `}
      whileHover={{
        boxShadow: `0 0 30px rgba(45, 107, 196, 0.6)`,
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
