"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";

export const ImagesSection = () => {
  const curtainVariant: Variants = {
    hidden: { y: "-100%" },
    visible: {
      y: "0%",
      transition: {
        duration: 0.8,
        ease: [0.55, 0.085, 0.68, 0.53] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10 sm:mt-16 md:mt-20">
      {[
        "https://res.cloudinary.com/dan9camhs/image/upload/v1773224314/4d13dd61-d288-497b-b26f-b99883c910a7.webp",
        "https://res.cloudinary.com/dan9camhs/image/upload/v1773224395/f1f4147b-70ad-4df5-8def-ec96977616de.webp",
        "https://res.cloudinary.com/dan9camhs/image/upload/v1773224630/image_himdrp.webp",
        "https://res.cloudinary.com/dan9camhs/image/upload/v1773224706/7105d8da-2e21-4c96-a79f-6b1f89612175.webp",
      ].map((img, index) => (
        <div
          key={index}
          className="relative w-full aspect-[4/3] even:mt-8 md:even:mt-16"
        >
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.15 }}
          >
            <motion.div className="absolute inset-0" variants={curtainVariant}>
              <Image
                src={img}
                alt="Who We Are Image Gallery"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 48vw, 25vw"
              />
            </motion.div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};
