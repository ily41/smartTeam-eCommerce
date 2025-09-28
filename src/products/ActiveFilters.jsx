import React from 'react';
import { X } from 'lucide-react';

export function ActiveFilters({ filters, onRemoveFilter }) {
  if (!filters || filters.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onRemoveFilter(filter)}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm hover:bg-red-100 transition-colors"
        >
          <span>{filter.label}</span>
          <X className="w-3.5 h-3.5" />
        </button>
      ))}
    </div>
  );
}