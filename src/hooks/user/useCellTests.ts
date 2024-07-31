import { useState, useCallback } from "react";
import useApiClientUser from "../../services/api-client-user";

const useCellTests = (hospital?: string | number) => {
  const apiClient = useApiClientUser({ hospital });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cellTests, setCellTests] = useState<
    { title: string; description: string }[]
  >([]);

  const fetchCellTests = useCallback(
    async (patient_id: number) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(
          `/patients/${patient_id}/cell_tests`
        );
        setCellTests(response.data);
      } catch (err) {
        setError("Failed to fetch cell test data.");
      } finally {
        setLoading(false);
      }
    },
    [apiClient]
  );

  const postCellTest = useCallback(
    async (
      patient_id: number,
      cellTestData: {
        title: string;
        description: string;
        updated_at: string;
        created_at: string;
        detection_status: string;
      }
    ) => {
      setLoading(true);
      setError(null);
      try {
        await apiClient.post(
          `/patients/${patient_id}/cell_tests`,
          cellTestData
        );
        await fetchCellTests(patient_id);
      } catch (err) {
        setError("Failed to post cell test data.");
      } finally {
        setLoading(false);
      }
    },
    [apiClient, fetchCellTests]
  );

  return {
    fetchCellTests,
    postCellTest,
    cellTests,
    loading,
    error,
  };
};

export default useCellTests;
