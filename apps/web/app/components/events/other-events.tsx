import { getEvents, LocaleForTranslation } from "@/lib/sanity";
import { OtherEventsCarousel } from "./other-events-carousel";

interface OtherEventsProps {
  currentSlug: string;
  locale: LocaleForTranslation;
}

export const OtherEvents = async ({
  currentSlug,
  locale,
}: OtherEventsProps) => {
  const events = await getEvents(locale, null, 1, 12, currentSlug);

  const displayEvents = [...events]
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)
    .map((item) => ({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl || "",
      category: item.category,
      tag: item.tag,
      location: item.location,
      link: item.link,
      eventDate: item.eventDate,
    }));

  if (!displayEvents.length) return null;

  return <OtherEventsCarousel events={displayEvents} />;
};
