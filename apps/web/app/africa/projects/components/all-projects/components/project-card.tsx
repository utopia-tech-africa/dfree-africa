import React from "react";
import { Button } from "@/components/ui/button";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  country: string;
  previewMedia: {
    type: string;
    url: string;
  };
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  country,
  previewMedia,
}) => {
  return (
    <div className="relative w-full max-w-105 h-125 rounded-lg overflow-hidden">
      {/* Background Media */}
      {previewMedia.type === "image" ? (
        <Image
          src={previewMedia.url}
          alt={title}
          width={400}
          height={600}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <video
          src={previewMedia.url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Bottom Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent h-1/2 bottom-0 top-auto" />

      {/* Country Badge */}
      <div className="absolute top-4 right-4 z-10">
        <Button className="rounded px-3 py-5">{country}</Button>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 z-10 p-6 flex flex-col gap-2 text-white h-[60%] justify-end">
        <h3 className="font-bold text-xl font-montserrat tracking-wide leading-6">
          {title}
        </h3>

        <p className="text-[16px] text-white/90 line-clamp-3 leading-5">
          {description}
        </p>

        <Button variant="ghost" className="w-fit mt-3 font-normal">
          Read more
          <span className="relative flex items-center overflow-hidden w-6 h-6">
            <span className="flex -translate-x-1/2 transition-transform duration-300 group-hover:translate-x-0">
              <MdKeyboardDoubleArrowRight className="size-7" />
              <MdKeyboardDoubleArrowRight className="size-7" />
            </span>
          </span>
        </Button>
      </div>
    </div>
  );
};
