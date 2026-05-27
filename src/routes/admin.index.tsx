import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getSiteContentBlocks, saveSiteContentBlock, uploadMedia } from "@/lib/content.functions";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin · Truston" },
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

type SaveStatus = { type: "success" | "error" | "info"; message: string } | null;

function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const fetchBlocks = useServerFn(getSiteContentBlocks);
  const saveBlockFn = useServerFn(saveSiteContentBlock);
  const uploadFn = useServerFn(uploadMedia);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [editJson, setEditJson] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SaveStatus>(null);
  const [filter, setFilter] = useState("");
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [lastSavedKey, setLastSavedKey] = useState<string | null>(null);
  const [lastUploadUrl, setLastUploadUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate({ to: "/admin/login" });
    }
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    fetchBlocks()
      .then((data) => {
        setBlocks(data);
        setEditJson(
          Object.fromEntries(
            data.map((block) => [block.key, JSON.stringify(block.data ?? {}, null, 2)]),
          ),
        );
      })
      .catch((error) => {
        setStatus({ type: "error", message: `Failed to load content: ${error instanceof Error ? error.message : String(error)}` });
      });
  }, [fetchBlocks]);

  const filteredBlocks = useMemo(
    () =>
      blocks.filter((block) => {
        if (!filter.trim()) return true;
        const search = filter.toLowerCase();
        return (
          block.key.toLowerCase().includes(search) ||
          block.label.toLowerCase().includes(search) ||
          JSON.stringify(block.data).toLowerCase().includes(search)
        );
      }),
    [blocks, filter],
  );

  const handleSave = async (block: ContentBlock) => {
    const raw = editJson[block.key] ?? JSON.stringify(block.data ?? {}, null, 2);
    let parsed: unknown;

    try {
      parsed = JSON.parse(raw);
    } catch {
      setStatus({ type: "error", message: "Invalid JSON — please fix the formatting before saving." });
      return;
    }

    setSavingKey(block.key);
    setStatus(null);

    try {
      const saved = await saveBlockFn({
        key: block.key,
        label: block.label,
        data: parsed,
      });

      setBlocks((prev) => prev.map((item) => (item.key === saved.key ? saved : item)));
      setEditJson((prev) => ({ ...prev, [saved.key]: JSON.stringify(saved.data ?? {}, null, 2) }));
      setLastSavedKey(saved.key);
      setStatus({ type: "success", message: `✓ "${saved.label}" saved — the website will reflect this change within seconds.` });
      setTimeout(() => setStatus(null), 6000);
    } catch (error) {
      setStatus({ type: "error", message: `Save failed: ${error instanceof Error ? error.message : String(error)}` });
    } finally {
      setSavingKey(null);
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setLastUploadUrl("");
    setStatus({ type: "info", message: "Uploading file…" });

    try {
      const base64 = await fileToBase64(file);
      const { url } = await uploadFn({
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        base64,
      });

      setLastUploadUrl(url);
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setStatus({ type: "success", message: "✓ Upload done! URL copied to clipboard — paste it into the image_url or video_url field below." });
      } else {
        setStatus({ type: "success", message: "✓ Upload done! Copy the URL shown below and paste it into the image_url or video_url field." });
      }
    } catch (error) {
      setStatus({ type: "error", message: `Upload failed: ${error instanceof Error ? error.message : String(error)}` });
    } finally {
      setUploading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Admin Panel</p>
            <h1 className="text-3xl font-display">Site Content Editor</h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary"
            >
              View live site ↗
            </a>
            <button onClick={signOut} className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* How-to banner */}
        <div className="rounded-3xl border border-blue-500/30 bg-blue-500/10 p-5 text-sm text-blue-200 leading-relaxed">
          <p className="font-semibold text-blue-100 mb-1">How to update your website</p>
          <ol className="list-decimal ml-4 space-y-1 text-blue-200/80">
            <li>Find the section you want to edit (e.g. <strong>Home — Hero</strong> to change the main heading).</li>
            <li>Edit the text fields in the JSON editor — change <code className="bg-white/10 px-1 rounded">title</code>, <code className="bg-white/10 px-1 rounded">subtitle</code>, or paste a new URL into <code className="bg-white/10 px-1 rounded">image_url</code> / <code className="bg-white/10 px-1 rounded">video_url</code>.</li>
            <li>To upload a new image or video, use the <strong>Upload media</strong> panel — the URL will be copied automatically.</li>
            <li>Click <strong>Save block</strong> — the website updates within seconds.</li>
          </ol>
        </div>

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold">Search content blocks</h2>
              <p className="text-sm text-muted-foreground">Filter by section name or keyword.</p>
              <input
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                placeholder="e.g. hero, about, contact…"
                className="mt-4 w-full rounded-2xl border border-border bg-input px-4 py-3 text-foreground"
              />
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold">Upload image or video</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Upload a file — the URL will be copied to your clipboard. Paste it into any <code className="bg-muted px-1 rounded text-xs">image_url</code> or <code className="bg-muted px-1 rounded text-xs">video_url</code> field, then save.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className={`cursor-pointer rounded-2xl border border-border px-4 py-3 text-sm text-foreground transition ${uploading ? "opacity-50 cursor-wait" : "bg-secondary hover:bg-muted"}`}>
                  {uploading ? "Uploading…" : "Choose file to upload"}
                  <input
                    type="file"
                    accept="image/*,video/*"
                    disabled={uploading}
                    onChange={(event) => event.target.files?.[0] && handleUpload(event.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
              {lastUploadUrl && (
                <div className="mt-3 rounded-2xl border border-green-500/30 bg-green-500/10 p-3">
                  <p className="text-xs text-green-300 font-semibold mb-1">Uploaded URL (paste this into image_url or video_url):</p>
                  <p className="break-all text-xs text-green-200 font-mono">{lastUploadUrl}</p>
                  <button
                    onClick={() => navigator.clipboard?.writeText(lastUploadUrl)}
                    className="mt-2 text-xs text-green-300 hover:underline"
                  >
                    Copy URL
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold">Quick reference</h2>
            <p className="text-sm text-muted-foreground mt-1">Common field names used across content blocks.</p>
            <div className="mt-4 space-y-3 text-sm">
              {[
                { field: "title", desc: "Main heading text" },
                { field: "title_accent", desc: "Highlighted/coloured part of heading" },
                { field: "subtitle", desc: "Sub-heading or tagline" },
                { field: "eyebrow", desc: "Small label above the heading" },
                { field: "image_url", desc: "Background or feature image URL" },
                { field: "video_url", desc: "Background video URL (.mp4)" },
                { field: "body", desc: "Paragraph / description text" },
              ].map(({ field, desc }) => (
                <div key={field} className="flex gap-3 items-start">
                  <code className="shrink-0 rounded-lg bg-muted px-2 py-0.5 text-xs text-foreground">{field}</code>
                  <span className="text-muted-foreground text-xs leading-relaxed">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {status && (
          <div className={`rounded-3xl border p-4 text-sm ${
            status.type === "success"
              ? "border-green-500/30 bg-green-500/10 text-green-200"
              : status.type === "error"
              ? "border-red-500/30 bg-red-500/10 text-red-200"
              : "border-blue-500/30 bg-blue-500/10 text-blue-200"
          }`}>
            {status.message}
          </div>
        )}

        <section className="space-y-6">
          {filteredBlocks.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
              No matching content blocks found.
            </div>
          ) : (
            filteredBlocks.map((block) => (
              <BlockCard
                key={block.key}
                block={block}
                value={editJson[block.key] ?? JSON.stringify(block.data ?? {}, null, 2)}
                onChange={(value) => setEditJson((prev) => ({ ...prev, [block.key]: value }))}
                onSave={() => handleSave(block)}
                saving={savingKey === block.key}
                justSaved={lastSavedKey === block.key}
              />
            ))
          )}
        </section>
      </main>
    </div>
  );
}

function BlockCard({
  block,
  value,
  onChange,
  onSave,
  saving,
  justSaved,
}: {
  block: ContentBlock;
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  saving: boolean;
  justSaved: boolean;
}) {
  let parsed: Record<string, unknown> | null = null;
  try {
    parsed = JSON.parse(value);
  } catch {
    parsed = null;
  }

  const simpleFields = parsed
    ? Object.entries(parsed).filter(([, v]) => typeof v === "string" || typeof v === "number")
    : [];

  return (
    <div className={`rounded-3xl border bg-card p-6 transition-all duration-500 ${justSaved ? "border-green-500/50" : "border-border"}`}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{block.key}</p>
          <h3 className="text-xl font-semibold">{block.label}</h3>
        </div>
        <div className="flex gap-2 items-center">
          {justSaved && (
            <span className="text-xs text-green-400 font-semibold">Saved!</span>
          )}
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save block"}
          </button>
        </div>
      </div>

      {simpleFields.length > 0 && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {simpleFields.map(([field, val]) => (
            <div key={field}>
              <label className="block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-1">{field}</label>
              {field.includes("url") ? (
                <div className="flex gap-2">
                  <input
                    value={String(val)}
                    onChange={(e) => {
                      if (!parsed) return;
                      const updated = { ...parsed, [field]: e.target.value };
                      onChange(JSON.stringify(updated, null, 2));
                    }}
                    placeholder="https://…"
                    className="flex-1 min-w-0 rounded-xl border border-border bg-input px-3 py-2 text-sm text-foreground font-mono"
                  />
                </div>
              ) : (
                <input
                  value={String(val)}
                  onChange={(e) => {
                    if (!parsed) return;
                    const updated = { ...parsed, [field]: e.target.value };
                    onChange(JSON.stringify(updated, null, 2));
                  }}
                  className="w-full rounded-xl border border-border bg-input px-3 py-2 text-sm text-foreground"
                />
              )}
            </div>
          ))}
        </div>
      )}

      <details className="mt-5">
        <summary className="cursor-pointer text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors">
          Advanced — edit raw JSON
        </summary>
        <div className="mt-3 space-y-3">
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
            <div className="rounded-2xl border border-border bg-background p-4 text-xs text-foreground/70">
              <strong>Updated:</strong> {new Date(block.updated_at).toLocaleString()}
            </div>
          </div>
          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            rows={12}
            className="w-full rounded-3xl border border-border bg-input px-4 py-4 font-mono text-sm leading-relaxed text-foreground"
          />
        </div>
      </details>
    </div>
  );
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Unable to read file"));
        return;
      }
      const commaIndex = result.indexOf(",");
      resolve(commaIndex >= 0 ? result.slice(commaIndex + 1) : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
