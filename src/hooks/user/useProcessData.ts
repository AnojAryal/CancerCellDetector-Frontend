import { useState } from "react";
import apiClient from "../../services/api-client";

interface CellTestResult {
  id: string;
  result: string;
}

const useProcessData = (cell_test_id: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CellTestResult | null>(null);

  const processData = async () => {
    if (!cell_test_id) {
      setError("No Cell Test ID provided");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<CellTestResult>(
        `/process-cell-test/${cell_test_id}`,
        null
      );
      setResult(response.data);
    } catch (err) {
      console.error("Error processing data:", err);
      setError("Failed to process data");
    } finally {
      setLoading(false);
    }
  };

  return {
    processData,
    loading,
    error,
    result,
  };
};

export default useProcessData;
