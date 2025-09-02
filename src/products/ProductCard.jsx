import React from 'react';
import { Heart } from 'lucide-react';

export function ProductCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="aspect-square p-4 bg-gray-50 ">
        <img
          src="./deals/productImageExample.svg"
          alt="iPhone 12 Mini"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4 relative">
        <div className="mb-8">
          <p className="text-lg lg:text-xl font-semibold text-gray-900">680 AZN</p>
          <p className="text-sm lg:text-md text-gray-600">Pos Komputer</p>
        </div>

        <button className="w-full text-sm lg:text-md bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
          Add to the cart
        </button>
        
        <button className="absolute top-4 right-4 p-3 rounded-lg border-[#DEE2E7] bg-white shadow-sm">
          <Heart  color = "red" className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}