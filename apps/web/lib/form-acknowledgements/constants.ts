import type { FormAcknowledgementType } from "./types";

export const FORM_ACKNOWLEDGEMENT_TYPES = [
  "contact",
  "fellowship-application",
  "fellowship-sponsor",
  "fellowship-application-pending",
  "fellowship-application-under-review",
  "fellowship-application-accepted",
  "fellowship-application-rejected",
  "fellowship-application-waitlisted",
] as const;

/** Fellowship application emails shown together in the admin auto-response tabs. */
export const FELLOWSHIP_APPLICATION_AUTO_RESPONSE_TYPES = [
  "fellowship-application",
  "fellowship-application-pending",
  "fellowship-application-under-review",
  "fellowship-application-accepted",
  "fellowship-application-rejected",
  "fellowship-application-waitlisted",
] as const satisfies readonly FormAcknowledgementType[];

export const FELLOWSHIP_APPLICATION_AUTO_RESPONSE_TAB_LABELS: Record<
  (typeof FELLOWSHIP_APPLICATION_AUTO_RESPONSE_TYPES)[number],
  string
> = {
  "fellowship-application": "Received",
  "fellowship-application-pending": "Pending",
  "fellowship-application-under-review": "Under review",
  "fellowship-application-accepted": "Accepted",
  "fellowship-application-rejected": "Rejected",
  "fellowship-application-waitlisted": "Waitlisted",
};

export const FORM_ACKNOWLEDGEMENT_LABELS: Record<
  FormAcknowledgementType,
  { title: string; description: string }
> = {
  contact: {
    title: "Contact form",
    description: "Sent when someone submits the public contact form.",
  },
  "fellowship-application": {
    title: "Fellowship application received",
    description:
      "Sent when an applicant completes the leadership institute application.",
  },
  "fellowship-sponsor": {
    title: "Fellowship sponsor",
    description:
      "Sent when someone submits the leadership institute sponsorship form.",
  },
  "fellowship-application-pending": {
    title: "Application status — Pending",
    description:
      "Sent when an admin sets a fellowship application status to Pending.",
  },
  "fellowship-application-under-review": {
    title: "Application status — Under review",
    description:
      "Sent when an admin sets a fellowship application status to Under review.",
  },
  "fellowship-application-accepted": {
    title: "Application status — Accepted",
    description:
      "Sent when an admin sets a fellowship application status to Accepted.",
  },
  "fellowship-application-rejected": {
    title: "Application status — Rejected",
    description:
      "Sent when an admin sets a fellowship application status to Rejected.",
  },
  "fellowship-application-waitlisted": {
    title: "Application status — Waitlisted",
    description:
      "Sent when an admin sets a fellowship application status to Waitlisted.",
  },
};

export const NAME_PLACEHOLDER = "{{name}}";
