import ComponentLayout from "@/components/component-layout";
import {
  ASCAbout,
  ASCHero,
  ASCWhatsCovered,
  ASCWhyScholarshipsMatterSection,
} from "./components";

export default function AccessSholarships() {
  return (
    <div>
      <ASCHero />
      <ASCAbout />
      <ASCWhyScholarshipsMatterSection />
      <ASCWhatsCovered />
    </div>
  );
}
