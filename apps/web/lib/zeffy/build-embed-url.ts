const ZEFFY_ORIGIN = "https://www.zeffy.com";

export function campaignUrlToEmbedUrl(campaignUrl: string): string | null {
  try {
    const url = new URL(campaignUrl);

    if (url.origin !== ZEFFY_ORIGIN) {
      return null;
    }

    const parts = url.pathname.split("/").filter(Boolean);

    if (parts[0] === "embed" && parts.length >= 3) {
      return campaignUrl;
    }

    const localeIndex = parts.findIndex((part) => part.includes("-"));

    if (localeIndex === -1 || parts.length < localeIndex + 3) {
      return null;
    }

    const formType = parts[localeIndex + 1];
    const slug = parts[localeIndex + 2];

    return `${ZEFFY_ORIGIN}/embed/${formType}/${slug}`;
  } catch {
    return null;
  }
}
