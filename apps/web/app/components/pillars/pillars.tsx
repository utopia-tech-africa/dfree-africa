"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OUR_PILLARS } from "@/lib/pillars";
import ComponentLayout from "@/components/component-layout";
import { PillarCard } from "./pillar-card";

const NAVBAR_TOP = "var(--navbar-height)";
const PILLAR_HEADER_HEIGHT_FALLBACK = 120;

function PillarsHeader({
  headerRef,
}: {
  headerRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <header
      ref={headerRef}
      className="sticky z-40 bg-white"
      style={{ top: NAVBAR_TOP }}
    >
      <ComponentLayout className="flex start justify-between py-4">
        <h2
          id="pillars-heading"
          className="w-[125px] shrink-0 font-montserrat text-[26px] font-bold leading-none text-secondary-600 md:text-[32px]"
        >
          {OUR_PILLARS.title}
        </h2>
        <p className="w-[218px] shrink-0 text-right font-poppins text-xs font-normal leading-[1.2] text-neutral-1000 md:w-[503px] md:text-lg md:leading-[1.3]">
          {OUR_PILLARS.subtitle}
        </p>
      </ComponentLayout>
    </header>
  );
}

const Pillars = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [layout, setLayout] = useState({
    navbarHeight: 0,
    pillarHeaderHeight: PILLAR_HEADER_HEIGHT_FALLBACK,
    cardHeight: 0,
    ready: false,
  });

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    const pillarHeaderEl = headerRef.current;
    const globalHeaderEl = document.querySelector<HTMLElement>(
      '[data-global-header="true"]',
    );
    if (!sectionEl || !pillarHeaderEl || !globalHeaderEl) return;

    const measure = () => {
      const navbarHeight = globalHeaderEl.getBoundingClientRect().height;
      const pillarHeaderHeight = pillarHeaderEl.getBoundingClientRect().height;
      const cardHeight = Math.max(
        0,
        Math.ceil(window.innerHeight - navbarHeight - pillarHeaderHeight),
      );

      setLayout({
        navbarHeight,
        pillarHeaderHeight,
        cardHeight,
        ready: navbarHeight > 0 && pillarHeaderHeight > 0 && cardHeight > 0,
      });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(globalHeaderEl);
    observer.observe(pillarHeaderEl);
    window.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, []);

  useLayoutEffect(() => {
    if (!layout.ready) return;

    const sectionEl = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!sectionEl || cards.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);
    const stickyOffset = layout.navbarHeight + layout.pillarHeaderHeight;

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        const nextCard = cards[index + 1];

        ScrollTrigger.create({
          trigger: card,
          start: `top top+=${stickyOffset}`,
          endTrigger: nextCard ?? sectionEl,
          end: nextCard ? `top top+=${stickyOffset}` : "bottom bottom",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      });
    }, sectionEl);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [layout]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-neutral-100 mb-20 md:mb-30  lg:mb-40"
      aria-labelledby="pillars-heading"
      style={
        {
          "--navbar-height": `${layout.navbarHeight}px`,
          "--pillar-header-height": `${layout.pillarHeaderHeight}px`,
          "--pillar-card-height": `${layout.cardHeight}px`,
        } as CSSProperties
      }
    >
      {/* Navbar underlay: keeps transparent global header from showing moving cards behind it */}
      <div
        className="sticky top-0 z-30 bg-neutral-100"
        style={{ height: "var(--navbar-height)" }}
        aria-hidden
      />
      <PillarsHeader headerRef={headerRef} />
      <div
        className={layout.ready ? "flex flex-col" : "flex flex-col opacity-0"}
      >
        {OUR_PILLARS.pillars.map((item, index) => (
          <div
            key={item.pillar}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
          >
            <PillarCard
              title={item.pillar}
              description={item.description}
              href={item.href}
              backgroundImage={item.bgImage}
              backgroundImageMobile={item.bgImageMobile}
              logo={item.logo}
              imagePositionClassName={item.imagePositionClassName}
              buttonText="Discover more"
              stackIndex={index}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pillars;
