import { TrendingUp } from "lucide-react";

import { DashboardActivityChart } from "@/components/admin/dashboard-activity-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DashboardActivityPoint } from "@/lib/admin/get-dashboard-activity";

type DashboardActivityCardProps = {
  activity: DashboardActivityPoint[];
};

export function DashboardActivityCard({
  activity,
}: DashboardActivityCardProps) {
  const totalApplications = activity.reduce(
    (sum, point) => sum + point.applications,
    0,
  );
  const totalSaveExits = activity.reduce(
    (sum, point) => sum + point.saveExits,
    0,
  );

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
              <TrendingUp className="size-5" aria-hidden />
            </div>
            <div>
              <CardTitle>Application activity</CardTitle>
              <CardDescription>
                Submissions and save & exit events over the last 14 days.
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            <div>
              <p className="text-neutral-700">Submitted</p>
              <p className="font-space-grotesk text-2xl font-bold tabular-nums text-primary-700">
                {totalApplications}
              </p>
            </div>
            <div>
              <p className="text-neutral-700">Save & exit</p>
              <p className="font-space-grotesk text-2xl font-bold tabular-nums text-primary-700">
                {totalSaveExits}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DashboardActivityChart data={activity} />
      </CardContent>
    </Card>
  );
}
