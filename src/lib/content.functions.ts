import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { Json } from "@/integrations/supabase/types";

const MEDIA_BUCKET = process.env.SUPABASE_MEDIA_BUCKET || "site-media";

type ContentBlock = {
  id: string;
  key: string;
  label: string;
  data: Json;
  created_at: string;
  updated_at: string;
};

type SaveContentPayload = { key: string; label: string; data: Json };
type UploadMediaPayload = { filename: string; contentType: string; base64: string };

function assertString(value: unknown, name: string): string {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${name} must be a non-empty string`);
  return value.trim();
}
function assertJson(value: unknown): Json {
  if (value === undefined) throw new Error("data must be JSON serializable");
  return value as Json;
}

/** ─── ALL DEFAULT CONTENT BLOCKS FOR EVERY PAGE ─── */
const DEFAULT_BLOCKS: { key: string; label: string; data: Record<string, unknown> }[] = [
  // ── HOME PAGE ──────────────────────────────────────────────────
  {
    key: "home.hero",
    label: "Home — Hero",
    data: {
      title: "TRUST",
      title_accent: "ON",
      subtitle: "Own the Ground. Build the Legacy.",
      video_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4",
      image_url: "",
    },
  },
  {
    key: "home.gallery",
    label: "Home — Gallery Section",
    data: {
      heading: "Living place that becomes",
      heading_accent: "your pride",
      img_1_src: "/assets/building-plots.jpg",
      img_1_alt: "Prime Estate — Aerial View",
      img_2_src: "/assets/gallery/prime-club.jpg",
      img_2_alt: "Prime Club House",
      img_3_src: "/assets/gallery/prime-road.jpg",
      img_3_alt: "Prime Roads",
      img_4_src: "/assets/gallery/prime-boulevard.jpg",
      img_4_alt: "Prime Boulevard",
      img_5_src: "/assets/gallery/prime-street.jpg",
      img_5_alt: "Prime Street",
      images: [
        { src: "/assets/building-plots.jpg", alt: "Prime Estate — Aerial View", video_url: "" },
        { src: "/assets/gallery/prime-club.jpg", alt: "Prime Club House", video_url: "" },
        { src: "/assets/gallery/prime-road.jpg", alt: "Prime Roads", video_url: "" },
        { src: "/assets/gallery/prime-boulevard.jpg", alt: "Prime Boulevard", video_url: "" },
        { src: "/assets/gallery/prime-street.jpg", alt: "Prime Street", video_url: "" },
      ],
    },
  },
  {
    key: "home.prime_estate",
    label: "Home — Prime Estate Project",
    data: {
      eyebrow: "Flagship Project",
      title: "Prime",
      title_accent: "Estate",
      body: "A masterfully planned residential plot colony at Dubagga, Lucknow — designed for those who want the freedom to build on their own terms, in a location primed for significant growth.",
      stat_1_val: "120", stat_1_sup: "+", stat_1_label: "Total Plots",
      stat_2_val: "47",  stat_2_sup: "",  stat_2_label: "Available Now",
      stat_3_val: "2,400", stat_3_sup: "", stat_3_label: "Sq. Ft Range",
      stat_4_val: "₹12",  stat_4_sup: "L+", stat_4_label: "Starting Price",
      image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_1_2026-05-25_19-38-16-cw2VCtfJrtIWHFnZ75BKIzp9ddykUQ.jpg",
      video_url: "",
      amenities: [
        { icon: "⚡", title: "24/7 Power Backup", desc: "Uninterrupted electricity supply through dedicated infrastructure" },
        { icon: "💧", title: "Water Supply", desc: "Borewell + municipal water with dedicated distribution network" },
        { icon: "🛡️", title: "Boundary Wall & Gate", desc: "Complete perimeter security with manned entry and exit points" },
        { icon: "🛣️", title: "Wide Internal Roads", desc: "25–30 ft wide roads enabling easy internal movement and high resale appeal" },
        { icon: "🌳", title: "Green Spaces", desc: "Dedicated parks, open areas and landscaped zones for community wellbeing" },
        { icon: "📋", title: "JP Approved", desc: "Full Jila Panchayat approval with clear title deeds — 100% legally verified" },
        { icon: "🏪", title: "Commercial Zone", desc: "Dedicated area for shops and local commerce within the colony" },
        { icon: "🔐", title: "CCTV Surveillance", desc: "Camera coverage at all entry/exit points for community safety" },
      ],
    },
  },
  {
    key: "prime_estate.phases",
    label: "Prime Estate — Development Phases",
    data: {
      heading: "Structured in Two Phases",
      phases: [
        {
          active: true,
          badge: "Now Available",
          num: "01",
          title: "Phase One",
          desc: "Ready for possession with complete plot demarcation, road leveling, and drainage planning. Buyers can begin construction immediately with Jila Panchayat approval in hand.",
          items: [
            "Fully demarcated plots",
            "Road leveling complete",
            "Drainage infrastructure ready",
            "Electricity & water connections live",
            "Clear title deeds available",
          ],
        },
        {
          active: false,
          badge: "Coming Soon",
          num: "02",
          title: "Phase Two",
          desc: "In active development, expanding the colony with additional plots and enhanced amenities. Register interest now to secure priority booking at launch pricing.",
          items: [
            "Extended plot sizes available",
            "Landscaped green zones",
            "Enhanced security systems",
            "Community park & walkways",
            "Pre-booking open now",
          ],
        },
      ],
    },
  },
  {
    key: "home.projects",
    label: "Home — Projects Portfolio",
    data: {
      eyebrow: "Our Projects",
      title: "Flagship",
      title_accent: "Developments",
      items: [
        {
          name: "Prime Estate",
          slug: "prime-estate",
          phase: "Phase 1",
          status: "Active",
          location: "Dubagga, Lucknow",
          total_plots: "120+",
          available: "47",
          starting_price: "₹12L+",
          image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_1_2026-05-25_19-38-16-cw2VCtfJrtIWHFnZ75BKIzp9ddykUQ.jpg",
          video_url: "",
          badge: "Flagship",
        },
      ],
    },
  },
  {
    key: "home.plots_structures",
    label: "Home — Plots & Structures",
    data: {
      eyebrow: "Strategic Masterpieces",
      title: "Building",
      title_accent: "Plots & Structures",
      body: "Discover the ultimate foundation for your architectural dreams. Our premium building plots are strategically located in Lucknow's most promising corridors, offering 100% legal clearance and Jila Panchayat approval.",
      stat_1_val: "150+", stat_1_label: "Premium Plots",
      stat_2_val: "Elite", stat_2_label: "Architectural Support",
    },
  },
  {
    key: "home.testimonials",
    label: "Home — Testimonials",
    data: {
      eyebrow: "Client Narratives",
      title: "Distinguished",
      title_accent: "Partnerships",
      subtitle: "Voices of excellence from our growing network of homeowners, investors, and partners.",
      cta_text: "Join the future of luxury real estate.",
      items: [
        { name: "Ramesh Verma", designation: "Plot Owner, Phase 1", description: "I was skeptical about buying a plot but Prime Estate's team walked me through every document. The land is approved, the location is growing, and the process was completely transparent.", profile_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop", video_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4" },
        { name: "Anil Singh", designation: "Homeowner", description: "We not only bought our plot from Prime Estate, but also got our home designed by their architecture team. The designs were exactly what we imagined — beautiful and within budget.", profile_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop", video_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4" },
        { name: "Mohammed Irfan", designation: "Channel Partner", description: "As a channel partner, I have referred over 20 clients to Prime Estate. The team is responsive, the commission structure is fair, and the product is genuinely good.", profile_image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop", video_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4" },
        { name: "Priya Sharma", designation: "Investor, Phase 2", description: "I invested in two plots as a long-term asset. TrustOn's team gave me honest ROI projections, explained the infrastructure timeline clearly, and has been available every step of the way.", profile_image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop", video_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4" },
        { name: "Vivek Tiwari", designation: "Plot Owner — Dubagga", description: "The location of Prime Estate is genuinely strategic. Within months of buying, I could already see infrastructure work picking up nearby. TrustOn delivered exactly what they promised.", profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop", video_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4" },
        { name: "Suman Mishra", designation: "NRI Investor", description: "Managing property from abroad felt risky — but TrustOn handled everything remotely. Clear documentation, video walkthroughs, and a team that actually picks up the phone.", profile_image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop", video_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4" },
        { name: "Deepak Pandey", designation: "First-Time Buyer", description: "As a first-time buyer, I had hundreds of questions. The TrustOn team never made me feel rushed. They educated me, showed me options, and helped me make a confident decision.", profile_image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop", video_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4" },
      ],
    },
  },
  {
    key: "about.videos",
    label: "About — Video Gallery",
    data: {
      eyebrow: "Our Story",
      heading: "See What We",
      heading_accent: "Stand For",
      items: [
        { label: "Project Walkthrough", tag: "Infrastructure Tour", badge: "On Site", video_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4" },
        { label: "Plot Handover", tag: "Happy Buyers", badge: "Milestone", video_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4" },
        { label: "Construction Update", tag: "Phase 1 Progress", badge: "Update", video_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4" },
        { label: "Community Vision", tag: "Development", badge: "Future", video_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4" },
        { label: "Site Visit", tag: "Prime Estate", badge: "Live", video_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202026-05-22%20at%2010.03.14%20PM-QaTFrXd8V3Y9wkvJT59K1CIHabjmqa.mp4" },
      ],
    },
  },
  {
    key: "home.stats",
    label: "Home — Stats Bar",
    data: {
      items: [
        { num: 150, suffix: "+", label: "Premium Plots", desc: "Carefully selected" },
        { num: 25, suffix: "%", label: "Land Appreciation", desc: "Year-on-year growth" },
        { num: 5, suffix: "+", label: "Years of Trust", desc: "Proven track record" },
        { num: 100, suffix: "%", label: "Legal Clearance", desc: "Fully documented" },
      ],
    },
  },
  {
    key: "home.marquee",
    label: "Home — Marquee Banner",
    data: {
      words: [
        "Cinematic Living",
        "Editorial Architecture",
        "Premium Plots",
        "Jila Panchayat Approved",
        "Legacy Investments",
        "Prime Location",
        "Transparent Dealings",
      ],
    },
  },
  {
    key: "home.redefining",
    label: "Home — Redefining Luxury",
    data: {
      eyebrow: "Welcome to the Era of TrustOn",
      title: "Redefining",
      title_accent: "Luxury",
      subtitle: "Real Estate",
      body: "Where we blend cinematic storytelling with architectural excellence. Our mission is to create billion-dollar luxury experiences that transcend traditional real estate.",
      body_secondary: "From interactive 3D environments to immersive lifestyle offerings, every detail is crafted for the elite.",
    },
  },
  {
    key: "home.who_we_are",
    label: "Home — Who We Are",
    data: {
      eyebrow: "Who We Are",
      title: "Shaping",
      title_accent: "Legacies",
      subtitle: "in Lucknow",
      body: "Truston Developers is a Lucknow-based property development company built on a single founding principle — that buying land should be simple, transparent, and deeply empowering for the buyer.",
      body_secondary: "We don't merely sell plots; we help you make one of the most significant decisions of your life with complete clarity, verified documentation, and a team that stands behind every commitment.",
      morning_image: "/assets/morning-image.jpeg",
      night_image: "/assets/night-image.jpeg",
      images: [
        { src: "/assets/morning-image.jpeg", alt: "Prime Estate — Morning View", video_url: "" },
        { src: "/assets/night-image.jpeg", alt: "Prime Estate — Night View", video_url: "" },
      ],
      quote: "We build the foundation. You build the dream.",
      pillars: [
        { num: "01", title: "Transparent Documentation", desc: "Clear title deeds, Jila Panchayat approvals, and zero hidden conditions." },
        { num: "02", title: "High-Growth Locations", desc: "Projects in proven corridors with verified infrastructure and appreciation potential." },
        { num: "03", title: "End-to-End Partnership", desc: "From plot acquisition to construction — one trusted team, start to finish." },
      ],
    },
  },
  {
    key: "home.philosophy",
    label: "Home — Philosophy",
    data: {
      eyebrow: "Our Philosophy",
      title: "Crafting",
      title_accent: "Timeless",
      subtitle: "Legacies",
      body: "TrustOn stands at the intersection of architectural brilliance and strategic investment. We don't just sell plots; we provide the foundation for your future aspirations.",
      body_secondary: "Our commitment to quality and transparency ensures that every square foot you own is a testament to enduring luxury — built to outlast trends and appreciate with time.",
      image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-05-25_23-25-53-thbQTIwazkPXtZmxwz9M0Fc8S5PCNo.jpg",
    },
  },
  {
    key: "home.new_generation",
    label: "Home — New Generation (Intro Highlight)",
    data: {
      eyebrow: "New Generation",
      title: "Redefining",
      title_accent: "Luxury",
      subtitle: "Real Estate",
      body: "Welcome to the era of TrustOn, where we blend cinematic storytelling with architectural excellence. Our mission is to create billion-dollar luxury experiences that transcend traditional real estate.",
      body_secondary: "From interactive 3D environments to immersive lifestyle offerings, every detail is crafted for the elite.",
      cta_label: "Discover Our Vision",
      accent_label: "Innovation",
      accent_body: "Pioneering futuristic living through architectural mastery.",
      images: [
        { src: "/assets/green-amenities.jpg", alt: "Prime Estate 1", video_url: "" },
        { src: "/assets/photo_2.jpg", alt: "Prime Estate 2", video_url: "" },
        { src: "/assets/photo_3.jpg", alt: "Prime Estate 3", video_url: "" },
        { src: "/assets/photo_4.jpg", alt: "Prime Estate 4", video_url: "" },
      ],
    },
  },
  {
    key: "home.services",
    label: "Home — Services (Four Pillars)",
    data: {
      eyebrow: "What We Offer",
      title: "Four Pillars of",
      title_accent: "Our Expertise",
      body: "Truston Developers is your complete real estate ecosystem in Lucknow. Whether you're buying land, building a home, seeking investment guidance, or designing your dream space, we bring deep local knowledge and end-to-end capability.",
      cards: [
        { num: "01", name: "Plot Selling", desc: "Residential land parcels in Lucknow's high-growth corridors. Jila Panchayat approvals, clear title deeds, and complete legal documentation — every plot backed by full transparency.", linkText: "Explore Plots" },
        { num: "02", name: "Construction", desc: "Full home construction — from foundation to finishing. Quality materials, experienced teams, and complete transparency at every phase with on-time delivery guaranteed.", linkText: "Build With Us" },
        { num: "03", name: "Investment Consultancy", desc: "Expert land investment guidance for first-time buyers, NRIs, and seasoned investors. ROI assessments, location analysis, and long-term portfolio strategy crafted for Lucknow's real estate landscape.", linkText: "Grow Your Assets" },
        { num: "04", name: "Architecture & Design", desc: "In-house architectural planning tailored to your vision. Concept layouts, elevation designs, complete blueprint documentation — bringing your idea of home to life before a single brick is laid.", linkText: "Design Your Space" },
      ],
    },
  },
  {
    key: "home.why_truston",
    label: "Home — Why Truston",
    data: {
      eyebrow: "The Truston Difference",
      title: "Why Buyers Choose",
      title_accent: "Truston",
      reasons: [
        { num: "01", title: "100% Legal Documentation", desc: "Every plot we sell comes with complete title documentation, Jila Panchayat approval, and thorough legal vetting. Buyers can access and review all documents before any purchase commitment." },
        { num: "02", title: "Strategic Location Selection", desc: "We operate only in proven growth corridors — areas backed by data on infrastructure investment, connectivity improvements, and historical appreciation trends." },
        { num: "03", title: "End-to-End Ecosystem", desc: "From the initial plot purchase to architectural design and full home construction — we are your single, trusted partner throughout the entire journey of building your legacy." },
        { num: "04", title: "Buyer-First Pricing", desc: "Transparent, fixed pricing with no hidden charges. Our sales process begins with education, not pressure — ensuring you understand exactly what you're paying for." },
        { num: "05", title: "Community & Appreciation", desc: "Prime Estate is designed as a living community — not just a land sale. Wide roads, boundary walls, green spaces, and managed infrastructure ensure the value of your investment only grows." },
      ],
    },
  },
  {
    key: "home.cta",
    label: "Home — Call to Action",
    data: {
      eyebrow: "47 Plots Still Available · Prime Estate · Dubagga",
      title: "Ready to Claim",
      title_accent: "Your Plot?",
      body: "Prices starting at ₹12 Lakhs. Talk to our team today — no obligations, just complete clarity about your investment.",
    },
  },

  // ── ABOUT PAGE ─────────────────────────────────────────────────
  {
    key: "about.hero",
    label: "About Us — Hero",
    data: {
      eyebrow: "About Truston Developers",
      title: "Own the Ground.",
      title_accent: "Build the Legacy.",
      subtitle: "A real estate company rooted in Lucknow's growth story — building trust, one plot at a time since 2025.",
      image_url: "",
    },
  },
  {
    key: "about.stats",
    label: "About Us — Stats Bar",
    data: {
      stat_1_val: "1+",   stat_1_label: "Active Projects",
      stat_2_val: "4",    stat_2_label: "Core Services",
      stat_3_val: "100%", stat_3_label: "JP Approved Plots",
      stat_4_val: "2025", stat_4_label: "Established",
    },
  },
  {
    key: "about.mission",
    label: "About Us — Mission & Vision",
    data: {
      eyebrow: "Our Story",
      title: "We Don't Just",
      title_accent: "Sell Land",
      body: "TrustOn was born from a simple yet powerful idea — that land ownership in India should be transparent, empowering, and accessible to families who dream of building something lasting. Our flagship project, Prime Estate at Dubagga, is where that vision lives.",
      body_secondary: "Every plot we develop is Jila Panchayat approved, legally vetted, and selected for long-term value creation. We're not just developing land — we're building the foundation for Lucknow's next generation of homeowners and investors.",
      mission: "To democratise transparent land ownership in Uttar Pradesh by delivering fully legal, premium residential plots with complete buyer confidence.",
      vision: "To become Lucknow's most trusted name in real estate development — the company families recommend to families, generation after generation.",
      commitment: "Zero hidden conditions. Every document verified. Every promise kept. Our name is our commitment.",
    },
  },
  {
    key: "about.team",
    label: "About Us — Team",
    data: {
      eyebrow: "Our Team",
      title: "The People Behind",
      title_accent: "TrustOn",
      member_1_name: "Meraj Husain Rizvi",
      member_1_role: "Lead Architect",
      member_1_desc: "Meraj leads TrustOn's architecture and design division, bringing a meticulous eye for detail and deep expertise in residential planning. His work ensures every plot and structure meets the highest standards of design and regulatory compliance.",
      member_2_name: "TrustOn Founders",
      member_2_role: "Development & Operations",
      member_2_desc: "The founding team behind TrustOn brings together decades of combined experience in land acquisition, infrastructure development, and real estate investment across Uttar Pradesh.",
    },
  },
  {
    key: "about.process",
    label: "About Us — Process",
    data: {
      eyebrow: "How We Work",
      title: "How We Deliver",
      title_accent: "Excellence",
      step_1_title: "Site Visit & Consultation",
      step_1_desc: "We start by understanding your needs and showing you the plot in person. Complete transparency from the very first meeting.",
      step_2_title: "Legal Review & Approval",
      step_2_desc: "Our legal team reviews all documents — title deeds, JP approvals, and compliance certificates — before any commitment is made.",
      step_3_title: "Documentation & Registration",
      step_3_desc: "We handle the complete paperwork process — from registry to mutation — ensuring your ownership is clean and undisputed.",
      step_4_title: "Handover & After-Sales",
      step_4_desc: "Plot handover with full boundary marking, possession letter, and continued support for construction planning if needed.",
    },
  },

  // ── SERVICES PAGE ───────────────────────────────────────────────
  {
    key: "services.hero",
    label: "Services — Hero",
    data: {
      eyebrow: "Complete Real Estate Ecosystem",
      title: "Our",
      title_accent: "Services",
      subtitle: "From land acquisition to handover, TrustOn provides a complete ecosystem of real estate services. One trusted partner, every step of your journey.",
      image_url: "",
    },
  },
  {
    key: "services.main",
    label: "Services — Main Content",
    data: {
      eyebrow: "Everything Under One Roof",
      title: "Four Services.",
      title_accent: "One Complete Solution.",
      body: "Each service is designed to work seamlessly with the others — so your journey from plot selection to home handover is smooth, transparent, and expertly managed.",
    },
  },
  {
    key: "services.cta",
    label: "Services — Call to Action",
    data: {
      eyebrow: "Your Journey Starts Here",
      title: "Ready to Begin Your",
      title_accent: "Journey?",
      body: "Book a free 30-minute consultation with our team. No obligations — just honest advice about your options.",
    },
  },

  // ── CONTACT PAGE ────────────────────────────────────────────────
  {
    key: "contact.hero",
    label: "Contact — Hero",
    data: {
      eyebrow: "Get in Touch",
      title: "Let's Start a",
      title_accent: "Conversation",
      subtitle: "Whether you're buying a plot, building a home, or exploring investment opportunities — our team responds within 2 hours.",
      image_url: "",
    },
  },
  {
    key: "contact.info",
    label: "Contact — Info & Address",
    data: {
      phone: "+91 96160-61166",
      email: "trustondevelopers01@gmail.com",
      address: "UGF, Apple Plaza, Next To HDFC Bank, Hardoi Road, Lucknow — 226003",
      hours: "Mon–Sat: 9 AM – 7 PM",
      whatsapp: "919616061166",
    },
  },

  // ── PLOTS INVENTORY ─────────────────────────────────────────────
  {
    key: "plots.inventory",
    label: "Plots & Projects — Full Inventory",
    data: {
      plots: [
        { id: "A-07",   project: "Prime Estate",  phase: "Phase I & II",              type: "corner",      status: "available", areaSqFt: 720,  priceL: 21.6, dim: "30 × 24 m",    face: "North-East", road: "24 m",    price: "₹ 21.6 L", per: "₹ 3,000 / sq ft · JP Approved", tag: "Featured · Best Value"  },
        { id: "B-03",   project: "Prime Estate",  phase: "Phase I · Sector 8",        type: "residential", status: "available", areaSqFt: 450,  priceL: 13.5, dim: "25 × 18 m",    face: "North",      road: "18 m",    price: "₹ 13.5 L", per: "₹ 2,400 / sq ft",               tag: "Available"               },
        { id: "C-01",   project: "Prime Estate",  phase: "NH-19 Corridor",            type: "commercial",  status: "available", areaSqFt: 600,  priceL: 19.2, dim: "30 × 20 m",    face: "East",       road: "Highway", price: "₹ 19.2 L", per: "₹ 3,200 / sq ft",               tag: "Commercial"              },
        { id: "D-11",   project: "Prime Estate",  phase: "Phase II · Green Township", type: "corner",      status: "available", areaSqFt: 380,  priceL: 12.0, dim: "20 × 19 m",    face: "South",      road: "2 Roads", price: "₹ 12 L",   per: "₹ 2,500 / sq ft · Starter",    tag: "Corner Plot"             },
        { id: "E-05",   project: "Prime Estate",  phase: "Phase I · Central Block",   type: "residential", status: "available", areaSqFt: 540,  priceL: 16.2, dim: "27 × 20 m",    face: "West",       road: "20 m",    price: "₹ 16.2 L", per: "₹ 3,000 / sq ft",               tag: "Available"               },
        { id: "F-02",   project: "Prime Estate",  phase: "Phase I · Prime Block",     type: "corner",      status: "sold",      areaSqFt: 860,  priceL: 28.0, dim: "40 × 21.5 m",  face: "North-West", road: "30 m",    price: "₹ 28 L",   per: "Sold",                           tag: "Premium Corner"          },
        { id: "A-08",   project: "Prime Estate",  phase: "Phase I & II",              type: "residential", status: "available", areaSqFt: 500,  priceL: 15.0, dim: "25 × 20 m",    face: "North",      road: "18 m",    price: "₹ 15 L",   per: "₹ 3,000 / sq ft",               tag: "Available"               },
        { id: "A-09",   project: "Prime Estate",  phase: "Phase I & II",              type: "residential", status: "reserved",  areaSqFt: 480,  priceL: 14.4, dim: "24 × 20 m",    face: "East",       road: "18 m",    price: "₹ 14.4 L", per: "₹ 3,000 / sq ft",               tag: "Reserved"                },
        { id: "B-04",   project: "Prime Estate",  phase: "Phase I · Sector 8",        type: "residential", status: "available", areaSqFt: 450,  priceL: 13.5, dim: "25 × 18 m",    face: "South",      road: "18 m",    price: "₹ 13.5 L", per: "₹ 2,400 / sq ft",               tag: "Available"               },
        { id: "B-05",   project: "Prime Estate",  phase: "Phase I · Sector 8",        type: "corner",      status: "available", areaSqFt: 610,  priceL: 18.3, dim: "31 × 19.7 m",  face: "North-East", road: "2 Roads", price: "₹ 18.3 L", per: "₹ 3,000 / sq ft",               tag: "Corner Plot"             },
        { id: "C-02",   project: "Prime Estate",  phase: "NH-19 Corridor",            type: "commercial",  status: "reserved",  areaSqFt: 650,  priceL: 20.8, dim: "32 × 20 m",    face: "West",       road: "Highway", price: "₹ 20.8 L", per: "₹ 3,200 / sq ft",               tag: "Reserved"                },
        { id: "C-03",   project: "Prime Estate",  phase: "NH-19 Corridor",            type: "commercial",  status: "available", areaSqFt: 600,  priceL: 19.2, dim: "30 × 20 m",    face: "East",       road: "Highway", price: "₹ 19.2 L", per: "₹ 3,200 / sq ft",               tag: "Commercial"              },
        { id: "D-12",   project: "Prime Estate",  phase: "Phase II · Green Township", type: "residential", status: "available", areaSqFt: 400,  priceL: 10.0, dim: "20 × 20 m",    face: "North",      road: "16 m",    price: "₹ 10 L",   per: "₹ 2,500 / sq ft · Starter",    tag: "Available"               },
        { id: "D-13",   project: "Prime Estate",  phase: "Phase II · Green Township", type: "corner",      status: "available", areaSqFt: 390,  priceL: 12.4, dim: "21 × 18.5 m",  face: "South-East", road: "2 Roads", price: "₹ 12.4 L", per: "₹ 3,180 / sq ft",               tag: "Corner Plot"             },
        { id: "E-06",   project: "Prime Estate",  phase: "Phase I · Central Block",   type: "residential", status: "sold",      areaSqFt: 540,  priceL: 16.2, dim: "27 × 20 m",    face: "West",       road: "20 m",    price: "₹ 16.2 L", per: "Sold",                           tag: "Sold Out"                },
        { id: "E-07",   project: "Prime Estate",  phase: "Phase I · Central Block",   type: "residential", status: "available", areaSqFt: 560,  priceL: 16.8, dim: "28 × 20 m",    face: "East",       road: "20 m",    price: "₹ 16.8 L", per: "₹ 3,000 / sq ft",               tag: "Available"               },
        { id: "F-03",   project: "Prime Estate",  phase: "Phase I · Prime Block",     type: "corner",      status: "available", areaSqFt: 700,  priceL: 22.4, dim: "35 × 20 m",    face: "North",      road: "24 m",    price: "₹ 22.4 L", per: "₹ 3,200 / sq ft",               tag: "Corner Plot"             },
        { id: "F-04",   project: "Prime Estate",  phase: "Phase I · Prime Block",     type: "residential", status: "reserved",  areaSqFt: 520,  priceL: 15.6, dim: "26 × 20 m",    face: "North-East", road: "18 m",    price: "₹ 15.6 L", per: "₹ 3,000 / sq ft",               tag: "Reserved"                },
        { id: "GV-A01", project: "Green Valley",  phase: "Block A · Sector 1",        type: "residential", status: "available", areaSqFt: 500,  priceL: 17.5, dim: "25 × 20 m",    face: "North",      road: "20 m",    price: "₹ 17.5 L", per: "₹ 3,500 / sq ft",               tag: "Available"               },
        { id: "GV-A02", project: "Green Valley",  phase: "Block A · Sector 1",        type: "corner",      status: "available", areaSqFt: 680,  priceL: 25.2, dim: "34 × 20 m",    face: "North-East", road: "2 Roads", price: "₹ 25.2 L", per: "₹ 3,700 / sq ft",               tag: "Corner · Premium"        },
        { id: "GV-A03", project: "Green Valley",  phase: "Block A · Sector 1",        type: "residential", status: "reserved",  areaSqFt: 450,  priceL: 15.7, dim: "25 × 18 m",    face: "East",       road: "18 m",    price: "₹ 15.7 L", per: "₹ 3,500 / sq ft",               tag: "Reserved"                },
        { id: "GV-B01", project: "Green Valley",  phase: "Block B · Sector 2",        type: "residential", status: "available", areaSqFt: 520,  priceL: 18.2, dim: "26 × 20 m",    face: "South",      road: "20 m",    price: "₹ 18.2 L", per: "₹ 3,500 / sq ft",               tag: "Available"               },
        { id: "GV-B02", project: "Green Valley",  phase: "Block B · Main Road",       type: "commercial",  status: "available", areaSqFt: 700,  priceL: 28.0, dim: "35 × 20 m",    face: "East",       road: "Main Rd", price: "₹ 28 L",   per: "₹ 4,000 / sq ft",               tag: "Commercial"              },
        { id: "GV-B03", project: "Green Valley",  phase: "Block B · Sector 2",        type: "corner",      status: "sold",      areaSqFt: 740,  priceL: 29.6, dim: "37 × 20 m",    face: "North-West", road: "2 Roads", price: "₹ 29.6 L", per: "Sold",                           tag: "Sold Out"                },
        { id: "GV-C01", project: "Green Valley",  phase: "Block C · Eco Zone",        type: "residential", status: "available", areaSqFt: 480,  priceL: 16.8, dim: "24 × 20 m",    face: "West",       road: "16 m",    price: "₹ 16.8 L", per: "₹ 3,500 / sq ft",               tag: "Available"               },
        { id: "GV-C02", project: "Green Valley",  phase: "Block C · Eco Zone",        type: "residential", status: "available", areaSqFt: 510,  priceL: 17.8, dim: "25.5 × 20 m",  face: "North",      road: "18 m",    price: "₹ 17.8 L", per: "₹ 3,500 / sq ft",               tag: "Available"               },
        { id: "GV-C03", project: "Green Valley",  phase: "Block C · Eco Zone",        type: "corner",      status: "available", areaSqFt: 620,  priceL: 22.9, dim: "31 × 20 m",    face: "South-East", road: "2 Roads", price: "₹ 22.9 L", per: "₹ 3,700 / sq ft",               tag: "Corner Plot"             },
        { id: "GV-D01", project: "Green Valley",  phase: "Block D · Garden View",     type: "residential", status: "reserved",  areaSqFt: 460,  priceL: 16.1, dim: "23 × 20 m",    face: "East",       road: "16 m",    price: "₹ 16.1 L", per: "₹ 3,500 / sq ft",               tag: "Reserved"                },
        { id: "GV-D02", project: "Green Valley",  phase: "Block D · Garden View",     type: "residential", status: "available", areaSqFt: 490,  priceL: 17.1, dim: "24.5 × 20 m",  face: "South",      road: "18 m",    price: "₹ 17.1 L", per: "₹ 3,500 / sq ft",               tag: "Available"               },
      ],
    },
  },

  // ── PROJECT PAGE ────────────────────────────────────────────────
  {
    key: "project.hero",
    label: "Projects — Prime Estate Hero",
    data: {
      eyebrow: "Now Selling — Phase 1 & 2",
      label: "Flagship Project · Dubagga, Lucknow",
      title: "Prime",
      title_accent: "Estate",
      subtitle: "Jila Panchayat approved residential plots in Lucknow's most promising growth corridor. Starting at ₹12 Lakhs.",
      image_url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_1_2026-05-25_19-38-16-cw2VCtfJrtIWHFnZ75BKIzp9ddykUQ.jpg",
    },
  },
  {
    key: "project.details",
    label: "Projects — Prime Estate Details",
    data: {
      stat_1_val: "120+", stat_1_label: "Total Plots",
      stat_2_val: "47",   stat_2_label: "Available",
      stat_3_val: "₹12L+", stat_3_label: "Starting Price",
      approval: "Jila Panchayat Approved",
      location: "Dubagga, Lucknow",
      launched: "January 5, 2025",
    },
  },

  // ── PROJECTS LISTING PAGE (/project) ────────────────────────────
  {
    key: "projects_page.hero",
    label: "Projects Page — Hero",
    data: {
      eyebrow: "Our Portfolio",
      title: "Projects across",
      title_em: "four countries",
      title_suffix: ", one standard.",
      subtitle: "From Lucknow to Dubai, every TrustOn development is built on the same foundation — transparent ownership, verified documentation, and long-term value.",
    },
  },
  {
    key: "projects_page.stats",
    label: "Projects Page — Stats Band",
    data: {
      items: [
        { num: "48", label: "Live Projects" },
        { num: "4", label: "Countries" },
        { num: "11", label: "Cities" },
        { num: "₹2,400Cr+", label: "Assets Delivered" },
      ],
    },
  },
  {
    key: "projects_page.spotlight",
    label: "Projects Page — Country Spotlight & Portfolio Headings",
    data: {
      eyebrow: "Where We Build",
      heading: "Four markets,",
      heading_em: "one investment thesis.",
      subtitle: "Tap a market below to jump straight to its projects in the portfolio grid.",
      portfolio_eyebrow: "The Portfolio",
      portfolio_heading: "Every project,",
      portfolio_heading_em: "filtered by country.",
    },
  },
  {
    key: "projects_page.process",
    label: "Projects Page — Process Section",
    data: {
      eyebrow: "How We Work",
      heading: "The same process,",
      heading_em: "in every market.",
      subtitle: "A consistent four-stage path from site selection to handover, regardless of geography.",
      steps: [
        { num: "01", title: "Site Diligence", copy: "Legal title, zoning, and market demand are verified before a single brick is laid." },
        { num: "02", title: "Design & Approvals", copy: "Local architects and planning authorities sign off before construction begins." },
        { num: "03", title: "Construction", copy: "Independent quantity surveyors track progress against a public milestone schedule." },
        { num: "04", title: "Handover", copy: "Full documentation, title transfer, and after-sales support, wherever you bought from." },
      ],
    },
  },
  {
    key: "projects_page.testimonial",
    label: "Projects Page — Testimonial",
    data: {
      quote: "We bought into the Dubai project from Mumbai without a single site visit. The documentation alone made the decision easy.",
      name: "Anjali Mehta",
      designation: "NRI Investor, Marina Azure, Dubai",
      image_url: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=900&auto=format&fit=crop",
    },
  },
  {
    key: "projects_page.cta",
    label: "Projects Page — CTA / Enquiry",
    data: {
      heading: "Find your next",
      heading_em: "investment",
      heading_suffix: ", wherever it is.",
      subtitle: "Tell us what you're looking for and which market interests you. Our team will share a shortlist within 24 hours.",
    },
  },

  // ── PRIME ESTATE DETAIL PAGE (/projects/prime-estate) ───────────
  {
    key: "prime_estate.quote",
    label: "Prime Estate — Photo Break Quote",
    data: {
      quote: "We don't merely sell plots — we help you make one of the most significant decisions of your life.",
      attribution: "— Truston Developers, Lucknow",
    },
  },
  {
    key: "prime_estate.location_advantage",
    label: "Prime Estate — Location Advantage",
    data: {
      eyebrow: "Location Advantage",
      heading: "Well Connected to",
      heading_em: "Every Corner of Lucknow",
      locations: [
        { num: "01", title: "Highway Connectivity", desc: "Direct access to the major highway ensures fast, smooth connectivity to central Lucknow and beyond — making daily commutes completely effortless." },
        { num: "02", title: "Metro Corridor", desc: "Close proximity to the metro corridor connects residents seamlessly to the city's commercial, educational, and healthcare districts." },
        { num: "03", title: "Green Surroundings", desc: "Enveloped by lush greenery — offering clean air and a peaceful environment away from urban congestion. A rare luxury in today's cities." },
        { num: "04", title: "Growth Corridor", desc: "Located in a rapidly developing zone with rising infrastructure investment and proven land appreciation trends — your wealth grows alongside the city." },
      ],
    },
  },
  {
    key: "prime_estate.why",
    label: "Prime Estate — Why Prime Estate",
    data: {
      eyebrow: "Why Prime Estate",
      heading: "Invest with",
      heading_em: "Clarity & Confidence",
      reasons: [
        { num: "01", title: "High Growth Location", desc: "Situated in Lucknow's rapidly expanding development corridor, Prime Estate benefits from strong land appreciation driven by proximity to highways and the metro." },
        { num: "02", title: "Transparent Documentation", desc: "Clear title deeds, Jila Panchayat approval, and no hidden charges — every document provided upfront. Zero ambiguity at every stage of the transaction." },
        { num: "03", title: "Planned Infrastructure", desc: "Wide roads, drainage, water, and electricity — developed in phases for consistent quality. Master-planned for long-term livability and value appreciation." },
        { num: "04", title: "Build on Your Own Terms", desc: "With full construction approval, you design and build exactly as you envision. No forced packages, no builder lock-ins — your land, your freedom, your timeline." },
        { num: "05", title: "Strong Investment Potential", desc: "Highway and metro proximity make Prime Estate a smart long-term investment with high resale value. Both hold-and-appreciate and build-immediately strategies are fully supported." },
      ],
    },
  },
  {
    key: "prime_estate.faq",
    label: "Prime Estate — FAQ",
    data: {
      eyebrow: "Frequently Asked",
      heading: "Common Questions About",
      heading_em: "Prime Estate",
      faqs: [
        { q: "Are the plots in Prime Estate legally approved?", a: "Yes — all plots are Jila Panchayat approved with clear title deeds and proper documentation. Every stage is handled with complete transparency. No hidden conditions, no fine print." },
        { q: "Can I get construction approval to build my home?", a: "Yes. With proper construction approval, you can design and build exactly as you envision. TrustOn also offers in-house architecture and construction services if you'd like guidance through the process." },
        { q: "What is the starting price of plots?", a: "Plots start from ₹12 Lakhs+ depending on size and phase. Pricing is fully transparent with no hidden costs. Contact our team for current availability and the latest pricing sheet." },
        { q: "Is Phase 2 available for booking now?", a: "Phase 2 is in active development. Early buyers can register interest now to secure priority booking at launch pricing — locking in below-market rates before the public announcement." },
        { q: "How well connected is Prime Estate to Lucknow?", a: "Prime Estate at Dubagga offers direct highway connectivity and close proximity to the metro corridor — ensuring seamless access to central Lucknow, airports, schools, and commercial hubs." },
      ],
    },
  },
  {
    key: "prime_estate.prime_cta",
    label: "Prime Estate — Final CTA",
    data: {
      eyebrow: "47 Plots Still Available · Prime Estate · Dubagga, Lucknow",
      title: "Ready to Claim",
      title_em: "Plot?",
      subtitle: "Prices starting at ₹12 Lakhs. Talk to our team today — no obligations, just complete clarity about your investment.",
      phone: "+91 96160-61166",
      email: "trustondevelopers01@gmail.com",
    },
  },

  // ── ABOUT PAGE — extra blocks ───────────────────────────────────
  {
    key: "about.mvision",
    label: "About Us — Mission, Vision & Commitment",
    data: {
      eyebrow: "Purpose & Direction",
      mission_eyebrow: "Our Mission",
      mission_title: "Delivering Real Value, Every Time",
      mission_desc: "To make property ownership in Lucknow accessible, transparent, and rewarding — by developing legally sound, infrastructure-ready plots that appreciate in value and serve as the foundation for lasting legacies.",
      vision_eyebrow: "Our Vision",
      vision_title: "Shaping Lucknow's Residential Future",
      vision_desc: "To become the most trusted real estate developer in Uttar Pradesh — known for planned townships, premium plot developments, and a client-first philosophy that delivers beyond expectations in every project we undertake.",
      commitment_eyebrow: "Our Commitment",
      commitment_title: "Built on Trust. Driven by Integrity.",
      commitment_desc: "Every project undergoes rigorous regulatory compliance, transparent documentation, and structured infrastructure delivery. We commit to quality at every stage — from the first site survey to the final plot handover.",
    },
  },
  {
    key: "about.services",
    label: "About Us — Services Section",
    data: {
      eyebrow: "What We Do",
      title: "Four Services.",
      title_accent: "One Complete Solution.",
      body: "From finding the right plot to designing, building, and advising on your investment — TrustOn Developers is your single trusted partner across every step of the real estate journey.",
      count_label: "04 Expert Services",
    },
  },
  {
    key: "about.values",
    label: "About Us — Core Values",
    data: {
      eyebrow: "What Drives Us",
      title: "Our Core",
      title_accent: "Values",
      body: "Six principles that govern every plot we sell, every home we design, every promise we make.",
      value_1_title: "Trust & Transparency",
      value_1_desc: "Every transaction at TrustOn is built on complete openness — clear pricing, full documentation, and no hidden clauses. Our name is our standard.",
      value_2_title: "Uncompromising Quality",
      value_2_desc: "From land selection to infrastructure delivery, quality benchmarks are non-negotiable. We invest in the right materials, processes, and people to ensure it.",
      value_3_title: "Long-Term Vision",
      value_3_desc: "We develop with decades in mind — selecting locations for growth potential, designing for the future, and building communities that thrive for generations.",
      value_4_title: "Client-First Philosophy",
      value_4_desc: "Our buyers are partners in growth. From first enquiry to final handover and beyond, we remain committed to every client's success and satisfaction.",
      value_5_title: "Legal Integrity",
      value_5_desc: "All projects undergo rigorous legal due diligence — Jila Panchayat approvals, clear title deeds, and full compliance with local development regulations.",
      value_6_title: "Innovation & Growth",
      value_6_desc: "We continuously evolve — embracing new design thinking, sustainable development practices, and smarter ways to deliver value to every investor and homeowner.",
    },
  },
  {
    key: "about.cta",
    label: "About Us — Final CTA",
    data: {
      eyebrow: "Ready to Begin?",
      quote: "The best time to invest in land was yesterday. The second best time is today.",
      body: "Talk to TrustOn Developers and take the first step toward owning your plot in Prime Estate, Lucknow.",
      cta_primary: "View Prime Estate",
      cta_phone: "+91 96160-61166",
    },
  },

  // ── PLOT SELLING PAGE ───────────────────────────────────────────
  {
    key: "plot_selling.hero",
    label: "Plot Selling — Hero",
    data: {
      eyebrow: "Jila Panchayat Approved",
      title: "Own Land That Builds a",
      title_accent: "Legacy",
      subtitle: "Jila Panchayat approved residential plots in Lucknow's high-growth corridor at Dubagga. Starting at ₹12 Lakhs.",
      image_url: "",
    },
  },
  {
    key: "plot_selling.main",
    label: "Plot Selling — Available Inventory",
    data: {
      eyebrow: "Available Inventory",
      title: "Select Your",
      title_accent: "Perfect Plot",
      body: "Every plot in Prime Estate is legally cleared, boundary-marked, and ready for construction. Browse our available inventory and reserve your preferred plot today.",
    },
  },
  {
    key: "plot_selling.process",
    label: "Plot Selling — Process Steps",
    data: {
      eyebrow: "Our Process",
      title: "From",
      title_accent: "Enquiry to Ownership",
      body: "A proven four-step process ensuring every transaction is transparent, legal, and stress-free.",
      step_1_title: "Site Visit & Consultation",
      step_1_desc: "We start by showing you the plot in person. Complete transparency from the very first meeting — location, boundaries, and documentation.",
      step_1_tag: "Zero Commitment",
      step_2_title: "Legal Review & Verification",
      step_2_desc: "Our legal team reviews all documents — title deeds, JP approvals, and compliance certificates — before any commitment is made.",
      step_2_tag: "100% Verified",
      step_3_title: "Documentation & Registration",
      step_3_desc: "We handle the complete paperwork process — from registry to mutation — ensuring your ownership is clean and undisputed.",
      step_3_tag: "End-to-End Support",
      step_4_title: "Handover & After-Sales",
      step_4_desc: "Plot handover with full boundary marking, possession letter, and continued support for construction planning if needed.",
      step_4_tag: "Lifetime Support",
    },
  },
  {
    key: "plot_selling.why",
    label: "Plot Selling — Why Choose TrustOn",
    data: {
      eyebrow: "Why Choose TrustOn",
      title: "The",
      title_accent: "Trusted Choice",
      title_suffix: "in Lucknow",
      body: "With 73 families already invested in Prime Estate, TrustOn has built its reputation on one principle: complete transparency at every step.",
      families_count: "73",
      families_label: "Families Already Invested",
      point_1_icon: "🏛️",
      point_1_title: "Government Certified",
      point_1_desc: "Every plot in Prime Estate carries full Jila Panchayat approval — giving you complete legal security and peace of mind from day one.",
      point_2_icon: "📋",
      point_2_title: "Transparent Pricing",
      point_2_desc: "No hidden charges, no surprise fees. Our pricing is straightforward with complete cost breakdowns available at any stage.",
      point_3_icon: "📍",
      point_3_title: "Prime Location",
      point_3_desc: "Strategically located in Dubagga — connected to Lucknow Metro, NH-19, and within reach of the city's major business and commercial hubs.",
      point_4_icon: "🤝",
      point_4_title: "Dedicated Relationship Manager",
      point_4_desc: "From first enquiry to final handover, you have one point of contact who knows your file and is always available.",
    },
  },
  {
    key: "plot_selling.faq",
    label: "Plot Selling — FAQ Section",
    data: {
      eyebrow: "FAQ",
      title: "Common",
      title_accent: "Questions",
    },
  },
  {
    key: "plot_selling.cta",
    label: "Plot Selling — CTA Strip",
    data: {
      eyebrow: "Start Your Journey",
      title: "Your Plot in Prime Estate is",
      title_accent: "Waiting",
      phone: "+91 96160-61166",
    },
  },

  // ── CONSTRUCTION PAGE ───────────────────────────────────────────
  {
    key: "construction.hero",
    label: "Construction — Hero",
    data: {
      eyebrow: "Building Reality",
      title: "Construction &",
      title_accent: "Build",
      subtitle: "Quality construction where architectural dreams become tangible reality. Meticulous attention to detail, premium materials, and unwavering commitment to timely delivery — your home, built perfectly.",
      image_url: "",
    },
  },
  {
    key: "construction.main",
    label: "Construction — Main Content",
    data: {
      section_1_title: "Built with",
      section_1_accent: "Precision",
      section_1_body: "We combine traditional craftsmanship with modern engineering to deliver homes that stand the test of time.",
      section_2_title: "The Build",
      section_2_accent: "Process",
      section_2_body: "From breaking ground to the final polish, our process is structured for quality and clarity.",
      cta_title: "Build Your",
      cta_accent: "Legacy",
      cta_body: "Ready to turn your architectural vision into reality? Connect with our construction team for a detailed project consultation and quote.",
    },
  },

  // ── INVESTMENT CONSULTING PAGE ──────────────────────────────────
  {
    key: "investment.hero",
    label: "Investment Consulting — Hero",
    data: {
      eyebrow: "Strategic Wealth Building",
      title: "Investment",
      title_accent: "Consulting",
      subtitle: "Strategic wealth building through data-driven land investment guidance. ROI analysis, location intelligence, portfolio strategy — all tailored to your financial goals and risk profile.",
      image_url: "",
    },
  },
  {
    key: "investment.main",
    label: "Investment Consulting — Main Content",
    data: {
      eyebrow: "Why Invest in Land",
      title: "The Smarter",
      title_accent: "Investment",
      body: "Land in Lucknow's growth corridors has consistently outperformed traditional investment classes. Our team gives you the data, analysis, and strategy to make the most informed decision possible.",
      appreciation_rate: "12–18%",
      appreciation_label: "Annual Appreciation",
      return_multiple: "3.1x–4.2x",
      return_label: "10-Year Return Multiple",
    },
  },

  // ── ARCHITECTURE PAGE ───────────────────────────────────────────
  {
    key: "architecture.hero",
    label: "Architecture & Design — Hero",
    data: {
      eyebrow: "Design Excellence",
      title: "Architecture &",
      title_accent: "Design",
      subtitle: "Transform your vision into architectural reality. Our in-house design team creates bespoke layouts, stunning elevations, and complete blueprint documentation — each project a masterpiece.",
      image_url: "",
    },
  },
  {
    key: "architecture.main",
    label: "Architecture & Design — Main Content",
    data: {
      eyebrow: "What We Deliver",
      title: "Design That",
      title_accent: "Inspires",
      body: "Every design begins with a conversation. We listen to your vision, understand your lifestyle, and translate it into architectural language that's both beautiful and buildable.",
    },
  },

  // ── BLOG PAGE ───────────────────────────────────────────────────
  {
    key: "blog.hero",
    label: "Blog — Hero",
    data: {
      eyebrow: "Insights & Intelligence",
      title: "The Legacy",
      title_accent: "Journal",
      subtitle: "Expert perspectives on Lucknow real estate, investment strategies, and the TrustOn story.",
    },
  },

  // ── LIFESTYLE PAGE ──────────────────────────────────────────────
  {
    key: "lifestyle.hero",
    label: "Lifestyle — Hero",
    data: {
      eyebrow: "The TrustOn Experience",
      title: "A Life Less",
      title_accent: "Ordinary",
      subtitle: "Beyond the ground you own, we curate the lifestyle you live. Discover the difference of a community designed for those who demand excellence in every breath.",
      image_url: "",
    },
  },
  {
    key: "lifestyle.philosophy",
    label: "Lifestyle — Philosophy",
    data: {
      eyebrow: "Our Philosophy",
      title: "Designed for",
      title_accent: "Generations",
      body: "At TrustOn, we believe that true luxury is found in the details of daily life. It's the peace of mind that comes with secure boundaries, the joy of wide open green spaces, and the pride of living in a neighborhood that values excellence above all else.",
      body_secondary: "Every TrustOn township is a master-planned ecosystem where nature and infrastructure exist in perfect harmony, ensuring your investment doesn't just appreciate in value, but grows in soul.",
      quote: "TrustOn didn't just sell us a plot; they sold us a future where our children can play safely and we can enjoy the luxury of quiet evenings.",
      quote_author: "— A Prime Estate Homeowner",
    },
  },
  {
    key: "lifestyle.cta",
    label: "Lifestyle — Call to Action",
    data: {
      eyebrow: "Ready to Elevate Your Standard?",
      title: "Your New Chapter",
      title_accent: "Starts Here",
    },
  },
  {
    key: "lifestyle.stats",
    label: "Lifestyle — Stats",
    data: {
      stat_1_val: "40%",     stat_1_label: "Green Cover",
      stat_2_val: "24/7",    stat_2_label: "Surveillance",
      stat_3_val: "Premier", stat_3_label: "Clubhouse",
      stat_4_val: "Elite",   stat_4_label: "Neighborhood",
    },
  },

  // ── CHANNEL PARTNER PAGE ────────────────────────────────────────
  {
    key: "channel_partner.hero",
    label: "Channel Partner — Hero",
    data: {
      eyebrow: "Channel Partner Program — Lucknow",
      title: "Earn While You",
      title_accent: "Build the Future",
      subtitle: "Partner with Trust On and earn industry-leading commissions by connecting buyers to premium plots in our flagship housing society. A transparent, performance-based program designed for real estate professionals and entrepreneurs.",
      poster: "/attached_assets/channel-partner-hero.png",
      cta_label: "Become a Partner",
      cta_href: "#register",
      secondary_cta_label: "Learn More",
      secondary_cta_href: "#program",
    },
  },
  {
    key: "channel_partner.main",
    label: "Channel Partner — About the Program",
    data: {
      eyebrow: "About the Program",
      title: "What Is a",
      title_accent: "Channel Partner?",
      body_1: "A Channel Partner is an authorized sales representative who markets and sells our housing society plots on our behalf. You act as the bridge between Trust On and potential buyers — and you earn a commission on every successful sale you close.",
      body_2: "There is no salary, no fixed income — your earnings are entirely performance-based. The more you sell, the more you earn. There are no limits on your earnings.",
      body_3: "Our program also gives you an optional second income stream: if your client wishes to construct a home on the purchased plot, you can refer them to our in-house construction services and earn an additional commission on the construction contract.",
      benefits_heading: "What You Get as a Partner",
      benefit_1: "Official Channel Partner Certificate from Trust On",
      benefit_2: "Access to all plot inventory, pricing, and availability in real-time",
      benefit_3: "Dedicated relationship manager to support your sales",
      benefit_4: "Marketing material: brochures, digital assets, floor plans, site maps",
      benefit_5: "Commission on every plot sold through your referral",
      benefit_6: "Additional commission if client opts for our construction service",
      benefit_7: "Priority access to new launches and pre-launch pricing",
      benefit_8: "Monthly partner performance leaderboard with bonuses",
      benefit_9: "Transparent tracking dashboard for your leads and payments",
    },
  },
  {
    key: "channel_partner.stats",
    label: "Channel Partner — Stats Strip",
    data: {
      stat_1_num: "500+", stat_1_label: "Total Plots",
      stat_2_num: "3%",   stat_2_label: "Base Commission",
      stat_3_num: "6%",   stat_3_label: "Max Earning Rate",
      stat_4_num: "30",   stat_4_label: "Days to First Payout",
      stat_5_num: "2",    stat_5_label: "Revenue Streams",
    },
  },
  {
    key: "channel_partner.commissions",
    label: "Channel Partner — Commission Cards",
    data: {
      c1_type: "Plot Sale — Standard",    c1_rate: "3",   c1_featured: "false",
      c1_desc: "For new partners in their first 3 months, or partners selling fewer than 3 plots per month. Calculated on the total plot sale value.",
      c2_type: "Plot Sale — Active Tier", c2_rate: "5",   c2_featured: "true",
      c2_desc: "Unlocked when you sell 3 or more plots in a single calendar month. Applies retroactively to all plots sold that month. This is where most successful partners earn.",
      c3_type: "Plot Sale — Elite Tier",  c3_rate: "6",   c3_featured: "false",
      c3_desc: "Unlocked when you sell 6+ plots in a calendar month, or achieve a cumulative lifetime sales target. Requires senior management approval.",
      c4_type: "Construction Referral",   c4_rate: "1-2", c4_featured: "false",
      c4_desc: "Earned when your client signs a construction agreement with Trust On. Rate depends on project size. Paid on contract signing — not on project completion.",
    },
  },
  {
    key: "channel_partner.steps",
    label: "Channel Partner — How It Works Steps",
    data: {
      s1_num: "01", s1_title: "Register as a Partner",
      s1_desc: "Fill out the partner application form. Our team verifies your profile and activates your account within 2 working days. No fee required.",
      s2_num: "02", s2_title: "Get Onboarded",
      s2_desc: "Attend a 1-day orientation (in-person or online) covering inventory, pricing, payment plans, legal status, and all sales tools.",
      s3_num: "03", s3_title: "Refer Buyers",
      s3_desc: "Market plots through your network, social media, or site visits. Register each lead in your partner portal before bringing them to our office.",
      s4_num: "04", s4_title: "Deal Confirms",
      s4_desc: "When your lead books a plot and makes the token payment, the sale is registered under your partner ID. You receive a confirmation with commission amount.",
      s5_num: "05", s5_title: "Get Paid",
      s5_desc: "Commission is disbursed within 30 days of booking confirmation via bank transfer. A payment advice slip is shared with every payout.",
    },
  },
  {
    key: "channel_partner.partner_types",
    label: "Channel Partner — Who Can Join",
    data: {
      p1_title: "Real Estate Agents",   p1_desc: "Licensed or practicing agents who already work in property sales. Add our inventory to your portfolio.",
      p2_title: "Property Dealers",     p2_desc: "Established dealers who deal in open plots and want to cross-sell a new society to their clientele.",
      p3_title: "Freelance Marketers",  p3_desc: "Digital marketers, social media influencers, or YouTube creators with an audience interested in real estate.",
      p4_title: "Professionals",        p4_desc: "Accountants, lawyers, financial advisors, and HR professionals trusted by clients making major investment decisions.",
      p5_title: "Real Estate Firms",    p5_desc: "Registered companies or brokerage firms who want to include Trust On as a listed project.",
      p6_title: "Overseas Reps",        p6_desc: "Individuals based in UAE, UK, Canada, etc. with connections to Indians looking to invest back home.",
    },
  },
  {
    key: "channel_partner.cta",
    label: "Channel Partner — CTA Section",
    data: {
      heading: "Ready to Start",
      heading_accent: "Earning?",
      body: "Join hundreds of partners already earning with Trust On. Registration takes less than 5 minutes. Your first commission could be within 30 days.",
      cta_label: "Register Now — It's Free",
      cta_href: "#register",
      phone: "+91 98765 43210",
    },
  },
  {
    key: "channel_partner.contact",
    label: "Channel Partner — Contact Info (Registration)",
    data: {
      address: "Office #7, Hazratganj, Lucknow, Uttar Pradesh 226001",
      phone: "+91 98765 43210",
      email: "partners@truston.in",
      hours: "Mon–Sat, 10:00 AM – 6:00 PM",
    },
  },

  // ── FOOTER ──────────────────────────────────────────────────────
  {
    key: "footer.cta",
    label: "Footer — CTA Strip",
    data: {
      eyebrow: "Begin Your Journey",
      title: "Own the Ground.",
      title_accent: "Build the Legacy.",
      cta_primary: "Enquire Now →",
      cta_phone: "+91 96160-61166",
    },
  },
  {
    key: "footer.contact",
    label: "Footer — Contact & Brand",
    data: {
      brand_name: "TrustOn",
      brand_tagline: "Premium Estate",
      brand_desc: "Prime Estate by TrustOn Developers — a Jila Panchayat approved luxury township in Lucknow, crafted for those who expect more from every square foot.",
      phone: "+91 96160-61166",
      email: "trustondevelopers01@gmail.com",
      address: "UGF, Apple Plaza, Next To HDFC Bank, Hardoi Road, Lucknow — 226003",
      copyright: "© 2025 TrustOn Developers. Billion Dollar Real Estate Empire.",
    },
  },

  // ── PROJECT DETAIL PAGE ───────────────────────────────────────────
  {
    key: "project_detail.hero",
    label: "Project Detail — Hero",
    data: {
      eyebrow: "Flagship Development · Lucknow",
      title: "Prime Estate",
      title_accent: "",
      subtitle: "Strategic infrastructure. Global standard amenities. A multi-billion dollar foundation for your future legacy.",
      image_url: "/attached_assets/image_1779159211927.png",
    },
  },
  {
    key: "project_detail.overview",
    label: "Project Detail — Overview",
    data: {
      eyebrow: "Project Intelligence",
      title: "Strategic Infrastructure",
      title_accent: "for Modern Legacy.",
      body: "Prime Estate is a thoughtfully planned residential plots colony designed for those who want the freedom to build on their own terms. Located in a promising growth corridor, the project offers well-defined plots and essential infrastructure.",
      body_secondary: "With clear planning and a focus on value appreciation, Prime Estate gives you the foundation to create a space that truly reflects your billion-dollar vision.",
    },
  },
  {
    key: "project_detail.stats",
    label: "Project Detail — Stats",
    data: {
      stat_1_val: "120+",
      stat_1_label: "Total Plots",
      stat_2_val: "47",
      stat_2_label: "Still Available",
      stat_3_val: "2400",
      stat_3_label: "Sq. Feet Range",
      stat_4_val: "₹12L+",
      stat_4_label: "Starting Unit",
      footer: "Global Standards · Jila Panchayat Approved · Clear Title Deeds",
    },
  },
  {
    key: "project_detail.gallery",
    label: "Project Detail — Gallery",
    data: {
      eyebrow: "Project Gallery",
      title: "Inside Prime",
      title_accent: "Estate",
    },
  },
  {
    key: "project_detail.amenities",
    label: "Project Detail — Amenities",
    data: {
      eyebrow: "Elite Amenities",
      title: "Strategic",
      title_accent: "Living.",
    },
  },
  {
    key: "project_detail.cta",
    label: "Project Detail — Call to Action",
    data: {
      eyebrow: "Limited Engagement",
      title: "Reserve your position at",
      title_accent: "Prime Estate.",
      cta_text: "Schedule Private Tour",
      phone: "+91 96160-61166",
    },
  },
];

export const getPrimeEstatePhases = createServerFn({ method: "POST" })
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from("site_content")
      .select("data")
      .eq("key", "prime_estate.phases")
      .single();
    if (error || !data) return null;
    return data.data as {
      heading: string;
      phases: Array<{
        active: boolean;
        badge: string;
        num: string;
        title: string;
        desc: string;
        items: string[];
      }>;
    };
  });

export const getSiteContentBlocks = createServerFn({ method: "POST" })
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from("site_content")
      .select("id,key,label,data,created_at,updated_at")
      .order("key", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as ContentBlock[];
  });

export const saveSiteContentBlock = createServerFn({ method: "POST" })
  .inputValidator((payload: unknown) => {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("Invalid payload");
    const { key, label, data } = payload as Record<string, unknown>;
    return { key: assertString(key, "key"), label: assertString(label, "label"), data: assertJson(data) } as SaveContentPayload;
  })
  .handler(async ({ data }) => {
    const { key, label, data: contentData } = data;
    const { error, data: saved } = await supabaseAdmin
      .from("site_content")
      .upsert({ key, label, data: contentData }, { onConflict: "key", ignoreDuplicates: false })
      .select("id,key,label,data,created_at,updated_at")
      .single();
    if (error) throw new Error(error.message);
    return saved as ContentBlock;
  });

export const seedDefaultContent = createServerFn({ method: "POST" })
  .inputValidator((payload: unknown) => {
    const p = payload as Record<string, unknown> | null | undefined;
    return { overwrite: !!(p?.overwrite) };
  })
  .handler(async ({ data }) => {
    const results: { key: string; status: string; error?: string }[] = [];
    for (const block of DEFAULT_BLOCKS) {
      try {
        const { error } = await supabaseAdmin
          .from("site_content")
          .upsert({ key: block.key, label: block.label, data: block.data }, { onConflict: "key", ignoreDuplicates: !data.overwrite });
        results.push({ key: block.key, status: error ? "error" : "seeded", error: error?.message });
      } catch (e) {
        results.push({ key: block.key, status: "error", error: String(e) });
      }
    }
    return results;
  });

export const uploadMedia = createServerFn({ method: "POST" })
  .inputValidator((payload: unknown) => {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("Invalid upload payload");
    const { filename, contentType, base64 } = payload as Record<string, unknown>;
    return { filename: assertString(filename, "filename"), contentType: assertString(contentType, "contentType"), base64: assertString(base64, "base64") } as UploadMediaPayload;
  })
  .handler(async ({ data }) => {
    const filename = data.filename.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "");
    const storagePath = `${timestamp}-${filename}`;
    const buffer = Buffer.from(data.base64, "base64");
    const { error: uploadError } = await supabaseAdmin.storage
      .from(MEDIA_BUCKET)
      .upload(storagePath, buffer, { contentType: data.contentType, upsert: true });
    if (uploadError) throw new Error(uploadError.message);
    const { data: publicUrlData } = await supabaseAdmin.storage.from(MEDIA_BUCKET).getPublicUrl(storagePath);
    const url = publicUrlData.publicUrl;
    await supabaseAdmin.from("media").insert({ name: filename, type: data.contentType, url, storage_path: storagePath, size_bytes: buffer.length });
    return { url };
  });
