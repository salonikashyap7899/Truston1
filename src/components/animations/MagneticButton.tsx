import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  stiffness = 150,
  damping = 15,
  mass = 0.5,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness, damping, mass };

  // Spring animated values for x and y
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    // Reset position when not hovered
    if (!isHovered) {
      x.set(0);
      y.set(0);
    }
  }, [isHovered, x, y]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    // Calculate distance from center of element
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // The divisor determines the strength of the pull (higher = less pull)
    const distanceX = (clientX - centerX) / 2.5;
    const distanceY = (clientY - centerY) / 2.5;

    x.set(distanceX);
    y.set(distanceY);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative inline-flex items-center justify-center cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ x, y }}
    >
      {/* We apply a slight opposing movement to the children to create depth */}
      <motion.div
        style={{
          x: useSpring(isHovered ? x.get() * 0.4 : 0, springConfig),
          y: useSpring(isHovered ? y.get() * 0.4 : 0, springConfig),
        }}
        className="w-full h-full flex items-center justify-center"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
