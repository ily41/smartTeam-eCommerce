import React from 'react';
import { ChevronDown } from 'lucide-react';

export function FilterSidebar() {
  return (
    <div className=" rounded-lg ">
        <style>
        {`
          details[open] .chevron {
            transform: rotate(180deg);
          }
        `}
      </style>
      <hr  className='mx-4 border-[#dee2e6]'/>
      <details open>
        <summary className="w-full   flex  items-center justify-between p-4 text-left cursor-pointer">
          <span className="font-medium  text-gray-900">Category</span>
          <ChevronDown className="chevron w-4 h-4 text-gray-500 transition-transform duration-200" />
        </summary>
        <div className="px-4 pb-4 space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
            <span className="text-sm text-gray-700">Mobile accessory</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
            <span className="text-sm text-gray-700">Electronics</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
            <span className="text-sm text-gray-700">Smartphones</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
            <span className="text-sm text-gray-700">Modern tech</span>
          </label>
          <button className="text-sm text-red-500 hover:text-red-600 font-medium">
            See all
          </button>
        </div>
      </details>

      {/* Brands Section */}
      <hr  className='mx-4 border-[#dee2e6]'/>
      <details open>
        <summary className="w-full flex items-center justify-between p-4 text-left cursor-pointer">
          <span className="font-medium text-gray-900">Brands</span>
          <ChevronDown className="chevron w-4 h-4 text-gray-500 transition-transform duration-200" />
        </summary>
        <div className="px-4 pb-4 space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" checked className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
            <span className="text-sm text-gray-700">Samsung</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" checked className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
            <span className="text-sm text-gray-700">Apple</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
            <span className="text-sm text-gray-700">Huawei</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" checked className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
            <span className="text-sm text-gray-700">Pocco</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
            <span className="text-sm text-gray-700">Lenovo</span>
          </label>
          <button className="text-sm text-red-500 hover:text-red-600 font-medium">
            See all
          </button>
        </div>
      </details>

      {/* Features Section */}
      <hr  className='mx-4 border-[#dee2e6]'/>
      <details open>
        <summary className="w-full flex items-center justify-between p-4 text-left cursor-pointer">
          <span className="font-medium text-gray-900">Features</span>
          <ChevronDown className="chevron w-4 h-4 text-gray-500 transition-transform duration-200" />
        </summary>
        <div className="px-4 pb-4 space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" checked className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
            <span className="text-sm text-gray-700">Metallic</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
            <span className="text-sm text-gray-700">Plastic cover</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
            <span className="text-sm text-gray-700">8GB Ram</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
            <span className="text-sm text-gray-700">Super power</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
            <span className="text-sm text-gray-700">Large Memory</span>
          </label>
          <button className="text-sm text-red-500 hover:text-red-600 font-medium">
            See all
          </button>
        </div>
      </details>

      {/* Price Range Section */}
      <hr  className='mx-4 border-[#dee2e6]'/>
      <details open>
        <summary className="w-full flex items-center justify-between p-4 text-left cursor-pointer">
          <span className="font-medium text-gray-900">Price range</span>
          <ChevronDown className="chevron w-4 h-4 text-gray-500 transition-transform duration-200" />
        </summary>
        <div className="px-4 pb-4">
          <div className="relative">
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-red-500 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>45₼</span>
              <span>870₼</span>
            </div>
          </div>
        </div>
      </details>

      {/* Condition Section */}
      <hr  className='mx-4 border-[#dee2e6]'/>
      <style>
        {`
          details[open] .chevron {
            transform: rotate(180deg);
          }
        `}
      </style>
      <details>
        <summary className="w-full flex items-center justify-between p-4 text-left cursor-pointer">
          <span className="font-medium text-gray-900">Condition</span>
          <ChevronDown className="chevron w-4 h-4 text-gray-500 transition-transform duration-200" />
        </summary>
        <div className="px-4 pb-4 space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" checked className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
            <span className="text-sm text-gray-700">New Staff</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
            <span className="text-sm text-gray-700">Second Hand</span>
          </label>
        </div>
      </details>
      
    </div>
  );
}