import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  getSiteContentBlocks,
  saveSiteContentBlock,
  uploadMedia,
  seedDefaultContent,
} from "@/lib/content.functions";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin · TrustOn" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type ContentBlock = {
  id: string;
  key: string;
  label: string;
  data: unknown;
  created_at: string;
  updated_at: string;
};

type Toast = { id: number; type: "success" | "error" | "info"; message: string };

const SIDEBAR_NAV = [
  {
    section: "Inventory",
    items: [
      { label: "Plots & Projects", prefix: "plots.",          icon: DatabaseIcon },
    ],
  },
  {
    section: "Projects",
    items: [
      { label: "Prime Estate — Phases", prefix: "prime_estate.", icon: GridIcon },
    ],
  },
  {
    section: "Content",
    items: [
      { label: "Home",        prefix: "home.",            icon: HomeIcon },
      { label: "Testimonials",prefix: "home.testimonials",icon: VideoIcon },
      { label: "About Us",    prefix: "about.",           icon: BuildingIcon },
      { label: "About Videos",prefix: "about.videos",     icon: VideoIcon },
      { label: "Plot Selling",prefix: "plot_selling.",    icon: MapPinIcon },
      { label: "Projects",    prefix: "project",          icon: GridIcon },
      { label: "Construction",prefix: "construction.",    icon: WrenchIcon },
      { label: "Investment",  prefix: "investment.",      icon: ChartIcon },
      { label: "Architecture",prefix: "architecture.",    icon: PencilIcon },
      { label: "Lifestyle",   prefix: "lifestyle.",       icon: StarIcon },
      { label: "Contact",     prefix: "contact.",         icon: PhoneIcon },
      { label: "Blog",        prefix: "blog.",            icon: NewsIcon },
      { label: "Partners",    prefix: "channel_partner.", icon: UsersIcon },
    ],
  },
  {
    section: "Settings",
    items: [
      { label: "Footer",        prefix: "footer.", icon: LayersIcon },
      { label: "Site Settings", prefix: "site.",   icon: CogIcon },
    ],
  },
];

function previewUrl(blockKey: string): string | null {
  if (blockKey.startsWith("plots."))            return "/plot-selling";
  if (blockKey.startsWith("home."))             return "/";
  if (blockKey.startsWith("about."))            return "/about-us";
  if (blockKey.startsWith("contact."))          return "/contact";
  if (blockKey.startsWith("prime_estate."))      return "/projects/prime-estate";
  if (blockKey.startsWith("project"))           return "/project";
  if (blockKey.startsWith("plot_selling."))     return "/plot-selling";
  if (blockKey.startsWith("construction."))     return "/construction-build";
  if (blockKey.startsWith("investment."))       return "/investment-consulting";
  if (blockKey.startsWith("architecture."))     return "/architecture-design";
  if (blockKey.startsWith("lifestyle."))        return "/lifestyle";
  if (blockKey.startsWith("blog."))             return "/blog";
  if (blockKey.startsWith("channel_partner.") || blockKey.startsWith("partner.")) return "/channel-partner";
  if (blockKey.startsWith("footer."))           return "/";
  return null;
}

// Color mapping for block icon backgrounds (by section prefix)
function blockIconStyle(key: string): { bg: string; color: string } {
  const p = key.split(".")[0];
  if (p === "plots")                                           return { bg: "rgba(212,169,106,0.12)",  color: "#d4a96a" };
  if (["home", "plot_selling", "project"].includes(p))        return { bg: "rgba(0,191,255,0.10)",    color: "#00BFFF" };
  if (["about", "construction", "architecture"].includes(p))  return { bg: "rgba(74,222,128,0.08)",   color: "#4ade80" };
  if (["investment", "lifestyle", "blog"].includes(p))        return { bg: "rgba(167,139,250,0.10)",  color: "#a78bfa" };
  if (["contact", "channel_partner", "partner", "footer", "site"].includes(p)) return { bg: "rgba(212,169,106,0.10)", color: "#d4a96a" };
  return { bg: "rgba(0,191,255,0.08)", color: "#00BFFF" };
}

function tagStyle(key: string): { color: string; bg: string; border: string } {
  const p = key.split(".")[0];
  if (p === "plots")                                          return { color: "#d4a96a",  bg: "rgba(212,169,106,0.08)", border: "rgba(212,169,106,0.2)" };
  if (["home", "plot_selling", "project"].includes(p))        return { color: "#00BFFF",  bg: "rgba(0,191,255,0.08)",   border: "rgba(0,191,255,0.2)" };
  if (["about", "construction", "architecture"].includes(p))  return { color: "#4ade80",  bg: "rgba(74,222,128,0.07)",  border: "rgba(74,222,128,0.2)" };
  if (["investment", "lifestyle", "blog"].includes(p))        return { color: "#a78bfa",  bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.2)" };
  return { color: "#d4a96a", bg: "rgba(212,169,106,0.08)", border: "rgba(212,169,106,0.2)" };
}

