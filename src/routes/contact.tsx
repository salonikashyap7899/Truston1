import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import heroImg from "@/assets/hero-estate.jpg";
import { submitContactMessage } from "@/lib/contactSubmit";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TrustOn Developers" },
      {
        name: "description",
        content:
          "Talk to TrustOn — buy a plot, design your home, start construction, or become a channel partner. Our team replies within 2 hours.",
      },
    ],
  }),
  component: ContactPage,
});

const services = [
  "Plot Purchase Enquiry",
  "Architecture & Design",
  "Construction & Build",
  "Investment Consulting",
  "Channel Partnership",
  "Site Visit Request",
  "General Enquiry",
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus("sending");

    try {
      await submitContactMessage({ data: { name: form.name, email: form.email, phone: form.phone, service: form.service, message: form.message } });
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      const subject = encodeURIComponent(`TrustOn Enquiry — ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${form.service}\n\nMessage:\n${form.message}`
      );
      window.open(`mailto:trustondevelopers01@gmail.com?subject=${subject}&body=${body}`);
      setStatus("sent");
    }
  };

  return (
    <div className="bg-[#04090f] text-white min-h-screen overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">

      {/* ── HERO ── */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden pt-[140px]">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Contact TrustOn"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.18) saturate(0.5)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/50 via-transparent to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/60 to-transparent" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 70% 40%, rgba(0,191,255,0.07) 0%, transparent 70%)" }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#00BFFF]" />
              <span className="text-[#00BFFF] text-[11px] uppercase tracking-[0.3em] font-bold">Get in Touch</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-light text-white leading-none tracking-tight mb-4">
              Let's Start a<br />
              <em className="text-[#00BFFF] italic">Conversation</em>
            </h1>
            <p className="text-white/45 text-base font-light max-w-lg leading-relaxed mt-4">
              Whether you're buying a plot, building a home, or exploring investment opportunities —
              our team responds within 2 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Info Cards ── */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          {[
            {
              icon: "📞",
              label: "Direct Line",
              value: "+91 96160-61166",
              sub: "Mon – Sat · 9 AM to 7 PM",
              href: "tel:+919616061166",
            },
            {
              icon: "✉️",
              label: "Email Address",
              value: "trustondevelopers01@gmail.com",
              sub: "Replies within 2 hours",
              href: "mailto:trustondevelopers01@gmail.com",
            },
            {
              icon: "📍",
              label: "Office Location",
              value: "UGF, Apple Plaza",
              sub: "Next To HDFC Bank, Hardoi Road, Lucknow — 226003",
              href: "https://maps.google.com",
            },
          ].map((card, i) => (
            <Reveal key={card.label} delay={i * 0.08}>
              <a
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="bg-[#060c16] hover:bg-[#080d1a] transition-colors duration-300 p-8 md:p-10 group flex flex-col gap-4 h-full"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300 w-fit">{card.icon}</span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-bold mb-2">{card.label}</p>
                  <p className="text-white group-hover:text-[#00BFFF] transition-colors duration-300 font-serif text-xl leading-snug break-all">
                    {card.value}
                  </p>
                  <p className="text-white/35 text-xs mt-2 leading-relaxed font-light">{card.sub}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="py-10 px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16 items-start">

          {/* Left — info */}
          <div className="lg:col-span-2">
            <Reveal direction="left">
              <div className="sticky top-28">
                <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.25em] font-bold mb-5 flex items-center gap-3">
                  <span className="w-6 h-px bg-[#00BFFF]" /> Send Us a Message
                </p>
                <h2 className="font-serif text-4xl text-white leading-tight mb-6">
                  Tell Us What<br />
                  You <em className="text-[#00BFFF] italic">Need</em>
                </h2>
                <p className="text-white/40 text-sm leading-[2] font-light mb-10">
                  Fill in the form and one of our advisors will reach out to discuss your goals,
                  timeline, and how TrustOn can serve you best.
                </p>

                {/* What happens next */}
                <div className="space-y-6 border-t border-white/8 pt-8">
                  {[
                    { num: "01", title: "We receive your message", desc: "Your enquiry is logged immediately." },
                    { num: "02", title: "Advisor calls within 2 hours", desc: "A dedicated advisor will call you." },
                    { num: "03", title: "Site visit arranged", desc: "We'll schedule a tour at your convenience." },
                  ].map((step) => (
                    <div key={step.num} className="flex items-start gap-4">
                      <span className="font-serif italic text-2xl text-[#00BFFF]/25 leading-none shrink-0 mt-0.5">{step.num}</span>
                      <div>
                        <p className="text-white text-sm font-medium mb-1">{step.title}</p>
                        <p className="text-white/35 text-xs font-light leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919616061166?text=Hi%2C%20I%20am%20interested%20in%20TrustOn%20Prime%20Estate."
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300 text-sm group"
                >
                  <span className="w-9 h-9 rounded-full bg-[#25D366]/15 border border-[#25D366]/25 flex items-center justify-center text-[#25D366] text-lg group-hover:bg-[#25D366]/25 transition-colors duration-300">
                    💬
                  </span>
                  <span>Prefer WhatsApp? <span className="text-[#25D366]">Chat directly →</span></span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <Reveal direction="right" delay={0.1}>
              {status === "sent" ? (
                <div className="border border-[#00BFFF]/25 bg-[#00BFFF]/8 rounded-2xl p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <div className="w-16 h-16 rounded-full border-2 border-[#00BFFF] flex items-center justify-center text-2xl mb-6">✓</div>
                  <h3 className="font-serif text-3xl text-white mb-3">Message Received</h3>
                  <p className="text-white/45 text-sm leading-relaxed font-light max-w-xs">
                    Thank you for reaching out. Our advisor will contact you within 2 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-[#00BFFF] text-[11px] uppercase tracking-[0.15em] font-bold hover:underline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="border border-white/8 rounded-2xl p-8 md:p-12 bg-[#060c16] space-y-8"
                >
                  {/* Row 1 */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <FormField label="Full Name" name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" />
                    <FormField label="Phone Number" name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  {/* Row 2 */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <FormField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                    <div>
                      <label className="block">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-white/35 font-bold mb-3 block">Service Interested In</span>
                        <select
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          className="w-full bg-white/4 border-b border-white/12 focus:border-[#00BFFF] outline-none py-3.5 text-white/80 text-sm font-light transition-colors duration-300 cursor-pointer"
                          style={{ appearance: "none" }}
                        >
                          <option value="" className="bg-[#060c16]">Select a service…</option>
                          {services.map((s) => (
                            <option key={s} value={s} className="bg-[#060c16]">{s}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>
                  {/* Message */}
                  <div>
                    <label className="block">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-white/35 font-bold mb-3 block">Your Message</span>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us about your requirements — plot size, budget, timeline, or any questions you have…"
                        className="w-full bg-white/4 border-b border-white/12 focus:border-[#00BFFF] outline-none py-3.5 text-white/80 text-sm font-light leading-relaxed transition-colors duration-300 resize-none placeholder:text-white/25"
                      />
                    </label>
                  </div>

                  {/* Privacy note */}
                  <p className="text-white/25 text-[11px] leading-relaxed font-light">
                    Your information is private and will only be used to respond to your enquiry.
                    We do not share your data with third parties.
                  </p>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full sm:w-auto px-12 py-4 text-[12px] uppercase tracking-[0.15em] font-bold rounded-xl transition-all duration-500 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-3 justify-center"
                      style={{ background: status === "sending" ? "rgba(0,191,255,0.7)" : "#00BFFF", color: "#04090f" }}
                    >
                      {status === "sending" ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="inline-block w-4 h-4 border-2 border-[#04090f]/40 border-t-[#04090f] rounded-full"
                          />
                          Sending…
                        </>
                      ) : (
                        "Send Message →"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Map Embed placeholder ── */}
      <div className="border-t border-white/5 bg-[#060c16] py-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-white/60 text-sm">TrustOn Developers</p>
            <p className="text-white/35 text-xs font-light mt-1">UGF, Apple Plaza, Next To HDFC Bank, Hardoi Road, Lucknow — 226003</p>
          </div>
          <a
            href="https://wa.me/919616061166?text=Hi%2C%20I%20am%20interested%20in%20TrustOn%20Prime%20Estate."
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[#25D366] text-sm border border-[#25D366]/25 px-5 py-2.5 rounded-full hover:bg-[#25D366]/10 transition-colors duration-300"
          >
            <span>💬</span> WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.25em] text-white/35 font-bold mb-3 block">
        {label}{required && <span className="text-[#00BFFF] ml-1">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/4 border-b border-white/12 focus:border-[#00BFFF] outline-none py-3.5 text-white/80 text-sm font-light transition-colors duration-300 placeholder:text-white/25"
      />
    </label>
  );
}
