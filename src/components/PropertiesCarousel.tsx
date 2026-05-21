import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal, SectionEyebrow } from "@/components/Reveal";

/**
 * Luxury Properties Carousel - Sobha Realty Style
 * 
 * Features:
 * - Horizontal scroll carousel
 * - Large property cards with hover effects
 * - Navigation arrows and indicators
 * - Smooth transitions
 */

const properties = [
  {
    id: 1,
    name: "Prime Estate",
    location: "Lucknow",
    type: "TOWNSHIP",
    status: "Now Selling",
    image: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg",
    description: "Jila Panchayat approved luxury township with premium plots",
    slug: "prime-estate",
  },
  {
    id: 2,
    name: "Vista Gardens",
    location: "Lucknow",
    type: "RESIDENTIAL",
    status: "Coming Soon",
    image: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/luxury-interior-design-600x800.jpg",
    description: "Green living in the heart of the city",
    slug: "vista-gardens",
  },
  {
    id: 3,
    name: "Horizon Heights",
    location: "Lucknow",
    type: "PLOTS",
    status: "Pre-Launch",
    image: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/hero-estate-600x800.jpg",
    description: "Premium plots with panoramic views",
    slug: "horizon-heights",
  },
  {
    id: 4,
    name: "Emerald Park",
    location: "Lucknow",
    type: "TOWNSHIP",
    status: "Now Selling",
    image: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/plot-tracker-600x800.jpg",
    description: "Nature-inspired living with modern amenities",
    slug: "emerald-park",
  },
];

const categories = [
  { id: "all", label: "ALL" },
  { id: "township", label: "TOWNSHIP" },
  { id: "residential", label: "RESIDENTIAL" },
  { id: "plots", label: "PLOTS" },
];

export function PropertiesCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const filteredProperties = activeCategory === "all" 
    ? properties 
    : properties.filter(p => p.type.toLowerCase() === activeCategory);

  const scrollTo = (direction: "prev" | "next") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.offsetWidth * 0.8;
    
    if (direction === "next") {
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setCurrentIndex(Math.min(currentIndex + 1, filteredProperties.length - 1));
    } else {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setCurrentIndex(Math.max(currentIndex - 1, 0));
    }
  };

  return (
    <section ref={ref} className="relative py-32 md:py-40 overflow-hidden bg-[var(--cream)]">
      {/* Background Accent */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[var(--bronze)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--sand)] rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10">
        {/* Header */}
        <div className="px-6 md:px-16 max-w-[1600px] mx-auto">
          <Reveal>
            <SectionEyebrow>Our Properties</SectionEyebrow>
          </Reveal>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mt-8 mb-12">
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[var(--ink)] leading-[1.1] tracking-[-0.02em]">
                Explore Our Luxury
                <br />
                <span className="text-[var(--bronze)]">Properties</span>
              </h2>
            </Reveal>

            {/* Category Filters */}
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2 text-[11px] uppercase tracking-[0.2em] font-semibold border transition-all duration-300 ${
                      activeCategory === cat.id
                        ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                        : "bg-transparent text-[var(--ink)] border-gray-300 hover:border-[var(--ink)]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scrollTo("prev")}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
          >
            <svg className="w-5 h-5 text-[var(--ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scrollTo("next")}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
          >
            <svg className="w-5 h-5 text-[var(--ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable Container */}
          <div
            ref={carouselRef}
            className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide px-6 md:px-16 pb-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProperties.map((property, idx) => (
                <PropertyCard key={property.id} property={property} index={idx} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Explore All Button */}
        <Reveal delay={0.3}>
          <div className="text-center mt-12 md:mt-16 px-6">
            <Link
              to="/project"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[var(--ink)] text-[var(--ink)] font-semibold text-[11px] uppercase tracking-[0.2em] hover:bg-[var(--ink)] hover:text-white transition-all duration-500"
            >
              Explore All
              <span>&rarr;</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PropertyCard({ property, index }: { property: typeof properties[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex-shrink-0 w-[320px] md:w-[400px] cursor-pointer"
      style={{ scrollSnapAlign: "start" }}
    >
      <Link to={`/projects/${property.slug}`} className="block">
        {/* Image Container */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden mb-6">
          <motion.img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            animate={{ opacity: isHovered ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* Status Badge */}
          <div className="absolute top-6 left-6">
            <span className="px-4 py-2 bg-[var(--bronze)] text-white text-[10px] uppercase tracking-[0.2em] font-semibold">
              {property.status}
            </span>
          </div>

          {/* Type Badge */}
          <div className="absolute top-6 right-6">
            <span className="px-4 py-2 bg-white/90 text-[var(--ink)] text-[10px] uppercase tracking-[0.2em] font-semibold">
              {property.type}
            </span>
          </div>

          {/* Hover Content */}
          <motion.div
            className="absolute inset-x-0 bottom-0 p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm leading-relaxed">{property.description}</p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-display text-2xl md:text-3xl text-[var(--ink)] group-hover:text-[var(--bronze)] transition-colors duration-300">
            {property.name}
          </h3>
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{property.location}</span>
          </div>
        </div>

        {/* Hover Underline */}
        <motion.div
          className="h-0.5 bg-[var(--bronze)] mt-4 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  );
}
