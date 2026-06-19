import { AutoResponseForm } from "@/app/admin/(protected)/auto-responses/auto-response-form";
import { getAllFormAcknowledgementTemplates } from "@/lib/form-acknowledgements/get-templates";

export default async function AdminAutoResponsesPage() {
  const templates = await getAllFormAcknowledgementTemplates();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-space-grotesk text-3xl font-bold text-primary-700">
          Auto Responses
        </h1>
        <p className="mt-2 max-w-3xl text-neutral-800">
          Customize the automatic email replies sent after someone submits a
          form. Write plain text messages — we format them into emails
          automatically. Changes apply to new submissions immediately.
        </p>
      </div>

      <div className="space-y-6">
        {templates.map((template) => (
          <AutoResponseForm
            key={template.formType}
            template={{
              ...template,
              updatedAt: template.updatedAt?.toISOString() ?? null,
            }}
          />
        ))}
      </div>
    </div>
  );
}
