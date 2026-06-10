"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormFieldError } from "@/lib/forms/form-field-error";
import {
  newsletterEmailSchema,
  type NewsletterEmailValues,
} from "@/lib/forms/schemas/newsletter";

export function FooterNewsletterForm() {
  const t = useTranslations("footer");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterEmailValues>({
    resolver: zodResolver(newsletterEmailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: NewsletterEmailValues) => {
    console.log("Newsletter signup:", data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-3 md:flex-row md:items-start"
      noValidate
    >
      <div className="flex w-full flex-col gap-1 md:min-w-75 md:flex-1 lg:min-w-62.5">
        <Input
          type="email"
          placeholder={t("enterEmail")}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.email)}
          className="w-full rounded-[100px] border border-neutral-100 bg-transparent px-2 py-6 placeholder:text-sm placeholder:text-neutral-300 focus:outline-none md:px-5"
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
