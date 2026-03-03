import {
  ASCAbout,
  ASCAccessibilty,
  ASCHero,
  AscHowItWorks,
  ASCWhatsCovered,
  ASCWhyScholarshipsMatterSection,
} from "./components";

export default function AccessSholarships() {
  return (
    <div className="space-y-10">
      <ASCHero />
      <ASCAbout />
      <ASCWhyScholarshipsMatterSection />
      <ASCWhatsCovered />
      <ASCAccessibilty />
      <AscHowItWorks />
    </div>
  );
}
