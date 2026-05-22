import { useEffect, useRef } from "react";

/* ── House SVG icon string (rendered via DOM) ──────────── */
const HOUSE_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">
  <path d="M3 10.5L12 3l9 7.5V21H15v-6H9v6H3V10.5z"/>
</svg>`;

const HOUSE_SVG_FILLED = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" stroke="currentColor" stroke-width="0.5" stroke-linejoin="round" stroke-linecap="round">
  <path d="M3 10.5L12 3l9 7.5V21H15v-6H9v6H3V10.5z"/>
</svg>`;

export function CursorGlow() {
  const iconRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(pointer: coarse)").matches) return;

    const icon = iconRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!icon || !ring || !glow) return;

    let raf = 0;
    let ix = -100,
      iy = -100;
    let rx = -100,
      ry = -100;
    let tx = -100,
      ty = -100;
    let isHovering = false;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      ix = e.clientX;
      iy = e.clientY;
    };

    const setHover = (active: boolean) => {
      if (active === isHovering) return;
      isHovering = active;
      if (active) {
        icon.innerHTML = HOUSE_SVG_FILLED;
        icon.style.color = "var(--luxe-cyan)";
        icon.style.filter = "drop-shadow(0 0 12px var(--luxe-cyan))";
        icon.style.transform = `translate3d(${ix - 11}px, ${iy - 11}px, 0) scale(1.4)`;
        ring.style.width = "64px";
        ring.style.height = "64px";
        ring.style.borderColor = "var(--luxe-cyan)";
        ring.style.backgroundColor = "rgba(100, 200, 255, 0.1)";
      } else {
        icon.innerHTML = HOUSE_SVG;
        icon.style.color = "var(--luxe-blue)";
        icon.style.filter = "drop-shadow(0 0 6px var(--luxe-blue))";
        ring.style.width = "44px";
        ring.style.height = "44px";
        ring.style.borderColor = "rgba(50, 100, 255, 0.4)";
        ring.style.backgroundColor = "transparent";
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = !!el.closest(
        "a, button, [role='button'], input, select, textarea, label, [data-cursor]",
      );
      setHover(isInteractive);
    };

    const loop = () => {
      // Smoother "Liquid" Physics for Ring
      rx += (tx - rx) * 0.075;
      ry += (ty - ry) * 0.075;

      // Icon follows with very slight damping for premium feel
      const dx = ix - 11;
      const dy = isHovering ? iy - 11 : iy - 22;

      icon.style.transform = `translate3d(${ix - 11}px, ${dy}px, 0) scale(${isHovering ? 1.4 : 1})`;

      // Ring follows with lag
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      // Glow follows ring
      glow.style.transform = `translate3d(${rx - 160}px, ${ry - 160}px, 0)`;

      raf = requestAnimationFrame(loop);
    };

    icon.innerHTML = HOUSE_SVG;
    icon.style.color = "var(--luxe-blue)";
    icon.style.filter = "drop-shadow(0 0 6px var(--luxe-blue))";

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Ambient glow orb */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9985] hidden md:block w-[320px] h-[320px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(50, 100, 255, 0.08) 0%, transparent 75%)",
          filter: "blur(30px)",
          willChange: "transform",
        }}
      />
      {/* Lagged ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed z-[9989] hidden md:block rounded-full"
        style={{
          width: 44,
          height: 44,
          marginLeft: -22,
          marginTop: -22,
          borderRadius: "50%",
          border: "1px solid rgba(50, 100, 255, 0.4)",
          backgroundColor: "transparent",
          transition:
            "width 0.4s cubic-bezier(0.16,1,0.3,1), height 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s, background-color 0.4s",
          willChange: "left, top",
        }}
      />
      {/* House icon — precise tracking */}
      <div
        ref={iconRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9990] hidden md:block"
        style={{
          width: 22,
          height: 22,
          transition: "transform 0.18s cubic-bezier(0.16,1,0.3,1), filter 0.4s, color 0.4s",
          willChange: "transform",
        }}
      />
    </>
  );
}
