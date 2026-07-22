import * as React from "react";
import type { ReactNode } from "react";
import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";
import { emailBrand } from "@/lib/email/brand";

export type DfreeEmailLayoutProps = {
  preview: string;
  title?: string;
  children: ReactNode;
  cta?: {
    label: string;
    href: string;
  };
};

export function DfreeEmailLayout({
  preview,
  title,
  children,
  cta,
}: DfreeEmailLayoutProps) {
  const year = new Date().getFullYear();

  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Montserrat"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/montserrat/v29/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM73w5aX8.woff2",
            format: "woff2",
          }}
          fontWeight={700}
          fontStyle="normal"
        />
        <Font
          fontFamily="Poppins"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/poppins/v22/pxiEyp8kv8JHgFVrJJfecg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.outer}>
          <Section style={styles.logoSection}>
            <Link href={emailBrand.siteUrl} style={styles.logoLink}>
              <Img
                src={emailBrand.logoUrl}
                width="72"
                alt={emailBrand.siteName}
                style={styles.logo}
              />
            </Link>
          </Section>

          <Section style={styles.card}>
            <Section style={styles.accentBar} />
            <Section style={styles.cardBody}>
              {title ? <Heading style={styles.title}>{title}</Heading> : null}
              {children}
              {cta ? (
                <Section style={styles.ctaSection}>
                  <Button href={cta.href} style={styles.ctaButton}>
                    {cta.label}
                  </Button>
                </Section>
              ) : null}
            </Section>
          </Section>

          <Section style={styles.footer}>
            <Text style={styles.footerBrand}>{emailBrand.siteName}</Text>
            <Text style={styles.footerTagline}>{emailBrand.tagline}</Text>
            <Text style={styles.footerLinks}>
              <Link href={emailBrand.siteUrl} style={styles.footerLink}>
                Website
              </Link>
              <span style={styles.footerDot}>·</span>
              <Link href={emailBrand.links.twitter} style={styles.footerLink}>
                X
              </Link>
              <span style={styles.footerDot}>·</span>
              <Link href={emailBrand.links.facebook} style={styles.footerLink}>
                Facebook
              </Link>
              <span style={styles.footerDot}>·</span>
              <Link href={emailBrand.links.instagram} style={styles.footerLink}>
                Instagram
              </Link>
            </Text>
            <Hr style={styles.footerRule} />
            <Text style={styles.footerCopy}>
              © {year} {emailBrand.siteName}. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    margin: "0",
    padding: "0",
    backgroundColor: emailBrand.canvas,
    fontFamily: emailBrand.fontBody,
  },
  outer: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "32px 16px",
  },
  logoSection: {
    textAlign: "center" as const,
    paddingBottom: "16px",
  },
  logoLink: {
    display: "inline-block",
    textDecoration: "none",
  },
  logo: {
    display: "block",
    margin: "0 auto",
    width: "72px",
    maxWidth: "72px",
    height: "auto",
  },
  card: {
    backgroundColor: emailBrand.surface,
    borderRadius: "12px",
    border: `1px solid ${emailBrand.border}`,
    overflow: "hidden" as const,
  },
  accentBar: {
    height: "4px",
    lineHeight: "4px",
    fontSize: "0",
    backgroundColor: emailBrand.primary,
    background: `linear-gradient(90deg, ${emailBrand.primary} 0%, ${emailBrand.secondary} 100%)`,
  },
  cardBody: {
    padding: "36px 32px 40px",
  },
  title: {
    margin: "0 0 20px",
    fontFamily: emailBrand.fontHeading,
    fontSize: "22px",
    lineHeight: "1.3",
    fontWeight: 700,
    color: emailBrand.primaryDark,
  },
  ctaSection: {
    marginTop: "28px",
    textAlign: "center" as const,
  },
  ctaButton: {
    backgroundColor: emailBrand.primary,
    borderRadius: "8px",
    color: "#ffffff",
    fontFamily: emailBrand.fontHeading,
    fontSize: "15px",
    fontWeight: 700,
    lineHeight: "1.2",
    padding: "14px 28px",
    textDecoration: "none",
    display: "inline-block",
  },
  footer: {
    padding: "28px 12px 8px",
    textAlign: "center" as const,
  },
  footerBrand: {
    margin: "0 0 10px",
    fontFamily: emailBrand.fontHeading,
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
    color: emailBrand.primaryDark,
  },
  footerTagline: {
    margin: "0 0 16px",
    fontFamily: emailBrand.fontBody,
    fontSize: "13px",
    lineHeight: "1.5",
    color: emailBrand.textMuted,
  },
  footerLinks: {
    margin: "0 0 16px",
    fontFamily: emailBrand.fontBody,
    fontSize: "13px",
    lineHeight: "1.5",
  },
  footerLink: {
    color: emailBrand.primary,
    textDecoration: "none",
    fontWeight: 500,
  },
  footerDot: {
    color: emailBrand.border,
    padding: "0 8px",
  },
  footerRule: {
    borderColor: emailBrand.border,
    borderTop: `1px solid ${emailBrand.border}`,
    margin: "0 0 16px",
  },
  footerCopy: {
    margin: "0",
    fontFamily: emailBrand.fontBody,
    fontSize: "12px",
    lineHeight: "1.5",
    color: emailBrand.textMuted,
  },
} as const;
