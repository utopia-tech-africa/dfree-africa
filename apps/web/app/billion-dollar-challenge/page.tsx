import Testimonials from "../components/testimonials/testimonials";
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
      <Testimonials />
      <BDCBanner />
    </div>
  );
}
