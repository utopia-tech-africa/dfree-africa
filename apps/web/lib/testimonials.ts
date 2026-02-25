import { HeadshotImg1, HeadshotImg2, HeadshotImg3 } from "@/assets";

import { StaticImageData } from "next/image";

export type Testimonial = {
  text: string;
  image: StaticImageData;
  name: string;
  title: string;
};

export const testimonials: Testimonial[] = [
  {
    text: `My family has been able to pay off more than $260,000 in debt. The journey has been transformational, a blessing and a source of communion in fellowship.`,
    image: HeadshotImg1,
    name: "Marcus Rodriguez",
    title: "Small business owner",
  },
  {
    text: `I’ve been able to pay at least $65,000 off and save $5,000, which has helped me get back into the saving habit.`,
    image: HeadshotImg2,
    name: "Elena Thompson",
    title: "Community leader",
  },
  {
    text: `Paid off 5 credit cards, no longer enslaved to debts and have become much more financially independent.`,
    image: HeadshotImg3,
    name: "David Chen",
    title: "Tech entrepreneur",
  },
];
