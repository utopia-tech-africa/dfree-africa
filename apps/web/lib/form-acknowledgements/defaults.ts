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
    subject: "We received your message — DFREE® Foundation",
    bodyText: `Hi {{name}},

Thank you for contacting DFREE® Foundation. We’ve received your message and a member of our team will follow up as soon as we can.

If your note is time-sensitive, feel free to reply to this email with any additional details.

Warm regards,
The DFREE® Foundation team`,
  },
  "fellowship-application": {
    subject: "Fellowship application received — DFREE® Foundation",
    bodyText: `Hi {{name}},

Thank you for applying to the DFREE® Leadership Institute fellowship. We’ve received your application and our team will review it carefully.

You don’t need to take any further action right now. We’ll be in touch with next steps once your application has been reviewed.

Warm regards,
The DFREE® Foundation team`,
  },
  "fellowship-sponsor": {
    subject: "Sponsorship inquiry received — DFREE® Foundation",
    bodyText: `Hi {{name}},

Thank you for your interest in sponsoring the DFREE® Leadership Institute fellowship. We’ve received your inquiry and our team will follow up shortly.

We’re grateful for your partnership in expanding Fellow Access Scholarships and supporting the next generation of leaders.

Warm regards,
The DFREE® Foundation team`,
  },
};
