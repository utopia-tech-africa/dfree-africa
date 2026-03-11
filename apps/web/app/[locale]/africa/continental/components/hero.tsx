import React from "react";
import { cn } from "@/lib/utils";
import { StaticImageData } from "next/image";

interface HeroProps {
  bgImage: string | StaticImageData;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ bgImage, className }) => {
  // If bgImage is an object (StaticImageData), use bgImage.src
  const bgUrl = typeof bgImage === "string" ? bgImage : bgImage.src;

  return (
    <div
      className={cn("relative w-full h-[50vh] bg-cover bg-center", className)}
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};
