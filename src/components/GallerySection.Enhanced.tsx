import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";

/**
 * Enhanced Gallery Section with floating images and scroll animations
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

  const galleryItems = [
    {
      id: 1,
      title: "Aerial View",
      category: "Landscape",
      image:
        "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg",
      description: "Stunning aerial perspective of Prime Estate township",
    },
    {
      id: 2,
      title: "Luxury Interior",
      category: "Design",
      image:
        "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/luxury-interior-design-600x800.jpg",
      description: "Premium interior design with modern aesthetics",
    },
    {
      id: 3,
      title: "Plot Showcase",
      category: "Property",
      image:
        "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/plot-tracker-600x800.jpg",
      description: "Premium plot selection and layout",
    },
    {
      id: 4,
      title: "Evening Ambiance",
      category: "Landscape",
      image: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/hero-estate-600x800.jpg",
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
          <SectionEyebrow>Gallery</SectionEyebrow>
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
