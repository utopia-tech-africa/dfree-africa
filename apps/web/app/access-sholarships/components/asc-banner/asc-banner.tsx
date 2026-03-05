import { ASCBannerImg } from "@/assets/img";
import { Banner } from "@/components/banners/banner";

export const AscBanner = () => {
  return (
    <Banner
      backgroundImage={ASCBannerImg}
      title="Start Your Journey Today"
      description="Financial freedom is within reach. Whether you're ready to transform your own financial future or help others do the same, the next step is yours to take."
      label="Apply for Scholarship"
      href="#"
      secondaryLabel="Become a Sponsor"
      secondaryHref="#"
    />
  );
};
