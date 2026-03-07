import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

export type Speaker = {
  name: string;
  role: string;
  image: string | StaticImageData;
};

interface SpeakerCardProps {
  speaker: Speaker;
}

export const SpeakerCard = ({ speaker }: SpeakerCardProps) => {
  return (
    <div className="relative w-full h-[420px] max-w-[300px] rounded-[8px] overflow-hidden group">
      {/* Background Image */}
      <Image
        src={speaker.image}
        alt={speaker.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-5 left-5 right-5 space-y-1 text-white">
        <h4 className="text-lg font-bold font-montserrat leading-tight">
          {speaker.name}
        </h4>
        <p className="text-sm tracking-wide line-clamp-2">{speaker.role}</p>
      </div>
    </div>
  );
};
