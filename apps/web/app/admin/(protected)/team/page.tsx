import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InviteAdminForm } from "@/app/admin/(protected)/team/invite-admin-form";
import { MemberRow } from "@/app/admin/(protected)/team/member-row";
import { PendingInviteRow } from "@/app/admin/(protected)/team/pending-invite-row";
import { getAdminSession } from "@/lib/admin/get-admin-session";
import { prisma } from "@/lib/db/prisma";

export default async function AdminTeamPage() {
  const session = await getAdminSession();
  if (!session) {
    return null;
  }

  const membership = await prisma.member.findFirst({
    where: { userId: session.user.id },
    include: {
      organization: {
        include: {
          members: { include: { user: true } },
          invitations: { orderBy: { createdAt: "desc" } },
        },
      },
    },
  });

  const organization = membership?.organization;
  const canInvite =
    membership?.role === "owner" || membership?.role === "admin";

  const pendingInvitations =
    organization?.invitations.filter(
      (invitation) => invitation.status === "pending",
    ) ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-space-grotesk text-3xl font-bold text-primary-700">
          Team
        </h1>
        <p className="mt-2 text-neutral-800">
          Manage admins for {organization?.name ?? "your organization"}.
        </p>
      </div>

      {canInvite && organization ? (
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader>
            <CardTitle>Invite admin</CardTitle>
            <CardDescription>
              Send an email invitation. They must sign in with that email before
              accepting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InviteAdminForm organizationId={organization.id} />
          </CardContent>
        </Card>
      ) : null}

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>
            {organization?.members.length ?? 0} people in this organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          {organization?.members.length ? (
            <ul className="divide-y divide-neutral-200">
              {organization.members.map((member, index) => (
                <MemberRow
                  key={member.id}
                  name={member.user.name ?? ""}
                  email={member.user.email}
                  role={member.role}
                  index={index}
                />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-700">No members yet.</p>
          )}
        </CardContent>
      </Card>

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle>Pending invitations</CardTitle>
          <CardDescription>
            {pendingInvitations.length} awaiting acceptance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingInvitations.length ? (
            <ul className="divide-y divide-neutral-200">
              {pendingInvitations.map((invitation, index) => (
                <PendingInviteRow
                  key={invitation.id}
                  invitationId={invitation.id}
                  email={invitation.email}
                  role={invitation.role ?? "admin"}
                  organizationId={organization?.id ?? ""}
                  expiresAt={invitation.expiresAt}
                  canManage={canInvite}
                  index={index}
                />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-700">No pending invitations.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
