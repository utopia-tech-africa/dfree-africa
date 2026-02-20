import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  X,
  Youtube,
  Linkedin,
} from "lucide-react";

export const footerItems = {
  footerAbout: ["Who we are", "Our mission", "Our story", "Team"],

  footerPillars: [
    "Billion Dollar Challenge",
    "DFREE Africa",
    "Community Campaigns",
    "FinFe$t",
    "DFREE Access Scholarships",
  ],

  getInvolved: ["Support", "Partner", "Travel with Us", "Volunteer"],

  connectWithUs: [
    {
      icons: [Phone],
      text: "(844) 693-3733",
    },
    {
      icons: [Mail],
      text: "info@dfree.com",
    },
    {
      icons: [Facebook, Instagram, X, Linkedin, Youtube],
    },
  ],

  policies: [
    { text: "Privacy policy", link: "" },
    { text: "Terms of service", link: "" },
    { text: "Cookies settings", link: "" },
  ],
};
