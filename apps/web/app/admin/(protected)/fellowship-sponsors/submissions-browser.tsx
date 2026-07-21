"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { formatPaymentStatus } from "@/lib/fellowship-sponsors/format-payment-method";
import type {
  FellowshipSponsorSummary,
  SponsorPaymentStatus,
} from "@/lib/fellowship-sponsors/types";
import { cn } from "@/lib/utils";

import { SubmissionsTable } from "./submissions-table";

type SubmissionsBrowserProps = {
  submissions: FellowshipSponsorSummary[];
};

type PaymentFilter = "active" | "all" | SponsorPaymentStatus;

function matchesPaymentFilter(
  submission: FellowshipSponsorSummary,
  payment: PaymentFilter,
): boolean {
  if (payment === "all") {
    return true;
  }

  if (payment === "active") {
    return submission.paymentStatus !== "cancelled";
  }

  if (payment === "pending") {
    return (
      submission.paymentStatus === "pending" ||
      submission.paymentStatus === null
    );
  }

  return submission.paymentStatus === payment;
}

export function SubmissionsBrowser({ submissions }: SubmissionsBrowserProps) {
  const [query, setQuery] = useState("");
  const [payment, setPayment] = useState<PaymentFilter>("active");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return submissions.filter((submission) => {
      if (!matchesPaymentFilter(submission, payment)) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack =
        `${submission.firstName} ${submission.lastName} ${submission.email} ${submission.organization}`.toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [payment, query, submissions]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 px-6 pt-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full max-w-sm space-y-1.5">
          <label
            htmlFor="sponsor-search"
            className="text-sm font-medium text-neutral-700"
          >
            Search
          </label>
          <Input
            id="sponsor-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, email, or organization"
            className="rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 px-6">
        {(
          [
            ["active", "Active"],
            ["all", "All"],
            ["paid", formatPaymentStatus("paid")],
            ["pending", formatPaymentStatus("pending")],
            ["cancelled", formatPaymentStatus("cancelled")],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setPayment(value)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              payment === value
                ? "border-primary-500 bg-primary-500 text-white"
                : "border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="px-6 text-sm text-neutral-600">
        Showing {filtered.length} of {submissions.length}
        {payment === "active" ? " · cancelled checkouts hidden" : null}
      </p>

      {filtered.length ? (
        <SubmissionsTable submissions={filtered} />
      ) : (
        <p className="px-6 pb-6 text-sm text-neutral-700">
          No sponsor inquiries match your filters.
        </p>
      )}
    </div>
  );
}
