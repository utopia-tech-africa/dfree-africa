import Link from "next/link";
import {
  AlertCircle,
  Clock,
  FileText,
  Handshake,
  LogOut,
  Mail,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatCard } from "@/components/admin/stat-card";
import { buttonVariants } from "@/components/ui/button";
import { getAdminSession } from "@/lib/admin/get-admin-session";
import { cn } from "@/lib/utils";
import { getDashboardStats } from "@/lib/admin/get-dashboard-stats";
import { getDashboardActivity } from "@/lib/admin/get-dashboard-activity";
import { getSaveExitStats } from "@/lib/fellowship-applications/get-save-exit-stats";
import { getRecentFellowshipApplicationSummaries } from "@/lib/fellowship-applications/get-submissions";

import { DashboardActivityCard } from "./dashboard-activity-card";
import { FellowshipApplicationsEmptyState } from "./fellowship-applications/fellowship-applications-empty-state";
import { SubmissionRow } from "./fellowship-applications/submission-row";
import { SaveExitStatsCard } from "./save-exit-stats-card";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  const [stats, recentApplications, saveExitStats, activity] =
    await Promise.all([
      getDashboardStats(),
      getRecentFellowshipApplicationSummaries(5),
      getSaveExitStats(),
      getDashboardActivity(),
    ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-space-grotesk text-3xl font-bold text-primary-700">
          Dashboard
        </h1>
        <p className="mt-2 text-neutral-800">
          Welcome back, {session?.user.name ?? session?.user.email}.
          {stats ? (
            <span className="block text-sm text-neutral-700">
              {stats.organizationName}
            </span>
          ) : null}
        </p>
      </div>

      {stats ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
            <StatCard
              label="Team members"
              value={stats.memberCount}
              description="Admins and owners in your organization"
              icon={Users}
              href="/admin/team"
              hrefLabel="Manage team"
            />
            <StatCard
              label="Pending invites"
              value={stats.pendingInviteCount}
              description="Invitations awaiting acceptance"
              icon={Mail}
              href="/admin/team"
              hrefLabel="View invitations"
            />
            <StatCard
              label="Expiring soon"
              value={stats.expiringSoonCount}
              description="Pending invites expiring within 48 hours"
              icon={Clock}
              href="/admin/team"
              hrefLabel="Review on Team"
              highlight={stats.expiringSoonCount > 0}
            />
            <StatCard
              label="Fellowship applications"
              value={stats.fellowshipApplications}
              description="Applications submitted through the public form"
              icon={FileText}
              href="/admin/fellowship-applications"
              hrefLabel="View applications"
            />
            <StatCard
              label="Fellowship sponsors"
              value={stats.fellowshipSponsors}
              description="Not connected — public form not live yet"
              icon={Handshake}
            />
            <StatCard
              label="Save & exit"
              value={stats.saveExitTotal}
              description="Draft saves before applicants left the form"
              icon={LogOut}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/team"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Go to Team
            </Link>
            <Link
              href="/admin/fellowship-applications"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              View applications
            </Link>
            {stats.canInvite ? (
              <Link
                href="/admin/team"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Invite admin
              </Link>
            ) : null}
          </div>
          <DashboardActivityCard activity={activity} />
        </>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-neutral-600" aria-hidden />
                <CardTitle>Fellowship Applications</CardTitle>
              </div>
              {stats && stats.fellowshipApplications > 0 ? (
                <Link
                  href="/admin/fellowship-applications"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  View all
                </Link>
              ) : null}
            </div>
            <CardDescription>
              Recent submissions from the Leadership Institute application form.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats && stats.fellowshipApplications > 0 ? (
              <p className="font-space-grotesk text-2xl font-bold text-primary-700">
                {stats.fellowshipApplications}
              </p>
            ) : null}

            {recentApplications.length ? (
              <ul className="divide-y divide-neutral-200 border-t border-neutral-200 pt-2">
                {recentApplications.map((submission) => (
                  <SubmissionRow
                    key={submission.id}
                    submission={submission}
                    variant="compact"
                  />
                ))}
              </ul>
            ) : (
              <FellowshipApplicationsEmptyState variant="compact" />
            )}
          </CardContent>
        </Card>

        <SaveExitStatsCard stats={saveExitStats} />

        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Handshake className="size-5 text-neutral-600" aria-hidden />
              <CardTitle>Fellowship Sponsors</CardTitle>
            </div>
            <CardDescription>
              Sponsor inquiries will appear here once the public form is
              connected.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-space-grotesk text-2xl font-bold text-neutral-400">
              {stats?.fellowshipSponsors ?? 0}
            </p>
            <p className="flex items-center gap-1.5 text-sm text-neutral-700">
              <AlertCircle className="size-4 shrink-0" aria-hidden />
              Not connected — no database table or API yet
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