function AdminPage() {
  const { isAdmin, loading, user } = useAuth();
  const navigate = useNavigate();
  const fetchBlocks  = useServerFn(getSiteContentBlocks);
  const saveBlockFn  = useServerFn(saveSiteContentBlock);
  const uploadFn     = useServerFn(uploadMedia);
  const seedFn       = useServerFn(seedDefaultContent);

  const [blocks, setBlocks]         = useState<ContentBlock[]>([]);
  const [editJson, setEditJson]     = useState<Record<string, string>>({});
  const [toasts, setToasts]         = useState<Toast[]>([]);
  const [filter, setFilter]         = useState("");
  const [activeTab, setActiveTab]   = useState("home.");
  const [savingKey, setSavingKey]   = useState<string | null>(null);
  const [lastSavedKey, setLastSavedKey] = useState<string | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [seeding, setSeeding]       = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadPanelOpen, setUploadPanelOpen] = useState(false);
  const toastCount = useRef(0);

  useEffect(() => {
    if (!loading && !isAdmin) navigate({ to: "/admin/login" });
  }, [isAdmin, loading, navigate]);

  const addToast = (type: Toast["type"], message: string) => {
    const id = ++toastCount.current;
    setToasts((prev) => [...prev.slice(-3), { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 6000);
  };

  const loadBlocks = () => {
    fetchBlocks()
      .then((data) => {
        setBlocks(data);
        setEditJson(
          Object.fromEntries(data.map((b) => [b.key, JSON.stringify(b.data ?? {}, null, 2)])),
        );
      })
      .catch((err) => addToast("error", `Failed to load: ${err instanceof Error ? err.message : String(err)}`));
  };

  useEffect(() => { loadBlocks(); }, [fetchBlocks]);

  const filteredBlocks = useMemo(() => {
    return blocks.filter((b) => {
      const matchTab = !activeTab || b.key.startsWith(activeTab);
      const s = filter.toLowerCase();
      const matchSearch =
        !s ||
        b.key.toLowerCase().includes(s) ||
        b.label.toLowerCase().includes(s) ||
        JSON.stringify(b.data).toLowerCase().includes(s);
      return matchTab && matchSearch;
    });
  }, [blocks, filter, activeTab]);

  const handleSeed = async (overwrite: boolean) => {
    setSeeding(true);
    addToast("info", overwrite ? "Resetting all blocks to defaults…" : "Initialising missing sections…");
    try {
      await seedFn({ data: { overwrite } });
      loadBlocks();
      addToast("success", overwrite ? "✓ All content reset to defaults." : "✓ All missing sections initialized.");
    } catch (err) {
      addToast("error", `Seed failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSeeding(false);
    }
  };

  const handleSave = async (block: ContentBlock) => {
    const raw = editJson[block.key] ?? JSON.stringify(block.data ?? {}, null, 2);
    let parsed: unknown;
    try { parsed = JSON.parse(raw); } catch {
      addToast("error", "Invalid JSON — fix the formatting before saving.");
      return;
    }
    setSavingKey(block.key);
    try {
      const saved = await saveBlockFn({ data: { key: block.key, label: block.label, data: parsed } });
      setBlocks((prev) => prev.map((b) => (b.key === saved.key ? saved : b)));
      setEditJson((prev) => ({ ...prev, [saved.key]: JSON.stringify(saved.data ?? {}, null, 2) }));
      setLastSavedKey(saved.key);
      setTimeout(() => setLastSavedKey(null), 4000);
      addToast("success", `✓ "${saved.label}" saved! Changes are live on the website.`);
    } catch (err) {
      addToast("error", `Save failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSavingKey(null);
    }
  };

  const uploadFile = async (file: File, fieldKey: string, onUrl: (url: string) => void) => {
    setUploadingField(fieldKey);
    try {
      const base64 = await fileToBase64(file);
      const { url } = await uploadFn({
        data: { filename: file.name, contentType: file.type || "application/octet-stream", base64 },
      });
      onUrl(url);
      addToast("success", `✓ "${file.name}" uploaded and applied to the field.`);
    } catch (err) {
      addToast("error", `Upload failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setUploadingField(null);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  const activeSectionLabel =
    SIDEBAR_NAV.flatMap((g) => g.items).find((i) => i.prefix === activeTab)?.label ?? "All Sections";

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#040910" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 28, height: 28, border: "2px solid rgba(0,191,255,0.2)", borderTop: "2px solid #00BFFF", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 14px" }} />
          <p style={{ color: "rgba(0,191,255,0.5)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em" }}>Verifying access…</p>
        </div>
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  const C = {
    bgPrimary:   "#0c111c",
    bgSecondary: "#070c16",
    bgTertiary:  "#040910",
    textPrimary: "#e8e3da",
    textSecondary:"rgba(232,227,218,0.55)",
    textTertiary: "rgba(232,227,218,0.28)",
    border:      "rgba(0,191,255,0.1)",
    borderMd:    "rgba(0,191,255,0.18)",
  };

  return (
    <div data-admin-panel style={{ display: "grid", gridTemplateColumns: sidebarOpen ? "210px 1fr" : "0px 1fr", height: "100vh", width: "100%", background: C.bgTertiary, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", overflow: "hidden", transition: "grid-template-columns .25s ease" }}>
      <style>{`
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        *{box-sizing:border-box;}
        .adm-nav-item{display:flex;align-items:center;justify-content:space-between;padding:6px 10px;margin:1px 0;border-radius:7px;cursor:pointer;font-size:12px;color:${C.textSecondary};transition:background .12s,color .12s;border:none;background:transparent;width:100%;text-align:left;}
        .adm-nav-item:hover{background:rgba(0,191,255,0.06);color:${C.textPrimary};}
        .adm-nav-item.active{background:rgba(0,191,255,0.1);color:#00BFFF;font-weight:600;}
        .adm-icon-btn{width:30px;height:30px;display:flex;align-items:center;justify-content:center;border:0.5px solid ${C.border};border-radius:7px;cursor:pointer;color:${C.textSecondary};background:${C.bgSecondary};transition:background .12s,color .12s;}
        .adm-icon-btn:hover{background:rgba(0,191,255,0.08);color:#00BFFF;}
        .adm-save-btn{font-size:12px;font-weight:600;padding:6px 16px;border-radius:7px;border:none;background:#00BFFF;cursor:pointer;color:#04090f;font-family:inherit;transition:opacity .15s;}
        .adm-save-btn:hover{opacity:0.85;}
        .adm-save-btn:disabled{opacity:0.45;cursor:default;}
        .adm-field input,.adm-field textarea{font-size:12.5px;padding:7px 10px;border:0.5px solid ${C.borderMd};border-radius:7px;background:${C.bgTertiary};color:${C.textPrimary};font-family:inherit;resize:none;width:100%;outline:none;transition:border-color .12s,background .12s;}
        .adm-field input:focus,.adm-field textarea:focus{border-color:rgba(0,191,255,0.5);background:${C.bgSecondary};}
        .adm-upload-btn{display:flex;align-items:center;gap:5px;font-size:11px;padding:7px 11px;border:0.5px solid ${C.borderMd};border-radius:7px;background:${C.bgSecondary};cursor:pointer;white-space:nowrap;color:${C.textSecondary};font-family:inherit;transition:background .12s,color .12s;}
        .adm-upload-btn:hover{background:rgba(0,191,255,0.08);color:#00BFFF;}
        .adm-foot-link{display:flex;align-items:center;gap:4px;font-size:11px;color:${C.textTertiary};text-decoration:none;cursor:pointer;background:none;border:none;font-family:inherit;transition:color .12s;}
        .adm-foot-link:hover{color:${C.textSecondary};}
        .adm-foot-link.blue{color:rgba(0,191,255,0.6);}
        .adm-foot-link.blue:hover{color:#00BFFF;}
        .adm-content-scroll::-webkit-scrollbar{width:4px;}
        .adm-content-scroll::-webkit-scrollbar-thumb{background:${C.border};border-radius:4px;}
        .adm-nav-scroll::-webkit-scrollbar{width:3px;}
        .adm-nav-scroll::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px;}
      `}</style>

      {/* ── Sidebar ── */}
      <div style={{ background: C.bgSecondary, borderRight: `0.5px solid ${C.border}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Brand */}
        <div style={{ padding: "16px 12px 12px", borderBottom: `0.5px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, background: "#00BFFF", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#04090f", fontSize: 13, fontWeight: 700 }}>T</span>
            </div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: C.textPrimary }}>Truston</div>
              <div style={{ fontSize: 10, color: "rgba(0,191,255,0.55)" }}>Admin Dashboard</div>
            </div>
          </div>
          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 10px", background: C.bgTertiary, border: `0.5px solid ${C.border}`, borderRadius: 7 }}>
            <SearchIcon size={13} style={{ color: C.textTertiary, flexShrink: 0 }} />
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search sections…"
              style={{ border: "none", background: "transparent", outline: "none", fontSize: 12, color: C.textPrimary, width: "100%", fontFamily: "inherit" }}
            />
          </div>
        </div>

        {/* Nav */}
        <nav className="adm-nav-scroll" style={{ flex: 1, overflowY: "auto", padding: "6px 8px 8px" }}>
          {SIDEBAR_NAV.map((group) => (
            <div key={group.section} style={{ paddingTop: 10 }}>
              <div style={{ fontSize: 9.5, fontWeight: 600, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 6px 5px" }}>
                {group.section}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.prefix;
                const count = blocks.filter((b) => b.key.startsWith(item.prefix)).length;
                return (
                  <button key={item.prefix} onClick={() => setActiveTab(item.prefix)} className={`adm-nav-item${active ? " active" : ""}`}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <Icon size={14} />
                      {item.label}
                    </div>
                    {count > 0 && (
                      <span style={{
                        fontSize: 10, padding: "1px 6px", borderRadius: 10, minWidth: 20, textAlign: "center",
                        background: active ? "rgba(0,191,255,0.15)" : `${C.bgTertiary}`,
                        color: active ? "#00BFFF" : C.textTertiary,
                        border: `0.5px solid ${active ? "rgba(0,191,255,0.25)" : C.border}`,
                      }}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div style={{ padding: "10px 12px", borderTop: `0.5px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(0,191,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#00BFFF", flexShrink: 0, border: `0.5px solid rgba(0,191,255,0.25)` }}>
              {user?.email?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: C.textPrimary, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.email ?? "Admin"}</div>
              <div style={{ fontSize: 9.5, color: "rgba(0,191,255,0.45)" }}>Super Admin</div>
            </div>
            <button onClick={signOut} title="Sign out" style={{ background: "none", border: "none", cursor: "pointer", color: C.textTertiary, padding: 4, display: "flex", flexShrink: 0, transition: "color .12s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#00BFFF"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.textTertiary; }}>
              <LogoutIcon size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>

        {/* Topbar */}
        <div style={{ padding: "0 20px", height: 50, borderBottom: `0.5px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: C.bgPrimary, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setSidebarOpen((v) => !v)} className="adm-icon-btn" style={{ marginRight: 4 }}>
              <MenuIcon size={15} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: C.textTertiary }}>
              <span>Website</span>
              <span style={{ fontSize: 10 }}>›</span>
              <b style={{ color: C.textPrimary, fontWeight: 500 }}>{activeSectionLabel}</b>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            {/* Status */}
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#4ade80", background: "rgba(74,222,128,0.08)", border: "0.5px solid rgba(74,222,128,0.2)", borderRadius: 20, padding: "4px 10px" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              Ready
            </div>
            <a href="/" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(0,191,255,0.7)", background: "rgba(0,191,255,0.08)", border: "0.5px solid rgba(0,191,255,0.2)", borderRadius: 20, padding: "4px 10px", textDecoration: "none", transition: "background .12s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,191,255,0.14)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,191,255,0.08)"; }}
            >
              <EyeIcon size={12} /> Live site
            </a>
            <button onClick={() => handleSeed(false)} disabled={seeding} className="adm-icon-btn" title="Initialize missing sections">
              <ResetIcon size={14} />
            </button>
            <button
              onClick={() => { if (confirm("Reset ALL content to factory defaults? Your edits will be overwritten.")) handleSeed(true); }}
              disabled={seeding}
              className="adm-icon-btn"
              title="Reset to defaults"
              style={{ color: "rgba(248,113,113,0.6)" }}
            >
              <RefreshIcon size={14} />
            </button>
            <button onClick={() => setUploadPanelOpen((v) => !v)} className="adm-icon-btn" title="Upload media">
              <UploadIcon size={14} />
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, padding: "10px 20px", borderBottom: `0.5px solid ${C.border}`, background: C.bgPrimary, flexShrink: 0 }}>
          {[
            { label: "Total Blocks", value: String(blocks.length) },
            { label: "Showing",      value: String(filteredBlocks.length) },
            { label: "Section",      value: activeSectionLabel },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: C.bgSecondary, borderRadius: 7, padding: "8px 12px" }}>
              <div style={{ fontSize: 9.5, color: C.textTertiary, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
              <div style={{ fontSize: 19, fontWeight: 500, color: C.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Content area */}
        <div className="adm-content-scroll" style={{ flex: 1, overflowY: "auto", padding: "14px 20px 28px" }}>

          {/* Upload media panel */}
          {uploadPanelOpen && (
            <div style={{ background: C.bgPrimary, border: `0.5px solid ${C.border}`, borderRadius: 10, marginBottom: 12, overflow: "hidden" }}>
              <MediaUploadPanel onToast={addToast} uploadFn={uploadFn} onClose={() => setUploadPanelOpen(false)} />
            </div>
          )}

          {/* Empty state */}
          {blocks.length === 0 && (
            <div style={{ border: `0.5px solid rgba(0,191,255,0.12)`, background: "rgba(0,191,255,0.03)", borderRadius: 10, padding: "40px 24px", textAlign: "center", marginTop: 8 }}>
              <p style={{ color: "#00BFFF", fontWeight: 500, marginBottom: 8, fontSize: 14 }}>No content sections yet</p>
              <p style={{ color: C.textTertiary, fontSize: 12, marginBottom: 16 }}>Click Initialize to seed all editable sections.</p>
              <button onClick={() => handleSeed(false)} disabled={seeding}
                style={{ background: "rgba(0,191,255,0.1)", border: "0.5px solid rgba(0,191,255,0.25)", color: "#00BFFF", padding: "8px 20px", borderRadius: 7, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                {seeding ? "Working…" : "Initialize All Sections Now"}
              </button>
            </div>
          )}

          {filteredBlocks.length === 0 && blocks.length > 0 && (
            <div style={{ border: `0.5px solid ${C.border}`, background: C.bgPrimary, borderRadius: 10, padding: "28px", textAlign: "center" }}>
              <p style={{ color: C.textTertiary, fontSize: 12, marginBottom: 8 }}>No sections match this filter.</p>
              <button onClick={() => { setFilter(""); setActiveTab("home."); }}
                style={{ color: "#00BFFF", fontSize: 11, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                Clear filters
              </button>
            </div>
          )}

          {/* Plots & Projects CRUD (special tab) */}
          {activeTab === "plots." ? (
            <PlotInventoryEditor
              blocks={blocks}
              saveBlockFn={saveBlockFn}
              uploadFn={uploadFn}
              onToast={addToast}
              colors={C}
            />
          ) : activeTab === "prime_estate." ? (
            <PrimeEstatePhasesEditor
              blocks={blocks}
              saveBlockFn={saveBlockFn}
              onToast={addToast}
              colors={C}
            />
          ) : activeTab === "home.testimonials" ? (
            <TestimonialsEditor
              blocks={blocks}
              saveBlockFn={saveBlockFn}
              uploadFn={uploadFn}
              onToast={addToast}
              onBlockSaved={(saved) => setBlocks((prev) => prev.some((b) => b.key === saved.key) ? prev.map((b) => b.key === saved.key ? saved : b) : [...prev, saved])}
              colors={C}
            />
          ) : activeTab === "about.videos" ? (
            <AboutVideosEditor
              blocks={blocks}
              saveBlockFn={saveBlockFn}
              uploadFn={uploadFn}
              onToast={addToast}
              onBlockSaved={(saved) => setBlocks((prev) => prev.some((b) => b.key === saved.key) ? prev.map((b) => b.key === saved.key ? saved : b) : [...prev, saved])}
              colors={C}
            />
          ) : (
            /* Block Cards */
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {filteredBlocks.map((block) => (
                <BlockCard
                  key={block.key}
                  block={block}
                  value={editJson[block.key] ?? JSON.stringify(block.data ?? {}, null, 2)}
                  onChange={(v) => setEditJson((prev) => ({ ...prev, [block.key]: v }))}
                  onSave={() => handleSave(block)}
                  saving={savingKey === block.key}
                  justSaved={lastSavedKey === block.key}
                  uploadingField={uploadingField}
                  onUpload={uploadFile}
                  colors={C}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Toast Stack */}
      <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 50, display: "flex", flexDirection: "column", gap: 7, maxWidth: 340, pointerEvents: "none" }}>
        {toasts.map((t) => (
          <div key={t.id} style={{
            pointerEvents: "auto", display: "flex", alignItems: "flex-start", gap: 9,
            padding: "9px 13px", borderRadius: 8, fontSize: 12, fontWeight: 500,
            border: `0.5px solid ${t.type === "success" ? "rgba(74,222,128,0.25)" : t.type === "error" ? "rgba(248,113,113,0.25)" : "rgba(0,191,255,0.2)"}`,
            background: t.type === "success" ? "rgba(2,44,34,0.97)" : t.type === "error" ? "rgba(44,2,2,0.97)" : "rgba(4,9,30,0.97)",
            color: t.type === "success" ? "#4ade80" : t.type === "error" ? "#f87171" : "#00BFFF",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}>
            <span>{t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Media Upload Panel ──────────────────────────────────────────────────────
function MediaUploadPanel({
  onToast, uploadFn, onClose,
}: {
  onToast: (type: "success" | "error" | "info", msg: string) => void;
  uploadFn: ReturnType<typeof useServerFn<typeof uploadMedia>>;
  onClose: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [lastUrl, setLastUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFile = async (file: File) => {
    if (!file) return;
    setUploading(true);
    setLastUrl("");
    setCopied(false);
    try {
      const base64 = await fileToBase64(file);
      const { url } = await uploadFn({
        data: { filename: file.name, contentType: file.type || "application/octet-stream", base64 },
      });
      setLastUrl(url);
      onToast("success", `✓ "${file.name}" uploaded!`);
    } catch (err) {
      onToast("error", `Upload failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = async () => {
    if (!lastUrl) return;
    await navigator.clipboard.writeText(lastUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isVideo = lastUrl.match(/\.(mp4|webm|mov|avi|mkv)(\?|$)/i);
  const C = { border: "rgba(0,191,255,0.12)", text: "rgba(232,227,218,0.5)", bg: "#040910" };

  return (
    <div style={{ padding: "12px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <UploadIcon size={13} style={{ color: "#00BFFF" }} />
          <span style={{ fontSize: 12.5, fontWeight: 500, color: "rgba(232,227,218,0.8)" }}>Upload Media</span>
          <span style={{ fontSize: 10, color: C.text }}>Images & Videos → copy URL to paste in fields</span>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.text, fontSize: 14, fontFamily: "inherit" }}>✕</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}>
          <label style={{
            display: "flex", alignItems: "center", gap: 7, padding: "8px 16px",
            border: `1px dashed ${uploading ? "rgba(0,191,255,0.15)" : "rgba(0,191,255,0.35)"}`,
            borderRadius: 7, cursor: uploading ? "wait" : "pointer", fontSize: 12,
            color: uploading ? "rgba(0,191,255,0.35)" : "#00BFFF", background: "rgba(0,191,255,0.04)", flexShrink: 0,
          }}>
            {uploading ? (
              <span style={{ width: 13, height: 13, border: "2px solid rgba(0,191,255,0.25)", borderTop: "2px solid #00BFFF", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
            ) : <UploadIcon size={13} />}
            {uploading ? "Uploading…" : "Choose File"}
            <input type="file" accept="image/*,video/*,.mp4,.webm,.mov" disabled={uploading} style={{ display: "none" }}
              onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) handleFile(f); }} />
          </label>

          {lastUrl && !uploading && (
            <div style={{ flex: 1, minWidth: 200, border: "0.5px solid rgba(74,222,128,0.18)", background: "rgba(74,222,128,0.04)", borderRadius: 7, padding: "9px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: "#4ade80", fontWeight: 500 }}>✓ Uploaded</span>
                <button onClick={copyUrl}
                  style={{ padding: "2px 9px", borderRadius: 5, fontSize: 10, fontWeight: 600, border: "none", cursor: "pointer", background: copied ? "rgba(74,222,128,0.15)" : "rgba(0,191,255,0.1)", color: copied ? "#4ade80" : "#00BFFF", fontFamily: "inherit" }}>
                  {copied ? "Copied ✓" : "Copy URL"}
                </button>
              </div>
              <p style={{ fontSize: 9.5, color: C.text, fontFamily: "monospace", wordBreak: "break-all", marginBottom: 6 }}>{lastUrl}</p>
              {isVideo
                ? <video src={lastUrl} controls style={{ width: "100%", maxHeight: 100, borderRadius: 5, background: "#000" }} />
                : <img src={lastUrl} alt="preview" style={{ height: 60, borderRadius: 5, objectFit: "cover", border: `0.5px solid ${C.border}` }} />
              }
            </div>
          )}
        </div>
        <p style={{ fontSize: 10, color: "rgba(232,227,218,0.2)" }}>Supports JPG, PNG, WebP, MP4, WebM. Files are uploaded to your storage bucket.</p>
      </div>
    </div>
  );
}

// ── Prime Estate Phases Editor ────────────────────────────────────────────────
type PhaseItem = {
  active: boolean;
  badge: string;
  num: string;
  title: string;
  desc: string;
  items: string[];
};

function PrimeEstatePhasesEditor({
  blocks, saveBlockFn, onToast, colors,
}: {
  blocks: ContentBlock[];
  saveBlockFn: ReturnType<typeof useServerFn<typeof saveSiteContentBlock>>;
  onToast: (type: "success" | "error" | "info", msg: string) => void;
  colors: Record<string, string>;
}) {
  const C = colors;
  const phasesBlock = blocks.find((b) => b.key === "prime_estate.phases");

  const parsePhases = (block: ContentBlock | undefined): PhaseItem[] => {
    if (!block?.data) return [];
    const d = block.data as Record<string, unknown>;
    return Array.isArray(d.phases) ? (d.phases as PhaseItem[]) : [];
  };

  const [phases, setPhases] = useState<PhaseItem[]>(() => parsePhases(phasesBlock));
  const [saving, setSaving] = useState(false);

  useEffect(() => { setPhases(parsePhases(phasesBlock)); }, [blocks]);

  const save = async () => {
    if (!phasesBlock) { onToast("error", "Prime Estate Phases block not found. Click Initialize first."); return; }
    setSaving(true);
    try {
      const d = phasesBlock.data as Record<string, unknown>;
      await saveBlockFn({
        data: {
          key: "prime_estate.phases",
          label: "Prime Estate — Development Phases",
          data: { ...d, phases },
        },
      });
      onToast("success", "✓ Phases saved! Changes are live on the website.");
    } catch (err) {
      onToast("error", `Save failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSaving(false);
    }
  };

  const addPhase = () => {
    const num = String(phases.length + 1).padStart(2, "0");
    setPhases((prev) => [
      ...prev,
      { active: false, badge: "Coming Soon", num, title: `Phase ${phases.length + 1}`, desc: "", items: [] },
    ]);
  };

  const removePhase = (idx: number) => {
    if (!confirm("Remove this phase from the website?")) return;
    setPhases((prev) => prev.filter((_, i) => i !== idx));
  };

  const updatePhase = (idx: number, key: keyof PhaseItem, value: unknown) => {
    setPhases((prev) => prev.map((ph, i) => i === idx ? { ...ph, [key]: value } : ph));
  };

  const addItem = (idx: number) => {
    setPhases((prev) => prev.map((ph, i) => i === idx ? { ...ph, items: [...ph.items, ""] } : ph));
  };

  const updateItem = (phIdx: number, itemIdx: number, value: string) => {
    setPhases((prev) => prev.map((ph, i) => {
      if (i !== phIdx) return ph;
      const items = ph.items.map((it, j) => j === itemIdx ? value : it);
      return { ...ph, items };
    }));
  };

  const removeItem = (phIdx: number, itemIdx: number) => {
    setPhases((prev) => prev.map((ph, i) => {
      if (i !== phIdx) return ph;
      return { ...ph, items: ph.items.filter((_, j) => j !== itemIdx) };
    }));
  };

  const inp = { fontSize: 12.5, padding: "7px 10px", border: `0.5px solid ${C.borderMd}`, borderRadius: 7, background: C.bgTertiary, color: C.textPrimary, fontFamily: "inherit", width: "100%", outline: "none" };
  const label = { fontSize: 10.5, color: C.textTertiary, textTransform: "uppercase" as const, letterSpacing: "0.06em", display: "block", marginBottom: 5, fontWeight: 600 };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: C.bgPrimary, border: `0.5px solid ${C.border}`, borderRadius: 10 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>Prime Estate — Development Phases</p>
          <p style={{ fontSize: 11, color: C.textTertiary, marginTop: 2 }}>
            {phases.length} phase{phases.length !== 1 ? "s" : ""} · Shown on the project detail page
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <a href="/projects/prime-estate" target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(0,191,255,0.7)", background: "rgba(0,191,255,0.08)", border: "0.5px solid rgba(0,191,255,0.2)", borderRadius: 20, padding: "5px 12px", textDecoration: "none" }}>
            <EyeIcon size={11} /> Preview
          </a>
          <button onClick={addPhase}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, padding: "6px 14px", background: "rgba(0,191,255,0.1)", border: "0.5px solid rgba(0,191,255,0.25)", color: "#00BFFF", borderRadius: 7, cursor: "pointer", fontFamily: "inherit" }}>
            <PlusIcon size={12} /> Add Phase
          </button>
          <button onClick={save} disabled={saving}
            style={{ fontSize: 12, fontWeight: 600, padding: "6px 18px", background: "#00BFFF", border: "none", color: "#04090f", borderRadius: 7, cursor: saving ? "default" : "pointer", opacity: saving ? 0.55 : 1, fontFamily: "inherit" }}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      {phases.length === 0 && (
        <div style={{ textAlign: "center", padding: "36px 20px", border: `0.5px dashed ${C.border}`, borderRadius: 10, color: C.textTertiary, fontSize: 12 }}>
          No phases yet. Click <b style={{ color: "#00BFFF" }}>Add Phase</b> to create the first one, then Save.
        </div>
      )}

      {/* Phase Cards */}
      {phases.map((ph, i) => (
        <div key={i} style={{ background: C.bgPrimary, border: `0.5px solid ${ph.active ? "rgba(0,191,255,0.3)" : C.border}`, borderRadius: 10, overflow: "hidden" }}>
          {/* Phase header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: `0.5px solid ${C.border}`, background: ph.active ? "rgba(0,191,255,0.04)" : "transparent" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: ph.active ? "#00BFFF" : C.textTertiary, background: ph.active ? "rgba(0,191,255,0.1)" : "rgba(255,255,255,0.05)", border: `0.5px solid ${ph.active ? "rgba(0,191,255,0.25)" : "rgba(255,255,255,0.08)"}`, borderRadius: 20, padding: "2px 10px" }}>
                Phase {i + 1}
              </span>
              <span style={{ fontSize: 11, color: C.textSecondary }}>{ph.title || "Untitled"}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.textSecondary, cursor: "pointer" }}>
                <input type="checkbox" checked={ph.active} onChange={(e) => updatePhase(i, "active", e.target.checked)}
                  style={{ accentColor: "#00BFFF", width: 13, height: 13 }} />
                Active (highlighted)
              </label>
              <button onClick={() => removePhase(i)}
                style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, padding: "4px 10px", background: "rgba(248,113,113,0.07)", border: "0.5px solid rgba(248,113,113,0.2)", color: "#f87171", borderRadius: 6, cursor: "pointer", fontFamily: "inherit" }}>
                <TrashIcon size={11} /> Remove
              </button>
            </div>
          </div>

          {/* Fields */}
          <div style={{ padding: "14px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <span style={label}>Title</span>
              <input style={inp} value={ph.title} onChange={(e) => updatePhase(i, "title", e.target.value)} placeholder="Phase One" />
            </div>
            <div>
              <span style={label}>Badge Label</span>
              <input style={inp} value={ph.badge} onChange={(e) => updatePhase(i, "badge", e.target.value)} placeholder="Now Available / Coming Soon" />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <span style={label}>Description</span>
              <textarea style={{ ...inp, resize: "vertical", minHeight: 64 }} value={ph.desc} onChange={(e) => updatePhase(i, "desc", e.target.value)} placeholder="Describe this phase…" />
            </div>

            {/* Bullet Items */}
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={label}>Bullet Points</span>
                <button onClick={() => addItem(i)}
                  style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10.5, padding: "3px 9px", background: "rgba(0,191,255,0.08)", border: "0.5px solid rgba(0,191,255,0.2)", color: "#00BFFF", borderRadius: 5, cursor: "pointer", fontFamily: "inherit" }}>
                  <PlusIcon size={10} /> Add Point
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {ph.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ color: "#00BFFF", fontSize: 14, flexShrink: 0 }}>•</span>
                    <input style={{ ...inp, flex: 1 }} value={item} onChange={(e) => updateItem(i, j, e.target.value)} placeholder="Enter bullet point…" />
                    <button onClick={() => removeItem(i, j)}
                      style={{ flexShrink: 0, padding: "6px 8px", background: "rgba(248,113,113,0.07)", border: "0.5px solid rgba(248,113,113,0.15)", color: "#f87171", borderRadius: 5, cursor: "pointer", fontSize: 11, fontFamily: "inherit" }}>
                      ✕
                    </button>
                  </div>
                ))}
                {ph.items.length === 0 && (
                  <p style={{ fontSize: 11, color: C.textTertiary, fontStyle: "italic" }}>No bullet points yet. Click Add Point above.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {phases.length > 0 && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={addPhase}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, padding: "7px 16px", background: "rgba(0,191,255,0.08)", border: "0.5px solid rgba(0,191,255,0.2)", color: "#00BFFF", borderRadius: 7, cursor: "pointer", fontFamily: "inherit" }}>
            <PlusIcon size={12} /> Add Another Phase
          </button>
          <button onClick={save} disabled={saving}
            style={{ fontSize: 12, fontWeight: 600, padding: "7px 20px", background: "#00BFFF", border: "none", color: "#04090f", borderRadius: 7, cursor: saving ? "default" : "pointer", opacity: saving ? 0.55 : 1, fontFamily: "inherit" }}>
            {saving ? "Saving…" : "Save All Changes"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Plot Inventory Editor ─────────────────────────────────────────────────────
type PlotRow = {
  id: string; project: string; phase: string; type: string; status: string;
  areaSqFt: number; priceL: number; dim: string; face: string; road: string;
  price: string; per: string; tag: string;
};

function PlotInventoryEditor({
  blocks, saveBlockFn, onToast, colors,
}: {
  blocks: ContentBlock[];
  saveBlockFn: ReturnType<typeof useServerFn<typeof saveSiteContentBlock>>;
  uploadFn: ReturnType<typeof useServerFn<typeof uploadMedia>>;
  onToast: (type: "success" | "error" | "info", msg: string) => void;
  colors: Record<string, string>;
}) {
  const C = colors;
  const inventoryBlock = blocks.find((b) => b.key === "plots.inventory");
  const [plots, setPlots] = useState<PlotRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProjectName, setNewProjectName] = useState("");
  const [showNewProject, setShowNewProject] = useState(false);

  useEffect(() => {
    if (inventoryBlock?.data && typeof inventoryBlock.data === "object") {
      const raw = (inventoryBlock.data as Record<string, unknown>).plots;
      if (Array.isArray(raw)) setPlots(raw as PlotRow[]);
    }
  }, [inventoryBlock]);

  const projectGroups = useMemo(() => {
    const map = new Map<string, PlotRow[]>();
    plots.forEach((p) => {
      if (!map.has(p.project)) map.set(p.project, []);
      map.get(p.project)!.push(p);
    });
    return map;
  }, [plots]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveBlockFn({ data: { key: "plots.inventory", label: "Plots & Projects — Full Inventory", data: { plots } } });
      onToast("success", "✓ Plots inventory saved! Changes are live on the website.");
    } catch (err) {
      onToast("error", `Save failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally { setSaving(false); }
  };

  const toggleProject = (name: string) =>
    setExpanded((prev) => { const s = new Set(prev); s.has(name) ? s.delete(name) : s.add(name); return s; });

  const addProject = () => {
    const name = newProjectName.trim();
    if (!name) return;
    const prefix = name.slice(0, 3).toUpperCase().replace(/\s/g, "");
    const starter: PlotRow = { id: `${prefix}-01`, project: name, phase: "Phase I", type: "residential", status: "available", areaSqFt: 450, priceL: 15, dim: "25 × 18 m", face: "North", road: "18 m", price: "₹ 15 L", per: "₹ 3,333 / sq ft", tag: "Available" };
    setPlots((prev) => [...prev, starter]);
    setExpanded((prev) => new Set([...prev, name]));
    setEditingId(starter.id);
    setNewProjectName("");
    setShowNewProject(false);
  };

  const addPlot = (project: string) => {
    const count = plots.filter((p) => p.project === project).length;
    const prefix = project.slice(0, 2).toUpperCase().replace(/\s/g, "");
    const id = `${prefix}-${String(count + 1).padStart(2, "0")}`;
    const np: PlotRow = { id, project, phase: "Phase I", type: "residential", status: "available", areaSqFt: 450, priceL: 15, dim: "25 × 18 m", face: "North", road: "18 m", price: "₹ 15 L", per: "₹ 3,333 / sq ft", tag: "Available" };
    setPlots((prev) => [...prev, np]);
    setEditingId(id);
  };

  const deletePlot = (id: string) => {
    setPlots((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const deleteProject = (project: string) => {
    if (!confirm(`Delete ALL plots in "${project}"? This cannot be undone.`)) return;
    setPlots((prev) => prev.filter((p) => p.project !== project));
    setExpanded((prev) => { const s = new Set(prev); s.delete(project); return s; });
  };

  const updatePlot = (id: string, field: keyof PlotRow, value: string | number) =>
    setPlots((prev) => prev.map((p) => p.id === id ? { ...p, [field]: value } : p));

  const iS = { background: C.bgTertiary, border: `0.5px solid ${C.border}`, borderRadius: 6, padding: "5px 8px", fontSize: 11, color: C.textPrimary, fontFamily: "inherit", outline: "none", width: "100%" };
  const sS = { ...iS, cursor: "pointer" };

  if (!inventoryBlock && blocks.length > 0) {
    return (
      <div style={{ border: `0.5px solid rgba(212,169,106,0.2)`, background: "rgba(212,169,106,0.04)", borderRadius: 10, padding: "32px", textAlign: "center" }}>
        <p style={{ color: "#d4a96a", fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Plots inventory not initialised</p>
        <p style={{ color: C.textTertiary, fontSize: 12, marginBottom: 16 }}>Click the ↺ Initialize button in the top bar to seed the plots.inventory block.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <style>{`.pie-inp:focus{border-color:rgba(0,191,255,0.5)!important;background:${C.bgSecondary}!important;}`}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.bgPrimary, border: `0.5px solid ${C.border}`, borderRadius: 10, padding: "12px 16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <DatabaseIcon size={16} style={{ color: "#d4a96a" }} />
            <span style={{ fontSize: 13.5, fontWeight: 600, color: C.textPrimary }}>Plots & Projects Inventory</span>
          </div>
          <p style={{ fontSize: 11, color: C.textTertiary }}>
            {plots.length} total plots · {[...projectGroups.keys()].length} projects · {plots.filter((p) => p.status === "available").length} available
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setShowNewProject((v) => !v)}
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 12px", border: `0.5px solid rgba(212,169,106,0.3)`, borderRadius: 7, background: "rgba(212,169,106,0.08)", color: "#d4a96a", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            <PlusIcon size={12} /> Add Project
          </button>
          <button onClick={handleSave} disabled={saving}
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 16px", border: "none", borderRadius: 7, background: "#00BFFF", color: "#04090f", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", opacity: saving ? 0.5 : 1 }}>
            {saving ? "Saving…" : "Save All Changes"}
          </button>
        </div>
      </div>

      {/* New Project Input */}
      {showNewProject && (
        <div style={{ background: C.bgPrimary, border: `0.5px solid rgba(212,169,106,0.25)`, borderRadius: 10, padding: "14px 16px", display: "flex", gap: 8, alignItems: "center" }}>
          <input
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addProject()}
            placeholder="New project name (e.g. Silver Meadows)"
            style={{ ...iS, flex: 1, fontSize: 13, padding: "8px 12px" }}
            className="pie-inp"
            autoFocus
          />
          <button onClick={addProject}
            style={{ padding: "8px 16px", borderRadius: 7, background: "#d4a96a", border: "none", color: "#04090f", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            Create
          </button>
          <button onClick={() => { setShowNewProject(false); setNewProjectName(""); }}
            style={{ padding: "8px 12px", borderRadius: 7, background: "transparent", border: `0.5px solid ${C.border}`, color: C.textTertiary, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            Cancel
          </button>
        </div>
      )}

      {/* Project Groups */}
      {[...projectGroups.entries()].map(([project, projectPlots]) => {
        const isOpen = expanded.has(project);
        const phases = [...new Set(projectPlots.map((p) => p.phase))];
        const avail = projectPlots.filter((p) => p.status === "available").length;
        const sold  = projectPlots.filter((p) => p.status === "sold").length;
        return (
          <div key={project} style={{ background: C.bgPrimary, border: `0.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
            {/* Project Header */}
            <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", gap: 10, cursor: "pointer", borderBottom: isOpen ? `0.5px solid ${C.border}` : "none" }}
              onClick={() => toggleProject(project)}>
              <span style={{ fontSize: 13, transition: "transform .18s", transform: isOpen ? "rotate(90deg)" : "none", display: "inline-block", color: "#d4a96a" }}>›</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, marginBottom: 3 }}>{project}</div>
                <div style={{ display: "flex", gap: 12, fontSize: 10.5, color: C.textTertiary }}>
                  <span style={{ color: "#00BFFF" }}>{avail} available</span>
                  <span>{projectPlots.length - avail - sold} reserved</span>
                  <span style={{ color: "rgba(255,255,255,0.25)" }}>{sold} sold</span>
                  <span>·</span>
                  <span>{phases.length} phase{phases.length !== 1 ? "s" : ""}: {phases.join(", ")}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <button onClick={(e) => { e.stopPropagation(); addPlot(project); setExpanded((prev) => new Set([...prev, project])); }}
                  style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", border: `0.5px solid rgba(0,191,255,0.25)`, borderRadius: 6, background: "rgba(0,191,255,0.06)", color: "#00BFFF", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                  <PlusIcon size={10} /> Add Plot
                </button>
                <button onClick={(e) => { e.stopPropagation(); deleteProject(project); }}
                  style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", border: `0.5px solid rgba(248,113,113,0.2)`, borderRadius: 6, background: "transparent", color: "rgba(248,113,113,0.5)", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                  Delete Project
                </button>
              </div>
            </div>

            {/* Plots table */}
            {isOpen && (
              <div style={{ padding: "10px 14px 14px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {projectPlots.map((plot) => {
                    const isEditing = editingId === plot.id;
                    const statusColor = plot.status === "available" ? "#00BFFF" : plot.status === "reserved" ? "#d4a96a" : "rgba(255,255,255,0.25)";
                    return (
                      <div key={plot.id} style={{ border: `0.5px solid ${isEditing ? "rgba(0,191,255,0.3)" : "rgba(255,255,255,0.06)"}`, borderRadius: 8, background: isEditing ? "rgba(0,191,255,0.03)" : C.bgSecondary, overflow: "hidden", transition: "border-color .15s" }}>
                        {/* Row summary (always visible) */}
                        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", cursor: "pointer" }}
                          onClick={() => setEditingId(isEditing ? null : plot.id)}>
                          <span style={{ fontFamily: "monospace", fontSize: 11, color: C.textPrimary, fontWeight: 600, minWidth: 70 }}>{plot.id}</span>
                          <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 10, background: statusColor + "18", color: statusColor, border: `0.5px solid ${statusColor}40`, textTransform: "capitalize", flexShrink: 0 }}>{plot.status}</span>
                          <span style={{ fontSize: 11, color: C.textSecondary, textTransform: "capitalize" }}>{plot.type}</span>
                          <span style={{ fontSize: 11, color: C.textTertiary }}>{plot.areaSqFt} sq ft</span>
                          <span style={{ fontSize: 11, color: "#00BFFF", marginLeft: "auto" }}>{plot.price}</span>
                          <span style={{ fontSize: 11, color: C.textTertiary, minWidth: 120, textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{plot.phase}</span>
                          <span style={{ fontSize: 11, color: C.textTertiary, transform: isEditing ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform .18s" }}>›</span>
                          <button onClick={(e) => { e.stopPropagation(); deletePlot(plot.id); }}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(248,113,113,0.35)", fontSize: 12, padding: "0 4px", flexShrink: 0 }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#f87171"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(248,113,113,0.35)"; }}>✕</button>
                        </div>

                        {/* Expanded editor */}
                        {isEditing && (
                          <div style={{ borderTop: `0.5px solid rgba(0,191,255,0.1)`, padding: "12px 12px 14px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                            {([
                              { lbl: "Plot ID",      field: "id",       wide: false, type: "text"   },
                              { lbl: "Phase",        field: "phase",    wide: true,  type: "text"   },
                              { lbl: "Type",         field: "type",     wide: false, type: "select", opts: ["residential","corner","commercial"] },
                              { lbl: "Status",       field: "status",   wide: false, type: "select", opts: ["available","reserved","sold"] },
                              { lbl: "Area (sq ft)", field: "areaSqFt", wide: false, type: "number" },
                              { lbl: "Price (Lakhs)",field: "priceL",   wide: false, type: "number" },
                              { lbl: "Dimensions",   field: "dim",      wide: false, type: "text"   },
                              { lbl: "Facing",       field: "face",     wide: false, type: "text"   },
                              { lbl: "Road Width",   field: "road",     wide: false, type: "text"   },
                              { lbl: "Price Display",field: "price",    wide: false, type: "text"   },
                              { lbl: "Per Unit",     field: "per",      wide: true,  type: "text"   },
                              { lbl: "Tag / Badge",  field: "tag",      wide: false, type: "text"   },
                            ] as { lbl: string; field: keyof PlotRow; wide: boolean; type: string; opts?: string[] }[]).map(({ lbl, field, wide, type, opts }) => (
                              <div key={field} style={{ gridColumn: wide ? "1 / 3" : "auto" }}>
                                <label style={{ display: "block", fontSize: 9, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>{lbl}</label>
                                {type === "select" ? (
                                  <select value={String(plot[field])} onChange={(e) => updatePlot(plot.id, field, e.target.value)} style={sS} className="pie-inp">
                                    {(opts ?? []).map((o) => <option key={o} value={o}>{o}</option>)}
                                  </select>
                                ) : type === "number" ? (
                                  <input type="number" value={Number(plot[field])} onChange={(e) => updatePlot(plot.id, field, Number(e.target.value))} style={iS} className="pie-inp" />
                                ) : (
                                  <input value={String(plot[field] ?? "")} onChange={(e) => updatePlot(plot.id, field, e.target.value)} style={iS} className="pie-inp" />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <button onClick={() => addPlot(project)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "8px", border: `1px dashed rgba(0,191,255,0.15)`, borderRadius: 8, background: "transparent", color: "rgba(0,191,255,0.4)", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                    <PlusIcon size={11} /> Add plot to {project}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {projectGroups.size === 0 && plots.length === 0 && (
        <div style={{ border: `0.5px solid ${C.border}`, borderRadius: 10, padding: "40px", textAlign: "center" }}>
          <p style={{ color: C.textTertiary, fontSize: 13, marginBottom: 12 }}>No projects yet. Click "Add Project" to get started.</p>
        </div>
      )}

      {/* Floating save reminder */}
      <div style={{ position: "sticky", bottom: 12, right: 0, display: "flex", justifyContent: "flex-end", pointerEvents: "none" }}>
        <button onClick={handleSave} disabled={saving} style={{ pointerEvents: "auto", padding: "9px 20px", borderRadius: 8, background: "#00BFFF", border: "none", color: "#04090f", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 32px rgba(0,191,255,0.25)", opacity: saving ? 0.6 : 1 }}>
          {saving ? "Saving…" : "💾 Save All Changes"}
        </button>
      </div>
    </div>
  );
}

// ── Media URL field with image/video preview ───────────────────────────────────
function MediaUrlField({
  label, value, fieldKey, uploadingField, onUpload, onChange, colors,
}: {
  label: string;
  value: string;
  fieldKey: string;
  uploadingField: string | null;
  onUpload: (file: File, fieldKey: string, onUrl: (url: string) => void) => void;
  onChange: (v: string) => void;
  colors: Record<string, string>;
}) {
  const C = colors;
  const isUploading = uploadingField === fieldKey;
  const isVideo = /\.(mp4|webm|mov|avi|mkv)(\?|$)/i.test(value);
  const isImg   = !isVideo && value.trim().length > 0;

  return (
    <div>
      <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 9.5, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
          {label} <span style={{ textTransform: "none", fontWeight: 400 }}>— url or upload</span>
        </span>
        {value && (
          <span style={{ fontSize: 9, padding: "1px 7px", borderRadius: 8, background: isVideo ? "rgba(167,139,250,0.1)" : "rgba(0,191,255,0.1)", color: isVideo ? "#a78bfa" : "#00BFFF", border: `0.5px solid ${isVideo ? "rgba(167,139,250,0.25)" : "rgba(0,191,255,0.25)"}` }}>
            {isVideo ? "▶ Video" : "🖼 Image"}
          </span>
        )}
      </label>
      <div style={{ display: "flex", gap: 6 }}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… paste image or video URL, or upload ↗"
          style={{ flex: 1, minWidth: 0, background: C.bgTertiary, border: `0.5px solid ${C.borderMd}`, borderRadius: 7, padding: "7px 10px", fontSize: 11, color: C.textPrimary, fontFamily: "monospace", outline: "none" }}
        />
        <label className="adm-upload-btn" style={{ color: isUploading ? "rgba(0,191,255,0.35)" : "#00BFFF", cursor: isUploading ? "wait" : "pointer" }}>
          {isUploading ? <span style={{ width: 11, height: 11, border: "2px solid rgba(0,191,255,0.2)", borderTop: "2px solid #00BFFF", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} /> : <UploadIcon size={11} />}
          {isUploading ? "…" : "Upload"}
          <input type="file" accept="image/*,video/*,.mp4,.webm,.mov,.avi" disabled={!!uploadingField} style={{ display: "none" }}
            onChange={(e) => { const file = e.target.files?.[0]; if (!file) return; e.target.value = ""; onUpload(file, fieldKey, onChange); }} />
        </label>
      </div>
      {/* Live preview */}
      {(isVideo || isImg) && (
        <div style={{ marginTop: 6 }}>
          {isVideo ? (
            <video src={value} controls muted style={{ width: "100%", maxHeight: 120, borderRadius: 6, background: "#000", border: `0.5px solid ${C.border}` }} />
          ) : (
            <img src={value} alt="preview" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              style={{ height: 72, borderRadius: 6, objectFit: "cover", border: `0.5px solid ${C.border}`, display: "block" }} />
          )}
        </div>
      )}
    </div>
  );
}

// ── Block Card ───────────────────────────────────────────────────────────────
type CardItem = { num?: string; name: string; desc: string; linkText?: string; [k: string]: unknown };
type ImageItem = { src: string; alt: string; video_url: string };
type AmenityItem = { icon?: string; title: string; desc: string };
type ReasonItem = { num?: string; title: string; desc: string };

function BlockCard({
  block, value, onChange, onSave, saving, justSaved, uploadingField, onUpload, colors,
}: {
  block: ContentBlock;
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  saving: boolean;
  justSaved: boolean;
  uploadingField: string | null;
  onUpload: (file: File, fieldKey: string, onUrl: (url: string) => void) => void;
  colors: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const [rawOpen, setRawOpen] = useState(false);

  let parsed: Record<string, unknown> | null = null;
  try { parsed = JSON.parse(value); } catch { parsed = null; }

  const simpleFields = parsed
    ? Object.entries(parsed).filter(([, v]) => typeof v === "string" || typeof v === "number")
    : [];

  const cardArray: CardItem[] | null     = parsed && Array.isArray(parsed.cards)     ? (parsed.cards as CardItem[])         : null;
  const imagesArray: ImageItem[] | null  = parsed && Array.isArray(parsed.images)    ? (parsed.images as ImageItem[])       : null;
  const amenitiesArray: AmenityItem[] | null = parsed && Array.isArray(parsed.amenities) ? (parsed.amenities as AmenityItem[]) : null;
  const reasonsArray: ReasonItem[] | null    = parsed && Array.isArray(parsed.reasons)   ? (parsed.reasons as ReasonItem[])    : null;
  const pillarsArray: ReasonItem[] | null    = parsed && Array.isArray(parsed.pillars)   ? (parsed.pillars as ReasonItem[])    : null;

  const preview = previewUrl(block.key);
  const icon = blockIconStyle(block.key);
  const tag  = tagStyle(block.key);
  const prefix = block.key.split(".")[0];

  const isUploadField = (field: string) =>
    field.endsWith("_url") || field.endsWith("_image") || field.endsWith("_src") ||
    field === "image" || field === "video" || field === "src";

  const C = colors;

  return (
    <div style={{
      background: justSaved ? "rgba(74,222,128,0.04)" : C.bgPrimary,
      border: `0.5px solid ${justSaved ? "rgba(74,222,128,0.25)" : C.border}`,
      borderRadius: 10, overflow: "hidden", transition: "border-color 0.3s",
    }}>
      {/* Block Header (always visible, click to expand) */}
      <div
        onClick={() => setOpen((v) => !v)}
        style={{ display: "flex", alignItems: "center", padding: "10px 14px", cursor: "pointer", gap: 10, transition: "background .12s" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(0,191,255,0.03)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
      >
        {/* Colored icon */}
        <div style={{ width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: icon.bg, color: icon.color }}>
          <BlockIcon prefix={prefix} size={16} />
        </div>
        {/* Meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 500, color: C.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{block.label}</div>
          <div style={{ fontSize: 9.5, color: C.textTertiary, fontFamily: "monospace", marginTop: 2 }}>{block.key}</div>
        </div>
        {/* Right: type tag + saved + chevron */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {justSaved && <span style={{ fontSize: 10, color: "#4ade80", fontWeight: 600 }}>✓ Saved</span>}
          <span style={{
            fontSize: 9.5, fontWeight: 500, padding: "2px 8px", borderRadius: 10,
            color: tag.color, background: tag.bg, border: `0.5px solid ${tag.border}`,
          }}>{prefix}</span>
          <span style={{ fontSize: 12, color: C.textTertiary, transition: "transform .18s", transform: open ? "rotate(180deg)" : "none", display: "inline-block" }}>›</span>
        </div>
      </div>

      {/* Block Body (collapsible) */}
      {open && (
        <div style={{ borderTop: `0.5px solid ${C.border}` }}>

          {/* Simple string/number fields */}
          {simpleFields.length > 0 && (
            <div style={{ padding: "14px 14px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
              {simpleFields.map(([field, val]) => {
                const isUrl = isUploadField(field);
                const fieldUid = `${block.key}::${field}`;
                const isUploading = uploadingField === fieldUid;
                const isLong = field.includes("desc") || field.includes("body") || field.includes("subtitle");

                return (
                  <div key={field} className="adm-field" style={{ gridColumn: isUrl || isLong ? "1 / -1" : "auto" }}>
                    {!isUrl && (
                      <label style={{ display: "block", fontSize: 9.5, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, marginBottom: 4 }}>
                        {field.replace(/_/g, " ")}
                      </label>
                    )}
                    {isUrl ? (
                      <MediaUrlField
                        label={field.replace(/_/g, " ")}
                        value={String(val)}
                        fieldKey={fieldUid}
                        uploadingField={uploadingField}
                        onUpload={onUpload}
                        onChange={(url) => { if (!parsed) return; onChange(JSON.stringify({ ...parsed, [field]: url }, null, 2)); }}
                        colors={C}
                      />
                    ) : isLong ? (
                      <textarea
                        value={String(val)}
                        onChange={(e) => { if (!parsed) return; onChange(JSON.stringify({ ...parsed, [field]: e.target.value }, null, 2)); }}
                        rows={3}
                        style={{ width: "100%", background: C.bgTertiary, border: `0.5px solid ${C.borderMd}`, borderRadius: 7, padding: "7px 10px", fontSize: 12, color: C.textPrimary, outline: "none", resize: "vertical", lineHeight: 1.6, fontFamily: "inherit" }}
                      />
                    ) : (
                      <input
                        value={String(val)}
                        onChange={(e) => { if (!parsed) return; onChange(JSON.stringify({ ...parsed, [field]: e.target.value }, null, 2)); }}
                        style={{ width: "100%", background: C.bgTertiary, border: `0.5px solid ${C.borderMd}`, borderRadius: 7, padding: "7px 10px", fontSize: 12, color: C.textPrimary, outline: "none" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Array editors */}
          {imagesArray && (
            <div style={{ padding: "12px 14px 0" }}>
              <div style={{ fontSize: 9.5, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 8 }}>Images (Circle Media)</div>
              <ImagesArrayEditor images={imagesArray} onChange={(updated) => { if (!parsed) return; onChange(JSON.stringify({ ...parsed, images: updated }, null, 2)); }} uploadingField={uploadingField} blockKey={block.key} onUpload={onUpload} parsed={parsed} fullValue={value} onFullChange={onChange} />
            </div>
          )}
          {cardArray && (
            <div style={{ padding: "12px 14px 0" }}>
              <div style={{ fontSize: 9.5, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 8 }}>Service Cards</div>
              <CardArrayEditor cards={cardArray} onChange={(updated) => { if (!parsed) return; onChange(JSON.stringify({ ...parsed, cards: updated }, null, 2)); }} />
            </div>
          )}
          {amenitiesArray && (
            <div style={{ padding: "12px 14px 0" }}>
              <div style={{ fontSize: 9.5, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 8 }}>Amenities</div>
              <GenericArrayEditor items={amenitiesArray} fields={["icon", "title", "desc"]} onChange={(updated) => { if (!parsed) return; onChange(JSON.stringify({ ...parsed, amenities: updated }, null, 2)); }} />
            </div>
          )}
          {reasonsArray && (
            <div style={{ padding: "12px 14px 0" }}>
              <div style={{ fontSize: 9.5, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 8 }}>Reasons</div>
              <GenericArrayEditor items={reasonsArray} fields={["num", "title", "desc"]} onChange={(updated) => { if (!parsed) return; onChange(JSON.stringify({ ...parsed, reasons: updated }, null, 2)); }} />
            </div>
          )}
          {pillarsArray && (
            <div style={{ padding: "12px 14px 0" }}>
              <div style={{ fontSize: 9.5, color: C.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 8 }}>Pillars</div>
              <GenericArrayEditor items={pillarsArray} fields={["num", "title", "desc"]} onChange={(updated) => { if (!parsed) return; onChange(JSON.stringify({ ...parsed, pillars: updated }, null, 2)); }} />
            </div>
          )}

          {/* Raw JSON toggle */}
          <div style={{ borderTop: `0.5px solid ${C.border}`, marginTop: 12 }}>
            <button onClick={() => setRawOpen((v) => !v)}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", background: "none", border: "none", cursor: "pointer", color: C.textTertiary, fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, fontFamily: "inherit" }}>
              <span>Advanced — Raw JSON</span>
              <span style={{ transition: "transform .18s", transform: rawOpen ? "rotate(180deg)" : "none", display: "inline-block" }}>›</span>
            </button>
            {rawOpen && (
              <div style={{ padding: "0 14px 12px" }}>
                <textarea
                  value={value} onChange={(e) => onChange(e.target.value)} rows={10}
                  style={{ width: "100%", background: C.bgTertiary, border: `0.5px solid ${C.border}`, borderRadius: 7, padding: "9px 11px", fontFamily: "monospace", fontSize: 11, color: "#8aaf80", lineHeight: 1.6, outline: "none", resize: "vertical" }}
                />
              </div>
            )}
          </div>

          {/* Block Footer */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", borderTop: `0.5px solid ${C.border}`, background: C.bgSecondary }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {preview && (
                <a href={preview} target="_blank" rel="noopener noreferrer" className="adm-foot-link blue">
                  <EyeIcon size={11} /> Preview
                </a>
              )}
              <button onClick={() => setRawOpen((v) => !v)} className="adm-foot-link">
                <span style={{ fontFamily: "monospace", fontSize: 10 }}>{"{}"}</span> Raw JSON
              </button>
            </div>
            <button className="adm-save-btn" onClick={onSave} disabled={saving}>
              {saving ? (
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 10, height: 10, border: "2px solid rgba(4,9,15,0.25)", borderTop: "2px solid #04090f", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                  Saving…
                </span>
              ) : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Block prefix icon (maps prefix → matching icon) ───────────────────────────
function BlockIcon({ prefix, size }: { prefix: string; size: number }) {
  switch (prefix) {
    case "plots":           return <DatabaseIcon size={size} />;
    case "home":            return <HomeIcon size={size} />;
    case "about":           return <BuildingIcon size={size} />;
    case "plot_selling":    return <MapPinIcon size={size} />;
    case "project": case "project_detail": return <GridIcon size={size} />;
    case "construction":    return <WrenchIcon size={size} />;
    case "investment":      return <ChartIcon size={size} />;
    case "architecture":    return <PencilIcon size={size} />;
    case "lifestyle":       return <StarIcon size={size} />;
    case "contact":         return <PhoneIcon size={size} />;
    case "blog":            return <NewsIcon size={size} />;
    case "channel_partner": case "partner": return <UsersIcon size={size} />;
    case "footer":          return <LayersIcon size={size} />;
    case "site":            return <CogIcon size={size} />;
    default:                return <GridIcon size={size} />;
  }
}

// ── Images Array Editor ───────────────────────────────────────────────────────
function ImagesArrayEditor({
  images, onChange, uploadingField, blockKey, onUpload,
}: {
  images: ImageItem[];
  onChange: (updated: ImageItem[]) => void;
  uploadingField: string | null;
  blockKey: string;
  onUpload: (file: File, fieldKey: string, onUrl: (url: string) => void) => void;
  parsed: Record<string, unknown> | null;
  fullValue: string;
  onFullChange: (v: string) => void;
}) {
  const update = (idx: number, field: keyof ImageItem, val: string) => {
    onChange(images.map((img, i) => i === idx ? { ...img, [field]: val } : img));
  };
  const addImage    = () => onChange([...images, { src: "", alt: "", video_url: "" }]);
  const removeImage = (idx: number) => onChange(images.filter((_, i) => i !== idx));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
      {images.map((img, idx) => {
        const srcKey   = `${blockKey}::images::${idx}::src`;
        const videoKey = `${blockKey}::images::${idx}::video_url`;
        const isSrcUploading   = uploadingField === srcKey;
        const isVideoUploading = uploadingField === videoKey;

        return (
          <div key={idx} style={{ border: "0.5px solid rgba(0,191,255,0.1)", borderRadius: 9, padding: "11px", background: "#030710", display: "flex", flexDirection: "column", gap: 9 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ fontSize: 9, color: "#00BFFF", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>#{idx + 1}</span>
                {img.src && <img src={img.src} alt="" style={{ width: 22, height: 22, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(0,191,255,0.2)" }} />}
              </div>
              <button onClick={() => removeImage(idx)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(248,113,113,0.45)", fontSize: 11 }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#f87171"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(248,113,113,0.45)"; }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {[
                { lbl: "Image URL", key: "src" as keyof ImageItem, isUpload: true, uploading: isSrcUploading, uploadKey: srcKey, accept: "image/*" },
                { lbl: "Alt Text",  key: "alt" as keyof ImageItem, isUpload: false, uploading: false, uploadKey: "", accept: "" },
                { lbl: "Video URL", key: "video_url" as keyof ImageItem, isUpload: true, uploading: isVideoUploading, uploadKey: videoKey, accept: "video/*" },
              ].map(({ lbl, key, isUpload, uploading: isUp, uploadKey, accept }) => (
                <div key={lbl}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                    <label style={{ fontSize: 8, color: "rgba(0,191,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{lbl}</label>
                    {isUpload && (
                      <label style={{ fontSize: 8, cursor: isUp ? "wait" : "pointer", fontWeight: 600, color: isUp ? "rgba(0,191,255,0.3)" : "#00BFFF" }}>
                        {isUp ? "…" : "Upload"}
                        <input type="file" accept={accept} disabled={!!uploadingField} style={{ display: "none" }}
                          onChange={(e) => { const file = e.target.files?.[0]; if (!file) return; e.target.value = ""; onUpload(file, uploadKey, (url) => update(idx, key, url)); }} />
                      </label>
                    )}
                  </div>
                  <input value={String(img[key] ?? "")} onChange={(e) => update(idx, key, e.target.value)}
                    style={{ width: "100%", background: "#050a12", border: "0.5px solid rgba(0,191,255,0.1)", borderRadius: 6, padding: "5px 8px", fontSize: 10, color: "#e8e3da", fontFamily: key === "src" || key === "video_url" ? "monospace" : "inherit", outline: "none" }} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <button onClick={addImage}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px", border: "1px dashed rgba(0,191,255,0.18)", borderRadius: 9, background: "rgba(0,191,255,0.02)", color: "#00BFFF", fontSize: 11, cursor: "pointer", minHeight: 130, fontFamily: "inherit" }}>
        <PlusIcon size={13} /> Add Image
      </button>
    </div>
  );
}

// ── Card Array Editor ─────────────────────────────────────────────────────────
function CardArrayEditor({ cards, onChange }: { cards: CardItem[]; onChange: (updated: CardItem[]) => void }) {
  const update = (idx: number, field: keyof CardItem, val: string) => {
    onChange(cards.map((c, i) => i === idx ? { ...c, [field]: val } : c));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {cards.map((card, idx) => (
        <div key={idx} style={{ border: "0.5px solid rgba(0,191,255,0.1)", borderRadius: 8, padding: "10px 12px", background: "#0a0f1a" }}>
          <p style={{ fontSize: 9, color: "#d4a96a", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>Card {card.num ?? String(idx + 1)}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
            {[
              { lbl: "Title",       field: "name"     as keyof CardItem, wide: false },
              { lbl: "Button Text", field: "linkText" as keyof CardItem, wide: false },
              { lbl: "Description", field: "desc"     as keyof CardItem, wide: true  },
            ].map(({ lbl, field, wide }) => (
              <div key={lbl} style={{ gridColumn: wide ? "1 / -1" : "auto" }}>
                <label style={{ display: "block", fontSize: 9, color: "rgba(232,227,218,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>{lbl}</label>
                {wide ? (
                  <textarea value={String(card[field] ?? "")} onChange={(e) => update(idx, field, e.target.value)} rows={2}
                    style={{ width: "100%", background: "#040910", border: "0.5px solid rgba(0,191,255,0.1)", borderRadius: 5, padding: "5px 8px", fontSize: 11, color: "#e8e3da", resize: "vertical", lineHeight: 1.5, outline: "none", fontFamily: "inherit" }} />
                ) : (
                  <input value={String(card[field] ?? "")} onChange={(e) => update(idx, field, e.target.value)}
                    style={{ width: "100%", background: "#040910", border: "0.5px solid rgba(0,191,255,0.1)", borderRadius: 5, padding: "5px 8px", fontSize: 11, color: "#e8e3da", outline: "none" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Generic Array Editor (amenities, reasons, pillars) ────────────────────────
function GenericArrayEditor({
  items, fields, onChange,
}: {
  items: Record<string, unknown>[];
  fields: string[];
  onChange: (updated: Record<string, unknown>[]) => void;
}) {
  const update = (idx: number, field: string, val: string) => {
    onChange(items.map((item, i) => i === idx ? { ...item, [field]: val } : item));
  };
  const addItem = () => {
    const empty: Record<string, unknown> = {};
    fields.forEach((f) => { empty[f] = ""; });
    onChange([...items, empty]);
  };
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {items.map((item, idx) => (
        <div key={idx} style={{ border: "0.5px solid rgba(0,191,255,0.1)", borderRadius: 8, padding: "9px 11px", background: "#0a0f1a" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
            <span style={{ fontSize: 9, color: "#d4a96a", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Item {idx + 1}</span>
            <button onClick={() => removeItem(idx)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(232,227,218,0.25)", fontSize: 11, fontFamily: "inherit" }}>✕</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {fields.map((field) => {
              const isLong = field === "desc";
              return (
                <div key={field}>
                  <label style={{ display: "block", fontSize: 9, color: "rgba(232,227,218,0.28)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>{field}</label>
                  {isLong ? (
                    <textarea value={String(item[field] ?? "")} onChange={(e) => update(idx, field, e.target.value)} rows={2}
                      style={{ width: "100%", background: "#040910", border: "0.5px solid rgba(0,191,255,0.1)", borderRadius: 5, padding: "5px 8px", fontSize: 11, color: "#e8e3da", resize: "vertical", lineHeight: 1.5, outline: "none", fontFamily: "inherit" }} />
                  ) : (
                    <input value={String(item[field] ?? "")} onChange={(e) => update(idx, field, e.target.value)}
                      style={{ width: "100%", background: "#040910", border: "0.5px solid rgba(0,191,255,0.1)", borderRadius: 5, padding: "5px 8px", fontSize: 11, color: "#e8e3da", outline: "none" }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <button onClick={addItem}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "7px", border: "0.5px dashed rgba(0,191,255,0.18)", borderRadius: 8, background: "transparent", color: "rgba(0,191,255,0.4)", fontSize: 11, cursor: "pointer", width: "100%", fontFamily: "inherit" }}>
        <PlusIcon size={12} /> Add Item
      </button>
    </div>
  );
}

// ── shared helper ─────────────────────────────────────────────────────────────
function isMediaImage(url: string): boolean {
  if (!url) return false;
  return /\.(jpg|jpeg|png|webp|gif|svg|avif|bmp)(\?|$)/i.test(url.split("?")[0]);
}

function MediaPreview({ url, style }: { url: string; style?: React.CSSProperties }) {
  if (!url) return null;
  if (isMediaImage(url)) {
    return <img src={url} alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} style={{ marginTop: 6, width: "100%", borderRadius: 6, objectFit: "cover", ...style }} />;
  }
  return <video src={url} muted style={{ marginTop: 6, width: "100%", borderRadius: 6, objectFit: "cover", ...style }} />;
}

// ── Testimonials Editor ───────────────────────────────────────────────────────
type TestimonialItem = {
  name: string;
  designation: string;
  description: string;
  profile_image: string;
  video_url: string;
};

function TestimonialsEditor({
  blocks, saveBlockFn, uploadFn, onToast, onBlockSaved, colors,
}: {
  blocks: ContentBlock[];
  saveBlockFn: ReturnType<typeof useServerFn<typeof saveSiteContentBlock>>;
  uploadFn: ReturnType<typeof useServerFn<typeof uploadMedia>>;
  onToast: (type: "success" | "error" | "info", msg: string) => void;
  onBlockSaved: (saved: ContentBlock) => void;
  colors: Record<string, string>;
}) {
  const C = colors;
  const block = blocks.find((b) => b.key === "home.testimonials");
  const initialized = useRef(false);

  const parseData = (b: ContentBlock | undefined) => {
    if (!b?.data) return { eyebrow: "Client Narratives", title: "Distinguished", title_accent: "Partnerships", subtitle: "", cta_text: "", items: [] as TestimonialItem[] };
    const d = b.data as Record<string, unknown>;
    return {
      eyebrow: String(d.eyebrow ?? "Client Narratives"),
      title: String(d.title ?? "Distinguished"),
      title_accent: String(d.title_accent ?? "Partnerships"),
      subtitle: String(d.subtitle ?? ""),
      cta_text: String(d.cta_text ?? ""),
      items: Array.isArray(d.items) ? (d.items as TestimonialItem[]) : [],
    };
  };

  const [data, setData] = useState(() => parseData(block));
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  useEffect(() => {
    if (!initialized.current && block) {
      initialized.current = true;
      setData(parseData(block));
    }
  }, [blocks]);

  const uploadFile = async (file: File, fieldKey: string, onUrl: (url: string) => void) => {
    setUploadingField(fieldKey);
    try {
      const base64 = await fileToBase64(file);
      const { url } = await uploadFn({ data: { filename: file.name, contentType: file.type || "application/octet-stream", base64 } });
      onUrl(url);
      onToast("success", `✓ "${file.name}" uploaded!`);
    } catch (err) {
      onToast("error", `Upload failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setUploadingField(null);
    }
  };

  const save = async () => {
    setSaving(true);
    try {
      const saved = await saveBlockFn({ data: { key: "home.testimonials", label: "Home — Testimonials", data: data as unknown as Record<string, unknown> } });
      onBlockSaved(saved);
      onToast("success", "✓ Testimonials saved! Changes are live on the website.");
    } catch (err) {
      onToast("error", `Save failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSaving(false);
    }
  };

  const updateMeta = (field: string, val: string) => setData((prev) => ({ ...prev, [field]: val }));
  const updateItem = (idx: number, field: keyof TestimonialItem, val: string) => {
    setData((prev) => ({ ...prev, items: prev.items.map((it, i) => i === idx ? { ...it, [field]: val } : it) }));
  };
  const addItem = () => {
    setConfirmDelete(null);
    setData((prev) => ({ ...prev, items: [...prev.items, { name: "", designation: "", description: "", profile_image: "", video_url: "" }] }));
  };
  const removeItem = (idx: number) => {
    setConfirmDelete(null);
    setData((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }));
  };

  const inp = { fontSize: 12.5, padding: "7px 10px", border: `0.5px solid ${C.borderMd}`, borderRadius: 7, background: C.bgTertiary, color: C.textPrimary, fontFamily: "inherit", width: "100%", outline: "none" };
  const lbl = { fontSize: 10, color: C.textTertiary, textTransform: "uppercase" as const, letterSpacing: "0.06em", display: "block", marginBottom: 4, fontWeight: 600 };
  const MEDIA_ACCEPT = "image/*,video/*,.mp4,.webm,.mov,.jpg,.jpeg,.png,.webp,.gif";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: C.bgPrimary, border: `0.5px solid ${C.border}`, borderRadius: 10 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>Client Narratives / Testimonials</p>
          <p style={{ fontSize: 11, color: C.textTertiary, marginTop: 2 }}>{data.items.length} testimonial{data.items.length !== 1 ? "s" : ""} · Home page marquee</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <a href="/" target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(0,191,255,0.7)", background: "rgba(0,191,255,0.08)", border: "0.5px solid rgba(0,191,255,0.2)", borderRadius: 20, padding: "5px 12px", textDecoration: "none" }}>
            <EyeIcon size={11} /> Preview
          </a>
          <button onClick={addItem}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, padding: "6px 14px", background: "rgba(0,191,255,0.1)", border: "0.5px solid rgba(0,191,255,0.25)", color: "#00BFFF", borderRadius: 7, cursor: "pointer", fontFamily: "inherit" }}>
            <PlusIcon size={12} /> Add Testimonial
          </button>
          <button onClick={save} disabled={saving}
            style={{ fontSize: 12, fontWeight: 600, padding: "6px 18px", background: "#00BFFF", border: "none", color: "#04090f", borderRadius: 7, cursor: saving ? "default" : "pointer", opacity: saving ? 0.55 : 1, fontFamily: "inherit" }}>
            {saving ? "Saving…" : "Save All"}
          </button>
        </div>
      </div>

      {/* Section heading fields */}
      <div style={{ background: C.bgPrimary, border: `0.5px solid ${C.border}`, borderRadius: 10, padding: "14px 16px" }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: C.textSecondary, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Section Headings</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { lbl: "Eyebrow", field: "eyebrow" },
            { lbl: "Title", field: "title" },
            { lbl: "Title Accent (italic)", field: "title_accent" },
            { lbl: "CTA Text", field: "cta_text" },
          ].map(({ lbl: l, field }) => (
            <div key={field}>
              <span style={lbl}>{l}</span>
              <input style={inp} value={data[field as keyof typeof data] as string} onChange={(e) => updateMeta(field, e.target.value)} />
            </div>
          ))}
          <div style={{ gridColumn: "1 / -1" }}>
            <span style={lbl}>Subtitle</span>
            <textarea style={{ ...inp, resize: "vertical", minHeight: 56 }} value={data.subtitle} onChange={(e) => updateMeta("subtitle", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Testimonial Items */}
      {data.items.map((item, i) => (
        <div key={i} style={{ background: C.bgPrimary, border: `0.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: `0.5px solid ${C.border}`, background: "rgba(0,191,255,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {item.profile_image && <img src={item.profile_image} alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(0,191,255,0.2)" }} />}
              <span style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary }}>{item.name || `Testimonial ${i + 1}`}</span>
              {item.video_url && <span style={{ fontSize: 9, padding: "1px 7px", borderRadius: 8, background: isMediaImage(item.video_url) ? "rgba(74,222,128,0.1)" : "rgba(167,139,250,0.1)", color: isMediaImage(item.video_url) ? "#4ade80" : "#a78bfa", border: `0.5px solid ${isMediaImage(item.video_url) ? "rgba(74,222,128,0.25)" : "rgba(167,139,250,0.25)"}` }}>{isMediaImage(item.video_url) ? "🖼 Image" : "▶ Video"}</span>}
            </div>
            {/* Inline delete confirmation — no browser confirm() dialog needed */}
            {confirmDelete === i ? (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 11, color: C.textTertiary }}>Remove this?</span>
                <button onClick={() => removeItem(i)}
                  style={{ fontSize: 11, padding: "4px 10px", background: "rgba(248,113,113,0.15)", border: "0.5px solid rgba(248,113,113,0.4)", color: "#f87171", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
                  Yes, Remove
                </button>
                <button onClick={() => setConfirmDelete(null)}
                  style={{ fontSize: 11, padding: "4px 10px", background: C.bgTertiary, border: `0.5px solid ${C.border}`, color: C.textSecondary, borderRadius: 6, cursor: "pointer", fontFamily: "inherit" }}>
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => setConfirmDelete(i)}
                style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, padding: "4px 10px", background: "rgba(248,113,113,0.07)", border: "0.5px solid rgba(248,113,113,0.2)", color: "#f87171", borderRadius: 6, cursor: "pointer", fontFamily: "inherit" }}>
                <TrashIcon size={11} /> Remove
              </button>
            )}
          </div>
          <div style={{ padding: "14px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <span style={lbl}>Name</span>
              <input style={inp} value={item.name} onChange={(e) => updateItem(i, "name", e.target.value)} placeholder="Full name" />
            </div>
            <div>
              <span style={lbl}>Designation / Role</span>
              <input style={inp} value={item.designation} onChange={(e) => updateItem(i, "designation", e.target.value)} placeholder="Plot Owner, Phase 1" />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <span style={lbl}>Testimonial Text</span>
              <textarea style={{ ...inp, resize: "vertical", minHeight: 72 }} value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} placeholder="What did they say about TrustOn?" />
            </div>
            {/* Profile image upload */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={lbl}>Profile Photo</span>
                <label style={{ fontSize: 10, cursor: uploadingField === `test-${i}-img` ? "wait" : "pointer", color: "#00BFFF", fontWeight: 600 }}>
                  {uploadingField === `test-${i}-img` ? "Uploading…" : "↑ Upload"}
                  <input type="file" accept="image/*" disabled={!!uploadingField} style={{ display: "none" }}
                    onChange={(e) => { const f = e.target.files?.[0]; if (!f) return; e.target.value = ""; uploadFile(f, `test-${i}-img`, (url) => updateItem(i, "profile_image", url)); }} />
                </label>
              </div>
              <input style={inp} value={item.profile_image} onChange={(e) => updateItem(i, "profile_image", e.target.value)} placeholder="https://… or upload ↗" />
              {item.profile_image && <img src={item.profile_image} alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} style={{ marginTop: 5, height: 44, width: 44, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(0,191,255,0.2)", display: "block" }} />}
            </div>
            {/* Media upload — video OR image */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={lbl}>Media (Video or Image)</span>
                <label style={{ fontSize: 10, cursor: uploadingField === `test-${i}-vid` ? "wait" : "pointer", color: "#00BFFF", fontWeight: 600 }}>
                  {uploadingField === `test-${i}-vid` ? "Uploading…" : "↑ Upload"}
                  <input type="file" accept={MEDIA_ACCEPT} disabled={!!uploadingField} style={{ display: "none" }}
                    onChange={(e) => { const f = e.target.files?.[0]; if (!f) return; e.target.value = ""; uploadFile(f, `test-${i}-vid`, (url) => updateItem(i, "video_url", url)); }} />
                </label>
              </div>
              <input style={{ ...inp, fontFamily: "monospace" }} value={item.video_url} onChange={(e) => updateItem(i, "video_url", e.target.value)} placeholder="https://… video or image URL, or upload ↗" />
              <MediaPreview url={item.video_url} style={{ maxHeight: 80, border: `0.5px solid ${C.border}` }} />
            </div>
          </div>
        </div>
      ))}

      {data.items.length === 0 && (
        <div style={{ textAlign: "center", padding: "36px 20px", border: `0.5px dashed ${C.border}`, borderRadius: 10, color: C.textTertiary, fontSize: 12 }}>
          No testimonials yet. Click <b style={{ color: "#00BFFF" }}>Add Testimonial</b> to create the first one.
        </div>
      )}

      {data.items.length > 0 && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={addItem}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, padding: "7px 16px", background: "rgba(0,191,255,0.08)", border: "0.5px solid rgba(0,191,255,0.2)", color: "#00BFFF", borderRadius: 7, cursor: "pointer", fontFamily: "inherit" }}>
            <PlusIcon size={12} /> Add Another
          </button>
          <button onClick={save} disabled={saving}
            style={{ fontSize: 12, fontWeight: 600, padding: "7px 20px", background: "#00BFFF", border: "none", color: "#04090f", borderRadius: 7, cursor: saving ? "default" : "pointer", opacity: saving ? 0.55 : 1, fontFamily: "inherit" }}>
            {saving ? "Saving…" : "Save All Changes"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── About Videos Editor ───────────────────────────────────────────────────────
type AboutVideoItem = {
  label: string;
  tag: string;
  badge: string;
  video_url: string;
};

function AboutVideosEditor({
  blocks, saveBlockFn, uploadFn, onToast, onBlockSaved, colors,
}: {
  blocks: ContentBlock[];
  saveBlockFn: ReturnType<typeof useServerFn<typeof saveSiteContentBlock>>;
  uploadFn: ReturnType<typeof useServerFn<typeof uploadMedia>>;
  onToast: (type: "success" | "error" | "info", msg: string) => void;
  onBlockSaved: (saved: ContentBlock) => void;
  colors: Record<string, string>;
}) {
  const C = colors;
  const block = blocks.find((b) => b.key === "about.videos");
  const initialized = useRef(false);

  const parseData = (b: ContentBlock | undefined) => {
    if (!b?.data) return { eyebrow: "Our Story", heading: "See What We", heading_accent: "Stand For", items: [] as AboutVideoItem[] };
    const d = b.data as Record<string, unknown>;
    return {
      eyebrow: String(d.eyebrow ?? "Our Story"),
      heading: String(d.heading ?? "See What We"),
      heading_accent: String(d.heading_accent ?? "Stand For"),
      items: Array.isArray(d.items) ? (d.items as AboutVideoItem[]) : [],
    };
  };

  const [data, setData] = useState(() => parseData(block));
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  useEffect(() => {
    if (!initialized.current && block) {
      initialized.current = true;
      setData(parseData(block));
    }
  }, [blocks]);

  const uploadFile = async (file: File, fieldKey: string, onUrl: (url: string) => void) => {
    setUploadingField(fieldKey);
    try {
      const base64 = await fileToBase64(file);
      const { url } = await uploadFn({ data: { filename: file.name, contentType: file.type || "application/octet-stream", base64 } });
      onUrl(url);
      onToast("success", `✓ "${file.name}" uploaded!`);
    } catch (err) {
      onToast("error", `Upload failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setUploadingField(null);
    }
  };

  const save = async () => {
    setSaving(true);
    try {
      const saved = await saveBlockFn({ data: { key: "about.videos", label: "About — Video Gallery", data: data as unknown as Record<string, unknown> } });
      onBlockSaved(saved);
      onToast("success", "✓ About Videos saved! Changes are live on the website.");
    } catch (err) {
      onToast("error", `Save failed: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSaving(false);
    }
  };

  const updateMeta = (field: string, val: string) => setData((prev) => ({ ...prev, [field]: val }));
  const updateItem = (idx: number, field: keyof AboutVideoItem, val: string) => {
    setData((prev) => ({ ...prev, items: prev.items.map((it, i) => i === idx ? { ...it, [field]: val } : it) }));
  };
  const addItem = () => {
    setConfirmDelete(null);
    setData((prev) => ({ ...prev, items: [...prev.items, { label: "", tag: "", badge: "", video_url: "" }] }));
  };
  const removeItem = (idx: number) => {
    setConfirmDelete(null);
    setData((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }));
  };

  const inp = { fontSize: 12.5, padding: "7px 10px", border: `0.5px solid ${C.borderMd}`, borderRadius: 7, background: C.bgTertiary, color: C.textPrimary, fontFamily: "inherit", width: "100%", outline: "none" };
  const lbl = { fontSize: 10, color: C.textTertiary, textTransform: "uppercase" as const, letterSpacing: "0.06em", display: "block", marginBottom: 4, fontWeight: 600 };
  const MEDIA_ACCEPT = "image/*,video/*,.mp4,.webm,.mov,.jpg,.jpeg,.png,.webp,.gif";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: C.bgPrimary, border: `0.5px solid ${C.border}`, borderRadius: 10 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>About — Media Gallery</p>
          <p style={{ fontSize: 11, color: C.textTertiary, marginTop: 2 }}>{data.items.length} card{data.items.length !== 1 ? "s" : ""} · About Us page marquee</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <a href="/about-us" target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(0,191,255,0.7)", background: "rgba(0,191,255,0.08)", border: "0.5px solid rgba(0,191,255,0.2)", borderRadius: 20, padding: "5px 12px", textDecoration: "none" }}>
            <EyeIcon size={11} /> Preview
          </a>
          <button onClick={addItem}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, padding: "6px 14px", background: "rgba(0,191,255,0.1)", border: "0.5px solid rgba(0,191,255,0.25)", color: "#00BFFF", borderRadius: 7, cursor: "pointer", fontFamily: "inherit" }}>
            <PlusIcon size={12} /> Add Card
          </button>
          <button onClick={save} disabled={saving}
            style={{ fontSize: 12, fontWeight: 600, padding: "6px 18px", background: "#00BFFF", border: "none", color: "#04090f", borderRadius: 7, cursor: saving ? "default" : "pointer", opacity: saving ? 0.55 : 1, fontFamily: "inherit" }}>
            {saving ? "Saving…" : "Save All"}
          </button>
        </div>
      </div>

      {/* Section heading fields */}
      <div style={{ background: C.bgPrimary, border: `0.5px solid ${C.border}`, borderRadius: 10, padding: "14px 16px" }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: C.textSecondary, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Section Headings</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { l: "Eyebrow", f: "eyebrow" },
            { l: "Heading", f: "heading" },
            { l: "Heading Accent (italic)", f: "heading_accent" },
          ].map(({ l, f }) => (
            <div key={f}>
              <span style={lbl}>{l}</span>
              <input style={inp} value={data[f as keyof typeof data] as string} onChange={(e) => updateMeta(f, e.target.value)} />
            </div>
          ))}
        </div>
      </div>

      {/* Cards */}
      {data.items.map((item, i) => (
        <div key={i} style={{ background: C.bgPrimary, border: `0.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: `0.5px solid ${C.border}`, background: "rgba(0,191,255,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary }}>{item.label || `Card ${i + 1}`}</span>
              {item.badge && <span style={{ fontSize: 9, padding: "1px 7px", borderRadius: 8, background: "rgba(0,191,255,0.1)", color: "#00BFFF", border: "0.5px solid rgba(0,191,255,0.25)" }}>{item.badge}</span>}
              {item.video_url && <span style={{ fontSize: 9, padding: "1px 7px", borderRadius: 8, background: isMediaImage(item.video_url) ? "rgba(74,222,128,0.1)" : "rgba(167,139,250,0.1)", color: isMediaImage(item.video_url) ? "#4ade80" : "#a78bfa", border: `0.5px solid ${isMediaImage(item.video_url) ? "rgba(74,222,128,0.25)" : "rgba(167,139,250,0.25)"}` }}>{isMediaImage(item.video_url) ? "🖼 Image" : "▶ Video"}</span>}
            </div>
            {/* Inline delete confirmation */}
            {confirmDelete === i ? (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 11, color: C.textTertiary }}>Remove this?</span>
                <button onClick={() => removeItem(i)}
                  style={{ fontSize: 11, padding: "4px 10px", background: "rgba(248,113,113,0.15)", border: "0.5px solid rgba(248,113,113,0.4)", color: "#f87171", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
                  Yes, Remove
                </button>
                <button onClick={() => setConfirmDelete(null)}
                  style={{ fontSize: 11, padding: "4px 10px", background: C.bgTertiary, border: `0.5px solid ${C.border}`, color: C.textSecondary, borderRadius: 6, cursor: "pointer", fontFamily: "inherit" }}>
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => setConfirmDelete(i)}
                style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, padding: "4px 10px", background: "rgba(248,113,113,0.07)", border: "0.5px solid rgba(248,113,113,0.2)", color: "#f87171", borderRadius: 6, cursor: "pointer", fontFamily: "inherit" }}>
                <TrashIcon size={11} /> Remove
              </button>
            )}
          </div>
          <div style={{ padding: "14px 16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div>
              <span style={lbl}>Card Label</span>
              <input style={inp} value={item.label} onChange={(e) => updateItem(i, "label", e.target.value)} placeholder="Project Walkthrough" />
            </div>
            <div>
              <span style={lbl}>Tag (sub-label)</span>
              <input style={inp} value={item.tag} onChange={(e) => updateItem(i, "tag", e.target.value)} placeholder="Infrastructure Tour" />
            </div>
            <div>
              <span style={lbl}>Badge (top pill)</span>
              <input style={inp} value={item.badge} onChange={(e) => updateItem(i, "badge", e.target.value)} placeholder="On Site / Live / Update" />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={lbl}>Media (Video or Image)</span>
                <label style={{ fontSize: 10, cursor: uploadingField === `abvid-${i}` ? "wait" : "pointer", color: "#00BFFF", fontWeight: 600 }}>
                  {uploadingField === `abvid-${i}` ? "Uploading…" : "↑ Upload"}
                  <input type="file" accept={MEDIA_ACCEPT} disabled={!!uploadingField} style={{ display: "none" }}
                    onChange={(e) => { const f = e.target.files?.[0]; if (!f) return; e.target.value = ""; uploadFile(f, `abvid-${i}`, (url) => updateItem(i, "video_url", url)); }} />
                </label>
              </div>
              <input style={{ ...inp, fontFamily: "monospace" }} value={item.video_url} onChange={(e) => updateItem(i, "video_url", e.target.value)} placeholder="https://… video or image URL, or upload ↗" />
              <MediaPreview url={item.video_url} style={{ maxHeight: 90, border: `0.5px solid ${C.border}` }} />
            </div>
          </div>
        </div>
      ))}

      {data.items.length === 0 && (
        <div style={{ textAlign: "center", padding: "36px 20px", border: `0.5px dashed ${C.border}`, borderRadius: 10, color: C.textTertiary, fontSize: 12 }}>
          No cards yet. Click <b style={{ color: "#00BFFF" }}>Add Card</b> to create the first one.
        </div>
      )}

      {data.items.length > 0 && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={addItem}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, padding: "7px 16px", background: "rgba(0,191,255,0.08)", border: "0.5px solid rgba(0,191,255,0.2)", color: "#00BFFF", borderRadius: 7, cursor: "pointer", fontFamily: "inherit" }}>
            <PlusIcon size={12} /> Add Another
          </button>
          <button onClick={save} disabled={saving}
            style={{ fontSize: 12, fontWeight: 600, padding: "7px 20px", background: "#00BFFF", border: "none", color: "#04090f", borderRadius: 7, cursor: saving ? "default" : "pointer", opacity: saving ? 0.55 : 1, fontFamily: "inherit" }}>
            {saving ? "Saving…" : "Save All Changes"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── fileToBase64 ──────────────────────────────────────────────────────────────
function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") { reject(new Error("Unable to read file")); return; }
      const i = result.indexOf(",");
      resolve(i >= 0 ? result.slice(i + 1) : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// ── Icon Components ───────────────────────────────────────────────────────────
function Ico({ d, size = 16, style }: { d: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d={d} />
    </svg>
  );
}

function HomeIcon({ size = 16 }: { size?: number })    { return <Ico size={size} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10" />; }
function BuildingIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18zM6 12H4a2 2 0 00-2 2v8h4M18 9h2a2 2 0 012 2v11h-4" />; }
function MapPinIcon({ size = 16 }: { size?: number })   { return <Ico size={size} d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a1 1 0 110-2 1 1 0 010 2z" />; }
function GridIcon({ size = 16 }: { size?: number })     { return <Ico size={size} d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />; }
function WrenchIcon({ size = 16 }: { size?: number })   { return <Ico size={size} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />; }
function ChartIcon({ size = 16 }: { size?: number })    { return <Ico size={size} d="M18 20V10M12 20V4M6 20v-6" />; }
function PencilIcon({ size = 16 }: { size?: number })   { return <Ico size={size} d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />; }
function StarIcon({ size = 16 }: { size?: number })     { return <Ico size={size} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />; }
function PhoneIcon({ size = 16 }: { size?: number })    { return <Ico size={size} d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />; }
function NewsIcon({ size = 16 }: { size?: number })     { return <Ico size={size} d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2 M18 14h-8 M15 18h-5 M10 6h8v4h-8z" />; }
function UsersIcon({ size = 16 }: { size?: number })    { return <Ico size={size} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75" />; }
function LayersIcon({ size = 16 }: { size?: number })   { return <Ico size={size} d="M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5" />; }
function CogIcon({ size = 16 }: { size?: number })      { return <Ico size={size} d="M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />; }
function LogoutIcon({ size = 16 }: { size?: number })   { return <Ico size={size} d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9" />; }
function EyeIcon({ size = 16, style }: { size?: number; style?: React.CSSProperties }) { return <Ico size={size} style={style} d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12a3 3 0 100-6 3 3 0 000 6z" />; }
function UploadIcon({ size = 16, style }: { size?: number; style?: React.CSSProperties }) { return <Ico size={size} style={style} d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12" />; }
function PlusIcon({ size = 16 }: { size?: number })     { return <Ico size={size} d="M12 5v14 M5 12h14" />; }
function ResetIcon({ size = 16 }: { size?: number })    { return <Ico size={size} d="M1 4v6h6 M3.51 15a9 9 0 102.13-9.36L1 10" />; }
function RefreshIcon({ size = 16 }: { size?: number })  { return <Ico size={size} d="M23 4v6h-6 M20.49 15a9 9 0 11-2.12-9.36L23 10" />; }
function SearchIcon({ size = 16, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function MenuIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M3 12h18 M3 6h18 M3 18h18" />; }
function VideoIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />; }
function DatabaseIcon({ size = 16, style }: { size?: number; style?: React.CSSProperties }) { return <Ico size={size} style={style} d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4z M2 12c0 2.21 4.48 4 10 4s10-1.79 10-4 M2 6c0 2.21 4.48 4 10 4s10-1.79 10-4" />; }
function TrashIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M3 6h18 M19 6l-1 14H6L5 6 M9 6V4h6v2" />; }
