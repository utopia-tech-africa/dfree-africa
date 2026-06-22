import ComponentLayout from "@/components/component-layout";
import { PageLayout } from "@/components/page-layout";
import { createMetadata } from "@/lib/seo";
import { getEventBySlug, LocaleForTranslation } from "@/lib/sanity";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventBody, EventHeader, EventImages } from "./components";
import { OtherEvents } from "@/app/components/events";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const event = await getEventBySlug(slug, locale as LocaleForTranslation);

  if (!event) {
    return createMetadata({
      title: t("event.title"),
      description: t("event.descriptionFallback"),
      path: `/${locale}/events/${slug}`,
      noIndex: true,
    });
  }

  const description =
    event.description?.slice(0, 160) || t("event.descriptionFallback");

  return createMetadata({
    title: event.title,
    description,
    path: `/${locale}/events/${slug}`,
    image: event.imageUrl || undefined,
    keywords: [
      "DFREE events",
      ...(event.category ? [event.category] : []),
      "community workshops",
    ],
  });
}

const EventDetailPage = async ({ params }: Props) => {
  const { locale, slug } = await params;
  const event = await getEventBySlug(slug, locale as LocaleForTranslation);

  if (!event) {
    notFound();
  }

  return (
    <>
      <PageLayout>
        <ComponentLayout className="sm:space-y-8 mt-20">
          <EventHeader event={event} />
        </ComponentLayout>
        <hr className="my-5 sm:my-12" />
        <ComponentLayout className="sm:space-y-8 mb-20">
          <EventBody event={event} />
          <EventImages event={event} />
        </ComponentLayout>
      </PageLayout>
      <OtherEvents currentSlug={slug} locale={locale as LocaleForTranslation} />
    </>
  );
};

export default EventDetailPage;
