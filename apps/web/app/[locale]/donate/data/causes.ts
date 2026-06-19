export type DonateCause = {
  id: string;
  title: string;
  description: string;
  country: string;
  previewMedia: {
    type: "image" | "video";
    url: string;
  };
  isOngoing: boolean;
  progressPercent: number;
  goalAmount: number;
  goalAchieved: boolean;
};

export const donateCauses: DonateCause[] = [
  {
    id: "african-community-icons",
    title: "Support for African Community Icons of Change",
    description:
      "We continue to provide ongoing support for Mad. Evelina Tshabalala and Queenmother Nana Dokua in the form of cash and material donations.",
    country: "Ghana",
    previewMedia: {
      type: "video",
      url: "https://res.cloudinary.com/dhsfafapt/video/upload/v1771599711/Evelyn_Queen_vf1l1v.mp4",
    },
    isOngoing: true,
    progressPercent: 100,
    goalAmount: 35000,
    goalAchieved: true,
  },
  {
    id: "clean-water-uganda",
    title: "Clean water wells for Uganda",
    description:
      "Providing clean, safe drinking water to villages in Uganda's Bugwere Kingdom through deep-aquifer borehole wells restoring health, dignity, and opportunity to families once reliant on contaminated ponds.",
    country: "Uganda",
    previewMedia: {
      type: "video",
      url: "https://res.cloudinary.com/dhsfafapt/video/upload/v1771599802/Uganda_k6vf7a.mp4",
    },
    isOngoing: true,
    progressPercent: 40,
    goalAmount: 35000,
    goalAchieved: false,
  },
  {
    id: "kibi-deaf-school",
    title: "Skills training centre for Kibi School for the deaf",
    description:
      "DFREE® supports the Kyebi School for the Deaf with a vocational center, improving education and opportunities.",
    country: "Ghana",
    previewMedia: {
      type: "video",
      url: "https://res.cloudinary.com/dhsfafapt/video/upload/v1771599849/Training_pqivun.mp4",
    },
    isOngoing: true,
    progressPercent: 70,
    goalAmount: 35000,
    goalAchieved: false,
  },
];
