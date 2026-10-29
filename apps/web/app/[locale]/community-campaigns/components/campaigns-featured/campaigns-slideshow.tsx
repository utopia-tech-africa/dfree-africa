"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const IMAGES = [
  "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/Featured_Campaigns_image_2_vnivex.webp",
  "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/Featured_Campaigns_image_4_c9vaip.webp",
  "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/Featured_Campaigns_image_1_xrrpcr.webp",
  "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/Featured_Campaigns_image_3_ag8de4.webp",
];

interface CampaignsSlideshowProps {
  alt: string;
}

export const CampaignsSlideshow = ({ alt }: CampaignsSlideshowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      {IMAGES.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={alt}
            className="object-cover"
            fill
            priority={index === 0}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
          />
        </div>
      ))}
    </div>
  );
};
