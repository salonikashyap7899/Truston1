import { Reveal, SectionEyebrow } from "./Reveal";
import plotImg from "@/assets/plot-tracker.jpg";

export function PlotTracker() {
  const total = 150, sold = 45, booked = 20, available = 85;
  const pct = Math.round(((sold + booked) / total) * 100);

  return (
    <section id="estate" className="relative py-32 px-6 overflow-hidden bg-sand/40">
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>Prime Estate</SectionEyebrow>
          <h2 className="font-display text-5xl md:text-7xl text-center mb-4">
            Plot <em className="gradient-bronze-text not-italic">Tracker</em>
          </h2>
          <p className="text-center text-foreground/65 mb-16">
            Real-time availability status — updated for Phase 1 &amp; 2
          </p>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-px bg-border mb-12">
          {[
            { label: "Total Plots", value: total, sub: "Full Inventory" },
            { label: "Sold", value: sold, sub: "30% Complete" },
            { label: "Booked", value: booked, sub: "Processing" },
            { label: "Available", value: available, sub: "Ready to Book" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="bg-cream p-10 h-full hover-lift">
                <p className="text-[10px] uppercase tracking-luxe text-foreground/55">{s.label}</p>
                <p className="font-display text-6xl gradient-bronze-text my-4">{s.value}</p>
                <p className="text-xs text-foreground/55">{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="bg-cream rounded-md p-10 card-shadow relative overflow-hidden">
            <img src={plotImg} alt="" loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.08]" />
            <div className="relative">
              <div className="flex flex-wrap items-baseline justify-between mb-4">
                <p className="text-[11px] uppercase tracking-luxe text-foreground/60">Overall Status</p>
                <p className="font-serif text-3xl text-bronze">{pct}% Reserved</p>
              </div>
              <div className="h-2 rounded-full bg-sand overflow-hidden mb-6 relative">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "var(--gradient-bronze)" }} />
                <div className="absolute inset-0 shimmer rounded-full" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <Legend color="oklch(0.55 0.09 60)" label={`Sold (${sold})`} />
                <Legend color="oklch(0.72 0.07 70)" label={`Booked (${booked})`} />
                <Legend color="oklch(0.85 0.014 78)" label={`Available (${available})`} />
              </div>
              <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-serif text-2xl text-bronze">Fast-selling inventory.</p>
                  <p className="text-sm text-foreground/70 mt-1">
                    43% of Phase 1 is already reserved. Contact the sales team now.
                  </p>
                </div>
                <a href="tel:+919616061166" className="rounded-full bg-bronze text-cream px-7 py-3 text-[11px] uppercase tracking-luxe hover:soft-shadow transition-all">
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-foreground/65">
      <span className="inline-block w-3 h-3 rounded-full" style={{ background: color }} />
      {label}
    </div>
  );
}
