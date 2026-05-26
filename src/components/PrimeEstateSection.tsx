import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { Link } from "@tanstack/react-router";

export function PrimeEstateSection() {
  const amenities = [
    "Wide Internal Roads",
    "24/7 Security Guard",
    "Piped Water Supply",
    "Electricity Connection",
    "Landscaped Parks",
    "Underground Drainage",
    "Clear Plot Demarcation",
    "Phased Infrastructure",
  ];

  const stats = [
    { val: "120", sup: "+", label: "Total Plots" },
    { val: "47", sup: "", label: "Available Now" },
    { val: "2,400", sup: "", label: "Sq. Ft Range" },
    { val: "₹12", sup: "L+", label: "Starting Price" },
  ];

  return (
    <section className="bg-[#0F0F0D] py-24 md:py-32 px-6 md:px-16 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-16">
          <div>
            <Reveal>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#00BFFF] mb-4 flex items-center gap-3">
                <span className="w-7 h-px bg-[#00BFFF]" />
                Flagship Project
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight text-white">
                Prime{" "}
                <em className="italic text-[#00BFFF]">Estate</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-white/40 leading-relaxed font-light">
              A masterfully planned residential plot colony at Dubagga, Lucknow — designed for those who want the freedom to build on their own terms, in a location primed for significant growth.
            </p>
          </Reveal>
        </div>

        {/* Main Project Card */}
        <Reveal delay={0.1}>
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[55%_45%] border border-[#00BFFF]/15 overflow-hidden"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left — Visual Panel */}
            <div className="relative overflow-hidden min-h-[420px] md:min-h-[600px] flex flex-col justify-end p-10 md:p-12 bg-[#161613]">
              {/* Background image */}
              <img
                src="/assets/photo_4.jpg"
                alt="Prime Estate — Internal Street"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#161613] via-[#161613]/50 to-transparent" />

              {/* Text content */}
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#00BFFF] mb-2 font-medium">
                  Residential Plot Colony · Dubagga
                </p>
                <h3 className="font-serif text-5xl md:text-6xl font-light text-white leading-tight mb-2">
                  Prime
                  <br />
                  <em className="italic text-[#00BFFF]">Estate</em>
                </h3>
                <p className="text-sm text-white/40 mt-2">Dubagga, Lucknow · Uttar Pradesh</p>
                <p className="text-[10px] text-white/25 tracking-widest uppercase mt-1">
                  Launched · January 5, 2025
                </p>
              </div>
            </div>

            {/* Right — Info Panel */}
            <div className="bg-[#161613] p-8 md:p-12 flex flex-col border-l border-[#00BFFF]/10">
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-px bg-[#00BFFF]/08">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`bg-[#161613] p-6 md:p-8 ${i < 2 ? "border-b border-[#00BFFF]/08" : ""}`}
                  >
                    <p className="font-serif text-3xl md:text-4xl font-light text-white leading-none">
                      {s.val}
                      {s.sup && (
                        <sup className="text-base md:text-lg text-[#00BFFF]">{s.sup}</sup>
                      )}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 mt-2">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Amenities */}
              <div className="mt-8 flex-1">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#00BFFF] mb-4 font-medium">
                  Premium Amenities
                </p>
                <div className="grid grid-cols-2 gap-0">
                  {amenities.map((item) => (
                    <div
                      key={item}
                      className="text-sm text-white/40 py-2.5 border-b border-white/[0.04] flex items-center gap-2 font-light"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF] opacity-60 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Approval note */}
              <div className="mt-6 p-4 border border-[#00BFFF]/15 bg-[#00BFFF]/[0.03] rounded-sm">
                <p className="text-xs text-white/40 leading-relaxed">
                  All plots are{" "}
                  <strong className="text-[#00BFFF] font-medium">Jila Panchayat Approved</strong>{" "}
                  with clear title deeds. Structured layout planning, transparent pricing, and full
                  legal documentation provided at every stage.
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="flex-1 text-center bg-[#00BFFF] text-[#080807] py-3.5 text-[11px] uppercase tracking-[0.15em] font-semibold hover:bg-white transition-colors duration-400 rounded-full"
                >
                  Enquire Now
                </Link>
                <Link
                  to="/contact"
                  className="flex-1 text-center border border-[#00BFFF]/25 text-white/50 py-3.5 text-[11px] uppercase tracking-[0.15em] font-medium hover:border-[#00BFFF]/60 hover:text-[#00BFFF] transition-all duration-400 rounded-full"
                >
                  Schedule Visit →
                </Link>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
