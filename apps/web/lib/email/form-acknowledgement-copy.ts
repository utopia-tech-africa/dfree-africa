import { FormAcknowledgementEmail } from "@/emails/form-acknowledgement";
import { normalizeBodyTextForDisplay } from "@/lib/form-acknowledgements/format-body-text";
import { getFormAcknowledgementTemplate } from "@/lib/form-acknowledgements/get-templates";
import { renderAcknowledgementPlainText } from "@/lib/form-acknowledgements/render-template";
import type { FormAcknowledgementType } from "@/lib/form-acknowledgements/types";
import { renderEmail } from "@/lib/email/render-email";

export type { FormAcknowledgementType } from "@/lib/form-acknowledgements/types";

const acknowledgementTitles: Record<FormAcknowledgementType, string> = {
  contact: "We received your message",
  "fellowship-application": "Your fellowship application was received",
  "fellowship-sponsor": "Your sponsorship inquiry was received",
  "fellowship-application-pending": "Application status update",
  "fellowship-application-under-review": "Your application is under review",
  "fellowship-application-accepted": "Congratulations — you’re accepted",
  "fellowship-application-rejected": "Application update",
  "fellowship-application-waitlisted": "You’re on the waitlist",
};

function toParagraphs(bodyText: string): string[] {
  return bodyText
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export async function getFormAcknowledgementCopy(
  formType: FormAcknowledgementType,
  submitterName?: string | null,
): Promise<{ subject: string; html: string }> {
  const template = await getFormAcknowledgementTemplate(formType);
  const bodyText = normalizeBodyTextForDisplay(template.bodyText);
  const renderedBody = renderAcknowledgementPlainText(bodyText, submitterName);
  const title = acknowledgementTitles[formType];

  const html = await renderEmail(
    FormAcknowledgementEmail({
      title,
      preview: template.subject,
      paragraphs: toParagraphs(renderedBody),
    }),
  );

  return {
    subject: template.subject,
    html,
  };
}
