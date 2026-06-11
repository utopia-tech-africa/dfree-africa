import { z } from "zod";

import { emailField } from "@/lib/forms/schemas/common";

export const adminLoginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
});

export type AdminLoginValues = z.infer<typeof adminLoginSchema>;

export const inviteAdminSchema = z.object({
  email: emailField,
});

export type InviteAdminValues = z.infer<typeof inviteAdminSchema>;
