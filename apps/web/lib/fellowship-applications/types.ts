import { z } from "zod";

import {
  applyLeadershipInstituteApplicationRefinements,
  leadershipInstituteApplicationObjectSchema,
  signatureAcceptedMimeTypes,
} from "@/lib/forms/schemas/leadership-institute-application";

export const storedSignatureSchema = z.object({
  fileName: z.string().min(1),
  mimeType: z.enum(signatureAcceptedMimeTypes),
  dataBase64: z.string().min(1),
});

export type StoredSignature = z.infer<typeof storedSignatureSchema>;

export const fellowshipApplicationPayloadSchema =
  applyLeadershipInstituteApplicationRefinements(
    leadershipInstituteApplicationObjectSchema
      .omit({ signature: true })
      .extend({
        signature: storedSignatureSchema,
      }),
  );

export type FellowshipApplicationPayload = z.infer<
  typeof fellowshipApplicationPayloadSchema
>;

export type FellowshipApplicationSummary = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cohortTerm: string;
  createdAt: Date;
};
