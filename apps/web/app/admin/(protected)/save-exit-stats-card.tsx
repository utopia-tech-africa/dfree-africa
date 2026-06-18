import { HorizontalBarChart } from "@/components/admin/horizontal-bar-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SaveExitStats } from "@/lib/fellowship-applications/get-save-exit-stats";

type SaveExitStatsCardProps = {
  stats: SaveExitStats;
};

export function SaveExitStatsCard({ stats }: SaveExitStatsCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle>Save & exit</CardTitle>
        <CardDescription>
          Where applicants saved their draft and left the form.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="font-space-grotesk text-2xl font-bold text-primary-700">
          {stats.total}
        </p>

        <HorizontalBarChart
          items={stats.byStep.map((row) => ({
            id: row.stepKey,
            label: `Step ${row.step}`,
            sublabel: row.label,
            value: row.count,
          }))}
          emptyMessage="Save & exit events will appear here once applicants use the button."
        />
      </CardContent>
    </Card>
  );
}
