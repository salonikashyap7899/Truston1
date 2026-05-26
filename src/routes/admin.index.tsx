import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin — TrustOn" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Tab = "content" | "heroes" | "collections" | "global" | "media" | "submissions";

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("content");

  useEffect(() => {
    if (!loading) {
      if (!user || !isAdmin) {
        navigate({ to: "/admin/login" });
      }
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink text-white/60">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-luxe-cyan font-serif text-2xl italic"
        >
          TrustOn Secure Access...
        </motion.div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <main className="min-h-screen bg-ink text-white selection:bg-luxe-cyan selection:text-ink">
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-luxe-blue rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-luxe-cyan rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <header className="relative z-10 glass-premium border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="text-white text-2xl font-display group-hover:scale-110 transition-transform duration-500">
              TrustOn
            </span>
            <div className="h-4 w-px bg-white/20 mx-2" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-luxe-cyan font-bold">
              Empire Control
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-[10px] uppercase tracking-widest text-white/50 hover:text-luxe-cyan transition-colors font-bold"
            >
              Live Site
            </Link>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/admin/login" });
              }}
              className="text-[10px] uppercase tracking-widest bg-white/5 hover:bg-luxe-cyan hover:text-ink border border-white/10 px-6 py-2.5 rounded-full transition-all duration-500 font-bold"
            >
              Sign out
            </button>
          </div>
        </div>

        <nav className="mx-auto max-w-7xl px-6 flex gap-2 overflow-x-auto no-scrollbar">
          {(["content", "heroes", "collections", "global", "media", "submissions"] as const).map(
            (t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-6 py-5 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 whitespace-nowrap ${
                  tab === t ? "text-luxe-cyan" : "text-white/30 hover:text-white"
                }`}
              >
                {t === "content"
                  ? "Page Blocks"
                  : t === "heroes"
                    ? "Hero Sections"
                    : t === "collections"
                      ? "Collections"
                      : t === "global"
                        ? "SEO & UI"
                        : t === "media"
                          ? "Cinematic Assets"
                          : "Investor Portfolio"}
                {tab === t && (
                  <motion.div
                    layoutId="admin-tab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-luxe-cyan"
                  />
                )}
              </button>
            ),
          )}
        </nav>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === "content" && <ContentPanel />}
            {tab === "heroes" && <HeroPanel />}
            {tab === "collections" && <CollectionsPanel />}
            {tab === "global" && <GlobalPanel />}
            {tab === "media" && <MediaPanel />}
            {tab === "submissions" && <SubmissionsPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

// ---------- Shared Components ----------

function SectionHeader({
  title,
  label,
  onSave,
  busy,
}: {
  title: string;
  label: string;
  onSave: () => void;
  busy: boolean;
}) {
  return (
    <div className="flex items-center justify-between mb-12 pb-12 border-b border-white/5">
      <div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-luxe-cyan mb-3 font-bold">
          {label}
        </p>
        <h2 className="font-display text-5xl text-white tracking-tight">{title}</h2>
      </div>
      <button
        onClick={onSave}
        disabled={busy}
        className="bg-luxe-cyan text-ink px-12 py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:scale-105 active:scale-95 transition-all duration-500 disabled:opacity-50 shadow-luxe"
      >
        {busy ? "Syncing..." : "Update Asset"}
      </button>
    </div>
  );
}

function Field({
  name,
  value,
  onChange,
  type = "text",
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "textarea" | "media";
}) {
  const [uploading, setUploading] = useState(false);

  const isMedia =
    type === "media" ||
    name.includes("image") ||
    name.includes("video") ||
    name.includes("url") ||
    name === "src";
  const isLong =
    type === "textarea" ||
    name === "subtitle" ||
    name === "description" ||
    name === "body" ||
    (typeof value === "string" && value.length > 80);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      const { error: uploadError } = await supabase.storage.from("site-media").upload(path, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("site-media").getPublicUrl(path);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      await supabase.from("media").insert({
        name: file.name,
        type: file.type.startsWith("video") ? "video" : "image",
        url: publicUrl,
        storage_path: path,
        size_bytes: file.size,
        uploaded_by: user?.id,
      });

      onChange(publicUrl);
      toast.success("Media uploaded and linked");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 flex items-center gap-3 font-bold">
          {name.replace(/_/g, " ")}
          {isMedia && <span className="text-luxe-cyan opacity-80">(Media Asset)</span>}
        </label>
        {isMedia && (
          <label className="text-[9px] uppercase tracking-widest text-luxe-cyan cursor-pointer hover:underline font-bold">
            {uploading ? "Uploading..." : "Upload New"}
            <input type="file" hidden onChange={handleUpload} disabled={uploading} />
          </label>
        )}
      </div>

      {isLong ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          className="w-full bg-white/[0.03] border border-white/10 rounded-[24px] px-8 py-6 text-white focus:outline-none focus:border-luxe-cyan/50 transition-colors font-light text-lg"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/[0.03] border border-white/10 rounded-full px-8 py-4 text-white focus:outline-none focus:border-luxe-cyan/50 transition-colors font-light text-lg"
        />
      )}

      {isMedia && value && (
        <div className="mt-6 rounded-[32px] overflow-hidden border border-white/5 bg-black/40 p-3 shadow-luxe max-w-md">
          {value.match(/\.(mp4|webm|mov)$/i) || value.includes("VID") ? (
            <video src={value} className="w-full rounded-2xl" muted controls />
          ) : (
            <img src={value} alt="" className="w-full rounded-2xl" />
          )}
        </div>
      )}
    </motion.div>
  );
}

// ---------- Panels ----------

type ContentRow = {
  id: string;
  key: string;
  label: string;
  data: Record<string, unknown>;
};

function ContentPanel() {
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, unknown>>({});
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("site_content").select("*").order("label");
    const formattedData = (data ?? []) as ContentRow[];
    setRows(formattedData);
    if (!selected && formattedData.length) setSelected(formattedData[0].key);
  };
  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const current = rows.find((r) => r.key === selected);
  useEffect(() => {
    if (current) setDraft((current.data as Record<string, unknown>) || {});
  }, [selected, current]);

  const save = async () => {
    if (!current) return;
    setBusy(true);
    const { error } = await supabase
      .from("site_content")
      .update({ data: draft as any })
      .eq("id", current.id);
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Empire architecture updated");
      load();
    }
  };

  return (
    <div className="grid lg:grid-cols-[350px_1fr] gap-16">
      <aside className="space-y-3">
        {rows.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelected(r.key)}
            className={`w-full text-left px-8 py-6 rounded-3xl text-sm transition-all duration-500 border ${
              selected === r.key
                ? "bg-luxe-cyan text-ink border-luxe-cyan shadow-luxe"
                : "bg-white/5 text-white/50 border-white/5 hover:bg-white/10"
            }`}
          >
            <div className="font-display text-xl">{r.label}</div>
            <div
              className={`text-[9px] uppercase tracking-widest mt-2 font-bold ${selected === r.key ? "text-ink/60" : "text-white/20"}`}
            >
              {r.key}
            </div>
          </button>
        ))}
      </aside>
      {current && (
        <section className="glass-premium rounded-[40px] p-12 border border-white/5">
          <SectionHeader title={current.label} label={current.key} onSave={save} busy={busy} />
          <div className="grid gap-10">
            {Object.keys(draft).map((k) => (
              <Field
                key={k}
                name={k}
                value={(draft[k] as string) ?? ""}
                onChange={(v) => setDraft({ ...draft, [k]: v })}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

type HeroRow = {
  id: string;
  page_key: string;
  [key: string]: any;
};

function HeroPanel() {
  const [heroes, setHeroes] = useState<HeroRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, any>>({});
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("hero_sections").select("*").order("page_key");
    const formattedData = (data ?? []) as HeroRow[];
    setHeroes(formattedData);
    if (!selectedId && formattedData.length) setSelectedId(formattedData[0].id);
  };
  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const current = heroes.find((h) => h.id === selectedId);
  useEffect(() => {
    if (current) {
      const { id, created_at, updated_at, ...rest } = current;
      setDraft(rest);
    }
  }, [selectedId, current]);

  const save = async () => {
    if (!selectedId) return;
    setBusy(true);
    const { error } = await supabase.from("hero_sections").update(draft).eq("id", selectedId);
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Hero section updated");
      load();
    }
  };

  return (
    <div className="grid lg:grid-cols-[350px_1fr] gap-16">
      <aside className="space-y-3">
        {heroes.map((h) => (
          <button
            key={h.id}
            onClick={() => setSelectedId(h.id)}
            className={`w-full text-left px-8 py-6 rounded-3xl transition-all duration-500 border ${
              selectedId === h.id
                ? "bg-luxe-cyan text-ink border-luxe-cyan shadow-luxe"
                : "bg-white/5 text-white/50 border-white/5 hover:bg-white/10"
            }`}
          >
            <div className="font-display text-xl">{h.page_key}</div>
          </button>
        ))}
      </aside>
      {current && (
        <section className="glass-premium rounded-[40px] p-12 border border-white/5">
          <SectionHeader title={current.page_key} label="Hero Section" onSave={save} busy={busy} />
          <div className="grid gap-10">
            {Object.keys(draft).map((k) => (
              <Field
                key={k}
                name={k}
                value={(draft[k] as string) ?? ""}
                onChange={(v) => setDraft({ ...draft, [k]: v })}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function CollectionsPanel() {
  const collections = ["gallery", "testimonials", "services", "projects", "plots", "articles"];
  const [active, setActive] = useState(collections[0]);
  const [items, setItems] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, any>>({});
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from(active)
      .select("*")
      .order("created_at", { ascending: false });
    setItems(data ?? []);
  };
  useEffect(() => {
    load();
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const item = items.find((i) => i.id === selectedId);
    if (item) {
      const { id, created_at, ...rest } = item;
      setDraft(rest);
    } else {
      setDraft({});
    }
  }, [selectedId, items]);

  const save = async () => {
    setBusy(true);
    let error;
    if (selectedId) {
      const { error: err } = await supabase.from(active).update(draft).eq("id", selectedId);
      error = err;
    } else {
      const { error: err } = await supabase.from(active).insert(draft);
      error = err;
    }
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success(`${active} item saved`);
      setSelectedId(null);
      load();
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from(active).delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Item removed");
      load();
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex gap-4 p-2 bg-white/5 rounded-full w-fit">
        {collections.map((c) => (
          <button
            key={c}
            onClick={() => {
              setActive(c);
              setSelectedId(null);
            }}
            className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${
              active === c ? "bg-luxe-cyan text-ink" : "text-white/40 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-6">
          <button
            onClick={() => {
              setSelectedId(null);
              setDraft({});
            }}
            className="w-full py-4 border border-dashed border-white/20 rounded-3xl text-[10px] uppercase tracking-widest font-bold text-white/40 hover:border-luxe-cyan hover:text-luxe-cyan transition-all"
          >
            + Add New {active}
          </button>
          <div className="grid gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-6 rounded-3xl border transition-all ${
                  selectedId === item.id
                    ? "bg-luxe-cyan/10 border-luxe-cyan"
                    : "bg-white/5 border-white/5 hover:bg-white/10"
                }`}
              >
                <div onClick={() => setSelectedId(item.id)} className="flex-1 cursor-pointer">
                  <p className="font-display text-xl text-white">
                    {item.name || item.title || item.alt || item.id.slice(0, 8)}
                  </p>
                  <p className="text-[9px] uppercase tracking-widest text-white/30 mt-1">
                    {item.id}
                  </p>
                </div>
                <button
                  onClick={() => remove(item.id)}
                  className="text-white/20 hover:text-destructive transition-colors px-4"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {(selectedId || Object.keys(draft).length > 0) && (
          <div className="glass-premium rounded-[40px] p-12 border border-white/5 h-fit sticky top-8">
            <SectionHeader
              title={selectedId ? "Edit Item" : "New Item"}
              label={active}
              onSave={save}
              busy={busy}
            />
            <div className="grid gap-8">
              {active === "gallery" && (
                <>
                  <Field
                    name="src"
                    value={(draft.src as string) || ""}
                    onChange={(v) => setDraft({ ...draft, src: v })}
                  />
                  <Field
                    name="alt"
                    value={(draft.alt as string) || ""}
                    onChange={(v) => setDraft({ ...draft, alt: v })}
                  />
                  <Field
                    name="category"
                    value={(draft.category as string) || ""}
                    onChange={(v) => setDraft({ ...draft, category: v })}
                  />
                  <Field
                    name="order_index"
                    value={(draft.order_index as string) || "0"}
                    onChange={(v) => setDraft({ ...draft, order_index: parseInt(v) || 0 })}
                  />
                </>
              )}
              {active === "projects" && (
                <>
                  <Field
                    name="title"
                    value={(draft.title as string) || ""}
                    onChange={(v) => setDraft({ ...draft, title: v })}
                  />
                  <Field
                    name="slug"
                    value={(draft.slug as string) || ""}
                    onChange={(v) => setDraft({ ...draft, slug: v })}
                  />
                  <Field
                    name="category"
                    value={(draft.category as string) || ""}
                    onChange={(v) => setDraft({ ...draft, category: v })}
                  />
                  <Field
                    name="image_url"
                    value={(draft.image_url as string) || ""}
                    onChange={(v) => setDraft({ ...draft, image_url: v })}
                  />
                  <Field
                    name="description"
                    value={(draft.description as string) || ""}
                    onChange={(v) => setDraft({ ...draft, description: v })}
                    type="textarea"
                  />

                  <div className="pt-8 border-t border-white/5 mt-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-luxe-cyan mb-8 font-bold">Project Details (JSON Content)</p>
                    <div className="grid gap-6">
                      <Field
                        name="Detail Title"
                        value={draft.content_json?.detail_title || ""}
                        onChange={(v) => setDraft({ ...draft, content_json: { ...draft.content_json, detail_title: v } })}
                      />
                      <Field
                        name="Detail Accent"
                        value={draft.content_json?.detail_title_accent || ""}
                        onChange={(v) => setDraft({ ...draft, content_json: { ...draft.content_json, detail_title_accent: v } })}
                      />
                      <Field
                        name="Body Text"
                        value={draft.content_json?.body || ""}
                        onChange={(v) => setDraft({ ...draft, content_json: { ...draft.content_json, body: v } })}
                        type="textarea"
                      />
                      <Field
                        name="Engagement Status"
                        value={draft.content_json?.engagement || ""}
                        onChange={(v) => setDraft({ ...draft, content_json: { ...draft.content_json, engagement: v } })}
                      />
                      <Field
                        name="Release Date"
                        value={draft.content_json?.release || ""}
                        onChange={(v) => setDraft({ ...draft, content_json: { ...draft.content_json, release: v } })}
                      />
                      <Field
                        name="Amenities (Comma Separated)"
                        value={Array.isArray(draft.content_json?.amenities) ? draft.content_json.amenities.join(", ") : ""}
                        onChange={(v) => setDraft({ ...draft, content_json: { ...draft.content_json, amenities: v.split(",").map(s => s.trim()).filter(Boolean) } })}
                      />
                      <Field
                        name="Highlights (Comma Separated)"
                        value={Array.isArray(draft.content_json?.highlights) ? draft.content_json.highlights.join(", ") : ""}
                        onChange={(v) => setDraft({ ...draft, content_json: { ...draft.content_json, highlights: v.split(",").map(s => s.trim()).filter(Boolean) } })}
                      />
                    </div>
                  </div>

                  <Field
                    name="order_index"
                    value={(draft.order_index as string) || "0"}
                    onChange={(v) => setDraft({ ...draft, order_index: parseInt(v) || 0 })}
                  />
                </>
              )}
              {active === "plots" && (
                <>
                  <Field
                    name="name"
                    value={(draft.name as string) || ""}
                    onChange={(v) => setDraft({ ...draft, name: v })}
                  />
                  <Field
                    name="location"
                    value={(draft.location as string) || ""}
                    onChange={(v) => setDraft({ ...draft, location: v })}
                  />
                  <Field
                    name="tag"
                    value={(draft.tag as string) || ""}
                    onChange={(v) => setDraft({ ...draft, tag: v })}
                  />
                  <Field
                    name="tag_color"
                    value={(draft.tag_color as string) || ""}
                    onChange={(v) => setDraft({ ...draft, tag_color: v })}
                  />
                  <Field
                    name="price"
                    value={(draft.price as string) || ""}
                    onChange={(v) => setDraft({ ...draft, price: v })}
                  />
                  <Field
                    name="subtitle"
                    value={(draft.subtitle as string) || ""}
                    onChange={(v) => setDraft({ ...draft, subtitle: v })}
                  />
                  <Field
                    name="area"
                    value={(draft.area as string) || ""}
                    onChange={(v) => setDraft({ ...draft, area: v })}
                  />
                  <Field
                    name="dimensions"
                    value={(draft.dimensions as string) || ""}
                    onChange={(v) => setDraft({ ...draft, dimensions: v })}
                  />
                  <Field
                    name="facing"
                    value={(draft.facing as string) || ""}
                    onChange={(v) => setDraft({ ...draft, facing: v })}
                  />
                  <Field
                    name="road"
                    value={(draft.road as string) || ""}
                    onChange={(v) => setDraft({ ...draft, road: v })}
                  />
                  <Field
                    name="type"
                    value={(draft.type as string) || ""}
                    onChange={(v) => setDraft({ ...draft, type: v })}
                  />
                  <div className="flex gap-8 py-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!draft.is_featured}
                        onChange={(e) => setDraft({ ...draft, is_featured: e.target.checked })}
                      />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">
                        Featured
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!draft.is_sold}
                        onChange={(e) => setDraft({ ...draft, is_sold: e.target.checked })}
                      />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">
                        Sold Out
                      </span>
                    </label>
                  </div>
                </>
              )}
              {active === "articles" && (
                <>
                  <Field
                    name="title"
                    value={(draft.title as string) || ""}
                    onChange={(v) => setDraft({ ...draft, title: v })}
                  />
                  <Field
                    name="category"
                    value={(draft.category as string) || ""}
                    onChange={(v) => setDraft({ ...draft, category: v })}
                  />
                  <Field
                    name="excerpt"
                    value={(draft.excerpt as string) || ""}
                    onChange={(v) => setDraft({ ...draft, excerpt: v })}
                    type="textarea"
                  />
                  <Field
                    name="image_url"
                    value={(draft.image_url as string) || ""}
                    onChange={(v) => setDraft({ ...draft, image_url: v })}
                  />
                  <Field
                    name="author"
                    value={(draft.author as string) || ""}
                    onChange={(v) => setDraft({ ...draft, author: v })}
                  />
                  <Field
                    name="read_time"
                    value={(draft.read_time as string) || ""}
                    onChange={(v) => setDraft({ ...draft, read_time: v })}
                  />
                  <Field
                    name="order_index"
                    value={(draft.order_index as string) || "0"}
                    onChange={(v) => setDraft({ ...draft, order_index: parseInt(v) || 0 })}
                  />
                </>
              )}
              {active === "testimonials" && (
                <>
                  <Field
                    name="name"
                    value={(draft.name as string) || ""}
                    onChange={(v) => setDraft({ ...draft, name: v })}
                  />
                  <Field
                    name="designation"
                    value={(draft.designation as string) || ""}
                    onChange={(v) => setDraft({ ...draft, designation: v })}
                  />
                  <Field
                    name="description"
                    value={(draft.description as string) || ""}
                    onChange={(v) => setDraft({ ...draft, description: v })}
                    type="textarea"
                  />
                  <Field
                    name="profile_image"
                    value={(draft.profile_image as string) || ""}
                    onChange={(v) => setDraft({ ...draft, profile_image: v })}
                  />
                  <Field
                    name="order_index"
                    value={(draft.order_index as string) || "0"}
                    onChange={(v) => setDraft({ ...draft, order_index: parseInt(v) || 0 })}
                  />
                </>
              )}
              {active === "services" && (
                <>
                  <Field
                    name="name"
                    value={(draft.name as string) || ""}
                    onChange={(v) => setDraft({ ...draft, name: v })}
                  />
                  <Field
                    name="description"
                    value={(draft.description as string) || ""}
                    onChange={(v) => setDraft({ ...draft, description: v })}
                    type="textarea"
                  />
                  <Field
                    name="image_url"
                    value={(draft.image_url as string) || ""}
                    onChange={(v) => setDraft({ ...draft, image_url: v })}
                  />
                  <Field
                    name="link_text"
                    value={(draft.link_text as string) || ""}
                    onChange={(v) => setDraft({ ...draft, link_text: v })}
                  />
                  <Field
                    name="link_url"
                    value={(draft.link_url as string) || ""}
                    onChange={(v) => setDraft({ ...draft, link_url: v })}
                  />
                  <Field
                    name="order_index"
                    value={(draft.order_index as string) || "0"}
                    onChange={(v) => setDraft({ ...draft, order_index: parseInt(v) || 0 })}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GlobalPanel() {
  const [seo, setSeo] = useState<any[]>([]);
  const [nav, setNav] = useState<any[]>([]);
  const [footer, setFooter] = useState<any[]>([]);
  const [selectedSeo, setSelectedSeo] = useState<string | null>(null);
  const [selectedNav, setSelectedNav] = useState<string | null>(null);
  const [selectedFooter, setSelectedFooter] = useState<string | null>(null);
  const [seoDraft, setSeoDraft] = useState<any>({});
  const [navDraft, setNavDraft] = useState<any>({});
  const [footerDraft, setFooterDraft] = useState<any>({});
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data: seoData } = await supabase.from("seo_configs").select("*");
    const { data: navData } = await supabase.from("navbar_links").select("*").order("order_index");
    const { data: footerData } = await supabase.from("footer_configs").select("*");
    setSeo(seoData ?? []);
    setNav(navData ?? []);
    setFooter(footerData ?? []);
  };
  useEffect(() => {
    load();
  }, []);

  const saveSeo = async () => {
    setBusy(true);
    let error;
    if (selectedSeo) {
      const { error: err } = await supabase.from("seo_configs").update(seoDraft).eq("id", selectedSeo);
      error = err;
    } else {
      const { error: err } = await supabase.from("seo_configs").insert(seoDraft);
      error = err;
    }
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success("SEO updated");
      load();
    }
  };

  const saveNav = async () => {
    setBusy(true);
    let error;
    if (selectedNav) {
      const { error: err } = await supabase
        .from("navbar_links")
        .update(navDraft)
        .eq("id", selectedNav);
      error = err;
    } else {
      const { error: err } = await supabase.from("navbar_links").insert(navDraft);
      error = err;
    }
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Nav updated");
      load();
    }
  };

  const saveFooter = async () => {
    setBusy(true);
    let error;
    if (selectedFooter) {
      const { error: err } = await supabase
        .from("footer_configs")
        .update({ data: footerDraft })
        .eq("id", selectedFooter);
      error = err;
    } else {
      const { error: err } = await supabase
        .from("footer_configs")
        .insert({ section_key: "new_section", data: footerDraft });
      error = err;
    }
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Footer updated");
      load();
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-16">
      <div className="space-y-12">
        <section className="glass-premium rounded-[40px] p-12 border border-white/5">
          <h3 className="font-display text-3xl mb-8">SEO Engine</h3>
          <select
            onChange={(e) => {
              const item = seo.find((s) => s.id === e.target.value);
              setSelectedSeo(e.target.value);
              setSeoDraft(item || {});
            }}
            className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 mb-8"
          >
            <option value="">Select Page Path</option>
            {seo.map((s) => (
              <option key={s.id} value={s.id}>
                {s.page_path}
              </option>
            ))}
          </select>
          {selectedSeo && (
            <div className="grid gap-6">
              <Field
                name="title"
                value={seoDraft.title || ""}
                onChange={(v) => setSeoDraft({ ...seoDraft, title: v })}
              />
              <Field
                name="description"
                value={seoDraft.description || ""}
                onChange={(v) => setSeoDraft({ ...seoDraft, description: v })}
                type="textarea"
              />
              <button
                onClick={saveSeo}
                disabled={busy}
                className="bg-luxe-cyan text-ink py-4 rounded-full font-bold uppercase tracking-widest text-[10px]"
              >
                Update SEO
              </button>
            </div>
          )}
        </section>

        <section className="glass-premium rounded-[40px] p-12 border border-white/5">
          <h3 className="font-display text-3xl mb-8">Navigation Links</h3>
          <div className="space-y-4 mb-8">
            {nav.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  setSelectedNav(n.id);
                  setNavDraft(n);
                }}
                className="p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 flex justify-between items-center"
              >
                <span>
                  {n.label} ({n.to})
                </span>
                <span className="text-[10px] opacity-30">Order: {n.order_index}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-6 p-6 border border-white/5 rounded-2xl bg-white/2">
            <Field
              name="label"
              value={navDraft.label || ""}
              onChange={(v) => setNavDraft({ ...navDraft, label: v })}
            />
            <Field
              name="to"
              value={navDraft.to || ""}
              onChange={(v) => setNavDraft({ ...navDraft, to: v })}
            />
            <Field
              name="order_index"
              value={navDraft.order_index || 0}
              onChange={(v) => setNavDraft({ ...navDraft, order_index: parseInt(v) || 0 })}
            />
            <button
              onClick={saveNav}
              disabled={busy}
              className="bg-luxe-cyan text-ink py-4 rounded-full font-bold uppercase tracking-widest text-[10px]"
            >
              {selectedNav ? "Update Link" : "Add Link"}
            </button>
          </div>
        </section>
      </div>

      <div className="space-y-12">
        <section className="glass-premium rounded-[40px] p-12 border border-white/5 h-fit">
          <h3 className="font-display text-3xl mb-8">Footer Configuration</h3>
          <select
            onChange={(e) => {
              const item = footer.find((f) => f.id === e.target.value);
              setSelectedFooter(e.target.value);
              setFooterDraft(item?.data || {});
            }}
            className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 mb-8"
          >
            <option value="">Select Footer Section</option>
            {footer.map((f) => (
              <option key={f.id} value={f.id}>
                {f.section_key}
              </option>
            ))}
          </select>
          {selectedFooter && (
            <div className="grid gap-6">
              <Field
                name="phone"
                value={footerDraft.phone || ""}
                onChange={(v) => setFooterDraft({ ...footerDraft, phone: v })}
              />
              <Field
                name="email"
                value={footerDraft.email || ""}
                onChange={(v) => setFooterDraft({ ...footerDraft, email: v })}
              />
              <Field
                name="address"
                value={footerDraft.address || ""}
                onChange={(v) => setFooterDraft({ ...footerDraft, address: v })}
                type="textarea"
              />
              <button
                onClick={saveFooter}
                disabled={busy}
                className="bg-luxe-cyan text-ink py-4 rounded-full font-bold uppercase tracking-widest text-[10px]"
              >
                Update Footer
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

// ---------- Existing Media & Submissions ----------

function MediaPanel() {
  const [items, setItems] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });
    setItems(data ?? []);
  };
  useEffect(() => {
    load();
  }, []);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        await supabase.storage.from("site-media").upload(path, file);
        const {
          data: { publicUrl },
        } = supabase.storage.from("site-media").getPublicUrl(path);
        const {
          data: { user },
        } = await supabase.auth.getUser();
        await supabase.from("media").insert({
          name: file.name,
          type: file.type.startsWith("video") ? "video" : "image",
          url: publicUrl,
          storage_path: path,
          size_bytes: file.size,
          uploaded_by: user?.id,
        });
      }
      toast.success("Assets integrated");
      load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setUploading(false);
    }
  };

  const remove = async (m: any) => {
    if (!confirm("Remove this asset?")) return;
    await supabase.storage.from("site-media").remove([m.storage_path]);
    await supabase.from("media").delete().eq("id", m.id);
    toast.success("Asset removed");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-16">
        <h2 className="font-display text-5xl text-white tracking-tight">Cinematic Vault</h2>
        <label className="bg-luxe-cyan text-ink px-10 py-4 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:scale-105 transition-all duration-500 cursor-pointer shadow-luxe">
          {uploading ? "Ingesting..." : "Upload New Assets"}
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            hidden
            onChange={(e) => upload(e.target.files)}
            disabled={uploading}
          />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {items.map((m) => (
          <motion.div
            key={m.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group glass-premium rounded-[32px] overflow-hidden border border-white/5"
          >
            <div className="aspect-[16/10] bg-white/5 flex items-center justify-center overflow-hidden">
              {m.type === "video" ? (
                <video src={m.url} className="w-full h-full object-cover brightness-75" muted />
              ) : (
                <img
                  src={m.url}
                  alt={m.name}
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-[3s] brightness-75"
                />
              )}
            </div>
            <div className="p-8">
              <p className="text-[11px] truncate font-bold text-white/40 mb-6 uppercase tracking-widest">
                {m.name}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(m.url);
                    toast.success("Path copied");
                  }}
                  className="flex-1 text-[10px] uppercase tracking-widest text-luxe-cyan bg-white/5 hover:bg-luxe-cyan hover:text-ink border border-luxe-cyan/20 rounded-full py-3 transition-all font-bold"
                >
                  Copy Path
                </button>
                <button
                  onClick={() => remove(m)}
                  className="px-5 text-[10px] uppercase tracking-widest text-white/20 hover:text-destructive transition-colors font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SubmissionsPanel() {
  const [items, setItems] = useState<any[]>([]);
  const load = async () => {
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setItems(data ?? []);
  };
  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Archive lead?")) return;
    await supabase.from("contact_submissions").delete().eq("id", id);
    toast.success("Lead archived");
    load();
  };

  return (
    <div>
      <h2 className="font-display text-5xl text-white mb-16 tracking-tight">
        Exclusive Investor Intel
      </h2>
      <div className="grid gap-8">
        {items.map((s) => (
          <motion.article
            key={s.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-premium rounded-[40px] p-12 border border-white/5 hover:border-luxe-cyan/30 transition-all duration-500 shadow-luxe"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-3xl text-white mb-4 tracking-tight">{s.name}</p>
                <div className="flex flex-wrap gap-6 text-[11px] uppercase tracking-[0.2em] text-white/30 font-bold">
                  <span className="text-luxe-cyan">{s.email}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10 mt-1.5" />
                  <span className="text-luxe-cyan">{s.phone}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10 mt-1.5" />
                  <span>{new Date(s.created_at).toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={() => remove(s.id)}
                className="text-[10px] uppercase tracking-widest text-white/20 hover:text-destructive transition-colors font-bold"
              >
                Archive Lead
              </button>
            </div>
            <p className="mt-10 text-white/60 text-lg font-light leading-relaxed max-w-5xl border-t border-white/5 pt-10">
              {s.message}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
