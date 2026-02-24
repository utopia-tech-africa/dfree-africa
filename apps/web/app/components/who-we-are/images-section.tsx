import Image from "next/image";
import {
  WhoWeAreImg1,
  WhoWeAreImg2,
  WhoWeAreImg3,
  WhoWeAreImg4,
} from "@/assets";

const images = [WhoWeAreImg1, WhoWeAreImg2, WhoWeAreImg3, WhoWeAreImg4];

export const ImagesSection = () => {
  const staggeredClasses = [
    "md:translate-y-0",
    "md:translate-y-8",
    "md:translate-y-0",
    "md:-translate-y-8",
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-16 md:mt-20">
      {images.map((image, index) => (
        <div
          key={index}
          className={`
            relative col-span-1 
            aspect-[4/3] 
            ${staggeredClasses[index]}
            transition-transform duration-300
          `}
        >
          <Image
            src={image}
            alt={`Who We Are Image ${index + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
            priority={index < 2}
          />
        </div>
      ))}
    </div>
  );
};
