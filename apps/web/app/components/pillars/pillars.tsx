"use client";

import { useEffect, useRef } from "react";
import { OUR_PILLARS } from "@/lib/pillars";
import { PillarCard } from "./pillar-card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NAVBAR_OFFSET = 80;
const Pillars = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardsRef.current;

      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: `top top+=${NAVBAR_OFFSET}`,
          end: "+=100%",
          pin: true,
          pinSpacing: false,
        });

        if (index !== cards.length - 1) {
          gsap.to(card, {
            scale: 0.94,
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: `top center`,
              end: `top top+=${NAVBAR_OFFSET}`,
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-neutral-100 py-16">
      <div className="">
        <div className="sticky top-0 z-40 mb-16 bg-neutral-100 py-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-semibold text-primary-600">
              {OUR_PILLARS.title}
            </h2>

            <p className="max-w-xl text-sm text-muted-foreground md:text-base">
              {OUR_PILLARS.subtitle}
            </p>
          </div>
        </div>
        <div ref={containerRef} className="relative">
          {OUR_PILLARS.pillars.map((pillarItem, index) => (
            <div
              key={pillarItem.pillar}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="relative -mt-20 first:mt-0"
            >
              <PillarCard
                pillar={pillarItem.pillar}
                description={pillarItem.description}
                bgImage={pillarItem.bgImage}
                logo={pillarItem.logo}
                href={pillarItem.href}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
