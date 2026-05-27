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

    // Initial fetch
    const fetchData = async () => {
      try {
        const { data: row } = await supabase
          .from("site_content")
          .select("data")
          .eq("key", key)
          .maybeSingle();

        if (cancel || !row) return;
        const merged = { ...fallback, ...(row.data as ContentBlock) };
        cache.set(key, merged);
        setData(merged);
      } catch (error) {
        console.error("[v0] Failed to fetch content:", error);
      }
    };

    fetchData();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel(`content:${key}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "site_content",
          filter: `key=eq.${key}`,
        },
        (payload) => {
          if (cancel) return;
          const newData = payload.new as { data: ContentBlock } | null;
          if (newData?.data) {
            const merged = { ...fallback, ...newData.data };
            cache.set(key, merged);
            setData(merged);
            console.log("[v0] Content updated for key:", key);
          }
        }
      )
      .subscribe();

    return () => {
      cancel = true;
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return data;
}
