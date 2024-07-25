import axios from "axios";
import { hospitalId } from "../components/generic/DecodeToken";

interface UseApiClientUserParams {
  isAdmin: boolean;
  hospital?: string;
}

const useApiClientUser = ({ isAdmin, hospital }: UseApiClientUserParams) => {
  const hospital_id = isAdmin ? hospital || "" : hospitalId?.toString() || "";

  const apiClientUser = axios.create({
    baseURL: `http://127.0.0.1:8000/hospital/${hospital_id}/`,
  });

  apiClientUser.interceptors.request.use(
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

  return apiClientUser;
};

export default useApiClientUser;
