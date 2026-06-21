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
import { formatSponsorshipTier } from "@/lib/fellowship-sponsors/format-tier";
import { getFellowshipSponsorById } from "@/lib/fellowship-sponsors/get-submissions";

import { SubmissionDetail } from "./submission-detail";

type FellowshipSponsorDetailPageProps = {
  params: Promise<{ id: string }>;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function FellowshipSponsorDetailPage({
  params,
}: FellowshipSponsorDetailPageProps) {
  const { id } = await params;
  const submission = await getFellowshipSponsorById(id);

  if (!submission) {
    notFound();
  }

  const sponsorName =
    `${submission.payload.firstName} ${submission.payload.lastName}`.trim();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Button asChild variant="outline" size="sm">
          <Link
            href="/admin/fellowship-sponsors"
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to sponsors
          </Link>
        </Button>

        <div className="space-y-3">
          <h1 className="font-space-grotesk text-3xl font-bold text-primary-700">
            {sponsorName}
          </h1>
          <p className="text-neutral-800">{submission.payload.email}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">
              {formatSponsorshipTier(
                submission.payload.sponsorshipTier,
                submission.payload.customFellowCount,
              )}
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
          <CardTitle>Sponsor inquiry details</CardTitle>
          <CardDescription>
            Sponsorship inquiry submitted through the public form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubmissionDetail payload={submission.payload} />
        </CardContent>
      </Card>
    </div>
  );
}
