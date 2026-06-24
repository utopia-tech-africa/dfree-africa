"use server";

import { getAdminSession } from "@/lib/admin/get-admin-session";
import { DEFAULT_FORM_ACKNOWLEDGEMENT_TEMPLATES } from "@/lib/form-acknowledgements/defaults";
import { getAllFormAcknowledgementTemplates } from "@/lib/form-acknowledgements/get-templates";
import {
  resetFormAcknowledgementTemplate,
  upsertFormAcknowledgementTemplate,
} from "@/lib/form-acknowledgements/upsert-template";
import type { FormAcknowledgementType } from "@/lib/form-acknowledgements/types";
import { formAcknowledgementTemplateSchema } from "@/lib/forms/schemas/form-acknowledgement-template";

type ActionResult = { success: true } | { success: false; error: string };

async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function saveFormAcknowledgementTemplate(
  values: unknown,
): Promise<ActionResult> {
  try {
    const session = await requireAdminSession();
    const parsed = formAcknowledgementTemplateSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message ?? "Invalid template data.",
      };
    }

    await upsertFormAcknowledgementTemplate({
      ...parsed.data,
      updatedBy: session.user.id,
    });

    return { success: true };
  } catch (error) {
    console.error("[auto-responses] Failed to save template:", error);
    return { success: false, error: "Failed to save auto-response." };
  }
}

export async function resetFormAcknowledgementTemplateAction(
  formType: FormAcknowledgementType,
): Promise<ActionResult> {
  try {
    await requireAdminSession();

    if (!(formType in DEFAULT_FORM_ACKNOWLEDGEMENT_TEMPLATES)) {
      return { success: false, error: "Unknown form type." };
    }

    await resetFormAcknowledgementTemplate(formType);

    return { success: true };
  } catch (error) {
    console.error("[auto-responses] Failed to reset template:", error);
    return { success: false, error: "Failed to reset auto-response." };
  }
}

export async function loadFormAcknowledgementTemplates() {
  await requireAdminSession();
  return getAllFormAcknowledgementTemplates();
}
