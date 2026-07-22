import { AutoResponseForm } from "@/app/admin/(protected)/auto-responses/auto-response-form";
import { FellowshipApplicationAutoResponses } from "@/app/admin/(protected)/auto-responses/fellowship-application-auto-responses";
import { FELLOWSHIP_APPLICATION_AUTO_RESPONSE_TYPES } from "@/lib/form-acknowledgements/constants";
import { getAllFormAcknowledgementTemplates } from "@/lib/form-acknowledgements/get-templates";
import type { FormAcknowledgementTemplate } from "@/lib/form-acknowledgements/types";

const FELLOWSHIP_APPLICATION_TYPE_SET = new Set<string>(
  FELLOWSHIP_APPLICATION_AUTO_RESPONSE_TYPES,
);

function toClientTemplate(template: FormAcknowledgementTemplate) {
  return {
    ...template,
    updatedAt: template.updatedAt?.toISOString() ?? null,
  };
}

export default async function AdminAutoResponsesPage() {
  const templates = await getAllFormAcknowledgementTemplates();

  const fellowshipTemplates = templates
    .filter((template) =>
      FELLOWSHIP_APPLICATION_TYPE_SET.has(template.formType),
    )
    .map(toClientTemplate);

  const standaloneTemplates = templates
    .filter(
      (template) => !FELLOWSHIP_APPLICATION_TYPE_SET.has(template.formType),
    )
    .map(toClientTemplate);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-space-grotesk text-3xl font-bold text-primary-700">
          Auto Responses
        </h1>
        <p className="mt-2 max-w-3xl text-neutral-800">
          Customize the automatic email replies sent after someone submits a
          form, or when a fellowship application status changes. Write plain
          text messages — we format them into emails automatically. Changes
          apply immediately.
        </p>
      </div>

      <div className="space-y-6">
        <FellowshipApplicationAutoResponses templates={fellowshipTemplates} />

        {standaloneTemplates.map((template) => (
          <AutoResponseForm key={template.formType} template={template} />
        ))}
      </div>
    </div>
  );
}
