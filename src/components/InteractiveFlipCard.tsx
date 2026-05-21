import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}

export function InteractiveFlipCard({ frontContent, backContent, className = "" }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateXVal = (y - centerY) / 10;
    const rotateYVal = (centerX - x) / 10;

    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      className={`relative w-full h-full ${className}`}
      style={{
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full"
        animate={{
          rotateX,
          rotateY,
          rotateZ: isFlipped ? 180 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          transformStyle: "preserve-3d" as const,
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm border border-bronze/30 rounded-2xl p-8 flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden" as const,
          }}
        >
          <div className="text-center">{frontContent}</div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-bronze/10 to-bronze/5 backdrop-blur-sm border border-bronze/50 rounded-2xl p-8 flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden" as const,
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-center">{backContent}</div>
        </div>
      </motion.div>
    </div>
  );
}

// Grid of flip cards
export function FlipCardGrid({
  cards,
  className = "",
}: {
  cards: { front: React.ReactNode; back: React.ReactNode }[];
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {cards.map((card, index) => (
        <div key={index} className="h-64">
          <InteractiveFlipCard
            frontContent={card.front}
            backContent={card.back}
            className="w-full h-full"
          />
        </div>
      ))}
    </div>
  );
}
