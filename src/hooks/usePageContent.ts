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

// Admin-driven content should update reliably.
// Uses real-time subscriptions to ensure changes appear immediately.
export function usePageContent(key: string, fallback: ContentBlock = {}) {
  const [data, setData] = useState<ContentBlock>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel = false;

    const fetchContent = async () => {
      try {
        const { data: row, error } = await supabase
          .from("site_content")
          .select("data")
          .eq("key", key)
          .maybeSingle();

        if (cancel) return;

        if (error) {
          console.warn(`[usePageContent] Error fetching ${key}:`, error);
          setLoading(false);
          return;
        }

        if (row) {
          const merged = { ...fallback, ...(row.data as ContentBlock) };
          setData(merged);
        }
      } catch (e) {
        console.warn(`[usePageContent] Exception fetching ${key}:`, e);
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    // Initial fetch
    fetchContent();

    // Subscribe to real-time changes for this specific content block
    const subscription = supabase
      .channel(`site_content:${key}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "site_content",
          filter: `key=eq.${key}`,
        },
        (payload) => {
          if (!cancel) {
            if (payload.eventType === "DELETE") {
              setData(fallback);
            } else {
              const newData = payload.new?.data ?? payload.old?.data;
              if (newData) {
                const merged = { ...fallback, ...(newData as ContentBlock) };
                setData(merged);
              }
            }
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
