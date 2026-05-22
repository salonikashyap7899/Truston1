import { createFileRoute } from "@tanstack/react-router";
import { InnerHero } from "@/components/InnerHero";
import { Reveal } from "@/components/Reveal";
import interiorImg from "@/assets/luxury-interior.jpg";
import { Section3DBackground } from "@/components/Section3DBackground";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TrustOn Developers" },
      {
        name: "description",
        content:
          "Talk to TrustOn — buy a plot, design your home, start construction, or become a channel partner. Our team replies within 2 hours.",
      },
      { property: "og:title", content: "Contact TrustOn" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="bg-background text-foreground overflow-hidden">
      <InnerHero
        eyebrow="Private Engagement"
        title={
          <>
            Private Advisory. <br />
            <em className="text-luxe-cyan not-italic font-serif italic">Request Engagement.</em>
          </>
        }
        subtitle="Experience bespoke luxury real estate consulting. Our advisors respond to global inquiries within 120 minutes."
        poster={interiorImg}
        alt="Contact TrustOn"
      />

      <section className="py-32 px-6 relative">
        <Section3DBackground opacity={0.1} />
        <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-8 mb-24 relative z-10">
          <Reveal>
            <div className="glass-premium p-10 h-full rounded-[32px] border border-white/5 hover:border-luxe-cyan/30 transition-all duration-500">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-6">
                Direct Line
              </p>
              <a
                href="tel:+919616061166"
                className="font-display text-3xl text-white hover:text-luxe-cyan transition-colors tracking-tight"
              >
                +91 96160-61166
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass-premium p-10 h-full rounded-[32px] border border-white/5 hover:border-luxe-cyan/30 transition-all duration-500">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-6">
                Digital Protocol
              </p>
              <a
                href="mailto:trustondevelopers01@gmail.com"
                className="font-display text-2xl text-white hover:text-luxe-cyan transition-colors break-all tracking-tight"
              >
                truston@empire.com
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="glass-premium p-10 h-full rounded-[32px] border border-white/5 hover:border-luxe-cyan/30 transition-all duration-500">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-6">
                Jurisdiction
              </p>
              <p className="font-display text-xl text-white/70 leading-snug tracking-tight">
                UGF, Apple Plaza, Next To HDFC Bank,
                <br />
                Hardoi Road, Lucknow — 226003
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <form className="mx-auto max-w-5xl glass-premium rounded-[48px] p-12 md:p-20 border border-white/10 shadow-luxe grid md:grid-cols-2 gap-10 relative z-10">
            <Field label="Full Identity" required />
            <Field label="Digital Identity (Email)" type="email" required />
            <Field label="Communication Node (Phone)" type="tel" required />
            <Field label="Engagement Module (Service)" required />
            <div className="md:col-span-2">
              <Field label="Manifesto (Message)" textarea />
            </div>
            <div className="md:col-span-2 flex justify-center mt-10">
              <button type="submit" className="btn-magnetic btn-luxe px-16 py-5 rounded-full">
                Initialize Request →
              </button>
            </div>
          </form>
        </Reveal>
      </section>
    </div>
  );
}

function Field({
  label,
  type = "text",
  textarea,
  required,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const cls =
    "w-full bg-white/[0.03] border-b border-white/10 focus:border-luxe-cyan outline-none py-4 text-white font-light transition-colors";
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-2 block">
        {label}
        {required && " *"}
      </span>
      {textarea ? <textarea rows={5} className={cls} /> : <input type={type} className={cls} />}
    </label>
  );
}
