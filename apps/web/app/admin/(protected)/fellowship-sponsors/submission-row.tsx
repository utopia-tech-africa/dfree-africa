import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatPaymentMethod,
  formatPaymentStatus,
} from "@/lib/fellowship-sponsors/format-payment-method";
import {
  formatSponsorshipAmount,
  formatSponsorshipTierName,
} from "@/lib/fellowship-sponsors/format-tier";
import { getFellowCount } from "@/lib/fellowship-sponsors/sponsorship-pricing";
import type {
  FellowshipSponsorSummary,
  SponsorPaymentStatus,
} from "@/lib/fellowship-sponsors/types";
import type {
  PaymentMethodValue,
  SponsorshipTierValue,
} from "@/lib/forms/schemas/leadership-institute-sponsor";

type SubmissionRowProps = {
  submission: FellowshipSponsorSummary;
  variant?: "default" | "compact";
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

function toDate(value: Date | string) {
  return value instanceof Date ? value : new Date(value);
}

function getInitials(firstName: string, lastName: string, email: string) {
  const name = `${firstName} ${lastName}`.trim();
  const parts = name.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }

  const source = name || email;
  return source.slice(0, 2).toUpperCase();
}

function paymentBadgeClassName(status: SponsorPaymentStatus | null) {
  switch (status) {
    case "paid":
      return "bg-emerald-100 text-emerald-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
    default:
      return "bg-neutral-200 text-neutral-800";
  }
}

function paymentLabel(
  status: SponsorPaymentStatus | null,
  paymentMethod: string,
) {
  if (status) {
    return formatPaymentStatus(status);
  }

  if (
    paymentMethod === "check_ach" ||
    paymentMethod === "wire_transfer" ||
    paymentMethod === "pledge_invoice" ||
    paymentMethod === "credit_card"
  ) {
    return formatPaymentMethod(paymentMethod as PaymentMethodValue);
  }

  return "Submitted";
}

function SponsorshipCell({
  tier,
  customFellowCount,
}: {
  tier: string;
  customFellowCount: number;
}) {
  const resolvedTier = tier as SponsorshipTierValue;
  const count = getFellowCount(resolvedTier, customFellowCount);
  const fellowLabel = count === 1 ? "1 fellow" : `${count} fellows`;

  return (
    <div className="min-w-[7.5rem] space-y-0.5">
      <p className="font-medium text-neutral-1000">
        {formatSponsorshipTierName(tier)}
      </p>
      <p className="whitespace-nowrap text-sm text-neutral-800">
        {formatSponsorshipAmount(resolvedTier, customFellowCount)}
      </p>
      <p className="text-xs text-neutral-600">{fellowLabel}</p>
    </div>
  );
}

export function SubmissionRow({
  submission,
  variant = "default",
}: SubmissionRowProps) {
  const sponsorName = `${submission.firstName} ${submission.lastName}`.trim();
  const initials = getInitials(
    submission.firstName,
    submission.lastName,
    submission.email,
  );
  const isCompact = variant === "compact";
  const createdAt = toDate(submission.createdAt);
  const statusLabel = paymentLabel(
    submission.paymentStatus,
    submission.paymentMethod,
  );

  const viewButton = (
    <Button asChild variant="outline" size="sm" className="shrink-0">
      <Link href={`/admin/fellowship-sponsors/${submission.id}`}>
        View
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </Button>
  );

  if (isCompact) {
    return (
      <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-xs font-semibold text-white shadow-sm"
            aria-hidden
          >
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-neutral-1000">
              {sponsorName}
            </p>
            <p className="truncate text-sm text-neutral-700">
              {submission.organization}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <Badge
            variant="secondary"
            className={paymentBadgeClassName(submission.paymentStatus)}
          >
            {statusLabel}
          </Badge>
          <span className="text-sm text-neutral-800">
            {formatSponsorshipTierName(submission.sponsorshipTier)}
          </span>
          <time
            className="text-sm text-neutral-700"
            dateTime={createdAt.toISOString()}
          >
            {dateFormatter.format(createdAt)}
          </time>
          {viewButton}
        </div>
      </li>
    );
  }

  return (
    <tr className="border-b border-neutral-200 transition-colors last:border-b-0 hover:bg-neutral-50/80">
      <td className="px-6 py-4 align-middle">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-sm font-semibold text-white shadow-sm"
            aria-hidden
          >
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-neutral-1000">
              {sponsorName}
            </p>
            <p className="truncate text-sm text-neutral-700">
              {submission.email}
            </p>
          </div>
        </div>
      </td>

      <td className="max-w-[10rem] px-6 py-4 align-middle">
        <p className="truncate text-sm text-neutral-800">
          {submission.organization}
        </p>
      </td>

      <td className="px-6 py-4 align-middle">
        <SponsorshipCell
          tier={submission.sponsorshipTier}
          customFellowCount={submission.customFellowCount}
        />
      </td>

      <td className="px-6 py-4 align-middle">
        <Badge
          variant="secondary"
          className={paymentBadgeClassName(submission.paymentStatus)}
        >
          {statusLabel}
        </Badge>
      </td>

      <td className="px-6 py-4 align-middle">
        <time
          className="whitespace-nowrap text-sm text-neutral-700"
          dateTime={createdAt.toISOString()}
        >
          {dateFormatter.format(createdAt)}
        </time>
      </td>

      <td className="px-6 py-4 text-right align-middle">{viewButton}</td>
    </tr>
  );
}
