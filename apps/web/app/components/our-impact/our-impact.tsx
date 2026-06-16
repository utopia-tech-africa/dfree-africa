import ComponentLayout from "@/components/component-layout";
import Image from "next/image";
import { ImpactHeader } from "./impact-header";
import { ImpactStats } from "./impact-stats";
// import { ImpactGlobe } from "./impact-globe";

const IMPACT_IMAGES = [
  "https://res.cloudinary.com/dan9camhs/image/upload/v1781610142/826e0a2cb74de7510e70f82b4eb7669b64ebb062_v5flkz.jpg",
  "https://res.cloudinary.com/dan9camhs/image/upload/v1781610100/d459cafe882e628fc42b070b9047933c682bd474_ctc4v7.jpg",
  "https://res.cloudinary.com/dan9camhs/image/upload/v1781610204/d41ab9086b478d5c11c4145d1bcb90aa2bdc29b8_sarflv.jpg",
  "https://res.cloudinary.com/dan9camhs/image/upload/v1781610239/f3c95ad65f13f952d7bc83d25b713163c54b8111_xctcng.jpg",
];

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
          <div className="order-1 grid grid-cols-2 gap-2 sm:gap-4 w-full h-[343px] md:h-[420px] lg:h-[520px] lg:order-2">
            {IMPACT_IMAGES.map((src, index) => (
              <div
                key={index}
                className="relative w-full h-full overflow-hidden rounded-xl shadow"
              >
                <Image
                  src={src}
                  alt={`Impact ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      </ComponentLayout>
    </section>
  );
}
