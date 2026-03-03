import ComponentLayout from "@/components/component-layout";
import {
  ASCAbout,
  ASCAccessibilty,
  ASCHero,
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
    </div>
  );
}
