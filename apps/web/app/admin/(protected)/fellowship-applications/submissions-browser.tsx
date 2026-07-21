"use client";

import { Download } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FELLOWSHIP_APPLICATION_REVIEW_STATUSES,
  FELLOWSHIP_APPLICATION_REVIEW_STATUS_LABELS,
  type FellowshipApplicationReviewStatus,
} from "@/lib/fellowship-applications/review-status";
import type { FellowshipApplicationSummary } from "@/lib/fellowship-applications/types";
import { cn } from "@/lib/utils";

import { SubmissionsTable } from "./submissions-table";

type SubmissionsBrowserProps = {
  submissions: FellowshipApplicationSummary[];
};

type CohortFilter = "all" | "spring" | "fall";
type AckFilter = "all" | "sent" | "pending";
type StatusFilter = "all" | FellowshipApplicationReviewStatus;

export function SubmissionsBrowser({ submissions }: SubmissionsBrowserProps) {
  const [query, setQuery] = useState("");
  const [cohort, setCohort] = useState<CohortFilter>("all");
  const [acknowledgement, setAcknowledgement] = useState<AckFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return submissions.filter((submission) => {
      if (cohort !== "all" && submission.cohortTerm !== cohort) {
        return false;
      }

      if (status !== "all" && submission.reviewStatus !== status) {
        return false;
      }

      if (acknowledgement === "sent" && !submission.acknowledgementSentAt) {
        return false;
      }

      if (acknowledgement === "pending" && submission.acknowledgementSentAt) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack =
        `${submission.firstName} ${submission.lastName} ${submission.email}`.toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [acknowledgement, cohort, query, status, submissions]);

  const handleExport = async () => {
    setExportError(null);
    setIsExporting(true);

    try {
      const params = new URLSearchParams();
      if (status !== "all") {
        params.set("status", status);
      }
      if (cohort !== "all") {
        params.set("cohort", cohort);
      }

      const queryString = params.toString();
      const response = await fetch(
        `/api/admin/fellowship-applications/export${queryString ? `?${queryString}` : ""}`,
      );

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const stamp = new Date().toISOString().slice(0, 10);
      link.href = url;
      link.download = `fellowship-applications-${stamp}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      setExportError("Could not export applications. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 px-6 pt-2 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full max-w-sm space-y-1.5">
          <label
            htmlFor="application-search"
            className="text-sm font-medium text-neutral-700"
          >
            Search
          </label>
          <Input
            id="application-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name or email"
            className="rounded-full"
          />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleExport}
          disabled={isExporting || submissions.length === 0}
          className="shrink-0"
        >
          <Download className="size-4" aria-hidden />
          {isExporting ? "Exporting…" : "Export CSV"}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 px-6">
        {(
          [
            ["all", "All cohorts"],
            ["spring", "Spring"],
            ["fall", "Fall"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setCohort(value)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              cohort === value
                ? "border-primary-500 bg-primary-500 text-white"
                : "border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 px-6">
        <button
          type="button"
          onClick={() => setStatus("all")}
          className={cn(
            "rounded-full border px-3 py-1.5 text-sm transition-colors",
            status === "all"
              ? "border-primary-500 bg-primary-500 text-white"
              : "border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50",
          )}
        >
          All statuses
        </button>
        {FELLOWSHIP_APPLICATION_REVIEW_STATUSES.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setStatus(value)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              status === value
                ? "border-primary-500 bg-primary-500 text-white"
                : "border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50",
            )}
          >
            {FELLOWSHIP_APPLICATION_REVIEW_STATUS_LABELS[value]}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 px-6">
        {(
          [
            ["all", "All emails"],
            ["sent", "Ack sent"],
            ["pending", "Ack pending"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setAcknowledgement(value)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              acknowledgement === value
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
        {status !== "all" || cohort !== "all"
          ? " · CSV export uses status and cohort filters"
          : null}
      </p>

      {exportError ? (
        <p className="px-6 text-sm text-red-700" role="alert">
          {exportError}
        </p>
      ) : null}

      {filtered.length ? (
        <SubmissionsTable submissions={filtered} />
      ) : (
        <p className="px-6 pb-6 text-sm text-neutral-700">
          No applications match your filters.
        </p>
      )}
    </div>
  );
}
