import { useCallback, useEffect, useRef, useState } from "react";
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

const POLL_INTERVAL = 8000;

export function usePageContent(key: string, fallback: ContentBlock = {}): ContentBlock {
  const [data, setData] = useState<ContentBlock>(fallback);
  const cancelRef = useRef(false);
  const fallbackRef = useRef(fallback);
  fallbackRef.current = fallback;

  const fetchContent = useCallback(async () => {
    try {
      const { data: row, error } = await supabase
        .from("site_content")
        .select("data")
        .eq("key", key)
        .maybeSingle();

      if (cancelRef.current) return;

      if (error) {
        console.warn(`[usePageContent] Error fetching ${key}:`, error);
        return;
      }

      if (row?.data) {
        setData({ ...fallbackRef.current, ...(row.data as ContentBlock) });
      }
    } catch (e) {
      console.warn(`[usePageContent] Exception fetching ${key}:`, e);
    }
  }, [key]);

  useEffect(() => {
    cancelRef.current = false;

    fetchContent();

    const pollTimer = setInterval(() => {
      if (!cancelRef.current) fetchContent();
    }, POLL_INTERVAL);

    const subscription = supabase
      .channel(`site_content_${key}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "site_content",
          filter: `key=eq.${key}`,
        },
        (payload) => {
          if (cancelRef.current) return;
          if (payload.eventType === "DELETE") {
            setData(fallbackRef.current);
          } else {
            const newData = (payload.new as { data?: ContentBlock })?.data;
            if (newData) {
              setData({ ...fallbackRef.current, ...newData });
            } else {
              fetchContent();
            }
          }
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          fetchContent();
        }
      });

    return () => {
      cancelRef.current = true;
      clearInterval(pollTimer);
      subscription.unsubscribe();
    };
  }, [key, fetchContent]);

  return data;
}
