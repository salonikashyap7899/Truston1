import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

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
    return <div className="min-h-screen flex items-center justify-center text-foreground/60">Loading…</div>;
  }

  return (
    <main className="min-h-screen bg-cream">
      <header className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-bronze text-2xl font-serif italic">Trust</span>
            <span className="text-ink text-2xl font-serif">On</span>
            <span className="ml-3 text-[11px] uppercase tracking-luxe text-bronze">Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs uppercase tracking-luxe text-foreground/70 hover:text-bronze">View site</Link>
            <button
              onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/admin/login" }); }}
              className="text-xs uppercase tracking-luxe bronze-border rounded-full px-4 py-2 text-bronze hover:bg-bronze hover:text-cream transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
        <nav className="mx-auto max-w-7xl px-6 flex gap-1">
          {(["content", "media", "submissions"] as const).map((t) => (
            <button
              key={t} onClick={() => setTab(t)}
              className={`px-5 py-3 text-[11px] uppercase tracking-luxe border-b-2 transition-colors ${
                tab === t ? "border-bronze text-bronze" : "border-transparent text-foreground/60 hover:text-foreground"
              }`}
            >
              {t === "content" ? "Page Content" : t === "media" ? "Media Library" : "Submissions"}
            </button>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {tab === "content" && <ContentPanel />}
        {tab === "media" && <MediaPanel />}
        {tab === "submissions" && <SubmissionsPanel />}
      </div>
    </main>
  );
}

// ---------- Content ----------
type ContentRow = { id: string; key: string; label: string; data: Record<string, unknown>; updated_at: string };

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
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const current = rows.find((r) => r.key === selected);

  useEffect(() => {
    if (current) setDraft((current.data as Record<string, unknown>) ?? {});
  }, [selected]); // eslint-disable-line

  const save = async () => {
    if (!current) return;
    setBusy(true);
    const { error } = await supabase.from("site_content").update({ data: draft as never }).eq("id", current.id);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    load();
  };

  const fields = current ? Object.keys({ eyebrow: "", title: "", title_accent: "", subtitle: "", image_url: "", video_url: "", ...(current.data as object) }) : [];

  return (
    <div className="grid md:grid-cols-[260px_1fr] gap-8">
      <aside className="space-y-1">
        <p className="text-[10px] uppercase tracking-luxe text-foreground/50 mb-3 px-3">Content blocks</p>
        {rows.map((r) => (
          <button key={r.id} onClick={() => setSelected(r.key)}
            className={`w-full text-left px-3 py-2.5 rounded-sm text-sm transition-colors ${
              selected === r.key ? "bg-ink text-cream" : "hover:bg-white text-foreground/80"
            }`}>
            <div className="font-serif">{r.label}</div>
            <div className="text-[10px] opacity-60 uppercase tracking-wider">{r.key}</div>
          </button>
        ))}
      </aside>

      {current ? (
        <section className="bg-white card-shadow rounded-md p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[11px] uppercase tracking-luxe text-bronze">{current.key}</p>
              <h2 className="font-display text-2xl mt-1">{current.label}</h2>
            </div>
            <button onClick={save} disabled={busy}
              className="bg-ink text-cream px-5 py-2.5 rounded-full text-[11px] uppercase tracking-luxe hover:bg-bronze transition-colors disabled:opacity-60">
              {busy ? "Saving…" : "Save changes"}
            </button>
          </div>

          <div className="space-y-5">
            {fields.map((k) => (
              <Field key={k} name={k}
                value={(draft[k] as string) ?? ""}
                onChange={(v) => setDraft({ ...draft, [k]: v })}
              />
            ))}
            <AddField onAdd={(k) => setDraft({ ...draft, [k]: "" })} />
          </div>
        </section>
      ) : (
        <p className="text-foreground/60">Select a content block.</p>
      )}
    </div>
  );
}

function Field({ name, value, onChange }: { name: string; value: string; onChange: (v: string) => void }) {
  const isMedia = name.includes("image_url") || name.includes("video_url");
  const isLong = name === "subtitle" || name === "body" || (typeof value === "string" && value.length > 80);
  return (
    <div>
      <label className="text-[11px] uppercase tracking-luxe text-foreground/70 flex items-center gap-2">
        {name.replace(/_/g, " ")}
        {isMedia && <span className="text-bronze">(paste URL from Media Library)</span>}
      </label>
      {isLong ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3}
          className="mt-2 w-full border border-border rounded-sm px-4 py-3 bg-cream focus:outline-none focus:border-bronze" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full border border-border rounded-sm px-4 py-3 bg-cream focus:outline-none focus:border-bronze" />
      )}
      {isMedia && value && (
        value.match(/\.(mp4|webm|mov)$/i)
          ? <video src={value} className="mt-2 max-h-32 rounded-sm" muted />
          : <img src={value} alt="" className="mt-2 max-h-32 rounded-sm" />
      )}
    </div>
  );
}

