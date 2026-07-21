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
  links: siteConfig.links,
} as const;

export type EmailCta = {
  label: string;
  href: string;
};

export type WrapEmailHtmlOptions = {
  /** Visible title above the body (optional). */
  title?: string;
  /** Hidden preview text shown in inbox lists. */
  preheader?: string;
  /** Already-safe HTML for the main message body. */
  bodyHtml: string;
  /** Optional primary call-to-action button. */
  cta?: EmailCta;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function styleBodyHtml(bodyHtml: string): string {
  return bodyHtml
    .replace(
      /<p(\s[^>]*)?>/gi,
      `<p$1 style="margin:0 0 16px;font-family:${emailBrand.fontBody};font-size:16px;line-height:1.65;color:${emailBrand.text};">`,
    )
    .replace(
      /<a(\s[^>]*)?>/gi,
      `<a$1 style="color:${emailBrand.primary};text-decoration:underline;">`,
    )
    .replace(
      /<strong(\s[^>]*)?>/gi,
      `<strong$1 style="font-weight:600;color:${emailBrand.primaryDark};">`,
    );
}

function renderCta(cta: EmailCta): string {
  const href = escapeHtml(cta.href);
  const label = escapeHtml(cta.label);

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 8px;">
      <tr>
        <td align="center" bgcolor="${emailBrand.primary}" style="border-radius:8px;background-color:${emailBrand.primary};">
          <a href="${href}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:14px 28px;font-family:${emailBrand.fontHeading};font-size:15px;font-weight:700;line-height:1.2;color:#ffffff;text-decoration:none;border-radius:8px;">
            ${label}
          </a>
        </td>
      </tr>
    </table>
  `;
}

/**
 * Wraps transactional email body HTML in a DFREE-branded layout.
 * Uses table-based markup and inline styles for broad client support.
 */
export function wrapEmailHtml({
  title,
  preheader,
  bodyHtml,
  cta,
}: WrapEmailHtmlOptions): string {
  const year = new Date().getFullYear();
  const safeTitle = title ? escapeHtml(title) : null;
  const safePreheader = preheader ? escapeHtml(preheader) : "";
  const styledBody = styleBodyHtml(bodyHtml);
  const homeUrl = escapeHtml(emailBrand.siteUrl);
  const logoUrl = escapeHtml(emailBrand.logoUrl);
  const siteName = escapeHtml(emailBrand.siteName);
  const twitterUrl = escapeHtml(emailBrand.links.twitter);
  const facebookUrl = escapeHtml(emailBrand.links.facebook);
  const instagramUrl = escapeHtml(emailBrand.links.instagram);

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>${safeTitle ?? siteName}</title>
    <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <![endif]-->
    <style type="text/css">
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Poppins:wght@400;500;600&display=swap');
      body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
      body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
      a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:${emailBrand.canvas};">
    <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
      ${safePreheader}
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${emailBrand.canvas};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;width:100%;">
            <tr>
              <td style="padding:0 0 20px;text-align:center;">
                <a href="${homeUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;text-decoration:none;">
                  <img src="${logoUrl}" width="160" alt="${siteName}" style="display:block;width:160px;max-width:160px;height:auto;margin:0 auto;" />
                </a>
              </td>
            </tr>
            <tr>
              <td style="border-radius:12px;overflow:hidden;background-color:${emailBrand.surface};border:1px solid ${emailBrand.border};box-shadow:0 8px 24px rgba(30,40,19,0.06);">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="height:4px;line-height:4px;font-size:0;background:linear-gradient(90deg, ${emailBrand.primary} 0%, ${emailBrand.secondary} 100%);background-color:${emailBrand.primary};">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="padding:36px 32px 40px;">
                      ${
                        safeTitle
                          ? `<h1 style="margin:0 0 20px;font-family:${emailBrand.fontHeading};font-size:22px;line-height:1.3;font-weight:700;color:${emailBrand.primaryDark};">${safeTitle}</h1>`
                          : ""
                      }
                      ${styledBody}
                      ${cta ? renderCta(cta) : ""}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 12px 8px;text-align:center;">
                <p style="margin:0 0 10px;font-family:${emailBrand.fontHeading};font-size:13px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${emailBrand.primaryDark};">
                  ${siteName}
                </p>
                <p style="margin:0 0 16px;font-family:${emailBrand.fontBody};font-size:13px;line-height:1.5;color:${emailBrand.textMuted};">
                  Advancing debt-free financial education and community wellness.
                </p>
                <p style="margin:0 0 16px;font-family:${emailBrand.fontBody};font-size:13px;line-height:1.5;">
                  <a href="${homeUrl}" style="color:${emailBrand.primary};text-decoration:none;font-weight:500;">Website</a>
                  <span style="color:${emailBrand.border};padding:0 8px;">·</span>
                  <a href="${twitterUrl}" style="color:${emailBrand.primary};text-decoration:none;font-weight:500;">X</a>
                  <span style="color:${emailBrand.border};padding:0 8px;">·</span>
                  <a href="${facebookUrl}" style="color:${emailBrand.primary};text-decoration:none;font-weight:500;">Facebook</a>
                  <span style="color:${emailBrand.border};padding:0 8px;">·</span>
                  <a href="${instagramUrl}" style="color:${emailBrand.primary};text-decoration:none;font-weight:500;">Instagram</a>
                </p>
                <p style="margin:0;font-family:${emailBrand.fontBody};font-size:12px;line-height:1.5;color:${emailBrand.textMuted};">
                  © ${year} ${siteName}. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function escapeEmailHtml(value: string): string {
  return escapeHtml(value);
}
