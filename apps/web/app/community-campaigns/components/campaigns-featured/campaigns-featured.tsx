import { FeaturedCampaignsImg } from "@/assets";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const CAMPAIGNS_FEATURED_CONTENT = {
  title: "NEWARK WOMEN MOVING FORWARD",
  description:
    "In 2024, Newark launched its inaugural campaign under the leadership of First Lady Linda Baraka. Women across the city are reclaiming financial control, reducing debt, and building the economic resilience their families deserve.",
  subtexts: [
    {
      text: "Faith rooted",
      desc: "Churches and community organizations anchor the work with trust and spiritual grounding.",
    },
    {
      text: "Real change",
      desc: "Women are moving from financial stress toward stability and long-term wealth building.",
    },
  ],
  image: FeaturedCampaignsImg,
  href: "#",
} as const;

const CampaignsFeatured = () => {
  return (
    <ComponentLayout>
      <section className="flex flex-col md:flex-row items-stretch">
        <div className="flex-1 flex flex-col justify-center">
          <Title text="Featured Campaigns" />
          <h1 className="font-montserrat font-bold text-2xl md:text-3xl lg:text-[46px] leading-[120%] text-neutral-1000 my-4">
            {CAMPAIGNS_FEATURED_CONTENT.title}
          </h1>
          <p className="text-neutral-800 mb-6">
            {CAMPAIGNS_FEATURED_CONTENT.description}
          </p>

          <div className="flex flex-col md:flex-row md:gap-10 gap-6">
            {CAMPAIGNS_FEATURED_CONTENT.subtexts.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col gap-2">
                <h3 className="text-neutral-1000 font-bold leading-[120%] text-lg md:text-xl lg:text-[22px]">
                  {item.text}
                </h3>
                <p className="text-neutral-900 text-base md:text-lg">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <Link href={CAMPAIGNS_FEATURED_CONTENT.href} className="w-fit mt-8">
            <Button
              variant="default"
              size="default"
              className="h-auto gap-3 px-3 py-3 text-sm leading-[1.3] font-medium md:px-8 md:text-lg"
              icon={
                <ArrowRight
                  className="size-4.5 shrink-0 md:size-5"
                  strokeWidth={2}
                />
              }
            >
              Discover More
            </Button>
          </Link>
        </div>

        <div className="flex-1 w-full flex">
          <div className="relative flex-1 min-h-75 md:min-h-0">
            <Image
              src={CAMPAIGNS_FEATURED_CONTENT.image}
              alt="Featured Campaigns Image"
              className="object-cover rounded-lg"
              fill
              priority
            />
          </div>
        </div>
      </section>
    </ComponentLayout>
  );
};

export default CampaignsFeatured;
