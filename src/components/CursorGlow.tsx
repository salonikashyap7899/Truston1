import { useEffect, useRef } from "react";

export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const text = textRef.current;
    if (!dot || !ring) return;

    let raf = 0;
    let dotX = -100, dotY = -100;
    let ringX = -100, ringY = -100;
    let targetX = -100, targetY = -100;
    let isHovering = false;
    let isOnDark = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement);
      const interactive = el.closest("a, button, [role='button'], input, select, textarea, label, [data-cursor]");
      const darkSection = el.closest("[data-dark]");
      isOnDark = !!darkSection;

      if (interactive) {
        isHovering = true;
        ring.style.width = "70px";
        ring.style.height = "70px";
        ring.style.marginLeft = "-35px";
        ring.style.marginTop = "-35px";
        ring.style.borderColor = "oklch(0.50 0.155 245 / 0.8)";
        ring.style.backgroundColor = "oklch(0.50 0.155 245 / 0.06)";
        dot.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0) scale(0.5)`;
        if (text) text.style.opacity = "0";
      } else {
        isHovering = false;
        ring.style.width = "38px";
        ring.style.height = "38px";
        ring.style.marginLeft = "-19px";
        ring.style.marginTop = "-19px";
        ring.style.borderColor = "oklch(0.50 0.155 245 / 0.45)";
        ring.style.backgroundColor = "transparent";
        if (text) text.style.opacity = "0";
      }
    };

    const loop = () => {
      ringX += (targetX - ringX) * 0.1;
      ringY += (targetY - ringY) * 0.1;

      dot.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      raf = requestAnimationFrame(loop);
    };

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
      {/* Inner precision dot */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9990] hidden md:block"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "oklch(0.50 0.155 245)",
          boxShadow: "0 0 10px 2px oklch(0.50 0.155 245 / 0.6)",
          transition: "transform 0.05s linear",
          willChange: "transform",
        }}
      />
      {/* Outer lagged ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed z-[9989] hidden md:block"
        style={{
          width: 38,
          height: 38,
          marginLeft: -19,
          marginTop: -19,
          borderRadius: "50%",
          border: "1px solid oklch(0.50 0.155 245 / 0.45)",
          backgroundColor: "transparent",
          transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), margin 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, background-color 0.3s",
          willChange: "left, top",
        }}
      />
      {/* Label text (for data-cursor elements) */}
      <div
        ref={textRef}
        aria-hidden
        className="pointer-events-none fixed z-[9991] hidden md:flex items-center justify-center"
        style={{
          width: 70,
          height: 70,
          marginLeft: -35,
          marginTop: -35,
          opacity: 0,
          transition: "opacity 0.3s",
          fontSize: 9,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "white",
          fontFamily: "Inter, sans-serif",
        }}
      />
    </>
  );
}
