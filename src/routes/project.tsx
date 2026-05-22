import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import projectImg from "@/assets/project-prime.jpg";
import interiorImg from "@/assets/luxury-interior.jpg";
import natureImg from "@/assets/hero-estate.jpg";
import aerialImg from "@/assets/lucknow-aerial.jpg";
import trackerImg from "@/assets/plot-tracker.jpg";

export const Route = createFileRoute("/project")({
  head: () => ({
    meta: [
      { title: "Project Showcase — TrustOn" },
      {
        name: "description",
        content: "Explore TrustOn's residential projects — Prime Estate in Lucknow, Uttar Pradesh.",
      },
    ],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  return (
    <div className="bg-[#0A192F] text-white overflow-hidden pt-[140px]">
      {/* Hero Header */}
      <section className="relative py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-luxe-cyan font-bold tracking-[0.5em] uppercase text-xs mb-6"
          >
            Our Masterpieces
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-9xl font-serif mb-12 tracking-tighter"
          >
            Prime <em className="text-luxe-cyan italic">Estate</em>
          </motion.h1>
        </div>
      </section>

      {/* 1+4 Premium Grid */}
      <section className="py-24 px-6 md:px-12 relative">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* LARGE FEATURE IMAGE (1) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:h-[800px] relative group overflow-hidden rounded-3xl shadow-2xl border border-white/5"
            >
              <img
                src={projectImg}
                alt="Prime Estate Main View"
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-12 left-12">
                <p className="text-luxe-cyan font-bold tracking-[0.4em] uppercase text-xs mb-4">Frontage</p>
                <h3 className="text-4xl md:text-6xl font-serif">Grand Entrance</h3>
              </div>
            </motion.div>

            {/* SMALL GRID IMAGES (4) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-8 lg:gap-12 h-full">
              {[
                { img: interiorImg, title: "Luxe Interior", label: "01" },
                { img: natureImg, title: "Green Vistas", label: "02" },
                { img: aerialImg, title: "Aerial View", label: "03" },
                { img: trackerImg, title: "Site Progress", label: "04" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  className="aspect-square relative group overflow-hidden rounded-2xl shadow-xl border border-white/5"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#0A192F]/40 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <p className="text-[10px] font-bold text-luxe-cyan tracking-[0.3em] mb-2">{item.label}</p>
                    <h4 className="text-xl md:text-2xl font-serif text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {item.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3D Animation Vibe Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-32 bg-white/5 relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
            An Architectural <br />
            <em className="text-luxe-cyan italic">Masterpiece</em> in Every Detail.
          </h2>
          <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed mb-12">
            Every inch of Prime Estate is designed to offer an unparalleled sense of luxury and belonging. From the moment you enter, you are surrounded by architectural excellence and natural beauty.
          </p>
          <div className="flex justify-center gap-12">
            <div>
              <p className="text-4xl font-serif text-luxe-cyan">0%</p>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold mt-2">Compromise</p>
            </div>
            <div>
              <p className="text-4xl font-serif text-luxe-cyan">100%</p>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold mt-2">Exclusivity</p>
            </div>
          </div>
        </div>

        {/* Decorative 3D elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-luxe-cyan/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-luxe-blue/5 blur-[120px] rounded-full pointer-events-none" />
      </motion.section>
    </div>
  );
}
