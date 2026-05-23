'use client';

import { motion } from 'framer-motion';
import { Reveal, SectionEyebrow } from './Reveal';
import { Section3DBackground } from './Section3DBackground';
import { Link } from '@tanstack/react-router';

/**
 * Who We Are Section - Truston Developers
 * Shaping Legacies in Lucknow
 */
export function TrustonWhoWeAreSection() {
  const pillars = [
    {
      num: '01',
      name: 'Transparent Documentation',
      desc: 'Clear title deeds, Jila Panchayat approvals, and zero hidden conditions at every stage of the transaction.',
    },
    {
      num: '02',
      name: 'High-Growth Locations',
      desc: 'Projects placed in proven growth corridors with verified infrastructure readiness and long-term appreciation potential.',
    },
    {
      num: '03',
      name: 'End-to-End Partnership',
      desc: 'From plot acquisition to construction and architectural design — one trusted team, start to finish.',
    },
  ];

  const stats = [
    { num: '120+', label: 'Total Plots' },
    { num: '47', label: 'Still Available' },
    { num: '12L+', label: 'Starting Price' },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* White Card with rounded top */}
      <div className="bg-[#F8F5EE] text-[#1A1810] rounded-t-[24px] md:rounded-t-[48px] -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          {/* Header */}
          <Reveal>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#004aad] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#004aad]" />
              Who We Are
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight mb-12 text-[#1A1810]">
              Shaping <em className="text-[#004aad] italic">Legacies</em>
              <br />
              in Lucknow
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Text Content */}
            <div>
              <Reveal delay={0.2}>
                <p className="text-base md:text-lg text-[#4A4840] leading-relaxed mb-6 font-light">
                  Truston Developers is a Lucknow-based property development company built on a single founding principle — that buying land should be simple, transparent, and deeply empowering for the buyer.
                </p>
                <p className="text-base md:text-lg text-[#4A4840] leading-relaxed mb-10 font-light">
                  We don&apos;t merely sell plots; we help you make one of the most significant decisions of your life with complete clarity, verified documentation, and a team that stands behind every commitment.
                </p>
              </Reveal>

              {/* Pillars */}
              <div className="space-y-0">
                {pillars.map((pillar, idx) => (
                  <Reveal key={pillar.num} delay={0.2 + idx * 0.1}>
                    <div className={`flex items-start gap-4 py-6 ${idx === 0 ? 'border-t' : ''} border-b border-[#1A1810]/10`}>
                      <span className="font-serif text-2xl font-light text-[#004aad] w-10 flex-shrink-0">
                        {pillar.num}
                      </span>
                      <div>
                        <h3 className="text-sm md:text-base font-medium text-[#1A1810] mb-1 tracking-wide">
                          {pillar.name}
                        </h3>
                        <p className="text-sm text-[#8A8578] leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right - Visual */}
            <Reveal delay={0.3}>
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-[#2A2720] to-[#1A1815] rounded-lg overflow-hidden relative">
                  {/* Geometric Pattern */}
                  <div 
                    className="absolute inset-0" 
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(0,74,173,0.08) 40px, rgba(0,74,173,0.08) 41px)'
                    }}
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6 bg-[#004aad] text-white px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-medium rounded">
                    Prime Estate - 2025
                  </div>

                  {/* Quote at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#080807]/80 to-transparent">
                    <p className="font-serif text-xl md:text-2xl font-light italic text-white/80 leading-relaxed">
                      &quot;We build the foundation.
                      <br />
                      You build the dream.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Stats Row */}
          <Reveal delay={0.4}>
            <div className="grid grid-cols-3 gap-px bg-[#1A1810]/10 mt-16">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-[#F8F5EE] py-8 md:py-12 text-center">
                  <p className="font-serif text-4xl md:text-6xl font-light text-[#1A1810] mb-2">
                    {stat.num.includes('+') ? (
                      <>
                        {stat.num.replace('+', '')}
                        <sup className="text-xl md:text-2xl text-[#004aad]">+</sup>
                      </>
                    ) : stat.num.includes('L') ? (
                      <>
                        {stat.num.replace('L+', '')}
                        <sup className="text-xl md:text-2xl text-[#004aad]">L+</sup>
                      </>
                    ) : (
                      stat.num
                    )}
                  </p>
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#8A8578]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Explore Website Button */}
          <Reveal delay={0.5}>
            <div className="flex justify-center mt-12">
              <Link
                to="/"
                className="inline-flex items-center gap-4 border border-[#004aad] text-[#004aad] px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#004aad] hover:text-white transition-all duration-500 rounded-full"
              >
                <span>Explore Website</span>
                <span className="text-lg">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Services Section - Four Pillars of Expertise
 */
export function TrustonServicesSection() {
  const services = [
    {
      num: '01',
      name: 'Plot Selling',
      desc: 'Residential land parcels in Lucknow\'s high-growth corridors. Jila Panchayat approvals, clear title deeds, and complete legal documentation — every plot backed by full transparency.',
      link: '/plot-selling',
      linkText: 'Explore Plots',
    },
    {
      num: '02',
      name: 'Construction',
      desc: 'Full home construction — from foundation to finishing. Quality materials, experienced teams, and complete transparency at every phase with on-time delivery guaranteed.',
      link: '/construction-build',
      linkText: 'Build With Us',
    },
    {
      num: '03',
      name: 'Investment Consultancy',
      desc: 'Expert land investment guidance for first-time buyers, NRIs, and seasoned investors. ROI assessments, location analysis, and long-term portfolio strategy crafted for Lucknow\'s real estate landscape.',
      link: '/investment-consulting',
      linkText: 'Grow Your Assets',
    },
    {
      num: '04',
      name: 'Architecture & Design',
      desc: 'In-house architectural planning tailored to your vision. Concept layouts, elevation designs, complete blueprint documentation — bringing your idea of home to life before a single brick is laid.',
      link: '/architecture-design',
      linkText: 'Design Your Space',
    },
  ];

  return (
    <section className="bg-[#F8F5EE] text-[#1A1810] relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 mb-12">
          <div>
            <Reveal>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#004aad] mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-[#004aad]" />
                What We Offer
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight text-[#1A1810]">
                Four Pillars of
                <br />
                <em className="text-[#004aad] italic">Our Expertise</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-[#6A6460] leading-relaxed font-light self-end">
              Truston Developers is your complete real estate ecosystem in Lucknow. Whether you&apos;re buying land, building a home, seeking investment guidance, or designing your dream space, we bring deep local knowledge and end-to-end capability to every engagement.
            </p>
          </Reveal>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1A1810]/10">
          {services.map((service, idx) => (
            <Reveal key={service.num} delay={idx * 0.1}>
              <motion.div
                whileHover={{ backgroundColor: '#F0ECE2' }}
                className="bg-[#F8F5EE] p-8 relative overflow-hidden group cursor-pointer h-full"
              >
                {/* Background Number */}
                <span className="absolute top-2 right-4 font-serif text-[6rem] font-light text-[#1A1810]/5 leading-none select-none pointer-events-none">
                  {service.num}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 mb-6 text-[#004aad]">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
                    {service.num === '01' && (
                      <>
                        <rect x="6" y="20" width="36" height="22" rx="1"/>
                        <polyline points="2,22 24,6 46,22"/>
                        <rect x="18" y="30" width="12" height="12"/>
                      </>
                    )}
                    {service.num === '02' && (
                      <>
                        <rect x="8" y="12" width="32" height="30" rx="1"/>
                        <line x1="8" y1="20" x2="40" y2="20"/>
                        <line x1="20" y1="20" x2="20" y2="42"/>
                        <rect x="24" y="28" width="10" height="14"/>
                        <polyline points="14,8 24,2 34,8"/>
                      </>
                    )}
                    {service.num === '03' && (
                      <>
                        <circle cx="24" cy="24" r="18"/>
                        <polyline points="24,8 24,24 32,32"/>
                        <line x1="6" y1="24" x2="10" y2="24"/>
                        <line x1="38" y1="24" x2="42" y2="24"/>
                        <line x1="24" y1="6" x2="24" y2="10"/>
                      </>
                    )}
                    {service.num === '04' && (
                      <>
                        <rect x="6" y="6" width="36" height="36" rx="1"/>
                        <line x1="6" y1="16" x2="42" y2="16"/>
                        <line x1="20" y1="16" x2="20" y2="42"/>
                        <line x1="6" y1="28" x2="20" y2="28"/>
                        <line x1="32" y1="22" x2="38" y2="28"/>
                        <line x1="26" y1="28" x2="38" y2="28"/>
                      </>
                    )}
                  </svg>
                </div>

                <h3 className="text-base font-medium text-[#1A1810] mb-3 tracking-wide">
                  {service.name}
                </h3>
                <p className="text-sm text-[#8A8578] leading-relaxed mb-6">
                  {service.desc}
                </p>
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#004aad] font-medium group-hover:gap-4 transition-all duration-300"
                >
                  {service.linkText} <span>→</span>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Why Truston Section - 5 Reasons
 */
export function TrustonWhySection() {
  const reasons = [
    {
      num: '01',
      title: 'Complete Transparency, Always',
      text: 'Zero ambiguity in every transaction. Plot details, legal status, and pricing disclosed fully upfront — no fine print, no surprises. What you see is exactly what you get.',
    },
    {
      num: '02',
      title: 'High-Growth Location Intelligence',
      text: 'Dubagga and surrounding corridors in Lucknow are on a proven appreciation trajectory. We identify and secure high-potential land before the curve, passing that advantage directly to buyers.',
    },
    {
      num: '03',
      title: 'Government-Approved, Legally Secure',
      text: 'Every project carries Jila Panchayat approvals and verified title deeds — ensuring your investment is legally clean, compliant, and protected for generations.',
    },
    {
      num: '04',
      title: 'One Team, Every Step',
      text: 'Plot acquisition, construction, architecture, investment advisory — all under one roof. No juggling between agencies, no coordination headaches. One trusted partner from search to handover.',
    },
    {
      num: '05',
      title: 'Your Land, Your Terms',
      text: 'Build now or hold for appreciation — both are valid strategies and we support both with equal commitment. No pressure, no gimmicks. Just sound advice aligned with your goals.',
    },
  ];

  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-background">
      <Section3DBackground opacity={0.15} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <Reveal>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-luxe-cyan mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-luxe-cyan" />
            The Truston Difference
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight text-white mb-16">
            Why Buyers Choose
            <br />
            <em className="text-luxe-cyan italic">Truston</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20">
          {/* Left - Sticky Quote */}
          <Reveal delay={0.2}>
            <div className="lg:sticky lg:top-24 self-start">
              <span className="font-serif text-[10rem] font-light leading-none text-white/5 block -mb-10">
                5
              </span>
              <p className="font-serif text-xl md:text-2xl font-light italic text-white/50 leading-relaxed">
                Reasons to make Truston your real estate partner
              </p>
              <div className="w-10 h-px bg-white/20 my-6" />
              <p className="text-xs text-white/30 tracking-wide uppercase">
                Lucknow - Uttar Pradesh - Since 2025
              </p>
            </div>
          </Reveal>

          {/* Right - Reasons */}
          <div>
            {reasons.map((reason, idx) => (
              <Reveal key={reason.num} delay={0.1 + idx * 0.1}>
                <motion.div
                  whileHover={{ paddingLeft: '1rem' }}
                  className={`py-8 ${idx === 0 ? 'border-t' : ''} border-b border-white/5 grid grid-cols-[3rem_1fr] gap-6 cursor-default transition-all duration-300`}
                >
                  <span className="text-xs text-luxe-cyan tracking-wide font-light">
                    {reason.num}
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-white mb-2 tracking-wide">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed font-light">
                      {reason.text}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * CTA Strip Section - White Background
 */
export function TrustonCTAStrip() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-[#F8F5EE] text-[#1A1810]">
      {/* Background Text */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[8rem] md:text-[18rem] font-light text-[#1A1810]/5 whitespace-nowrap pointer-events-none select-none leading-none">
        TRUSTON
      </span>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Reveal>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#004aad] mb-6">
            47 Plots Still Available - Prime Estate - Dubagga
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-serif text-4xl md:text-7xl font-light leading-tight text-[#1A1810] mb-6">
            Ready to Claim
            <br />
            Your <em className="text-[#004aad] italic">Plot?</em>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-base md:text-lg text-[#6A6460] max-w-lg mx-auto mb-10 font-light leading-relaxed">
            Prices starting at ₹12 Lakhs. Talk to our team today — no obligations, just complete clarity about your investment.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/contact"
              className="bg-[#1A1810] text-white px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-transparent hover:text-[#1A1810] border border-transparent hover:border-[#1A1810] transition-all duration-500 rounded-full"
            >
              Book Free Consultation
            </Link>
            <a
              href="tel:+919616061166"
              className="font-serif text-2xl md:text-3xl text-[#1A1810] hover:text-[#004aad] transition-colors duration-300 flex items-center gap-3"
            >
              <span className="w-px h-8 bg-[#1A1810]/20 hidden sm:block" />
              +91 96160-61166
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
