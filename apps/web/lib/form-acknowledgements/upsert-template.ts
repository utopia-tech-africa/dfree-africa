import { prisma } from "@/lib/db/prisma";

import { normalizeBodyTextForStorage } from "./format-body-text";
import type { FormAcknowledgementType } from "./types";

type UpsertTemplateInput = {
  formType: FormAcknowledgementType;
  subject: string;
  bodyText: string;
  updatedBy?: string | null;
};

export async function upsertFormAcknowledgementTemplate({
  formType,
  subject,
  bodyText,
  updatedBy,
}: UpsertTemplateInput) {
  const normalizedBodyText = normalizeBodyTextForStorage(bodyText);

  return prisma.formAcknowledgementTemplate.upsert({
    where: { formType },
    create: {
      formType,
      subject,
      bodyText: normalizedBodyText,
      updatedBy: updatedBy ?? null,
    },
    update: {
      subject,
      bodyText: normalizedBodyText,
      updatedBy: updatedBy ?? null,
    },
  });
}

export async function resetFormAcknowledgementTemplate(
  formType: FormAcknowledgementType,
) {
  await prisma.formAcknowledgementTemplate.deleteMany({
    where: { formType },
  });
}
