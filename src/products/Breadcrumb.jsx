import React from 'react';
import { ChevronRight } from 'lucide-react';

export function Breadcrumb() {
  return (
    <nav className="flex items-center space-x-2 text-sm text-[#8B96A5]  inter">
      <a href="#" className="hover:text-gray-900 transition-colors text-lg">Home</a>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <a href="#" className="hover:text-gray-900 transition-colors text-lg">Laptops</a>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <span className=" font-medium text-lg text-black">Office Laptops</span>
    </nav>
  );
}