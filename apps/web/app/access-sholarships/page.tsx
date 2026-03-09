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
