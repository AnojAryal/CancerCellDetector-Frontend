import { useState } from "react";
import axios, { AxiosError } from "axios";
import apiClient from "../services/api-client";

interface Patient {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  hospital_id: string;
}

interface AddressData {
  street: string;
  city: string;
  hospital_id: string;
  patient_id: string;
}

interface CreatePatientResult {
  isLoading: boolean;
  error: string;
  createPatient: (patientData: Patient) => Promise<string | null>;
  createAddress: (addressData: AddressData) => Promise<void>;
}

const useCreatePatient = (): CreatePatientResult => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const createPatient = async (
    patientData: Patient
  ): Promise<string | null> => {
    const { hospital_id } = patientData;

    if (!hospital_id) {
      setError("Hospital ID is required");
      return null;
    }

    setLoading(true);
    setError("");

    try {
      const url = `/hospital/${hospital_id}/patients`;
      const authToken = localStorage.getItem("accessToken");
      const headers: Record<string, string> = {};

      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const response = await apiClient.post(url, patientData, { headers });
      const patientId = response.data.id;
      return patientId;
    } catch (error) {
      handleApiError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createAddress = async (addressData: AddressData): Promise<void> => {
    const { hospital_id, patient_id } = addressData;

    if (!hospital_id || !patient_id) {
      setError("Hospital ID and Patient ID are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const url = `/hospital/${hospital_id}/patients/${patient_id}/address`;
      const authToken = localStorage.getItem("accessToken");
      const headers: Record<string, string> = {};

      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      await apiClient.post(url, addressData, { headers });
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (
        axiosError.response?.data &&
        typeof axiosError.response.data === "object"
      ) {
        const errorResponse = axiosError.response.data as {
          message?: string;
        };
        setError(errorResponse.message || "An error occurred.");
      } else {
        setError(axiosError.message || "An error occurred.");
      }
    } else {
      setError("An unexpected error occurred.");
    }
  };

  return {
    isLoading,
    error,
    createPatient,
    createAddress,
  };
};

export default useCreatePatient;
