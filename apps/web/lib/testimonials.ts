import type { StaticImageData } from "next/image";

export const TESTIMONIAL_KEYS = ["marcus", "elena", "david"] as const;

export type TestimonialKey = (typeof TESTIMONIAL_KEYS)[number];

export type TestimonialMeta = {
  id: TestimonialKey;
  image: StaticImageData | string;
};

export const TESTIMONIALS: TestimonialMeta[] = [
  {
    id: "marcus",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773224011/ebafd8d7-907a-4536-a18f-d2f6a92270a1.webp",
  },
  {
    id: "elena",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773224100/0872fc0e-5eb0-4c5a-becf-8c00fc4423c7.webp",
  },
  {
    id: "david",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773224197/6fe5cad9-aae6-451a-b381-ba4e7c20382e.webp",
  },
];
