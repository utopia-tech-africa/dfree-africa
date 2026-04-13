import type { StaticImageData } from "next/image";

export const TESTIMONIAL_KEYS = [
  "shirley",
  "michele",
  "lloyd",
  "gregory",
  "diana",
  "dee",
  "alesia",
  "aimy",
] as const;

export type TestimonialKey = (typeof TESTIMONIAL_KEYS)[number];

export type TestimonialMeta = {
  id: TestimonialKey;
  image: StaticImageData | string;
  videoUrl?: string;
};

export const TESTIMONIALS: TestimonialMeta[] = [
  {
    id: "shirley",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1776081385/Richard_Shirley_ikm6v2.jpg",
  },
  {
    id: "michele",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1776081610/Michele_Bailey_reshgk.jpg",
  },
  {
    id: "lloyd",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1776081665/Lloyd_Branch_joum67.jpg",
  },
  {
    id: "gregory",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1776084781/Gregory_Lawrence_bqkfrm.jpg",
  },
  {
    id: "diana",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1776082997/Diana_Belle_kjdy4a.jpg",
  },
  {
    id: "dee",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1776081385/Richard_Shirley_ikm6v2.jpg",
    videoUrl: "https://www.youtube.com/watch?v=3fduSDDo8ZA",
  },
  {
    id: "alesia",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1776081385/Richard_Shirley_ikm6v2.jpg",
    videoUrl: "https://www.youtube.com/watch?v=Z4vdh7Gin6c",
  },
  {
    id: "aimy",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1776081385/Richard_Shirley_ikm6v2.jpg",
    videoUrl: "https://www.youtube.com/watch?v=vDmmUx2f7ts",
  },
];
