export function Section3DBackground({ opacity = 0.4 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ opacity }}
    >
      {/* Static ambient glow — top right (no animation = no GPU thrash) */}
      <div
        className="absolute -top-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,191,255,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          willChange: "auto",
        }}
      />

      {/* Static secondary glow — bottom left */}
      <div
        className="absolute -bottom-1/4 -left-1/4 w-[50vw] h-[50vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,80,200,0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
          willChange: "auto",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,191,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
