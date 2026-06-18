"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormFieldError } from "@/lib/forms/form-field-error";
import { subscribeToNewsletter } from "@/lib/forms/subscribe-newsletter";
import {
  newsletterSignupSchema,
  type NewsletterSignupValues,
} from "@/lib/forms/schemas/newsletter";

export function ContactNewsletterForm() {
  const t = useTranslations("contactUs");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterSignupValues>({
    resolver: zodResolver(newsletterSignupSchema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = async (data: NewsletterSignupValues) => {
    setFeedback(null);

    const result = await subscribeToNewsletter({
      ...data,
      source: "contact",
    });

    if (result.success) {
      reset();
      setFeedback({
        type: "success",
        message: t("newsletterSuccess"),
      });
      return;
    }

    setFeedback({
      type: "error",
      message: t("newsletterError"),
    });
  };

  const inputClassName =
    "h-auto min-h-14 w-full rounded-full border border-neutral-100 bg-transparent px-5 py-6 text-neutral-100 placeholder:text-sm placeholder:text-neutral-300";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-3"
      noValidate
    >
      <div className="space-y-1">
        <Input
          id="contact-newsletter-name"
          type="text"
          autoComplete="name"
          placeholder={t("placeholderName")}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.name)}
          className={inputClassName}
          {...register("name")}
        />
        <FormFieldError
          message={errors.name?.message}
          className="text-sm text-neutral-200"
        />
      </div>

      <div className="space-y-1">
        <Input
          id="contact-newsletter-email"
          type="email"
          autoComplete="email"
          placeholder={t("placeholderText")}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.email)}
          className={inputClassName}
          {...register("email")}
        />
        <FormFieldError
          message={errors.email?.message}
          className="text-sm text-neutral-200"
        />
      </div>

      <Button
        type="submit"
        className="w-full rounded-full bg-white py-6 font-bold text-neutral-1000 transition hover:bg-neutral-100"
        variant="secondary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "…" : t("buttonText")}
      </Button>

      {feedback ? (
        <p
          className={
            feedback.type === "success"
              ? "text-sm text-neutral-100"
              : "text-sm text-neutral-200"
          }
          role={feedback.type === "success" ? "status" : "alert"}
        >
          {feedback.message}
        </p>
      ) : null}
    </form>
  );
}
