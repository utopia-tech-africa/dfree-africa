import { Suspense } from "react";
import ComponentLayout from "@/components/component-layout";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { createMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  EventsFilter,
  EventsGrid,
  EventsGridSkeleton,
  EventsPagination,
} from "./components";
import {
  getEventCategories,
  getEventsCount,
  LocaleForTranslation,
} from "@/lib/sanity";
import { routing } from "@/i18n/routing";

const EVENTS_PER_PAGE = 12;

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; page?: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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

const EventsPage = async (props: PageProps) => {
  const { locale } = await props.params;
  const { category, page } = await props.searchParams;

  const t = await getTranslations("home.events");
  const categories = await getEventCategories();
  const selectedCategory = category || null;
  const currentPage = parseInt(page || "1") || 1;

  const safeLocale = (
    (routing.locales as readonly string[]).includes(locale)
      ? locale
      : routing.defaultLocale
  ) as LocaleForTranslation;

  const totalCount = await getEventsCount(selectedCategory);
  const totalPages = Math.ceil(totalCount / EVENTS_PER_PAGE);

  return (
    <div className="flex flex-col my-20 lg:my-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
      <ComponentLayout className="flex flex-col items-center text-center mb-10">
        <Subtitle text={t("pageTitle")} />
        <p className="text-neutral-800 text-lg mt-4 max-w-3xl">
          {t("sublabel")}
        </p>
      </ComponentLayout>
      <EventsFilter
        categories={categories}
        selectedCategory={selectedCategory}
      />
      <Suspense
        key={`${safeLocale}-${selectedCategory}-${currentPage}`}
        fallback={<EventsGridSkeleton />}
      >
        <EventsGrid
          category={selectedCategory}
          locale={safeLocale}
          page={currentPage}
        />
      </Suspense>
      <EventsPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default EventsPage;
