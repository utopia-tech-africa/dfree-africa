import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import {
  ASCAbout,
  ASCAccessibilty,
  ASCHero,
  AscHowItWorks,
  ASCWhatsCovered,
  ASCWhyScholarshipsMatterSection,
  ASCPartnerWithUs,
  AscBanner,
} from "./components";

export const metadata: Metadata = createMetadata({
  title: "Access Scholarships",
  description:
    "The DFREE® Access Scholarship offers free access to courses, materials, coaching, and events, helping participants achieve financial stability and empowerment.",
  path: "/access-sholarships",
});

export default function AccessSholarships() {
  return (
    <div className="space-y-20 sm:space-y-30">
      <ASCHero />
      <ASCAbout />
      <ASCWhyScholarshipsMatterSection />
      <ASCWhatsCovered />
      <ASCAccessibilty />
      <AscHowItWorks />
      <ASCPartnerWithUs />
      <AscBanner />
    </div>
  );
}
