import { createFileRoute, Link } from "@tanstack/react-router";
import { InnerHero } from "@/components/InnerHero";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import projectImg from "@/assets/project-prime.jpg";
import { Section3DBackground } from "@/components/Section3DBackground";

export const Route = createFileRoute("/projects/$slug")({
  head: () => ({
    meta: [
      { title: "Prime Estate — Lucknow, Uttar Pradesh | TrustOn" },
      {
        name: "description",
        content:
          "Prime Estate — a Jila Panchayat approved residential plots colony in Lucknow with structured planning, wide internal roads, and clear documentation.",
      },
      { property: "og:title", content: "Prime Estate — Lucknow" },
      { property: "og:image", content: projectImg },
    ],
  }),
  component: Page,
});

const amenities = [
  "Wide Internal Roads",
  "24/7 Security Guard",
  "Piped Water Supply",
  "Electricity Connection",
  "Landscaped Parks",
  "Underground Drainage",
];

function Page() {
  return (
    <div className="bg-background text-foreground overflow-hidden">
      <InnerHero
        eyebrow="Flagship Development · Lucknow"
        title={
          <>
            Prime <em className="text-luxe-cyan not-italic font-serif italic">Estate.</em>
          </>
        }
        subtitle="Strategic infrastructure. Global standard amenities. A multi-billion dollar foundation for your future legacy."
        poster="/attached_assets/image_1779159211927.png"
        alt="Prime Estate Lucknow"
      />

      <section className="py-32 px-6 relative">
        <Section3DBackground opacity={0.1} />
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-20 items-start relative z-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-luxe-cyan" />
              <span className="text-luxe-cyan text-xs uppercase tracking-[0.4em] font-bold">
                Project Intelligence
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl text-white mb-10 leading-[0.9] tracking-tighter">
              Strategic Infrastructure <br />
              <em className="text-luxe-cyan italic font-serif">for Modern Legacy.</em>
            </h2>
            <p className="text-white/50 text-xl leading-relaxed mb-8 font-light">
              Prime Estate is a thoughtfully planned residential plots colony designed for those who
              want the freedom to build on their own terms. Located in a promising growth corridor,
              the project offers well-defined plots and essential infrastructure.
            </p>
            <p className="text-white/50 text-lg leading-relaxed mb-12 font-light">
              With clear planning and a focus on value appreciation, Prime Estate gives you the
              foundation to create a space that truly reflects your billion-dollar vision.
            </p>
            <ul className="grid grid-cols-2 gap-y-6 text-sm">
              {[
                "High Growth Intelligence",
                "Verified Documentation",
                "Strategic Yield Potential",
                "Planned Infrastructure",
                "Wide Internal Architecture",
                "Clear Plot Demarcation",
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 text-white/70 font-bold uppercase tracking-widest text-[10px]"
                >
                  <span className="w-2 h-2 rounded-full bg-luxe-cyan" /> {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[40px] overflow-hidden shadow-luxe">
              {[
                ["Engagement", "Elite Investors"],
                ["Category", "Residential"],
                ["Release", "January 2025"],
                ["System", "truston.com"],
              ].map(([k, v]) => (
                <div key={k} className="bg-ink/50 p-10 hover:bg-white/[0.03] transition-colors">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3 font-bold">
                    {k}
                  </p>
                  <p className="font-display text-2xl text-white tracking-tight">{v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-32 px-6 bg-ink relative">
        <Section3DBackground opacity={0.2} />
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
          {[
            ["120+", "Total Plots"],
            ["47", "Still Available"],
            ["2400", "Sq. Feet Range"],
            ["₹12L+", "Starting Unit"],
          ].map(([n, l]) => (
            <Reveal key={l}>
              <div className="group">
                <p className="font-display text-5xl md:text-7xl text-white tracking-tighter group-hover:scale-110 transition-transform duration-500 mb-4">
                  {n}
                </p>
                <div className="w-8 h-px bg-luxe-cyan/30 mx-auto mb-4 group-hover:w-16 group-hover:bg-luxe-cyan transition-all duration-700" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">
                  {l}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-center text-[10px] uppercase tracking-[0.5em] text-luxe-cyan/40 mt-20 font-bold relative z-10">
          Global Standards · Jila Panchayat Approved · Clear Title Deeds
        </p>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6 bg-[#060c16] relative">
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-px bg-luxe-cyan" />
              <span className="text-luxe-cyan text-xs uppercase tracking-[0.4em] font-bold">Project Gallery</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl text-white mb-12 tracking-tighter">
              Inside Prime <em className="text-luxe-cyan italic font-serif">Estate</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: "/assets/photo_1.jpg", label: "Main Entrance Gate" },
              { src: "/assets/photo_8.jpg", label: "Prime Estate Gate-02" },
              { src: "/assets/photo_5.jpg", label: "Internal Street Design" },
              { src: "/assets/photo_4.jpg", label: "Wide Internal Roads" },
              { src: "/assets/photo_6.jpg", label: "Landscaped Park & Play Area" },
              { src: "/assets/photo_7.jpg", label: "Aerial Township Overview" },
            ].map((img, i) => (
              <Reveal key={img.label} delay={i * 0.07}>
                <div className="relative overflow-hidden rounded-2xl group aspect-[4/3]">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060c16]/80 via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 text-white/70 text-xs uppercase tracking-[0.2em] font-bold">
                    {img.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 relative">
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow>Elite Amenities</SectionEyebrow>
            <h2 className="font-display text-5xl md:text-8xl text-center text-white mb-24 tracking-tighter leading-none">
              Strategic <em className="text-luxe-cyan italic font-serif">Living.</em>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((a, i) => (
              <Reveal key={a} delay={i * 0.05}>
                <div className="glass-premium p-10 h-full flex items-center gap-8 rounded-3xl border border-white/5 hover:border-luxe-cyan/30 transition-all duration-500">
                  <span className="font-display text-4xl text-luxe-cyan/20 leading-none">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-2xl text-white tracking-tight">{a}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-48 px-6 bg-ink text-center relative overflow-hidden">
        <Section3DBackground opacity={0.3} />
        <div className="mx-auto max-w-5xl relative z-10">
          <Reveal>
            <SectionEyebrow light>Limited Engagement</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-8xl mb-12 text-white tracking-tighter leading-none">
              Reserve your position at <br />
              <em className="text-luxe-cyan italic font-serif">Prime Estate.</em>
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-16">
              <button className="btn-magnetic btn-luxe px-16 py-5">Schedule Private Tour</button>
              <a
                href="tel:+919616061166"
                className="font-display text-4xl text-white hover:text-luxe-cyan transition-colors tracking-tight"
              >
                +91 96160-61166
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
