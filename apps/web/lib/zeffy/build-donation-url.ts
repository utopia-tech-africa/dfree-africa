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
 * Checkout URL for the donation modal iframe.
 * Amount prefill only works on the public campaign URL — Zeffy drops `Amount`
 * from `/embed/` routes server-side.
 */
export function buildZeffyCheckoutUrl(
  campaignUrl: string,
  options: BuildZeffyDonationUrlOptions = {},
): string {
  const { amount } = options;

  if (amount != null && amount > 0) {
    return buildZeffyDonationUrl(campaignUrl, { amount });
  }

  return buildZeffyEmbedUrl(campaignUrl);
}
