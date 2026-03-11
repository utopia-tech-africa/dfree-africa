import type { StaticImageData } from "next/image";
import { HeadshotImg1, HeadshotImg2, HeadshotImg3 } from "@/assets";

export const TESTIMONIAL_KEYS = ["marcus", "elena", "david"] as const;

export type TestimonialKey = (typeof TESTIMONIAL_KEYS)[number];

export type TestimonialMeta = {
  id: TestimonialKey;
  image: StaticImageData;
};

export const TESTIMONIALS: TestimonialMeta[] = [
  {
    id: "marcus",
    image: HeadshotImg1,
  },
  {
    id: "elena",
    image: HeadshotImg2,
  },
  {
    id: "david",
    image: HeadshotImg3,
  },
];
