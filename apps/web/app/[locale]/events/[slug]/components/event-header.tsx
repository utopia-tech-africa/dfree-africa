import Image from "next/image";
import { EventDetailForUI } from "@/lib/sanity/events";
import { PageTitle } from "@/components/page-title/page-title";
import { formatEventDateLong } from "@/lib/format-event-date";
import { FaCalendarDays } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";

type EventHeaderProps = { event: EventDetailForUI };

export const EventHeader = async ({ event }: EventHeaderProps) => {
  const {
    title,
    category,
    tag,
    description,
    imageUrl,
    imageAlt,
    location,
    eventDate,
  } = event;
  const badgeLabel = [category, tag].filter(Boolean).join(" | ");
  const dateLabel = eventDate ? formatEventDateLong(eventDate) : undefined;
  const showMeta = Boolean(location || dateLabel);

  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="flex flex-col items-start gap-2">
        <PageTitle text={title} />
        <span className="inline-block w-fit rounded-[4px] bg-tertiary-600 px-2 py-1 font-poppins text-xs text-neutral-100 2xl:text-sm">
          {badgeLabel}
        </span>
        {showMeta && (
          <div className="flex flex-col items-start gap-2 pt-1 text-sm text-neutral-700 md:text-base">
            {location && (
              <span className="inline-flex items-center gap-2">
                <MdLocationPin
                  size={18}
                  className="shrink-0 text-primary-600"
                  aria-hidden
                />
                {location}
              </span>
            )}
            {dateLabel && (
              <span className="inline-flex items-center gap-2">
                <FaCalendarDays
                  size={16}
                  className="shrink-0 text-primary-600"
                  aria-hidden
                />
                {dateLabel}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="relative w-full aspect-video rounded-md overflow-hidden bg-neutral-800">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority
          />
        )}
      </div>

      {description && (
        <p className="text-neutral-900 font-normal text-base md:text-lg leading-[130%]">
          {description}
        </p>
      )}
    </section>
  );
};
