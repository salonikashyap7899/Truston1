import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionEyebrow } from "@/components/Reveal";

/**
 * Pillars Section - Sobha Realty "From Concept to Completion" style
 * 
 * Features:
 * - Large serif headline with parallax
 * - Three-column layout with floating cards
 * - Elegant typography and spacing
 * - Hover 3D tilt effects
 */

const pillars = [
  {
    num: "01",
    title: "Craftsmanship",
    subtitle: "Attention to Detail",
    description: "Every aspect of our developments reflects meticulous attention to detail. From the quality of materials to the precision of finishes, we believe in crafting not just properties but immersive experiences where every nuance is thoughtfully considered.",
    image: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/luxury-interior-design-600x800.jpg",
  },
  {
    num: "02",
    title: "Design Excellence",
    subtitle: "Thoughtful Spaces",
    description: "Our properties are not just structures; they are beautiful pieces of art. Homes that are spacious with well-utilized spaces. The design is carefully considered and subjected to severe quality inspections at every stage of construction.",
    image: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg",
  },
  {
    num: "03",
    title: "Quality Assurance",
    subtitle: "Superior Standards",
    description: "Every property built by us is subjected to rigorous material quality inspection. All items used in construction are sourced from premium suppliers, allowing complete control over the quality of products utilized in your home.",
    image: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/hero-estate-600x800.jpg",
  },
];

export function PillarsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="relative py-32 md:py-40 px-6 overflow-hidden bg-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 100px,
              var(--ink) 100px,
              var(--ink) 101px
            )`,
          }}
        />
      </div>

      <div className="mx-auto max-w-[1400px] relative z-10">
        {/* Section Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-20 md:mb-28"
        >
          <Reveal>
            <SectionEyebrow>Our Philosophy</SectionEyebrow>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-[var(--ink)] leading-[1.1] mt-8 tracking-[-0.02em]">
              From Concept to Completion:
              <br />
              <span className="text-[var(--bronze)]">Defining Our Pillars</span>
            </h2>
          </Reveal>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, idx) => (
            <PillarCard key={pillar.num} pillar={pillar} index={idx} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-20"
        >
          <motion.a
            href="/about-us"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[var(--ink)] text-[var(--ink)] font-semibold text-[11px] uppercase tracking-[0.2em] hover:bg-[var(--ink)] hover:text-white transition-all duration-500"
          >
            Discover More
            <span>&rarr;</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <Reveal delay={index * 0.15} direction="up">
      <motion.div
        ref={cardRef}
        className="group relative"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Card Container */}
        <div className="relative bg-white border border-gray-100 overflow-hidden transition-all duration-500 group-hover:border-[var(--bronze)]/30 group-hover:shadow-luxe">
          {/* Number Badge */}
          <div className="absolute top-6 right-6 z-10">
            <span className="font-display text-6xl md:text-7xl text-gray-100 group-hover:text-[var(--bronze)]/20 transition-colors duration-500">
              {pillar.num}
            </span>
          </div>

          {/* Image */}
          <div className="relative h-64 md:h-72 overflow-hidden">
            <motion.img
              src={pillar.image}
              alt={pillar.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8 md:p-10">
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="text-[10px] uppercase tracking-[0.3em] text-[var(--bronze)] mb-3 font-semibold"
            >
              {pillar.subtitle}
            </motion.p>

            {/* Title */}
            <h3 className="font-display text-2xl md:text-3xl text-[var(--ink)] mb-4 group-hover:text-[var(--bronze)] transition-colors duration-500">
              {pillar.title}
            </h3>

            {/* Divider */}
            <motion.div
              className="w-12 h-px bg-gray-200 mb-6 group-hover:w-20 group-hover:bg-[var(--bronze)] transition-all duration-500"
            />

            {/* Description */}
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {pillar.description}
            </p>
          </div>

          {/* Hover Accent Line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--bronze)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          />
        </div>
      </motion.div>
    </Reveal>
  );
}
