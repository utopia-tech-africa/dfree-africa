import type { StaticImageData } from "next/image";

export const EVENT_KEYS = [
  "workshop",
  "seminar",
  "conference",
  "donation",
] as const;

export type EventKey = (typeof EVENT_KEYS)[number];

export type EventMeta = {
  id: EventKey;
  image: StaticImageData | string;
  link: string;
};

export const EVENTS_META: EventMeta[] = [
  {
    id: "workshop",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773147892/57b6d58e-b3d4-4a96-bb5d-58341b71c924.webp",

    link: "#",
  },
  {
    id: "seminar",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773149221/1ae06724-82e6-41ef-a184-a8d989401e5f.webp",

    link: "#",
  },
  {
    id: "conference",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773149357/f7188288-975f-4aba-95a8-53735e07b42d.webp",
    link: "#",
  },
  {
    id: "donation",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773149479/b08db857-4dd9-4b3d-be48-96f4699e3e01.webp",
    link: "#",
  },
];
