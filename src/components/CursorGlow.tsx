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
        icon.style.color = "oklch(0.50 0.155 245)";
        icon.style.filter = "drop-shadow(0 0 8px oklch(0.50 0.155 245 / 0.8))";
        icon.style.transform = `translate3d(${ix - 11}px, ${iy - 11}px, 0) scale(1.3)`;
        ring.style.width = "56px";
        ring.style.height = "56px";
        ring.style.borderColor = "oklch(0.50 0.155 245 / 0.6)";
        ring.style.backgroundColor = "oklch(0.50 0.155 245 / 0.05)";
      } else {
        icon.innerHTML = HOUSE_SVG;
        icon.style.color = "oklch(0.50 0.155 245)";
        icon.style.filter = "drop-shadow(0 0 4px oklch(0.50 0.155 245 / 0.4))";
        ring.style.width = "40px";
        ring.style.height = "40px";
        ring.style.borderColor = "oklch(0.50 0.155 245 / 0.35)";
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
      rx += (tx - rx) * 0.11;
      ry += (ty - ry) * 0.11;

      // Icon follows precisely
      if (!isHovering) {
        icon.style.transform = `translate3d(${ix - 11}px, ${iy - 20}px, 0) scale(1)`;
      }
      // Ring follows with lag
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      // Glow follows ring
      glow.style.transform = `translate3d(${rx - 140}px, ${ry - 140}px, 0)`;

      raf = requestAnimationFrame(loop);
    };

    icon.innerHTML = HOUSE_SVG;
    icon.style.color = "oklch(0.50 0.155 245)";
    icon.style.filter = "drop-shadow(0 0 4px oklch(0.50 0.155 245 / 0.4))";

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
        className="pointer-events-none fixed top-0 left-0 z-[9985] hidden md:block w-[280px] h-[280px] rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.50 0.155 245 / 0.06) 0%, transparent 70%)",
          filter: "blur(20px)",
          willChange: "transform",
        }}
      />
      {/* Lagged ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed z-[9989] hidden md:block rounded-full"
        style={{
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: "50%",
          border: "1px solid oklch(0.50 0.155 245 / 0.35)",
          backgroundColor: "transparent",
          transition:
            "width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, background-color 0.3s",
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
          transition: "transform 0.15s cubic-bezier(0.16,1,0.3,1), filter 0.3s, color 0.3s",
          willChange: "transform",
        }}
      />
    </>
  );
}
