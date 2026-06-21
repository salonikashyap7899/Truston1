import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect, useRef } from "react";
import plotImg from "@/assets/plot-tracker.jpg";
import luxuryInteriorImg from "@/assets/luxury-interior.jpg";
import { usePageContent } from "@/hooks/usePageContent";

export const Route = createFileRoute("/plot-selling")({
  head: () => ({
    meta: [
      { title: "Plot Selling — TrustOn Developers" },
      {
        name: "description",
        content:
          "Jila Panchayat approved plots in Lucknow's highest-growth corridors. Zero ambiguity. Complete documentation. Starting at ₹12 Lakhs.",
      },
    ],
  }),
  component: PlotSellingPage,
});

// ─── Plot Data ────────────────────────────────────────────────────────────────
// To add a new project, just add plots with a new `project` value.
// The dropdown auto-populates from unique project names — no other code changes needed.

const ALL_PLOTS = [
  // ── Prime Estate ──────────────────────────────────────────────────────────
  { id: "A-07", project: "Prime Estate", type: "corner",      status: "available", areaSqFt: 720,  priceL: 21.6, dim: "30 × 24 m",    face: "North-East", road: "24 m",    price: "₹ 21.6 L", per: "₹ 3,000 / sq ft · JP Approved", tag: "Featured · Best Value",  phase: "Phase I & II" },
  { id: "B-03", project: "Prime Estate", type: "residential", status: "available", areaSqFt: 450,  priceL: 13.5, dim: "25 × 18 m",    face: "North",      road: "18 m",    price: "₹ 13.5 L", per: "₹ 2,400 / sq ft",               tag: "Available",               phase: "Phase I · Sector 8" },
  { id: "C-01", project: "Prime Estate", type: "commercial",  status: "available", areaSqFt: 600,  priceL: 19.2, dim: "30 × 20 m",    face: "East",       road: "Highway", price: "₹ 19.2 L", per: "₹ 3,200 / sq ft",               tag: "Commercial",              phase: "NH-19 Corridor" },
  { id: "D-11", project: "Prime Estate", type: "corner",      status: "available", areaSqFt: 380,  priceL: 12.0, dim: "20 × 19 m",    face: "South",      road: "2 Roads", price: "₹ 12 L",   per: "₹ 2,500 / sq ft · Starter",    tag: "Corner Plot",             phase: "Phase II · Green Township" },
  { id: "E-05", project: "Prime Estate", type: "residential", status: "available", areaSqFt: 540,  priceL: 16.2, dim: "27 × 20 m",    face: "West",       road: "20 m",    price: "₹ 16.2 L", per: "₹ 3,000 / sq ft",               tag: "Available",               phase: "Phase I · Central Block" },
  { id: "F-02", project: "Prime Estate", type: "corner",      status: "sold",      areaSqFt: 860,  priceL: 28.0, dim: "40 × 21.5 m",  face: "North-West", road: "30 m",    price: "₹ 28 L",   per: "Sold",                           tag: "Premium Corner",          phase: "Phase I · Prime Block" },
  { id: "A-08", project: "Prime Estate", type: "residential", status: "available", areaSqFt: 500,  priceL: 15.0, dim: "25 × 20 m",    face: "North",      road: "18 m",    price: "₹ 15 L",   per: "₹ 3,000 / sq ft",               tag: "Available",               phase: "Phase I & II" },
  { id: "A-09", project: "Prime Estate", type: "residential", status: "reserved",  areaSqFt: 480,  priceL: 14.4, dim: "24 × 20 m",    face: "East",       road: "18 m",    price: "₹ 14.4 L", per: "₹ 3,000 / sq ft",               tag: "Reserved",                phase: "Phase I & II" },
  { id: "B-04", project: "Prime Estate", type: "residential", status: "available", areaSqFt: 450,  priceL: 13.5, dim: "25 × 18 m",    face: "South",      road: "18 m",    price: "₹ 13.5 L", per: "₹ 2,400 / sq ft",               tag: "Available",               phase: "Phase I · Sector 8" },
  { id: "B-05", project: "Prime Estate", type: "corner",      status: "available", areaSqFt: 610,  priceL: 18.3, dim: "31 × 19.7 m",  face: "North-East", road: "2 Roads", price: "₹ 18.3 L", per: "₹ 3,000 / sq ft",               tag: "Corner Plot",             phase: "Phase I · Sector 8" },
  { id: "C-02", project: "Prime Estate", type: "commercial",  status: "reserved",  areaSqFt: 650,  priceL: 20.8, dim: "32 × 20 m",    face: "West",       road: "Highway", price: "₹ 20.8 L", per: "₹ 3,200 / sq ft",               tag: "Reserved",                phase: "NH-19 Corridor" },
  { id: "C-03", project: "Prime Estate", type: "commercial",  status: "available", areaSqFt: 600,  priceL: 19.2, dim: "30 × 20 m",    face: "East",       road: "Highway", price: "₹ 19.2 L", per: "₹ 3,200 / sq ft",               tag: "Commercial",              phase: "NH-19 Corridor" },
  { id: "D-12", project: "Prime Estate", type: "residential", status: "available", areaSqFt: 400,  priceL: 10.0, dim: "20 × 20 m",    face: "North",      road: "16 m",    price: "₹ 10 L",   per: "₹ 2,500 / sq ft · Starter",    tag: "Available",               phase: "Phase II · Green Township" },
  { id: "D-13", project: "Prime Estate", type: "corner",      status: "available", areaSqFt: 390,  priceL: 12.4, dim: "21 × 18.5 m",  face: "South-East", road: "2 Roads", price: "₹ 12.4 L", per: "₹ 3,180 / sq ft",               tag: "Corner Plot",             phase: "Phase II · Green Township" },
  { id: "E-06", project: "Prime Estate", type: "residential", status: "sold",      areaSqFt: 540,  priceL: 16.2, dim: "27 × 20 m",    face: "West",       road: "20 m",    price: "₹ 16.2 L", per: "Sold",                           tag: "Sold Out",                phase: "Phase I · Central Block" },
  { id: "E-07", project: "Prime Estate", type: "residential", status: "available", areaSqFt: 560,  priceL: 16.8, dim: "28 × 20 m",    face: "East",       road: "20 m",    price: "₹ 16.8 L", per: "₹ 3,000 / sq ft",               tag: "Available",               phase: "Phase I · Central Block" },
  { id: "F-03", project: "Prime Estate", type: "corner",      status: "available", areaSqFt: 700,  priceL: 22.4, dim: "35 × 20 m",    face: "North",      road: "24 m",    price: "₹ 22.4 L", per: "₹ 3,200 / sq ft",               tag: "Corner Plot",             phase: "Phase I · Prime Block" },
  { id: "F-04", project: "Prime Estate", type: "residential", status: "reserved",  areaSqFt: 520,  priceL: 15.6, dim: "26 × 20 m",    face: "North-East", road: "18 m",    price: "₹ 15.6 L", per: "₹ 3,000 / sq ft",               tag: "Reserved",                phase: "Phase I · Prime Block" },

  // ── Green Valley ──────────────────────────────────────────────────────────
  { id: "GV-A01", project: "Green Valley", type: "residential", status: "available", areaSqFt: 500,  priceL: 17.5, dim: "25 × 20 m",   face: "North",      road: "20 m",    price: "₹ 17.5 L", per: "₹ 3,500 / sq ft",               tag: "Available",               phase: "Block A · Sector 1" },
  { id: "GV-A02", project: "Green Valley", type: "corner",      status: "available", areaSqFt: 680,  priceL: 25.2, dim: "34 × 20 m",   face: "North-East", road: "2 Roads", price: "₹ 25.2 L", per: "₹ 3,700 / sq ft",               tag: "Corner · Premium",        phase: "Block A · Sector 1" },
  { id: "GV-A03", project: "Green Valley", type: "residential", status: "reserved",  areaSqFt: 450,  priceL: 15.7, dim: "25 × 18 m",   face: "East",       road: "18 m",    price: "₹ 15.7 L", per: "₹ 3,500 / sq ft",               tag: "Reserved",                phase: "Block A · Sector 1" },
  { id: "GV-B01", project: "Green Valley", type: "residential", status: "available", areaSqFt: 520,  priceL: 18.2, dim: "26 × 20 m",   face: "South",      road: "20 m",    price: "₹ 18.2 L", per: "₹ 3,500 / sq ft",               tag: "Available",               phase: "Block B · Sector 2" },
  { id: "GV-B02", project: "Green Valley", type: "commercial",  status: "available", areaSqFt: 700,  priceL: 28.0, dim: "35 × 20 m",   face: "East",       road: "Main Rd", price: "₹ 28 L",   per: "₹ 4,000 / sq ft",               tag: "Commercial",              phase: "Block B · Main Road" },
  { id: "GV-B03", project: "Green Valley", type: "corner",      status: "sold",      areaSqFt: 740,  priceL: 29.6, dim: "37 × 20 m",   face: "North-West", road: "2 Roads", price: "₹ 29.6 L", per: "Sold",                           tag: "Sold Out",                phase: "Block B · Sector 2" },
  { id: "GV-C01", project: "Green Valley", type: "residential", status: "available", areaSqFt: 480,  priceL: 16.8, dim: "24 × 20 m",   face: "West",       road: "16 m",    price: "₹ 16.8 L", per: "₹ 3,500 / sq ft",               tag: "Available",               phase: "Block C · Eco Zone" },
  { id: "GV-C02", project: "Green Valley", type: "residential", status: "available", areaSqFt: 510,  priceL: 17.8, dim: "25.5 × 20 m", face: "North",      road: "18 m",    price: "₹ 17.8 L", per: "₹ 3,500 / sq ft",               tag: "Available",               phase: "Block C · Eco Zone" },
  { id: "GV-C03", project: "Green Valley", type: "corner",      status: "available", areaSqFt: 620,  priceL: 22.9, dim: "31 × 20 m",   face: "South-East", road: "2 Roads", price: "₹ 22.9 L", per: "₹ 3,700 / sq ft",               tag: "Corner Plot",             phase: "Block C · Eco Zone" },
  { id: "GV-D01", project: "Green Valley", type: "residential", status: "reserved",  areaSqFt: 460,  priceL: 16.1, dim: "23 × 20 m",   face: "East",       road: "16 m",    price: "₹ 16.1 L", per: "₹ 3,500 / sq ft",               tag: "Reserved",                phase: "Block D · Garden View" },
  { id: "GV-D02", project: "Green Valley", type: "residential", status: "available", areaSqFt: 490,  priceL: 17.1, dim: "24.5 × 20 m", face: "South",      road: "18 m",    price: "₹ 17.1 L", per: "₹ 3,500 / sq ft",               tag: "Available",               phase: "Block D · Garden View" },
];

