import { siteConfig } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";

/** Brand tokens aligned with `app/globals.css` public theme. */
export const emailBrand = {
  primary: "#4d6731",
  primaryDark: "#2f3f1e",
  primaryDeep: "#1e2813",
  secondary: "#a4be4f",
  secondarySoft: "#e8efd3",
  canvas: "#f4f6ef",
  surface: "#ffffff",
  text: "#333333",
  textMuted: "#5c6356",
  border: "#d7ddcb",
  fontBody: "'Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontHeading: "Montserrat, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  logoUrl: siteConfig.ogImage,
  siteName: siteConfig.name,
  siteUrl,
  tagline: "Advancing debt-free financial education and community wellness.",
  links: siteConfig.links,
} as const;
