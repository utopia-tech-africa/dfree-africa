import { Testimonial } from "@/lib/testimonials";
import Image from "next/image";

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white p-6 sm:p-8 flex flex-col items-center justify-between text-center min-w-full sm:min-w-[75%] md:min-w-0 md:flex-1 ">
      <p className="text-neutral-1000 text-base md:text-[18px] font-bold leading-[140%] mb-8 sm:mb-10">
        {testimonial.text}
      </p>

      <div className="flex items-center gap-4 -mt-8 md:mt-auto">
        <div
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 overflow-hidden"
          style={{ background: "linear-gradient(to bottom, #7CDB17, #42750C)" }}
        >
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={60}
            height={60}
            className="object-cover w-full h-full rounded-full"
          />
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-neutral-900 font-semibold text-sm sm:text-base">
            {testimonial.name}
          </span>
          <span className="text-neutral-600 text-xs sm:text-sm">
            {testimonial.title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
