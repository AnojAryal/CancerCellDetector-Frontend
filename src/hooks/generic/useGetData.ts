import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/api-client";

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useGetData = <T>(
  endpoint: string,
  queryKey: string,
  query: string = ""
) => {
  const fetchData = async (): Promise<T | FetchResponse<T>> => {
    const authToken = localStorage.getItem("accessToken");
    const headers: Record<string, string> = authToken
      ? { Authorization: `Bearer ${authToken}` }
      : {};

    const response = await apiClient.get<T | FetchResponse<T>>(
      `${endpoint}?search=${query}`,
      {
        headers,
      }
    );

    return response.data;
  };

  return useQuery([queryKey, endpoint, query], fetchData, {
    staleTime: 60000,
    retry: 2,
  });
};

export default useGetData;
