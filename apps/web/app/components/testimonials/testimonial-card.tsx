import Image from "next/image";
import { useTranslations } from "next-intl";
import type { TestimonialMeta } from "@/lib/testimonials";

type Props = {
  testimonial: TestimonialMeta;
};

const TestimonialCard = ({ testimonial }: Props) => {
  const t = useTranslations("home.testimonials");
  const baseKey = `items.${testimonial.id}`;

  const isVideo = !!testimonial.videoUrl;

  const handleClick = () => {
    if (testimonial.videoUrl) {
      window.open(testimonial.videoUrl, "_blank");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white p-6 sm:p-8 flex flex-col items-center justify-between text-center 
      min-w-[85%] sm:min-w-[60%] md:min-w-[400px] lg:min-w-[450px]
      ${isVideo ? "cursor-pointer transition" : ""}`}
    >
      <p className="text-neutral-900 text-base md:text-lg font-bold leading-[140%] mb-8 sm:mb-10">
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
            src={testimonial.image}
            alt={t(`${baseKey}.name`)}
            width={58}
            height={58}
            className="object-cover w-full h-full rounded-full"
          />

          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
              <span className="text-white text-xs">▶</span>
            </div>
          )}
        </div>

        {/* Name + Title */}
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
