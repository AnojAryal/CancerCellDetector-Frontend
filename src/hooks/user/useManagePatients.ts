import useApiClientUser from "../../services/api-client-user";
import { Patient, Address } from "../../components/patient/ManagePatients";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useFetchPatientById = (
  patient_id: string,
  hospital?: string | number
) => {
  const apiClient = useApiClientUser({ hospital });
  return useQuery<Patient>(
    ["patient", patient_id],
    async () => {
      const response = await apiClient.get<Patient>(`/patients/${patient_id}`);
      return response.data;
    },
    {
      enabled: !!patient_id,
      staleTime: 300000,
      onError: (error) => {
        console.error("Error fetching patient:", error);
      },
    }
  );
};

const useManagePatients = (hospital?: string | number) => {
  const apiClient = useApiClientUser({ hospital });
  const queryClient = useQueryClient();

  const updatePatient = useMutation(
    async ({
      patient_id,
      updatedData,
    }: {
      patient_id: string;
      updatedData: Partial<Patient>;
    }) => {
      return apiClient.put(`/patients/${patient_id}`, updatedData);
    },
    {
      onSuccess: (_, { patient_id }) => {
        queryClient.invalidateQueries(["patient", patient_id]);
      },
      onError: (error) => {
        console.error("Failed to update patient:", error);
      },
    }
  );

  const updatePatientAddress = useMutation(
    async ({
      patient_id,
      address_id,
      address,
    }: {
      patient_id: string;
      address_id: number;
      address: Partial<Address>;
    }) => {
      const requestBody = { ...address, patient_id };
      return apiClient.put(
        `/patients/${patient_id}/address/${address_id}`,
        requestBody
      );
    },
    {
      onSuccess: (_, { patient_id }) => {
        queryClient.invalidateQueries(["patient", patient_id]);
      },
      onError: (error) => {
        console.error("Failed to update address:", error);
      },
    }
  );

  return {
    useFetchPatientById,
    updatePatient,
    updatePatientAddress,
  };
};

export default useManagePatients;
