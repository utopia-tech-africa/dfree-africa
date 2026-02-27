"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import ComponentLayout from "@/components/component-layout";
import { DfreeLogoWhite } from "@/assets/svg";

type NavSubItem = {
  label: string;
  href: string;
  active?: boolean;
};

type NavItem = {
  label: string;
  href: string;
  subItems?: NavSubItem[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "About us",
    href: "#",
    subItems: [
      { label: "Our story", href: "#our-story" },
      { label: "Our vision", href: "#our-story" },
      { label: "Our mission", href: "#our-story" },
    ],
  },
  {
    label: "Impact",
    href: "#",
    subItems: [
      { label: "Billion dollar challenge", href: "#" },
      {
        label: "Global Foundation in Africa",
        href: "/africa",
      },
      { label: "Community campaigns", href: "#" },
      {
        label: "Foundation Scholarship Commitment",
        href: "#",
      },
      { label: "FinFe$t", href: "#" },
    ],
  },
  {
    label: "Get involved",
    href: "#",
    subItems: [
      { label: "Get merch", href: "https://store.dfree.com/" },
      { label: "Get Books", href: "https://store.dfree.com/" },
      { label: "Contact us", href: "#footer" },
    ],
  },
];

type HoveredNavKey = "About us" | "Impact" | "Get involved" | null;

function NavTrigger({
  item,
  onMouseEnter,
}: {
  item: NavItem;
  onMouseEnter: () => void;
}) {
  if (!item.subItems?.length) {
    return (
      <Link
        href={item.href}
        className="flex items-center gap-1 text-sm font-medium text-neutral-100 hover:text-white"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      onMouseEnter={onMouseEnter}
      className="flex cursor-pointer items-center gap-1 text-sm font-medium text-neutral-100 hover:text-white"
    >
      <span className="flex items-center gap-1">
        {item.label}
        <ChevronDown className="size-4 shrink-0" aria-hidden />
      </span>
    </div>
  );
}

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<HoveredNavKey>(null);
  const [expandedMobileSection, setExpandedMobileSection] = useState<
    string | null
  >("About us");
  const [isScrolled, setIsScrolled] = useState(false);

  const hoveredItem = NAV_ITEMS.find((i) => i.label === hoveredNav);

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

  const toggleMobileSection = (label: string) => {
    setExpandedMobileSection((prev) => (prev === label ? null : label));
  };

  return (
    <header
      data-global-header="true"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300",
        isScrolled ? "bg-black/10 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <ComponentLayout className="flex h-16 items-center justify-between md:h-[72px]">
        <div className="flex justify-between w-full">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="dfree home"
          >
            <DfreeLogoWhite />
          </Link>

          {/* Desktop nav */}
          <nav
            className="relative hidden md:block"
            onMouseLeave={() => setHoveredNav(null)}
          >
            <div
              className="flex items-center gap-4 rounded-full px-4 py-2"
              style={{
                background: "#00000033",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {NAV_ITEMS.map((item) => (
                <NavTrigger
                  key={item.label}
                  item={item}
                  onMouseEnter={() => {
                    if (item.subItems?.length) {
                      setHoveredNav(item.label as HoveredNavKey);
                    }
                  }}
                />
              ))}
            </div>

            {/* Single dropdown panel - same position for all items */}
            {hoveredItem?.subItems && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2">
                <div
                  className="flex w-fit gap-2 rounded-xl bg-white px-2 pb-2 pt-2 shadow-lg animate-[slide-down-from-nav_0.2s_ease-out]"
                  style={{ animationFillMode: "both" }}
                >
                  {hoveredItem.subItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className={cn(
                        "w-fit max-w-[208px] rounded-full px-4 py-2 text-center text-sm font-bold leading-tight text-neutral-1000",
                        subItem.active && "bg-neutral-200",
                      )}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>
          <div className="flex gap-x-6 items-center">
            <Link
              href="#footer"
              className="text-sm font-medium text-neutral-100 hover:text-white hidden md:flex"
            >
              Contact us
            </Link>

            <Link
              href="#donate"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "font-medium",
              )}
            >
              Donate
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
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

      {/* Mobile sidebar backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-9998 bg-neutral-1000/60 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-9999 h-screen w-[80%] max-w-sm bg-white shadow-xl transition-transform duration-300 ease-out md:hidden",
          mobileMenuOpen
            ? "translate-x-0"
            : "translate-x-full pointer-events-none",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Close button */}
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

          {/* Nav sections */}
          <nav className="flex flex-1 flex-col overflow-y-auto px-6 pb-6">
            {NAV_ITEMS.map((item, index) => {
              const isExpanded = expandedMobileSection === item.label;
              return (
                <div key={item.label}>
                  {index > 0 && (
                    <hr className="my-4 border-neutral-200" aria-hidden />
                  )}
                  {item.subItems?.length ? (
                    <button
                      type="button"
                      onClick={() => toggleMobileSection(item.label)}
                      className="flex w-full items-center justify-between py-3 text-left text-base font-bold text-neutral-1000"
                    >
                      {item.label}
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
                      {item.label}
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
                              key={subItem.label}
                              href={subItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="max-w-[208px] py-2 text-sm font-medium leading-tight text-neutral-900"
                            >
                              {subItem.label}
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

          {/* Visit store button */}
          <div className="border-t border-neutral-200 p-6">
            <Link
              href="#store"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "flex w-full justify-center rounded-full font-medium",
              )}
            >
              Visit store
            </Link>
          </div>
        </div>
      </aside>
    </header>
  );
};
