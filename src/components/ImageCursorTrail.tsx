import { createRef, useRef, type ReactNode } from "react";

const TRAIL_IMAGES = [
  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/hotel-lobby-interior-600x800.jpg",
  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/modern-interior-design-interior-600x800.jpg",
  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg",
  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/businessman-explaining-concept-details-600x800.jpg",
  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/webaliser-_TPTXZd9mOo-unsplash-1-1024x768.jpg",
  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/april-pethybridge-nN28PjFOOLI-unsplash-scaled.jpg",
  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-werde-hHz4yrvxwlA-unsplash-scaled.jpg",
  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/close-up-hand-holding-cash-600x800.jpg",
];

interface ImageCursorTrailProps {
  items?: string[];
  children?: ReactNode;
  className?: string;
  imgClass?: string;
  distance?: number;
  maxNumberOfImages?: number;
  fadeAnimation?: boolean;
}

export function ImageCursorTrail({
  items = TRAIL_IMAGES,
  children,
  className = "",
  maxNumberOfImages = 5,
  imgClass = "w-36 h-44",
  distance = 20,
  fadeAnimation = true,
}: ImageCursorTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const refs = useRef(items.map(() => createRef<HTMLImageElement>()));
  const currentZIndexRef = useRef(1);

  let globalIndex = 0;
  let last = { x: 0, y: 0 };

  const activate = (image: HTMLImageElement, x: number, y: number) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    const relativeX = x - containerRect.left;
    const relativeY = y - containerRect.top;
    image.style.left = `${relativeX}px`;
    image.style.top = `${relativeY}px`;

    if (currentZIndexRef.current > 40) currentZIndexRef.current = 1;
    image.style.zIndex = String(currentZIndexRef.current);
    currentZIndexRef.current++;

    image.dataset.status = "active";
    if (fadeAnimation) {
      setTimeout(() => {
        image.dataset.status = "inactive";
      }, 1400);
    }
    last = { x, y };
  };

  const distanceFromLast = (x: number, y: number) =>
    Math.hypot(x - last.x, y - last.y);

  const deactivate = (image: HTMLImageElement) => {
    image.dataset.status = "inactive";
  };

  const handleOnMove = (e: MouseEvent | Touch) => {
    if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / distance) {
      const lead = refs.current[globalIndex % refs.current.length].current;
      const tail =
        refs.current[(globalIndex - maxNumberOfImages + refs.current.length) % refs.current.length]?.current;
      if (lead) activate(lead, e.clientX, e.clientY);
      if (tail) deactivate(tail);
      globalIndex++;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-none ${className}`}
      onMouseMove={(e) => handleOnMove(e as unknown as MouseEvent)}
      onTouchMove={(e) => handleOnMove(e.touches[0] as unknown as Touch)}
    >
      {items.map((src, i) => (
        <img
          key={i}
          ref={refs.current[i]}
          src={src}
          alt=""
          data-status="inactive"
          aria-hidden="true"
          className={`pointer-events-none absolute z-20 object-cover rounded-2xl -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 border border-white/10 shadow-2xl transition-all duration-500
            data-[status=active]:scale-100 data-[status=active]:opacity-100 data-[status=active]:duration-500
            ${imgClass}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
      ))}
      {children}
    </div>
  );
}
