import { z } from "zod";

import { emailField, nameField } from "@/lib/forms/schemas/common";

export const contactFormSchema = z.object({
  fullName: nameField,
  email: emailField,
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().max(2000, "Message must be 2000 characters or less"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
