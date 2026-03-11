export type Testimonial = {
  text: string;
  image: string;
  name: string;
  title: string;
};

export const testimonials: Testimonial[] = [
  {
    text: `My family has been able to pay off more than $260,000 in debt. The journey has been transformational, a blessing and a source of communion in fellowship.`,
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773224011/ebafd8d7-907a-4536-a18f-d2f6a92270a1.webp",
    name: "Marcus Rodriguez",
    title: "Small business owner",
  },
  {
    text: `I’ve been able to pay at least $65,000 off and save $5,000, which has helped me get back into the saving habit.`,
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773224100/0872fc0e-5eb0-4c5a-becf-8c00fc4423c7.webp",
    name: "Elena Thompson",
    title: "Community leader",
  },
  {
    text: `Paid off 5 credit cards, no longer enslaved to debts and have become much more financially independent.`,
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1773224197/6fe5cad9-aae6-451a-b381-ba4e7c20382e.webp",
    name: "David Chen",
    title: "Tech entrepreneur",
  },
];
