"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormFieldLabel,
  formFieldGroupClassName,
} from "@/components/forms/form-field-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FORM_ACKNOWLEDGEMENT_LABELS,
  NAME_PLACEHOLDER,
} from "@/lib/form-acknowledgements/constants";
import {
  resetFormAcknowledgementTemplateAction,
  saveFormAcknowledgementTemplate,
} from "@/lib/form-acknowledgements/actions";
import type { FormAcknowledgementTemplateClient } from "@/lib/form-acknowledgements/types";
import { FormFieldError } from "@/lib/forms/form-field-error";
import {
  formAcknowledgementTemplateSchema,
  type FormAcknowledgementTemplateValues,
} from "@/lib/forms/schemas/form-acknowledgement-template";

type AutoResponseFormProps = {
  template: FormAcknowledgementTemplateClient;
};

function formatUpdatedAt(updatedAt: string | null) {
  if (!updatedAt) {
    return null;
  }

  const date = new Date(updatedAt);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function AutoResponseForm({ template }: AutoResponseFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const labels = FORM_ACKNOWLEDGEMENT_LABELS[template.formType];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormAcknowledgementTemplateValues>({
    resolver: zodResolver(formAcknowledgementTemplateSchema),
    defaultValues: {
      formType: template.formType,
      subject: template.subject,
      bodyText: template.bodyText,
    },
  });

  const onSubmit = async (values: FormAcknowledgementTemplateValues) => {
    setMessage(null);
    setServerError(null);

    const result = await saveFormAcknowledgementTemplate(values);

    if (!result.success) {
      setServerError(result.error);
      return;
    }

    setMessage("Auto-response saved.");
    router.refresh();
  };

  const handleReset = async () => {
    const confirmed = window.confirm(
      `Reset the ${labels.title.toLowerCase()} auto-response to the default message?`,
    );

    if (!confirmed) {
      return;
    }

    setMessage(null);
    setServerError(null);
    setIsResetting(true);

    const result = await resetFormAcknowledgementTemplateAction(
      template.formType,
    );

    setIsResetting(false);

    if (!result.success) {
      setServerError(result.error);
      return;
    }

    setMessage("Auto-response reset to default.");
    router.refresh();
  };

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <CardTitle>{labels.title}</CardTitle>
          <Badge variant={template.isCustom ? "default" : "secondary"}>
            {template.isCustom ? "Custom" : "Default"}
          </Badge>
        </div>
        <CardDescription>{labels.description}</CardDescription>
        {template.updatedAt ? (
          <p className="text-xs text-neutral-600">
            Last updated {formatUpdatedAt(template.updatedAt)}
          </p>
        ) : null}
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <input type="hidden" {...register("formType")} />

          <div className={formFieldGroupClassName}>
            <FormFieldLabel htmlFor={`${template.formType}-subject`}>
              Email subject
            </FormFieldLabel>
            <Input
              id={`${template.formType}-subject`}
              aria-invalid={Boolean(errors.subject)}
              disabled={isSubmitting || isResetting}
              {...register("subject")}
            />
            <FormFieldError message={errors.subject?.message} />
          </div>

          <div className={formFieldGroupClassName}>
            <FormFieldLabel htmlFor={`${template.formType}-body`}>
              Message
            </FormFieldLabel>
            <Textarea
              id={`${template.formType}-body`}
              aria-invalid={Boolean(errors.bodyText)}
              disabled={isSubmitting || isResetting}
              {...register("bodyText")}
            />
            <p className="text-xs text-neutral-600">
              Write the email in plain text. Use a blank line between
              paragraphs. Include{" "}
              <code className="rounded bg-neutral-200 px-1 py-0.5 text-[11px]">
                {NAME_PLACEHOLDER}
              </code>{" "}
              where the submitter&apos;s name should appear.
            </p>
            <FormFieldError message={errors.bodyText?.message} />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="submit"
              disabled={isSubmitting || isResetting || !isDirty}
            >
              {isSubmitting ? "Saving…" : "Save changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting || isResetting || !template.isCustom}
              onClick={handleReset}
            >
              {isResetting ? "Resetting…" : "Reset to default"}
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {message ? (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-primary-600"
                role="status"
              >
                {message}
              </motion.p>
            ) : null}
            {serverError ? (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-tertiary-500"
                role="alert"
              >
                {serverError}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </form>
      </CardContent>
    </Card>
  );
}
