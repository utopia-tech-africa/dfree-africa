import type { StaticImageData } from "next/image";

export const PILLAR_KEYS = [
  "finfest",
  "billionDollarChallenge",
  "dfreeAfrica",
  "communityCampaigns",
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
      "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/782d96e6-798d-404a-81ce-433389d70c45.webp",
    bgImageMobile:
      "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/1be39d5e-1a94-4668-a31f-fe320452bc8c.webp",
    logo: "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/460a80a0-bebe-4445-bb9e-d094df497a65.webp",
    imagePositionClassName: "object-[center_34%] md:object-center",
  },
  dfreeAfrica: {
    href: "/africa",
    bgImage:
      "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/4a78e47474569357f6bcf5de958ef8f31159175b_ulgt5a.webp",
    bgImageMobile:
      "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/4a78e47474569357f6bcf5de958ef8f31159175b_ulgt5a.webp",
    logo: "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/5a53b87a-0019-4653-b832-7db0069659fc.webp",
    imagePositionClassName: "object-[center_28%] md:object-center",
  },
  communityCampaigns: {
    href: "/community-campaigns",
    bgImage:
      "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/57b6d58e-b3d4-4a96-bb5d-58341b71c924.webp",
    bgImageMobile:
      "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/68f3de75-b463-40a7-83f3-5a564f0fa2c2.webp",
    imagePositionClassName: "object-[center_42%] md:object-center",
  },
  finfest: {
    href: "/finfest",
    bgImage:
      "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/19196c2e-fc21-4039-8477-15455bc423d2.webp",
    bgImageMobile:
      "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/61e1a5e8-7f04-40b7-9692-0c375da2c80c.webp",
    imagePositionClassName: "object-[center_26%] md:object-center",
  },
  accessScholarships: {
    href: "/leadership-institute",
    bgImage:
      "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/baa58ff9d2a36004894d1316d3d5698a16f38671_m6n11w.webp",
    bgImageMobile:
      "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/pillars_buttom_up_mobile_wyz4ti.webp",
    imagePositionClassName: "object-[center_24%] md:object-center",
  },
};
