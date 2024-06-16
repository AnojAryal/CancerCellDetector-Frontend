import { useState } from "react";
import axios, { AxiosError, AxiosInstance } from "axios";

interface UsePostDataResult<T> {
  data: T | null;
  error: string;
  isLoading: boolean;
  postData: (postData: unknown, authToken?: string) => Promise<() => void>;
}

const usePostData = <T>(
  endpoint: string,
  apiClientInstance?: AxiosInstance
): UsePostDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const postData = async (
    postData: unknown,
    authToken?: string
  ): Promise<() => void> => {
    setLoading(true);
    try {
      const client = apiClientInstance || axios;
      const headers: Record<string, string> = {};

      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const response = await client.post<T>(endpoint, postData, {
        headers,
      });

      setData(response.data);
      setLoading(false);
      return () => {};
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        setError(axiosError.message);
      } else {
        setError("An error occurred.");
      }
      setLoading(false);
      throw error;
    }
  };

  return { data, error, isLoading, postData };
};

export default usePostData;
