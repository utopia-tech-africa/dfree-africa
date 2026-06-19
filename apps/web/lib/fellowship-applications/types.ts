import { z } from "zod";

import {
  applyLeadershipInstituteApplicationRefinements,
  leadershipInstituteApplicationObjectSchema,
  signatureAcceptedMimeTypes,
} from "@/lib/forms/schemas/leadership-institute-application";

export const legacyStoredSignatureSchema = z.object({
  fileName: z.string().min(1),
  mimeType: z.enum(signatureAcceptedMimeTypes),
  dataBase64: z.string().min(1),
});

export type LegacyStoredSignature = z.infer<typeof legacyStoredSignatureSchema>;

export const applicationSignatureSchema = z.union([
  z.string().min(1),
  legacyStoredSignatureSchema,
]);

export type ApplicationSignature = z.infer<typeof applicationSignatureSchema>;

export function isLegacyStoredSignature(
  signature: ApplicationSignature,
): signature is LegacyStoredSignature {
  return typeof signature === "object";
}

const fellowshipApplicationFieldsSchema =
  leadershipInstituteApplicationObjectSchema.omit({ signature: true });

export const fellowshipApplicationPayloadSchema =
  applyLeadershipInstituteApplicationRefinements(
    fellowshipApplicationFieldsSchema.extend({
      signature: z.string().min(1),
    }),
  );

export const storedFellowshipApplicationPayloadSchema =
  fellowshipApplicationFieldsSchema.extend({
    signature: applicationSignatureSchema,
  });

export type FellowshipApplicationPayload = z.infer<
  typeof storedFellowshipApplicationPayloadSchema
>;

export type FellowshipApplicationSummary = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cohortTerm: string;
  createdAt: Date;
};
