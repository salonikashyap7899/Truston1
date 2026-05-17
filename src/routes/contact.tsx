import { createFileRoute } from "@tanstack/react-router";
import { InnerHero } from "@/components/InnerHero";
import { Reveal } from "@/components/Reveal";
import interiorImg from "@/assets/luxury-interior.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TrustOn Developers" },
      { name: "description", content: "Talk to TrustOn — buy a plot, design your home, start construction, or become a channel partner. Our team replies within 2 hours." },
      { property: "og:title", content: "Contact TrustOn" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <InnerHero
        eyebrow="Contact Us"
        title={<>Let's talk. We're <em className="gradient-bronze-text not-italic font-serif italic">here for you.</em></>}
        subtitle="Whether you want to buy a plot, get your home designed, start construction, or become a channel partner — reach out and our team will get back to you within 2 hours during business hours."
        poster={interiorImg}
        alt="Contact TrustOn"
      />

      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-px bg-border mb-16">
          <Reveal>
            <div className="bg-cream p-8 h-full">
              <p className="text-[11px] uppercase tracking-luxe text-foreground/55 mb-2">Call Us</p>
              <a href="tel:+919616061166" className="font-serif text-2xl text-bronze">+91 96160-61166</a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="bg-cream p-8 h-full">
              <p className="text-[11px] uppercase tracking-luxe text-foreground/55 mb-2">Email Us</p>
              <a href="mailto:trustondevelopers01@gmail.com" className="font-serif text-xl text-bronze break-all">
                trustondevelopers01@gmail.com
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="bg-cream p-8 h-full">
              <p className="text-[11px] uppercase tracking-luxe text-foreground/55 mb-2">Visit</p>
              <p className="font-serif text-lg text-ink leading-snug">
                UGF, Apple Plaza, Next To HDFC Bank,<br/>Hardoi Road, Lucknow — 226003
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <form className="mx-auto max-w-4xl bg-cream rounded-md p-10 card-shadow grid md:grid-cols-2 gap-6">
            <Field label="First Name" required />
            <Field label="Email Address" type="email" required />
            <Field label="Phone Number" type="tel" required />
            <Field label="What are your needs?" required />
            <div className="md:col-span-2">
              <Field label="Write Message" textarea />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" className="rounded-full bg-bronze text-cream px-10 py-4 text-[11px] uppercase tracking-luxe hover:soft-shadow transition-all">
                Contact Us →
              </button>
            </div>
          </form>
        </Reveal>
      </section>
    </>
  );
}

function Field({ label, type = "text", textarea, required }: { label: string; type?: string; textarea?: boolean; required?: boolean }) {
  const cls = "w-full bg-transparent border-b border-border focus:border-bronze outline-none py-3 text-ink";
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-luxe text-foreground/55">{label}{required && " *"}</span>
      {textarea ? <textarea rows={4} className={cls} /> : <input type={type} className={cls} />}
    </label>
  );
}
