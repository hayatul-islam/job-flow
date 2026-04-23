import {
  Pagination as PaginationComp,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { JobsParams } from "@/types";

interface PaginationMeta {
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface JobPaginationProps {
  pagination: PaginationMeta;
  onPageChange: (key: keyof JobsParams, value: any) => void;
  queryKey?: keyof JobsParams;
}

export default function Pagination({
  pagination,
  onPageChange,
  queryKey = "page",
}: JobPaginationProps) {
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) pages.push("ellipsis");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("ellipsis");

    pages.push(totalPages);

    return pages;
  };

  return (
    <PaginationComp>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              hasPrevPage && onPageChange(queryKey, currentPage - 1)
            }
            className={
              !hasPrevPage ? "pointer-events-none opacity-40" : "cursor-pointer"
            }
          />
        </PaginationItem>

        {getPages().map((page, i) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() =>
                  page !== currentPage && onPageChange(queryKey, page)
                }
                className={page !== currentPage ? "cursor-pointer" : ""}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              hasNextPage && onPageChange(queryKey, currentPage + 1)
            }
            className={
              !hasNextPage ? "pointer-events-none opacity-40" : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComp>
  );
}
