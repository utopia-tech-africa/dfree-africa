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

export function FooterNewsletterForm() {
  const t = useTranslations("footer");

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

  const inputClassName =
    "w-full rounded-[100px] border border-neutral-100 bg-transparent px-5 py-6 placeholder:text-neutral-300 focus:outline-none md:min-w-75 md:flex-1 md:py-3 lg:min-w-62.5";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-3"
      noValidate
    >
      <div className="space-y-1">
        <Input
          type="text"
          placeholder={t("enterFullName")}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.name)}
          className={inputClassName}
          {...register("name")}
        />
        <FormFieldError message={errors.name?.message} />
      </div>

      <div className="space-y-1">
        <Input
          type="email"
          placeholder={t("enterEmail")}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.email)}
          className={inputClassName}
          {...register("email")}
        />
        <FormFieldError message={errors.email?.message} />
      </div>

      <Button
        type="submit"
        className="w-full py-6 font-bold md:w-auto"
        variant="secondary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "…" : t("submit")}
      </Button>
    </form>
  );
}
