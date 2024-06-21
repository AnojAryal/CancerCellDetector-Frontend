import { create } from "zustand";
import apiClient from "../services/api-client";
import { NavigateFunction } from "react-router-dom";

interface LoginFormState {
  formErrors: { [key: string]: string };
  authError: string | null;
  login: (
    formData: { username: string; password: string },
    navigate: NavigateFunction
  ) => Promise<void>;
}

export const useLogin = create<LoginFormState>((set) => ({
  formErrors: {},
  authError: null,
  login: async (formData, navigate) => {
    const errors: { [key: string]: string } = {};

    if (!formData.username) {
      errors.username = "Username is required";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    set({ formErrors: errors, authError: null });

    if (Object.keys(errors).length === 0) {
      try {
        const form = new FormData();
        form.append("username", formData.username);
        form.append("password", formData.password);

        const response = await apiClient.post("/login", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.access_token);
          localStorage.setItem("username", formData.username);
          set({ formErrors: {}, authError: null });
          console.log("Login successful", response.data);
          navigate("/home");
        } else {
          console.error("Unexpected response during login:", response);
          set({
            formErrors: {},
            authError: "An unexpected error occurred. Please try again later.",
          });
        }
      } catch (error) {
        console.error("Error during login:", error);
        set({
          formErrors: {},
          authError: "An unexpected error occurred. Please try again with valid credentials.",
        });
      }
    }
  },
}));
