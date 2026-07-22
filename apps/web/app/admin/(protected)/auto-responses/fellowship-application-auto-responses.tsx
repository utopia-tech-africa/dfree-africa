"use client";

import { AutoResponseForm } from "@/app/admin/(protected)/auto-responses/auto-response-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FELLOWSHIP_APPLICATION_AUTO_RESPONSE_TAB_LABELS,
  FELLOWSHIP_APPLICATION_AUTO_RESPONSE_TYPES,
} from "@/lib/form-acknowledgements/constants";
import type { FormAcknowledgementTemplateClient } from "@/lib/form-acknowledgements/types";

type FellowshipApplicationAutoResponsesProps = {
  templates: FormAcknowledgementTemplateClient[];
};

export function FellowshipApplicationAutoResponses({
  templates,
}: FellowshipApplicationAutoResponsesProps) {
  const byType = new Map(
    templates.map((template) => [template.formType, template]),
  );

  const orderedTemplates = FELLOWSHIP_APPLICATION_AUTO_RESPONSE_TYPES.flatMap(
    (formType) => {
      const template = byType.get(formType);
      return template ? [template] : [];
    },
  );

  if (orderedTemplates.length === 0) {
    return null;
  }

  const defaultTab = orderedTemplates[0]?.formType;

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="gap-3">
        <CardTitle>Fellowship applications</CardTitle>
        <CardDescription>
          Emails sent when someone applies, and when you change their review
          status. Switch tabs to edit each message.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={defaultTab} className="gap-4">
          <TabsList
            variant="line"
            className="h-auto w-full flex-wrap justify-start gap-1 overflow-x-auto"
          >
            {orderedTemplates.map((template) => (
              <TabsTrigger
                key={template.formType}
                value={template.formType}
                className="flex-none px-3"
              >
                {
                  FELLOWSHIP_APPLICATION_AUTO_RESPONSE_TAB_LABELS[
                    template.formType as (typeof FELLOWSHIP_APPLICATION_AUTO_RESPONSE_TYPES)[number]
                  ]
                }
              </TabsTrigger>
            ))}
          </TabsList>

          {orderedTemplates.map((template) => (
            <TabsContent
              key={template.formType}
              value={template.formType}
              className="mt-2"
            >
              <AutoResponseForm
                key={template.formType}
                template={template}
                embedded
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
