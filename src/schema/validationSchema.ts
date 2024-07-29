import { z } from "zod";

export const hospitalSchema = z.object({
  name: z.string().min(1, "Hospital name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z
    .string()
    .min(8, "Phone number should be at least 8 characters")
    .max(15, "Phone number should not exceed 15 characters"),
  email: z.string().email("Invalid email address"),
});

export const patientSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(8, "Should be at least 8 characters")
    .max(15, "Should not exceed 15 characters"),
  birth_date: z.string().min(1, "Birth date is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
});
