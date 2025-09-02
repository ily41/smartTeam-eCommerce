import React from 'react';
import { X } from 'lucide-react';

export function ActiveFilters() {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4 my-3">
      <span className="inline-flex items-center px-3 bg-white border-[#237CFF] rounded-md py-1 text-sm   border">
        Samsung
        <button className="ml-2 hover:text-gray-900">
          <X className="w-3 h-3" />
        </button>
      </span>

      <span className="inline-flex items-center px-3 bg-white border-[#237CFF] rounded-md py-1 text-sm   border">
        Apple
        <button className="ml-2 hover:text-gray-900">
          <X className="w-3 h-3" />
        </button>
      </span>

      <span className="inline-flex items-center px-3 bg-white border-[#237CFF] rounded-md py-1 text-sm   border">
        Pocco
        <button className="ml-2 hover:text-gray-900">
          <X className="w-3 h-3" />
        </button>
      </span>
      
      <span className="inline-flex items-center px-3 bg-white border-[#237CFF] rounded-md py-1 text-sm   border">
        Metallic
        <button className="ml-2 hover:text-gray-900">
          <X className="w-3 h-3" />
        </button>
      </span>
      <button className="text-sm text-red-500 hover:text-red-600 font-medium">
        Clear all filter
      </button>
    </div>
  );
}