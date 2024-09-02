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
  const BASE_URL = "http://127.0.0.1:8000";

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

        const updatedCellTests = response.data.map((cellTest) => ({
          ...cellTest,
          results: cellTest.results.map((result) => ({
            ...result,
            result_images: result.result_images.map((image) => ({
              ...image,
              // Convert image path to full URL
              image: `${BASE_URL}/${image.image}`,
            })),
          })),
        }));

        setCellTests(updatedCellTests);
      } catch (err) {
        setError("Failed to fetch cell test data.");
      } finally {
        setLoading(false);
      }
    },
    [apiClient, BASE_URL]
  );

  return {
    getCellTests,
    cellTests,
    loading,
    error,
  };
};

export default useResults;
