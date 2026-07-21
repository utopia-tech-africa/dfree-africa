import { escapeEmailHtml, wrapEmailHtml } from "@/lib/email/email-layout";
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
  const inviterName = escapeEmailHtml(
    data.inviter.user.name ?? data.inviter.user.email,
  );
  const organizationName = escapeEmailHtml(data.organization.name);
  const role = escapeEmailHtml(data.role);

  const subject = `Invitation to join ${data.organization.name}`;
  const bodyHtml = `
      <p>${inviterName} invited you to join <strong>${organizationName}</strong> as <strong>${role}</strong>.</p>
      <p>Use the button below to accept this invitation. The link expires in 7 days. Please sign in with this email address before accepting.</p>
    `;

  const html = wrapEmailHtml({
    title: "You're invited to the DFREE admin team",
    preheader: subject,
    bodyHtml,
    cta: {
      label: "Accept invitation",
      href: inviteLink,
    },
  });

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
