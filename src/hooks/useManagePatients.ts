import { useState, useEffect, useCallback } from "react";
import useApiClientUser from "../services/api-client-user";
import { Patient } from "../components/patient/ManagePatients";

const useManagePatients = (hospital?: string | number) => {
  const apiClient = useApiClientUser({ hospital });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = useCallback(async () => {
    try {
      const response = await apiClient.get(`/patients`);
      setPatients(response.data);
    } catch (err) {
      setError("Failed to fetch patients.");
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

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);
  return {
    patients,
    loading,
    error,
    updatePatient,
  };
};

export default useManagePatients;
