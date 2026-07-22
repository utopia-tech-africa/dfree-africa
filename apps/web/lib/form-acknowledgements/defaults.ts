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
  "fellowship-application-pending": {
    subject: "Application update — Pending — DFREE® Foundation",
    bodyText: `Hi {{name}},

We’re writing to let you know that your DFREE® Leadership Institute fellowship application is currently marked as pending.

No action is needed from you right now. We’ll be in touch if anything else is required.

Warm regards,
The DFREE® Foundation team`,
  },
  "fellowship-application-under-review": {
    subject: "Application update — Under review — DFREE® Foundation",
    bodyText: `Hi {{name}},

Good news — your DFREE® Leadership Institute fellowship application is now under review by our team.

You don’t need to take any further action at this time. We’ll follow up once a decision has been made.

Warm regards,
The DFREE® Foundation team`,
  },
  "fellowship-application-accepted": {
    subject: "Congratulations — You’ve been accepted — DFREE® Foundation",
    bodyText: `Hi {{name}},

Congratulations! We’re pleased to let you know that you’ve been accepted into the DFREE® Leadership Institute fellowship.

Our team will follow up soon with next steps, onboarding details, and any materials you’ll need to get started.

Warm regards,
The DFREE® Foundation team`,
  },
  "fellowship-application-rejected": {
    subject: "Application update — DFREE® Foundation",
    bodyText: `Hi {{name}},

Thank you again for applying to the DFREE® Leadership Institute fellowship and for the time you invested in your application.

After careful review, we are unable to offer you a place in this cohort. We know this news can be disappointing, and we truly appreciate your interest in DFREE®.

We encourage you to stay connected with our programs and consider applying again in the future.

Warm regards,
The DFREE® Foundation team`,
  },
  "fellowship-application-waitlisted": {
    subject: "Application update — Waitlisted — DFREE® Foundation",
    bodyText: `Hi {{name}},

Thank you for applying to the DFREE® Leadership Institute fellowship. After review, your application has been placed on our waitlist for this cohort.

We’ll reach out if a place becomes available. No action is needed from you right now.

Warm regards,
The DFREE® Foundation team`,
  },
};
