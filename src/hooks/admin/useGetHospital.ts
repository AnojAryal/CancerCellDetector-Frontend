import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/api-client";

export interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const useGetHospitals = () => {
  const fetchHospitals = async () => {
    const token = getAccessToken();

    const response = await apiClient.get<Hospital[]>("/hospital", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const {
    data: hospitals,
    isLoading,
    error,
  } = useQuery<Hospital[], Error>(
    ["hospitals"],
    fetchHospitals,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      retry: 2,
    }
  );

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return "An unknown error occurred";
  };

  return {
    hospitals,
    loading: isLoading,
    error: error ? getErrorMessage(error) : null,
  };
};

export default useGetHospitals;
