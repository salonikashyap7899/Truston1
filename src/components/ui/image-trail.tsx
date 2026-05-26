'use client';

import { Children, useCallback, useMemo, useRef, useEffect } from "react";
import {
  useAnimationFrame,
} from "framer-motion";

import { useMouseVector } from "@/hooks/use-mouse-vector";

// Simple ID generator
let idCounter = 0;
const generateId = () => `trail-${++idCounter}-${Date.now()}`;

interface ImageTrailProps {
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLElement | null>;
  newOnTop?: boolean;
  rotationRange?: number;
  interval?: number;
}

interface TrailItem {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  child: React.ReactNode;
}

const ImageTrail = ({
  children,
  newOnTop = true,
  rotationRange = 15,
  containerRef,
  interval = 100,
}: ImageTrailProps) => {
  const trailRef = useRef<TrailItem[]>([]);

  const lastAddedTimeRef = useRef<number>(0);
  const { position: mousePosition } = useMouseVector(containerRef);
  const lastMousePosRef = useRef(mousePosition);
  const currentIndexRef = useRef(0);
  // Convert children to array for random selection
  const childrenArray = useMemo(() => Children.toArray(children), [children]);

  // Batch updates using useCallback
  const addToTrail = useCallback(
    (mousePos: { x: number; y: number }) => {
      const newItem: TrailItem = {
        id: generateId(),
        x: mousePos.x,
        y: mousePos.y,
        rotation: (Math.random() - 0.5) * rotationRange * 2,
        scale: 1,
        child: childrenArray[currentIndexRef.current],
      };

      // Increment index and wrap around if needed
      currentIndexRef.current =
        (currentIndexRef.current + 1) % childrenArray.length;

      if (newOnTop) {
        trailRef.current.push(newItem);
      } else {
        trailRef.current.unshift(newItem);
      }
    },
    [childrenArray, rotationRange, newOnTop]
  );

  const removeFromTrail = useCallback((itemId: string) => {
    const index = trailRef.current.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      trailRef.current.splice(index, 1);
    }
  }, []);

  useAnimationFrame((time) => {
    // Skip if mouse hasn't moved
    if (
      lastMousePosRef.current.x === mousePosition.x &&
      lastMousePosRef.current.y === mousePosition.y
    ) {
      return;
    }
    lastMousePosRef.current = mousePosition;

    const currentTime = time;

    if (currentTime - lastAddedTimeRef.current < interval) {
      return;
    }

    lastAddedTimeRef.current = currentTime;

    addToTrail(mousePosition);
  });

  return (
    <div className="relative w-full h-full pointer-events-none">
      {trailRef.current.map((item) => (
        <TrailItemComponent key={item.id} item={item} onComplete={removeFromTrail} />
      ))}
    </div>
  );
};

interface TrailItemProps {
  item: TrailItem;
  onComplete: (id: string) => void;
}

const TrailItemComponent = ({ item, onComplete }: TrailItemProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current || !elementRef.current) return;
    hasAnimated.current = true;

    const element = elementRef.current;
    
    // Create a simple animation sequence using Web Animations API
    const keyframes = [
      { transform: 'scale(1) translate(-50%, -50%)', opacity: 1 },
      { transform: 'scale(1.1) translate(-50%, -50%)', opacity: 1 },
      { transform: 'scale(0) translate(-50%, -50%)', opacity: 0 },
    ];
    
    const animation = element.animate(keyframes, {
      duration: 750,
      easing: 'ease-out',
      fill: 'forwards',
    });

    animation.onfinish = () => {
      onComplete(item.id);
    };

    return () => {
      animation.cancel();
    };
  }, [item.id, onComplete]);

  return (
    <div
      ref={elementRef}
      className="absolute pointer-events-none"
      style={{
        left: item.x,
        top: item.y,
        transform: `rotate(${item.rotation}deg) translate(-50%, -50%)`,
      }}
    >
      {item.child}
    </div>
  );
};

export { ImageTrail };
