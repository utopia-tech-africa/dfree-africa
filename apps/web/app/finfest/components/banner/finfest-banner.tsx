import { Banner } from "@/components/banners";
import { FinFestBannerImg } from "@/assets";

export default function FinFestBanner() {
  return (
    <Banner
      backgroundImage={FinFestBannerImg}
      title="Join us at the next Finfe$t"
      description="Your journey to financial freedom begins with a simple choice. Start planning your future today."
      label="Register today"
      href="#"
    />
  );
}
