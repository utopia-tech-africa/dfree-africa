"use client";

import React from "react";
import { Pagination } from "@/components/pagination/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import ComponentLayout from "@/components/component-layout";

interface NewsPaginationProps {
  currentPage: number;
  totalPages: number;
}

export const NewsPagination = ({
  currentPage,
  totalPages,
}: NewsPaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: true });
  };

  if (totalPages < 1) return null;

  return (
    <ComponentLayout className="mb-20">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </ComponentLayout>
  );
};
