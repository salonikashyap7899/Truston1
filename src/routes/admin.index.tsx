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

const PAGE_TABS = [
  { label: "All Pages", prefix: "" },
  { label: "Home", prefix: "home." },
  { label: "About Us", prefix: "about." },
  { label: "Plot Selling", prefix: "plot_selling." },
  { label: "Project", prefix: "project" },
  { label: "Services", prefix: "services." },
  { label: "Construction", prefix: "construction." },
  { label: "Investment", prefix: "investment." },
  { label: "Architecture", prefix: "architecture." },
  { label: "Lifestyle", prefix: "lifestyle." },
  { label: "Contact", prefix: "contact." },
  { label: "Partners", prefix: "partner." },
  { label: "Footer", prefix: "footer." },
];

function previewUrl(blockKey: string): string | null {
  if (blockKey.startsWith("home.")) return "/";
  if (blockKey.startsWith("about.")) return "/about-us";
  if (blockKey.startsWith("contact.")) return "/contact";
  if (blockKey.startsWith("services.")) return "/services";
  if (blockKey.startsWith("project_detail.") || blockKey.startsWith("project.")) return "/project";
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

function pageLabel(blockKey: string): string {
  const tab = PAGE_TABS.find((t) => t.prefix && blockKey.startsWith(t.prefix));
  return tab?.label ?? blockKey.split(".")[0].replace(/_/g, " ");
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
  const [activeTab, setActiveTab] = useState("");
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [lastSavedKey, setLastSavedKey] = useState<string | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [showInitBox, setShowInitBox] = useState(false);
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
      setShowInitBox(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#04090f] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#00BFFF]/30 border-t-[#00BFFF] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/40 text-sm uppercase tracking-widest">Verifying access…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#04090f] text-white">

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#04090f]/95 backdrop-blur-md">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-[#00BFFF]/15 border border-[#00BFFF]/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#00BFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <span className="text-white font-semibold text-sm tracking-wide">TrustOn Admin</span>
              <span className="ml-3 text-[#00BFFF] text-[10px] uppercase tracking-[0.25em] font-bold hidden sm:inline">Content Manager</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:block text-white/30 text-xs truncate max-w-[200px]">{user?.email}</span>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/10 text-white/60 text-xs hover:border-white/25 hover:text-white transition-all"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              Live Site
            </a>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto px-6 py-8">

        {/* ── Stats Bar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Sections", value: blocks.length, accent: false },
            { label: "Showing", value: filteredBlocks.length, accent: false },
            { label: "Active Page", value: PAGE_TABS.find(t => t.prefix === activeTab)?.label ?? "All Pages", accent: true },
            { label: "Status", value: uploadingField ? "Uploading…" : savingKey ? "Saving…" : "Ready", accent: false },
          ].map(({ label, value, accent }) => (
            <div key={label} className="rounded-2xl border border-white/8 bg-white/3 px-5 py-4">
              <p className="text-white/35 text-[10px] uppercase tracking-[0.25em] mb-1">{label}</p>
              <p className={`text-xl font-semibold ${accent ? "text-[#00BFFF]" : "text-white"}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* ── Toolbar Row ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search sections, headings, text…"
              className="w-full bg-white/4 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#00BFFF]/40 transition-colors"
            />
          </div>
          <button
            onClick={() => setShowInitBox((v) => !v)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#00BFFF]/30 bg-[#00BFFF]/8 text-[#00BFFF] text-sm font-medium hover:bg-[#00BFFF]/15 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Initialize Sections
          </button>
        </div>

        {/* ── Initialize Panel (collapsible) ── */}
        {showInitBox && (
          <div className="mb-6 rounded-2xl border border-[#00BFFF]/20 bg-[#00BFFF]/5 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div>
                <p className="text-white font-semibold mb-1">Initialize / Reset Content Sections</p>
                <p className="text-white/45 text-sm leading-relaxed max-w-xl">
                  <strong className="text-white">Initialize</strong> creates any missing content blocks for all pages. Use <strong className="text-white">Reset</strong> only if you want to restore ALL content to factory defaults (this overwrites your changes).
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={() => handleSeed(false)}
                  disabled={seeding}
                  className="px-5 py-2.5 rounded-xl bg-[#00BFFF] text-[#04090f] text-sm font-bold disabled:opacity-50 hover:brightness-110 whitespace-nowrap"
                >
                  {seeding ? "Working…" : "Initialize Missing"}
                </button>
                <button
                  onClick={() => { if (confirm("This will RESET ALL content to defaults, overwriting your changes. Continue?")) handleSeed(true); }}
                  disabled={seeding}
                  className="px-5 py-2.5 rounded-xl border border-red-500/40 text-red-400 text-sm disabled:opacity-50 hover:bg-red-500/10 whitespace-nowrap"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Page Tabs ── */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {PAGE_TABS.map((tab) => {
            const count = tab.prefix
              ? blocks.filter((b) => b.key.startsWith(tab.prefix)).length
              : blocks.length;
            if (!tab.prefix && count === 0) return null;
            if (tab.prefix && count === 0) return null;
            return (
              <button
                key={tab.prefix}
                onClick={() => setActiveTab(tab.prefix)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === tab.prefix
                    ? "bg-[#00BFFF] text-[#04090f]"
                    : "bg-white/5 border border-white/8 text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${activeTab === tab.prefix ? "bg-[#04090f]/20" : "bg-white/8"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Empty State ── */}
        {blocks.length === 0 && (
          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-12 text-center">
            <div className="w-12 h-12 rounded-2xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <p className="text-amber-200 font-semibold text-lg mb-2">No content sections yet</p>
            <p className="text-amber-200/50 text-sm mb-5">Click "Initialize Sections" above to create editable blocks for every section of your website.</p>
            <button onClick={() => { setShowInitBox(true); }} className="px-6 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-sm font-medium">
              Show Initialize Panel
            </button>
          </div>
        )}

        {filteredBlocks.length === 0 && blocks.length > 0 && (
          <div className="rounded-2xl border border-white/8 bg-white/3 p-10 text-center">
            <p className="text-white/40 text-sm">No sections match your current filter.</p>
            <button onClick={() => { setFilter(""); setActiveTab(""); }} className="mt-3 text-[#00BFFF] text-xs hover:underline">Clear filters</button>
          </div>
        )}

        {/* ── Block Cards ── */}
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

      {/* ── Toast Stack ── */}
      <div className="fixed bottom-6 right-6 z-50 space-y-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur text-sm font-medium animate-in slide-in-from-bottom-2 fade-in duration-300 ${
              t.type === "success" ? "border-green-500/40 bg-green-950/90 text-green-200"
              : t.type === "error" ? "border-red-500/40 bg-red-950/90 text-red-200"
              : "border-[#00BFFF]/40 bg-[#04090f]/90 text-[#00BFFF]"
            }`}
          >
            <span className="shrink-0 mt-0.5">
              {t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"}
            </span>
            <span className="leading-relaxed">{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type CardItem = { num?: string; name: string; desc: string; linkText?: string; [k: string]: unknown };

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

  const cardArray: CardItem[] | null =
    parsed && Array.isArray(parsed.cards) ? (parsed.cards as CardItem[]) : null;

  const preview = previewUrl(block.key);
  const page = pageLabel(block.key);

  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${justSaved ? "border-green-500/40 bg-green-950/10" : "border-white/8 bg-white/[0.02]"}`}>

      {/* Card Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-b border-white/6">
        <div className="flex items-center gap-3 min-w-0">
          <span className="shrink-0 px-2.5 py-1 rounded-lg bg-[#00BFFF]/10 border border-[#00BFFF]/20 text-[#00BFFF] text-[10px] font-bold uppercase tracking-[0.2em]">
            {page}
          </span>
          <div className="min-w-0">
            <p className="text-xs text-white/30 font-mono truncate">{block.key}</p>
            <p className="text-white font-semibold text-sm mt-0.5 leading-tight">{block.label}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {justSaved && <span className="text-green-400 text-xs font-semibold animate-in fade-in">✓ Saved</span>}
          {preview && (
            <a
              href={preview}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-white/40 text-xs hover:text-white hover:border-white/25 transition-all"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              Preview
            </a>
          )}
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00BFFF] text-[#04090f] text-xs font-bold disabled:opacity-50 hover:brightness-110 transition-all"
          >
            {saving ? (
              <>
                <span className="w-3 h-3 border-2 border-[#04090f]/30 border-t-[#04090f] rounded-full animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Fields */}
      {simpleFields.length > 0 && (
        <div className="px-6 py-5 grid gap-4 sm:grid-cols-2">
          {simpleFields.map(([field, val]) => {
            const isUrl = field.endsWith("_url") || field.endsWith("_image") || field === "image" || field === "video";
            const fieldUid = `${block.key}::${field}`;
            const isUploading = uploadingField === fieldUid;

            return (
              <div key={field} className={isUrl ? "sm:col-span-2" : ""}>
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/30 mb-2 font-semibold">
                  {field.replace(/_/g, " ")}
                  {isUrl && (
                    <span className="normal-case tracking-normal text-white/20 font-normal">— image or video</span>
                  )}
                </label>
                {isUrl ? (
                  <div className="flex gap-2">
                    <input
                      value={String(val)}
                      onChange={(e) => {
                        if (!parsed) return;
                        onChange(JSON.stringify({ ...parsed, [field]: e.target.value }, null, 2));
                      }}
                      placeholder="https://… or upload a file →"
                      className="flex-1 bg-white/4 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white font-mono placeholder-white/20 focus:outline-none focus:border-[#00BFFF]/40 transition-colors"
                    />
                    <label className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${isUploading ? "border-[#00BFFF]/40 bg-[#00BFFF]/10 text-[#00BFFF]/50 cursor-wait" : "border-[#00BFFF]/30 bg-[#00BFFF]/8 text-[#00BFFF] hover:bg-[#00BFFF]/15"}`}>
                      {isUploading ? (
                        <span className="w-3.5 h-3.5 border-2 border-[#00BFFF]/30 border-t-[#00BFFF] rounded-full animate-spin" />
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      )}
                      {isUploading ? "Uploading…" : "Upload"}
                      <input
                        type="file"
                        accept="image/*,video/*"
                        disabled={!!uploadingField}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file || !parsed) return;
                          e.target.value = "";
                          onUpload(file, fieldUid, (url) => {
                            onChange(JSON.stringify({ ...parsed, [field]: url }, null, 2));
                          });
                        }}
                      />
                    </label>
                  </div>
                ) : field.includes("desc") || field.includes("body") || field.includes("subtitle") ? (
                  <textarea
                    value={String(val)}
                    onChange={(e) => {
                      if (!parsed) return;
                      onChange(JSON.stringify({ ...parsed, [field]: e.target.value }, null, 2));
                    }}
                    rows={3}
                    className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00BFFF]/40 transition-colors resize-none leading-relaxed"
                  />
                ) : (
                  <input
                    value={String(val)}
                    onChange={(e) => {
                      if (!parsed) return;
                      onChange(JSON.stringify({ ...parsed, [field]: e.target.value }, null, 2));
                    }}
                    className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00BFFF]/40 transition-colors"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Card Array Editor */}
      {cardArray && cardArray.length > 0 && (
        <div className="px-6 pb-5">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 mb-3 font-semibold">Service Cards</p>
          <CardArrayEditor
            cards={cardArray}
            onChange={(updated) => {
              if (!parsed) return;
              onChange(JSON.stringify({ ...parsed, cards: updated }, null, 2));
            }}
          />
        </div>
      )}

      {/* Advanced JSON toggle */}
      <div className="border-t border-white/5">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-6 py-3 text-[10px] uppercase tracking-[0.25em] text-white/25 hover:text-white/50 transition-colors"
        >
          <span>Advanced — Raw JSON Editor</span>
          <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        {open && (
          <div className="px-6 pb-5">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              rows={14}
              className="w-full bg-[#060c16] border border-white/10 rounded-xl px-4 py-4 font-mono text-xs text-green-300 leading-relaxed focus:outline-none focus:border-[#00BFFF]/30 transition-colors resize-y"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function CardArrayEditor({ cards, onChange }: { cards: CardItem[]; onChange: (updated: CardItem[]) => void }) {
  const update = (idx: number, field: keyof CardItem, val: string) => {
    onChange(cards.map((c, i) => i === idx ? { ...c, [field]: val } : c));
  };

  return (
    <div className="space-y-3">
      {cards.map((card, idx) => (
        <div key={idx} className="rounded-xl border border-white/8 bg-white/3 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00BFFF] mb-3">Card {card.num ?? String(idx + 1)}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5">Title</label>
              <input value={card.name ?? ""} onChange={(e) => update(idx, "name", e.target.value)}
                className="w-full bg-white/4 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00BFFF]/40" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5">Button Text</label>
              <input value={String(card.linkText ?? "")} onChange={(e) => update(idx, "linkText", e.target.value)}
                className="w-full bg-white/4 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00BFFF]/40" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5">Description</label>
              <textarea value={card.desc ?? ""} onChange={(e) => update(idx, "desc", e.target.value)}
                rows={2} className="w-full bg-white/4 border border-white/10 rounded-lg px-3 py-2 text-sm text-white resize-none leading-relaxed focus:outline-none focus:border-[#00BFFF]/40" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

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
