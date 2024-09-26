import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useApiClientUser from "../../services/api-client-user";
import { Patient } from "../../components/patient/ManagePatients";

const useGetPatients = (
  hospital?: string | number
): UseQueryResult<Patient[], Error> => {
  const apiClient = useApiClientUser({ hospital });

  const fetchPatients = async (): Promise<Patient[]> => {
    const response = await apiClient.get<Patient[]>(`/patients`);
    return response.data;
  };

  return useQuery<Patient[], Error>(["patients", hospital], fetchPatients, {
    onError: (err) => {
      console.error("Failed to fetch patients:", err.message);
    },
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export default useGetPatients;
