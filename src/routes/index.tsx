import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-estate.jpg";
import projectImg from "@/assets/project-prime.jpg";
import interiorImg from "@/assets/luxury-interior.jpg";
import lucknowImg from "@/assets/lucknow-aerial.jpg";
import { PageHero } from "@/components/PageHero";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import { PlotTracker } from "@/components/PlotTracker";
import { WealthCalculator } from "@/components/WealthCalculator";
import { Testimonials } from "@/components/Testimonials";
import { CursorGlow } from "@/components/CursorGlow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrustOn — Own the Ground. Build the Legacy." },
      { name: "description", content: "Prime Estate by TrustOn — Jila Panchayat approved luxury township in Lucknow. Legally secure plots, premium living, and high-return investment." },
      { property: "og:title", content: "TrustOn — Own the Ground. Build the Legacy." },
      { property: "og:description", content: "Cinematic, editorial real-estate experiences in Lucknow." },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "preload", as: "image", href: heroImg, fetchpriority: "high" } as never],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background text-foreground">
      <CursorGlow />
      <PageHero
        height="full"
        eyebrow="🏡 Welcome to TrustOn"
        title={<>Own the <em className="gradient-bronze-text not-italic">Ground.</em><br/>Build the <span className="font-serif italic">Legacy.</span></>}
        poster={heroImg}
        alt="Aerial view of Prime Estate township at twilight"
      >
        <Link to="/project" className="group inline-flex items-center gap-3 rounded-full bg-cream text-ink px-8 py-4 text-[11px] uppercase tracking-luxe hover:bg-bronze hover:text-cream transition-all duration-500">
          Explore Prime Estate
          <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </Link>
        <Link to="/contact" className="text-[11px] uppercase tracking-luxe text-cream/85 hover:text-bronze transition">
          Schedule a Consultation
        </Link>
      </PageHero>

      <Marquee />
      <PlotTracker />
      <Highlights />
      <WealthCalculator />
      <AboutPrime />
      <InvestLucknow />
      <Services />
      <ProjectFeature />
      <WhyTrust />
      <Testimonials />
      <ChannelPartnerCTA />
    </div>
  );
}

