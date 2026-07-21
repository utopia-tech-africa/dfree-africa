import { sendEmail } from "@/lib/email/send-email";

export type InvitationEmailData = {
  email: string;
  role: string;
  inviter: { user: { name?: string | null; email: string } };
  organization: { name: string };
  invitation: { id: string };
};

export async function sendInvitationEmail(data: InvitationEmailData) {
  const baseUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
  const inviteLink = `${baseUrl}/admin/accept-invitation/${data.invitation.id}`;
  const inviterName = data.inviter.user.name ?? data.inviter.user.email;

  const subject = `Invitation to join ${data.organization.name}`;
  const html = `
      <p>${inviterName} invited you to join <strong>${data.organization.name}</strong> as <strong>${data.role}</strong>.</p>
      <p><a href="${inviteLink}">Accept invitation</a></p>
      <p>This link expires in 7 days. Sign in with this email before accepting.</p>
    `;

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
