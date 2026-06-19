import type { FormAcknowledgementType } from "./types";

export const FORM_ACKNOWLEDGEMENT_TYPES = [
  "contact",
  "fellowship-application",
  "fellowship-sponsor",
] as const;

export const FORM_ACKNOWLEDGEMENT_LABELS: Record<
  FormAcknowledgementType,
  { title: string; description: string }
> = {
  contact: {
    title: "Contact form",
    description: "Sent when someone submits the public contact form.",
  },
  "fellowship-application": {
    title: "Fellowship application",
    description:
      "Sent when an applicant completes the leadership institute application.",
  },
  "fellowship-sponsor": {
    title: "Fellowship sponsor",
    description:
      "Sent when someone submits the leadership institute sponsorship form.",
  },
};

export const NAME_PLACEHOLDER = "{{name}}";
