import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string, query: string = "") => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string>("");
  // const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // setLoading(true);

    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("accessToken");
        const headers: Record<string, string> = authToken
          ? { Authorization: `Bearer ${authToken}` }
          : {};

        const response = await apiClient.get<FetchResponse<T>>(
          `${endpoint}?search=${query}`,
          {
            headers,
          }
        );

        setData(response.data.results);
        // setLoading(false);
      } catch (err) {
        if (err instanceof Error && err.message) {
          setError(err.message);
        } else {
          setError("An error occurred");
        }
        // setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, query]);

  return { data, error};
};

export default useData;
