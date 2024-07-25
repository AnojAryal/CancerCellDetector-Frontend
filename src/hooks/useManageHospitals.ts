import { useState, useEffect, useCallback } from "react";
import apiClient from "../services/api-client";

export interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}

const useManageHospitals = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getAccessToken = useCallback(() => {
    return localStorage.getItem("accessToken");
  }, []);

  const fetchHospitals = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAccessToken();
      const response = await apiClient.get("/hospital", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Array.isArray(response.data)) {
        setHospitals(response.data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      setError("Failed to fetch hospitals");
    } finally {
      setLoading(false);
    }
  }, [getAccessToken]);

  const deleteHospital = useCallback(async (hospital_id: number) => {
    try {
      const token = getAccessToken();
      await apiClient.delete(`/hospital/${hospital_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHospitals((prevHospitals) =>
        prevHospitals.filter((hospital) => hospital.id !== hospital_id)
      );
    } catch (error) {
      setError("Failed to delete hospital");
    }
  }, [getAccessToken]);

  const updateHospital = useCallback(
    async (hospital_id: number, updatedHospital: Partial<Hospital>) => {
      try {
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
        setHospitals((prevHospitals) =>
          prevHospitals.map((hospital) =>
            hospital.id === hospital_id
              ? { ...hospital, ...response.data }
              : hospital
          )
        );
      } catch (error) {
        setError("Failed to update hospital");
      }
    },
    [getAccessToken]
  );

  useEffect(() => {
    fetchHospitals();
  }, [fetchHospitals]);

  return {
    hospitals,
    loading,
    error,
    fetchHospitals,
    deleteHospital,
    updateHospital,
  };
};

export default useManageHospitals;
