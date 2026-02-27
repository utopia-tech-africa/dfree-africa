"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { OUR_PILLARS } from "@/lib/pillars";
import ComponentLayout from "@/components/component-layout";
import { PillarCard } from "./pillar-card";

const NAVBAR_TOP = "var(--navbar-height)";
const PILLAR_HEADER_HEIGHT_FALLBACK = 120;

function PillarsHeader({
  headerRef,
}: {
  headerRef: RefObject<HTMLElement | null>;
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

function PillarStackItem({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="sticky top-(--pillar-sticky-offset)"
      style={{
        minHeight: "var(--pillar-card-height)",
        zIndex: 20 + index,
      }}
    >
      {children}
    </div>
  );
}

const Pillars = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const [layout, setLayout] = useState({
    navbarHeight: 0,
    pillarHeaderHeight: PILLAR_HEADER_HEIGHT_FALLBACK,
    ready: false,
  });

  useLayoutEffect(() => {
    const pillarHeaderEl = headerRef.current;
    const globalHeaderEl = document.querySelector<HTMLElement>(
      '[data-global-header="true"]',
    );
    if (!pillarHeaderEl || !globalHeaderEl) return;

    const measure = () => {
      const navbarHeight = globalHeaderEl.getBoundingClientRect().height;
      const pillarHeaderHeight = pillarHeaderEl.getBoundingClientRect().height;
      setLayout((prev) => {
        const next = {
          navbarHeight,
          pillarHeaderHeight,
          ready: navbarHeight > 0 && pillarHeaderHeight > 0,
        };
        const didChange =
          prev.navbarHeight !== next.navbarHeight ||
          prev.pillarHeaderHeight !== next.pillarHeaderHeight ||
          prev.ready !== next.ready;

        return didChange ? next : prev;
      });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(globalHeaderEl);
    observer.observe(pillarHeaderEl);
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  return (
    <section
      id="pillars-section"
      ref={sectionRef}
      className="mb-20 w-full overflow-x-clip bg-neutral-100 scroll-mt-24 md:mb-30 md:scroll-mt-28 lg:mb-40"
      aria-labelledby="pillars-heading"
      style={
        {
          "--navbar-height": `${layout.navbarHeight}px`,
          "--pillar-header-height": `${layout.pillarHeaderHeight}px`,
          "--pillar-sticky-offset":
            "calc(var(--navbar-height) + var(--pillar-header-height))",
          "--pillar-card-height":
            "calc(100svh - var(--navbar-height) - var(--pillar-header-height))",
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
          <PillarStackItem key={item.pillar} index={index}>
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
          </PillarStackItem>
        ))}
      </div>
    </section>
  );
};

export default Pillars;
