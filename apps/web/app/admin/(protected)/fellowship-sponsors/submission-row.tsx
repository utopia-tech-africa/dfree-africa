import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatSponsorshipTier } from "@/lib/fellowship-sponsors/format-tier";
import type { FellowshipSponsorSummary } from "@/lib/fellowship-sponsors/types";

type SubmissionRowProps = {
  submission: FellowshipSponsorSummary;
  variant?: "default" | "compact";
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

function getInitials(firstName: string, lastName: string, email: string) {
  const name = `${firstName} ${lastName}`.trim();
  const parts = name.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }

  const source = name || email;
  return source.slice(0, 2).toUpperCase();
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
  const tierLabel = formatSponsorshipTier(
    submission.sponsorshipTier,
    submission.customFellowCount,
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
          <Badge variant="secondary">{tierLabel}</Badge>
          <time
            className="text-sm text-neutral-700"
            dateTime={submission.createdAt.toISOString()}
          >
            {dateFormatter.format(submission.createdAt)}
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

      <td className="px-6 py-4 align-middle">
        <p className="truncate text-sm text-neutral-800">
          {submission.organization}
        </p>
      </td>

      <td className="px-6 py-4 align-middle">
        <Badge variant="secondary">{tierLabel}</Badge>
      </td>

      <td className="px-6 py-4 align-middle">
        <time
          className="whitespace-nowrap text-sm text-neutral-700"
          dateTime={submission.createdAt.toISOString()}
        >
          {dateFormatter.format(submission.createdAt)}
        </time>
      </td>

      <td className="px-6 py-4 text-right align-middle">{viewButton}</td>
    </tr>
  );
}
