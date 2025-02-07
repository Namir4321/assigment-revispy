import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const PaginationPage = ({ currentPage, totalPages, onPageChange }) => {
  // Function to generate the list of pages (with ellipsis)
  const generatePages = () => {
    const pages = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("ellipsis");
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const pagesToShow = generatePages();

  // Handler for previous arrow: decrement currentPage by 1 (or by 2 if needed)
  const handlePrev = (e) => {
    e.preventDefault();
    if (currentPage === 1) return;
    // You can adjust this leap logic if you prefer subtracting 2 pages
    const newPage = currentPage - 1;
    onPageChange(newPage);
  };

  // Handler for next arrow: increment currentPage by 1
  const handleNext = (e) => {
    e.preventDefault();
    if (currentPage === totalPages) return;
    const newPage = currentPage + 1;
    onPageChange(newPage);
  };

  return (
    <Pagination>
      <PaginationContent className="gap-0">
        {/* Left arrow: single instance */}
        <PaginationItem>
          <PaginationPrevious
            className="m-0 p-0 hover:bg-transparent"
            onClick={handlePrev}
            disabled={currentPage === 1}
          />
        </PaginationItem>

        {/* Page numbers and ellipsis */}
        {pagesToShow.map((page, index) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                className={`m-0 p-0 hover:bg-transparent ${
                  page === currentPage ? " text-black" : "text-muted-foreground"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  if (page !== currentPage) onPageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Right arrow: single instance */}
        <PaginationItem>
          <PaginationNext
            className="m-0 p-0 hover:bg-transparent"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationPage;
