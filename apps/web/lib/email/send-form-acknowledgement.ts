import { Resend } from "resend";
import {
  getFormAcknowledgementCopy,
  type FormAcknowledgementType,
} from "@/lib/email/form-acknowledgement-copy";

export type FormAcknowledgementParams = {
  to: string;
  formType: FormAcknowledgementType;
  submitterName?: string | null;
};

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

export async function sendFormAcknowledgement({
  to,
  formType,
  submitterName,
}: FormAcknowledgementParams): Promise<{ sent: boolean }> {
  const { subject, html } = await getFormAcknowledgementCopy(
    formType,
    submitterName,
  );
  const from = process.env.EMAIL_FROM;
  const resend = getResendClient();

  if (!resend || !from) {
    console.warn(
      `[admin] RESEND_API_KEY or EMAIL_FROM missing — auto-reply preview (${formType}):`,
      { to, subject, html: html.trim() },
    );
    return { sent: false };
  }

  await resend.emails.send({
    from,
    to,
    subject,
    html,
  });

  return { sent: true };
}
