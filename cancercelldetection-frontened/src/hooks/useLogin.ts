import { create } from "zustand";
import apiClient from "../services/api-client";
import { AxiosError } from "axios";

interface LoginFormState {
  formErrors: { [key: string]: string };
  login: (formData: { username: string; password: string }) => void;
}

interface ErrorResponseData {
  errors: { [key: string]: string };
}

export const useLogin = create<LoginFormState>((set) => ({
  formErrors: {},
  login: async (formData) => {
    const errors: { [key: string]: string } = {};
    if (!formData.username) {
      errors.username = "Username is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }

    set({ formErrors: errors });

    if (Object.keys(errors).length === 0) {
      try {
        const response = await apiClient.post("/login", {
          username: formData.username,
          password: formData.password,
        });

        if (response.status === 200) {
          console.log("Login successful", response.data);
          // Do something after successful login, e.g., redirect user
        } else {
          console.error("Unexpected response during login:", response);
          set({
            formErrors: {
              server:
                "An unexpected error occurred during login. Please try again later.",
            },
          });
        }
      } catch (error: unknown) {
        if (
          isAxiosError(error) &&
          error.response &&
          error.response.status === 422
        ) {
          const responseData = error.response.data as ErrorResponseData;
          // Check if the error indicates password mismatch
          if (
            responseData.errors &&
            responseData.errors.password === "Password doesn't match"
          ) {
            set({
              formErrors: {
                password: "Password doesn't match",
              },
            });
          } else {
            set({ formErrors: responseData.errors });
          }
        } else {
          console.error("Error during login:", error);
          set({
            formErrors: {
              server: "An error occurred during login. Please try again later.",
            },
          });
        }
      }
    }
  },
}));

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}
