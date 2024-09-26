import { useQueryClient } from "@tanstack/react-query";
import usePostData from "../generic/usePostData";

interface Hospital {
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface CreateHospitalResult {
  isLoading: boolean;
  error: string | null;
  createHospital: (hospitalData: Hospital) => void;
}

const useCreateHospital = (): CreateHospitalResult => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = usePostData<void>("/hospital");

  const createHospital = (hospitalData: Hospital) => {
    mutate(hospitalData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["hospitals"]);
      },
      onError: (err: unknown) => {
        console.error("Error creating hospital:", err);
      },
    });
  };

  return {
    isLoading,
    error,
    createHospital,
  };
};

export default useCreateHospital;
