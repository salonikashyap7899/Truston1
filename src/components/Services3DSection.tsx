import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

const services = [
  {
    title: "Plot Selling",
    sub: "Premium Plots. Zero Compromise.",
    blurb: "Curated, legally vetted plots across Lucknow's most promising corridors.",
    to: "/plot-selling",
    icon: "🏗️",
  },
  {
    title: "Architecture & Design",
    sub: "Your Vision, Brought to Life.",
    blurb: "Bespoke architectural drawings and 3D visualisation tailored to your land.",
    to: "/architecture-design",
    icon: "📐",
  },
  {
    title: "Construction & Build",
    sub: "Building Promises.",
    blurb: "Turnkey construction with premium craftsmanship and transparent costing.",
    to: "/construction-build",
    icon: "🏢",
  },
  {
    title: "Investment Consulting",
    sub: "Invest Smarter.",
    blurb: "Data-led advisory on yield, ROI and exit timing across premium inventory.",
    to: "/investment-consulting",
    icon: "📈",
  },
];

export function Services3DSection() {
  return (
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(var(--luxe-blue) 1px, transparent 1px), linear-gradient(90deg, var(--luxe-blue) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center mb-24">
            <span className="text-luxe-cyan text-xs uppercase tracking-[0.5em] font-medium mb-4 block">
              Our Expertise
            </span>
            <h2 className="typography-section-title text-white">
              Futuristic <em className="text-luxe-cyan italic font-serif">Solutions</em>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1}>
              <Link to={service.to} className="group block">
                <motion.div
                  whileHover={{
                    y: -20,
                    rotateX: 10,
                    rotateY: -10,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass-premium p-10 h-full rounded-3xl relative overflow-hidden flex flex-col border border-white/5 hover:border-luxe-blue/30 transition-colors duration-500"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Metallic Reflection Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="text-4xl mb-8 group-hover:scale-110 transition-transform duration-500 origin-left">
                    {service.icon}
                  </div>

                  <h3 className="font-display text-2xl text-white mb-4 group-hover:text-luxe-cyan transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-luxe-cyan/80 text-[10px] uppercase tracking-widest font-semibold mb-6">
                    {service.sub}
                  </p>

                  <p className="text-white/50 text-sm leading-relaxed font-light mb-10 flex-1">
                    {service.blurb}
                  </p>

                  <div className="flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.3em] font-bold">
                    Explore
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-luxe-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
