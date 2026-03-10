"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProjectsFilter } from "./components/projects-filter";
import { ProjectCard } from "./components/project-card";
import { Pagination } from "@/components/pagination/pagination";
import type { ProjectForUI, YearWithProjectIds } from "@/lib/sanity";

const ITEMS_PER_PAGE = 6;
const PARAM_YEAR = "year";
const PARAM_PAGE = "page";
const PARAM_COUNTRY = "country";

type AllProjectsProps = {
  projects: ProjectForUI[];
  yearsWithProjectIds: YearWithProjectIds[];
};

function parseYear(value: string | null): number | null {
  if (value == null || value === "") return null;
  const n = Number(value);
  return Number.isInteger(n) ? n : null;
}

function parsePage(value: string | null): number {
  if (value == null || value === "") return 1;
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 ? n : 1;
}

function parseCountry(value: string | null): string | null {
  if (value == null || value === "") return null;
  try {
    const decoded = decodeURIComponent(value.trim()).toLowerCase();
    return decoded.length > 0 ? decoded : null;
  } catch {
    return null;
  }
}

export const AllProjects = ({
  projects,
  yearsWithProjectIds,
}: AllProjectsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const yearFromUrl = parseYear(searchParams.get(PARAM_YEAR));
  const pageFromUrl = parsePage(searchParams.get(PARAM_PAGE));
  const countryFromUrl = parseCountry(searchParams.get(PARAM_COUNTRY));

  const [selectedYear, setSelectedYear] = useState<number | null>(yearFromUrl);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    countryFromUrl,
  );

  const validYears = useMemo(
    () => new Set(yearsWithProjectIds.map((y) => y.year)),
    [yearsWithProjectIds],
  );

  useEffect(() => {
    const year = parseYear(searchParams.get(PARAM_YEAR));
    const page = parsePage(searchParams.get(PARAM_PAGE));
    const country = parseCountry(searchParams.get(PARAM_COUNTRY));
    setSelectedYear(year);
    setCurrentPage(page);
    setSelectedCountry(country);
  }, [searchParams]);

  const setQueryParams = useCallback(
    (updates: {
      year?: number | null;
      page?: number;
      country?: string | null;
    }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (updates.year !== undefined) {
        if (updates.year === null) params.delete(PARAM_YEAR);
        else params.set(PARAM_YEAR, String(updates.year));
      }
      if (updates.page !== undefined) {
        if (updates.page <= 1) params.delete(PARAM_PAGE);
        else params.set(PARAM_PAGE, String(updates.page));
      }
      if (updates.country !== undefined) {
        if (updates.country === null || updates.country === "")
          params.delete(PARAM_COUNTRY);
        else params.set(PARAM_COUNTRY, updates.country.toLowerCase());
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const filteredProjects = useMemo(() => {
    let list = projects;
    if (selectedCountry != null && selectedCountry !== "") {
      list = list.filter(
        (p) => p.country?.toLowerCase() === selectedCountry.toLowerCase(),
      );
    }
    if (selectedYear !== null && validYears.has(selectedYear)) {
      const yearData = yearsWithProjectIds.find((y) => y.year === selectedYear);
      if (yearData) {
        const idSet = new Set(yearData.projectIds);
        list = list.filter((p) => idSet.has(p._id));
      }
    }
    return list;
  }, [
    projects,
    yearsWithProjectIds,
    selectedYear,
    selectedCountry,
    validYears,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / ITEMS_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages);

  useEffect(() => {
    if (totalPages >= 1 && currentPage > totalPages) {
      setCurrentPage(totalPages);
      setQueryParams({ page: totalPages });
    }
  }, [totalPages, currentPage, setQueryParams]);

  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleYearSelect = useCallback(
    (year: number | null) => {
      setSelectedYear(year);
      setCurrentPage(1);
      setQueryParams({ year, page: 1 });
    },
    [setQueryParams],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      setQueryParams({ page });
    },
    [setQueryParams],
  );

  const clearCountryFilter = useCallback(() => {
    setSelectedCountry(null);
    setCurrentPage(1);
    setQueryParams({ country: null, page: 1 });
  }, [setQueryParams]);

  return (
    <div className="flex flex-col gap-10 my-6">
      {selectedCountry != null && selectedCountry !== "" && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-neutral-600">
            Showing projects in{" "}
            <strong className="text-neutral-900">
              {selectedCountry.replace(/\b\w/g, (c) => c.toUpperCase())}
            </strong>
          </span>
          <button
            type="button"
            onClick={clearCountryFilter}
            className="text-primary-600 hover:underline font-medium"
          >
            Show all countries
          </button>
        </div>
      )}
      <ProjectsFilter
        years={yearsWithProjectIds.map((y) => y.year)}
        selectedYear={selectedYear}
        onYearSelect={handleYearSelect}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {currentProjects.map((project) => (
          <ProjectCard
            key={
              "_id" in project && typeof project._id === "string"
                ? project._id
                : String(project.title)
            }
            title={project.title}
            description={project.description}
            country={project.country}
            previewMedia={project.previewMedia}
            slug={project.slug}
          />
        ))}
      </div>

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
