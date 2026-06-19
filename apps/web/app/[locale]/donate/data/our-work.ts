import type { LucideIcon } from "lucide-react";
import { Building2, Droplets, BriefcaseMedical } from "lucide-react";

export type OurWorkPillar = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const ourWorkPillars: OurWorkPillar[] = [
  {
    icon: Droplets,
    title: "Clean Water Access",
    description:
      "Building sustainable infrastructure to ensure reliable access to safe drinking water in marginalized regions.",
  },
  {
    icon: BriefcaseMedical,
    title: "Medical Aid",
    description:
      "Deploying emergency mobile clinics and supplying critical medical resources to underserved communities.",
  },
  {
    icon: Building2,
    title: "Community Development",
    description:
      "Your contribution supports local initiatives, infrastructure, and educational programs.",
  },
];
