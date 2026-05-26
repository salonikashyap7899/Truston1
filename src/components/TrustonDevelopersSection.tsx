'use client';

import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import { Section3DBackground } from './Section3DBackground';
import { Link } from '@tanstack/react-router';
import { SwipeReveal } from './TextReveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    { num: '120', sup: '+', label: 'Total Plots' },
    { num: '47', sup: '', label: 'Still Available' },
    { num: '₹12', sup: 'L+', label: 'Starting Price' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#060c16]">
      <Section3DBackground opacity={0.12} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10">
        <Reveal>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#00BFFF] mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-[#00BFFF]" />
            Who We Are
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight mb-12 text-white">
            Shaping <em className="text-[#00BFFF] italic">Legacies</em>
            <br />
            in Lucknow
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <Reveal delay={0.2}>
              <p className="text-base md:text-lg text-white/65 leading-relaxed mb-6 font-light">
                Truston Developers is a Lucknow-based property development company built on a single founding principle — that buying land should be simple, transparent, and deeply empowering for the buyer.
              </p>
              <p className="text-base md:text-lg text-white/65 leading-relaxed mb-10 font-light">
                We don&apos;t merely sell plots; we help you make one of the most significant decisions of your life with complete clarity, verified documentation, and a team that stands behind every commitment.
              </p>
            </Reveal>

            <div className="space-y-0">
              {pillars.map((pillar, idx) => (
                <Reveal key={pillar.num} delay={0.2 + idx * 0.1}>
                  <div className={`flex items-start gap-4 py-6 ${idx === 0 ? 'border-t' : ''} border-b border-white/10`}>
                    <span className="font-serif text-2xl font-light text-[#00BFFF] w-10 flex-shrink-0">
                      {pillar.num}
                    </span>
                    <div>
                      <h3 className="text-sm md:text-base font-medium text-white mb-1 tracking-wide">
                        {pillar.name}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.3}>
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-[#0d1e30] to-[#070d18] rounded-lg overflow-hidden relative border border-white/5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(0,191,255,0.04) 40px, rgba(0,191,255,0.04) 41px)'
                  }}
                />
                <div className="absolute top-6 left-6 bg-[#004aad] text-white px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-medium rounded">
                  Prime Estate · 2025
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#070d18]/90 to-transparent">
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

        <Reveal delay={0.4}>
          <div className="grid grid-cols-3 gap-px bg-white/5 mt-16">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#060c16] py-8 md:py-12 text-center">
                <p className="font-serif text-4xl md:text-6xl font-light text-white mb-2">
                  {stat.num}
                  {stat.sup && <sup className="text-xl md:text-2xl text-[#00BFFF]">{stat.sup}</sup>}
                </p>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function TrustonServicesSection() {
  const services = [
    {
      num: '01',
      name: 'Plot Selling',
      desc: "Residential land parcels in Lucknow's high-growth corridors. Jila Panchayat approvals, clear title deeds, and complete legal documentation — every plot backed by full transparency.",
      linkText: 'Explore Plots',
      img: '/assets/photo_2.jpg',
    },
    {
      num: '02',
      name: 'Construction',
      desc: 'Full home construction — from foundation to finishing. Quality materials, experienced teams, and complete transparency at every phase with on-time delivery guaranteed.',
      linkText: 'Build With Us',
      img: '/assets/photo_5.jpg',
    },
    {
      num: '03',
      name: 'Investment Consultancy',
      desc: "Expert land investment guidance for first-time buyers, NRIs, and seasoned investors. ROI assessments, location analysis, and long-term portfolio strategy crafted for Lucknow's real estate landscape.",
      linkText: 'Grow Your Assets',
      img: '/assets/photo_9.jpg',
    },
    {
      num: '04',
      name: 'Architecture & Design',
      desc: 'In-house architectural planning tailored to your vision. Concept layouts, elevation designs, complete blueprint documentation — bringing your idea of home to life before a single brick is laid.',
      linkText: 'Design Your Space',
      img: '/assets/photo_6.jpg',
    },
  ];

  return (
    <section className="bg-[#050b14] text-white relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 mb-12">
          <div>
            <Reveal>
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#00BFFF] mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-[#00BFFF]" />
                What We Offer
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight text-white">
                Four Pillars of
                <br />
                <em className="text-[#00BFFF] italic">Our Expertise</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-white/55 leading-relaxed font-light self-end">
              Truston Developers is your complete real estate ecosystem in Lucknow. Whether you&apos;re buying land, building a home, seeking investment guidance, or designing your dream space, we bring deep local knowledge and end-to-end capability to every engagement.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {services.map((service, idx) => (
            <Reveal key={service.num} delay={idx * 0.1}>
              <div className="bg-[#050b14] relative overflow-hidden group cursor-pointer h-full hover:bg-[#0a1628] transition-colors duration-300 border border-transparent hover:border-[#00BFFF]/20 flex flex-col">
                {/* Image thumbnail */}
                <div className="relative h-48 overflow-hidden shrink-0">
                  <img
                    src={service.img}
                    alt={service.name}
                    className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050b14]" />
                  <span className="absolute top-3 right-4 font-serif text-[3rem] font-light text-white/10 leading-none select-none pointer-events-none">
                    {service.num}
                  </span>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-base font-medium text-white mb-3 tracking-wide group-hover:text-[#00BFFF] transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-6 flex-1">
                    {service.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#00BFFF] font-medium group-hover:gap-4 transition-all duration-300">
                    {service.linkText} <span>→</span>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-[#060c16]">
      <Section3DBackground opacity={0.15} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-4">
          <SwipeReveal delay={0.1}>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#00BFFF] flex items-center gap-3">
              <span className="w-8 h-px bg-[#00BFFF]" />
              The Truston Difference
            </p>
          </SwipeReveal>
        </div>

        <div className="mb-16">
          <SwipeReveal delay={0.3}>
            <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight text-white">
              Why Buyers Choose
              <br />
              <em className="text-[#00BFFF] italic">Truston</em>
            </h2>
          </SwipeReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20">
          <Reveal delay={0.2}>
            <div className="lg:sticky lg:top-24 self-start">
              <span className="font-serif text-[10rem] font-light leading-none text-white/5 block -mb-10">
                5
              </span>
              <p className="font-serif text-xl md:text-2xl font-light italic text-white/60 leading-relaxed">
                Reasons to make Truston your real estate partner
              </p>
              <div className="w-10 h-px bg-[#00BFFF]/40 my-6" />
              <p className="text-xs text-white/30 tracking-wide uppercase">
                Lucknow · Uttar Pradesh · Since 2025
              </p>
            </div>
          </Reveal>

          <div className="w-full">
            <Accordion type="single" collapsible className="w-full">
              {reasons.map((reason, idx) => (
                <Reveal key={reason.num} delay={0.1 + idx * 0.1}>
                  <AccordionItem value={`item-${idx}`} className="border-white/10 group">
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center gap-6 text-left">
                        <span className="text-xs text-[#00BFFF] tracking-wide font-light shrink-0">
                          {reason.num}
                        </span>
                        <h3 className="text-base md:text-lg font-medium text-white tracking-wide group-data-[state=open]:text-[#00BFFF] transition-colors duration-300">
                          {reason.title}
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-white/55 leading-relaxed font-light pb-8 pl-[calc(1.5rem+3rem)]">
                      {reason.text}
                    </AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustonCTAStrip() {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-[#050b14] border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,74,173,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[8rem] md:text-[18rem] font-light text-white/[0.025] whitespace-nowrap pointer-events-none select-none leading-none">
        TRUSTON
      </span>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Reveal>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#00BFFF] mb-6">
            47 Plots Still Available · Prime Estate · Dubagga
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-serif text-4xl md:text-7xl font-light leading-tight text-white mb-6">
            Ready to Claim
            <br />
            Your <em className="text-[#00BFFF] italic">Plot?</em>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-base md:text-lg text-white/55 max-w-lg mx-auto mb-10 font-light leading-relaxed">
            Prices starting at ₹12 Lakhs. Talk to our team today — no obligations, just complete clarity about your investment.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/contact"
              className="bg-[#00BFFF] text-[#060c16] px-10 py-4 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-all duration-500 rounded-full"
            >
              Book Free Consultation
            </Link>
            <a
              href="tel:+919616061166"
              className="font-serif text-2xl md:text-3xl text-white/70 hover:text-[#00BFFF] transition-colors duration-300 flex items-center gap-3"
            >
              <span className="w-px h-8 bg-white/10 hidden sm:block" />
              +91 96160-61166
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
