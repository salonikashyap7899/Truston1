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
  const [showUploader, setShowUploader] = useState(false);
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
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#04090f]/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">

          {/* Logo + title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00BFFF]/15 border border-[#00BFFF]/30 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-[#00BFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div className="leading-none">
              <p className="text-white font-bold text-sm">TrustOn Admin</p>
              <p className="text-[#00BFFF] text-[10px] uppercase tracking-[0.25em] font-semibold mt-0.5">Content Manager</p>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <span className="hidden lg:block text-white/30 text-xs mr-2 truncate max-w-[180px]">{user?.email}</span>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-white/50 text-xs font-medium hover:border-white/25 hover:text-white transition-all"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              Live Site
            </a>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/15 border border-red-500/35 text-red-300 text-xs font-bold hover:bg-red-500/25 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Sections", value: String(blocks.length) },
            { label: "Showing", value: String(filteredBlocks.length) },
            { label: "Active Filter", value: PAGE_TABS.find(t => t.prefix === activeTab)?.label ?? "All Pages", blue: true },
            { label: "Status", value: uploadingField ? "Uploading…" : savingKey ? "Saving…" : "Ready" },
          ].map(({ label, value, blue }) => (
            <div key={label} className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
              <p className="text-white/35 text-[10px] uppercase tracking-[0.2em] font-semibold mb-1">{label}</p>
              <p className={`text-base font-bold truncate ${blue ? "text-[#00BFFF]" : "text-white"}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* ── Controls Row ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search sections…"
              className="w-full bg-white/[0.04] border border-white/[0.09] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#00BFFF]/40 transition-colors"
            />
          </div>
          {/* Action buttons */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setShowUploader((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${showUploader ? "border-purple-400/50 bg-purple-500/15 text-purple-300" : "border-purple-500/30 bg-purple-500/8 text-purple-400 hover:bg-purple-500/15"}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              <span className="hidden sm:inline">Upload Media</span>
            </button>
            <button
              onClick={() => handleSeed(false)}
              disabled={seeding}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00BFFF] text-[#04090f] text-sm font-bold disabled:opacity-50 hover:brightness-110 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              <span className="hidden sm:inline">{seeding ? "Working…" : "Initialize"}</span>
              <span className="sm:hidden">{seeding ? "…" : "Init"}</span>
            </button>
            <button
              onClick={() => { if (confirm("This will RESET ALL content to factory defaults, overwriting your edits. Continue?")) handleSeed(true); }}
              disabled={seeding}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/40 bg-red-500/8 text-red-400 text-sm font-semibold disabled:opacity-50 hover:bg-red-500/15 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* ── Media Upload Panel (collapsible) ── */}
        {showUploader && <MediaUploadPanel onToast={addToast} />}

        {/* ── Page Tabs ── */}
        <div className="flex flex-wrap gap-2">
          {PAGE_TABS.map((tab) => {
            const count = tab.prefix
              ? blocks.filter((b) => b.key.startsWith(tab.prefix)).length
              : blocks.length;
            if (count === 0) return null;
            const active = activeTab === tab.prefix;
            return (
              <button
                key={tab.prefix}
                onClick={() => setActiveTab(tab.prefix)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  active
                    ? "bg-[#00BFFF] text-[#04090f]"
                    : "bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${active ? "bg-[#04090f]/20 text-[#04090f]" : "bg-white/[0.07] text-white/40"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Empty states ── */}
        {blocks.length === 0 && (
          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-12 text-center">
            <div className="w-12 h-12 rounded-2xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <p className="text-amber-200 font-semibold text-lg mb-2">No content sections yet</p>
            <p className="text-amber-200/50 text-sm mb-5">Click "Initialize" in the toolbar above to create editable blocks for every page.</p>
            <button
              onClick={() => handleSeed(false)}
              disabled={seeding}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-sm font-semibold disabled:opacity-50 hover:bg-amber-500/30 transition-all"
            >
              {seeding ? "Working…" : "Initialize All Sections Now"}
            </button>
          </div>
        )}

        {filteredBlocks.length === 0 && blocks.length > 0 && (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-10 text-center">
            <p className="text-white/40 text-sm mb-3">No sections match your current filter.</p>
            <button
              onClick={() => { setFilter(""); setActiveTab(""); }}
              className="text-[#00BFFF] text-xs font-semibold hover:underline"
            >
              Clear all filters
            </button>
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

      </main>

      {/* ── Toast Stack ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-2xl backdrop-blur text-sm font-medium animate-in slide-in-from-bottom-2 fade-in duration-300 ${
              t.type === "success" ? "border-green-500/30 bg-green-950/95 text-green-200"
              : t.type === "error" ? "border-red-500/30 bg-red-950/95 text-red-200"
              : "border-[#00BFFF]/30 bg-[#04090f]/95 text-[#00BFFF]"
            }`}
          >
            <span className="shrink-0 mt-0.5 font-bold">
              {t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"}
            </span>
            <span className="leading-relaxed">{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Media Upload Panel ──────────────────────────────────────────────────────
function MediaUploadPanel({ onToast }: { onToast: (type: Toast["type"], msg: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [lastUrl, setLastUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const BUCKET = "site-media";

  const handleFile = async (file: File) => {
    if (!file) return;
    setUploading(true);
    setLastUrl("");
    setCopied(false);
    try {
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
      const storagePath = `${timestamp}-${safeName}`;
      const { supabase: supabaseBrowser } = await import("@/integrations/supabase/client");
      const { error } = await supabaseBrowser.storage
        .from(BUCKET)
        .upload(storagePath, file, { upsert: true, contentType: file.type || "application/octet-stream" });
      if (error) throw new Error(error.message);
      const { data: urlData } = supabaseBrowser.storage.from(BUCKET).getPublicUrl(storagePath);
      setLastUrl(urlData.publicUrl);
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
    <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-purple-500/15">
        <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/25 flex items-center justify-center shrink-0">
          <svg className="w-3.5 h-3.5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div>
          <p className="text-purple-200 text-sm font-semibold">Upload Image or Video</p>
          <p className="text-purple-300/50 text-xs">Direct upload to storage — supports any file size (MP4, WebM, JPG, PNG, WebP)</p>
        </div>
      </div>

      <div className="px-5 py-4 flex flex-col sm:flex-row gap-4 items-start">
        <label className={`shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 cursor-pointer font-semibold text-sm transition-all ${uploading ? "border-white/10 bg-white/5 text-white/30 cursor-wait" : "border-purple-400/40 bg-purple-500/10 text-purple-200 hover:bg-purple-500/20"}`}>
          {uploading ? (
            <span className="w-4 h-4 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
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

        {uploading && (
          <div className="flex items-center gap-3 py-2.5">
            <div className="w-32 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-purple-400 rounded-full animate-pulse" style={{ width: "60%" }} />
            </div>
            <span className="text-white/35 text-xs">Uploading…</span>
          </div>
        )}

        {lastUrl && !uploading && (
          <div className="flex-1 rounded-xl border border-green-500/20 bg-green-500/5 p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-green-300 text-xs font-semibold">✓ Uploaded — copy URL and paste into the field you want to update</p>
              <button
                onClick={copyUrl}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${copied ? "bg-green-500/25 text-green-200" : "bg-white/8 text-white/50 hover:bg-white/15 hover:text-white"}`}
              >
                {copied ? "Copied ✓" : "Copy URL"}
              </button>
            </div>
            <p className="text-white/40 text-xs font-mono break-all leading-relaxed">{lastUrl}</p>
            {isVideo
              ? <video src={lastUrl} controls className="w-full max-h-36 rounded-lg bg-black" />
              : <img src={lastUrl} alt="preview" className="h-20 rounded-lg object-cover border border-white/10" />
            }
          </div>
        )}
      </div>
    </div>
  );
}

// ── Block Card ──────────────────────────────────────────────────────────────
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
    <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${justSaved ? "border-green-500/30 bg-green-950/10" : "border-white/[0.07] bg-white/[0.02]"}`}>

      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="shrink-0 px-2.5 py-1 rounded-md bg-[#00BFFF]/10 border border-[#00BFFF]/20 text-[#00BFFF] text-[10px] font-bold uppercase tracking-[0.15em]">
            {page}
          </span>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm leading-tight truncate">{block.label}</p>
            <p className="text-[10px] text-white/25 font-mono truncate mt-0.5">{block.key}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {justSaved && (
            <span className="text-green-400 text-xs font-bold animate-in fade-in">✓ Saved</span>
          )}
          {preview && (
            <a
              href={preview}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.09] text-white/35 text-xs hover:text-white hover:border-white/25 transition-all"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              Preview
            </a>
          )}
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#00BFFF] text-[#04090f] text-xs font-bold disabled:opacity-50 hover:brightness-110 transition-all"
          >
            {saving ? (
              <>
                <span className="w-3 h-3 border-2 border-[#04090f]/30 border-t-[#04090f] rounded-full animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Save
              </>
            )}
          </button>
        </div>
      </div>

      {/* Fields */}
      {simpleFields.length > 0 && (
        <div className="px-5 py-4 grid gap-4 sm:grid-cols-2">
          {simpleFields.map(([field, val]) => {
            const isUrl = field.endsWith("_url") || field.endsWith("_image") || field === "image" || field === "video";
            const fieldUid = `${block.key}::${field}`;
            const isUploading = uploadingField === fieldUid;

            return (
              <div key={field} className={isUrl ? "sm:col-span-2" : ""}>
                <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2 font-bold">
                  {field.replace(/_/g, " ")}
                  {isUrl && <span className="normal-case tracking-normal text-white/20 font-normal text-[10px]">— url or upload</span>}
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
                      className="flex-1 min-w-0 bg-white/[0.04] border border-white/[0.09] rounded-lg px-3.5 py-2.5 text-xs text-white font-mono placeholder-white/20 focus:outline-none focus:border-[#00BFFF]/40 transition-colors"
                    />
                    <label className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${isUploading ? "border-[#00BFFF]/30 bg-[#00BFFF]/8 text-[#00BFFF]/40 cursor-wait" : "border-[#00BFFF]/25 bg-[#00BFFF]/5 text-[#00BFFF] hover:bg-[#00BFFF]/12"}`}>
                      {isUploading ? (
                        <span className="w-3.5 h-3.5 border-2 border-[#00BFFF]/30 border-t-[#00BFFF] rounded-full animate-spin" />
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      )}
                      {isUploading ? "…" : "Upload"}
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
                    className="w-full bg-white/[0.04] border border-white/[0.09] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00BFFF]/40 transition-colors resize-none leading-relaxed"
                  />
                ) : (
                  <input
                    value={String(val)}
                    onChange={(e) => {
                      if (!parsed) return;
                      onChange(JSON.stringify({ ...parsed, [field]: e.target.value }, null, 2));
                    }}
                    className="w-full bg-white/[0.04] border border-white/[0.09] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00BFFF]/40 transition-colors"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Card Array Editor */}
      {cardArray && cardArray.length > 0 && (
        <div className="px-5 pb-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3 font-bold">Service Cards</p>
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
      <div className="border-t border-white/[0.05]">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-white/45 transition-colors"
        >
          <span>Advanced — Raw JSON</span>
          <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </button>
        {open && (
          <div className="px-5 pb-4">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              rows={12}
              className="w-full bg-[#060c16] border border-white/[0.09] rounded-xl px-4 py-3.5 font-mono text-xs text-green-300 leading-relaxed focus:outline-none focus:border-[#00BFFF]/30 transition-colors resize-y"
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
        <div key={idx} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00BFFF] mb-3">Card {card.num ?? String(idx + 1)}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5 font-bold">Title</label>
              <input value={card.name ?? ""} onChange={(e) => update(idx, "name", e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.09] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00BFFF]/40 transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5 font-bold">Button Text</label>
              <input value={String(card.linkText ?? "")} onChange={(e) => update(idx, "linkText", e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.09] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00BFFF]/40 transition-colors" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1.5 font-bold">Description</label>
              <textarea value={card.desc ?? ""} onChange={(e) => update(idx, "desc", e.target.value)}
                rows={2} className="w-full bg-white/[0.04] border border-white/[0.09] rounded-lg px-3 py-2 text-sm text-white resize-none leading-relaxed focus:outline-none focus:border-[#00BFFF]/40 transition-colors" />
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
