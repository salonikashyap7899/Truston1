import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";
import { FloatingImageScroll, SlideInOnScroll, BlurReveal } from "./ScrollAnimations";
import { SwipeReveal } from "./TextReveal";
import { Luxury3DScene } from "./Luxury3DScene";
import { Section3DBackground } from "./Section3DBackground";

/**
 * Enhanced DevelopersSection with scroll animations and floating images
 */

export function EnhancedDevelopersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax background effect
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div ref={ref} className="relative overflow-hidden bg-background">
      {/* Prime Estate Flagship Section */}
      <section className="relative py-24 md:py-32 px-6 min-h-[80vh] flex items-center">
        {/* 3D Background Layer for Flagship */}
        <div className="absolute inset-0 z-0">
          <Luxury3DScene />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          {/* Eyebrow */}
          <Reveal delay={0}>
            <SectionEyebrow>Flagship Project</SectionEyebrow>
          </Reveal>

          {/* Main Grid: Image + Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mt-12">
            {/* Floating Image */}
            <Reveal direction="left" delay={0.1}>
              <div className="relative h-96 md:h-[500px] rounded-[40px] overflow-hidden shadow-luxe border border-white/5">
                <FloatingImageScroll
                  src="https://truston.advrtisinguru.com/wp-content/uploads/2026/04/luxury-interior-design-600x800.jpg"
                  alt="Prime Estate Luxury Interior"
                  className="h-full"
                  intensity={0.8}
                />
              </div>
            </Reveal>

            {/* Content */}
            <Reveal direction="right" delay={0.2}>
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <SwipeReveal>
                    <h2 className="typography-section-title text-white mb-4">
                      Prime Estate <br />
                      <span className="text-luxe-cyan italic font-serif">Luxury Living</span>
                    </h2>
                  </SwipeReveal>
                  <p className="typography-body text-white/70 leading-relaxed font-light text-lg">
                    Experience the pinnacle of luxury living in Lucknow's most coveted location.
                    Prime Estate represents a new era of sophisticated urban development with
                    world-class amenities and architectural excellence.
                  </p>
                </motion.div>

                {/* Key Features */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-6 border-l-2 border-luxe-cyan pl-6"
                >
                  {[
                    { title: "150+ Premium Plots", desc: "Carefully curated land parcels" },
                    { title: "World-Class Amenities", desc: "Clubhouse, gardens, security" },
                    { title: "Green Living", desc: "40% green space allocation" },
                  ].map((feature, idx) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      <p className="font-semibold text-white text-sm md:text-base uppercase tracking-wider">
                        {feature.title}
                      </p>
                      <p className="text-xs md:text-sm text-white/40 mt-1">{feature.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <button className="btn-magnetic btn-luxe px-10">
                    Explore Prime Estate
                    <span className="ml-3">→</span>
                  </button>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="relative py-24 md:py-32 px-6 bg-ink overflow-hidden">
        <Section3DBackground opacity={0.2} />

        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal delay={0}>
            <SectionEyebrow light>Our Services</SectionEyebrow>
          </Reveal>

          <SwipeReveal className="flex justify-center">
            <h2 className="typography-section-title text-center text-white mt-8 mb-20 tracking-tight">
              Comprehensive Real Estate{" "}
              <em className="text-luxe-cyan italic font-serif">Mastery</em>
            </h2>
          </SwipeReveal>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: "🏗️",
                title: "Construction & Build",
                desc: "End-to-end construction management with quality assurance at every stage.",
                image:
                  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/construction-site-600x800.jpg",
              },
              {
                icon: "📊",
                title: "Investment Consulting",
                desc: "Expert guidance on real estate investments with proven ROI strategies.",
                image:
                  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/investment-consulting-600x800.jpg",
              },
              {
                icon: "🎯",
                title: "Plot Selling",
                desc: "Premium plot selection in high-growth locations with transparent dealings.",
                image:
                  "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/plot-selling-600x800.jpg",
              },
            ].map((service, idx) => (
              <SlideInOnScroll
                key={service.title}
                direction={idx % 2 === 0 ? "up" : "down"}
                delay={idx * 0.15}
              >
                <motion.div
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-[32px] shadow-card hover:shadow-luxe transition-all duration-500 h-[500px] border border-white/5"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover brightness-50"
                      whileHover={{ scale: 1.1, filter: "brightness(0.7)" }}
                      transition={{ duration: 0.8 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-10 text-white">
                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">
                      {service.icon}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl mb-4 group-hover:text-luxe-cyan transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/50 leading-relaxed font-light">
                      {service.desc}
                    </p>
                    <div className="mt-8 flex items-center gap-3 text-luxe-cyan text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      View Expertise <span>→</span>
                    </div>
                  </div>
                </motion.div>
              </SlideInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Why TrustOn Section */}
      <section className="relative py-24 md:py-32 px-6 bg-background">
        <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-luxe-blue rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-20 w-[600px] h-[600px] bg-luxe-cyan rounded-full blur-[120px]" />
        </motion.div>

        <div className="mx-auto max-w-6xl relative z-10">
          <BlurReveal>
            <SectionEyebrow>Why Choose TrustOn</SectionEyebrow>
          </BlurReveal>

          <BlurReveal>
            <h2 className="typography-section-title text-center text-white mt-8 mb-20 tracking-tight">
              Elite Standard of <em className="text-luxe-cyan italic font-serif">Trust</em>
            </h2>
          </BlurReveal>

          {/* Trust Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              {
                num: "01",
                title: "Transparent Dealings",
                desc: "Complete documentation, legal clarity, and zero hidden costs. Every transaction is documented and verified.",
              },
              {
                num: "02",
                title: "High-Growth Locations",
                desc: "Strategic locations with proven infrastructure development and long-term appreciation potential.",
              },
              {
                num: "03",
                title: "Expert Guidance",
                desc: "Our team of seasoned professionals provides personalized investment strategies tailored to your goals.",
              },
              {
                num: "04",
                title: "End-to-End Support",
                desc: "From property selection to legal completion, we handle every aspect of your investment journey.",
              },
            ].map((pillar, idx) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                className="group border-b border-white/5 pb-10"
              >
                <div className="flex gap-8">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-luxe-blue/10 text-luxe-cyan text-2xl font-display group-hover:bg-luxe-blue group-hover:text-white transition-all duration-500 border border-luxe-cyan/20">
                      {pillar.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-white mb-3 group-hover:text-luxe-cyan transition-colors duration-300">
                      {pillar.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/50 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="relative py-24 md:py-32 px-6 bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-luxe-blue/20 to-luxe-cyan/20 opacity-30" />
        <Section3DBackground opacity={0.15} />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-4xl md:text-6xl text-white mb-8 tracking-tight">
              Ready to Build Your <em className="text-luxe-cyan italic font-serif">Legacy?</em>
            </h3>
            <p className="text-white/50 text-lg md:text-xl mb-12 leading-relaxed font-light max-w-2xl mx-auto">
              Join the elite circle of investors who have chosen TrustOn as their gateway to premium
              real estate.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn-magnetic btn-luxe px-12 py-5"
            >
              Secure Your Future
              <span className="ml-3">→</span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
