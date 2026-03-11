import type { StaticImageData } from "next/image";
import {
  BillionDollarLogo,
  DfreeAfricaLogo,
  PillarImg1,
  PillarImg1Mobile,
  PillarImg2,
  PillarImg2Mobile,
  PillarImg3,
  PillarImg3Mobile,
  PillarImg4,
  PillarImg4Mobile,
  PillarImg5,
  PillarImg5Mobile,
} from "@/assets";

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
  logo?: StaticImageData;
  imagePositionClassName: string;
};

export const PILLARS_DATA: Record<PillarKey, PillarData> = {
  billionDollarChallenge: {
    href: "/billion-dollar-challenge",
    bgImage: PillarImg1,
    bgImageMobile: PillarImg1Mobile,
    logo: BillionDollarLogo,
    imagePositionClassName: "object-[center_34%] md:object-center",
  },
  dfreeAfrica: {
    href: "/africa",
    bgImage: PillarImg2,
    bgImageMobile: PillarImg2Mobile,
    logo: DfreeAfricaLogo,
    imagePositionClassName: "object-[center_28%] md:object-center",
  },
  communityCampaigns: {
    href: "/community-campaigns",
    bgImage: PillarImg3,
    bgImageMobile: PillarImg3Mobile,
    imagePositionClassName: "object-[center_42%] md:object-center",
  },
  finfest: {
    href: "/finfest",
    bgImage: PillarImg4,
    bgImageMobile: PillarImg4Mobile,
    imagePositionClassName: "object-[center_26%] md:object-center",
  },
  accessScholarships: {
    href: "/access-sholarships",
    bgImage: PillarImg5,
    bgImageMobile: PillarImg5Mobile,
    imagePositionClassName: "object-[center_24%] md:object-center",
  },
};
