import { Events } from "@/app/components/events";
import ComponentLayout from "@/components/component-layout";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { createMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return createMetadata({
    title: t("events.title"),
    description: t("events.description"),
    path: `/${locale}/events`,
  });
}

const eventsJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "DFREE® Community Financial Wellness Events",
  description:
    "Workshops and gatherings hosted by the DFREE® Foundation in New Brunswick, New Jersey and online.",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "New Brunswick, New Jersey",
    address: {
      "@type": "PostalAddress",
      addressLocality: "New Brunswick",
      addressRegion: "NJ",
      addressCountry: "US",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "DFREE® Foundation",
    url: siteUrl,
  },
};

const EventsPage = async () => {
  const t = await getTranslations("home.events");

  return (
    <div className="flex flex-col my-20 lg:my-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
      <ComponentLayout className="flex flex-col items-center text-center mb-10">
        <Subtitle text={t("pageTitle")} />
        <p className="text-neutral-600 mt-4">{t("sublabel")}</p>
      </ComponentLayout>
      <Events showHeader={false} layout="grid" />
    </div>
  );
};

export default EventsPage;