function Marquee() {
  const words = ["Cinematic Living", "Editorial Architecture", "Premium Plots", "Jila Panchayat Approved", "Legacy Investments"];
  return (
    <div className="border-y border-border py-8 overflow-hidden bg-sand/50">
      <div className="flex whitespace-nowrap marquee gap-16">
        {[...Array(2)].map((_, k) => (
          <div key={k} className="flex gap-16 shrink-0">
            {words.map((w, i) => (
              <span key={`${k}-${i}`} className="font-serif text-3xl italic text-foreground/65">
                {w} <span className="text-bronze mx-8">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Highlights() {
  const cards = [
    { title: "Premium Living", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/modern-interior-design-interior-600x800.jpg" },
    { title: "Green Development", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/aerial-photography-chinese-city-600x800.jpg" },
    { title: "Modern Amenities", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/hotel-lobby-interior-600x800.jpg" },
    { title: "Property Guidance", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/businessman-explaining-concept-details-600x800.jpg" },
    { title: "Reasonable Pricing", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/close-up-hand-holding-cash-600x800.jpg" },
  ];
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.07}>
            <div className="relative aspect-[3/4] rounded-md overflow-hidden group hover-lift">
              <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-serif text-xl text-cream group-hover:text-bronze transition-colors duration-500">{c.title}</p>
                <span className="block w-8 h-px bg-bronze mt-3 transition-all duration-500 group-hover:w-16" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AboutPrime() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative aspect-[3/4] rounded-md overflow-hidden card-shadow">
            <img src={interiorImg} alt="Luxury interior" loading="lazy" className="w-full h-full object-cover ken-burns" />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="text-bronze text-[11px] uppercase tracking-luxe mb-4 flex items-center gap-3">
              <span className="divider-bronze" /> Own the Ground. Build Your Legacy.
            </p>
            <h2 className="font-display text-5xl md:text-6xl leading-tight mb-8">
              Prime Estate — where <em className="gradient-bronze-text not-italic">imagination</em> takes shape.
            </h2>
            <p className="text-foreground/70 text-lg leading-relaxed mb-10">
              Prime Estate is a trusted name in real estate development, built on a foundation
              of transparency, quality, and long-term vision. We don't just sell land — we craft
              opportunities. Our flagship project is a Jila Panchayat approved township that
              combines legal security, prime location, and future-ready infrastructure.
            </p>
            <div className="grid sm:grid-cols-2 gap-px bg-border mb-10">
              <div className="bg-cream p-6">
                <p className="text-bronze text-[11px] uppercase tracking-luxe mb-2">Our Mission</p>
                <p className="font-serif text-lg">Make premium, legally secure land ownership accessible to every aspiring homeowner and investor.</p>
              </div>
              <div className="bg-cream p-6">
                <p className="text-bronze text-[11px] uppercase tracking-luxe mb-2">Our Vision</p>
                <p className="font-serif text-lg">Build not just properties, but thriving communities where families live, businesses grow, and life flourishes.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-8">
              <Link to="/about-us" className="rounded-full bronze-border px-7 py-3 text-[11px] uppercase tracking-luxe text-bronze hover:bg-bronze hover:text-cream transition-all">
                Read More
              </Link>
              <div>
                <p className="text-[11px] uppercase tracking-luxe text-foreground/55">Call Anytime</p>
                <p className="font-serif text-2xl text-bronze">+91 96160-61166</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InvestLucknow() {
  const items = [
    { t: "Lucknow Metro", d: "Extended metro lines are boosting surrounding land values across key residential zones." },
    { t: "Purvanchal Expressway", d: "Direct connectivity to UP's fastest-growing economic and industrial corridor." },
    { t: "25% Land Appreciation", d: "Premium zones in Lucknow have seen up to 25% appreciation in the last 3 years." },
    { t: "Airport Expansion", d: "The new international terminal is driving demand for premium residential properties nearby." },
  ];
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-sand/40">
      <div className="absolute inset-0">
        <img src={lucknowImg} alt="" className="w-full h-full object-cover opacity-15" loading="lazy" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>NRI / Investment</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-center mb-6">
            Why invest in <em className="gradient-bronze-text not-italic">Lucknow?</em>
          </h2>
          <p className="text-center text-foreground/70 max-w-3xl mx-auto mb-20">
            Lucknow is one of India's fastest-growing real estate markets — driven by world-class
            infrastructure, government-backed smart city initiatives, and rapidly rising land values.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-4 gap-px bg-border">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.08}>
              <div className="bg-cream p-8 h-full hover-lift">
                <span className="font-display text-5xl gradient-bronze-text">0{i + 1}</span>
                <h3 className="font-serif text-2xl mt-6 mb-3">{it.t}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { title: "Plot Selling", sub: "Premium Plots. Zero Compromise.", to: "/plot-selling", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/webaliser-_TPTXZd9mOo-unsplash-1-1024x768.jpg" },
    { title: "Architecture & Design", sub: "Your Vision, Brought to Life on Paper First", to: "/architecture-design", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/april-pethybridge-nN28PjFOOLI-unsplash-scaled.jpg" },
    { title: "Construction & Build", sub: "We Don't Just Build Buildings. We Build Promises", to: "/construction-build", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-werde-hHz4yrvxwlA-unsplash-scaled.jpg" },
    { title: "Investment Consulting", sub: "Buy Smart. Invest Smarter.", to: "/investment-consulting", img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/avi-waxman-f9qZuKoZYoY-unsplash-1-scaled.jpg" },
  ] as const;
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>Our Services</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-center mb-20">
            Everything you need, <em className="gradient-bronze-text not-italic">under one roof.</em>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <Link to={s.to} className="group block relative aspect-[16/10] rounded-md overflow-hidden hover-lift">
                <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10 text-cream">
                  <p className="text-[11px] uppercase tracking-luxe text-bronze mb-3">0{i + 1} — Service</p>
                  <h3 className="font-display text-4xl mb-2">{s.title}</h3>
                  <p className="text-cream/80 font-serif italic">{s.sub}</p>
                  <span className="inline-flex items-center gap-2 mt-6 text-[11px] uppercase tracking-luxe text-bronze opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700">
                    Discover →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-20 text-center">
            <p className="text-[11px] uppercase tracking-luxe text-bronze mb-3">Hurry</p>
            <p className="font-serif italic text-2xl text-foreground/70">
              Don't be late — the time is running fast. Choose the luxury.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectFeature() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>Project</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-center mb-3 leading-tight">
            Where imagination takes shape in <em className="gradient-bronze-text not-italic">luxury.</em>
          </h2>
          <p className="text-center text-foreground/65 font-serif italic text-lg mb-16">
            Crafted for those who expect nothing less than exceptional living.
          </p>
        </Reveal>
        <Reveal>
          <Link to="/projects/$slug" params={{ slug: "prime-estate-lucknow-uttar-pradesh" }} className="block relative rounded-md overflow-hidden card-shadow group">
            <div className="relative aspect-[21/9]">
              <img src={projectImg} alt="Prime Estate" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-16 max-w-2xl text-cream">
              <p className="text-[11px] uppercase tracking-luxe text-bronze mb-3">Residential</p>
              <h3 className="font-display text-5xl md:text-6xl mb-6">Prime Estate</h3>
              <p className="text-cream/80 mb-8 max-w-md">
                A flagship Jila Panchayat approved township in Lucknow — combining legal security,
                prime location, and future-ready infrastructure.
              </p>
              <span className="inline-flex w-fit rounded-full bg-bronze text-cream px-7 py-3 text-[11px] uppercase tracking-luxe">
                View Project
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function WhyTrust() {
  const items = [
    { t: "Legal Security", d: "Every plot backed by Jila Panchayat approval & clear title deeds." },
    { t: "Transparent Dealings", d: "No hidden charges. What we quote is what you pay." },
    { t: "Design Expertise", d: "In-house architects who understand your vision, not just blueprints." },
    { t: "Prime Location", d: "Strategic positioning with road access & utility connections." },
    { t: "Quality Construction", d: "Grade-A materials, skilled workforce, no shortcuts." },
    { t: "After-Sale Support", d: "We stay with you long after the deal is signed." },
  ];
  return (
    <section className="py-32 px-6 bg-sand/40">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>Why Choose Us</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-center mb-20">
            Why buyers trust <em className="gradient-bronze-text not-italic">Prime Estate.</em>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.06}>
              <div className="bg-cream p-8 h-full hover-lift">
                <span className="text-bronze font-serif text-3xl">0{i + 1}</span>
                <h3 className="font-serif text-2xl mt-4 mb-3">{it.t}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChannelPartnerCTA() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <p className="text-bronze text-[11px] uppercase tracking-luxe mb-4 flex items-center gap-3">
            <span className="divider-bronze" /> Channel Partner Program
          </p>
          <h2 className="font-display text-5xl md:text-6xl leading-tight mb-6">
            Earn more by partnering with <em className="gradient-bronze-text not-italic">TrustOn</em> today.
          </h2>
          <p className="text-foreground/70 text-lg leading-relaxed mb-10">
            Join TrustOn's Channel Partner Program and start earning premium commissions on every
            deal — with full marketing support, RERA-compliant projects, and a team that's always
            in your corner.
          </p>
          <Link to="/channel-partner" className="inline-flex rounded-full bg-bronze text-cream px-8 py-4 text-[11px] uppercase tracking-luxe hover:soft-shadow transition-all">
            Register Now
          </Link>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative aspect-[4/5] rounded-md overflow-hidden card-shadow">
            <img src="https://truston.advrtisinguru.com/wp-content/uploads/2026/01/ser3.jpg" alt="Channel Partner Program" loading="lazy" className="w-full h-full object-cover ken-burns" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
