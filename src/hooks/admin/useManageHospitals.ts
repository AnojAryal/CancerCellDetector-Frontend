import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import { Hospital } from "./useGetHospital";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const useManageHospitals = () => {
  const queryClient = useQueryClient();

  const deleteHospitalMutation = useMutation(
    async (hospital_id: number) => {
      const token = getAccessToken();
      await apiClient.delete(`/hospital/${hospital_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["hospitals"]);
      },
      onError: () => {
        console.error("Failed to delete hospital");
      },
    }
  );

  const updateHospitalMutation = useMutation(
    async ({
      hospital_id,
      updatedHospital,
    }: {
      hospital_id: number;
      updatedHospital: Partial<Hospital>;
    }) => {
      const token = getAccessToken();
      const response = await apiClient.put(
        `/hospital/${hospital_id}`,
        updatedHospital,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["hospitals"]);
      },
      onError: () => {
        console.error("Failed to update hospital");
      },
    }
  );

  return {
    deleteHospital: deleteHospitalMutation.mutate,
    updateHospital: updateHospitalMutation.mutate,
  };
};

export default useManageHospitals;
