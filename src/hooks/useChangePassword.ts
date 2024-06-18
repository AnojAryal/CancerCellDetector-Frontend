import { useState } from "react";
import * as Yup from "yup";
import apiClient from "../services/api-client";

export interface ChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "New password must be at least 8 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleChangePassword = async (
    values: ChangePasswordValues,
    onSuccess: () => void
  ) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token not found in localStorage.");
      setError("Access token not found. Please login again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiClient.put(
        "/change-password",
        {
          current_password: values.currentPassword,
          new_password: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Password changed:", response.data);
      setSuccessMessage("Password changed successfully.");
      setIsLoading(false);
      onSuccess();
    } catch (error) {
      console.error("Error changing password:", error);
      setIsLoading(false);
      setError("Failed to change password. Please try again.");
    }
  };

  return {
    isLoading,
    error,
    successMessage,
    validationSchema,
    handleChangePassword,
  };
};

export default useChangePassword;
