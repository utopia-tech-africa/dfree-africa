import { Metadata } from "next";
import { Montserrat, Poppins, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { createMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";
import { GoogleAnalyticsPageviews } from "@/app/components/analytics/google-analytics-pageviews";
import { ConsentGatedAnalytics } from "@/components/analytics/consent-gated-analytics";
import {
  GoogleTagManagerBody,
  GoogleTagManagerHead,
} from "@/components/analytics/google-tag-manager";
import { CookieConsent } from "@/components/cookie-consent/cookie-consent";
import { OrganizationJsonLd } from "@/components/structured-data/organization-json-ld";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["700"],
});
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500"],
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...createMetadata(),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <head>
        <GoogleTagManagerHead />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <OrganizationJsonLd />
      </head>
      <body
        className={`${montserrat.variable} ${poppins.variable} ${spaceGrotesk.variable} font-poppins antialiased overflow-x-hidden`}
      >
        <GoogleTagManagerBody />
        <NextIntlClientProvider messages={messages}>
          <ConsentGatedAnalytics />
          <Suspense fallback={null}>
            <GoogleAnalyticsPageviews />
          </Suspense>
          {children}
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
