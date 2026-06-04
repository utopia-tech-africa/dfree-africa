import ComponentLayout from "@/components/component-layout";
import Image from "next/image";
import { ImpactHeader } from "./impact-header";
import { ImpactStats } from "./impact-stats";
// import { ImpactGlobe } from "./impact-globe";

export function OurImpact() {
  return (
    <section
      className="relative w-full overflow-hidden py-12 md:py-16 lg:py-20"
      aria-labelledby="our-impact-heading"
    >
      <div className="absolute top-0 -left-50 -z-10 md:w-[60%]">
        <Image
          src={
            "https://res.cloudinary.com/dan9camhs/image/upload/v1773224828/6ea76738-7c0b-4a59-9ff9-5a2b3d706604.webp"
          }
          alt="bg pattern"
          className="object-left"
          height={900}
          width={900}
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
      </div>
      <ComponentLayout className="flex flex-col gap-12 ">
        <ImpactHeader />
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <ImpactStats />
          </div>
          <div className="relative order-1 flex h-[343px] w-full items-center justify-center md:h-[420px] lg:h-[520px] overflow-hidden rounded-xl lg:order-2">
            {/* <ImpactGlobe className="h-full w-full" /> */}
            <Image
              src="https://res.cloudinary.com/dan9camhs/image/upload/v1778687575/impact_image_vl1hdu.png"
              alt="Impact Statistics"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </ComponentLayout>
    </section>
  );
}
