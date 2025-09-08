import React, { useState } from 'react'
import SearchUI from '../../components/UI/SearchUI'
import { Breadcrumb } from '../../products/Breadcrumb'
import { Heart, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';

const WishList = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Laptop',
      size: 'Medium',
      color: 'Blue',
      material: 'Plastic',
      price: 680,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Laptop',
      size: 'Medium',
      color: 'Blue',
      material: 'Plastic',
      price: 680,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Laptop',
      size: 'Medium',
      color: 'Blue',
      material: 'Plastic',
      price: 680,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Laptop',
      size: 'Medium',
      color: 'Blue',
      material: 'Plastic',
      price: 680,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Laptop',
      size: 'Medium',
      color: 'Blue',
      material: 'Plastic',
      price: 680,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Laptop',
      size: 'Medium',
      color: 'Blue',
      material: 'Plastic',
      price: 680,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Laptop',
      size: 'Medium',
      color: 'Blue',
      material: 'Plastic',
      price: 680,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Laptop',
      size: 'Medium',
      color: 'Blue',
      material: 'Plastic',
      price: 680,
      quantity: 1,
    },
  ]);

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="inter bg-[#f7fafc] whitepsace-nowrap pb-8">
      {/* Mobile Search + Breadcrumb */}
      <div className="lg:hidden px-4 pl-7 py-4 border-y bg-white lg:border-transparent border-[#dee2e6] ">
        <div className="mb-4 lg:hidden">
          <SearchUI />
        </div>
        <Breadcrumb />
      </div>
      
      

      <div className="min-h-[80vh] lg:max-w-[90vw] lg:mx-auto border border-[#dee2e6] lg:border-0">
        <div className='p-4 pl-7 pb-0 hidden lg:block'>
          <Breadcrumb />
        </div>
        
        <div className=" p-4 pl-7 text-xl md:text-2xl font-semibold bg-white lg:bg-transparent border-b lg:border-0 border-[#dee2e6] mb-3">
          <h1>Favorites ({cartItems.length})</h1>
        </div>

        <div className="lg:bg-transparent rounded-lg flex flex-col mx-auto md:mx-0 max-w-[95vh] md:max-w-full lg:flex-row lg:gap-4 shadow-sm lg:shadow-none p-4 space-y-4">
          <div className='flex-5 flex gap-5 flex-col  lg:rounded-lg '>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cartItems.map((item, index) => (
              
                 <div class="bg-white rounded-lg shadow-md overflow-hidden">
                     <div class="relative">
                         <img className='mx-auto max-w-[150px] py-3 md:max-w-[200px] ' src="./deals/product.avif" alt="" />
                         <button class="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                             <svg class="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24">
                                 <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
                             </svg>
                         </button>
                     </div>
                     <div class="p-4">
                         <h3 class="text-xl font-bold text-gray-900 mb-1">680 AZN</h3>
                         <p class="text-gray-600 mb-2">LapTop</p>

                         <button class="w-full bg-red-600 whitespace-nowrap hover:bg-red-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200">
                              Add to the Cart
                         </button>
                     </div>
                 </div>
             

            ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WishList;
