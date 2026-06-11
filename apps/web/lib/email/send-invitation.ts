import { Resend } from "resend";

export type InvitationEmailData = {
  email: string;
  role: string;
  inviter: { user: { name?: string | null; email: string } };
  organization: { name: string };
  invitation: { id: string };
};

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

export async function sendInvitationEmail(data: InvitationEmailData) {
  const baseUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
  const inviteLink = `${baseUrl}/admin/accept-invitation/${data.invitation.id}`;
  const inviterName = data.inviter.user.name ?? data.inviter.user.email;
  const from = process.env.EMAIL_FROM;

  const resend = getResendClient();

  if (!resend || !from) {
    console.warn(
      "[admin] RESEND_API_KEY or EMAIL_FROM missing — invitation link:",
      inviteLink,
    );
    return;
  }

  await resend.emails.send({
    from,
    to: data.email,
    subject: `Invitation to join ${data.organization.name}`,
    html: `
      <p>${inviterName} invited you to join <strong>${data.organization.name}</strong> as <strong>${data.role}</strong>.</p>
      <p><a href="${inviteLink}">Accept invitation</a></p>
      <p>This link expires in 7 days. Sign in with this email before accepting.</p>
    `,
  });
}
