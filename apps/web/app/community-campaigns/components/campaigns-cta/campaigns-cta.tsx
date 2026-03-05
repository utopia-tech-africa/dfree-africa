import { CampaignsCtaImg } from "@/assets";
import { CampaignsCtaPattern } from "@/assets/svg/campaigns-cta-pattern";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const CampaignsCta = () => {
  return (
    <div className="relative">
      <div className=" absolute top-30 w-full h-full overflow-hidden">
        <CampaignsCtaPattern />
      </div>

      <div className="lg:px-20 relative overflow-visible">
        {/* green */}
        <div className="relative pt-10 md:pt-10 lg:pt-0 bg-primary-500 lg:rounded-lg min-h-105 flex flex-col lg:flex-row items-center  lg:px-16 overflow-visible">
          {/* texts */}
          <div className="relative px-4 md:px-10 lg:px-0 z-20 w-full lg:w-[45%] text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[1.2]">
              Ready to join the community?
            </h2>

            <p className="text-base md:text-lg leading-relaxed opacity-95 max-w-130 mt-4 mb-4">
              Tell us about your goals and challenges,
              <br />
              We&apos;ll help guide you to the support that best serves your
              journey.
            </p>
            <Link href={"#"} className="w-fit">
              <Button
                variant="default"
                size="default"
                className="h-auto font-montserrat bg-white text-neutral-1000 font-semibold gap-3 px-3 py-3 leading-[1.3] md:px-8 text-sm md:text-base transition-colors ease-in-out duration-300"
              >
                Join the movement
              </Button>
            </Link>
          </div>

          {/* img */}
          <div className="relative w-full mt-10 lg:mt-0 lg:absolute lg:right-0 lg:-top-21.5 lg:w-[50%] lg:max-w-160 lg:h-126.5 lg:rounded-lg pointer-events-none z-10 overflow-hidden ">
            <div className="relative w-full aspect-640/506 lg:aspect-auto lg:h-full">
              <Image
                src={CampaignsCtaImg}
                alt="Community celebrating together"
                fill
                priority
                className="object-cover"
              />

              {/* desktop gradient */}
              <div
                aria-hidden
                className="hidden lg:block absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(240.309deg, rgba(77,103,49,0) 72%, rgb(77,103,49) 82%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
