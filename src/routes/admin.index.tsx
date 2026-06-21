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
    section: "Content",
    items: [
      { label: "Home", prefix: "home.", icon: HomeIcon },
      { label: "About Us", prefix: "about.", icon: BuildingIcon },
      { label: "Plot Selling", prefix: "plot_selling.", icon: MapPinIcon },
      { label: "Projects", prefix: "project", icon: GridIcon },
      { label: "Construction", prefix: "construction.", icon: WrenchIcon },
      { label: "Investment", prefix: "investment.", icon: ChartIcon },
      { label: "Architecture", prefix: "architecture.", icon: PencilIcon },
      { label: "Lifestyle", prefix: "lifestyle.", icon: StarIcon },
      { label: "Contact", prefix: "contact.", icon: PhoneIcon },
      { label: "Blog", prefix: "blog.", icon: NewsIcon },
      { label: "Partners", prefix: "channel_partner.", icon: UsersIcon },
    ],
  },
  {
    section: "Settings",
    items: [
      { label: "Footer", prefix: "footer.", icon: LayersIcon },
      { label: "Site Settings", prefix: "site.", icon: CogIcon },
    ],
  },
];

function previewUrl(blockKey: string): string | null {
  if (blockKey.startsWith("home.")) return "/";
  if (blockKey.startsWith("about.")) return "/about-us";
  if (blockKey.startsWith("contact.")) return "/contact";
  if (blockKey.startsWith("project")) return "/project";
  if (blockKey.startsWith("plot_selling.")) return "/plot-selling";
  if (blockKey.startsWith("construction.")) return "/construction-build";
  if (blockKey.startsWith("investment.")) return "/investment-consulting";
  if (blockKey.startsWith("architecture.")) return "/architecture-design";
  if (blockKey.startsWith("lifestyle.")) return "/lifestyle";
  if (blockKey.startsWith("blog.")) return "/blog";
  if (blockKey.startsWith("channel_partner.") || blockKey.startsWith("partner.")) return "/channel-partner";
  if (blockKey.startsWith("footer.")) return "/";
  return null;
}

