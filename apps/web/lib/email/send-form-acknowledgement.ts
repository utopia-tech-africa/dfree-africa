import {
  getFormAcknowledgementCopy,
  type FormAcknowledgementType,
} from "@/lib/email/form-acknowledgement-copy";
import { sendEmail } from "@/lib/email/send-email";

export type FormAcknowledgementParams = {
  to: string;
  formType: FormAcknowledgementType;
  submitterName?: string | null;
};

export async function sendFormAcknowledgement({
  to,
  formType,
  submitterName,
}: FormAcknowledgementParams): Promise<{ sent: boolean }> {
  const { subject, html } = await getFormAcknowledgementCopy(
    formType,
    submitterName,
  );

  return sendEmail({
    to,
    subject,
    html,
  });
}
