export const siteConfig = {
  name: "DFREE®",
  description:
    "Driving financial freedom and sustainable community development across Africa through education, skills training, and economic programs.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dfreeafrica.org",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/dfreeafrica",
    facebook: "https://facebook.com/dfreeafrica",
    instagram: "https://instagram.com/dfreeafrica",
  },
  creator: "DFREE® Foundation",
  keywords: [
    "DFREE",
    "Africa",
    "financial freedom",
    "community development",
    "financial education",
    "economic programs",
  ],
} as const;

export type MetadataParams = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image = siteConfig.ogImage,
  noIndex = false,
}: MetadataParams = {}) {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;

  return {
    title: fullTitle,
    description,
    keywords: Array.from(siteConfig.keywords),
    authors: [{ name: siteConfig.creator, url: siteConfig.url }],
    creator: siteConfig.creator,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: image.startsWith("http") ? image : `${siteConfig.url}${image}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.startsWith("http") ? image : `${siteConfig.url}${image}`],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
