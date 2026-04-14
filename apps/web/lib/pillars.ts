import type { StaticImageData } from "next/image";

export const PILLAR_KEYS = [
  "billionDollarChallenge",
  "dfreeAfrica",
  "communityCampaigns",
  "finfest",
  "accessScholarships",
] as const;

export type PillarKey = (typeof PILLAR_KEYS)[number];

export type PillarData = {
  href: string;
  bgImage: StaticImageData | string;
  bgImageMobile: StaticImageData | string;
  logo?: StaticImageData | string;
  imagePositionClassName: string;
};

export const PILLARS_DATA: Record<PillarKey, PillarData> = {
  billionDollarChallenge: {
    href: "/billion-dollar-challenge",
    bgImage:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773147593/782d96e6-798d-404a-81ce-433389d70c45.webp",
    bgImageMobile:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773147678/1be39d5e-1a94-4668-a31f-fe320452bc8c.webp",
    logo: "https://res.cloudinary.com/dan9camhs/image/upload/v1773147451/460a80a0-bebe-4445-bb9e-d094df497a65.webp",
    imagePositionClassName: "object-[center_34%] md:object-center",
  },
  dfreeAfrica: {
    href: "/africa",
    bgImage:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1776182122/4a78e47474569357f6bcf5de958ef8f31159175b_ulgt5a.jpg",
    bgImageMobile:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773147830/bb0ffce1-62df-48d1-a6d2-28ff3807bbcf.webp",
    logo: "https://res.cloudinary.com/dan9camhs/image/upload/v1773147090/5a53b87a-0019-4653-b832-7db0069659fc.webp",
    imagePositionClassName: "object-[center_28%] md:object-center",
  },
  communityCampaigns: {
    href: "/community-campaigns",
    bgImage:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773147892/57b6d58e-b3d4-4a96-bb5d-58341b71c924.webp",
    bgImageMobile:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773147960/68f3de75-b463-40a7-83f3-5a564f0fa2c2.webp",
    imagePositionClassName: "object-[center_42%] md:object-center",
  },
  finfest: {
    href: "/finfest",
    bgImage:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773148022/19196c2e-fc21-4039-8477-15455bc423d2.webp",
    bgImageMobile:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773148076/61e1a5e8-7f04-40b7-9692-0c375da2c80c.webp",
    imagePositionClassName: "object-[center_26%] md:object-center",
  },
  accessScholarships: {
    href: "/access-scholarships",
    bgImage:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1776182346/baa58ff9d2a36004894d1316d3d5698a16f38671_m6n11w.jpg",
    bgImageMobile:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773148188/88d34c7a-1893-415b-b188-6014cf91c1b6.webp",
    imagePositionClassName: "object-[center_24%] md:object-center",
  },
};
