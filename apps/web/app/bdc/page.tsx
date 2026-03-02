import { BDCHero, AboutBdc, BDCImpact } from "./components";
import { HowItWorks } from "./components/how-it-works";

export default function BDCPage() {
  return (
    <div>
      <BDCHero />
      <AboutBdc />
      <BDCImpact />
      <HowItWorks />
    </div>
  );
}
