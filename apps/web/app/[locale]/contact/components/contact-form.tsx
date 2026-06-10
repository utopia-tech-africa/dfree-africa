"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/forms/schemas/contact";
import { FormFieldError } from "@/lib/forms/form-field-error";

export const ContactForm = () => {
  const t = useTranslations("contactUs");

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    console.log("Form Submitted:", data);
    reset();
  };

  return (
    <div className="order-1 lg:order-2">
      <div className="rounded-3xl bg-white p-4 md:p-6 shadow-xl text-neutral-1000 max-w-xl mx-auto lg:w-full border-12 border-black/20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <div className="space-y-1.5">
            <label
              htmlFor="fullName"
              className="block text-sm md:text-base font-poppins text-neutral-900"
            >
              {t("fullNameLabel")} <span className="text-tertiary-400">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              disabled={isSubmitting}
              placeholder="John Doe"
              aria-invalid={Boolean(errors.fullName)}
              {...register("fullName")}
              className="w-full rounded-full border border-neutral-300 bg-transparent px-5 py-3 text-neutral-800 text-sm md:text-base placeholder:text-neutral-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition"
            />
            <FormFieldError message={errors.fullName?.message} />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm md:text-base font-poppins text-neutral-900"
            >
              {t("emailLabel")} <span className="text-tertiary-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              disabled={isSubmitting}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
              className="w-full rounded-full border border-neutral-300 bg-transparent px-5 py-3 text-neutral-800 text-sm md:text-base placeholder:text-neutral-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition"
            />
            <FormFieldError message={errors.email?.message} />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="phone"
              className="block text-sm md:text-base font-poppins text-neutral-900"
            >
              {t("phoneLabel")} <span className="text-tertiary-400">*</span>
            </label>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <PhoneInput
                  id="phone"
                  international
                  defaultCountry="GH"
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                  className="w-full bg-transparent text-neutral-800 flex items-center rounded-full border border-neutral-300 px-4 py-3 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition [&_input]:bg-transparent [&_input]:outline-none [&_input]:w-full [&_input]:pl-2 [&_select]:bg-transparent [&_select]:outline-none [&_select]:border-none [&_select]:cursor-pointer"
                />
              )}
            />
            <FormFieldError message={errors.phone?.message} />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="block text-sm md:text-base font-poppins text-neutral-900"
            >
              {t("messageLabel")}
            </label>
            <textarea
              id="message"
              placeholder="Your message"
              rows={4}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.message)}
              {...register("message")}
              className="w-full rounded-2xl border border-neutral-300 bg-transparent px-5 py-3 text-neutral-800 text-sm md:text-base placeholder:text-neutral-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition resize-none"
            />
            <FormFieldError message={errors.message?.message} />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white py-3.5 mt-2 transition duration-200 cursor-pointer shadow-md text-sm md:text-base font-bold"
          >
            {isSubmitting ? "Submitting..." : t("buttonText")}
          </button>
        </form>
      </div>
    </div>
  );
};
