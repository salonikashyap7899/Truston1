import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";

// Magnetic button that follows mouse
export function MagneticButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={`
        relative px-6 py-3 rounded-lg font-semibold
        bg-gradient-to-r from-bronze to-blue-600
        text-white border border-bronze/50
        hover:border-bronze transition-all duration-300
        ${className}
      `}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(45, 107, 196, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Ripple effect button
export function RippleButton({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const [ripples, setRipples] = useState<Array<{ id: string; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = Date.now().toString();
    setRipples([...ripples, { id, x, y }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    onClick?.();
  };

  return (
    <motion.button
      className={`
        relative px-6 py-3 rounded-lg font-semibold overflow-hidden
        bg-gradient-to-r from-bronze to-blue-600
        text-white border border-bronze/50
        ${className}
      `}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30"
          initial={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
          animate={{
            width: 400,
            height: 400,
            left: ripple.x - 200,
            top: ripple.y - 200,
            opacity: 0,
          }}
          transition={{ duration: 0.6 }}
        />
      ))}
    </motion.button>
  );
}

// Gradient shift button
export function GradientShiftButton({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      className={`
        relative px-8 py-3 rounded-lg font-semibold
        bg-gradient-to-r from-bronze via-blue-500 to-bronze
        text-white border border-transparent
        overflow-hidden
        ${className}
      `}
      onClick={onClick}
      whileHover={{
        backgroundPosition: "200% center",
        boxShadow: "0 10px 30px rgba(45, 107, 196, 0.3)",
      }}
      whileTap={{ scale: 0.95 }}
      style={{
        backgroundSize: "200% auto",
      }}
      animate={{
        backgroundPosition: ["0% center", "100% center", "0% center"],
      }}
      transition={{
        backgroundPosition: {
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Neon glow button
export function NeonGlowButton({
  children,
  className = "",
  onClick,
  glowColor = "rgba(45, 107, 196, 0.4)",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  glowColor?: string;
}) {
  return (
    <motion.button
      className={`
        relative px-8 py-3 rounded-lg font-semibold
        bg-black/50 border border-bronze/50 text-white
        backdrop-blur-sm
        ${className}
      `}
      onClick={onClick}
      whileHover={{
        borderColor: "rgba(45, 107, 196, 1)",
        boxShadow: `0 0 30px ${glowColor}`,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Expandable button
export function ExpandButton({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.button
      className={`
        relative px-8 py-3 rounded-full font-semibold
        bg-gradient-to-r from-bronze to-blue-600
        text-white border border-transparent
        ${className}
      `}
      onClick={() => {
        setIsExpanded(!isExpanded);
        onClick?.();
      }}
      animate={{
        width: isExpanded ? "auto" : "auto",
        paddingRight: isExpanded ? 24 : 32,
        paddingLeft: isExpanded ? 24 : 32,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 15px 35px rgba(45, 107, 196, 0.3)",
      }}
    >
      <motion.span
        className="flex items-center gap-2"
        animate={{
          letterSpacing: isExpanded ? "0.05em" : "0em",
        }}
      >
        {children}
        <motion.svg
          className="w-4 h-4"
          animate={{
            rotate: isExpanded ? 90 : 0,
          }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5v14" />
        </motion.svg>
      </motion.span>
    </motion.button>
  );
}

// Skeleton loading button
export function SkeletonButton({
  isLoading = false,
  children,
  className = "",
  onClick,
}: {
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      className={`
        relative px-8 py-3 rounded-lg font-semibold
        bg-gradient-to-r from-bronze to-blue-600
        text-white border border-transparent
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      onClick={onClick}
      disabled={isLoading}
      whileHover={!isLoading ? { scale: 1.05 } : {}}
      whileTap={!isLoading ? { scale: 0.95 } : {}}
    >
      <motion.div
        className="flex items-center justify-center gap-2"
        animate={{
          opacity: isLoading ? 0 : 1,
        }}
      >
        {children}
      </motion.div>
      {isLoading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
    </motion.button>
  );
}

// Split text reveal button
export function SplitTextButton({
  children,
  className = "",
  onClick,
}: {
  children: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      className={`
        relative px-8 py-3 rounded-lg font-semibold
        bg-gradient-to-r from-bronze to-blue-600
        text-white border border-transparent overflow-hidden
        ${className}
      `}
      onClick={onClick}
      whileHover="hover"
      transition={{ duration: 0.3 }}
    >
      <motion.span
        className="inline-block"
        variants={{
          hover: {
            y: -24,
          },
        }}
      >
        <div className="h-6 leading-6">{children}</div>
        <div className="h-6 leading-6">{children}</div>
      </motion.span>
    </motion.button>
  );
}
