import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Number of page buttons to show
    
    if (totalPages <= showPages) {
      // Show all pages if total is less than showPages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate range around current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the start
      if (currentPage <= 3) {
        end = 4;
      }
      
      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }
      
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center lg:justify-center mt-8 lg:gap-4">
      <div className="flex items-center bg-white">
        <button 
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`p-2 w-10 h-10 rounded-l-lg flex justify-center items-center border-r-0 border-1 border-[#dee2e7] 
            ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span 
              key={`ellipsis-${index}`} 
              className="w-10 h-10 flex items-center justify-center text-gray-500 border-1 border-[#dee2e7]"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 text-sm font-medium border-1 border-[#dee2e7] transition-colors
                ${currentPage === page 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100 cursor-pointer'}`}
            >
              {page}
            </button>
          )
        ))}

        <button 
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`p-2 w-10 h-10 rounded-r-lg flex justify-center items-center border-l-0 border-1 border-[#dee2e7] 
            ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}