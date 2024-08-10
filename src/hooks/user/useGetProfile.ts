import { useState, useEffect } from "react";
import apiClient from "../../services/api-client";

export interface UserProfile {
  username: string;
  email: string;
  full_name: string;
  address: string;
  blood_group: string;
  gender: string;
  contact_no: string;
}

const useGetProfile = () => {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("accessToken");
        const headers: Record<string, string> = authToken
          ? { Authorization: `Bearer ${authToken}` }
          : {};

        const response = await apiClient.get<UserProfile>("/me", { headers });
        setProfileData(response.data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error && err.message) {
          setError(err.message);
        } else {
          setError("An error occurred");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    profileData,
    error,
    isLoading,
  };
};

export default useGetProfile;
