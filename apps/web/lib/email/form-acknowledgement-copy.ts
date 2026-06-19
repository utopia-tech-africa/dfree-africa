import { getFormAcknowledgementTemplate } from "@/lib/form-acknowledgements/get-templates";
import {
  plainTextToBodyHtml,
  normalizeBodyTextForDisplay,
} from "@/lib/form-acknowledgements/format-body-text";
import { renderAcknowledgementBody } from "@/lib/form-acknowledgements/render-template";
import type { FormAcknowledgementType } from "@/lib/form-acknowledgements/types";

export type { FormAcknowledgementType } from "@/lib/form-acknowledgements/types";

export async function getFormAcknowledgementCopy(
  formType: FormAcknowledgementType,
  submitterName?: string | null,
): Promise<{ subject: string; html: string }> {
  const template = await getFormAcknowledgementTemplate(formType);
  const bodyText = normalizeBodyTextForDisplay(template.bodyText);
  const bodyHtml = plainTextToBodyHtml(bodyText);

  return {
    subject: template.subject,
    html: renderAcknowledgementBody(bodyHtml, submitterName),
  };
}
