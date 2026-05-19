import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * DevelopersSection Component
 * Integrates content from truston-developers-v2.html
 * Includes: Marquee, About, Project, Services, Why, CTA, Contact sections
 */

export function DevelopersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <div ref={ref} className="bg-background text-foreground">
      {/* ═══════════════════════════════════════
          MARQUEE
      ═══════════════════════════════════════ */}
      <div className="border-y border-white/10 bg-[var(--ink)] py-4 overflow-hidden">
        <div className="flex whitespace-nowrap marquee gap-16">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-16 shrink-0">
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
                  className="font-serif text-sm italic text-white/40 hover:text-white/70 transition-colors duration-500 cursor-default"
                >
                  {item} <span className="text-[var(--bronze)] mx-5 not-italic text-xs">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>



      {/* ═══════════════════════════════════════
          PROJECT — PRIME ESTATE
      ═══════════════════════════════════════ */}
      <section className="bg-[var(--ink)] px-6 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-xs tracking-widest uppercase text-[var(--bronze)] mb-4 flex items-center gap-2">
              <span className="w-7 h-px bg-[var(--bronze)]"></span>
              Flagship Project
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight">
              Prime <em className="italic text-[var(--bronze)]">Estate</em>
            </h2>
            <p className="text-white/60 mt-4 max-w-2xl text-sm">
              A masterfully planned residential plot colony at Dubagga, Lucknow — designed for those who want the freedom to build on their own terms, in a location primed for significant growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 bg-[#161613] rounded-lg overflow-hidden">
            {/* Left: Visual */}
            <div className="relative h-96 md:h-full bg-gradient-to-br from-[var(--bronze)]/20 to-[var(--bronze)]/5 flex items-center justify-center">
              <div className="text-center">
                <p className="font-serif text-5xl font-light text-white/20">Prime</p>
                <p className="font-serif text-3xl italic text-[var(--bronze)]/40 mt-2">Estate</p>
                <p className="text-xs text-white/30 mt-6 tracking-widest uppercase">
                  Dubagga, Lucknow · Uttar Pradesh
                </p>
                <p className="text-xs text-white/20 mt-2">Launched · January 5, 2025</p>
              </div>
            </div>

            {/* Right: Info */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                {/* Numbers Grid */}
                <div className="grid grid-cols-2 gap-px bg-white/5 mb-8">
                  {[
                    { val: "120+", label: "Total Plots" },
                    { val: "47", label: "Available Now" },
                    { val: "2,400", label: "Sq. Ft Range" },
                    { val: "₹12L+", label: "Starting Price" },
                  ].map((item) => (
                    <div key={item.label} className="bg-[#0F0F0D] p-4">
                      <p className="font-serif text-2xl font-light text-white">{item.val}</p>
                      <p className="text-xs uppercase tracking-widest text-white/40 mt-2">{item.label}</p>
                    </div>
                  ))}
                </div>

                {/* Amenities */}
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-widest text-[var(--bronze)] mb-4">Premium Amenities</p>
                  <div className="grid grid-cols-2 gap-3">
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
                      <p key={amenity} className="text-xs text-white/60 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--bronze)]/60"></span>
                        {amenity}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Approval */}
                <div className="bg-white/5 border border-[var(--bronze)]/15 p-4 mb-6 rounded">
                  <p className="text-xs text-white/70 leading-relaxed">
                    All plots are <span className="text-[var(--bronze)] font-semibold">Jila Panchayat Approved</span> with clear title deeds. Structured layout planning, transparent pricing, and full legal documentation provided at every stage.
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-3">
                <button className="bg-[var(--bronze)] text-[var(--ink)] px-6 py-2 text-xs uppercase tracking-widest font-semibold hover:bg-[#D4B97A] transition-colors rounded">
                  Enquire Now
                </button>
                <button className="border border-white/20 text-white/70 px-6 py-2 text-xs uppercase tracking-widest font-light hover:border-[var(--bronze)] hover:text-[var(--bronze)] transition-colors rounded">
                  Schedule Visit →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SERVICES — WHITE CARD
      ═══════════════════════════════════════ */}
      <section className="bg-[var(--ink)] px-6 md:px-12 py-0">
        <div className="mx-auto max-w-7xl bg-white text-[var(--ink)] rounded-t-3xl px-6 md:px-12 py-16 md:py-20">
          <div className="mb-12">
            <p className="text-xs tracking-widest uppercase text-[#8A7A55] mb-4 flex items-center gap-2">
              <span className="w-7 h-px bg-[#8A7A55]"></span>
              What We Offer
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight">
              Four Pillars of<br />
              <em className="italic text-[var(--bronze)]">Our Expertise</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-px bg-gray-200 mb-8">
            {[
              {
                num: "01",
                name: "Plot Selling",
                desc: "Residential land parcels in Lucknow's high-growth corridors. Jila Panchayat approvals, clear title deeds, and complete legal documentation.",
                link: "Explore Plots →",
              },
              {
                num: "02",
                name: "Construction",
                desc: "Full home construction — from foundation to finishing. Quality materials, experienced teams, and complete transparency at every phase.",
                link: "Build With Us →",
              },
              {
                num: "03",
                name: "Investment Consultancy",
                desc: "Expert land investment guidance for first-time buyers, NRIs, and seasoned investors. ROI assessments and location analysis.",
                link: "Grow Your Assets →",
              },
              {
                num: "04",
                name: "Architecture & Design",
                desc: "In-house architectural planning tailored to your vision. Concept layouts, elevation designs, complete blueprint documentation.",
                link: "Design Your Space →",
              },
            ].map((service) => (
              <div key={service.num} className="bg-white p-6 hover:bg-gray-50 transition-colors">
                <p className="text-5xl text-gray-100 font-light mb-4">{service.num}</p>
                <p className="font-semibold text-gray-800 mb-3">{service.name}</p>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">{service.desc}</p>
                <a href="#contact" className="text-[var(--bronze)] text-xs uppercase tracking-widest font-semibold hover:gap-2 flex items-center gap-1 transition-all">
                  {service.link}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY TRUSTON — DARK
      ═══════════════════════════════════════ */}
      <section className="bg-[#0F0F0D] px-6 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-xs tracking-widest uppercase text-[var(--bronze)] mb-4 flex items-center gap-2">
              <span className="w-7 h-px bg-[var(--bronze)]"></span>
              The Truston Difference
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight">
              Why Buyers Choose<br />
              <em className="italic text-[var(--bronze)]">Truston</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Left */}
            <div>
              <p className="font-serif text-9xl font-light text-white/5 leading-none">5</p>
              <p className="font-serif text-lg italic text-white/40 mt-4 leading-relaxed">
                "Five reasons why Lucknow's smartest investors trust us with their most important decisions."
              </p>
              <p className="text-xs text-white/30 mt-6 tracking-widest uppercase">
                Lucknow · Uttar Pradesh · Since 2025
              </p>
            </div>

            {/* Right: Points */}
            <div className="space-y-6">
              {[
                {
                  num: "01",
                  title: "Complete Transparency, Always",
                  text: "Zero ambiguity in every transaction. Plot details, legal status, and pricing disclosed fully upfront — no fine print, no surprises.",
                },
                {
                  num: "02",
                  title: "High-Growth Location Intelligence",
                  text: "Dubagga and surrounding corridors in Lucknow are on a proven appreciation trajectory. We identify and secure high-potential land before the curve.",
                },
                {
                  num: "03",
                  title: "Government-Approved, Legally Secure",
                  text: "Every project carries Jila Panchayat approvals and verified title deeds — ensuring your investment is legally clean and protected.",
                },
                {
                  num: "04",
                  title: "One Team, Every Step",
                  text: "Plot acquisition, construction, architecture, investment advisory — all under one roof. No juggling between agencies.",
                },
                {
                  num: "05",
                  title: "Your Land, Your Terms",
                  text: "Build now or hold for appreciation — both are valid strategies and we support both with equal commitment. No pressure, no gimmicks.",
                },
              ].map((point) => (
                <div key={point.num} className="flex gap-4 pb-6 border-b border-white/5 last:border-0">
                  <p className="text-xs tracking-widest text-[var(--bronze)] font-light flex-shrink-0 mt-1">
                    {point.num}
                  </p>
                  <div>
                    <p className="font-semibold text-white text-sm mb-2">{point.title}</p>
                    <p className="text-xs text-white/50 leading-relaxed">{point.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA STRIP — WHITE
      ═══════════════════════════════════════ */}
      <section className="bg-white text-[var(--ink)] px-6 md:px-12 py-16 md:py-24 text-center relative overflow-hidden">
        <p className="text-xs tracking-widest uppercase text-[var(--bronze)] mb-4">
          47 Plots Still Available · Prime Estate · Dubagga
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight mb-4">
          Ready to Claim<br />
          Your <em className="italic text-[var(--bronze)]">Plot?</em>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-sm">
          Prices starting at ₹12 Lakhs. Talk to our team today — no obligations, just complete clarity about your investment.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="bg-[var(--ink)] text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-gray-800 transition-colors rounded">
            Book Free Consultation
          </button>
          <a
            href="tel:+919616061166"
            className="font-serif text-2xl font-light text-[var(--ink)] hover:text-[var(--bronze)] transition-colors"
          >
            +91 96160-61166
          </a>
        </div>
      </section>

    </div>
  );
}
