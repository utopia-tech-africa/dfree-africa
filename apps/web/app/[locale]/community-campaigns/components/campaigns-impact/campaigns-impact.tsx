import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { CampaignsImpactImg } from "@/assets";
import Link from "next/link";

const IMPACT_CONTENT = {
  title: "DFREE® Day of Impact",
  subtitle:
    "A Community Activation Model for Financial Freedom, Collaboration and Collective Action",
  description: `The DFREE® Day of Impact is a new initiative that features a one-day, multi-touch community engagement experience designed to introduce DFREE® to a local community, deepen relationships with key leaders, and seed long-term collaboration that leads to measurable financial empowerment outcomes. It brings together nonprofits, faith leaders, civic stakeholders, entrepreneurs, and residents into the launch of an ongoing DFREE ecosystem in the host community.`,
  buttonText: "Learn more",
} as const;

export const CampaignsImpact = () => {
  return (
    <ComponentLayout>
      <div className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <div className="lg:col-span-2 flex flex-col justify-center">
            <Title
              text={IMPACT_CONTENT.title}
              className="mb-4 leading-[130%] font-montserrat"
            />

            <h2 className="text-lg md:text-2xl lg:text-[26px] font-bold font-montserrat leading-[120%] text-neutral-1000 mb-4">
              {IMPACT_CONTENT.subtitle}
            </h2>

            <p className="text-neutral-900 text-base md:text-lg leading-[130%] mb-4">
              {IMPACT_CONTENT.description}
            </p>

            <Link href="#" className="w-fit mt-2">
              <Button
                variant="default"
                size="default"
                className="h-auto gap-3 px-3 py-2 text-sm leading-[1.3] font-medium md:px-8 md:text-lg"
                icon={
                  <ArrowRight
                    className="size-4.5 shrink-0 md:size-5"
                    strokeWidth={2}
                  />
                }
              >
                {IMPACT_CONTENT.buttonText}
              </Button>
            </Link>
          </div>

          <div className="relative lg:col-span-3 w-full aspect-[4/3] lg:aspect-auto lg:h-auto">
            {" "}
            <Image
              src={CampaignsImpactImg}
              alt="DFREE Day of Impact"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain lg:object-cover lg:mask-[linear-gradient(90deg,transparent_0%,black_20%,black_100%)] lg:[-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_20%,black_100%)]
  "
            />
          </div>
        </div>
      </div>
    </ComponentLayout>
  );
};
