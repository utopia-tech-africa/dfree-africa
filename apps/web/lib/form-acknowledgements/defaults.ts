import type { FormAcknowledgementType } from "./types";

type DefaultTemplate = {
  subject: string;
  bodyText: string;
};

export const DEFAULT_FORM_ACKNOWLEDGEMENT_TEMPLATES: Record<
  FormAcknowledgementType,
  DefaultTemplate
> = {
  contact: {
    subject: "We received your message — DFREE",
    bodyText: `Hi {{name}},

Thank you for contacting DFREE. We have received your message and will get back to you as soon as we can.

— The DFREE team`,
  },
  "fellowship-application": {
    subject: "Fellowship application received — DFREE",
    bodyText: `Hi {{name}},

Thank you for submitting your fellowship application. Our team has received it and will review it shortly.

— The DFREE team`,
  },
  "fellowship-sponsor": {
    subject: "Sponsor inquiry received — DFREE",
    bodyText: `Hi {{name}},

Thank you for your interest in sponsoring the fellowship program. We have received your inquiry and will follow up soon.

— The DFREE team`,
  },
};
