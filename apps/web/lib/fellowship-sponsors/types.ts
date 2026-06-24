import { z } from "zod";

import { leadershipInstituteSponsorSchema } from "@/lib/forms/schemas/leadership-institute-sponsor";

export const fellowshipSponsorPayloadSchema = leadershipInstituteSponsorSchema;

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
  createdAt: Date;
};
