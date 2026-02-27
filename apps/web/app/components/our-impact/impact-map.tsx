"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { WorldMapSvg } from "@/assets/svg";

/** Pin positions as percentage of container (left, top) */
const MAP_PINS = [
  { left: "12%", top: "7%" },
  { left: "28%", top: "13%" },
  { left: "42%", top: "58%" },
  { left: "42%", top: "80%" },
  { left: "58%", top: "57%" },
  { left: "72%", top: "12%" },
] as const;

export function ImpactMap() {
  return (
    <div className="relative size-full min-h-[280px] w-full shrink-0 md:min-h-[400px] lg:size-[711px]">
      <div className="relative size-full overflow-hidden rounded-full">
        <Image
          src={WorldMapSvg}
          alt="World map showing DFREE impact locations"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 711px"
        />
      </div>
      {MAP_PINS.map((pin, index) => (
        <div
          key={index}
          className="absolute size-9 text-primary-500 md:size-[70px]"
          style={{
            left: pin.left,
            top: pin.top,
            transform: "translate(-50%, -50%)",
          }}
          aria-hidden
        >
          <MapPin className="size-full fill-primary-500 stroke-primary-600" />
        </div>
      ))}
    </div>
  );
}
