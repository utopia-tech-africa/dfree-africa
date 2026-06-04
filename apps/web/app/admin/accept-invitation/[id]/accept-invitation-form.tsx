"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";

type AcceptInvitationFormProps = {
  invitationId: string;
};

export function AcceptInvitationForm({
  invitationId,
}: AcceptInvitationFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async () => {
    setError(null);
    setIsLoading(true);

    const { error: acceptError } =
      await authClient.organization.acceptInvitation({
        invitationId,
      });

    setIsLoading(false);

    if (acceptError) {
      setError(acceptError.message ?? "Could not accept invitation.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="space-y-4">
      {error ? (
        <p className="text-sm text-tertiary-500" role="alert">
          {error}
        </p>
      ) : null}
      <Button
        type="button"
        className="w-full"
        disabled={isLoading}
        onClick={handleAccept}
      >
        {isLoading ? "Accepting…" : "Accept invitation"}
      </Button>
    </div>
  );
}
