import { useState, useEffect } from "react";
import useApiClientUser from "../services/api-client-user";
import { Patient } from "../components/patient/PatientCreate";

const useManagePatients = (isAdmin: boolean, hospital?: string | number) => {
  const apiClient = useApiClientUser({ isAdmin, hospital });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await apiClient.get("/patients");
        setPatients(response.data);
      } catch (err) {
        setError("Failed to fetch patients.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [apiClient]);

  return { patients, loading, error };
};

export default useManagePatients;
