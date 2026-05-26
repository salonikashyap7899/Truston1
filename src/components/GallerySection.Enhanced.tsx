import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";

/**
 * Enhanced Gallery Section with scroll-expand transitions
 * "Prime State Visual Excellence"
 */

export function EnhancedGallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Parallax background
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Scroll-expansion state for featured media
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
      setIsInView(latest > 0.1 && latest < 0.9);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Calculate expansion based on scroll
  const mediaScale = 1 + scrollProgress * 0.15;
  const mediaOpacity = Math.min(1, 0.3 + scrollProgress * 0.7);

  const galleryItems = [
    {
      id: 1,
      title: "Aerial View",
      category: "Landscape",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      description: "Stunning aerial perspective of Prime Estate township",
    },
    {
      id: 2,
      title: "Luxury Interior",
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      description: "Premium interior design with modern aesthetics",
    },
    {
      id: 3,
      title: "Plot Showcase",
      category: "Property",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      description: "Premium plot selection and layout",
    },
    {
      id: 4,
      title: "Evening Ambiance",
      category: "Landscape",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      description: "Beautiful twilight view of the estate",
    },
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-6 overflow-hidden bg-background">
      <Section3DBackground opacity={0.2} />

      {/* Background Parallax Effect */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-luxe-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxe-cyan/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <Reveal delay={0}>
          <SectionEyebrow>Prime State</SectionEyebrow>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl text-center text-white mt-8 mb-6 tracking-tight">
            Visual <em className="text-luxe-cyan italic font-serif">Excellence</em>
          </h2>
          <p className="text-center text-white/40 max-w-2xl mx-auto mb-20 font-light text-lg">
            Explore the architectural brilliance and natural beauty of Prime Estate through our
            curated collection of premium imagery.
          </p>
        </Reveal>

        {/* Featured Image with Scroll-Expand Effect */}
        <motion.div
          className="relative mb-16 rounded-2xl overflow-hidden"
          style={{
            scale: mediaScale,
            opacity: mediaOpacity,
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="aspect-video relative overflow-hidden rounded-2xl">
            <motion.img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"
              alt="Prime Estate Featured"
              className="w-full h-full object-cover"
              style={{
                scale: 1 + scrollProgress * 0.1,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            
            {/* Overlay Content */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-8 md:p-12"
              style={{
                opacity: 0.5 + scrollProgress * 0.5,
                y: (1 - scrollProgress) * 20,
              }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxe-cyan bg-luxe-blue/20 px-4 py-1.5 rounded-full border border-luxe-cyan/20 inline-block mb-4">
                Featured
              </span>
              <h3 className="font-display text-3xl md:text-5xl text-white mb-3">
                Prime Estate Masterpiece
              </h3>
              <p className="text-white/60 text-lg max-w-xl">
                Experience the pinnacle of luxury living in Lucknow&apos;s most prestigious address.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {galleryItems.map((item, idx) => (
            <GalleryCard
              key={item.id}
              item={item}
              idx={idx}
              isHovered={hoveredIndex === idx}
              setHovered={() => setHoveredIndex(idx)}
              clearHovered={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-24"
        >
          <button className="btn-magnetic btn-luxe px-12">
            View Full Gallery
            <span className="ml-3">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

interface GalleryCardProps {
  item: {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
  };
  idx: number;
  isHovered: boolean;
  setHovered: () => void;
  clearHovered: () => void;
}

function GalleryCard({ item, idx, isHovered, setHovered, clearHovered }: GalleryCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    clearHovered();
  };

  return (
    <Reveal delay={idx * 0.1}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={setHovered}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          y: -12,
          scale: 1.03,
        }}
        className="group relative h-[450px] rounded-[32px] overflow-hidden shadow-luxe transition-all duration-500 cursor-none border border-white/5"
      >
        {/* Image Container */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{ transform: "translateZ(20px)" }}
        >
          <motion.img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover brightness-75"
            whileHover={{ scale: 1.15, filter: "brightness(0.5)" }}
            transition={{ duration: 0.8 }}
            crossOrigin="anonymous"
          />

          {/* Overlay Gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent"
          />
        </div>

        {/* Content Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex flex-col justify-end p-8 text-white"
          style={{ transform: "translateZ(60px)" }}
        >
          <div className="inline-block mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxe-cyan bg-luxe-blue/20 px-4 py-1.5 rounded-full border border-luxe-cyan/20">
              {item.category}
            </span>
          </div>
          <h3 className="font-display text-3xl mb-3 tracking-tight">{item.title}</h3>
          <p className="text-sm text-white/50 leading-relaxed font-light">{item.description}</p>
        </motion.div>

        {/* Static Content */}
        <div
          className="absolute bottom-0 left-0 right-0 p-8 text-white group-hover:opacity-0 transition-opacity duration-300"
          style={{ transform: "translateZ(40px)" }}
        >
          <h3 className="font-display text-2xl tracking-tight">{item.title}</h3>
        </div>
      </motion.div>
    </Reveal>
  );
}
