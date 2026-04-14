import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import type { TestimonialMeta } from "@/lib/testimonials";

type Props = {
  testimonial: TestimonialMeta;
};

const TestimonialCard = ({ testimonial }: Props) => {
  const t = useTranslations("home.testimonials");
  const baseKey = `items.${testimonial.id}`;

  const isVideo = !!testimonial.videoUrl;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  if (isVideo) {
    return (
      <div
        className="bg-white p-4 sm:p-6 flex flex-col items-center text-center 
        min-w-[85%] sm:min-w-[60%] md:min-w-100 lg:min-w-112.5"
      >
        {/* vid testimonial */}
        <div className="w-full aspect-video mb-4 relative">
          <video
            ref={videoRef}
            src={testimonial.videoUrl}
            className="w-full h-full rounded-lg object-cover"
            autoPlay
            playsInline
            muted
            loop
          />

          <div className="absolute inset-0 rounded-lg pointer-events-none bg-[linear-gradient(180deg,rgba(102,102,102,0)_64.65%,rgba(0,0,0,0.52)_85.58%)]" />

          <div className="absolute bottom-2 left-2 text-white text-lg md:text-[20px] font-extrabold z-10">
            {t(`${baseKey}.name`)}
          </div>

          <button
            onClick={toggleMute}
            className="absolute top-2 right-2 bg-[#AFAFAF40] text-white p-2 rounded-full"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>
    );
  }

  // text testimonial
  return (
    <div
      className="bg-white p-6 sm:p-8 flex flex-col items-center justify-between text-center 
      min-w-[85%] sm:min-w-[60%] md:min-w-100 lg:min-w-112.5"
    >
      <p className="text-neutral-900 text-base md:text-lg font-bold leading-[140%] mb-2 sm:mb-3">
        {t(`${baseKey}.text`)}
      </p>

      <div className="flex items-center gap-4 -mt-8 md:mt-auto">
        <div
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 overflow-hidden"
          style={{
            background: "linear-gradient(to bottom, #7CDB17, #42750C)",
          }}
        >
          <Image
            src={testimonial.image!}
            alt={t(`${baseKey}.name`)}
            width={58}
            height={58}
            className="object-cover w-full h-full rounded-full"
          />
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-neutral-900 font-semibold text-sm sm:text-base">
            {t(`${baseKey}.name`)}
          </span>
          <span className="text-neutral-600 text-xs sm:text-sm">
            {t(`${baseKey}.title`)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
