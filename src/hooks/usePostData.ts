import { useState } from "react";
import axios, { AxiosError } from "axios";
import apiClient from "../services/api-client";

interface UsePostDataResult<T> {
  data: T | null;
  error: string;
  isLoading: boolean;
  postData: (postData: unknown) => Promise<void>;
}

const usePostData = <T>(
  endpoint: string,
): UsePostDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const postData = async (postData: unknown): Promise<void> => {
    setLoading(true);
    try {
      const authToken = localStorage.getItem("accessToken");
      const headers: Record<string, string> = {};

      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const response = await apiClient.post<T>(endpoint, postData, {
        headers,
      });

      setData(response.data);
      setLoading(false);
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
