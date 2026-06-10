import { z } from "zod";

import { emailField, nameField } from "@/lib/forms/schemas/common";

export const newsletterEmailSchema = z.object({
  email: emailField,
});

export type NewsletterEmailValues = z.infer<typeof newsletterEmailSchema>;

export const newsletterSignupSchema = z.object({
  name: nameField,
  email: emailField,
});

export type NewsletterSignupValues = z.infer<typeof newsletterSignupSchema>;
