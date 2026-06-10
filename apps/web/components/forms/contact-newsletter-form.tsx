"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormFieldError } from "@/lib/forms/form-field-error";
import {
  newsletterSignupSchema,
  type NewsletterSignupValues,
} from "@/lib/forms/schemas/newsletter";

export function ContactNewsletterForm() {
  const t = useTranslations("contactUs");

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
    console.log("Newsletter signup:", data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-full"
      noValidate
    >
      <div className="space-y-1">
        <Input
          type="text"
          placeholder={t("placeholderName")}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.name)}
          className="w-full rounded-full border border-neutral-100 bg-transparent px-5 py-6 placeholder:text-sm placeholder:text-neutral-300"
          {...register("name")}
        />
        <FormFieldError message={errors.name?.message} />
      </div>

      <div className="space-y-1">
        <Input
          type="email"
          placeholder={t("placeholderText")}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.email)}
          className="w-full rounded-full border border-neutral-100 bg-transparent px-5 py-6 placeholder:text-sm placeholder:text-neutral-300"
          {...register("email")}
        />
        <FormFieldError message={errors.email?.message} />
      </div>

      <Button
        type="submit"
        className="w-full py-6 font-bold rounded-full bg-white text-neutral-1000 hover:bg-neutral-100 transition"
        variant="secondary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "…" : t("buttonText")}
      </Button>
    </form>
  );
}