type Plot = typeof ALL_PLOTS[0];

// ─── Static lists ─────────────────────────────────────────────────────────────
const PLOT_TYPES   = ["All Types", "Residential", "Corner Plots", "Commercial"];
const STATUS_OPTS  = ["All Status", "Available", "Reserved", "Sold"];
const PRICE_OPTS   = [
  { label: "All Prices",     min: 0,   max: Infinity },
  { label: "Under ₹15 L",   min: 0,   max: 15 },
  { label: "₹15 L – ₹20 L", min: 15,  max: 20 },
  { label: "₹20 L – ₹30 L", min: 20,  max: 30 },
  { label: "Above ₹30 L",   min: 30,  max: Infinity },
];
const AREA_OPTS    = [
  { label: "All Sizes",         min: 0,   max: Infinity },
  { label: "Under 450 sq ft",  min: 0,   max: 450 },
  { label: "450 – 600 sq ft",  min: 450, max: 600 },
  { label: "600 – 750 sq ft",  min: 600, max: 750 },
  { label: "Above 750 sq ft",  min: 750, max: Infinity },
];

const faqs = [
  { q: "Are all plots Jila Panchayat approved?", a: "Yes. Every plot in Prime Estate and Green Valley carries full Jila Panchayat approval and comes with clear title deeds verified by our legal team." },
  { q: "What is the minimum plot size available?", a: "Our plots start from 380 sq ft, going up to 860+ sq ft. We have options for first-time buyers as well as larger investors." },
  { q: "Can I get home loan financing for these plots?", a: "Yes. Our plots are eligible for bank financing. We have tie-ups with leading lenders and can facilitate the loan process on your behalf." },
  { q: "How long does the registration process take?", a: "Once documents are in order, registration typically completes within 7–10 working days. We guide you through every step." },
  { q: "Is the plot available for NRI buyers?", a: "Absolutely. NRIs can purchase residential plots in India under FEMA guidelines. We have dedicated support for NRI documentation and power-of-attorney arrangements." },
  { q: "What infrastructure is currently available at the site?", a: "Phase I has wide internal roads, boundary walls, electricity connection points, and water supply infrastructure already in place." },
];

