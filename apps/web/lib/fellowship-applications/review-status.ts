export const FELLOWSHIP_APPLICATION_REVIEW_STATUSES = [
  "pending",
  "under_review",
  "accepted",
  "rejected",
  "waitlisted",
] as const;

export type FellowshipApplicationReviewStatus =
  (typeof FELLOWSHIP_APPLICATION_REVIEW_STATUSES)[number];

export const FELLOWSHIP_APPLICATION_REVIEW_STATUS_LABELS: Record<
  FellowshipApplicationReviewStatus,
  string
> = {
  pending: "Pending",
  under_review: "Under review",
  accepted: "Accepted",
  rejected: "Rejected",
  waitlisted: "Waitlisted",
};

/** Maps each review status to its editable auto-response email template. */
export const FELLOWSHIP_APPLICATION_STATUS_EMAIL_TYPES = {
  pending: "fellowship-application-pending",
  under_review: "fellowship-application-under-review",
  accepted: "fellowship-application-accepted",
  rejected: "fellowship-application-rejected",
  waitlisted: "fellowship-application-waitlisted",
} as const satisfies Record<
  FellowshipApplicationReviewStatus,
  import("@/lib/form-acknowledgements/types").FormAcknowledgementType
>;

export function isFellowshipApplicationReviewStatus(
  value: unknown,
): value is FellowshipApplicationReviewStatus {
  return (
    typeof value === "string" &&
    FELLOWSHIP_APPLICATION_REVIEW_STATUSES.includes(
      value as FellowshipApplicationReviewStatus,
    )
  );
}

export function formatFellowshipApplicationReviewStatus(
  status: string | null | undefined,
): string {
  if (isFellowshipApplicationReviewStatus(status)) {
    return FELLOWSHIP_APPLICATION_REVIEW_STATUS_LABELS[status];
  }

  return "Pending";
}

export function normalizeFellowshipApplicationReviewStatus(
  status: string | null | undefined,
): FellowshipApplicationReviewStatus {
  if (isFellowshipApplicationReviewStatus(status)) {
    return status;
  }

  return "pending";
}
