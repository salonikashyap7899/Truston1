import { motion } from "framer-motion";

export function WhoWeAreSection() {
  return (
    <section className="relative bg-[#f8f7f4] overflow-hidden">
      {/* Background subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 min-h-[80vh]">
          
          {/* Left Content Side */}
          <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 py-20 lg:py-24 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-[#00BFFF]" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#00BFFF] font-bold">
                  Redefining Excellence
                </p>
              </div>

              {/* Main Heading */}
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] leading-[1.1] tracking-tight mb-8">
                Where Vision Meets{" "}
                <em className="italic text-[#00BFFF] font-light">Reality</em>
              </h2>
            </motion.div>

            {/* First Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#4a4a4a] text-base md:text-lg leading-relaxed mb-6 font-light"
            >
              Planned around walkability and choice, our community brings together 
              modern living, nature-inspired experiences, and urban convenience 
              within one integrated township. Living options range from premium 
              plots to expansive villas, thoughtfully positioned to offer privacy, 
              openness, and connection to the surrounding landscape.
            </motion.p>

            {/* Second Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[#6a6a6a] text-base leading-relaxed mb-6 font-light"
            >
              With intuitively placed amenities, expansive green corridors, and 
              architecture shaped by context and climate, the township offers a 
              balanced way of living where nature, comfort, and everyday convenience 
              are seamlessly connected.
            </motion.p>

            {/* Third Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[#6a6a6a] text-base leading-relaxed font-light"
            >
              Every decision we make is driven by a commitment to quality, 
              transparency, and creating lasting value for families who choose 
              to build their legacy with TrustOn.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10"
            >
              <a
                href="/about-us"
                className="inline-flex items-center gap-2 text-[#00BFFF] text-sm font-medium hover:gap-4 transition-all duration-300"
              >
                <span>Learn More About Us</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right Image Side - CIRCULAR like Sobha */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 lg:order-2 flex items-center justify-center py-12 lg:py-0"
          >
            {/* Circular Image Container */}
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border border-[#00BFFF]/20" />
              <div className="absolute -inset-8 rounded-full border border-[#00BFFF]/10" />
              
              {/* Main circular image */}
              <div className="w-[320px] h-[320px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] rounded-full overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
                  alt="Premium Lifestyle Living"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating accent dot */}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#00BFFF] shadow-lg" />
              <div className="absolute -bottom-4 -left-4 w-4 h-4 rounded-full bg-[#00BFFF]/50" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
