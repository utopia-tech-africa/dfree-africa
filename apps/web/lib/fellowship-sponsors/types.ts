import { z } from "zod";

import {
  leadershipInstituteSponsorSchema,
  sponsorReferralSourceValues,
} from "@/lib/forms/schemas/leadership-institute-sponsor";

export const storedRecognitionLogoSchema = z.object({
  fileName: z.string().min(1),
  mimeType: z.string().min(1),
  dataBase64: z.string().min(1),
});

export type StoredRecognitionLogo = z.infer<typeof storedRecognitionLogoSchema>;

export const sponsorPaymentStatusValues = [
  "pending",
  "paid",
  "cancelled",
] as const;

export type SponsorPaymentStatus = (typeof sponsorPaymentStatusValues)[number];

export const sponsorPaymentSchema = z.object({
  status: z.enum(sponsorPaymentStatusValues),
  amountCents: z.number().int().positive(),
  currency: z.literal("usd"),
  stripeCheckoutSessionId: z.string().min(1).optional(),
  stripePaymentIntentId: z.string().min(1).optional(),
  cancelToken: z.string().min(1).optional(),
  paidAt: z.string().min(1).optional(),
});

export type SponsorPaymentInfo = z.infer<typeof sponsorPaymentSchema>;

export const fellowshipSponsorPayloadSchema = leadershipInstituteSponsorSchema
  .omit({ referralSource: true })
  .extend({
    recognitionLogo: storedRecognitionLogoSchema.optional(),
    payment: sponsorPaymentSchema.optional(),
    referralSource: z
      .union([z.literal(""), z.enum(sponsorReferralSourceValues)])
      .optional(),
  });

export type FellowshipSponsorPayload = z.infer<
  typeof fellowshipSponsorPayloadSchema
>;

export type FellowshipSponsorSummary = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  sponsorshipTier: string;
  customFellowCount: number;
  paymentMethod: string;
  paymentStatus: SponsorPaymentStatus | null;
  createdAt: Date;
};
