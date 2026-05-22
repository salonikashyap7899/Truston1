import { Link } from "@tanstack/react-router";
import { Reveal, SectionEyebrow } from "./Reveal";
import { Section3DBackground } from "./Section3DBackground";

export interface ServiceContent {
  hero: string;
  paragraphs: string[];
  benefits: string[];
  whyTrustHeading: string;
  whyTrustText: string[];
  processHeading: string;
  process: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  cta: string;
}

export function ServicePageBody({ content, image }: { content: ServiceContent; image: string }) {
  return (
    <div className="bg-background text-foreground overflow-hidden">
      {/* Intro */}
      <section className="relative py-32 px-6">
        <Section3DBackground opacity={0.1} />
        <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-16 items-start relative z-10">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-luxe border border-white/5">
              <img
                src={image}
                alt={content.hero}
                loading="lazy"
                className="w-full h-full object-cover ken-burns brightness-75 contrast-125"
              />
            </div>
          </Reveal>
          <div className="md:col-span-7 space-y-8">
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-px bg-luxe-cyan" />
                <span className="text-luxe-cyan text-xs uppercase tracking-[0.4em] font-bold">
                  Overview
                </span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl text-white leading-tight tracking-tighter">
                {content.hero}
              </h2>
            </Reveal>
            {content.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-white/50 text-xl leading-relaxed font-light">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-32 px-6 bg-ink relative">
        <Section3DBackground opacity={0.15} />
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow light>Strategic Advantages</SectionEyebrow>
            <h2 className="font-display text-center text-5xl md:text-8xl text-white mb-24 tracking-tighter leading-none">
              Yield with <em className="text-luxe-cyan italic font-serif">TrustOn</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.05}>
                <div className="glass-premium p-12 h-full flex flex-col gap-8 group rounded-[32px] border border-white/5 hover:border-luxe-cyan/30 transition-all duration-500">
                  <span className="font-display text-5xl text-luxe-cyan/20 group-hover:text-luxe-cyan transition-colors duration-500 leading-none">
                    0{i + 1}
                  </span>
                  <p className="font-display text-2xl text-white/80 group-hover:text-white transition-colors duration-500">
                    {b}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust */}
      <section className="py-32 px-6 bg-background relative">
        <div className="mx-auto max-w-5xl relative z-10">
          <Reveal>
            <SectionEyebrow>The Truston Standard</SectionEyebrow>
            <h2 className="font-display text-center text-5xl md:text-7xl text-white mb-16 tracking-tight">
              {content.whyTrustHeading}
            </h2>
          </Reveal>
          <div className="space-y-10">
            {content.whyTrustText.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-white/40 text-2xl leading-relaxed font-serif italic text-center max-w-4xl mx-auto">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-32 px-6 bg-ink relative">
        <Section3DBackground opacity={0.2} />
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow light>Operational Excellence</SectionEyebrow>
            <h2 className="font-display text-center text-5xl md:text-8xl text-white mb-24 tracking-tighter leading-none">
              {content.processHeading}
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.process.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="glass-premium p-12 h-full rounded-[32px] border border-white/5 group hover:border-luxe-cyan/40 transition-all duration-500">
                  <span className="font-display text-6xl text-white/5 group-hover:text-luxe-cyan transition-colors duration-700 leading-none">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-2xl text-white mt-10 mb-6 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-base text-white/40 leading-relaxed font-light">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 bg-background relative">
        <div className="mx-auto max-w-4xl relative z-10">
          <Reveal>
            <SectionEyebrow>Inquiry & Resolution</SectionEyebrow>
            <h2 className="font-display text-center text-5xl md:text-7xl text-white mb-20 tracking-tight">
              Global <em className="text-luxe-cyan italic font-serif">Inquiries</em>
            </h2>
          </Reveal>
          <div className="space-y-4">
            {content.faq.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <details className="group glass-premium rounded-3xl border border-white/5 px-10 py-8 cursor-none transition-all duration-300 open:border-luxe-cyan/30 open:bg-white/[0.03]">
                  <summary className="flex items-center justify-between gap-8 list-none">
                    <span className="font-display text-2xl text-white/80 group-hover:text-luxe-cyan transition-colors tracking-tight">
                      {f.q}
                    </span>
                    <span className="text-luxe-cyan text-4xl shrink-0 transition-transform duration-500 group-open:rotate-45 leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-8 text-white/40 text-lg leading-relaxed font-light pr-12">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-48 px-6 bg-ink text-white text-center relative overflow-hidden">
        <Section3DBackground opacity={0.3} />
        <div className="mx-auto max-w-5xl relative z-10">
          <Reveal>
            <p className="text-luxe-cyan text-[11px] uppercase tracking-[0.5em] mb-8 font-bold">
              Private Advisory Engagement
            </p>
            <h2 className="font-display text-4xl md:text-7xl leading-none text-white tracking-tighter mb-16">
              {content.cta}
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12">
              <a
                href="tel:+919616061166"
                className="font-display text-4xl md:text-6xl text-white hover:text-luxe-cyan transition-colors tracking-tighter"
              >
                +91 96160-61166
              </a>
              <Link to="/contact" className="btn-magnetic btn-luxe px-12 py-5">
                Secure Consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
