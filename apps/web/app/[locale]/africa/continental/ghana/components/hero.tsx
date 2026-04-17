import React from "react";
import { cn } from "@/lib/utils";
import { StaticImageData } from "next/image";

interface HeroProps {
  bgImage: string | StaticImageData;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ bgImage, className }) => {
  const bgUrl = typeof bgImage === "string" ? bgImage : bgImage.src;

  return (
    <div
      className={cn("relative w-full h-[50vh] bg-cover bg-center", className)}
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};
