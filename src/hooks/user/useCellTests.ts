import { useState, useCallback } from "react";
import useApiClientUser from "../../services/api-client-user";

const useCellTests = (hospital?: string | number) => {
  const apiClient = useApiClientUser({ hospital });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cellTests] = useState<{ title: string; description: string }[]>([]);

  const postCellTest = useCallback(
    async (
      patient_id: string,
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
      } catch (err) {
        setError("Failed to post cell test data.");
      } finally {
        setLoading(false);
      }
    },
    [apiClient]
  );

  return {
    postCellTest,
    cellTests,
    loading,
    error,
  };
};

export default useCellTests;
