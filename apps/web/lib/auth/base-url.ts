import { siteUrl } from "@/lib/site-url";

const isProduction = process.env.NODE_ENV === "production";

/** Primary production origin (apex redirects here). */
export const PRODUCTION_SITE_ORIGIN = "https://www.dfreefoundation.org";

/** Apex + www — browsers treat these as different origins. */
const PRODUCTION_TRUSTED_ORIGINS = [
  "https://www.dfreefoundation.org",
  "https://dfreefoundation.org",
] as const;

function toOrigin(url: string | undefined | null): string | null {
  if (!url?.trim()) return null;
  try {
    const withProtocol = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

function isLoopbackOrigin(origin: string): boolean {
  try {
    const { hostname } = new URL(origin);
    return (
      hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1"
    );
  } catch {
    return false;
  }
}

/** Ignore localhost/127.0.0.1 in production — common Vercel misconfig. */
export function productionSafeOrigin(
  url: string | undefined | null,
): string | null {
  const origin = toOrigin(url);
  if (!origin) return null;
  if (isProduction && isLoopbackOrigin(origin)) return null;
  return origin;
}

/**
 * Prefer an explicit BETTER_AUTH_URL, but ignore localhost values in production
 * (common misconfig on Vercel that causes "Invalid origin" on login).
 */
export function resolveAuthBaseURL(): string {
  return (
    productionSafeOrigin(process.env.BETTER_AUTH_URL) ??
    productionSafeOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
    productionSafeOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    productionSafeOrigin(process.env.VERCEL_BRANCH_URL) ??
    productionSafeOrigin(process.env.VERCEL_URL) ??
    productionSafeOrigin(siteUrl) ??
    (isProduction ? PRODUCTION_SITE_ORIGIN : "http://localhost:3000")
  );
}

/** localhost and 127.0.0.1 are different origins — trust both in local dev. */
export function localDevTrustedOrigins(url: string): string[] {
  if (!isLoopbackOrigin(url)) return [];
  try {
    const parsed = new URL(url);
    const port = parsed.port || (parsed.protocol === "https:" ? "443" : "80");
    const defaultPort =
      (parsed.protocol === "https:" && port === "443") ||
      (parsed.protocol === "http:" && port === "80");
    const hostPort = defaultPort ? "" : `:${port}`;
    return [
      `${parsed.protocol}//localhost${hostPort}`,
      `${parsed.protocol}//127.0.0.1${hostPort}`,
    ];
  } catch {
    return [];
  }
}

export function resolveTrustedOrigins(baseURL: string): string[] {
  return [
    ...localDevTrustedOrigins(baseURL),
    productionSafeOrigin(process.env.BETTER_AUTH_URL),
    productionSafeOrigin(process.env.NEXT_PUBLIC_SITE_URL),
    productionSafeOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL),
    productionSafeOrigin(process.env.VERCEL_BRANCH_URL),
    productionSafeOrigin(process.env.VERCEL_URL),
    productionSafeOrigin(siteUrl),
    ...(isProduction ? PRODUCTION_TRUSTED_ORIGINS : []),
    ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean) ?? []),
  ].filter((origin, index, all): origin is string => {
    return Boolean(origin) && all.indexOf(origin) === index;
  });
}
