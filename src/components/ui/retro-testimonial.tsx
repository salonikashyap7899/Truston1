import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface iTestimonial {
  name: string;
  designation: string;
  description: string;
  profileImage: string;
}

interface iCarouselProps {
  items: React.ReactElement<{
    testimonial: iTestimonial;
    index: number;
    layout?: boolean;
    onCardClose: () => void;
  }>[];
  initialScroll?: number;
}

const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  onOutsideClick: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      onOutsideClick();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

const Carousel = ({ items, initialScroll = 0 }: iCarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handleScrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const isMobile = window.innerWidth < 768;
      const cardWidth = isMobile ? 230 : 384;
      const gap = isMobile ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  return (
    <div className="relative w-full mt-10">
      <div
        className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] py-5"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className={cn("flex flex-row justify-start gap-4 pl-3", "max-w-7xl mx-auto")}>
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.15 * index, ease: "easeOut" },
              }}
              key={`card-${index}`}
              className="last:pr-[5%] md:last:pr-[10%] rounded-3xl"
            >
              {React.cloneElement(item, {
                onCardClose: () => handleCardClose(index),
              })}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-8">
        <button
          className="relative z-40 h-11 w-11 rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/30 flex items-center justify-center disabled:opacity-30 hover:bg-[#00BFFF]/20 transition-all duration-300"
          onClick={handleScrollLeft}
          disabled={!canScrollLeft}
        >
          <ArrowLeft className="h-5 w-5 text-[#00BFFF]" />
        </button>
        <button
          className="relative z-40 h-11 w-11 rounded-full bg-[#00BFFF]/10 border border-[#00BFFF]/30 flex items-center justify-center disabled:opacity-30 hover:bg-[#00BFFF]/20 transition-all duration-300"
          onClick={handleScrollRight}
          disabled={!canScrollRight}
        >
          <ArrowRight className="h-5 w-5 text-[#00BFFF]" />
        </button>
      </div>
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
  index,
  layout = false,
  onCardClose = () => {},
  backgroundImage = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
}: {
  testimonial: iTestimonial;
  index: number;
  layout?: boolean;
  onCardClose?: () => void;
  backgroundImage?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => setIsExpanded(true);
  const handleCollapse = () => {
    setIsExpanded(false);
    onCardClose();
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleCollapse();
    };
    if (isExpanded) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo({ top: scrollY, behavior: "instant" });
    }
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isExpanded]);

  useOutsideClick(containerRef, handleCollapse);

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 h-screen overflow-hidden z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/70 backdrop-blur-xl h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              ref={containerRef}
              layoutId={layout ? `card-${testimonial.name}` : undefined}
              className="max-w-3xl mx-auto bg-[#060c16] border border-[#00BFFF]/20 h-auto max-h-[85vh] z-[60] p-8 md:p-14 rounded-[40px] relative mt-[8vh] overflow-y-auto"
            >
              <button
                className="sticky top-0 h-9 w-9 right-0 ml-auto mb-6 flex rounded-full items-center justify-center bg-[#00BFFF]/10 border border-[#00BFFF]/30 hover:bg-[#00BFFF]/20 transition-colors"
                onClick={handleCollapse}
              >
                <X className="h-5 w-5 text-[#00BFFF]" />
              </button>
              <motion.p
                layoutId={layout ? `category-${testimonial.name}` : undefined}
                className="text-[#00BFFF] text-sm uppercase tracking-[0.3em] font-bold mb-3"
              >
                {testimonial.designation}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${testimonial.name}` : undefined}
                className="text-3xl md:text-5xl font-serif text-white mb-8 italic tracking-tight"
              >
                {testimonial.name}
              </motion.p>
              <div className="text-white/70 text-lg leading-relaxed font-light">
                <Quote className="h-8 w-8 text-[#00BFFF]/40 mb-4" />
                {testimonial.description}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        layoutId={layout ? `card-${testimonial.name}` : undefined}
        onClick={handleExpand}
        whileHover={{ rotateX: 2, rotateY: 2, rotate: 1, scale: 1.02, transition: { duration: 0.3 } }}
        className="text-left"
      >
        <div
          className={cn(
            "rounded-3xl h-[460px] md:h-[500px] w-72 md:w-80 overflow-hidden flex flex-col items-center justify-end relative z-10 cursor-pointer",
            "border border-[#00BFFF]/10 hover:border-[#00BFFF]/30 transition-all duration-500",
            index % 2 === 0 ? "rotate-0" : "-rotate-0",
          )}
          style={{ background: "linear-gradient(160deg, #060c16 0%, #04090f 100%)" }}
        >
          {/* Background image overlay */}
          <div className="absolute inset-0 opacity-20">
            <img
              src={backgroundImage}
              alt="Background"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04090f] via-[#04090f]/60 to-transparent" />
          </div>

          {/* Cyan glow top accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00BFFF]/50 to-transparent" />

          {/* Profile image */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2">
            <ProfileImageCard src={testimonial.profileImage} alt={testimonial.name} />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 w-full">
            <Quote className="h-5 w-5 text-[#00BFFF]/50 mb-3" />
            <p className="text-white/80 text-base font-light leading-relaxed mb-4">
              {testimonial.description.length > 110
                ? `${testimonial.description.slice(0, 110)}...`
                : testimonial.description}
            </p>
            <div className="w-8 h-px bg-[#00BFFF]/40 mb-3" />
            <p className="text-white font-serif text-lg italic">{testimonial.name}</p>
            <p className="text-[#00BFFF] text-[10px] uppercase tracking-[0.3em] font-bold mt-1">
              {testimonial.designation.length > 28
                ? `${testimonial.designation.slice(0, 28)}...`
                : testimonial.designation}
            </p>
          </div>
        </div>
      </motion.button>
    </>
  );
};

const ProfileImageCard = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <div className="w-20 h-20 overflow-hidden rounded-full border-2 border-[#00BFFF]/40 shadow-lg shadow-[#00BFFF]/10">
      <img
        className={cn(
          "w-full h-full object-cover transition-all duration-500",
          isLoading ? "blur-sm scale-105" : "blur-0 scale-100",
        )}
        onLoad={() => setLoading(false)}
        src={src}
        loading="lazy"
        alt={alt || "Profile image"}
      />
    </div>
  );
};

export { Carousel, TestimonialCard, ProfileImageCard };
