import { siteUrl } from "@/lib/site-url";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DFREE® Foundation",
  url: siteUrl,
  logo: "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/6ea76738-7c0b-4a59-9ff9-5a2b3d706604.webp",
  description:
    "A 501(c)(3) nonprofit empowering underserved communities with debt-free financial education and community financial wellness programs.",
  sameAs: [
    "https://facebook.com/thedfreemovement",
    "https://instagram.com/dfreemovement",
    "https://x.com/dfreemovement",
    "https://www.linkedin.com/company/dfreemovement",
    "https://youtube.com/@dfreemovement",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-844-693-3733",
    contactType: "customer service",
    email: "info@dfree.com",
    areaServed: "US",
    availableLanguage: ["English", "Spanish", "French"],
  },
};

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
    />
  );
}
