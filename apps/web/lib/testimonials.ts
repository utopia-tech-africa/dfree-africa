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
  image?: StaticImageData | string;
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
    videoUrl:
      "https://res.cloudinary.com/dan9camhs/video/upload/v1776166046/i_am_dfree_Dee_Marshall_wodjae.mp4",
  },
  {
    id: "alesia",
    videoUrl:
      "https://res.cloudinary.com/dan9camhs/video/upload/v1776166044/dfree_Testimonial_-_Alesia_Boone_zyfzyv.mp4",
  },
  {
    id: "aimy",
    videoUrl:
      "https://res.cloudinary.com/dan9camhs/video/upload/v1776166045/dfree_Testimonial_-_Aimy_Steele_aqhwqu.mp4",
  },
];
