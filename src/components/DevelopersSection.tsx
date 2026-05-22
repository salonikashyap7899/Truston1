import { useRef } from "react";
import { useInView } from "framer-motion";
import { Section3DBackground } from "./Section3DBackground";

/**
 * DevelopersSection Component
 * Integrates content from truston-developers-v2.html
 * Includes: Marquee, About, Project, Services, Why, CTA, Contact sections
 */

export function DevelopersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <div ref={ref} className="bg-background text-foreground relative">
      <Section3DBackground opacity={0.1} />

      {/* ═══════════════════════════════════════
          MARQUEE
      ═══════════════════════════════════════ */}
      <div className="border-y border-white/5 bg-ink/50 backdrop-blur-md py-6 overflow-hidden relative z-10">
        <div className="flex whitespace-nowrap marquee gap-20">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-20 shrink-0">
              {[
                "Prime Estate · Lucknow",
                "Jila Panchayat Approved",
                "Residential Plot Colony",
                "Clear Title Deeds",
                "Dubagga Growth Corridor",
                "Plot Selling · Construction · Architecture",
                "Investment Consultancy",
                "Wide Internal Roads",
              ].map((item, i) => (
                <span
                  key={`${k}-${i}`}
                  className="font-serif text-lg italic text-white/40 hover:text-luxe-cyan transition-colors duration-500 cursor-default"
                >
                  {item} <span className="text-luxe-cyan mx-6 not-italic text-sm">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          PROJECT — PRIME ESTATE
      ═══════════════════════════════════════ */}
      <section className="bg-ink px-6 md:px-12 py-24 md:py-32 relative overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="mb-16">
            <p className="text-[10px] tracking-[0.5em] uppercase text-luxe-cyan mb-6 flex items-center gap-4 font-bold">
              <span className="w-10 h-px bg-luxe-cyan"></span>
              Flagship Development
            </p>
            <h2 className="font-display text-5xl md:text-7xl text-white leading-tight tracking-tighter">
              Prime <em className="italic text-luxe-cyan font-serif">Estate</em>
            </h2>
            <p className="text-white/40 mt-8 max-w-2xl text-lg font-light leading-relaxed">
              A masterfully planned residential plot colony at Dubagga, Lucknow — designed for those
              who want the freedom to build on their own terms, in a location primed for significant
              growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 glass-premium rounded-[40px] overflow-hidden border border-white/5 shadow-luxe">
            {/* Left: Visual */}
            <div className="relative h-96 md:h-auto bg-gradient-to-br from-luxe-blue/20 to-luxe-cyan/5 flex items-center justify-center p-12">
              <div className="text-center group">
                <p className="font-display text-7xl font-bold text-white/10 group-hover:text-white/20 transition-colors duration-700">
                  Prime
                </p>
                <p className="font-serif text-5xl italic text-luxe-cyan/30 mt-2">Estate</p>
                <div className="w-20 h-px bg-luxe-cyan/20 mx-auto my-10" />
                <p className="text-[10px] text-luxe-cyan/40 tracking-[0.4em] uppercase font-bold">
                  Dubagga, Lucknow · India
                </p>
                <p className="text-[10px] text-white/20 mt-4 uppercase tracking-widest">
                  January 2025 Release
                </p>
              </div>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Right: Info */}
            <div className="p-10 md:p-16 flex flex-col justify-between">
              <div>
                {/* Numbers Grid */}
                <div className="grid grid-cols-2 gap-px bg-white/5 mb-12 rounded-2xl overflow-hidden border border-white/5">
                  {[
                    { val: "120+", label: "Total Plots" },
                    { val: "47", label: "Available" },
                    { val: "2,400", label: "Sq. Ft Range" },
                    { val: "₹12L+", label: "Starting" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-ink/50 p-6 hover:bg-white/5 transition-colors"
                    >
                      <p className="font-display text-3xl text-white tracking-tighter">
                        {item.val}
                      </p>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 mt-3 font-bold">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Amenities */}
                <div className="mb-12">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-luxe-cyan mb-8 font-bold">
                    Elite Amenities
                  </p>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    {[
                      "Wide Internal Roads",
                      "24/7 Security Guard",
                      "Piped Water Supply",
                      "Electricity Connection",
                      "Landscaped Parks",
                      "Underground Drainage",
                      "Clear Plot Demarcation",
                      "Phased Infrastructure",
                    ].map((amenity) => (
                      <p
                        key={amenity}
                        className="text-xs text-white/50 flex items-center gap-3 font-light hover:text-white transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-luxe-cyan/40" />
                        {amenity}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Approval */}
                <div className="glass-premium border border-luxe-cyan/10 p-8 mb-10 rounded-2xl">
                  <p className="text-sm text-white/60 leading-relaxed font-light">
                    All plots are{" "}
                    <span className="text-luxe-cyan font-bold">Jila Panchayat Approved</span> with
                    clear title deeds. Structured layout planning, transparent pricing, and full
                    legal documentation provided at every stage.
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-magnetic btn-luxe flex-1 py-4">Enquire Now</button>
                <button className="flex-1 border border-white/10 text-white/50 px-8 py-4 text-[11px] uppercase tracking-widest font-bold hover:border-luxe-cyan hover:text-luxe-cyan transition-all duration-500 rounded-full">
                  Schedule Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SERVICES — BLUE THEME
      ═══════════════════════════════════════ */}
      <section className="bg-ink px-6 md:px-12 py-0">
        <div className="mx-auto max-w-7xl glass-premium rounded-t-[60px] px-8 md:px-20 py-24 md:py-32 border-x border-t border-white/5 shadow-luxe">
          <div className="mb-20">
            <p className="text-[10px] tracking-[0.5em] uppercase text-luxe-cyan mb-6 flex items-center gap-4 font-bold">
              <span className="w-10 h-px bg-luxe-cyan"></span>
              Core Services
            </p>
            <h2 className="font-display text-5xl md:text-7xl text-white leading-tight tracking-tighter">
              Architecture of
              <br />
              <em className="italic text-luxe-cyan font-serif">Excellence</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden mb-12">
            {[
              {
                num: "01",
                name: "Plot Selling",
                desc: "Residential land parcels in Lucknow's high-growth corridors. Jila Panchayat approvals and complete legal documentation.",
                link: "Explore Plots",
              },
              {
                num: "02",
                name: "Construction",
                desc: "Full home construction — from foundation to finishing. Quality materials and complete transparency at every phase.",
                link: "Build Legacy",
              },
              {
                num: "03",
                name: "Investment",
                desc: "Expert land investment guidance for elite buyers. ROI assessments and location intelligence analysis.",
                link: "Grow Wealth",
              },
              {
                num: "04",
                name: "Architecture",
                desc: "In-house architectural planning tailored to your vision. Concept layouts and blueprint documentation.",
                link: "Design Vision",
              },
            ].map((service) => (
              <div
                key={service.num}
                className="bg-ink/30 p-10 hover:bg-white/[0.04] transition-all duration-500 group flex flex-col justify-between min-h-[350px]"
              >
                <div>
                  <p className="text-6xl text-white/5 font-display mb-6 group-hover:text-luxe-cyan/10 transition-colors">
                    {service.num}
                  </p>
                  <p className="font-display text-2xl text-white mb-4 group-hover:text-luxe-cyan transition-colors">
                    {service.name}
                  </p>
                  <p className="text-sm text-white/40 leading-relaxed font-light mb-8">
                    {service.desc}
                  </p>
                </div>
                <button className="text-luxe-cyan text-[10px] uppercase tracking-[0.3em] font-bold hover:gap-4 flex items-center gap-2 transition-all">
                  {service.link} <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY TRUSTON — PURE BLUE LUXURY
      ═══════════════════════════════════════ */}
      <section className="bg-ink px-6 md:px-12 py-24 md:py-32 relative overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="mb-20">
            <p className="text-[10px] tracking-[0.5em] uppercase text-luxe-cyan mb-6 flex items-center gap-4 font-bold">
              <span className="w-10 h-px bg-luxe-cyan"></span>
              The Truston Ethos
            </p>
            <h2 className="font-display text-5xl md:text-7xl text-white leading-tight tracking-tighter">
              Why Elite Investors
              <br />
              <em className="italic text-luxe-cyan font-serif">Choose Us</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-20">
            {/* Left */}
            <div className="relative group">
              <p className="font-display text-[15rem] font-bold text-white/5 leading-none tracking-tighter group-hover:text-luxe-blue/10 transition-colors duration-1000">
                5
              </p>
              <div className="absolute top-1/2 left-0 -translate-y-1/2">
                <p className="font-serif text-3xl italic text-white/60 leading-relaxed max-w-md">
                  "The five pillars that define our multi-billion dollar commitment to excellence."
                </p>
                <div className="w-20 h-px bg-luxe-cyan/30 mt-10" />
                <p className="text-[10px] text-luxe-cyan/40 mt-6 tracking-[0.4em] uppercase font-bold">
                  Established Lucknow · 2024
                </p>
              </div>
            </div>

            {/* Right: Points */}
            <div className="space-y-10">
              {[
                {
                  num: "01",
                  title: "Absolute Transparency",
                  text: "Zero ambiguity in every transaction. Plot details, legal status, and pricing disclosed fully upfront — no fine print, no surprises.",
                },
                {
                  num: "02",
                  title: "Strategic Intelligence",
                  text: "Dubagga and surrounding corridors in Lucknow are on a proven appreciation trajectory. We secure high-potential land before the curve.",
                },
                {
                  num: "03",
                  title: "Verified Legality",
                  text: "Every project carries Jila Panchayat approvals and verified title deeds — ensuring your investment is legally clean and protected.",
                },
                {
                  num: "04",
                  title: "Architectural Mastery",
                  text: "Plot acquisition, construction, architecture, investment advisory — all under one roof. No juggling between agencies.",
                },
                {
                  num: "05",
                  title: "Legacy Preservation",
                  text: "Build now or hold for appreciation — both are valid strategies and we support both with equal commitment. No pressure, no gimmicks.",
                },
              ].map((point) => (
                <div
                  key={point.num}
                  className="flex gap-8 pb-10 border-b border-white/5 last:border-0 group"
                >
                  <p className="text-[11px] tracking-[0.3em] text-luxe-cyan font-bold flex-shrink-0 mt-1">
                    {point.num}
                  </p>
                  <div>
                    <p className="font-display text-2xl text-white mb-4 group-hover:text-luxe-cyan transition-colors duration-300">
                      {point.title}
                    </p>
                    <p className="text-base text-white/40 leading-relaxed font-light">
                      {point.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA STRIP — LUXURY BLUE
      ═══════════════════════════════════════ */}
      <section className="bg-background px-6 md:px-12 py-32 md:py-48 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luxe-cyan rounded-full blur-[180px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-[11px] tracking-[0.5em] uppercase text-luxe-cyan mb-8 font-bold">
            Limited Engagement · Dubagga Prime Estate
          </p>
          <h2 className="font-display text-5xl md:text-8xl text-white leading-none tracking-tighter mb-10">
            Ready to Claim
            <br />
            Your <em className="italic text-luxe-cyan font-serif">Empire?</em>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto mb-16 text-lg font-light leading-relaxed">
            Premium plots from ₹12 Lakhs. Connect with our advisors today for a private portfolio
            presentation.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <button className="btn-magnetic btn-luxe px-12 py-5">Request Private Viewing</button>
            <a
              href="tel:+919616061166"
              className="font-display text-3xl text-white hover:text-luxe-cyan transition-colors tracking-tight"
            >
              +91 96160-61166
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
