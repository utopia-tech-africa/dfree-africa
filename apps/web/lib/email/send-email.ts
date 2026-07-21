import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

export type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

function getAwsRegion(): string | null {
  const region =
    process.env.AWS_REGION?.trim() || process.env.SES_AWS_REGION?.trim();
  return region || null;
}

function getEmailFrom(): string | null {
  const from = process.env.EMAIL_FROM?.trim();
  return from || null;
}

let sesClient: SESv2Client | null | undefined;

function getSesClient(): SESv2Client | null {
  if (sesClient !== undefined) {
    return sesClient;
  }

  const region = getAwsRegion();

  if (!region) {
    sesClient = null;
    return null;
  }

  sesClient = new SESv2Client({ region });
  return sesClient;
}

export function isEmailConfigured(): boolean {
  return Boolean(getSesClient() && getEmailFrom());
}

/**
 * Sends a transactional HTML email via Amazon SES.
 * Returns `{ sent: false }` when SES/env is not configured (local preview mode).
 */
export async function sendEmail({
  to,
  subject,
  html,
}: SendEmailParams): Promise<{ sent: boolean }> {
  const from = getEmailFrom();
  const client = getSesClient();

  if (!client || !from) {
    console.warn(
      "[email] AWS SES is not configured (need AWS_REGION/SES_AWS_REGION and EMAIL_FROM). Preview:",
      { to, subject, html: html.trim() },
    );
    return { sent: false };
  }

  await client.send(
    new SendEmailCommand({
      FromEmailAddress: from,
      Destination: {
        ToAddresses: [to],
      },
      Content: {
        Simple: {
          Subject: {
            Data: subject,
            Charset: "UTF-8",
          },
          Body: {
            Html: {
              Data: html,
              Charset: "UTF-8",
            },
          },
        },
      },
    }),
  );

  return { sent: true };
}
