import type { StaticImageData } from "next/image";
import { EventImg1, EventImg2, EventImg3 } from "@/assets";

export const EVENT_KEYS = [
  "workshop",
  "seminar",
  "conference",
  "donation",
] as const;

export type EventKey = (typeof EVENT_KEYS)[number];

export type EventMeta = {
  id: EventKey;
  image: StaticImageData;
  link: string;
};

export const EVENTS_META: EventMeta[] = [
  {
    id: "workshop",
    image: EventImg1,
    link: "#",
  },
  {
    id: "seminar",
    image: EventImg2,
    link: "#",
  },
  {
    id: "conference",
    image: EventImg3,
    link: "#",
  },
  {
    id: "donation",
    image: EventImg3,
    link: "#",
  },
];
