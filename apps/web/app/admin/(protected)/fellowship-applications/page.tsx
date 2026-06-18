import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFellowshipApplicationSummaries } from "@/lib/fellowship-applications/get-submissions";

import { FellowshipApplicationsEmptyState } from "./fellowship-applications-empty-state";
import { SubmissionsTable } from "./submissions-table";

export default async function FellowshipApplicationsPage() {
  const submissions = await getFellowshipApplicationSummaries();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-space-grotesk text-3xl font-bold text-primary-700">
          Fellowship Applications
        </h1>
        <p className="mt-2 text-neutral-800">
          {submissions.length} application
          {submissions.length === 1 ? "" : "s"} received.
        </p>
      </div>

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
          <CardDescription>
            Applications submitted through the Leadership Institute form.
          </CardDescription>
        </CardHeader>
        <CardContent className={submissions.length ? "p-0" : undefined}>
          {submissions.length ? (
            <SubmissionsTable submissions={submissions} />
          ) : (
            <FellowshipApplicationsEmptyState />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
