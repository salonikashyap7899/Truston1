import { Reveal, SectionEyebrow } from "./Reveal";

const items = [
  {
    quote:
      "We not only bought our plot from Prime Estate, but also got our home designed by their architecture team. The designs were exactly what we imagined — beautiful and within budget.",
    name: "Anil Singh",
    role: "Homeowner",
  },
  {
    quote:
      "As a channel partner, I have referred over 20 clients to Prime Estate. The team is responsive, the commission structure is fair, and the product is genuinely good.",
    name: "Mohammed Irfan",
    role: "Channel Partner",
  },
  {
    quote:
      "I was skeptical about buying a plot but Prime Estate's team walked me through every document. The land is approved, the location is growing, and the process was completely transparent.",
    name: "Ramesh Verma",
    role: "Plot Owner, Phase 1",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32 px-6">
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>Hear from customers</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-center mb-4 max-w-4xl mx-auto">
            What others say about <em className="gradient-bronze-text not-italic">partnering with us</em>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-px bg-border mt-20">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="bg-cream p-10 h-full hover-lift relative">
                <span className="absolute top-4 left-8 font-display text-7xl text-bronze/40 leading-none">
                  &ldquo;
                </span>
                <blockquote className="font-serif italic text-lg text-ink leading-relaxed mt-8">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 pt-6 border-t border-border">
                  <p className="text-bronze font-medium">{t.name}</p>
                  <p className="text-[11px] uppercase tracking-luxe text-foreground/55 mt-1">
                    {t.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
