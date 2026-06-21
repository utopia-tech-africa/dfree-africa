import { prisma } from "@/lib/db/prisma";

import { DEFAULT_FORM_ACKNOWLEDGEMENT_TEMPLATES } from "./defaults";
import { normalizeBodyTextForDisplay } from "./format-body-text";
import type {
  FormAcknowledgementTemplate,
  FormAcknowledgementType,
} from "./types";

function toTemplate(
  formType: FormAcknowledgementType,
  stored: {
    subject: string;
    bodyText: string;
    updatedAt: Date;
  } | null,
): FormAcknowledgementTemplate {
  const defaults = DEFAULT_FORM_ACKNOWLEDGEMENT_TEMPLATES[formType];

  if (!stored) {
    return {
      formType,
      subject: defaults.subject,
      bodyText: defaults.bodyText,
      updatedAt: null,
      isCustom: false,
    };
  }

  return {
    formType,
    subject: stored.subject,
    bodyText: normalizeBodyTextForDisplay(stored.bodyText),
    updatedAt: stored.updatedAt,
    isCustom: true,
  };
}

export async function getFormAcknowledgementTemplate(
  formType: FormAcknowledgementType,
): Promise<FormAcknowledgementTemplate> {
  const stored = await prisma.formAcknowledgementTemplate.findUnique({
    where: { formType },
    select: {
      subject: true,
      bodyText: true,
      updatedAt: true,
    },
  });

  return toTemplate(formType, stored);
}

export async function getAllFormAcknowledgementTemplates(): Promise<
  FormAcknowledgementTemplate[]
> {
  const stored = await prisma.formAcknowledgementTemplate.findMany({
    select: {
      formType: true,
      subject: true,
      bodyText: true,
      updatedAt: true,
    },
  });

  const storedByType = new Map(
    stored.map((template) => [template.formType, template]),
  );

  return (
    Object.keys(
      DEFAULT_FORM_ACKNOWLEDGEMENT_TEMPLATES,
    ) as FormAcknowledgementType[]
  ).map((formType) => toTemplate(formType, storedByType.get(formType) ?? null));
}
