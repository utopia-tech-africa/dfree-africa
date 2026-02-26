import Image from "next/image";
import { MerchBgPattern } from "@/assets/svg";
import ComponentLayout from "@/components/component-layout";
import { LeftPanel, Carousel } from "./components";
import { getFeaturedMerch } from "@/lib/sanity";

export const Merch = async () => {
  const merch = await getFeaturedMerch();

  return (
    <section className="relative w-full flex flex-col justify-center overflow-hidden bg-primary-500 py-12 md:py-2">
      {/* Background pattern */}
      <div className="absolute inset-y-0 left-0 w-full pointer-events-none">
        <Image
          src={MerchBgPattern}
          alt=""
          fill
          className="object-contain object-left"
        />
      </div>

      <ComponentLayout className="relative z-10 py-4 md:py-8 flex flex-col md:flex-row items-center gap-12 md:gap-8">
        {/* left panel is now extracted */}
        <LeftPanel />

        {/* carousel lives in a client component */}
        <Carousel items={merch} />
      </ComponentLayout>
    </section>
  );
};

export default Merch;
