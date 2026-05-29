import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import lucknowAerialImg from "@/assets/lucknow-aerial.jpg";
import luxuryInteriorImg from "@/assets/luxury-interior.jpg";
import heroImg from "@/assets/hero-estate.jpg";
import { usePageContent } from "@/hooks/usePageContent";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "The Legacy  — TrustOn Developers" },
      {
        name: "description",
        content:
          "Expert perspectives on Lucknow real estate, land investment, architecture, and building generational wealth.",
      },
    ],
  }),
  component: BlogPage,
});

const categories = ["All", "Investment", "Architecture", "Market Trends", "Lifestyle", "Legal & Docs", "NRI Guide"];

const featuredArticles = [
  {
    cat: "Investment",
    title: "Why Dubagga is Lucknow's Next Billion-Dollar Corridor",
    author: "Rohit Sharma, Investment Head",
    date: "May 18, 2025",
    read: "8 min read",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    cat: "Architecture",
    title: "Designing Homes That Last Generations",
    date: "Apr 30, 2025",
    read: "6 min read",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
  },
  {
    cat: "Legal & Docs",
    title: "The Complete Guide to Jila Panchayat Approved Plots",
    date: "Apr 12, 2025",
    read: "5 min read",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
  },
];

const articles = [
  {
    cat: "investment",
    title: "How to Evaluate Land ROI Before You Buy",
    excerpt:
      "Beyond the brochure — a data-driven framework for assessing real appreciation potential in Lucknow's emerging corridors before committing capital.",
    date: "May 10, 2025",
    img: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=800&auto=format&fit=crop",
  },
  {
    cat: "market",
    title: "Lucknow 2025: The Infrastructure Revolution Reshaping Property Values",
    excerpt:
      "The Lucknow Metro Phase 2, Purvanchal Expressway extensions, and Smart City upgrades are converging to create once-in-a-decade buying opportunities.",
    date: "Apr 28, 2025",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format&fit=crop",
  },
  {
    cat: "nri",
    title: "NRI Property Investment in Lucknow: Step-by-Step Legal Roadmap",
    excerpt:
      "From FEMA compliance to NRO/NRE account transfers — a complete guide for non-resident Indians investing in Uttar Pradesh real estate remotely.",
    date: "Apr 15, 2025",
    img: "https://images.unsplash.com/photo-1565098772267-60af42b81ef2?q=80&w=800&auto=format&fit=crop",
  },
  {
    cat: "architecture",
    title: "Vastu-Compliant Modern Homes: Finding the Perfect Balance",
    excerpt:
      "How TrustOn's architectural team integrates ancient Vastu principles with contemporary spatial design — delivering homes that are both beautiful and culturally rooted.",
    date: "Apr 5, 2025",
    img: "https://images.unsplash.com/photo-1503174971373-b1f69850bded?q=80&w=800&auto=format&fit=crop",
  },
  {
    cat: "legal",
    title: "Red Flags in Property Documents: What to Check Before Signing",
    excerpt:
      "A practitioner's checklist — title deeds, encumbrance certificates, Panchayat approvals, and the 12 questions you must ask every seller before signing anything.",
    date: "Mar 22, 2025",
    img: "https://images.unsplash.com/photo-1453945619913-79ec89a82c51?q=80&w=800&auto=format&fit=crop",
  },
  {
    cat: "lifestyle",
    title: "Living in Prime Estate: A Resident's Perspective",
    excerpt:
      "Anil Singh bought his plot in Phase 1 and built his dream home within 14 months. Here's an honest account of the journey — from site visit to possession.",
    date: "Mar 10, 2025",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
  },
];

const tickerItems = [
  { label: "Lucknow Land Prices Up", val: "+22% YoY" },
  { label: "Prime Estate: 73 Plots Sold", val: "47 Remaining" },
  { label: "Dubagga Corridor", val: "High-Growth Zone" },
  { label: "New Infrastructure Bills", val: "Boosting UP Real Estate" },
  { label: "NRI Investment in Lucknow", val: "+35% This Quarter" },
  { label: "100% Jila Panchayat Approved", val: "Legal Security" },
];

