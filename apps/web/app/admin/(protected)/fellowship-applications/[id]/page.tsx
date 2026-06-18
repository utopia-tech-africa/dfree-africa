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
