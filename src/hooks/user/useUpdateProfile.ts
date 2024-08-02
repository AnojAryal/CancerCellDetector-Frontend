import { useState } from "react";
import apiClient from "../../services/api-client";
import { UserProfile } from "./useGetProfile";

const useUpdateUserProfile = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const updateProfile = async (updatedProfile: UserProfile) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const authToken = localStorage.getItem("accessToken");
      const headers: Record<string, string> = authToken
        ? { Authorization: `Bearer ${authToken}` }
        : {};

      const response = await apiClient.patch<UserProfile>(
        "/me",
        updatedProfile,
        { headers }
      );
      setSuccess("Profile updated successfully");
      setLoading(false);
      return response.data;
    } catch (err) {
      if (err instanceof Error && err.message) {
        setError(err.message);
      } else {
        setError("An error occurred");
      }
      setLoading(false);
    }
  };

  return {
    isLoading,
    error,
    success,
    updateProfile,
  };
};

export default useUpdateUserProfile;
