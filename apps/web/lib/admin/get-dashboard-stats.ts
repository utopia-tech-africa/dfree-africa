import { getAdminSession } from "@/lib/admin/get-admin-session";
import { getSaveExitStats } from "@/lib/fellowship-applications/get-save-exit-stats";
import { getFellowshipApplicationCount } from "@/lib/fellowship-applications/get-submissions";
import { getFellowshipSponsorCount } from "@/lib/fellowship-sponsors/get-submissions";
import { prisma } from "@/lib/db/prisma";

const EXPIRING_SOON_MS = 1000 * 60 * 60 * 48;

export type DashboardStats = {
  organizationName: string;
  memberCount: number;
  pendingInviteCount: number;
  expiringSoonCount: number;
  canInvite: boolean;
  fellowshipApplications: number;
  fellowshipSponsors: number;
  saveExitTotal: number;
};

export async function getDashboardStats(): Promise<DashboardStats | null> {
  const session = await getAdminSession();
  if (!session) {
    return null;
  }

  const membership = await prisma.member.findFirst({
    where: { userId: session.user.id },
    include: {
      organization: {
        include: {
          members: true,
          invitations: true,
        },
      },
    },
  });

  const organization = membership?.organization;
  if (!organization) {
    return null;
  }

  const now = Date.now();
  const pendingInvitations = organization.invitations.filter(
    (invitation) => invitation.status === "pending",
  );

  const expiringSoonCount = pendingInvitations.filter((invitation) => {
    const msUntilExpiry = invitation.expiresAt.getTime() - now;
    return msUntilExpiry > 0 && msUntilExpiry <= EXPIRING_SOON_MS;
  }).length;

  const canInvite = membership.role === "owner" || membership.role === "admin";
  const [fellowshipApplications, fellowshipSponsors, saveExitStats] =
    await Promise.all([
      getFellowshipApplicationCount(),
      getFellowshipSponsorCount(),
      getSaveExitStats(),
    ]);

  return {
    organizationName: organization.name,
    memberCount: organization.members.length,
    pendingInviteCount: pendingInvitations.length,
    expiringSoonCount,
    canInvite,
    fellowshipApplications,
    fellowshipSponsors,
    saveExitTotal: saveExitStats.total,
  };
}
