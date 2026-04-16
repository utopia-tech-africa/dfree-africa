"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import ComponentLayout from "@/components/component-layout";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const getEmbedUrl = (url: string) => {
  if (url.includes("drive.google.com")) {
    return url.includes("/preview") ? url : `${url}/preview`;
  }
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match?.[2]?.length === 11
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
    : url; // Fallback to original URL if no match but let it render in iframe
};

export interface SectionCardSingleProps {
  title: string;
  description: string;
  className?: string;
  video?: {
    thumbnail?: string;
    logo?: string;
    label: string;
    href: string;
  };
}

export const SectionCard: React.FC<SectionCardSingleProps> = ({
  title,
  description,
  className,
  video,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const embedUrl = video ? getEmbedUrl(video.href) : null;
  return (
    <ComponentLayout>
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-6 py-12 ",
          className,
        )}
      >
        <div className="">
          <h3 className="font-roboto uppercase font-bold text-3xl md:text-5xl lg:text-6xl">
            {title}
          </h3>
        </div>
        <div>
          <p className="text-lg whitespace-pre-line">{description}</p>
          {video && (
            <div
              onClick={() => setIsOpen(true)}
              className="mt-6 flex items-center flex-wrap gap-4 group cursor-pointer"
            >
              <div className="relative w-40 h-24 bg-neutral-200 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                {video.thumbnail && (
                  <img
                    src={video.thumbnail}
                    alt={video.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative  transform group-hover:scale-150 transition-transform z-10">
                  <Play className="w-7 h-7 fill-white text-white ml-0.5" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                {video.logo && (
                  <img src={video.logo} alt="YouTube" className="h-10" />
                )}
              </div>
              <span className="font-bold text-xl tracking-wide">
                {video.label}
              </span>
            </div>
          )}

          <AnimatePresence>
            {isOpen && embedUrl && (
              <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl z-10"
                >
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 bg-black/80 text-white rounded-full hover:bg-black/90 cursor-pointer transition-colors z-20"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <iframe
                    src={embedUrl}
                    title={video?.label}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ComponentLayout>
  );
};
