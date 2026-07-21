import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFellowshipApplicationById } from "@/lib/fellowship-applications/get-submissions";
import { FELLOWSHIP_APPLICATION_REVIEW_STATUS_LABELS } from "@/lib/fellowship-applications/review-status";

import { ReviewStatusControl } from "./review-status-control";
import { SubmissionDetail } from "./submission-detail";

type FellowshipApplicationDetailPageProps = {
  params: Promise<{ id: string }>;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatCohortTerm(cohortTerm: string) {
  if (cohortTerm === "spring") {
    return "Spring cohort";
  }

  if (cohortTerm === "fall") {
    return "Fall cohort";
  }

  return cohortTerm;
}

function reviewBadgeClassName(status: string) {
  switch (status) {
    case "accepted":
      return "bg-emerald-100 text-emerald-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "waitlisted":
      return "bg-violet-100 text-violet-800";
    case "under_review":
      return "bg-sky-100 text-sky-800";
    default:
      return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  }
}

export default async function FellowshipApplicationDetailPage({
  params,
}: FellowshipApplicationDetailPageProps) {
  const { id } = await params;
  const submission = await getFellowshipApplicationById(id);

  if (!submission) {
    notFound();
  }

  const applicantName =
    `${submission.payload.firstName} ${submission.payload.lastName}`.trim();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Button asChild variant="outline" size="sm">
          <Link
            href="/admin/fellowship-applications"
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to applications
          </Link>
        </Button>

        <div className="space-y-3">
          <h1 className="font-space-grotesk text-3xl font-bold text-primary-700">
            {applicantName}
          </h1>
          <p className="text-neutral-800">{submission.payload.email}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className={reviewBadgeClassName(submission.reviewStatus)}
            >
              {
                FELLOWSHIP_APPLICATION_REVIEW_STATUS_LABELS[
                  submission.reviewStatus
                ]
              }
            </Badge>
            <Badge variant="default">
              {formatCohortTerm(submission.payload.cohortTerm)}
            </Badge>
            <Badge variant="secondary">
              Submitted {dateFormatter.format(submission.createdAt)}
            </Badge>
            <Badge
              variant={submission.acknowledgementSentAt ? "default" : "pending"}
            >
              {submission.acknowledgementSentAt
                ? "Acknowledgement email sent"
                : "Acknowledgement email pending"}
            </Badge>
          </div>
        </div>
      </div>

      <ReviewStatusControl
        applicationId={submission.id}
        initialStatus={submission.reviewStatus}
        reviewedAt={
          submission.reviewedAt ? submission.reviewedAt.toISOString() : null
        }
      />

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle>Application details</CardTitle>
          <CardDescription>
            Fellowship application submitted through the public form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubmissionDetail payload={submission.payload} />
        </CardContent>
      </Card>
    </div>
  );
}
