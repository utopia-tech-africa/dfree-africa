import { z } from "zod";

export const emailField = z
  .string()
  .min(1, "Email is required")
  .email("Enter a valid email address");

export const nameField = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be 100 characters or less");
