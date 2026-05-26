import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<"link" | "view" | null>(null);

  // Cursor position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor position to give it that "heavy" luxury feel
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if it's a touch device, disable custom cursor if so
    const checkTouch = () => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    // If touch device, do not attach listeners
    if (isTouchDevice) return;

    // Attach mouse move listener
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Attach hover listeners for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for links or buttons
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
        setHoverType("link");
        return;
      }

      // Check for images with specific data attribute
      if (target.hasAttribute("data-magnetic-target") || target.closest("[data-magnetic-target]")) {
        setIsHovering(true);
        setHoverType("view");
        return;
      }

      setIsHovering(false);
      setHoverType(null);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouchDevice, mouseX, mouseY]);

  // If touch device, render nothing
  if (isTouchDevice) return null;

  // Variants for cursor animation
  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "var(--bronze)",
      mixBlendMode: "normal" as const,
      opacity: 1,
    },
    link: {
      width: 64,
      height: 64,
      backgroundColor: "transparent",
      border: "1px solid var(--bronze)",
      mixBlendMode: "difference" as const,
      opacity: 1,
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: "var(--bronze)",
      mixBlendMode: "normal" as const,
      opacity: 0.9,
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center font-sans text-xs uppercase tracking-widest text-white transform -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        variants={variants}
        animate={isHovering ? hoverType || "default" : "default"}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {isHovering && hoverType === "view" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            View
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