function AddField({ onAdd }: { onAdd: (k: string) => void }) {
  const [name, setName] = useState("");
  return (
    <div className="flex items-end gap-3 pt-4 border-t border-border">
      <div className="flex-1">
        <label className="text-[10px] uppercase tracking-luxe text-foreground/50">Add custom field</label>
        <input value={name} onChange={(e) => setName(e.target.value.replace(/[^a-z0-9_]/gi, "_").toLowerCase())}
          placeholder="e.g. cta_label"
          className="mt-2 w-full border border-border rounded-sm px-4 py-2 bg-cream focus:outline-none focus:border-bronze text-sm" />
      </div>
      <button type="button" onClick={() => { if (name) { onAdd(name); setName(""); } }}
        className="bronze-border text-bronze px-4 py-2 rounded-full text-[11px] uppercase tracking-luxe">Add</button>
    </div>
  );
}

// ---------- Media ----------
type MediaRow = { id: string; name: string; type: string; url: string; storage_path: string; created_at: string };

function MediaPanel() {
  const [items, setItems] = useState<MediaRow[]>([]);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems((data ?? []) as MediaRow[]);
  };
  useEffect(() => { load(); }, []);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage.from("site-media").upload(path, file, { contentType: file.type });
        if (upErr) throw upErr;
        const { data: { publicUrl } } = supabase.storage.from("site-media").getPublicUrl(path);
        const { data: { user } } = await supabase.auth.getUser();
        const { error: insErr } = await supabase.from("media").insert({
          name: file.name, type: file.type.startsWith("video") ? "video" : "image",
          url: publicUrl, storage_path: path, size_bytes: file.size, uploaded_by: user?.id,
        });
        if (insErr) throw insErr;
      }
      toast.success("Uploaded");
      load();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const remove = async (m: MediaRow) => {
    if (!confirm(`Delete ${m.name}?`)) return;
    await supabase.storage.from("site-media").remove([m.storage_path]);
    const { error } = await supabase.from("media").delete().eq("id", m.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl">Media library</h2>
        <label className="bg-ink text-cream px-5 py-2.5 rounded-full text-[11px] uppercase tracking-luxe hover:bg-bronze transition-colors cursor-pointer">
          {uploading ? "Uploading…" : "Upload images / videos"}
          <input type="file" multiple accept="image/*,video/*" hidden onChange={(e) => upload(e.target.files)} disabled={uploading} />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((m) => (
          <div key={m.id} className="bg-white card-shadow rounded-md overflow-hidden">
            <div className="aspect-video bg-sand flex items-center justify-center overflow-hidden">
              {m.type === "video"
                ? <video src={m.url} className="w-full h-full object-cover" muted />
                : <img src={m.url} alt={m.name} className="w-full h-full object-cover" />}
            </div>
            <div className="p-3">
              <p className="text-xs truncate font-serif">{m.name}</p>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => { navigator.clipboard.writeText(m.url); toast.success("URL copied"); }}
                  className="flex-1 text-[10px] uppercase tracking-luxe text-bronze bronze-border rounded-full px-2 py-1">Copy URL</button>
                <button onClick={() => remove(m)}
                  className="text-[10px] uppercase tracking-luxe text-destructive border border-destructive/40 rounded-full px-2 py-1 hover:bg-destructive hover:text-cream">×</button>
              </div>
            </div>
          </div>
        ))}
        {!items.length && <p className="text-foreground/60 col-span-full">No media yet — upload your first image or video.</p>}
      </div>
    </div>
  );
}

// ---------- Submissions ----------
type Sub = { id: string; name: string; email: string | null; phone: string | null; message: string; source: string | null; created_at: string };

function SubmissionsPanel() {
  const [items, setItems] = useState<Sub[]>([]);
  const load = async () => {
    const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems((data ?? []) as Sub[]);
  };
  useEffect(() => { load(); }, []);

  const del = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div>
      <h2 className="font-display text-2xl mb-6">Contact submissions</h2>
      <div className="space-y-3">
        {items.map((s) => (
          <article key={s.id} className="bg-white card-shadow rounded-md p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-serif text-lg">{s.name}</p>
                <p className="text-xs text-foreground/60">
                  {[s.email, s.phone].filter(Boolean).join(" · ")} · {new Date(s.created_at).toLocaleString()}
                  {s.source ? ` · ${s.source}` : ""}
                </p>
              </div>
              <button onClick={() => del(s.id)} className="text-xs text-destructive hover:underline">Delete</button>
            </div>
            <p className="mt-3 text-foreground/80 whitespace-pre-wrap">{s.message}</p>
          </article>
        ))}
        {!items.length && <p className="text-foreground/60">No submissions yet.</p>}
      </div>
    </div>
  );
}
