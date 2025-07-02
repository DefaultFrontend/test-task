import { useState, useEffect } from "react";

interface UseGetNonceResult {
  data: string | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGetNonce = (): UseGetNonceResult => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNonce = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockNonce = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      setData(mockNonce);
    } catch {
      setError("Ошибка при получении nonce");
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchNonce();
  };

  useEffect(() => {
    fetchNonce();
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
