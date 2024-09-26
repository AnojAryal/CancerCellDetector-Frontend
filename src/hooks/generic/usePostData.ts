import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiClient from "../../services/api-client";

interface UsePostDataResult<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  mutate: (postData: unknown, options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: AxiosError) => void;
  }) => void;
}

const usePostData = <T>(endpoint: string): UsePostDataResult<T> => {
  const { mutate, data, error, isLoading } = useMutation<T, AxiosError, unknown>(
    async (postData) => {
      const authToken = localStorage.getItem("accessToken");
      const headers: Record<string, string> = {};

      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const response = await apiClient.post<T>(endpoint, postData, {
        headers,
      });

      return response.data;
    }
  );

  return {
    data: data || null,
    error: error?.message || null,
    isLoading,
    mutate,
  };
};

export default usePostData;
