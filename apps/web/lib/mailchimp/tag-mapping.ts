export type NewsletterSource = "footer" | "contact";

/**
 * Returns the Mailchimp tag name for a sign-up source.
 * Set MAILCHIMP_TAG_FOOTER / MAILCHIMP_TAG_CONTACT to the exact tag name
 * shown in Mailchimp (Audience → Tags). Case-sensitive.
 */
export function resolveTagForSource(source?: NewsletterSource): string | null {
  if (!source) {
    return null;
  }

  if (source === "footer") {
    return process.env.MAILCHIMP_TAG_FOOTER?.trim() || null;
  }

  return process.env.MAILCHIMP_TAG_CONTACT?.trim() || null;
}
