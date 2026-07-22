import { AdminInvitationEmail } from "@/emails/admin-invitation";
import { resolveAuthBaseURL } from "@/lib/auth/base-url";
import { renderEmail } from "@/lib/email/render-email";
import { sendEmail } from "@/lib/email/send-email";

export type InvitationEmailData = {
  email: string;
  role: string;
  inviter: { user: { name?: string | null; email: string } };
  organization: { name: string };
  invitation: { id: string };
};

export async function sendInvitationEmail(data: InvitationEmailData) {
  const baseUrl = resolveAuthBaseURL();
  const inviteLink = `${baseUrl}/admin/accept-invitation/${data.invitation.id}`;
  const inviterName = data.inviter.user.name ?? data.inviter.user.email;
  const subject = `Invitation to join ${data.organization.name}`;

  const html = await renderEmail(
    AdminInvitationEmail({
      inviterName,
      organizationName: data.organization.name,
      role: data.role,
      inviteLink,
    }),
  );

  const { sent } = await sendEmail({
    to: data.email,
    subject,
    html,
  });

  if (!sent) {
    console.warn(
      "[admin] Invitation email not sent — accept link for manual share:",
      inviteLink,
    );
  }
}
