import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Award,
  Eye,
  MapPin,
  ShieldCheck,
  Zap,
  Layout,
  Maximize,
  ArrowRight,
  Play
} from "lucide-react";
import heroImg from "@/assets/hero-estate.jpg";
import projectImg from "@/assets/project-prime.jpg";
import architectImg from "@/assets/luxury-interior.jpg"; // Using interior as placeholder for leadership if needed

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
  return (
    <div className="bg-[#0A192F] text-white selection:bg-luxe-cyan selection:text-black">
      {/* 1. Hero Section with Breadcrumbs */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-[140px]">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="About Us Hero"
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 via-transparent to-[#0A192F]" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display uppercase tracking-tight mb-4"
          >
            About Us
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-3 text-sm uppercase tracking-widest text-white/60 font-bold"
          >
            <Link to="/" className="hover:text-luxe-cyan transition-colors">Home</Link>
            <span className="w-1.5 h-1.5 rounded-full bg-luxe-cyan" />
            <span className="text-white">About Us</span>
          </motion.div>
        </div>
      </section>

      {/* 2. About Our Company Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 text-luxe-cyan mb-6">
              <Users size={20} />
              <span className="text-xs uppercase tracking-[0.4em] font-bold">About Our Company</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display leading-tight mb-8">
              PRIME ESTATE – Own the Ground. Build Your Legacy
            </h2>
            <div className="w-20 h-1 bg-luxe-cyan mb-10" />
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Prime Estate is a trusted name in real estate development, built on a foundation of transparency, quality, and long-term vision. We don't just sell land; we craft opportunities.
            </p>
            <p className="text-white/60 text-lg leading-relaxed">
              Our flagship project, Prime Estate, is a Jila Panchayat approved township that combines legal security, prime location, and future-ready infrastructure.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-luxe-cyan/10 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src={projectImg}
              alt="Prime Estate Project"
              className="relative rounded-2xl border border-white/5 shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* 3. Visual Inspiration Section */}
      <section className="py-24 px-6 md:px-12 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
             <div className="absolute -inset-4 bg-luxe-blue/10 blur-2xl rounded-3xl" />
             <img
              src={architectImg}
              alt="Visual Inspiration"
              className="relative rounded-2xl border border-white/5 shadow-2xl"
            />
          </div>
          <div className="order-1 md:order-2">
            <div className="flex items-center gap-3 text-luxe-cyan mb-6">
              <Eye size={20} />
              <span className="text-xs uppercase tracking-[0.4em] font-bold">Visual Inspiration</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display leading-tight mb-8">
              3D-Visual Excellence
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              Experience your future before it's built. Our advanced 3D-architectural renderings provide a hyper-realistic preview of your legacy, ensuring every detail aligns with your vision of perfection.
            </p>

            <div className="space-y-4">
              {[
                { icon: <Zap size={18} />, label: "Real-Time Visualization" },
                { icon: <Target size={18} />, label: "Natural Lighting Effect" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-luxe-cyan/30 transition-colors">
                  <div className="text-luxe-cyan">{item.icon}</div>
                  <span className="font-bold tracking-wider text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Showcase */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-3 text-luxe-cyan mb-6">
            <Layout size={20} />
            <span className="text-xs uppercase tracking-[0.4em] font-bold">Interactive Showcase</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display mb-6">Explore Our Floor Plans</h2>
          <p className="text-white/40 max-w-2xl text-lg">
            Experience the flow of luxury through our hyper-realistic layout explorer.
          </p>
        </div>

        <div className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
          <img src={heroImg} className="w-full h-full object-cover brightness-50" alt="Floor Plan Preview" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
             <div className="bg-luxe-cyan p-6 rounded-full shadow-[0_0_30px_rgba(0,243,255,0.4)] hover:scale-110 transition-transform cursor-pointer">
                <Play fill="black" size={32} className="text-black ml-1" />
             </div>
             <p className="text-xs uppercase tracking-[0.5em] font-bold">Virtual Tour</p>
          </div>

          {/* Interactive UI Overlay from Ref */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row justify-between items-end gap-6 pointer-events-none">
            <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-left">
              <span className="text-[10px] uppercase tracking-widest text-luxe-cyan font-bold block mb-1">Estate Pricing</span>
              <p className="text-2xl font-display">Starting ₹4.5 Cr</p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-72 pointer-events-auto">
               {[
                 { label: "Premium Plots", sub: "1,500 - 3,000 SQ FT" },
                 { label: "Luxury Estates", sub: "5,000 - 10,000 SQ FT", active: true },
                 { label: "Corner Collection", sub: "Premium Obstructions" }
               ].map((opt, i) => (
                 <button key={i} className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${opt.active ? 'bg-luxe-cyan text-black border-luxe-cyan' : 'bg-black/40 backdrop-blur-md border-white/10 hover:border-luxe-cyan/50'}`}>
                   <div>
                     <p className="text-sm font-bold uppercase tracking-wider">{opt.label}</p>
                     <p className={`text-[10px] opacity-60 ${opt.active ? 'text-black' : 'text-white'}`}>{opt.sub}</p>
                   </div>
                   <ArrowRight size={16} />
                 </button>
               ))}
               <button className="w-full py-4 bg-white text-black rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                 <Target size={14} /> E-Brochure
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Performance (Counters) */}
      <section className="py-24 px-6 md:px-12 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 text-luxe-cyan mb-16">
            <Target size={20} />
            <span className="text-xs uppercase tracking-[0.4em] font-bold">Our Performance</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Layout />, val: "500+", label: "Luxury Plots Delivered" },
              { icon: <Users />, val: "12+", label: "Iconic Landmarks Built" },
              { icon: <ShieldCheck />, val: "15", label: "Years of Excellence" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-12 rounded-3xl flex flex-col items-center text-center group hover:bg-luxe-cyan/5 hover:border-luxe-cyan/20 transition-all duration-500">
                <div className="text-luxe-cyan mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                  {stat.icon}
                </div>
                <h3 className="text-6xl font-display mb-4">{stat.val}</h3>
                <p className="text-white/40 uppercase tracking-widest text-xs font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-luxe-cyan mb-16">
          <Users size={20} />
          <span className="text-xs uppercase tracking-[0.4em] font-bold">Trusted by Visionaries</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: "TrustOn doesn't just build structures, they curate lifestyles. The attention to detail in their 3D renderings and final execution is unmatched.",
              author: "Jonathan K.",
              role: "Corporate Executive"
            },
            {
              quote: "Investing with TrustOn was the best decision for my family's legacy. Their transparency and architectural vision are truly inspiring.",
              author: "Sarah L.",
              role: "Luxury Homeowner"
            }
          ].map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/5 p-12 rounded-3xl relative">
              <div className="w-16 h-16 rounded-full bg-white/10 mb-8 overflow-hidden">
                 {/* Avatar placeholder */}
              </div>
              <p className="text-xl font-serif italic text-white/80 leading-relaxed mb-8">"{t.quote}"</p>
              <div>
                <p className="font-bold uppercase tracking-widest text-sm mb-1">{t.author}</p>
                <p className="text-luxe-cyan text-xs uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Leadership Section */}
      <section className="py-24 px-6 md:px-12 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
           <div className="flex items-center gap-3 text-luxe-cyan mb-16">
            <Zap size={20} />
            <span className="text-xs uppercase tracking-[0.4em] font-bold">Our Leaders</span>
          </div>

          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-8">The People Leading Our Vision</h2>
            <button className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-3">
              Meet The Team <Play size={12} fill="black" />
            </button>
          </div>

          <div className="max-w-2xl mx-auto text-center">
             <div className="relative group mb-12">
                <div className="absolute -inset-4 bg-luxe-cyan/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10">
                   <img src={architectImg} className="w-full h-full object-cover" alt="Meraj Husain Rizvi" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                   <div className="absolute bottom-12 left-0 right-0">
                      <h3 className="text-4xl font-display mb-1">Meraj Husain Rizvi</h3>
                      <p className="text-luxe-cyan uppercase tracking-[0.3em] font-bold text-xs">Lead Architect</p>
                   </div>
                </div>
             </div>
             <p className="text-2xl font-serif italic text-white/60 leading-relaxed">
               "Architecture is not just about buildings, it's about the permanence of human legacy and the structural integrity of our visions."
             </p>
          </div>
        </div>
      </section>
    </div>
  );
}
