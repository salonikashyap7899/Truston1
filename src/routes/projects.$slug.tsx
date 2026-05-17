import { createFileRoute, Link } from "@tanstack/react-router";
import { InnerHero } from "@/components/InnerHero";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import projectImg from "@/assets/project-prime.jpg";

export const Route = createFileRoute("/projects/$slug")({
  head: () => ({
    meta: [
      { title: "Prime Estate — Lucknow, Uttar Pradesh | TrustOn" },
      { name: "description", content: "Prime Estate — a Jila Panchayat approved residential plots colony in Lucknow with structured planning, wide internal roads, and clear documentation." },
      { property: "og:title", content: "Prime Estate — Lucknow" },
      { property: "og:image", content: projectImg },
    ],
  }),
  component: Page,
});

const amenities = [
  "Wide Internal Roads", "24/7 Security Guard", "Piped Water Supply",
  "Electricity Connection", "Landscaped Parks", "Underground Drainage",
];

function Page() {
  return (
    <>
      <InnerHero
        eyebrow="Residential · Lucknow"
        title={<>Prime <em className="gradient-bronze-text not-italic font-serif italic">Estate.</em></>}
        subtitle="Premium amenities, crafted for modern living. A Jila Panchayat approved township with structured planning, proper road connectivity, and essential infrastructure."
        poster={projectImg}
        alt="Prime Estate Lucknow"
      />

      <section className="py-28 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-start">
          <Reveal>
            <p className="text-bronze text-[11px] uppercase tracking-luxe mb-4 flex items-center gap-3">
              <span className="divider-bronze" /> About the Project
            </p>
            <h2 className="font-display text-4xl md:text-5xl mb-8 leading-tight">
              Premium amenities, crafted for <em className="gradient-bronze-text not-italic">modern living.</em>
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-5">
              Prime Estate is a thoughtfully planned residential plots colony designed for those
              who want the freedom to build on their own terms. Located in a promising growth
              corridor, the project offers well-defined plots, proper road connectivity, and
              essential infrastructure to support long-term development.
            </p>
            <p className="text-foreground/75 leading-relaxed mb-8">
              With clear planning and a focus on value appreciation, Prime Estate gives you the
              foundation to create a space that truly reflects your vision.
            </p>
            <ul className="grid grid-cols-2 gap-y-3 text-sm">
              {["High growth location", "Transparent documentation", "Investment potential", "Planned infrastructure", "Wide internal roads", "Clear plot demarcation"].map((b) => (
                <li key={b} className="flex items-center gap-2 text-foreground/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-bronze" /> {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-px bg-border">
              {[
                ["Clients", "Investors"],
                ["Project Type", "Residential"],
                ["Starting Date", "5 January 2025"],
                ["Website", "truston.com"],
              ].map(([k, v]) => (
                <div key={k} className="bg-cream p-6">
                  <p className="text-[10px] uppercase tracking-luxe text-foreground/55 mb-1">{k}</p>
                  <p className="font-serif text-xl text-ink">{v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 px-6 bg-ink text-cream">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["1+", "Total Plots"],
            ["1", "Still Available"],
            ["1200", "Sq. Feet Range"],
            ["₹1L+", "Starting Price"],
          ].map(([n, l]) => (
            <Reveal key={l}>
              <div>
                <p className="font-display text-5xl md:text-6xl gradient-bronze-text">{n}</p>
                <p className="text-[11px] uppercase tracking-luxe text-cream/65 mt-2">{l}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-center font-serif italic text-cream/80 mt-12">
          All plots are Jila Panchayat approved with clear title deeds.
        </p>
      </section>

      <section className="py-28 px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionEyebrow>Premium Amenities</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-6xl text-center mb-20">
              Everything for <em className="gradient-bronze-text not-italic">modern living.</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {amenities.map((a, i) => (
              <Reveal key={a} delay={i * 0.05}>
                <div className="bg-cream p-8 h-full flex items-center gap-5">
                  <span className="font-serif text-3xl text-bronze">0{i + 1}</span>
                  <h3 className="font-serif text-xl">{a}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-sand/40 text-center">
        <Reveal>
          <SectionEyebrow>Interested?</SectionEyebrow>
          <h2 className="font-display text-3xl md:text-5xl mb-8 max-w-3xl mx-auto">
            Reserve your plot at <em className="gradient-bronze-text not-italic">Prime Estate</em> today.
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact" className="rounded-full bg-bronze text-cream px-8 py-4 text-[11px] uppercase tracking-luxe">
              Schedule Site Visit
            </Link>
            <a href="tel:+919616061166" className="rounded-full bronze-border px-8 py-4 text-[11px] uppercase tracking-luxe text-bronze hover:bg-bronze hover:text-cream transition-all">
              +91 96160-61166
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
