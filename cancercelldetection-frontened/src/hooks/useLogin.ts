// import { create } from "zustand";
// import apiClient from "../services/api-client";
// import { AxiosError } from "axios";

// interface LoginFormState {
//   formErrors: { [key: string]: string };
//   login: (formData: { username: string; password: string }) => Promise<void>;
// }

// interface ErrorResponseData {
//   errors: { [key: string]: string };
// }

// export const useLogin = create<LoginFormState>((set) => ({
//   formErrors: {},
//   login: async (formData) => {
//     const errors: { [key: string]: string } = {};
//     if (!formData.username) {
//       errors.username = "Username is required";
//     }

//     if (!formData.password) {
//       errors.password = "Password is required";
//     }

//     set({ formErrors: errors });

//     if (Object.keys(errors).length === 0) {
//       try {
//         const response = await apiClient.post("/login", {
//           username: formData.username,
//           password: formData.password,
//         });
//         console.log(formData.username);

//         if (response.status === 200) {
//           const data = response.data;
//           localStorage.setItem("accessToken", data.access_token);
//           console.log("Login successful", response.data);
//           set({ formErrors: {} });
//         } else {
//           console.error("Unexpected response during login:", response);
//           set({
//             formErrors: {
//               server:
//                 "An unexpected error occurred during login. Please try again later.",
//             },
//           });
//         }
//       } catch (error) {
//         if (
//           isAxiosError(error) &&
//           error.response &&
//           error.response.status === 422
//         ) {
//           const responseData = error.response.data as ErrorResponseData;
//           set({ formErrors: responseData.errors });
//         } else {
//           console.error("Error during login:", error);
//           set({
//             formErrors: {
//               server: "An error occurred during login. Please try again later.",
//             },
//           });
//         }
//       }
//     }
//   },
// }));

// function isAxiosError(error: unknown): error is AxiosError {
//   return (error as AxiosError).isAxiosError !== undefined;
// }

import { create } from "zustand";
import apiClient from "../services/api-client";

interface LoginFormState {
  formErrors: { [key: string]: string };
  login: (formData: { username: string; password: string }) => Promise<void>;
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
        const response = await apiClient.post("/login", formData);
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.access_token);
          set({ formErrors: {} });
          console.log("Login successful", response.data);
        } else {
          console.error("Unexpected response during login:", response);
          set({
            formErrors: {
              server:
                "An unexpected error occurred during login. Please try again later.",
            },
          });
        }
      } catch (error) {
        console.error("Error during login:", error);
        set({
          formErrors: {
            server:
              "An unexpected error occurred during login. Please try again later.",
          },
        });
      }
    }
  },
}));
