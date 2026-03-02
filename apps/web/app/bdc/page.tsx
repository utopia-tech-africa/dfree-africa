import {
  BDCHero,
  AboutBdc,
  BDCImpact,
  HowItWorks,
  Partners,
  Audience,
  BDCBanner,
} from "./components";

export default function BDCPage() {
  return (
    <div>
      <BDCHero />
      <AboutBdc />
      <BDCImpact />
      <HowItWorks />
      <Audience />
      <Partners />
      <BDCBanner />
    </div>
  );
}