// ─── SVG Site Plan Map ────────────────────────────────────────────────────────
function SitePlanMap({ visible, selectedId, onSelect }: { visible: Plot[]; selectedId: string | null; onSelect: (p: Plot) => void }) {
  const COLS = 6;
  const CW = 160, CH = 120, GAP = 8, ROAD = 22, PX = 36, PY = 36;
  const rows = Math.max(1, Math.ceil(visible.length / COLS));
  const W = PX * 2 + COLS * CW + (COLS - 1) * GAP;
  const H = PY * 2 + rows * CH + (rows > 1 ? (rows - 1) * ROAD : 0) + 40;

  const statusFill   = (s: string) => s === "available" ? "rgba(0,191,255,0.10)" : s === "reserved" ? "rgba(212,169,106,0.12)" : "rgba(255,255,255,0.03)";
  const statusStroke = (s: string) => s === "available" ? "rgba(0,191,255,0.35)" : s === "reserved" ? "rgba(212,169,106,0.4)"  : "rgba(255,255,255,0.1)";
  const tabFill      = (s: string) => s === "available" ? "#00BFFF" : s === "reserved" ? "#d4a96a" : "rgba(255,255,255,0.2)";
  const textFill     = (s: string) => s === "available" ? "rgba(0,191,255,0.5)" : s === "reserved" ? "rgba(212,169,106,0.5)" : "rgba(255,255,255,0.2)";

  const items: { plot: Plot; x: number; y: number }[] = [];
  let col = 0, row = 0;
  visible.forEach((p) => {
    items.push({ plot: p, x: PX + col * (CW + GAP), y: PY + row * (CH + ROAD) });
    col++;
    if (col === COLS) { col = 0; row++; }
  });

  const roadRows: number[] = [];
  for (let r = 1; r < rows; r++) roadRows.push(PY + r * (CH + ROAD) - ROAD);

  if (visible.length === 0) {
    return (
      <div style={{ border: "0.5px solid rgba(0,191,255,0.12)", borderRadius: 8, background: "#030810", padding: "60px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "serif", fontSize: 20, color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>No plots match these filters</p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>Try adjusting the project, type, status, or price range above.</p>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", border: "0.5px solid rgba(0,191,255,0.15)", background: "#030810" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "absolute", top: 12, left: 16, right: 16, zIndex: 10, pointerEvents: "none" }}>
        <span style={{ background: "rgba(3,8,16,0.85)", border: "0.5px solid rgba(0,191,255,0.2)", borderRadius: 999, padding: "5px 12px", fontSize: 11, color: "#e5e0d8", display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontFamily: "monospace", color: "#00BFFF", fontWeight: 600 }}>{visible.length}</span> plots shown
        </span>
        <span style={{ background: "rgba(3,8,16,0.85)", border: "0.5px solid rgba(0,191,255,0.2)", borderRadius: 999, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#00BFFF" }}>N</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
        <rect x={0} y={0} width={W} height={H} fill="#030810" />
        <rect x={14} y={14} width={W - 28} height={H - 28} fill="none" stroke="rgba(0,191,255,0.07)" strokeWidth={1} strokeDasharray="2 6" rx={3} />
        {roadRows.map((ry, i) => (
          <g key={i}>
            <rect x={0} y={ry} width={W} height={ROAD} fill="rgba(0,191,255,0.04)" />
            <line x1={0} y1={ry + ROAD / 2} x2={W} y2={ry + ROAD / 2} stroke="rgba(0,191,255,0.07)" strokeWidth={1} strokeDasharray="8 6" />
          </g>
        ))}
        {items.map(({ plot: p, x, y }) => {
          const isSelected = selectedId === p.id;
          const isSold = p.status === "sold";
          return (
            <g key={p.id} onClick={() => !isSold && onSelect(p)} style={{ cursor: isSold ? "not-allowed" : "pointer" }}>
              <rect x={x} y={y} width={CW} height={CH} rx={3} fill={isSelected ? "rgba(0,191,255,0.18)" : statusFill(p.status)} stroke={isSelected ? "#00BFFF" : statusStroke(p.status)} strokeWidth={isSelected ? 1.5 : 0.5} />
              <rect x={x} y={y} width={CW} height={4} rx={2} fill={tabFill(p.status)} opacity={0.9} />
              <text x={x + 10} y={y + 22} fontFamily="monospace" fontSize={11} fill={isSold ? "rgba(255,255,255,0.2)" : "#e8e3da"} fontWeight={600}>{p.id}</text>
              <text x={x + 10} y={y + 40} fontFamily="Inter,sans-serif" fontSize={9} fill="rgba(255,255,255,0.22)">{p.project}</text>
              <text x={x + 10} y={y + CH - 24} fontFamily="Inter,sans-serif" fontSize={8} fill="rgba(255,255,255,0.3)" style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>{p.areaSqFt} sq ft</text>
              <text x={x + 10} y={y + CH - 10} fontFamily="Inter,sans-serif" fontSize={8} fill={textFill(p.status)} style={{ textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.status}</text>
              {isSold && <rect x={x} y={y} width={CW} height={CH} fill="rgba(3,8,16,0.5)" rx={3} />}
            </g>
          );
        })}
      </svg>
      <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 14px", gap: 20, flexWrap: "wrap" }}>
        {([["#00BFFF", "Available"], ["#d4a96a", "Reserved"], ["rgba(255,255,255,0.25)", "Sold"]] as const).map(([color, label]) => (
          <span key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, display: "inline-block" }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Plot Detail Drawer ───────────────────────────────────────────────────────
function PlotDrawer({ plot, onClose }: { plot: Plot | null; onClose: () => void }) {
  return (
    <>
      <AnimatePresence>
        {plot && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(3,7,18,0.55)", zIndex: 90 }} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {plot && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={{ position: "fixed", top: 0, right: 0, height: "100%", width: "min(420px, 92vw)", background: "#050a12", borderLeft: "0.5px solid rgba(0,191,255,0.15)", zIndex: 91, padding: "28px 28px 40px", overflowY: "auto" }}>
            <button onClick={onClose} style={{ width: 32, height: 32, border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 24, fontSize: 14, background: "transparent", color: "rgba(255,255,255,0.5)" }}>✕</button>
            <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#00BFFF", marginBottom: 4 }}>{plot.tag}</p>
            <h3 style={{ fontFamily: "serif", fontSize: 28, fontWeight: 400, color: "#e8e3da", marginBottom: 2 }}>Plot {plot.id}</h3>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{plot.project}</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginBottom: 24 }}>{plot.phase}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, borderTop: "0.5px solid rgba(255,255,255,0.07)", borderBottom: "0.5px solid rgba(255,255,255,0.07)", padding: "20px 0", marginBottom: 20 }}>
              {[
                { k: "Area",       v: `${plot.areaSqFt} sq ft` },
                { k: "Dimensions", v: plot.dim },
                { k: "Facing",     v: plot.face },
                { k: "Road Width", v: plot.road },
              ].map(({ k, v }) => (
                <div key={k}>
                  <p style={{ fontFamily: "monospace", fontSize: 14, color: "#e8e3da", marginBottom: 3 }}>{v}</p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 24 }}>
              <span style={{ fontFamily: "serif", fontSize: 34, fontWeight: 400, color: plot.status === "sold" ? "rgba(255,255,255,0.3)" : "#00BFFF" }}>
                {plot.status === "sold" ? "Sold" : plot.price}
              </span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{plot.per}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="tel:+919616061166" style={{ textAlign: "center", padding: "13px", borderRadius: 4, fontSize: 13, fontWeight: 600, background: plot.status === "sold" ? "rgba(255,255,255,0.05)" : "#00BFFF", color: plot.status === "sold" ? "rgba(255,255,255,0.2)" : "#04090f", pointerEvents: plot.status === "sold" ? "none" : "auto", textDecoration: "none", display: "block" }}>
                {plot.status === "sold" ? "This plot is sold" : "Enquire Now →"}
              </a>
              <a href={`https://wa.me/919616061166?text=Hi%2C%20I%20am%20interested%20in%20Plot%20${plot.id}%20(${encodeURIComponent(plot.project)})%20at%20TrustOn.`} target="_blank" rel="noopener noreferrer" style={{ textAlign: "center", padding: "13px", borderRadius: 4, fontSize: 13, border: "0.5px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", textDecoration: "none", display: "block" }}>
                Message on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Project Selector ─────────────────────────────────────────────────────────
function ProjectSelector({
  projects, active, onChange,
}: { projects: string[]; active: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex", alignItems: "center", gap: 10, padding: "9px 16px",
          background: active === "All Projects" ? "rgba(0,191,255,0.06)" : "rgba(0,191,255,0.12)",
          border: `0.5px solid ${active === "All Projects" ? "rgba(0,191,255,0.2)" : "rgba(0,191,255,0.5)"}`,
          borderRadius: 8, cursor: "pointer", color: "#e8e3da", fontFamily: "inherit",
          fontSize: 13, fontWeight: active === "All Projects" ? 400 : 600, minWidth: 180,
          justifyContent: "space-between",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: active === "All Projects" ? "rgba(0,191,255,0.4)" : "#00BFFF", display: "inline-block", flexShrink: 0 }} />
          {active}
        </span>
        <span style={{ fontSize: 10, color: "rgba(0,191,255,0.6)", transition: "transform .18s", transform: open ? "rotate(180deg)" : "none", display: "inline-block" }}>▾</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
            style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, minWidth: "100%", background: "#060c16", border: "0.5px solid rgba(0,191,255,0.2)", borderRadius: 8, zIndex: 50, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.6)" }}>
            {["All Projects", ...projects].map((p) => (
              <button key={p} onClick={() => { onChange(p); setOpen(false); }}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: p === active ? "#00BFFF" : "rgba(232,227,218,0.7)", fontFamily: "inherit", textAlign: "left", borderBottom: "0.5px solid rgba(255,255,255,0.04)", fontWeight: p === active ? 600 : 400, transition: "background .1s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,191,255,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: p === active ? "#00BFFF" : "rgba(255,255,255,0.15)", display: "inline-block", flexShrink: 0 }} />
                {p}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Active Filter Pill ───────────────────────────────────────────────────────
function FilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px 4px 12px", background: "rgba(0,191,255,0.1)", border: "0.5px solid rgba(0,191,255,0.3)", borderRadius: 999, fontSize: 11, color: "#00BFFF" }}>
      {label}
      <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(0,191,255,0.6)", fontSize: 13, lineHeight: 1, padding: 0, display: "flex" }}>×</button>
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function PlotSellingPage() {
  const hero       = usePageContent("plot_selling.hero",    { eyebrow: "Now Selling · Prime Estate & Green Valley · Lucknow", title_accent: "legacy.", subtitle: "Jila Panchayat approved residential plots in Lucknow's fastest-growing corridors. Clear title. Highway connected. Metro ready.", image_url: "" });
  const plotMain   = usePageContent("plot_selling.main",    { eyebrow: "Available Inventory", title: "Select Your", title_accent: "Perfect Plot", body: "An honest site plan — not a brochure render. Every block reflects real status. Click any plot for full specifications." });
  const plotProcess = usePageContent("plot_selling.process", { eyebrow: "Our Process", title: "From", title_accent: "Enquiry to Ownership", body: "Four steps. No ambiguity at any of them.", step_1_title: "Site Visit & Consultation", step_1_desc: "We show you the plot in person — location, boundaries, and documentation, explained on the ground.", step_1_tag: "Zero Commitment", step_2_title: "Legal Review & Verification", step_2_desc: "Our legal team reviews title deeds, JP approvals, and compliance certificates before any commitment.", step_2_tag: "100% Verified", step_3_title: "Documentation & Registration", step_3_desc: "We handle the complete paperwork — registry to mutation — for clean, undisputed ownership.", step_3_tag: "End-to-End Support", step_4_title: "Handover & After-Sales", step_4_desc: "Boundary marking, possession letter, and continued support if you're planning construction.", step_4_tag: "Lifetime Support" });
  const plotWhy    = usePageContent("plot_selling.why",     { eyebrow: "Why Choose TrustOn", title: "The", title_accent: "Trusted Choice", title_suffix: "in Lucknow", body: "With 73 families already invested across our projects, TrustOn has built its reputation on one principle: complete transparency at every step.", families_count: "73", families_label: "Families Already Invested", point_1_icon: "🏛️", point_1_title: "Government Certified", point_1_desc: "Every plot carries full Jila Panchayat approval — giving you complete legal security and peace of mind from day one.", point_2_icon: "📋", point_2_title: "Transparent Pricing", point_2_desc: "No hidden charges, no surprise fees. Our pricing is straightforward with complete cost breakdowns available at any stage.", point_3_icon: "📍", point_3_title: "Prime Locations", point_3_desc: "Strategically located in Dubagga and Gomti Nagar — connected to Lucknow Metro, NH-19, and the city's key corridors.", point_4_icon: "🤝", point_4_title: "Dedicated Relationship Manager", point_4_desc: "From first enquiry to final handover, you have one point of contact who knows your file and is always available." });
  const plotFaq    = usePageContent("plot_selling.faq",     { eyebrow: "FAQ", title: "Common", title_accent: "Questions" });
  const plotCta    = usePageContent("plot_selling.cta",     { eyebrow: "Start Your Journey", title: "Your Plot is", title_accent: "Waiting", phone: "+91 96160-61166" });

  // ── Filter state ──────────────────────────────────────────────────────────
  const [activeProject, setActiveProject] = useState("All Projects");
  const [activeType,    setActiveType]    = useState("All Types");
  const [activeStatus,  setActiveStatus]  = useState("All Status");
  const [activePriceIdx, setActivePriceIdx] = useState(0);
  const [activeAreaIdx,  setActiveAreaIdx]  = useState(0);
  const [selectedPlot,  setSelectedPlot]  = useState<Plot | null>(null);
  const [openFaq,       setOpenFaq]       = useState<number | null>(null);

  // Derive project list dynamically from data — new projects auto-appear
  const projectList = useMemo(() =>
    [...new Set(ALL_PLOTS.map((p) => p.project))].sort(),
    [],
  );

  // Combined filter logic: project → type → status → price → area
  const filteredPlots = useMemo(() => {
    const priceRange = PRICE_OPTS[activePriceIdx];
    const areaRange  = AREA_OPTS[activeAreaIdx];
    return ALL_PLOTS.filter((p) => {
      if (activeProject !== "All Projects" && p.project !== activeProject) return false;
      if (activeType === "Corner Plots" && p.type !== "corner")            return false;
      if (activeType === "Residential"  && p.type !== "residential")       return false;
      if (activeType === "Commercial"   && p.type !== "commercial")        return false;
      if (activeStatus !== "All Status" && p.status !== activeStatus.toLowerCase()) return false;
      if (p.priceL < priceRange.min || p.priceL > priceRange.max)         return false;
      if (p.areaSqFt < areaRange.min || p.areaSqFt > areaRange.max)       return false;
      return true;
    });
  }, [activeProject, activeType, activeStatus, activePriceIdx, activeAreaIdx]);

  // Reset drawer when filters change
  useEffect(() => { setSelectedPlot(null); }, [activeProject, activeType, activeStatus, activePriceIdx, activeAreaIdx]);

  // Active filter pills (for quick removal)
  const activeFilters: { label: string; reset: () => void }[] = [];
  if (activeProject !== "All Projects")    activeFilters.push({ label: activeProject,                       reset: () => setActiveProject("All Projects") });
  if (activeType !== "All Types")          activeFilters.push({ label: activeType,                          reset: () => setActiveType("All Types") });
  if (activeStatus !== "All Status")       activeFilters.push({ label: activeStatus,                        reset: () => setActiveStatus("All Status") });
  if (activePriceIdx !== 0)               activeFilters.push({ label: PRICE_OPTS[activePriceIdx].label,    reset: () => setActivePriceIdx(0) });
  if (activeAreaIdx !== 0)                activeFilters.push({ label: AREA_OPTS[activeAreaIdx].label,       reset: () => setActiveAreaIdx(0) });

  const clearAll = () => { setActiveProject("All Projects"); setActiveType("All Types"); setActiveStatus("All Status"); setActivePriceIdx(0); setActiveAreaIdx(0); };

  const steps = [
    { num: "01", title: String(plotProcess.step_1_title || "Site Visit & Consultation"),   desc: String(plotProcess.step_1_desc || "We show you the plot in person."),            tag: String(plotProcess.step_1_tag || "Zero Commitment") },
    { num: "02", title: String(plotProcess.step_2_title || "Legal Review & Verification"), desc: String(plotProcess.step_2_desc || "Our legal team reviews all documents."),      tag: String(plotProcess.step_2_tag || "100% Verified") },
    { num: "03", title: String(plotProcess.step_3_title || "Documentation & Registration"),desc: String(plotProcess.step_3_desc || "We handle the complete paperwork process."),  tag: String(plotProcess.step_3_tag || "End-to-End Support") },
    { num: "04", title: String(plotProcess.step_4_title || "Handover & After-Sales"),      desc: String(plotProcess.step_4_desc || "Plot handover with full boundary marking."),  tag: String(plotProcess.step_4_tag || "Lifetime Support") },
  ];

  const totalAvailable = filteredPlots.filter((p) => p.status === "available").length;

  return (
    <div style={{ background: "#04090f", color: "#e8e3da", minHeight: "100vh", overflowX: "hidden", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        .ps-btn-primary { background: #00BFFF; color: #04090f; padding: 13px 22px; border-radius: 4px; font-size: 13px; display: inline-flex; align-items: center; gap: 8px; font-weight: 600; text-decoration: none; transition: opacity .2s; }
        .ps-btn-primary:hover { opacity: 0.88; }
        .ps-btn-ghost { border: 0.5px solid rgba(255,255,255,0.15); padding: 13px 22px; border-radius: 4px; font-size: 13px; display: inline-flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.6); text-decoration: none; transition: border-color .2s, color .2s; }
        .ps-btn-ghost:hover { border-color: #00BFFF; color: #00BFFF; }
        .ps-chip { font-size: 12px; padding: 7px 15px; border: 0.5px solid rgba(255,255,255,0.1); border-radius: 999px; color: rgba(255,255,255,0.4); cursor: pointer; transition: all .15s ease; background: transparent; font-family: inherit; white-space: nowrap; }
        .ps-chip.active { background: #00BFFF; color: #04090f; border-color: #00BFFF; font-weight: 600; }
        .ps-chip:hover:not(.active) { border-color: rgba(0,191,255,0.4); color: rgba(0,191,255,0.8); }
        .ps-chip.status-available.active { background: rgba(0,191,255,0.15); color: #00BFFF; border-color: rgba(0,191,255,0.5); }
        .ps-chip.status-reserved.active  { background: rgba(212,169,106,0.15); color: #d4a96a; border-color: rgba(212,169,106,0.5); }
        .ps-chip.status-sold.active      { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); border-color: rgba(255,255,255,0.25); }
        .ps-select { background: #060c16; border: 0.5px solid rgba(255,255,255,0.12); color: #e8e3da; padding: 7px 28px 7px 12px; border-radius: 8px; font-size: 12px; font-family: inherit; cursor: pointer; outline: none; appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(0,191,255,0.5)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; transition: border-color .15s; }
        .ps-select:hover, .ps-select:focus { border-color: rgba(0,191,255,0.4); }
        .ps-select option { background: #060c16; }
        .ps-process-item { display: grid; grid-template-columns: 64px 1fr; gap: 20px; padding: 26px 0; border-top: 0.5px solid rgba(255,255,255,0.06); }
        .ps-process-item:last-child { border-bottom: 0.5px solid rgba(255,255,255,0.06); }
        .ps-faq-a { max-height: 0; overflow: hidden; transition: max-height .3s ease; }
        .ps-faq-a.open { max-height: 220px; }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ paddingTop: 96, paddingBottom: 56, borderBottom: "0.5px solid rgba(255,255,255,0.07)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={String(hero.image_url || plotImg)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.08) saturate(0.3)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #04090f 0%, rgba(4,9,15,0.6) 40%, #04090f 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 60% 30%, rgba(0,100,191,0.12) 0%, transparent 70%)" }} />
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, color: "#00BFFF", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00BFFF", display: "inline-block" }} />
              {String(hero.eyebrow || "Now Selling · Prime Estate & Green Valley · Lucknow")}
            </div>
            <h1 style={{ fontFamily: "serif", fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.01em", maxWidth: 720, color: "#e8e3da", marginBottom: 20 }}>
              Own the ground.<br />Build the{" "}
              <em style={{ fontStyle: "italic", color: "#00BFFF" }}>{String(hero.title_accent || "legacy.")}</em>
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "rgba(255,255,255,0.45)", maxWidth: 500, marginBottom: 32 }}>
              {String(hero.subtitle || "Jila Panchayat approved residential plots in Lucknow's fastest-growing corridors. Clear title. Highway connected. Metro ready.")}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="ps-btn-primary" href="#plan">View Available Plots →</a>
              <a className="ps-btn-ghost" href="tel:+919616061166">Call +91 96160-61166</a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", marginTop: 52, borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
              {[
                { num: String(ALL_PLOTS.length), lbl: "Total Plots" },
                { num: String(ALL_PLOTS.filter((p) => p.status === "available").length), lbl: "Available Now" },
                { num: String(projectList.length), lbl: "Projects" },
                { num: "25%",  lbl: "Avg. Annual Growth" },
              ].map((s, i) => (
                <div key={s.lbl} style={{ paddingTop: 22, borderRight: i < 3 ? "0.5px solid rgba(255,255,255,0.06)" : "none", paddingRight: i < 3 ? 20 : 0, paddingLeft: i > 0 ? 20 : 0 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 500, color: "#00BFFF", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 5 }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Site Plan ── */}
      <section style={{ padding: "72px 0", borderBottom: "0.5px solid rgba(255,255,255,0.07)" }} id="plan">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px" }}>

          {/* Section heading */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 32, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00BFFF", marginBottom: 10 }}>
                {String(plotMain.eyebrow || "Available Inventory")}
              </p>
              <h2 style={{ fontFamily: "serif", fontSize: "clamp(24px, 3.2vw, 36px)", fontWeight: 400, letterSpacing: "-0.01em", color: "#e8e3da" }}>
                {String(plotMain.title || "Select your")}{" "}
                <em style={{ fontStyle: "italic", color: "#00BFFF" }}>{String(plotMain.title_accent || "perfect plot")}</em>
              </h2>
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13.5, maxWidth: 340, lineHeight: 1.6 }}>
              {String(plotMain.body || "An honest site plan — not a brochure render. Every block reflects real status.")}
            </p>
          </div>

          {/* ── Filter Bar ── */}
          <div style={{ background: "#060c16", border: "0.5px solid rgba(0,191,255,0.12)", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>

            {/* Row 1: Project dropdown + type chips */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 14 }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", flexShrink: 0 }}>Project</span>
              <ProjectSelector
                projects={projectList}
                active={activeProject}
                onChange={setActiveProject}
              />
              <div style={{ width: "0.5px", height: 24, background: "rgba(255,255,255,0.08)", flexShrink: 0, display: "flex" }} />
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", flexShrink: 0 }}>Type</span>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {PLOT_TYPES.map((t) => (
                  <button key={t} onClick={() => setActiveType(t)} className={`ps-chip${activeType === t ? " active" : ""}`}>{t}</button>
                ))}
              </div>
            </div>

            {/* Row 2: Status chips + price select + area select */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", flexShrink: 0 }}>Status</span>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {STATUS_OPTS.map((s) => {
                  const statusClass = s === "Available" ? "status-available" : s === "Reserved" ? "status-reserved" : s === "Sold" ? "status-sold" : "";
                  return (
                    <button key={s} onClick={() => setActiveStatus(s)} className={`ps-chip ${statusClass}${activeStatus === s ? " active" : ""}`}>{s}</button>
                  );
                })}
              </div>
              <div style={{ width: "0.5px", height: 24, background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />
              <select value={activePriceIdx} onChange={(e) => setActivePriceIdx(Number(e.target.value))} className="ps-select" aria-label="Price range">
                {PRICE_OPTS.map((o, i) => <option key={o.label} value={i}>{o.label}</option>)}
              </select>
              <select value={activeAreaIdx} onChange={(e) => setActiveAreaIdx(Number(e.target.value))} className="ps-select" aria-label="Area range">
                {AREA_OPTS.map((o, i) => <option key={o.label} value={i}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Active filter pills + results count */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 14, flexWrap: "wrap", minHeight: 30 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              {activeFilters.map((f) => (
                <FilterPill key={f.label} label={f.label} onRemove={f.reset} />
              ))}
              {activeFilters.length > 1 && (
                <button onClick={clearAll} style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: "4px 6px" }}>
                  Clear all
                </button>
              )}
            </div>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "monospace", whiteSpace: "nowrap" }}>
              {filteredPlots.length} plots · <span style={{ color: "#00BFFF" }}>{totalAvailable} available</span>
            </span>
          </div>

          {/* Map */}
          <SitePlanMap visible={filteredPlots} selectedId={selectedPlot?.id ?? null} onSelect={setSelectedPlot} />
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ padding: "72px 0", borderBottom: "0.5px solid rgba(255,255,255,0.07)" }} id="process">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 40, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00BFFF", marginBottom: 10 }}>
                {String(plotProcess.eyebrow || "Our Process")}
              </p>
              <h2 style={{ fontFamily: "serif", fontSize: "clamp(24px, 3.2vw, 36px)", fontWeight: 400, letterSpacing: "-0.01em", color: "#e8e3da" }}>
                {String(plotProcess.title || "From enquiry to")}{" "}
                <em style={{ fontStyle: "italic", color: "#00BFFF" }}>{String(plotProcess.title_accent || "ownership")}</em>
              </h2>
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13.5, maxWidth: 280 }}>
              {String(plotProcess.body || "Four steps. No ambiguity at any of them.")}
            </p>
          </div>
          <div>
            {steps.map((step) => (
              <div key={step.num} className="ps-process-item">
                <div style={{ fontFamily: "monospace", color: "#00BFFF", fontSize: 12, paddingTop: 4, letterSpacing: "0.04em" }}>{step.num}</div>
                <div>
                  <h4 style={{ fontSize: 17, fontWeight: 500, marginBottom: 8, color: "#e8e3da" }}>{step.title}</h4>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13.5, lineHeight: 1.65, maxWidth: 560, marginBottom: 10 }}>{step.desc}</p>
                  <span style={{ fontSize: 10, color: "#00BFFF", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{step.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why TrustOn ── */}
      <section style={{ padding: "72px 0", borderBottom: "0.5px solid rgba(255,255,255,0.07)", background: "#060c16" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: "-16px", background: "rgba(0,191,255,0.04)", borderRadius: 20, filter: "blur(40px)" }} />
            <div style={{ position: "relative", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 12, overflow: "hidden" }}>
              <img src={luxuryInteriorImg} alt="Why TrustOn" style={{ width: "100%", objectFit: "cover", aspectRatio: "4/3", display: "block", filter: "brightness(0.65) saturate(0.8)" }} loading="lazy" />
            </div>
            <div style={{ position: "absolute", bottom: -20, right: -20, border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "20px 24px", background: "#060c16" }}>
              <p style={{ fontFamily: "serif", fontSize: 40, color: "#00BFFF", lineHeight: 1 }}>{String(plotWhy.families_count || "73")}</p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{String(plotWhy.families_label || "Families Already Invested")}</p>
            </div>
          </div>
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00BFFF", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 20, height: "0.5px", background: "#00BFFF", display: "inline-block" }} />
              {String(plotWhy.eyebrow || "Why Choose TrustOn")}
            </p>
            <h2 style={{ fontFamily: "serif", fontSize: "clamp(26px, 3.2vw, 38px)", fontWeight: 400, color: "#e8e3da", lineHeight: 1.2, marginBottom: 20 }}>
              {String(plotWhy.title || "The")}{" "}
              <em style={{ fontStyle: "italic", color: "#00BFFF" }}>{String(plotWhy.title_accent || "Trusted")}</em> Choice
              <br />{String(plotWhy.title_suffix || "in Lucknow")}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13.5, lineHeight: 1.65, marginBottom: 28 }}>
              {String(plotWhy.body || "With 73 families already invested across our projects, TrustOn has built its reputation on one principle: complete transparency at every step.")}
            </p>
            <div>
              {[
                { icon: String(plotWhy.point_1_icon || "🏛️"), title: String(plotWhy.point_1_title || "Government Certified"), desc: String(plotWhy.point_1_desc || "Every plot carries full Jila Panchayat approval.") },
                { icon: String(plotWhy.point_2_icon || "📋"), title: String(plotWhy.point_2_title || "Transparent Pricing"),    desc: String(plotWhy.point_2_desc || "No hidden charges, no surprise fees.") },
                { icon: String(plotWhy.point_3_icon || "📍"), title: String(plotWhy.point_3_title || "Prime Locations"),        desc: String(plotWhy.point_3_desc || "Strategically located in Lucknow's key corridors.") },
                { icon: String(plotWhy.point_4_icon || "🤝"), title: String(plotWhy.point_4_title || "Dedicated Relationship Manager"), desc: String(plotWhy.point_4_desc || "One point of contact throughout.") },
              ].map((pt) => (
                <div key={pt.title} style={{ display: "flex", alignItems: "flex-start", gap: 14, paddingBottom: 16, marginBottom: 16, borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ width: 38, height: 38, flexShrink: 0, borderRadius: 8, background: "rgba(0,191,255,0.08)", border: "0.5px solid rgba(0,191,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, marginTop: 2 }}>{pt.icon}</div>
                  <div>
                    <p style={{ fontSize: 13.5, fontWeight: 500, color: "#e8e3da", marginBottom: 4 }}>{pt.title}</p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.6 }}>{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "72px 0", borderBottom: "0.5px solid rgba(255,255,255,0.07)" }} id="faq">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00BFFF", marginBottom: 10 }}>
              {String(plotFaq.eyebrow || "FAQ")}
            </p>
            <h2 style={{ fontFamily: "serif", fontSize: "clamp(24px, 3.2vw, 36px)", fontWeight: 400, letterSpacing: "-0.01em", color: "#e8e3da" }}>
              {String(plotFaq.title || "Common")}{" "}
              <em style={{ fontStyle: "italic", color: "#00BFFF" }}>{String(plotFaq.title_accent || "questions")}</em>
            </h2>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <div key={faq.q} style={{ borderTop: "0.5px solid rgba(255,255,255,0.07)" }}>
                <div onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", cursor: "pointer" }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: "#e8e3da", flex: 1, paddingRight: 16 }}>{faq.q}</span>
                  <span style={{ fontSize: 18, color: "#00BFFF", transition: "transform .2s", transform: openFaq === i ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</span>
                </div>
                <div className={`ps-faq-a${openFaq === i ? " open" : ""}`}>
                  <p style={{ paddingBottom: 20, color: "rgba(255,255,255,0.4)", fontSize: 13.5, lineHeight: 1.65, maxWidth: 640 }}>{faq.a}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.07)" }} />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 0", textAlign: "center", background: "#060c16", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(0,191,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px", position: "relative" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00BFFF", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00BFFF", display: "inline-block" }} />
            {String(plotCta.eyebrow || "Start Your Journey")}
          </p>
          <h2 style={{ fontFamily: "serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, maxWidth: 560, margin: "0 auto 28px", color: "#e8e3da", lineHeight: 1.2 }}>
            Your plot is{" "}
            <em style={{ fontStyle: "italic", color: "#00BFFF" }}>{String(plotCta.title_accent || "waiting.")}</em>
          </h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a className="ps-btn-primary" href={`tel:${String(plotCta.phone || "+919616061166").replace(/\s|-/g, "")}`}>
              📞 {String(plotCta.phone || "+91 96160-61166")}
            </a>
            <a className="ps-btn-ghost" href="https://wa.me/919616061166?text=Hi%2C%20I%20am%20interested%20in%20TrustOn%20plots." target="_blank" rel="noopener noreferrer">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Plot drawer */}
      <PlotDrawer plot={selectedPlot} onClose={() => setSelectedPlot(null)} />
    </div>
  );
}
