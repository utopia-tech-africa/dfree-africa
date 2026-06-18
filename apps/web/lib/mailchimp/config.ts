export type MailchimpConfig = {
  apiKey: string;
  serverPrefix: string;
  audienceId: string;
};

export function getMailchimpConfig(): MailchimpConfig | null {
  const apiKey = process.env.MAILCHIMP_API_KEY?.trim();
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID?.trim();

  if (!apiKey || !audienceId) {
    return null;
  }

  const dashIndex = apiKey.lastIndexOf("-");
  if (dashIndex === -1 || dashIndex === apiKey.length - 1) {
    return null;
  }

  const serverPrefix =
    process.env.MAILCHIMP_SERVER_PREFIX?.trim() ?? apiKey.slice(dashIndex + 1);

  return {
    apiKey,
    serverPrefix,
    audienceId,
  };
}
