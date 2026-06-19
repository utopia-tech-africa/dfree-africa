import { z } from "zod";

import { FORM_ACKNOWLEDGEMENT_TYPES } from "@/lib/form-acknowledgements/constants";

export const formAcknowledgementTemplateSchema = z.object({
  formType: z.enum(FORM_ACKNOWLEDGEMENT_TYPES),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .max(200, "Subject must be 200 characters or fewer"),
  bodyText: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(10000, "Message must be 10,000 characters or fewer"),
});

export type FormAcknowledgementTemplateValues = z.infer<
  typeof formAcknowledgementTemplateSchema
>;
