import React, { useEffect, useRef, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  size?: "sm" | "md" | "lg";
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue: { base: 200, spread: 200, hex: "#00BFFF" },
  purple: { base: 280, spread: 300, hex: "#a855f7" },
  green: { base: 120, spread: 200, hex: "#22c55e" },
  red: { base: 0, spread: 200, hex: "#ef4444" },
  orange: { base: 30, spread: 200, hex: "#f97316" },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  glowColor = "blue",
  size = "md",
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { hex } = glowColorMap[glowColor];
  const sizeClass = customSize ? "" : sizeMap[size];

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      if (cardRef.current) {
        cardRef.current.style.setProperty("--x", x.toFixed(2));
        cardRef.current.style.setProperty("--xp", (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty("--y", y.toFixed(2));
        cardRef.current.style.setProperty("--yp", (y / window.innerHeight).toFixed(2));
      }
    };
    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-[24px] border border-white/5 bg-[#060c16] transition-all duration-300 hover:border-[${hex}]/30 group ${sizeClass} ${className}`}
      style={
        {
          "--glow-color": hex,
        } as React.CSSProperties
      }
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px]"
        style={{
          background: `radial-gradient(300px circle at calc(var(--x, 0) * 1px - var(--card-left, 0) * 1px) calc(var(--y, 0) * 1px - var(--card-top, 0) * 1px), ${hex}18 0%, transparent 70%)`,
        }}
      />
      {/* Top glow border */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${hex}60, transparent)` }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export { GlowCard };
export type { GlowCardProps };
