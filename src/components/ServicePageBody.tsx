import { Link } from "@tanstack/react-router";
import { Reveal, SectionEyebrow } from "./Reveal";

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
    <>
      {/* Intro */}
      <section className="relative py-28 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-12 gap-12 items-start">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/5] rounded-md overflow-hidden card-shadow">
              <img
                src={image}
                alt={content.hero}
                loading="lazy"
                className="w-full h-full object-cover ken-burns"
              />
            </div>
          </Reveal>
          <div className="md:col-span-7 space-y-6">
            <Reveal>
              <p className="text-bronze text-[11px] uppercase tracking-luxe flex items-center gap-3">
                <span className="divider-bronze" /> Overview
              </p>
              <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight">
                {content.hero}
              </h2>
            </Reveal>
            {content.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-foreground/75 leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 bg-sand/60">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionEyebrow>Our Benefits</SectionEyebrow>
            <h2 className="font-display text-center text-4xl md:text-5xl mb-16">
              What you get with <em className="gradient-bronze-text not-italic">TrustOn</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {content.benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.05}>
                <div className="bg-cream p-10 h-full flex items-start gap-5 group">
                  <span className="font-serif text-3xl text-bronze">0{i + 1}</span>
                  <p className="font-serif text-xl text-ink group-hover:text-bronze transition-colors duration-500">
                    {b}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <SectionEyebrow>Why Choose Us</SectionEyebrow>
            <h2 className="font-display text-center text-4xl md:text-5xl mb-12">
              {content.whyTrustHeading}
            </h2>
          </Reveal>
          <div className="space-y-6">
            {content.whyTrustText.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-foreground/75 text-lg leading-relaxed font-serif">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-32 px-6 bg-sand/60">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionEyebrow>Our Process</SectionEyebrow>
            <h2 className="font-display text-center text-4xl md:text-5xl mb-20">
              {content.processHeading}
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {content.process.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="bg-cream p-10 h-full hover-lift">
                  <span className="font-display text-5xl gradient-bronze-text">0{i + 1}</span>
                  <h3 className="font-serif text-2xl mt-5 mb-4">{p.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="font-display text-center text-4xl md:text-5xl mb-16">
              Frequently asked <em className="gradient-bronze-text not-italic">questions</em>
            </h2>
          </Reveal>
          <div className="divide-y divide-border">
            {content.faq.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <details className="group py-7 cursor-pointer">
                  <summary className="flex items-center justify-between gap-6 list-none">
                    <span className="font-serif text-xl md:text-2xl text-ink group-hover:text-bronze transition-colors">
                      {f.q}
                    </span>
                    <span className="text-bronze text-2xl shrink-0 transition-transform duration-500 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-5 text-foreground/70 leading-relaxed pr-12">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-ink text-cream">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-bronze text-[11px] uppercase tracking-luxe mb-5">
              Contact with us for any advice
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-tight">{content.cta}</h2>
            <div className="mt-10 flex flex-wrap justify-center items-center gap-8">
              <a href="tel:+919616061166" className="font-serif text-3xl text-bronze">
                +91 96160-61166
              </a>
              <Link
                to="/contact"
                className="rounded-full bronze-border px-7 py-3 text-[11px] uppercase tracking-luxe text-bronze hover:bg-bronze hover:text-cream transition-all"
              >
                Schedule a Consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
