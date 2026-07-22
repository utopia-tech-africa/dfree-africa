"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateFellowshipApplicationReviewStatus } from "@/lib/fellowship-applications/actions";
import {
  FELLOWSHIP_APPLICATION_REVIEW_STATUSES,
  FELLOWSHIP_APPLICATION_REVIEW_STATUS_LABELS,
  type FellowshipApplicationReviewStatus,
} from "@/lib/fellowship-applications/review-status";

type ReviewStatusControlProps = {
  applicationId: string;
  initialStatus: FellowshipApplicationReviewStatus;
  reviewedAt: string | null;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function ReviewStatusControl({
  applicationId,
  initialStatus,
  reviewedAt,
}: ReviewStatusControlProps) {
  const router = useRouter();
  const [status, setStatus] =
    useState<FellowshipApplicationReviewStatus>(initialStatus);
  const [savedStatus, setSavedStatus] =
    useState<FellowshipApplicationReviewStatus>(initialStatus);
  const [lastReviewedAt, setLastReviewedAt] = useState(reviewedAt);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    setError(null);
    setMessage(null);

    startTransition(async () => {
      const result = await updateFellowshipApplicationReviewStatus(
        applicationId,
        status,
      );

      if (!result.success) {
        setError(result.error);
        return;
      }

      setStatus(result.reviewStatus);
      setSavedStatus(result.reviewStatus);
      setLastReviewedAt(result.reviewedAt);
      setMessage(
        result.emailSent
          ? "Review status updated and applicant notified by email."
          : "Review status updated. Applicant email was not sent (check SES / EMAIL_FROM).",
      );
      router.refresh();
    });
  };

  return (
    <div className="space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
      <div>
        <h2 className="font-space-grotesk text-lg font-semibold text-primary-700">
          Review workflow
        </h2>
        <p className="mt-1 text-sm text-neutral-700">
          Move this application through pending, under review, accepted,
          rejected, or waitlisted. Changing status emails the applicant using
          the matching template under Auto-responses.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="space-y-1.5">
          <label
            htmlFor="review-status"
            className="text-sm font-medium text-neutral-700"
          >
            Status
          </label>
          <Select
            value={status}
            onValueChange={(value) => {
              if (
                FELLOWSHIP_APPLICATION_REVIEW_STATUSES.includes(
                  value as FellowshipApplicationReviewStatus,
                )
              ) {
                setStatus(value as FellowshipApplicationReviewStatus);
                setMessage(null);
              }
            }}
            disabled={isPending}
          >
            <SelectTrigger
              id="review-status"
              className="min-w-[12rem] bg-white"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FELLOWSHIP_APPLICATION_REVIEW_STATUSES.map((value) => (
                <SelectItem key={value} value={value}>
                  {FELLOWSHIP_APPLICATION_REVIEW_STATUS_LABELS[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="button"
          onClick={handleSave}
          disabled={isPending || status === savedStatus}
        >
          {isPending ? "Saving…" : "Update status"}
        </Button>
      </div>

      {lastReviewedAt ? (
        <p className="text-sm text-neutral-600">
          Last updated {dateFormatter.format(new Date(lastReviewedAt))}
        </p>
      ) : null}

      {message ? (
        <p className="text-sm text-primary-700" role="status">
          {message}
        </p>
      ) : null}

      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
