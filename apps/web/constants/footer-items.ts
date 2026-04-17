import { Facebook, Instagram, X, Youtube, Linkedin } from "lucide-react";

export const FOOTER_SECTIONS = [
  {
    title: "about",
    items: [
      { key: "whoWeAre", href: "/#our-story" },
      { key: "ourMission", href: "/#our-story" },
      { key: "ourStory", href: "/#our-story" },
      { key: "team", href: "#" },
    ],
  },
  {
    title: "ourPillars",
    items: [
      { key: "billionDollarChallenge", href: "/billion-dollar-challenge" },
      { key: "dfreeAfrica", href: "/africa" },
      { key: "communityCampaigns", href: "/community-campaigns" },
      { key: "finfest", href: "/finfest" },
      { key: "dfreeAccessScholarships", href: "/access-scholarships" },
    ],
  },
  {
    title: "getInvolved",
    items: [
      {
        key: "support",
        href: "https://dfree.com/sponsorship-inquiry/",
        target: "_blank",
      },
      {
        key: "partner",
        href: "https://dfree.com/partner-with-us/",
        target: "_blank",
      },
      {
        key: "travelWithUs",
        href: "https://firststeptours.com/dfree/",
        target: "_blank",
      },
      {
        key: "volunteer",
        href: "#",
        // target: "_blank",
      },
    ],
  },
];
export const SOCIAL_LINKS = [
  {
    icon: Facebook,
    href: "http://facebook.com/thedfreemovement",
    target: "_blank",
  },
  {
    icon: Instagram,
    href: "http://instagram.com/dfreemovement",
    target: "_blank",
  },
  {
    icon: X,
    href: "https://x.com/dfreemovement?s=11",
    target: "_blank",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/dfreemovement/posts/?feedView=all",
    target: "_blank",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/@dfreemovement?si=SkjKFWVdqjUp0H47",
    target: "_blank",
  },
];
