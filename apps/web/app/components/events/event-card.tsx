"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { ContentCard } from "@/components/content-card/content-card";

export interface EventCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
  tag?: string;
  location: string;
  link: string;
  eventDate: string;
}

export const EventCard: FC<EventCardProps> = ({
  title,
  description,
  imageUrl,
  category,
  tag,
  location,
  link,
  eventDate,
}) => {
  const t = useTranslations("home.events.featuredEvents");

  return (
    <ContentCard
      variant="event"
      image={imageUrl}
      category={category}
      tag={tag}
      title={title}
      description={description}
      location={location}
      link={link}
      ctaLabel={t("viewEventCta")}
      eventDate={eventDate}
    />
  );
};