function AdminPage() {
  const { isAdmin, loading, user } = useAuth();
  const navigate = useNavigate();
  const fetchBlocks = useServerFn(getSiteContentBlocks);
  const saveBlockFn = useServerFn(saveSiteContentBlock);
  const uploadFn = useServerFn(uploadMedia);
  const seedFn = useServerFn(seedDefaultContent);

  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [editJson, setEditJson] = useState<Record<string, string>>({});
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [filter, setFilter] = useState("");
  const [activeTab, setActiveTab] = useState("home.");
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [lastSavedKey, setLastSavedKey] = useState<string | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
          Object.fromEntries(
            data.map((b) => [b.key, JSON.stringify(b.data ?? {}, null, 2)]),
          ),
        );
      })
      .catch((err) => {
        addToast("error", `Failed to load: ${err instanceof Error ? err.message : String(err)}`);
      });
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
    try {
      parsed = JSON.parse(raw);
    } catch {
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

  const uploadFile = async (
    file: File,
    fieldKey: string,
    onUrl: (url: string) => void,
  ) => {
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#050a12" }}>
          <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#00BFFF]/30 border-t-[#00BFFF] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#00BFFF]/60 text-xs uppercase tracking-widest">Verifying access…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ background: "#050a12", fontFamily: "Inter, sans-serif", cursor: "default" }}>
      <style>{`
        * { cursor: default !important; }
        input, textarea, button, a, label, select { cursor: pointer !important; }
        input[type="text"], input[type="email"], input[type="password"], textarea { cursor: text !important; }
        .hidden { display: none !important; }
      `}</style>

      {/* ── Sidebar ── */}
      <aside
        className="flex flex-col shrink-0 transition-all duration-300"
        style={{
          width: sidebarOpen ? 220 : 0,
          minWidth: sidebarOpen ? 220 : 0,
          background: "#03070c",
          borderRight: "0.5px solid rgba(0,191,255,0.1)",
          overflow: "hidden",
        }}
      >
        {/* Brand */}
        <div style={{ padding: "20px 18px 16px", borderBottom: "0.5px solid rgba(0,191,255,0.1)" }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#f5f0e8", letterSpacing: "0.06em" }}>TRUSTON</div>
          <div style={{ fontSize: 10, color: "#00BFFF", marginTop: 3, letterSpacing: "0.06em", opacity: 0.8 }}>Admin Dashboard</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2">
          {SIDEBAR_NAV.map((group) => {
            const visibleItems = group.items.filter(
              (item) => blocks.some((b) => b.key.startsWith(item.prefix)) || blocks.length === 0
            );
            if (visibleItems.length === 0) return null;
            return (
              <div key={group.section} style={{ paddingTop: 12 }}>
                <div style={{ fontSize: 9, letterSpacing: "0.14em", color: "rgba(0,191,255,0.4)", textTransform: "uppercase", padding: "0 18px 6px", fontWeight: 600 }}>
                  {group.section}
                </div>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.prefix;
                  const count = blocks.filter((b) => b.key.startsWith(item.prefix)).length;
                  return (
                    <button
                      key={item.prefix}
                      onClick={() => setActiveTab(item.prefix)}
                      style={{
                        display: "flex", alignItems: "center", gap: 9,
                        padding: "8px 18px", width: "100%", textAlign: "left",
                        fontSize: 12.5, cursor: "pointer", border: "none",
                        borderLeft: `2px solid ${active ? "#00BFFF" : "transparent"}`,
                        background: active ? "rgba(0,191,255,0.07)" : "transparent",
                        color: active ? "#00BFFF" : "#7a7060",
                        transition: "all 0.12s",
                      }}
                      onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = "#00BFFF"; }}
                      onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = "#7a7060"; }}
                    >
                      <Icon size={14} />
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {count > 0 && (
                        <span style={{ fontSize: 9, background: active ? "rgba(0,191,255,0.15)" : "rgba(255,255,255,0.05)", color: active ? "#00BFFF" : "rgba(255,255,255,0.3)", padding: "1px 6px", borderRadius: 10, fontWeight: 600 }}>
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: "14px 18px", borderTop: "0.5px solid rgba(0,191,255,0.1)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(0,191,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#00BFFF", border: "0.5px solid rgba(0,191,255,0.3)", flexShrink: 0 }}>
            {user?.email?.[0]?.toUpperCase() ?? "A"}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: "#e5e0d8", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.email ?? "Admin"}
            </div>
            <div style={{ fontSize: 9, color: "#00BFFF", opacity: 0.5 }}>Super Admin</div>
          </div>
          <button
            onClick={signOut}
            title="Sign out"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#4a4540", padding: 4, display: "flex", flexShrink: 0 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#00BFFF"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#4a4540"; }}
          >
            <LogoutIcon size={14} />
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Topbar */}
        <div style={{ background: "#050a12", borderBottom: "0.5px solid rgba(0,191,255,0.1)", padding: "0 24px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#00BFFF", padding: 4, display: "flex" }}
            >
              <MenuIcon size={16} />
            </button>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#e5e0d8" }}>{activeSectionLabel}</div>
              <div style={{ fontSize: 10, color: "rgba(0,191,255,0.5)" }}>Website → {activeSectionLabel}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 6, border: "0.5px solid rgba(0,191,255,0.2)", background: "transparent", color: "#00BFFF", fontSize: 11, cursor: "pointer", textDecoration: "none", opacity: 0.8 }}
            >
              <EyeIcon size={12} /> Live Site
            </a>
            <button
              onClick={() => handleSeed(false)}
              disabled={seeding}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 6, border: "0.5px solid rgba(0,191,255,0.3)", background: "rgba(0,191,255,0.08)", color: "#00BFFF", fontSize: 11, cursor: "pointer" }}
            >
              <PlusIcon size={12} /> {seeding ? "Working…" : "Initialize"}
            </button>
            <button
              onClick={() => { if (confirm("Reset ALL content to factory defaults? Your edits will be overwritten.")) handleSeed(true); }}
              disabled={seeding}
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 6, border: "0.5px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.07)", color: "#f87171", fontSize: 11, cursor: "pointer" }}
            >
              <ResetIcon size={12} /> Reset
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto" style={{ padding: "20px 24px" }}>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
              { label: "Total Blocks", value: String(blocks.length) },
              { label: "Showing", value: String(filteredBlocks.length) },
              { label: "Section", value: activeSectionLabel, gold: true },
              { label: "Status", value: uploadingField ? "Uploading…" : savingKey ? "Saving…" : "Ready" },
            ].map(({ label, value, gold }) => (
              <div key={label} style={{ background: "#161616", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ fontSize: 9, color: "#5a5248", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: gold ? "#d4a96a" : "#e5e0d8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Search + Upload */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#5a5248" }} />
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search sections…"
                style={{ width: "100%", background: "#161616", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px 8px 34px", fontSize: 12, color: "#e5e0d8", outline: "none" }}
              />
            </div>
          </div>

          {/* Upload Panel */}
          <MediaUploadPanel onToast={addToast} uploadFn={uploadFn} />

          {/* Empty state */}
          {blocks.length === 0 && (
            <div style={{ border: "0.5px solid rgba(212,169,106,0.2)", background: "rgba(212,169,106,0.04)", borderRadius: 10, padding: "40px 24px", textAlign: "center", marginTop: 12 }}>
              <p style={{ color: "#d4a96a", fontWeight: 500, marginBottom: 8 }}>No content sections yet</p>
              <p style={{ color: "#7a7060", fontSize: 12, marginBottom: 16 }}>Click Initialize to seed all editable sections.</p>
              <button onClick={() => handleSeed(false)} disabled={seeding} style={{ background: "rgba(212,169,106,0.12)", border: "0.5px solid rgba(212,169,106,0.3)", color: "#d4a96a", padding: "8px 20px", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>
                {seeding ? "Working…" : "Initialize All Sections Now"}
              </button>
            </div>
          )}

          {filteredBlocks.length === 0 && blocks.length > 0 && (
            <div style={{ border: "0.5px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: "32px", textAlign: "center" }}>
              <p style={{ color: "#5a5248", fontSize: 12, marginBottom: 8 }}>No sections match this filter.</p>
              <button onClick={() => { setFilter(""); setActiveTab("home."); }} style={{ color: "#d4a96a", fontSize: 11, background: "none", border: "none", cursor: "pointer" }}>Clear filters</button>
            </div>
          )}

          {/* Block Cards */}
          <div className="space-y-4">
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
              />
            ))}
          </div>

        </div>
      </div>

      {/* Toast Stack */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 50, display: "flex", flexDirection: "column", gap: 8, maxWidth: 360, pointerEvents: "none" }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              pointerEvents: "auto", display: "flex", alignItems: "flex-start", gap: 10,
              padding: "10px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500,
              border: `0.5px solid ${t.type === "success" ? "rgba(74,222,128,0.3)" : t.type === "error" ? "rgba(248,113,113,0.3)" : "rgba(212,169,106,0.3)"}`,
              background: t.type === "success" ? "rgba(2,44,34,0.97)" : t.type === "error" ? "rgba(44,2,2,0.97)" : "rgba(30,20,10,0.97)",
              color: t.type === "success" ? "#4ade80" : t.type === "error" ? "#f87171" : "#d4a96a",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
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
  onToast,
  uploadFn,
}: {
  onToast: (type: Toast["type"], msg: string) => void;
  uploadFn: ReturnType<typeof useServerFn<typeof uploadMedia>>;
}) {
  const [uploading, setUploading] = useState(false);
  const [lastUrl, setLastUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <div style={{ marginBottom: 16, border: "0.5px solid rgba(212,169,106,0.15)", borderRadius: 8, overflow: "hidden" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: "rgba(212,169,106,0.04)", border: "none", cursor: "pointer", color: "#9a9080", fontSize: 12 }}
      >
        <UploadIcon size={13} style={{ color: "#d4a96a" }} />
        <span style={{ fontWeight: 500, color: "#c5bdb0" }}>Upload Media</span>
        <span style={{ fontSize: 10, color: "#5a5248", marginLeft: 4 }}>Images & Videos → get URL to paste in fields</span>
        <span style={{ marginLeft: "auto", fontSize: 10, color: "#5a5248" }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{ padding: "14px 16px", background: "#121212", display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="flex flex-col sm:flex-row gap-3 items-start">
            <label
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
                border: `1px dashed ${uploading ? "rgba(212,169,106,0.2)" : "rgba(212,169,106,0.4)"}`,
                borderRadius: 8, cursor: uploading ? "wait" : "pointer", fontSize: 12,
                color: uploading ? "#7a7060" : "#d4a96a", background: "rgba(212,169,106,0.05)",
                flexShrink: 0,
              }}
            >
              {uploading ? (
                <span style={{ width: 14, height: 14, border: "2px solid rgba(212,169,106,0.3)", borderTop: "2px solid #d4a96a", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
              ) : (
                <UploadIcon size={13} />
              )}
              {uploading ? "Uploading…" : "Choose File"}
              <input
                type="file"
                accept="image/*,video/*,.mp4,.webm,.mov"
                disabled={uploading}
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) handleFile(f); }}
              />
            </label>

            {lastUrl && !uploading && (
              <div style={{ flex: 1, border: "0.5px solid rgba(74,222,128,0.2)", background: "rgba(74,222,128,0.04)", borderRadius: 8, padding: "10px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: "#4ade80", fontWeight: 500 }}>✓ Uploaded — copy URL and paste into a field</span>
                  <button
                    onClick={copyUrl}
                    style={{ padding: "3px 10px", borderRadius: 6, fontSize: 10, fontWeight: 600, border: "none", cursor: "pointer", background: copied ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.06)", color: copied ? "#4ade80" : "#00BFFF" }}
                  >
                    {copied ? "Copied ✓" : "Copy URL"}
                  </button>
                </div>
                <p style={{ fontSize: 10, color: "#5a5248", fontFamily: "monospace", wordBreak: "break-all", marginBottom: 8 }}>{lastUrl}</p>
                {isVideo
                  ? <video src={lastUrl} controls style={{ width: "100%", maxHeight: 120, borderRadius: 6, background: "#000" }} />
                  : <img src={lastUrl} alt="preview" style={{ height: 72, borderRadius: 6, objectFit: "cover", border: "0.5px solid rgba(255,255,255,0.08)" }} />
                }
              </div>
            )}
          </div>
          <p style={{ fontSize: 10, color: "#3a3530" }}>Supports JPG, PNG, WebP, MP4, WebM. Files are uploaded to your storage bucket.</p>
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
  block, value, onChange, onSave, saving, justSaved, uploadingField, onUpload,
}: {
  block: ContentBlock;
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  saving: boolean;
  justSaved: boolean;
  uploadingField: string | null;
  onUpload: (file: File, fieldKey: string, onUrl: (url: string) => void) => void;
}) {
  const [open, setOpen] = useState(false);

  let parsed: Record<string, unknown> | null = null;
  try { parsed = JSON.parse(value); } catch { parsed = null; }

  const simpleFields = parsed
    ? Object.entries(parsed).filter(([, v]) => typeof v === "string" || typeof v === "number")
    : [];

  const cardArray: CardItem[] | null = parsed && Array.isArray(parsed.cards) ? (parsed.cards as CardItem[]) : null;
  const imagesArray: ImageItem[] | null = parsed && Array.isArray(parsed.images) ? (parsed.images as ImageItem[]) : null;
  const amenitiesArray: AmenityItem[] | null = parsed && Array.isArray(parsed.amenities) ? (parsed.amenities as AmenityItem[]) : null;
  const reasonsArray: ReasonItem[] | null = parsed && Array.isArray(parsed.reasons) ? (parsed.reasons as ReasonItem[]) : null;
  const pillarsArray: ReasonItem[] | null = parsed && Array.isArray(parsed.pillars) ? (parsed.pillars as ReasonItem[]) : null;

  const preview = previewUrl(block.key);

  const isUploadField = (field: string) =>
    field.endsWith("_url") || field.endsWith("_image") || field.endsWith("_src") ||
    field === "image" || field === "video" || field === "src";

  return (
    <div
      style={{
        border: `0.5px solid ${justSaved ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.07)"}`,
        background: justSaved ? "rgba(74,222,128,0.03)" : "#161616",
        borderRadius: 10,
        overflow: "hidden",
        transition: "border-color 0.3s",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", borderBottom: "0.5px solid rgba(0,191,255,0.1)", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <span style={{ padding: "2px 8px", borderRadius: 4, background: "rgba(0,191,255,0.1)", border: "0.5px solid rgba(0,191,255,0.2)", color: "#00BFFF", fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", flexShrink: 0 }}>
            {block.key.split(".")[0]}
          </span>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 12.5, fontWeight: 500, color: "#e5e0d8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{block.label}</p>
            <p style={{ fontSize: 9, color: "rgba(0,191,255,0.4)", fontFamily: "monospace", marginTop: 1 }}>{block.key}</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {justSaved && <span style={{ fontSize: 11, color: "#4ade80", fontWeight: 600 }}>✓ Saved</span>}
          {preview && (
            <a href={preview} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 6, border: "0.5px solid rgba(255,255,255,0.08)", color: "#7a7060", fontSize: 11, textDecoration: "none" }}>
              <EyeIcon size={11} /> Preview
            </a>
          )}
          <button
            onClick={onSave}
            disabled={saving}
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 14px", borderRadius: 6, background: "#00BFFF", color: "#050a12", fontSize: 11, fontWeight: 700, border: "none", cursor: "pointer", opacity: saving ? 0.6 : 1 }}
          >
            {saving ? <span style={{ width: 10, height: 10, border: "2px solid rgba(5,10,18,0.3)", borderTop: "2px solid #050a12", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} /> : <SaveIcon size={11} />}
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {/* Simple string/number fields */}
      {simpleFields.length > 0 && (
        <div style={{ padding: "14px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {simpleFields.map(([field, val]) => {
            const isUrl = isUploadField(field);
            const fieldUid = `${block.key}::${field}`;
            const isUploading = uploadingField === fieldUid;
            const isLong = field.includes("desc") || field.includes("body") || field.includes("subtitle");

            return (
              <div key={field} style={{ gridColumn: isUrl || isLong ? "1 / -1" : "auto" }}>
                <label style={{ display: "block", fontSize: 9, color: "#5a5248", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 5 }}>
                  {field.replace(/_/g, " ")}
                  {isUrl && <span style={{ marginLeft: 5, textTransform: "none", letterSpacing: "normal", fontWeight: 400, color: "#3a3530" }}>— url or upload</span>}
                </label>
                {isUrl ? (
                  <div style={{ display: "flex", gap: 6 }}>
                    <input
                      value={String(val)}
                      onChange={(e) => { if (!parsed) return; onChange(JSON.stringify({ ...parsed, [field]: e.target.value }, null, 2)); }}
                      placeholder="https://… or upload a file →"
                      style={{ flex: 1, minWidth: 0, background: "#1e1e1e", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "7px 10px", fontSize: 11, color: "#e5e0d8", fontFamily: "monospace", outline: "none" }}
                    />
                    <label style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 6, border: "0.5px solid rgba(0,191,255,0.25)", background: "rgba(0,191,255,0.06)", color: isUploading ? "rgba(0,191,255,0.4)" : "#00BFFF", fontSize: 11, cursor: isUploading ? "wait" : "pointer", flexShrink: 0 }}>
                      {isUploading ? <span style={{ width: 12, height: 12, border: "2px solid rgba(0,191,255,0.3)", borderTop: "2px solid #00BFFF", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} /> : <UploadIcon size={11} />}
                      {isUploading ? "…" : "Upload"}
                      <input type="file" accept="image/*,video/*" disabled={!!uploadingField} className="hidden"
                        onChange={(e) => { const file = e.target.files?.[0]; if (!file || !parsed) return; e.target.value = ""; onUpload(file, fieldUid, (url) => onChange(JSON.stringify({ ...parsed, [field]: url }, null, 2))); }} />
                    </label>
                  </div>
                ) : isLong ? (
                  <textarea
                    value={String(val)}
                    onChange={(e) => { if (!parsed) return; onChange(JSON.stringify({ ...parsed, [field]: e.target.value }, null, 2)); }}
                    rows={3}
                    style={{ width: "100%", background: "#1e1e1e", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "7px 10px", fontSize: 12, color: "#e5e0d8", outline: "none", resize: "vertical", lineHeight: 1.6, fontFamily: "inherit" }}
                  />
                ) : (
                  <input
                    value={String(val)}
                    onChange={(e) => { if (!parsed) return; onChange(JSON.stringify({ ...parsed, [field]: e.target.value }, null, 2)); }}
                    style={{ width: "100%", background: "#1e1e1e", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "7px 10px", fontSize: 12, color: "#e5e0d8", outline: "none" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Images Array Editor (for home.new_generation) */}
      {imagesArray && (
        <div style={{ padding: "0 16px 14px" }}>
          <div style={{ fontSize: 9, color: "#5a5248", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 8 }}>Images (Circle Media)</div>
          <ImagesArrayEditor
            images={imagesArray}
            onChange={(updated) => { if (!parsed) return; onChange(JSON.stringify({ ...parsed, images: updated }, null, 2)); }}
            uploadingField={uploadingField}
            blockKey={block.key}
            onUpload={onUpload}
            parsed={parsed}
            fullValue={value}
            onFullChange={onChange}
          />
        </div>
      )}

      {/* Card Array Editor (home.services) */}
      {cardArray && (
        <div style={{ padding: "0 16px 14px" }}>
          <div style={{ fontSize: 9, color: "#5a5248", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 8 }}>Service Cards</div>
          <CardArrayEditor
            cards={cardArray}
            onChange={(updated) => { if (!parsed) return; onChange(JSON.stringify({ ...parsed, cards: updated }, null, 2)); }}
          />
        </div>
      )}

      {/* Amenities Array Editor */}
      {amenitiesArray && (
        <div style={{ padding: "0 16px 14px" }}>
          <div style={{ fontSize: 9, color: "#5a5248", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 8 }}>Amenities</div>
          <GenericArrayEditor
            items={amenitiesArray}
            fields={["icon", "title", "desc"]}
            onChange={(updated) => { if (!parsed) return; onChange(JSON.stringify({ ...parsed, amenities: updated }, null, 2)); }}
          />
        </div>
      )}

      {/* Reasons Array Editor */}
      {reasonsArray && (
        <div style={{ padding: "0 16px 14px" }}>
          <div style={{ fontSize: 9, color: "#5a5248", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 8 }}>Reasons</div>
          <GenericArrayEditor
            items={reasonsArray}
            fields={["num", "title", "desc"]}
            onChange={(updated) => { if (!parsed) return; onChange(JSON.stringify({ ...parsed, reasons: updated }, null, 2)); }}
          />
        </div>
      )}

      {/* Pillars Array Editor */}
      {pillarsArray && (
        <div style={{ padding: "0 16px 14px" }}>
          <div style={{ fontSize: 9, color: "#5a5248", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 8 }}>Pillars</div>
          <GenericArrayEditor
            items={pillarsArray}
            fields={["num", "title", "desc"]}
            onChange={(updated) => { if (!parsed) return; onChange(JSON.stringify({ ...parsed, pillars: updated }, null, 2)); }}
          />
        </div>
      )}

      {/* Advanced JSON toggle */}
      <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
        <button
          onClick={() => setOpen((v) => !v)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 16px", background: "none", border: "none", cursor: "pointer", color: "#3a3530", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600 }}
        >
          <span>Advanced — Raw JSON</span>
          <span>{open ? "▲" : "▼"}</span>
        </button>
        {open && (
          <div style={{ padding: "0 16px 14px" }}>
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              rows={10}
              style={{ width: "100%", background: "#0d0d0d", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 6, padding: "10px 12px", fontFamily: "monospace", fontSize: 11, color: "#8aaf80", lineHeight: 1.6, outline: "none", resize: "vertical" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Images Array Editor ───────────────────────────────────────────────────────
function ImagesArrayEditor({
  images,
  onChange,
  uploadingField,
  blockKey,
  onUpload,
}: {
  images: ImageItem[];
  onChange: (updated: ImageItem[]) => void;
  uploadingField: string | null;
  blockKey: string;
  onUpload: (file: File, fieldKey: string, onUrl: (url: string) => void) => void;
}) {
  const update = (idx: number, field: keyof ImageItem, val: string) => {
    onChange(images.map((img, i) => i === idx ? { ...img, [field]: val } : img));
  };

  const addImage = () => {
    onChange([...images, { src: "", alt: "", video_url: "" }]);
  };

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
      {images.map((img, idx) => {
        const srcKey = `${blockKey}::images::${idx}::src`;
        const videoKey = `${blockKey}::images::${idx}::video_url`;
        const isSrcUploading = uploadingField === srcKey;
        const isVideoUploading = uploadingField === videoKey;

        return (
          <div key={idx} style={{ border: "0.5px solid rgba(0,191,255,0.1)", borderRadius: 10, padding: "12px", background: "#03070c", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 9, color: "#00BFFF", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em" }}>#{idx + 1}</span>
                {img.src && (
                  <img src={img.src} alt="" style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(0,191,255,0.2)" }} />
                )}
              </div>
              <button onClick={() => removeImage(idx)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(239,68,68,0.5)", fontSize: 11 }} onMouseEnter={(e) => e.currentTarget.style.color="#ef4444"} onMouseLeave={(e) => e.currentTarget.style.color="rgba(239,68,68,0.5)"}>✕</button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {/* src */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <label style={{ fontSize: 8, color: "rgba(0,191,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Image URL</label>
                  <label style={{ display: "flex", alignItems: "center", gap: 3, color: isSrcUploading ? "rgba(0,191,255,0.3)" : "#00BFFF", fontSize: 8, cursor: isSrcUploading ? "wait" : "pointer", fontWeight: 600 }}>
                    {isSrcUploading ? "…" : "Upload"}
                    <input type="file" accept="image/*" disabled={!!uploadingField} className="hidden"
                      onChange={(e) => { const file = e.target.files?.[0]; if (!file) return; e.target.value = ""; onUpload(file, srcKey, (url) => update(idx, "src", url)); }} />
                  </label>
                </div>
                <input
                  value={img.src}
                  onChange={(e) => update(idx, "src", e.target.value)}
                  placeholder="/assets/photo.jpg"
                  style={{ width: "100%", background: "#050a12", border: "0.5px solid rgba(0,191,255,0.1)", borderRadius: 6, padding: "6px 8px", fontSize: 10, color: "#e5e0d8", fontFamily: "monospace", outline: "none" }}
                />
              </div>

              {/* alt */}
              <div>
                <label style={{ display: "block", fontSize: 8, color: "rgba(0,191,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Alt Text</label>
                <input
                  value={img.alt}
                  onChange={(e) => update(idx, "alt", e.target.value)}
                  placeholder="Describe image"
                  style={{ width: "100%", background: "#050a12", border: "0.5px solid rgba(0,191,255,0.1)", borderRadius: 6, padding: "6px 8px", fontSize: 10, color: "#e5e0d8", outline: "none" }}
                />
              </div>

              {/* video_url */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <label style={{ fontSize: 8, color: "rgba(0,191,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Video URL</label>
                  <label style={{ display: "flex", alignItems: "center", gap: 3, color: isVideoUploading ? "rgba(0,191,255,0.3)" : "#00BFFF", fontSize: 8, cursor: isVideoUploading ? "wait" : "pointer", fontWeight: 600 }}>
                    {isVideoUploading ? "…" : "Upload"}
                    <input type="file" accept="video/*" disabled={!!uploadingField} className="hidden"
                      onChange={(e) => { const file = e.target.files?.[0]; if (!file) return; e.target.value = ""; onUpload(file, videoKey, (url) => update(idx, "video_url", url)); }} />
                  </label>
                </div>
                <input
                  value={img.video_url}
                  onChange={(e) => update(idx, "video_url", e.target.value)}
                  placeholder="video.mp4"
                  style={{ width: "100%", background: "#050a12", border: "0.5px solid rgba(0,191,255,0.1)", borderRadius: 6, padding: "6px 8px", fontSize: 10, color: "#e5e0d8", fontFamily: "monospace", outline: "none" }}
                />
              </div>
            </div>
          </div>
        );
      })}
      <button
        onClick={addImage}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px", border: "1px dashed rgba(0,191,255,0.2)", borderRadius: 10, background: "rgba(0,191,255,0.02)", color: "#00BFFF", fontSize: 11, cursor: "pointer", minHeight: 140 }}
      >
        <PlusIcon size={14} /> Add Image
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
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {cards.map((card, idx) => (
        <div key={idx} style={{ border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "10px 12px", background: "#1a1a1a" }}>
          <p style={{ fontSize: 9, color: "#d4a96a", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 8 }}>Card {card.num ?? String(idx + 1)}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div>
              <label style={{ display: "block", fontSize: 9, color: "#5a5248", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Title</label>
              <input value={card.name ?? ""} onChange={(e) => update(idx, "name", e.target.value)}
                style={{ width: "100%", background: "#111", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 5, padding: "6px 8px", fontSize: 11, color: "#e5e0d8", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 9, color: "#5a5248", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Button Text</label>
              <input value={String(card.linkText ?? "")} onChange={(e) => update(idx, "linkText", e.target.value)}
                style={{ width: "100%", background: "#111", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 5, padding: "6px 8px", fontSize: 11, color: "#e5e0d8", outline: "none" }} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontSize: 9, color: "#5a5248", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Description</label>
              <textarea value={card.desc ?? ""} onChange={(e) => update(idx, "desc", e.target.value)}
                rows={2} style={{ width: "100%", background: "#111", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 5, padding: "6px 8px", fontSize: 11, color: "#e5e0d8", resize: "vertical", lineHeight: 1.5, outline: "none", fontFamily: "inherit" }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Generic Array Editor (for amenities, reasons, pillars) ────────────────────
function GenericArrayEditor({
  items,
  fields,
  onChange,
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
  const removeItem = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, idx) => (
        <div key={idx} style={{ border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "10px 12px", background: "#1a1a1a" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 9, color: "#d4a96a", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em" }}>Item {idx + 1}</span>
            <button onClick={() => removeItem(idx)} style={{ background: "none", border: "none", cursor: "pointer", color: "#5a5248", fontSize: 11 }}>✕</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {fields.map((field) => {
              const isLong = field === "desc";
              return (
                <div key={field}>
                  <label style={{ display: "block", fontSize: 9, color: "#5a5248", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>{field}</label>
                  {isLong ? (
                    <textarea
                      value={String(item[field] ?? "")}
                      onChange={(e) => update(idx, field, e.target.value)}
                      rows={2}
                      style={{ width: "100%", background: "#111", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 5, padding: "6px 8px", fontSize: 11, color: "#e5e0d8", resize: "vertical", lineHeight: 1.5, outline: "none", fontFamily: "inherit" }}
                    />
                  ) : (
                    <input
                      value={String(item[field] ?? "")}
                      onChange={(e) => update(idx, field, e.target.value)}
                      style={{ width: "100%", background: "#111", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 5, padding: "6px 8px", fontSize: 11, color: "#e5e0d8", outline: "none" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "7px", border: "0.5px dashed rgba(212,169,106,0.25)", borderRadius: 8, background: "transparent", color: "#7a7060", fontSize: 11, cursor: "pointer", width: "100%" }}
      >
        <PlusIcon size={12} /> Add Item
      </button>
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

function HomeIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10" />; }
function BuildingIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18zM6 12H4a2 2 0 00-2 2v8h4M18 9h2a2 2 0 012 2v11h-4" />; }
function MapPinIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a1 1 0 110-2 1 1 0 010 2z" />; }
function GridIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />; }
function WrenchIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />; }
function ChartIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M18 20V10M12 20V4M6 20v-6" />; }
function PencilIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />; }
function StarIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />; }
function PhoneIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />; }
function NewsIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2 M18 14h-8 M15 18h-5 M10 6h8v4h-8z" />; }
function UsersIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75" />; }
function LayersIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5" />; }
function CogIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />; }
function LogoutIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9" />; }
function EyeIcon({ size = 16, style }: { size?: number; style?: React.CSSProperties }) { return <Ico size={size} style={style} d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12a3 3 0 100-6 3 3 0 000 6z" />; }
function SaveIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z M17 21v-8H7v8 M7 3v5h8" />; }
function UploadIcon({ size = 16, style }: { size?: number; style?: React.CSSProperties }) { return <Ico size={size} style={style} d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12" />; }
function PlusIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M12 5v14 M5 12h14" />; }
function ResetIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M1 4v6h6 M3.51 15a9 9 0 102.13-9.36L1 10" />; }
function SearchIcon({ size = 16, className, style }: { size?: number; className?: string; style?: React.CSSProperties }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>; }
function MenuIcon({ size = 16 }: { size?: number }) { return <Ico size={size} d="M3 12h18 M3 6h18 M3 18h18" />; }
