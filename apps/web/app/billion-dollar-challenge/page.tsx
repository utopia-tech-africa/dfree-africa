import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Testimonials from "../components/testimonials/testimonials";
import {
  BDCHero,
  AboutBdc,
  BDCImpact,
  HowItWorks,
  Partners,
  Audience,
  BDCBanner,
} from "./components";

export const metadata: Metadata = createMetadata({
  title: "Billion Dollar Challenge",
  description:
    "Eliminate debt, build savings, and take control of your financial future through the DFREE® Billion Dollar Challenge—a digital platform built on community accountability.",
  path: "/billion-dollar-challenge",
});

export default function BDCPage() {
  return (
    <div>
      <BDCHero />
      <AboutBdc />
      <BDCImpact />
      <HowItWorks />
      <Audience />
      <Partners />
      <Testimonials />
      <BDCBanner />
    </div>
  );
}
