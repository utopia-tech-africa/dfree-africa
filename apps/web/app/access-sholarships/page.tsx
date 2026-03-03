import ComponentLayout from "@/components/component-layout";
import { ASCAbout, ASCHero, WhyScholarshipsMatterSection } from "./components";

export default function AccessSholarships() {
  return (
    <div>
      <ASCHero />
      <ComponentLayout className="my-12 md:my-20 lg:my-32">
        <ASCAbout />
      </ComponentLayout>
      <WhyScholarshipsMatterSection />
    </div>
  );
}
