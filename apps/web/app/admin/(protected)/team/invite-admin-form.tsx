"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InviteAdminFormProps = {
  organizationId: string;
};

export function InviteAdminForm({ organizationId }: InviteAdminFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setError(null);
    setIsLoading(true);

    const { error: inviteError } = await authClient.organization.inviteMember({
      email,
      role: "admin",
      organizationId,
    });

    setIsLoading(false);

    if (inviteError) {
      setError(inviteError.message ?? "Failed to send invitation.");
      return;
    }

    setEmail("");
    setMessage("Invitation sent. Check the pending list below.");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 sm:flex-row sm:items-end"
    >
      <div className="flex-1 space-y-2">
        <Label htmlFor="invite-email">Email address</Label>
        <Input
          id="invite-email"
          type="email"
          required
          placeholder="colleague@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Sending…" : "Send invite"}
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
        {error ? (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-tertiary-500 sm:basis-full"
            role="alert"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
