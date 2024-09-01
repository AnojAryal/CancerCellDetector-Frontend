import { useState, useCallback } from "react";
import useApiClientUser from "../../services/api-client-user";

interface ResultImage {
  image: string;
  result_id: string;
  id: number;
}

interface Result {
  description: string;
  created_at: string;
  celltest_id: string;
  result_images: ResultImage[];
}

interface CellTest {
  id: string;
  title: string;
  description: string;
  updated_at: string;
  created_at: string;
  detection_status: string;
  results: Result[];
}

const useResults = (hospital?: string | number) => {
  const apiClient = useApiClientUser({ hospital });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cellTests, setCellTests] = useState<CellTest[]>([]);

  const getCellTests = useCallback(
    async (patient_id: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get<CellTest[]>(
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

  return {
    getCellTests,
    cellTests,
    loading,
    error,
  };
};

export default useResults;
