import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — TrustOn Premium Estate" },
      {
        name: "description",
        content: "Discover Prime Estate by TrustOn - Redefining luxury living in Lucknow.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const building_img = "/attached_assets/image_1779159211927.png";
  return (
    <div className="bg-[var(--ink)] text-white overflow-x-hidden selection:bg-luxe-cyan selection:text-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-[140px]">
        <div className="absolute inset-0 z-0">
          <img
            src={building_img}
            alt="About Us Hero"
            className="w-full h-full object-cover brightness-[0.4] ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/80 via-transparent to-[var(--ink)]" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-8xl font-serif mb-6 tracking-tighter uppercase"
          >
            About Us
          </motion.h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-luxe-cyan text-lg">✦</span>
              <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-luxe-cyan">
                About Our Company
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-white mb-8 leading-tight tracking-tighter uppercase">
              PRIME ESTATE - Own the Ground. Build Your Legacy.
            </h2>
            <div className="w-24 h-1 bg-luxe-cyan mb-8" />
            <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-4xl">
              Prime Estate is a trusted name in real estate development, built on a foundation of
              transparency, quality, and long-term vision. We don't just sell land, we craft
              opportunities.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3D Visual Excellence */}
      <section className="py-24 px-6 md:px-12 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <div className="absolute -inset-4 bg-luxe-blue/10 blur-2xl rounded-3xl" />
             <img
              src={building_img}
              alt="Visual Inspiration"
              className="relative rounded-2xl border border-white/5 shadow-2xl"
            />
          </div>
          <div>
            <div className="flex items-center gap-3 text-luxe-cyan mb-6">
              <Eye size={20} />
              <span className="text-xs uppercase tracking-[0.4em] font-bold">Visual Inspiration</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display leading-tight mb-8">
              3D-Visual Excellence
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              Experience your future before it's built. Our advanced 3D-architectural renderings provide a hyper-realistic preview of your legacy.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-ink text-center relative overflow-hidden">
        <Section3DBackground opacity={0.3} />
        <div className="mx-auto max-w-5xl relative z-10 text-center">
          <Reveal>
            <SectionEyebrow light>Get In Touch</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-7xl text-white mb-12 tracking-tighter">
              Join Our Legacy
            </h2>
            <Link
              to="/contact"
              className="btn-magnetic btn-luxe px-12 py-5 inline-block rounded-full"
            >
              Get in Touch
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
