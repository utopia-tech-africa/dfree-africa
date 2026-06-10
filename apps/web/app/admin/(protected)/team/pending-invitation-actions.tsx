"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";

type InviteRole = "admin" | "member" | "owner";

function toInviteRole(role: string): InviteRole {
  if (role === "owner" || role === "member" || role === "admin") {
    return role;
  }
  return "admin";
}

type PendingInvitationActionsProps = {
  invitationId: string;
  email: string;
  role: string;
  organizationId: string;
};

export function PendingInvitationActions({
  invitationId,
  email,
  role,
  organizationId,
}: PendingInvitationActionsProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);

  const handleResend = async () => {
    setError(null);
    setStatus(null);
    setIsResending(true);

    const { error: resendError } = await authClient.organization.inviteMember({
      email,
      role: toInviteRole(role),
      organizationId,
      resend: true,
    });

    setIsResending(false);

    if (resendError) {
      setError(resendError.message ?? "Failed to resend invitation.");
      return;
    }

    setStatus("Invitation email resent.");
    router.refresh();
  };

  const handleRevoke = async () => {
    const confirmed = window.confirm(
      `Revoke the invitation for ${email}? They will no longer be able to accept it.`,
    );
    if (!confirmed) {
      return;
    }

    setError(null);
    setStatus(null);
    setIsRevoking(true);

    const { error: cancelError } =
      await authClient.organization.cancelInvitation({
        invitationId,
      });

    setIsRevoking(false);

    if (cancelError) {
      setError(cancelError.message ?? "Failed to revoke invitation.");
      return;
    }

    router.refresh();
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex flex-wrap justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isResending || isRevoking}
          onClick={handleResend}
        >
          {isResending ? "Resending…" : "Resend"}
        </Button>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          disabled={isResending || isRevoking}
          onClick={handleRevoke}
        >
          {isRevoking ? "Revoking…" : "Revoke"}
        </Button>
      </div>
      {status ? (
        <p className="text-xs text-primary-600" role="status">
          {status}
        </p>
      ) : null}
      {error ? (
        <p className="text-xs text-tertiary-500" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
