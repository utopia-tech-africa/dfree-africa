import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFellowshipSponsorSummaries } from "@/lib/fellowship-sponsors/get-submissions";

import { FellowshipSponsorsEmptyState } from "./fellowship-sponsors-empty-state";
import { SubmissionsTable } from "./submissions-table";

export default async function FellowshipSponsorsPage() {
  const submissions = await getFellowshipSponsorSummaries();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-space-grotesk text-3xl font-bold text-primary-700">
          Fellowship Sponsors
        </h1>
        <p className="mt-2 text-neutral-800">
          {submissions.length} sponsor inquir
          {submissions.length === 1 ? "y" : "ies"} received.
        </p>
      </div>

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
          <CardDescription>
            Sponsorship inquiries submitted through the Leadership Institute
            sponsor form.
          </CardDescription>
        </CardHeader>
        <CardContent className={submissions.length ? "p-0" : undefined}>
          {submissions.length ? (
            <SubmissionsTable submissions={submissions} />
          ) : (
            <FellowshipSponsorsEmptyState />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
