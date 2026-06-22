import Image from "next/image";
import { EventDetailForUI } from "@/lib/sanity/events";
import { PageTitle } from "@/components/page-title/page-title";
import { formatEventDateLong } from "@/lib/format-event-date";
import { FaCalendarDays } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

type EventHeaderProps = { event: EventDetailForUI };

type EventMetaItemProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

const EventMetaItem = ({ icon, label, value }: EventMetaItemProps) => (
  <div className="flex items-start gap-3 min-w-0 flex-1">
    <div
      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-600/15 text-primary-600"
      aria-hidden
    >
      {icon}
    </div>
    <div className="min-w-0 pt-0.5">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
        {label}
      </p>
      <p className="mt-1 text-base md:text-lg font-semibold text-neutral-900 leading-snug">
        {value}
      </p>
    </div>
  </div>
);

export const EventHeader = async ({ event }: EventHeaderProps) => {
  const t = await getTranslations("home.events.detail");
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
      {badgeLabel && (
        <span className="inline-block w-fit px-2 py-1 text-xs 2xl:text-sm font-poppins rounded-[4px] text-neutral-100 bg-tertiary-600">
          {badgeLabel}
        </span>
      )}

      <PageTitle text={title} />

      {showMeta && (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-0">
            {location && (
              <EventMetaItem
                icon={<MdLocationPin size={22} />}
                label={t("locationLabel")}
                value={location}
              />
            )}

            {location && dateLabel && (
              <div
                className="hidden sm:block w-px bg-neutral-200 mx-5 shrink-0"
                aria-hidden
              />
            )}

            {location && dateLabel && (
              <div className="h-px bg-neutral-200 sm:hidden" aria-hidden />
            )}

            {dateLabel && (
              <EventMetaItem
                icon={<FaCalendarDays size={20} />}
                label={t("dateLabel")}
                value={dateLabel}
              />
            )}
          </div>
        </div>
      )}

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
