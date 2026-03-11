"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";
import {
  WhoWeAreImg1,
  WhoWeAreImg2,
  WhoWeAreImg3,
  WhoWeAreImg4,
} from "@/assets";

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
      {[WhoWeAreImg1, WhoWeAreImg2, WhoWeAreImg3, WhoWeAreImg4].map(
        (img, index) => (
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
              <motion.div
                className="absolute inset-0"
                variants={curtainVariant}
              >
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
        ),
      )}
    </div>
  );
};
