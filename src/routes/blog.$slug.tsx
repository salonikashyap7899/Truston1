import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { ALL_ARTICLES } from "@/data/articles";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const article = ALL_ARTICLES.find((a) => a.slug === params.slug);
    return {
      meta: [
        { title: article ? `${article.title} — TrustOn` : "Article — TrustOn" },
        { name: "description", content: article?.excerpt ?? "TrustOn Developers — Real Estate Insights." },
      ],
    };
  },
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const { slug } = Route.useParams();
  const article = ALL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#04090f] flex items-center justify-center" style={{ paddingTop: "140px" }}>
        <div className="text-center">
          <p className="font-serif italic text-6xl text-[#00BFFF] mb-4">404</p>
          <h1 className="font-serif text-3xl text-white mb-4">Article not found</h1>
          <Link to="/blog" className="text-[#00BFFF] text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
            ← Back to The Legacy Journal
          </Link>
        </div>
      </div>
    );
  }

  const related = ALL_ARTICLES.filter(
    (a) => a.slug !== slug && a.catKey === article.catKey
  ).slice(0, 2);

  return (
    <div className="bg-[#04090f] text-white overflow-x-hidden min-h-screen" style={{ paddingTop: "100px" }}>

      {/* ── HERO ── */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src={article.img}
          alt={article.title}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.35) saturate(0.7)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04090f] via-[#04090f]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04090f]/60 via-transparent to-transparent" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 70% 40%, rgba(0,191,255,0.07) 0%, transparent 70%)" }}
        />

        <div className="absolute bottom-10 left-6 md:left-16 right-6 md:right-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-[#00BFFF] transition-colors mb-5 font-semibold"
            >
              ← The Legacy Journal
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 border border-[#00BFFF] text-[#00BFFF] text-[10px] uppercase tracking-[0.2em] rounded-full">
                {article.cat}
              </span>
              <span className="text-white/30 text-xs">{article.read}</span>
            </div>
            <h1 className="font-serif text-[clamp(28px,4.5vw,54px)] font-light leading-[1.1] text-white tracking-tight">
              {article.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── META BAR ── */}
      <div className="border-b border-white/8 bg-[#060c16]">
        <div className="max-w-3xl mx-auto px-6 md:px-0 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="w-9 h-9 rounded-full bg-[#00BFFF]/15 border border-[#00BFFF]/30 flex items-center justify-center shrink-0">
              <span className="text-[#00BFFF] text-xs font-bold">T</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-none">{article.author}</p>
              <p className="text-white/35 text-[11px] mt-1">{article.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-[0.12em] text-white/30 bg-white/5 border border-white/8 px-2.5 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── ARTICLE BODY ── */}
      <article className="max-w-3xl mx-auto px-6 md:px-0 py-16">
        {/* Lead excerpt */}
        <Reveal>
          <p className="font-serif text-xl md:text-2xl text-white/70 leading-relaxed font-light mb-12 pb-12 border-b border-white/8 italic">
            {article.excerpt}
          </p>
        </Reveal>

        {/* Paragraphs */}
        <div className="space-y-7">
          {article.body.map((para, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <p className="text-white/65 text-base leading-[1.9] font-light">
                {para}
              </p>
            </Reveal>
          ))}
        </div>

        {/* ── CTA STRIP ── */}
        <Reveal>
          <div className="mt-16 rounded-2xl border border-[#00BFFF]/20 bg-[#00BFFF]/5 p-8 text-center">
            <p className="text-[#00BFFF] text-[11px] uppercase tracking-[0.3em] font-bold mb-3">
              Interested in Prime Estate?
            </p>
            <h3 className="font-serif text-2xl text-white mb-4">
              Talk to our team — <em className="text-[#00BFFF] italic">no obligations.</em>
            </h3>
            <p className="text-white/45 text-sm mb-6">
              Plots starting at ₹12 Lakhs. Jila Panchayat approved. 47 available now.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+919616061166"
                className="px-8 py-3.5 rounded-full text-[12px] font-bold tracking-[0.1em] uppercase transition-all hover:opacity-85"
                style={{ background: "#00BFFF", color: "#04090f" }}
              >
                Call +91 96160-61166
              </a>
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-full text-[12px] font-bold tracking-[0.1em] uppercase border border-white/20 text-white/70 hover:border-[#00BFFF]/50 hover:text-[#00BFFF] transition-all"
              >
                Send Enquiry
              </Link>
            </div>
          </div>
        </Reveal>
      </article>

      {/* ── RELATED ARTICLES ── */}
      {related.length > 0 && (
        <section className="py-16 px-6 md:px-16 border-t border-white/8 bg-[#060c16]">
          <div className="max-w-[1180px] mx-auto">
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/30 mb-8">
              More in {article.cat}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  to="/blog/$slug"
                  params={{ slug: rel.slug }}
                  className="flex gap-5 group"
                >
                  <div className="w-28 h-20 shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={rel.img}
                      alt={rel.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: "brightness(0.6)" }}
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[#00BFFF] text-[10px] uppercase tracking-[0.15em] font-bold mb-1">{rel.cat}</span>
                    <h4 className="font-serif text-white text-sm leading-snug group-hover:text-[#00BFFF] transition-colors">
                      {rel.title}
                    </h4>
                    <span className="text-white/30 text-[10px] mt-1">{rel.date}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/15 text-white/50 text-[12px] uppercase tracking-[0.12em] font-semibold hover:border-[#00BFFF]/40 hover:text-[#00BFFF] transition-all"
              >
                ← All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
