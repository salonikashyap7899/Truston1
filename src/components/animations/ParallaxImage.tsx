import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  overlay?: boolean;
  parallaxOffset?: number;
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  overlay = false,
  parallaxOffset = 50,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Moves the image up/down inside the container based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [-parallaxOffset, parallaxOffset]);

  // Curtain reveal using clipPath
  const isInView = useInView(containerRef, { once: true, margin: "-15% 0px" });

  return (
    <motion.div
      ref={containerRef}
      initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
      animate={
        isInView
          ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
          : { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }
      }
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div style={{ y }} className="absolute inset-0 -inset-y-[15%] w-full h-[130%]">
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${imageClassName}`}
          data-magnetic-target // useful if we want cursor to react
        />
        {overlay && <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />}
      </motion.div>
    </motion.div>
  );
}
