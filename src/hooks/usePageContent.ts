import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ContentBlock = {
  eyebrow?: string;
  title?: string;
  title_accent?: string;
  subtitle?: string;
  image_url?: string;
  video_url?: string;
  [k: string]: unknown;
};

const cache = new Map<string, ContentBlock>();

export function usePageContent(key: string, fallback: ContentBlock = {}) {
  const [data, setData] = useState<ContentBlock>(cache.get(key) ?? fallback);

  useEffect(() => {
    let cancel = false;
    supabase
      .from("site_content")
      .select("data")
      .eq("key", key)
      .maybeSingle()
      .then(({ data: row }) => {
        if (cancel || !row) return;
        const merged = { ...fallback, ...(row.data as ContentBlock) };
        cache.set(key, merged);
        setData(merged);
      });
    return () => { cancel = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return data;
}
