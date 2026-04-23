"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import ComponentLayout from "@/components/component-layout";
import { DfreeLogo } from "@/assets/svg";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";

type NavSubItemConfig = {
  labelKey: string;
  href: string;
};

type NavItemConfig = {
  id: string;
  labelKey: string;
  href: string;
  subItems?: NavSubItemConfig[];
};

const NAV_CONFIG: NavItemConfig[] = [
  {
    id: "about",
    labelKey: "aboutUs",
    href: "#",
    subItems: [
      { labelKey: "ourStory", href: "/#our-story" },
      { labelKey: "ourVision", href: "/#our-story" },
      { labelKey: "ourMission", href: "/#our-story" },
    ],
  },
  {
    id: "impact",
    labelKey: "impact",
    href: "#",
    subItems: [
      { labelKey: "billionDollarChallenge", href: "/billion-dollar-challenge" },
      { labelKey: "globalFoundationInAfrica", href: "/africa" },
      { labelKey: "communityCampaigns", href: "/community-campaigns" },
      { labelKey: "finfest", href: "/finfest" },
      {
        labelKey: "dfreeAccessScholarships",
        href: "/access-scholarships",
      },
    ],
  },
  {
    id: "getInvolved",
    labelKey: "getInvolved",
    href: "#",
    subItems: [
      { labelKey: "booksStore", href: "https://store.dfree.com/" },
      { labelKey: "attendEvents", href: "" },
      { labelKey: "contactUs", href: "#footer" },
    ],
  },
];

function NavTrigger({
  item,
  onMouseEnter,
  label,
}: {
  item: NavItemConfig;
  onMouseEnter: () => void;
  label: string;
}) {
  if (!item.subItems?.length) {
    return (
      <Link
        href={item.href}
        className="flex items-center gap-1 text-sm font-medium text-neutral-100 hover:text-white"
      >
        {label}
      </Link>
    );
  }

  return (
    <div
      onMouseEnter={onMouseEnter}
      className="flex cursor-pointer items-center gap-1 text-sm font-medium text-neutral-100 hover:text-white"
    >
      <span className="flex items-center gap-1">
        {label}
        <ChevronDown className="size-4 shrink-0" aria-hidden />
      </span>
    </div>
  );
}

export const Header = () => {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNavId, setHoveredNavId] = useState<string | null>(null);
  const [expandedMobileSectionId, setExpandedMobileSectionId] = useState<
    string | null
  >("about");
  const [isScrolled, setIsScrolled] = useState(false);

  const hoveredItem = NAV_CONFIG.find((i) => i.id === hoveredNavId);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleMobileSection = (id: string) => {
    setExpandedMobileSectionId((prev) => (prev === id ? null : id));
  };

  return (
    <header
      data-global-header="true"
      className="fixed top-0 left-0 right-0 z-50 w-full transition-[background,backdrop-filter] duration-300"
      style={
        isScrolled
          ? {
              background: "#00000033",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }
          : {
              background: "transparent",
              backdropFilter: "none",
              WebkitBackdropFilter: "none",
            }
      }
    >
      <ComponentLayout className="flex h-16 items-center justify-between md:h-[72px]">
        <div className="flex justify-between w-full">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="dfree home"
          >
            <DfreeLogo />
          </Link>

          <nav
            className="relative hidden md:block"
            onMouseLeave={() => setHoveredNavId(null)}
          >
            <div
              className={cn(
                "flex items-center gap-4 rounded-full px-4 py-2 transition-[background,backdrop-filter] duration-300",
                !isScrolled && "bg-[#00000033] backdrop-blur-[20px]",
              )}
              style={
                !isScrolled
                  ? {
                      WebkitBackdropFilter: "blur(20px)",
                    }
                  : undefined
              }
            >
              {NAV_CONFIG.map((item) => (
                <NavTrigger
                  key={item.id}
                  item={item}
                  label={t(item.labelKey)}
                  onMouseEnter={() => {
                    if (item.subItems?.length) {
                      setHoveredNavId(item.id);
                    }
                  }}
                />
              ))}
            </div>

            {hoveredItem?.subItems && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2">
                <div
                  className="flex w-fit gap-2 rounded-xl bg-white px-2 pb-2 pt-2 shadow-lg animate-[slide-down-from-nav_0.2s_ease-out]"
                  style={{ animationFillMode: "both" }}
                >
                  {hoveredItem.subItems.map((subItem) => (
                    <Link
                      key={subItem.labelKey}
                      href={subItem.href}
                      className={cn(
                        "w-fit max-w-[208px] rounded-full px-4 py-2 text-center text-sm font-bold leading-tight text-neutral-1000",
                      )}
                    >
                      {t(subItem.labelKey)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>
          <div className="flex gap-x-4 md:gap-x-6 items-center">
            <div className="hidden md:block">
              <LocaleSwitcher variant="desktop" />
            </div>
            <Link
              href="https://www.zeffy.com/en-US/donation-form/general-donations-101"
              target="_blank"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "font-medium",
              )}
            >
              {tCommon("donate")}
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex size-12 items-center justify-center rounded-lg text-neutral-100 md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          <Menu className="size-8 stroke-[2.5]" />
        </button>
      </ComponentLayout>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-9998 bg-neutral-1000/60 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed top-0 right-0 z-9999 h-screen w-[80%] max-w-sm bg-white shadow-xl transition-transform duration-300 ease-out md:hidden",
          mobileMenuOpen
            ? "translate-x-0"
            : "translate-x-full pointer-events-none",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex justify-end p-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex size-10 items-center justify-center rounded-lg text-neutral-1000 hover:bg-neutral-200"
              aria-label="Close menu"
            >
              <X className="size-6" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col overflow-y-auto px-6 pb-6">
            {NAV_CONFIG.map((item, index) => {
              const isExpanded = expandedMobileSectionId === item.id;
              const label = t(item.labelKey);
              return (
                <div key={item.id}>
                  {index > 0 && (
                    <hr className="my-4 border-neutral-200" aria-hidden />
                  )}
                  {item.subItems?.length ? (
                    <button
                      type="button"
                      onClick={() => toggleMobileSection(item.id)}
                      className="flex w-full items-center justify-between py-3 text-left text-base font-bold text-neutral-1000"
                    >
                      {label}
                      {isExpanded ? (
                        <ChevronUp className="size-5 shrink-0" />
                      ) : (
                        <ChevronDown className="size-5 shrink-0" />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex w-full items-center justify-between py-3 text-base font-bold text-neutral-1000"
                    >
                      {label}
                    </Link>
                  )}
                  {item.subItems && (
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-out",
                        isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-1 pb-2 pt-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.labelKey}
                              href={subItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="max-w-[208px] py-2 text-sm font-medium leading-tight text-neutral-900"
                            >
                              {t(subItem.labelKey)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="border-t border-neutral-200 p-6 pb-10 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-neutral-600">
                Language
              </span>
              <LocaleSwitcher
                variant="mobile"
                onSelect={() => setMobileMenuOpen(false)}
              />
            </div>
            <Link
              href="#store"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "flex w-full justify-center rounded-full font-medium",
              )}
            >
              {tCommon("visitStore")}
            </Link>
          </div>
        </div>
      </aside>
    </header>
  );
};
