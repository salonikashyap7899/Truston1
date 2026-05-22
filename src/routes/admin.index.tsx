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

type Tab = "content" | "media" | "submissions";

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("content");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate({ to: "/admin/login" });
  }, [user, isAdmin, loading, navigate]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground/60">
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

  return (
    <main className="min-h-screen bg-ink text-white selection:bg-luxe-cyan selection:text-ink">
      {/* Cinematic Background */}
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

        <nav className="mx-auto max-w-7xl px-6 flex gap-2">
          {(["content", "media", "submissions"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-8 py-5 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 ${
                tab === t ? "text-luxe-cyan" : "text-white/30 hover:text-white"
              }`}
            >
              {t === "content"
                ? "Global Architecture"
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
          ))}
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
            {tab === "media" && <MediaPanel />}
            {tab === "submissions" && <SubmissionsPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

// ---------- Content ----------
type ContentRow = {
  id: string;
  key: string;
  label: string;
  data: Record<string, unknown>;
  updated_at: string;
};

function ContentPanel() {
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, unknown>>({});
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data, error } = await supabase.from("site_content").select("*").order("label");
    if (error) toast.error(error.message);
    setRows((data ?? []) as ContentRow[]);
    if (!selected && data && data.length) {
      setSelected(data[0].key);
      setDraft((data[0].data as Record<string, unknown>) ?? {});
    }
  };
  useEffect(() => {
    load();
  }, []);

  const current = rows.find((r) => r.key === selected);

  useEffect(() => {
    if (current) setDraft((current.data as Record<string, unknown>) ?? {});
  }, [selected]); // eslint-disable-line

  const save = async () => {
    if (!current) return;
    setBusy(true);
    const { error } = await supabase
      .from("site_content")
      .update({ data: draft as never })
      .eq("id", current.id);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Empire architecture updated");
    load();
  };

  const fields = current
    ? Object.keys({
        eyebrow: "",
        title: "",
        subtitle: "",
        image_url: "",
        video_url: "",
        ...(current.data as object),
      })
    : [];

  return (
    <div className="grid lg:grid-cols-[350px_1fr] gap-16">
      <aside className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.5em] text-luxe-cyan/40 mb-10 px-6 font-bold">
          System Modules
        </p>
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

      {current ? (
        <section className="glass-premium rounded-[40px] p-12 border border-white/5">
          <div className="flex items-center justify-between mb-12 pb-12 border-b border-white/5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-luxe-cyan mb-3 font-bold">
                {current.key}
              </p>
              <h2 className="font-display text-5xl text-white tracking-tight">{current.label}</h2>
            </div>
            <button
              onClick={save}
              disabled={busy}
              className="bg-luxe-cyan text-ink px-12 py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:scale-105 active:scale-95 transition-all duration-500 disabled:opacity-50"
            >
              {busy ? "Syncing..." : "Update Asset"}
            </button>
          </div>

          <div className="grid gap-10">
            {fields.map((k) => (
              <Field
                key={k}
                name={k}
                value={(draft[k] as string) ?? ""}
                onChange={(v) => setDraft({ ...draft, [k]: v })}
              />
            ))}
            <div className="pt-12 mt-12 border-t border-white/5">
              <AddField onAdd={(k) => setDraft({ ...draft, [k]: "" })} />
            </div>
          </div>
        </section>
      ) : (
        <div className="flex items-center justify-center h-[500px] border border-dashed border-white/10 rounded-[40px]">
          <p className="text-white/20 uppercase tracking-[0.4em] text-[12px] font-bold">
            Select a module to architect
          </p>
        </div>
      )}
    </div>
  );
}

function Field({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const isMedia = name.includes("image_url") || name.includes("video_url");
  const isLong =
    name === "subtitle" || name === "body" || (typeof value === "string" && value.length > 80);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 flex items-center gap-3 font-bold">
        {name.replace(/_/g, " ")}
        {isMedia && <span className="text-luxe-cyan opacity-80">(Media Asset)</span>}
      </label>

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
        <div className="mt-6 rounded-[32px] overflow-hidden border border-white/5 bg-black/40 p-3 shadow-luxe">
          {value.match(/\.(mp4|webm|mov)$/i) ? (
            <video src={value} className="max-h-64 w-auto rounded-2xl" muted controls />
          ) : (
            <img src={value} alt="" className="max-h-64 w-auto rounded-2xl" />
          )}
        </div>
      )}
    </motion.div>
  );
}

function AddField({ onAdd }: { onAdd: (k: string) => void }) {
  const [name, setName] = useState("");
  return (
    <div className="flex items-end gap-6">
      <div className="flex-1">
        <label className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-4 block font-bold">
          New Schema Property
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value.replace(/[^a-z0-9_]/gi, "_").toLowerCase())}
          placeholder="e.g. section_glow_intensity"
          className="w-full bg-white/[0.03] border border-white/5 rounded-full px-8 py-4 text-white focus:outline-none focus:border-luxe-cyan/30 transition-colors text-sm font-light"
        />
      </div>
      <button
        type="button"
        onClick={() => {
          if (name) {
            onAdd(name);
            setName("");
          }
        }}
        className="px-10 py-4 bg-white/5 hover:bg-luxe-cyan hover:text-ink text-luxe-cyan border border-luxe-cyan/20 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-500"
      >
        Append
      </button>
    </div>
  );
}

// ---------- Media ----------
type MediaRow = {
  id: string;
  name: string;
  type: string;
  url: string;
  storage_path: string;
  created_at: string;
};

function MediaPanel() {
  const [items, setItems] = useState<MediaRow[]>([]);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems((data ?? []) as MediaRow[]);
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
        const { error: upErr } = await supabase.storage
          .from("site-media")
          .upload(path, file, { contentType: file.type });
        if (upErr) throw upErr;
        const {
          data: { publicUrl },
        } = supabase.storage.from("site-media").getPublicUrl(path);
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const { error: insErr } = await supabase.from("media").insert({
          name: file.name,
          type: file.type.startsWith("video") ? "video" : "image",
          url: publicUrl,
          storage_path: path,
          size_bytes: file.size,
          uploaded_by: user?.id,
        });
        if (insErr) throw insErr;
      }
      toast.success("Cinematic assets integrated");
      load();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const remove = async (m: MediaRow) => {
    if (!confirm("Are you sure you want to remove this cinematic asset?")) return;
    const { error: stErr } = await supabase.storage.from("site-media").remove([m.storage_path]);
    if (stErr) return toast.error(stErr.message);
    const { error: dbErr } = await supabase.from("media").delete().eq("id", m.id);
    if (dbErr) return toast.error(dbErr.message);
    toast.success("Asset removed from library");
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
                    toast.success("Path copied to clipboard");
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

// ---------- Submissions ----------
type Sub = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  source: string | null;
  created_at: string;
};

function SubmissionsPanel() {
  const [items, setItems] = useState<Sub[]>([]);
  const load = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems((data ?? []) as Sub[]);
  };
  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Archive this investor lead?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) return toast.error(error.message);
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
                  {s.source && (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/10 mt-1.5" />
                      <span className="text-luxe-cyan/60">{s.source}</span>
                    </>
                  )}
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
        {!items.length && (
          <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/5 rounded-[40px]">
            <p className="text-white/20 uppercase tracking-[0.5em] text-sm font-bold">
              Awaiting Investor Engagement
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
