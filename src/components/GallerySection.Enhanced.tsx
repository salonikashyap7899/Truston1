import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import { TiltCard3D } from "@/components/animations/TiltCard3D";

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
    <section ref={ref} className="relative py-24 md:py-32 px-6 overflow-hidden bg-white">
      {/* Background Parallax Effect */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-sand/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sand/30 rounded-full blur-3xl" />
      </motion.div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <Reveal delay={0}>
          <SectionEyebrow>Gallery</SectionEyebrow>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="typography-section-title text-center text-ink mt-8 mb-4">
            Visual Excellence
          </h2>
          <p className="text-center typography-body text-gray-600 max-w-2xl mx-auto mb-16">
            Explore the architectural brilliance and natural beauty of Prime Estate through our
            curated collection of premium imagery.
          </p>
        </Reveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {galleryItems.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.1}>
              <TiltCard3D intensity={8} className="h-80 md:h-96">
                <motion.div
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative h-full rounded-xl overflow-hidden shadow-card hover:shadow-luxe transition-all duration-500 cursor-pointer sobha-gallery-card"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-full overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.12 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Overlay Gradient */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={hoveredIndex === idx ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                    />
                  </div>

                  {/* Content Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={hoveredIndex === idx ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col justify-end p-6 text-white"
                  >
                    <div className="inline-block mb-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-bronze bg-bronze/20 px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-white/90 leading-relaxed">{item.description}</p>
                  </motion.div>

                  {/* Static Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
                  </div>
                </motion.div>
              </TiltCard3D>
            </Reveal>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 text-bronze font-bold text-sm md:text-base uppercase tracking-widest hover:gap-4 transition-all duration-300 border-2 border-bronze px-8 py-4 rounded-lg hover:bg-bronze/10"
          >
            View Full Gallery
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
