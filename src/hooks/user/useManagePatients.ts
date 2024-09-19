import { useState, useCallback } from "react";
import useApiClientUser from "../../services/api-client-user";
import { Patient, Address } from "../../components/patient/ManagePatients";

const useManagePatients = (hospital?: string | number) => {
  const apiClient = useApiClientUser({ hospital });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatientById = useCallback(
    async (patient_id: string): Promise<Patient> => {
      setLoading(true);
      try {
        const response = await apiClient.get<Patient>(
          `/patients/${patient_id}`
        );
        return response.data;
      } catch (err) {
        setError("Failed to fetch patient.");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiClient]
  );

  const updatePatient = async (
    patient_id: string,
    updatedData: Partial<Patient>
  ) => {
    try {
      await apiClient.put(`/patients/${patient_id}`, updatedData);
    } catch (err) {
      setError("Failed to update patient.");
    }
  };

  const updatePatientAddress = async (
    patient_id: string,
    address_id: number,
    address: Partial<Address>
  ) => {
    try {
      const requestBody = {
        ...address,
        patient_id,
      };

      await apiClient.put(
        `/patients/${patient_id}/address/${address_id}`,
        requestBody
      );
    } catch (err) {
      setError("Failed to update address.");
    }
  };

  return {
    loading,
    error,
    updatePatient,
    fetchPatientById,
    updatePatientAddress,
  };
};

export default useManagePatients;
