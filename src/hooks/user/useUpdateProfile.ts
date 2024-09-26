import { useState } from "react";
import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import { UserProfile } from "./useGetProfile";

interface MutationError {
  message: string;
}

const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const mutation: UseMutationResult<UserProfile, MutationError, UserProfile> =
    useMutation({
      mutationFn: async (updatedProfile: UserProfile) => {
        const authToken = localStorage.getItem("accessToken");
        const headers: Record<string, string> = authToken
          ? { Authorization: `Bearer ${authToken}` }
          : {};

        const response = await apiClient.patch<UserProfile>(
          "/me",
          updatedProfile,
          { headers }
        );
        return response.data;
      },
      onSuccess: () => {
        setError(null);
        queryClient.invalidateQueries(["userProfile"]);
      },
      onError: (err: MutationError) => {
        setError(err.message || "An error occurred");
      },
    });

  return {
    isLoading: mutation.isLoading,
    error,
    success: mutation.isSuccess ? "Profile updated successfully" : "",
    updateProfile: mutation.mutate,
  };
};

export default useUpdateUserProfile;
