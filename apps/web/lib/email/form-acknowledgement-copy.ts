export type FormAcknowledgementType =
  | "contact"
  | "fellowship-application"
  | "fellowship-sponsor";

type AcknowledgementCopy = {
  subject: string;
  buildHtml: (submitterName?: string | null) => string;
};

const COPY: Record<FormAcknowledgementType, AcknowledgementCopy> = {
  contact: {
    subject: "We received your message — DFREE",
    buildHtml: (submitterName) => {
      const greeting = submitterName ? `Hi ${submitterName},` : "Hi,";
      return `
        <p>${greeting}</p>
        <p>Thank you for contacting DFREE. We have received your message and will get back to you as soon as we can.</p>
        <p>— The DFREE team</p>
      `;
    },
  },
  "fellowship-application": {
    subject: "Fellowship application received — DFREE",
    buildHtml: (submitterName) => {
      const greeting = submitterName ? `Hi ${submitterName},` : "Hi,";
      return `
        <p>${greeting}</p>
        <p>Thank you for submitting your fellowship application. Our team has received it and will review it shortly.</p>
        <p>— The DFREE team</p>
      `;
    },
  },
  "fellowship-sponsor": {
    subject: "Sponsor inquiry received — DFREE",
    buildHtml: (submitterName) => {
      const greeting = submitterName ? `Hi ${submitterName},` : "Hi,";
      return `
        <p>${greeting}</p>
        <p>Thank you for your interest in sponsoring the fellowship program. We have received your inquiry and will follow up soon.</p>
        <p>— The DFREE team</p>
      `;
    },
  },
};

export function getFormAcknowledgementCopy(
  formType: FormAcknowledgementType,
  submitterName?: string | null,
): { subject: string; html: string } {
  const entry = COPY[formType];
  return {
    subject: entry.subject,
    html: entry.buildHtml(submitterName),
  };
}
