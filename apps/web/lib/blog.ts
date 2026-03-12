import type { StaticImageData } from "next/image";

export const BLOG_KEYS = [
  "realEstateWealth",
  "collectiveEconomics",
  "faithBasedInvesting",
  "investingWithPurpose",
] as const;

export type BlogKey = (typeof BLOG_KEYS)[number];

export type BlogMeta = {
  id: BlogKey;
  image: StaticImageData | string;
  link: string;
};

export const BLOG_POSTS_META: BlogMeta[] = [
  {
    id: "realEstateWealth",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773149614/c97d7488-b90d-4c32-96b1-6bff0d0904d8.webp",
    link: "#",
  },
  {
    id: "collectiveEconomics",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773149708/bcb80463-0d5a-4271-b1ab-7f2226707e77.webp",

    link: "#",
  },
  {
    id: "faithBasedInvesting",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773149779/9771c408-19be-44c9-8e48-c3f7f4657bac.webp",

    link: "#",
  },
  {
    id: "investingWithPurpose",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773149830/68677d09-0658-441d-bb94-6ae98b8ca603.webp",

    link: "#",
  },
];
