import {
  BDCHero,
  AboutBdc,
  BDCImpact,
  HowItWorks,
  Partners,
} from "./components";
import Audience from "./components/audience/audience";

export default function BDCPage() {
  return (
    <div>
      <BDCHero />
      <AboutBdc />
      <BDCImpact />
      <HowItWorks />
      <Audience />
      <Partners />
    </div>
  );
}
