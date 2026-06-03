import { siteUrl } from "@/lib/site-url";

export const siteConfig = {
  name: "DFREE® Foundation",
  description:
    "DFREE® Foundation is a 501(c)(3) nonprofit delivering debt-free financial education and community financial wellness programs across underserved US communities.",
  url: siteUrl,
  ogImage:
    "https://res.cloudinary.com/dan9camhs/image/upload/v1773224828/6ea76738-7c0b-4a59-9ff9-5a2b3d706604.webp",
  links: {
    twitter: "https://x.com/dfreemovement",
    facebook: "https://facebook.com/thedfreemovement",
    instagram: "https://instagram.com/dfreemovement",
  },
  creator: "DFREE® Foundation",
  keywords: [
    "DFREE",
    "nonprofit financial education",
    "debt-free program",
    "community financial wellness",
    "501c3 financial empowerment",
    "DFREE movement",
    "financial freedom",
  ],
} as const;

/** Shared keywords for DFREE® Africa section routes. */
export const africaSectionKeywords = [
  "DFREE Africa",
  "financial literacy Africa",
  "community development Africa",
  "debt-free programs Africa",
  "Ghana South Africa Uganda Liberia",
] as const;

const META_DESCRIPTION_MAX = 155;

export function truncateMetaDescription(
  description: string,
  maxLength = META_DESCRIPTION_MAX,
): string {
  if (description.length <= maxLength) return description;
  return `${description.slice(0, maxLength - 3).trim()}...`;
}

export type MetadataParams = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  /** Page-specific keywords (replaces site keywords when provided). Use a string or array of strings. */
  keywords?: string | string[];
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "",
  image = siteConfig.ogImage,
  keywords: keywordsParam,
  noIndex = false,
}: MetadataParams = {}) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${siteConfig.url}${normalizedPath}`;
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const metaDescription = truncateMetaDescription(description);
  const keywords =
    keywordsParam !== undefined
      ? Array.isArray(keywordsParam)
        ? keywordsParam
        : [keywordsParam]
      : Array.from(siteConfig.keywords);

  const imageUrl = image.startsWith("http")
    ? image
    : `${siteConfig.url}${image.startsWith("/") ? image : `/${image}`}`;

  return {
    title: fullTitle,
    description: metaDescription,
    keywords,
    authors: [{ name: siteConfig.creator, url: siteConfig.url }],
    creator: siteConfig.creator,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description: metaDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
