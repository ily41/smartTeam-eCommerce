import React from 'react';
import { Heart } from 'lucide-react';

export function ProductCard({col}) {
  if(col) {
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
  )
  }else {
    return (
       <div className="border rounded-xl p-4 bg-white flex items-center gap-6 ">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src="./deals/product.avif"
          alt="Product"
          className="max-w-[150px] object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold">680 AZN</h2>
            <p className="text-gray-500">Pos Komputer</p>
          </div>

          <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
            <Heart className="w-6 h-6 text-red-500" />
          </button>
        </div>

        <div className='grid grid-cols-2'>
        {/* Features */}
          <div className="flex flex-wrap gap-2 mb-9">
            <span className="px-3 py-1 rounded-md border text-gray-700 text-sm">
              16GB RAM
            </span>
            <span className="px-3 py-1 rounded-md border text-gray-700 text-sm">
              Intel® Core™ i7
            </span>
            <span className="px-3 py-1 rounded-md border text-gray-700 text-sm">
              Gray
            </span>
            <span className="px-3 py-1 rounded-md border text-gray-700 text-sm">
              Intel® Core™ i7
            </span>
            <span className="px-3 py-1 rounded-md border text-gray-700 text-sm">
              Intel® Core™ i7
            </span>
          </div>

          {/* Add to Cart */}
          <button className="bg-red-600 text-white h-[50px] self-end rounded-lg text-lg hover:bg-red-700 transition">
            Add to the cart
          </button>
        </div>
      </div>
    </div>
    )
  }
  
}