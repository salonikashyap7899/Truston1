import { createFileRoute, Link } from "@tanstack/react-router";
import { InnerHero } from "@/components/InnerHero";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import projectImg from "@/assets/project-prime.jpg";
import { Section3DBackground } from "@/components/Section3DBackground";

export const Route = createFileRoute("/channel-partner")({
  head: () => ({
    meta: [
      { title: "Channel Partner Program — TrustOn" },
      {
        name: "description",
        content:
          "Earn premium commissions partnering with TrustOn — RERA-compliant projects, marketing support, and a dedicated relationship manager.",
      },
      { property: "og:title", content: "Channel Partner Program — TrustOn" },
    ],
  }),
  component: Page,
});

const benefits = [
  {
    t: "Premium Commissions",
    d: "Our tiered structure rewards high-performance — the more you scale, the more you earn.",
  },
  {
    t: "Strategic Compliance",
    d: "Every TrustOn project is Jila Panchayat approved and legally documented for security.",
  },
  {
    t: "Empire Relationship Manager",
    d: "Your personal point of contact for every query, private viewing, and deal closure.",
  },
  {
    t: "Global Marketing Assets",
    d: "Access to high-definition cinematic brochures and 3D architectural visualization tools.",
  },
];

const marqueeWords = [
  "Prime Estate",
  "Investment Opportunities",
  "Billion Dollar Vision",
  "Residential Plots",
  "Elite Commissions",
];

function Page() {
  return (
    <div className="bg-background text-foreground overflow-hidden">
      <InnerHero
        eyebrow="Partnership Ecosystem"
        title={
          <>
            Scale your business.
            <br />
            Earn more, <em className="text-luxe-cyan not-italic font-serif italic">together.</em>
          </>
        }
        subtitle="Built for elite real estate consultants who want to offer premium residential plots backed by a billion-dollar brand vision."
        poster={projectImg}
        alt="Channel Partner Program"
      />

      <section className="py-32 px-6 relative">
        <Section3DBackground opacity={0.1} />
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow>Strategic Growth</SectionEyebrow>
            <h2 className="font-display text-5xl md:text-8xl text-center mb-24 tracking-tighter leading-none text-white">
              Accelerate your <em className="text-luxe-cyan italic font-serif">yield.</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              ["Portfolio Strategy", "We architect every project with a multi-decade vision."],
              ["Strategic Acquisition", "Full legal and documentation assistance provided."],
              ["Operational Excellence", "From site analysis to final legacy delivery."],
              ["Wealth Intelligence", "Expert guidance for HNI and institutional clients."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.07}>
                <div className="glass-premium p-10 h-full rounded-[32px] border border-white/5 hover:border-luxe-cyan/30 transition-all duration-500">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-luxe-cyan mb-6 font-bold">
                    {t}
                  </p>
                  <p className="text-white/40 font-light leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-20 text-center">
              <Link to="/about-us" className="btn-magnetic btn-luxe px-12 py-5">
                Learn More
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-32 px-6 bg-ink relative">
        <Section3DBackground opacity={0.15} />
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow light>Global Advantages</SectionEyebrow>
            <h2 className="font-display text-5xl md:text-8xl text-center text-white mb-24 tracking-tighter leading-none">
              Why partner with <br />
              <em className="text-luxe-cyan italic font-serif">TrustOn Empire?</em>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((b, i) => (
              <Reveal key={b.t} delay={i * 0.08}>
                <div className="glass-premium p-12 h-full rounded-[40px] border border-white/5 group hover:border-luxe-cyan/40 transition-all duration-500">
                  <span className="font-display text-6xl text-white/5 group-hover:text-luxe-cyan transition-colors duration-700 leading-none">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-3xl text-white mt-10 mb-6 tracking-tight">
                    {b.t}
                  </h3>
                  <p className="text-white/40 text-lg leading-relaxed font-light">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="border-y border-white/5 py-10 overflow-hidden bg-ink relative z-10">
        <div className="flex whitespace-nowrap marquee gap-24">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-24 shrink-0">
              {marqueeWords.map((w, i) => (
                <span
                  key={`${k}-${i}`}
                  className="font-display text-3xl italic text-white/20 uppercase tracking-widest"
                >
                  {w} <span className="text-luxe-cyan mx-10">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="py-32 px-6 relative">
        <div className="mx-auto max-w-4xl relative z-10">
          <Reveal>
            <SectionEyebrow>Registration Portal</SectionEyebrow>
            <h2 className="font-display text-5xl md:text-8xl text-center text-white mb-10 tracking-tighter leading-none">
              Initialize <em className="text-luxe-cyan italic font-serif">Alliance.</em>
            </h2>
            <p className="text-center text-white/40 mb-20 font-light text-xl leading-relaxed max-w-3xl mx-auto">
              Join the global network of partners already scaling with TrustOn. Our private portal
              access will be authorized within 24 hours.
            </p>
          </Reveal>
          <Reveal>
            <form className="glass-premium rounded-[48px] p-12 md:p-16 border border-white/10 shadow-luxe grid sm:grid-cols-2 gap-10">
              <Field label="Full Identity" />
              <Field label="Communication Number" type="tel" />
              <Field label="Digital Mail" type="email" />
              <Field label="Jurisdiction (City)" />
              <label className="block sm:col-span-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-4 block">
                  Industry Tenure
                </span>
                <select className="w-full bg-white/[0.03] border border-white/10 rounded-full px-8 py-4 text-white focus:outline-none focus:border-luxe-cyan/50 transition-colors font-light appearance-none">
                  <option className="bg-ink">Select tenure</option>
                  <option className="bg-ink">Primary Stage (&lt; 1 yr)</option>
                  <option className="bg-ink">Established (1–3 yrs)</option>
                  <option className="bg-ink">Senior (3–5 yrs)</option>
                  <option className="bg-ink">Empire Tier (5+ yrs)</option>
                </select>
              </label>
              <div className="sm:col-span-2">
                <Field label="Organization / Firm Architecture (Optional)" />
              </div>
              <div className="sm:col-span-2 flex justify-center mt-8">
                <button type="submit" className="btn-magnetic btn-luxe px-16 py-5 rounded-full">
                  Submit Credentials →
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-4 block">
        {label}
      </span>
      <input
        type={type}
        className="w-full bg-white/[0.03] border border-white/10 rounded-full px-8 py-4 text-white focus:outline-none focus:border-luxe-cyan/50 transition-colors font-light"
      />
    </label>
  );
}
