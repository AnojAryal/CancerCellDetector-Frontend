import { useMemo } from "react";
import axios, { AxiosInstance } from "axios";
import { hospitalId } from "../components/generic/DecodeToken";

interface UseApiClientUserParams {
  isAdmin: boolean;
  hospital?: string | number;
}

const useApiClientUser = ({ isAdmin, hospital }: UseApiClientUserParams): AxiosInstance => {
  const hospital_id = useMemo(() => {
    return isAdmin
      ? (typeof hospital === "string" || typeof hospital === "number")
        ? hospital.toString()
        : ""
      : hospitalId
      ? hospitalId.toString()
      : "";
  }, [isAdmin, hospital]);

 
  const apiClientUser = useMemo(() => {
    const client = axios.create({
      baseURL: `http://127.0.0.1:8000/hospital/${hospital_id}/`,
    });

    client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return client;
  }, [hospital_id]); 

  return apiClientUser;
};

export default useApiClientUser;
