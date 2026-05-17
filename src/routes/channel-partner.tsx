import { createFileRoute, Link } from "@tanstack/react-router";
import { InnerHero } from "@/components/InnerHero";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import projectImg from "@/assets/project-prime.jpg";

export const Route = createFileRoute("/channel-partner")({
  head: () => ({
    meta: [
      { title: "Channel Partner Program — TrustOn" },
      { name: "description", content: "Earn premium commissions partnering with TrustOn — RERA-compliant projects, marketing support, and a dedicated relationship manager." },
      { property: "og:title", content: "Channel Partner Program — TrustOn" },
    ],
  }),
  component: Page,
});

const benefits = [
  { t: "Industry-Leading Commissions", d: "Our tiered structure rewards performance — the more you sell, the more you earn." },
  { t: "RERA-Compliant Projects", d: "Every TrustOn project is RERA-registered and legally compliant." },
  { t: "Dedicated Relationship Manager", d: "Your personal point of contact for every query, site visit, and deal update." },
  { t: "Co-Marketing & Sales Tools", d: "Branded brochures, digital creatives, and co-branded campaigns." },
];

const marqueeWords = ["Prime Estate", "Investment Opportunities", "RERA Approved", "Residential Plots", "Premium Commissions"];

function Page() {
  return (
    <>
      <InnerHero
        eyebrow="Channel Partner Program"
        title={<>Grow your business.<br/>Earn more, <em className="gradient-bronze-text not-italic font-serif italic">together.</em></>}
        subtitle="Built for real estate agents, brokers, and consultants who want to offer premium residential plots backed by a developer they can trust."
        poster={projectImg}
        alt="Channel Partner Program"
      />

      <section className="py-28 px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionEyebrow>About Us</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-6xl text-center mb-16">
              We help you <em className="gradient-bronze-text not-italic">grow</em> your income.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {[
              ["Strategic Development", "We plan every project with a long-term vision."],
              ["Buy a Home", "Full assistance provided."],
              ["Execution Excellence", "From land acquisition to final delivery."],
              ["Investment Consulting", "Expert guidance for clients."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.07}>
                <div className="bg-cream p-8 h-full">
                  <p className="text-[11px] uppercase tracking-luxe text-bronze mb-3">{t}</p>
                  <p className="text-foreground/70">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-12 text-center">
              <Link to="/about-us" className="rounded-full bronze-border px-7 py-3 text-[11px] uppercase tracking-luxe text-bronze hover:bg-bronze hover:text-cream transition-all">
                Read More
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-28 px-6 bg-sand/40">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionEyebrow>Benefits</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-6xl text-center mb-20">
              What makes TrustOn the <em className="gradient-bronze-text not-italic">best partner?</em>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {benefits.map((b, i) => (
              <Reveal key={b.t} delay={i * 0.08}>
                <div className="bg-cream p-10 h-full hover-lift">
                  <span className="font-display text-5xl gradient-bronze-text">0{i + 1}</span>
                  <h3 className="font-serif text-2xl mt-5 mb-3">{b.t}</h3>
                  <p className="text-foreground/70">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="border-y border-border py-8 overflow-hidden bg-ink">
        <div className="flex whitespace-nowrap marquee gap-16">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-16 shrink-0">
              {marqueeWords.map((w, i) => (
                <span key={`${k}-${i}`} className="font-serif text-3xl italic text-cream/80">
                  {w} <span className="text-bronze mx-8">●</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="py-28 px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionEyebrow>Register Now</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-5xl text-center mb-4">
              Register as a <em className="gradient-bronze-text not-italic">Channel Partner</em>
            </h2>
            <p className="text-center text-foreground/70 mb-12">
              Join active partners already earning with TrustOn across Lucknow and Uttar Pradesh.
              Registration is free with no hidden charges — our dedicated relationship manager will reach out within 24 hours.
            </p>
          </Reveal>
          <Reveal>
            <form className="bg-cream rounded-md p-10 card-shadow grid sm:grid-cols-2 gap-6">
              <Field label="Full Name" />
              <Field label="Mobile Number" type="tel" />
              <Field label="Email Address" type="email" />
              <Field label="City" />
              <label className="block sm:col-span-2">
                <span className="text-[10px] uppercase tracking-luxe text-foreground/55">Experience</span>
                <select className="w-full bg-transparent border-b border-border focus:border-bronze outline-none py-3 text-ink">
                  <option>Select years</option>
                  <option>Less than 1 year</option>
                  <option>1–3 years</option>
                  <option>3–5 years</option>
                  <option>5+ years</option>
                </select>
              </label>
              <div className="sm:col-span-2">
                <Field label="Current Agency / Firm (Optional)" />
              </div>
              <div className="sm:col-span-2 flex justify-end mt-4">
                <button type="submit" className="rounded-full bg-bronze text-cream px-8 py-4 text-[11px] uppercase tracking-luxe hover:soft-shadow transition-all">
                  Submit Registration →
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-luxe text-foreground/55">{label}</span>
      <input type={type} className="w-full bg-transparent border-b border-border focus:border-bronze outline-none py-3 text-ink" />
    </label>
  );
}
