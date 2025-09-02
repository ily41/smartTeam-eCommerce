import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination() {
  return (
    <div className="flex items-center justify-center lg:justify-center mt-8 lg:gap-4">


        <div className="flex items-center bg-white">
            <button className="p-2 w-10 h-10 rounded-l-lg flex justify-center items-center border-r-0 border-1 border-[#dee2e7] hover:bg-gray-100">
                <ChevronLeft className="w-4 h-4" />
            </button>

            <button className="w-10 h-10 text-sm font-medium border-1 border-[#dee2e7] bg-gray-900 text-white">
                1
            </button>
            <button className="w-10 h-10 text-sm font-medium border-1 border-[#dee2e7] text-gray-700 hover:bg-gray-100">
                2
            </button>
            <button className="w-10 h-10 text-sm font-medium border-1 border-[#dee2e7] text-gray-700 hover:bg-gray-100">
                3
            </button>

            <button className="p-2 w-10 h-10 rounded-r-lg flex justify-center items-center border-l-0 border-1 border-[#dee2e7] hover:bg-gray-100">
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
      
      
    </div>
  );
}
