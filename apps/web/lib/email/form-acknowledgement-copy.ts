import { getFormAcknowledgementTemplate } from "@/lib/form-acknowledgements/get-templates";
import {
  plainTextToBodyHtml,
  normalizeBodyTextForDisplay,
} from "@/lib/form-acknowledgements/format-body-text";
import { renderAcknowledgementBody } from "@/lib/form-acknowledgements/render-template";
import type { FormAcknowledgementType } from "@/lib/form-acknowledgements/types";
import { wrapEmailHtml } from "@/lib/email/email-layout";

export type { FormAcknowledgementType } from "@/lib/form-acknowledgements/types";

const acknowledgementTitles: Record<FormAcknowledgementType, string> = {
  contact: "We received your message",
  "fellowship-application": "Your fellowship application was received",
  "fellowship-sponsor": "Your sponsorship inquiry was received",
};

export async function getFormAcknowledgementCopy(
  formType: FormAcknowledgementType,
  submitterName?: string | null,
): Promise<{ subject: string; html: string }> {
  const template = await getFormAcknowledgementTemplate(formType);
  const bodyText = normalizeBodyTextForDisplay(template.bodyText);
  const bodyHtml = plainTextToBodyHtml(bodyText);
  const renderedBody = renderAcknowledgementBody(bodyHtml, submitterName);
  const title = acknowledgementTitles[formType];

  return {
    subject: template.subject,
    html: wrapEmailHtml({
      title,
      preheader: template.subject,
      bodyHtml: renderedBody,
    }),
  };
}
