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

export const OUR_PILLARS = {
  label: "Pillars",
  title: "Pillars",
  subtitle:
    "Creative solutions crafted to tackle financial hurdles. We aim to overcome your monetary challenges.",
  pillars: [
    {
      pillar: "Billion Dollar Challenge",
      description:
        "The Billion Dollar Challenge (BDC) is a digital initiative of the DFREE® Global Foundation that helps individuals and organizations reduce debt and build savings through goal tracking, behavioral motivation, and community accountability, while providing partners with measurable, data-driven impact.",
      bgImage: PillarImg1,
      bgImageMobile: PillarImg1Mobile,
      logo: BillionDollarLogo,
      imagePositionClassName: "object-[center_34%] md:object-center",
      href: "",
    },
    {
      pillar: "DFREE® Global Foundation in Africa",
      description:
        "The DFREE® Global Foundation is deeply committed to advancing financial  literacy, leadership development, and community empowerment across the  African continent through strategic partnerships and targeted  investments.",
      bgImage: PillarImg2,
      bgImageMobile: PillarImg2Mobile,
      logo: DfreeAfricaLogo,
      imagePositionClassName: "object-[center_28%] md:object-center",
      href: "/africa",
    },
    {
      pillar: "Community Campaigns",
      description:
        "The DFREE® Global Foundation leads community-wide campaigns that unite churches, civic groups, and local organizations to deliver coordinated financial empowerment programs, fostering shared learning, accountability, and collective celebration through structured launches, weekly sessions, and culminating graduation events.",
      bgImage: PillarImg3,
      bgImageMobile: PillarImg3Mobile,
      imagePositionClassName: "object-[center_42%] md:object-center",
      href: "",
    },
    {
      pillar: "FinFe$t®: Where Wealth Meets Wellness",
      description:
        "FinFe$t® is the DFREE® Global Foundation’s signature free community event that blends financial education, health, and wellness through engaging experiences, equipping families with practical tools to drive holistic well-being and long-term prosperity.",
      bgImage: PillarImg4,
      bgImageMobile: PillarImg4Mobile,
      imagePositionClassName: "object-[center_26%] md:object-center",
      href: "",
    },
    {
      pillar: "DFREE® Access Sholarships",
      description:
        "The DFREE® Scholarship Program provides need-based support that removes financial barriers to participation in the DFREE® journey, offering access to educational resources, digital learning, live training, and limited emergency assistance to help individuals pursue debt reduction and lasting financial freedom.",
      bgImage: PillarImg5,
      bgImageMobile: PillarImg5Mobile,
      imagePositionClassName: "object-[center_24%] md:object-center",
      href: "",
    },
  ],
};
