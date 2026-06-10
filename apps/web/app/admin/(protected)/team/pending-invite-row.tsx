"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getInvitationExpiryLabel } from "@/lib/admin/invitation-expiry";
import { PendingInvitationActions } from "@/app/admin/(protected)/team/pending-invitation-actions";

type PendingInviteRowProps = {
  invitationId: string;
  email: string;
  role: string;
  organizationId: string;
  expiresAt: Date;
  canManage: boolean;
  index: number;
};

export function PendingInviteRow({
  invitationId,
  email,
  role,
  organizationId,
  expiresAt,
  canManage,
  index,
}: PendingInviteRowProps) {
  const expiry = getInvitationExpiryLabel(expiresAt);

  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-700 ring-1 ring-amber-200">
          <Mail className="size-4" aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="truncate font-medium text-neutral-1000">{email}</p>
          <p className="text-sm text-neutral-700">
            Role: {role ?? "member"} · {expiry.label}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:justify-end">
        <Badge
          variant={expiry.isExpired ? "expired" : "pending"}
          className="shrink-0"
        >
          {expiry.isExpired ? "Expired" : "Pending"}
        </Badge>
        {canManage ? (
          <PendingInvitationActions
            invitationId={invitationId}
            email={email}
            role={role ?? "admin"}
            organizationId={organizationId}
          />
        ) : null}
      </div>
    </motion.li>
  );
}
