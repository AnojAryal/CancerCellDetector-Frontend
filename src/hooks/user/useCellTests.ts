import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApiClientUser from "../../services/api-client-user";

const useCellTests = (hospital?: string | number) => {
  const apiClient = useApiClientUser({ hospital });
  const queryClient = useQueryClient();

  const [error, setError] = useState<string | null>(null);

  const { mutate: postCellTest, isLoading: isPosting } = useMutation(
    async ({
      patient_id,
      cellTestData,
    }: {
      patient_id: string;
      cellTestData: {
        title: string;
        description: string;
        updated_at: string;
        created_at: string;
        detection_status: string;
      };
    }) => {
      if (!patient_id) {
        throw new Error("Patient ID is required.");
      }

      return await apiClient.post(
        `/patients/${patient_id}/cell_tests`,
        cellTestData
      );
    },
    {
      onError: (err) => {
        console.error(err);
        setError("Failed to post cell test data.");
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["patients", hospital]);
      },
    }
  );

  return {
    postCellTest,
    loading: isPosting,
    error,
  };
};

export default useCellTests;
