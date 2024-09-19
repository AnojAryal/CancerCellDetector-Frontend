import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import apiClient from "../../services/api-client";

interface Patient {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  hospital_id: string;
}

interface AddressData {
  id?: string;
  street: string;
  city: string;
  hospital_id: string;
  patient_id: string;
}

const createPatient = async (patientData: Patient): Promise<string> => {
  const { hospital_id } = patientData;

  if (!hospital_id) {
    throw new Error("Hospital ID is required");
  }

  const url = `/hospital/${hospital_id}/patients`;
  const authToken = localStorage.getItem("accessToken");
  const headers: Record<string, string> = {};

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await apiClient.post(url, patientData, { headers });
  return response.data.id;
};

const createAddress = async (addressData: AddressData): Promise<void> => {
  const { hospital_id, patient_id } = addressData;

  if (!hospital_id || !patient_id) {
    throw new Error("Hospital ID and Patient ID are required");
  }

  const url = `/hospital/${hospital_id}/patients/${patient_id}/address`;
  const authToken = localStorage.getItem("accessToken");
  const headers: Record<string, string> = {};

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  await apiClient.post(url, addressData, { headers });
};

interface CustomError {
  message?: string;
}

const useCreatePatient = () => {
  const queryClient = useQueryClient();

  const createPatientMutation = useMutation<
    string,
    AxiosError | Error,
    Patient
  >({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries(["patients"]);
    },
    onError: (error: AxiosError | Error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          (error.response?.data as CustomError)?.message ||
          error.message ||
          "An error occurred.";
        return errorMessage;
      } else {
        return (error as Error).message || "An unexpected error occurred.";
      }
    },
  });

  const createAddressMutation = useMutation<
    void,
    AxiosError | Error,
    AddressData
  >({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries(["address"]);
    },
    onError: (error: AxiosError | Error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          (error.response?.data as CustomError)?.message ||
          error.message ||
          "An error occurred.";
        return errorMessage;
      } else {
        return (error as Error).message || "An unexpected error occurred.";
      }
    },
  });

  return {
    isLoading:
      createPatientMutation.isLoading || createAddressMutation.isLoading,
    error:
      createPatientMutation.error?.message ||
      createAddressMutation.error?.message ||
      "",
    createPatient: createPatientMutation.mutateAsync,
    createAddress: createAddressMutation.mutateAsync,
  };
};

export default useCreatePatient;

