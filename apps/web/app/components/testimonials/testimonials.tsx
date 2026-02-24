import { QuotationMarks } from "@/assets";
import ComponentLayout from "@/components/component-layout";
import { testimonials } from "@/lib/testimonials";
import TestimonialCard from "./testimonial-card";
import { Title } from "@/components/title-and-subtitle/title";

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-neutral-100 py-200 md:py-20 lg:py-40">
      <ComponentLayout>
        <div className="relative z-10 max-w-3xl mx-auto mb-10 md:mb-6 text-center flex flex-col gap-3 px-4 sm:px-0">
          <Title text="Testimonials" />

          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[38px] font-extrabold text-secondary-600 leading-tight font-montserrat">
            Real stories of change
          </h2>

          <p className="font-normal leading-[120%] font-poppins text-neutral-1000 text-base sm:text-lg">
            Voices that reveal the power of financial transformation
          </p>
        </div>

        <div className="relative z-10 px-4 sm:px-0">
          <QuotationMarks className="absolute -top-60 -left-5 w-24 h-24 md:-top-42 md:-left-20 md:w-47.5 md:h-47.5 pointer-events-none z-10" />

          <QuotationMarks className="absolute -bottom-18 -right-5 w-24 h-24 md:-bottom-40 md:-right-20 md:w-47.5 md:h-47.5 rotate-180 pointer-events-none z-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 relative">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </ComponentLayout>
    </section>
  );
};

export default Testimonials;
