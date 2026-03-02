import { Banner } from "@/components/banners";
import { BDCBannerImg } from "@/assets";

export default function BDCBanner() {
  return (
    <Banner
      backgroundImage={BDCBannerImg}
      title="Take Control of your goals now"
      description="Your journey to financial freedom begins with a simple choice. Start planning your future today."
      label="Join BDC today"
      href="#"
    />
  );
}
