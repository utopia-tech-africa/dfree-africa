import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // how many numbers beside current page
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  const range = (start: number, end: number) => {
    const length = Math.max(end - start + 1, 0);
    return Array.from({ length }, (_, i) => start + i);
  };

  const generatePagination = () => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, "...", totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);

      return [firstPageIndex, "...", ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }
  };

  const pages = generatePagination();

  if (!pages || pages.length <= 0) return null;

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {/* Previous */}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-[8px] px-5 h-11 border-neutral-300 text-neutral-900 hover:bg-neutral-50 hover:ring-1 hover:ring-primary-400 transition-all duration-200"
      >
        Prev
      </Button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 text-neutral-400">
            ...
          </span>
        ) : (
          <Button
            key={index}
            variant="outline"
            onClick={() => onPageChange(Number(page))}
            className={cn(
              "rounded-[8px] font-medium min-w-[44px] h-11 border-neutral-300 text-neutral-900 hover:bg-neutral-50 hover:ring-1 hover:ring-primary-400 transition-all duration-200",
              currentPage === page &&
                "ring-2 ring-primary-400 border-primary-400 bg-neutral-50 shadow-inner",
            )}
          >
            {page}
          </Button>
        ),
      )}

      {/* Next */}
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-[8px] px-5 h-11 border-neutral-300 text-neutral-900 hover:bg-neutral-50 hover:ring-1 hover:ring-primary-400 transition-all duration-200"
      >
        Next
      </Button>
    </div>
  );
};
