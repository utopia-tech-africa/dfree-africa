import * as React from "react";
import { Text } from "react-email";
import { DfreeEmailLayout } from "@/emails/components/dfree-layout";
import { emailBrand } from "@/lib/email/brand";

export type AdminInvitationEmailProps = {
  inviterName: string;
  organizationName: string;
  role: string;
  inviteLink: string;
};

export function AdminInvitationEmail({
  inviterName,
  organizationName,
  role,
  inviteLink,
}: AdminInvitationEmailProps) {
  const preview = `Invitation to join ${organizationName}`;

  return (
    <DfreeEmailLayout
      preview={preview}
      title="You're invited to the DFREE admin team"
      cta={{
        label: "Accept invitation",
        href: inviteLink,
      }}
    >
      <Text style={styles.paragraph}>
        <strong style={styles.strong}>{inviterName}</strong> invited you to join{" "}
        <strong style={styles.strong}>{organizationName}</strong> as{" "}
        <strong style={styles.strong}>{role}</strong>.
      </Text>
      <Text style={styles.paragraph}>
        Use the button below to accept this invitation. The link expires in 7
        days. Please sign in with this email address before accepting.
      </Text>
      <Text style={styles.note}>
        If the button doesn&apos;t work, copy and paste this link into your
        browser:
        <br />
        <a href={inviteLink} style={styles.link}>
          {inviteLink}
        </a>
      </Text>
    </DfreeEmailLayout>
  );
}

AdminInvitationEmail.PreviewProps = {
  inviterName: "Admin",
  organizationName: "DFREE Admin",
  role: "admin",
  inviteLink: "https://www.dfreefoundation.org/admin/accept-invitation/preview",
} satisfies AdminInvitationEmailProps;

const styles = {
  paragraph: {
    margin: "0 0 16px",
    fontFamily: emailBrand.fontBody,
    fontSize: "16px",
    lineHeight: "1.65",
    color: emailBrand.text,
  },
  strong: {
    fontWeight: 600,
    color: emailBrand.primaryDark,
  },
  note: {
    margin: "24px 0 0",
    fontFamily: emailBrand.fontBody,
    fontSize: "13px",
    lineHeight: "1.55",
    color: emailBrand.textMuted,
    wordBreak: "break-all" as const,
  },
  link: {
    color: emailBrand.primary,
    textDecoration: "underline",
  },
} as const;

export default AdminInvitationEmail;
