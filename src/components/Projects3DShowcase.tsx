import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

const projects = [
  {
    slug: "prime-estate-lucknow-uttar-pradesh",
    name: "Prime Estate",
    location: "Lucknow, Uttar Pradesh",
    type: "Residential",
    img: "https://truston.advrtisinguru.com/wp-content/uploads/2026/04/prime-estate-gate-image-672x448.jpeg",
    description: "A futuristic residential township designed for elite living.",
  },
  // Add more projects if available
];

export function Projects3DShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-32 px-6 bg-ink relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-luxe-blue rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-luxe-cyan rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="text-luxe-cyan text-xs uppercase tracking-[0.5em] font-medium mb-4 block">
                Portfolio
              </span>
              <h2 className="typography-section-title text-white">
                Billion Dollar <br />
                <em className="text-luxe-cyan italic font-serif">Masterpieces</em>
              </h2>
            </div>
            <Link
              to="/project"
              className="group flex items-center gap-4 text-white/60 hover:text-luxe-cyan transition-colors duration-500 uppercase tracking-widest text-[10px] font-bold"
            >
              View All Projects
              <span className="w-10 h-px bg-white/20 group-hover:bg-luxe-cyan transition-all duration-500 group-hover:w-16" />
            </Link>
          </div>
        </Reveal>

        <div className="relative h-[600px] md:h-[700px] group">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 rounded-[40px] overflow-hidden shadow-2xl border border-white/5"
            >
              <img
                src={projects[activeIndex].img}
                alt={projects[activeIndex].name}
                className="w-full h-full object-cover ken-burns brightness-75 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="max-w-xl">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <span className="px-3 py-1 bg-luxe-blue text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {projects[activeIndex].type}
                    </span>
                    <span className="text-white/60 text-xs uppercase tracking-widest">
                      {projects[activeIndex].location}
                    </span>
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 1 }}
                    className="font-display text-5xl md:text-7xl text-white mb-6"
                  >
                    {projects[activeIndex].name}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 0.9, duration: 1 }}
                    className="text-white text-lg font-light leading-relaxed mb-8"
                  >
                    {projects[activeIndex].description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 1 }}
                  >
                    <Link
                      to="/projects/$slug"
                      params={{ slug: projects[activeIndex].slug }}
                      className="btn-magnetic btn-luxe px-12"
                    >
                      View Details
                    </Link>
                  </motion.div>
                </div>

                {/* Project Controls */}
                <div className="flex gap-4">
                  {projects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`w-12 h-1 rounded-full transition-all duration-500 ${
                        activeIndex === i ? "bg-luxe-cyan w-24" : "bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Floating Luxury Elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-40 h-40 glass-premium rounded-full flex items-center justify-center hidden lg:flex border-luxe-blue/20"
          >
            <div className="text-luxe-cyan text-[10px] uppercase tracking-widest font-bold text-center">
              Luxury <br /> Blue
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
