"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormFieldError } from "@/lib/forms/form-field-error";
import {
  inviteAdminSchema,
  type InviteAdminValues,
} from "@/lib/forms/schemas/admin";

type InviteAdminFormProps = {
  organizationId: string;
};

export function InviteAdminForm({ organizationId }: InviteAdminFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InviteAdminValues>({
    resolver: zodResolver(inviteAdminSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: InviteAdminValues) => {
    setMessage(null);
    setServerError(null);

    const { error: inviteError } = await authClient.organization.inviteMember({
      email: values.email,
      role: "admin",
      organizationId,
    });

    if (inviteError) {
      setServerError(inviteError.message ?? "Failed to send invitation.");
      return;
    }

    reset();
    setMessage("Invitation sent. Check the pending list below.");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 sm:flex-row sm:items-end"
      noValidate
    >
      <div className="flex-1 space-y-2">
        <Label htmlFor="invite-email">Email address</Label>
        <Input
          id="invite-email"
          type="email"
          placeholder="colleague@example.com"
          aria-invalid={Boolean(errors.email)}
          disabled={isSubmitting}
          {...register("email")}
        />
        <FormFieldError message={errors.email?.message} />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send invite"}
      </Button>
      <AnimatePresence mode="wait">
        {message ? (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-primary-600 sm:basis-full"
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
            className="text-sm text-tertiary-500 sm:basis-full"
            role="alert"
          >
            {serverError}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
