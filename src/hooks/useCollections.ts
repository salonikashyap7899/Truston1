import { useEffect, useState } from "react";

interface UseCollectionOptions {
  order?: string;
}

interface UseCollectionResult<T> {
  data: T[] | null;
  loading: boolean;
  error: Error | null;
}

export function useCollection<T>(
  collectionName: string,
  options?: UseCollectionOptions
): UseCollectionResult<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true);
        // This is a placeholder implementation
        // Replace with your actual data fetching logic (Supabase, API, etc.)
        const response = await fetch(`/api/collections/${collectionName}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${collectionName}`);
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionName, options?.order]);

  return { data, loading, error };
}
