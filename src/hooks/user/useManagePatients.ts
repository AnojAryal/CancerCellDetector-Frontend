import { useState, useEffect, useCallback } from "react";
import useApiClientUser from "../../services/api-client-user";
import { Patient, Address } from "../../components/patient/ManagePatients";

const useManagePatients = (hospital?: string | number) => {
  const apiClient = useApiClientUser({ hospital });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = useCallback(async () => {
    try {
      const response = await apiClient.get<Patient[]>(`/patients`);
      setPatients(response.data);
    } catch (err) {
      setError("Failed to fetch patients.");
    } finally {
      setLoading(false);
    }
  }, [apiClient]);

  const fetchPatientById = useCallback(async (patient_id: number): Promise<Patient> => {
    setLoading(true);
    try {
      const response = await apiClient.get<Patient>(`/patients/${patient_id}`);
      return response.data;
    } catch (err) {
      setError("Failed to fetch patient.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiClient]);

  const updatePatient = async (
    patient_id: number,
    updatedData: Partial<Patient>
  ) => {
    try {
      await apiClient.put(`/patients/${patient_id}`, updatedData);
      await fetchPatients();
    } catch (err) {
      setError("Failed to update patient.");
    }
  };

  const updatePatientAddress = async (
    patient_id: number,
    address_id: number,
    address: Partial<Address>
  ) => {
    try {
      await apiClient.put(
        `/patients/${patient_id}/address/${address_id}`,
        address
      );
      await fetchPatients();
    } catch (err) {
      setError("Failed to update address.");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return {
    patients,
    loading,
    error,
    updatePatient,
    fetchPatientById,
    updatePatientAddress,
  };
};

export default useManagePatients;
