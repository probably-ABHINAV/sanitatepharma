'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-gray-100">
      {/* Prev Button */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-textMid hover:bg-gray-50 hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Prev</span>
        </Link>
      ) : (
        <div className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-gray-300 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
          <span>Prev</span>
        </div>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          // Show first, last, and pages around current page
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <Link
                key={page}
                href={createPageUrl(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                  currentPage === page
                    ? 'bg-teal text-white shadow-sm'
                    : 'text-textMid hover:bg-gray-50 hover:text-primary'
                }`}
              >
                {page}
              </Link>
            );
          }
          
          // Show ellipsis
          if (
            (page === 2 && currentPage > 3) ||
            (page === totalPages - 1 && currentPage < totalPages - 2)
          ) {
            return (
              <span key={page} className="w-9 h-9 flex items-center justify-center text-gray-400">
                ...
              </span>
            );
          }
          
          return null;
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-textMid hover:bg-gray-50 hover:text-primary transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <div className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-gray-300 cursor-not-allowed">
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
