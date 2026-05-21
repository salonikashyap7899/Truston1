import { motion } from "framer-motion";

const amenities = [
  "Jila Panchayat Approved",
  "Clear Title Deeds",
  "Wide Internal Roads",
  "24/7 Security Guard",
  "Piped Water Supply",
  "Electricity Connection",
  "Landscaped Parks",
  "Underground Drainage",
  "Clear Plot Demarcation",
  "Phased Infrastructure",
  "Dubagga Growth Corridor",
  "Investment Ready",
];

function MarqueeRow({
  direction = "left",
  speed = 40,
}: {
  direction?: "left" | "right";
  speed?: number;
}) {
  const xStart = direction === "left" ? 0 : -1200;
  const xEnd = direction === "left" ? -1200 : 0;

  return (
    <div className="overflow-hidden py-3">
      <motion.div
        className="flex whitespace-nowrap gap-8"
        animate={{ x: [xStart, xEnd] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(2)].map((_, k) => (
          <div key={k} className="flex gap-8 shrink-0">
            {amenities.map((item, i) => (
              <span
                key={`${k}-${i}`}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white/70 text-xs uppercase tracking-[0.2em] font-medium hover:border-[var(--bronze)]/50 hover:text-white hover:bg-[var(--bronze)]/10 transition-all duration-500 cursor-default backdrop-blur-sm"
              >
                <span className="text-[var(--bronze)] text-[8px]">+</span>
                {item}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function AmenitiesMarquee() {
  return (
    <section className="relative py-16 md:py-20 bg-[var(--ink)] overflow-hidden" data-dark>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 px-6"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-[var(--bronze)]">
          Prime Estate Amenities
        </span>
        <h3 className="font-display text-3xl md:text-4xl text-white mt-4 font-light">
          Explore Our <em className="italic text-[var(--bronze)]">Premium</em> Offerings
        </h3>
      </motion.div>

      <MarqueeRow direction="left" speed={45} />
      <MarqueeRow direction="right" speed={50} />

      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--ink)] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--ink)] to-transparent pointer-events-none z-10" />
    </section>
  );
}