function BlogPage() {
  const hero = usePageContent("blog.hero", {
    eyebrow: "Editorial & Insights",
    title: "The",
    title_accent: "Legacy",
    title_suffix: "Journal",
    subtitle: "Expert perspectives on Lucknow real estate, land investment, architecture, and the art of building generational wealth.",
  });
  const [activeFilter, setActiveFilter] = useState("All");
  const [subscribed, setSubscribed] = useState(false);

  const filteredArticles =
    activeFilter === "All"
      ? articles
      : articles.filter((a) =>
          a.cat === activeFilter.toLowerCase().replace(/ & /g, " ").replace(/ /g, "")
            || a.cat === activeFilter.toLowerCase().split(" ")[0]
        );

  return (
    <div className="bg-[#04090f] text-white min-h-screen overflow-x-hidden selection:bg-[#00BFFF] selection:text-[#04090f]">

      {/* ── HERO with bg image ── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden pt-[88px]">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={String(hero.image_url || lucknowAerialImg)}
            alt="Blog Hero"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.22) saturate(0.6)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#04090f]/60 via-transparent to-[#04090f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/70 to-transparent" />
          {/* Cyan radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,191,255,0.06) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 px-6 md:px-12 pb-20 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-10 pt-7">
              <span className="w-8 h-px bg-[#00BFFF]" />
              <span className="text-[#00BFFF] text-[11px] uppercase tracking-[0.3em] font-bold pt-7">
                {String(hero.eyebrow || "Editorial & Insights")}
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-none tracking-tight text-white mb-6">
              {String(hero.title || "The")} <em className="text-[#00BFFF] italic">{String(hero.title_accent || "Legacy")}</em>
              <br />
              {String(hero.title_suffix || "Journal")}
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-lg leading-relaxed mb-10">
              {String(hero.subtitle || "Expert perspectives on Lucknow real estate, land investment, architecture, and the art of building generational wealth.")}
            </p>
            {/* Hero meta stats */}
            <div className="flex flex-wrap items-center gap-10 pt-8 border-t border-white/8">
              {[
                { label: "Published Articles", val: "48+" },
                { label: "Topics Covered", val: "6 Categories" },
                { label: "Monthly Readers", val: "12,000+" },
              ].map((m) => (
                <div key={m.label} className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-bold">{m.label}</span>
                  <span className="font-serif text-2xl text-[#00BFFF]">{m.val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <div className="sticky top-[72px] z-40 bg-[#060c16]/95 border-b border-white/5 px-6 md:px-12 py-4"
        style={{ backdropFilter: "blur(16px)" }}>
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mr-3">Filter</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-[11px] uppercase tracking-[0.12em] font-medium border transition-all duration-300 rounded-full ${
                activeFilter === cat
                  ? "border-[#00BFFF] text-[#00BFFF] bg-[#00BFFF]/10"
                  : "border-white/10 text-white/40 hover:border-[#00BFFF]/50 hover:text-[#00BFFF]/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Featured Stories ── */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-10 pb-5 border-b border-white/5">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/35 font-bold">Featured Stories</span>
            <span className="text-[11px] text-white/25">3 of 48</span>
          </div>
          <div className="grid md:grid-cols-5 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
            {/* Main featured */}
            <div className="md:col-span-3 relative overflow-hidden cursor-pointer group" style={{ aspectRatio: "4/3" }}>
              <img
                src={featuredArticles[0].img}
                alt={featuredArticles[0].title}
                className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                style={{ filter: "brightness(0.5)" }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/90 via-[#04090f]/20 to-transparent flex flex-col justify-end p-8 md:p-10">
                <span className="inline-block px-3 py-1 border border-[#00BFFF] text-[#00BFFF] text-[10px] uppercase tracking-[0.2em] mb-4 w-fit rounded-full">
                  {featuredArticles[0].cat}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-light text-white leading-tight mb-4">
                  {featuredArticles[0].title}
                </h2>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-white/50 text-xs">{featuredArticles[0].author}</span>
                  <span className="text-white/30 text-xs">{featuredArticles[0].date}</span>
                  <span className="text-[#00BFFF] text-[10px] uppercase tracking-[0.12em] ml-auto">
                    {featuredArticles[0].read} →
                  </span>
                </div>
              </div>
            </div>
            {/* Side cards */}
            <div className="md:col-span-2 flex flex-col">
              {featuredArticles.slice(1).map((art) => (
                <div
                  key={art.title}
                  className="relative flex-1 overflow-hidden cursor-pointer group border-t border-white/5 first:border-t-0"
                >
                  <img
                    src={art.img}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    style={{ filter: "brightness(0.45)", minHeight: 200 }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04090f]/90 to-transparent flex flex-col justify-end p-6">
                    <span className="inline-block px-3 py-1 border border-[#00BFFF] text-[#00BFFF] text-[9px] uppercase tracking-[0.2em] mb-3 w-fit rounded-full">
                      {art.cat}
                    </span>
                    <h3 className="font-serif text-lg font-light text-white leading-snug mb-2">{art.title}</h3>
                    <span className="text-white/30 text-[10px]">{art.date} · {art.read}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Ticker ── */}
      <div className="border-y border-[#00BFFF]/15 bg-[#00BFFF]/5 py-3 overflow-hidden">
        <div
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: "blog-ticker 30s linear infinite" }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF] shrink-0" />
              <span className="text-[#00BFFF] text-[11px] uppercase tracking-[0.12em]">{item.label}</span>
              <span className="text-white/35 text-[11px]">{item.val}</span>
            </div>
          ))}
        </div>
        <style>{`@keyframes blog-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* ── Articles Grid ── */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-10 pb-5 border-b border-white/5">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/35 font-bold">All Articles</span>
            <span className="text-[11px] text-white/25">Showing {filteredArticles.length} of 45</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
            {filteredArticles.length > 0 ? filteredArticles.map((art, i) => (
              <Reveal key={art.title} delay={i * 0.06}>
                <article className="bg-[#060c16] p-0 cursor-pointer group hover:bg-[#080d1a] transition-colors duration-300 relative flex flex-col h-full border-b border-white/5">
                  <div className="overflow-hidden">
                    <img
                      src={art.img}
                      alt={art.title}
                      className="w-full aspect-video object-cover transition-all duration-500 group-hover:brightness-100"
                      style={{ filter: "brightness(0.75)" }}
                      loading="lazy"
                    />
                  </div>
                  {/* Bottom accent line on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00BFFF] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                  <div className="p-7 flex flex-col flex-1">
                    <span className="text-[#00BFFF] text-[10px] uppercase tracking-[0.2em] font-bold mb-3 block">
                      {art.cat}
                    </span>
                    <h3 className="font-serif text-xl font-light text-white leading-snug mb-3 flex-1">
                      {art.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-6 font-light">{art.excerpt}</p>
                    <div className="flex items-center justify-between pt-5 border-t border-white/6">
                      <span className="text-white/30 text-[10px] tracking-wide">{art.date}</span>
                      <span className="text-[#00BFFF] text-[10px] uppercase tracking-[0.12em] flex items-center gap-1 group-hover:gap-3 transition-all duration-300">
                        Read More →
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            )) : (
              <div className="col-span-3 py-20 text-center text-white/30 text-sm">
                No articles in this category yet.
              </div>
            )}
          </div>

          {/* Load more */}
          <div className="flex justify-center mt-12">
            <button className="px-12 py-4 border border-[#00BFFF]/30 text-[#00BFFF] text-[11px] uppercase tracking-[0.2em] font-medium hover:border-[#00BFFF] hover:bg-[#00BFFF]/5 transition-all duration-300 rounded-full flex items-center gap-3">
              Load More Articles <span>↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-20 px-6 md:px-12 border-t border-white/5 bg-[#060c16]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <div>
              <span className="text-[#00BFFF] text-[10px] uppercase tracking-[0.3em] font-bold block mb-5">
                Stay Informed
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight text-white">
                The <em className="text-[#00BFFF] italic">Legacy Letter</em>
                <br />
                Every Fortnight
              </h2>
              <p className="text-white/45 text-sm mt-5 leading-relaxed font-light max-w-sm">
                Market intelligence, investment insights, and architectural inspiration —
                curated by TrustOn's experts and delivered straight to your inbox.
              </p>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <div className="flex flex-col gap-4">
              {subscribed ? (
                <div className="p-8 border border-[#00BFFF]/30 rounded-2xl text-center">
                  <p className="text-[#00BFFF] text-lg font-serif">Subscribed ✓</p>
                  <p className="text-white/40 text-sm mt-2">Thank you for joining The Legacy Letter.</p>
                </div>
              ) : (
                <>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">Subscribe to the Newsletter</p>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="bg-white/4 border border-white/10 text-white text-sm px-5 py-4 rounded-xl outline-none focus:border-[#00BFFF] transition-colors duration-300 placeholder:text-white/30"
                  />
                  <div className="flex gap-0">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-1 bg-white/4 border border-white/10 border-r-0 text-white text-sm px-5 py-4 rounded-l-xl outline-none focus:border-[#00BFFF] transition-colors duration-300 placeholder:text-white/30"
                    />
                    <button
                      onClick={() => setSubscribed(true)}
                      className="px-6 py-4 text-[11px] uppercase tracking-[0.12em] font-bold rounded-r-xl transition-all duration-300 whitespace-nowrap"
                      style={{ background: "#00BFFF", color: "#04090f" }}
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="text-white/25 text-[11px]">
                    No spam. Unsubscribe at any time. Trusted by 4,800+ investors &amp; homeowners.
                  </p>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
