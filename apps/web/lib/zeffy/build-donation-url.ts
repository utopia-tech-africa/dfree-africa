import { campaignUrlToEmbedUrl } from "./build-embed-url";

type BuildZeffyDonationUrlOptions = {
  amount?: number;
};

export function buildZeffyDonationUrl(
  baseUrl: string,
  { amount }: BuildZeffyDonationUrlOptions = {},
): string {
  const url = new URL(baseUrl);

  if (amount != null && amount > 0) {
    url.searchParams.set("Amount", String(Math.round(amount)));
  }

  return url.toString();
}

export function buildZeffyEmbedUrl(
  campaignOrEmbedUrl: string,
  options: BuildZeffyDonationUrlOptions = {},
): string {
  const embedUrl = campaignOrEmbedUrl.includes("/embed/")
    ? campaignOrEmbedUrl
    : (campaignUrlToEmbedUrl(campaignOrEmbedUrl) ?? campaignOrEmbedUrl);

  return buildZeffyDonationUrl(embedUrl, options);
}

/**
 * Checkout URL for modal iframes. Always uses Zeffy's `/embed/` route because the
 * public campaign page is blocked by X-Frame-Options when framed.
 */
export function buildZeffyCheckoutUrl(
  campaignUrl: string,
  options: BuildZeffyDonationUrlOptions = {},
): string {
  return buildZeffyEmbedUrl(campaignUrl, options);
}
