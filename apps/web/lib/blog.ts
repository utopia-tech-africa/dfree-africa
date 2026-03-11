import type { StaticImageData } from "next/image";
import { BlogImg1, BlogImg2, BlogImg3, BlogImg4 } from "@/assets";

export const BLOG_KEYS = [
  "realEstateWealth",
  "collectiveEconomics",
  "faithBasedInvesting",
  "investingWithPurpose",
] as const;

export type BlogKey = (typeof BLOG_KEYS)[number];

export type BlogMeta = {
  id: BlogKey;
  image: StaticImageData;
  link: string;
};

export const BLOG_POSTS_META: BlogMeta[] = [
  {
    id: "realEstateWealth",
    image: BlogImg1,
    link: "#",
  },
  {
    id: "collectiveEconomics",
    image: BlogImg2,
    link: "#",
  },
  {
    id: "faithBasedInvesting",
    image: BlogImg3,
    link: "#",
  },
  {
    id: "investingWithPurpose",
    image: BlogImg4,
    link: "#",
  },
];
