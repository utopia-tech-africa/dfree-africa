import React from "react";
import ComponentLayout from "@/components/component-layout";
import { EventCard } from "@/app/components/events/event-card";
import { getEvents, LocaleForTranslation } from "@/lib/sanity";
import { CalendarDays } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface EventsGridProps {
  category: string | null;
  locale: LocaleForTranslation;
  page?: number;
}

export const EventsGrid = async ({
  category,
  locale,
  page = 1,
}: EventsGridProps) => {
  const [t, events] = await Promise.all([
    getTranslations("home.events.featuredEvents"),
    getEvents(locale, category, page),
  ]);

  if (!events.length) {
    return (
      <ComponentLayout className="py-12">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="bg-neutral-50 p-6 rounded-full border border-neutral-100 shadow-sm transition-transform hover:scale-105 duration-300">
            <CalendarDays className="size-12 text-neutral-300" />
          </div>
          <div className="max-w-md">
            <p className="text-neutral-500 text-lg leading-relaxed">
              {t("emptyState.description")}
            </p>
          </div>
        </div>
      </ComponentLayout>
    );
  }

  return (
    <ComponentLayout className="mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((item) => (
          <EventCard key={item._id} {...item} />
        ))}
      </div>
    </ComponentLayout>
  );
};
