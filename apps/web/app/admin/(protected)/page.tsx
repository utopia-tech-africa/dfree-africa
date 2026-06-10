import Link from "next/link";
import {
  AlertCircle,
  Clock,
  FileText,
  Handshake,
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

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  const stats = await getDashboardStats();

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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
              description="Not connected — public form not live yet"
              icon={FileText}
            />
            <StatCard
              label="Fellowship sponsors"
              value={stats.fellowshipSponsors}
              description="Not connected — public form not live yet"
              icon={Handshake}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/team"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Go to Team
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
        </>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-neutral-600" aria-hidden />
              <CardTitle>Fellowship Applications</CardTitle>
            </div>
            <CardDescription>
              Submissions will appear here once the public form is connected.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-space-grotesk text-2xl font-bold text-neutral-400">
              {stats?.fellowshipApplications ?? 0}
            </p>
            <p className="flex items-center gap-1.5 text-sm text-neutral-700">
              <AlertCircle className="size-4 shrink-0" aria-hidden />
              Not connected — no database table or API yet
            </p>
          </CardContent>
        </Card>
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
