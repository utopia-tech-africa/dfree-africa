import ComponentLayout from "@/components/component-layout";
import { ASCAbout, ASCHero } from "./components";

export default function AccessSholarships() {
  return (
    <div>
      <ASCHero />
      <ComponentLayout className="my-12 space-y-12 md:space-y-20 lg:space-y-32">
        <ASCAbout />
      </ComponentLayout>
    </div>
  );
}
