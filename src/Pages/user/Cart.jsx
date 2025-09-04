import React, { useState } from 'react'
import SearchUI from '../../components/UI/SearchUI'
import { Breadcrumb } from '../../products/Breadcrumb'
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';

const Cart = () => {
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
  ]);

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="inter bg-[#f7fafc] whitepsace-nowrap">
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
        
        <div className=" p-4 pl-7 text-xl font-semibold bg-white lg:bg-transparent border-b lg:border-0 border-[#dee2e6] mb-3">
          <h1>My Cart ({cartItems.length})</h1>
        </div>

        <div className="bg-white lg:bg-transparent rounded-lg flex flex-col lg:flex-row lg:gap-4 shadow-sm lg:shadow-none p-4 space-y-4">
          <div className='flex-5 flex gap-5 p-4 flex-col bg-white lg:rounded-lg'>

            {cartItems.map((item, index) => (
              <>
                <div key={item.id} className="space-y-4  lg:hidden">
                {/* Product Info Row */}
                <div className="flex items-start rounded-lg ">
                  {/* Product Image */}
                  <div className="w-30 h-30 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                    <img
                      src="./deals/product.avif"
                      alt={item.name}
                      className="w-full  h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-md text-gray-500">
                      Size: {item.size}, Color: {item.color}
                    </p>
                    <p className="text-md text-gray-500">
                      Material: {item.material}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>

                {/* Quantity Controls + Price */}
                <div className="flex items-center justify-between ">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button className="p-2 hover:bg-gray-100 transition-colors">
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 border-x border-[#dee2e6] text-center">
                      {item.quantity}
                    </span>
                    <button className="p-2 hover:bg-gray-100 transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-xl font-semibold text-gray-900">
                    {item.price * item.quantity} AZN
                  </div>
                </div>

                {/* Divider */}
                {index < cartItems.length - 1 && (
                  <hr className="mx-2 border-[#dee2e6]" />
                )}
                </div>

                <div className='hidden lg:flex gap-4'>

                  <div className='flex-1 flex'>
                    <div className="w-30 h-30  rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                      <img
                        src="./deals/product.avif"
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-md text-gray-500">
                          Size: {item.size}, Color: {item.color}
                        </p>
                        <p className="text-md text-gray-500">
                          Material: {item.material}
                        </p>
                      </div>

                      <button className='px-3 p-1 mt-7 shadow-md bg-white text-red-500 rounded-lg border-1 border-[#dee2e6]'>Remove</button>

                    </div>
                    
                    
                  </div>
                  

                  <div className="flex flex-col  items-end justify-around px-4">
                      <div className="text-lg font-semibold text-gray-900">
                        {item.price * item.quantity} AZN
                      </div>
                      
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button className="p-2 hover:bg-gray-100 transition-colors">
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 border-x border-[#dee2e6] text-center">
                          {item.quantity}
                        </span>
                        <button className="p-2 hover:bg-gray-100 transition-colors">
                          <Plus size={16} />
                        </button>
                      </div>

                     

                  </div>
                  
                </div>
                {index < cartItems.length - 1 && (
                  <hr className="mx-2 hidden lg:block border-[#dee2e6]" />
                )}

              </>
            ))}
            <hr className="mx-2 border-[#dee2e6] hidden lg:block" />
            <div className=' justify-between hidden lg:flex'>
                  <button className='flex items-center gap-2 text-white bg-black inter p-2 rounded-lg'>
                    <ArrowLeft size={20} />
                    <p>Back to Shop</p>
                  </button>
                  <button className='px-3  bg-white text-red-500 rounded-lg border-1 border-[#bfc2c6]'>Remove all</button>
                  
            </div>

          </div>

          <div className='lg:bg-white lg:p-5 lg:shadow-sm  py-1 lg:h-fit flex-2 lg:rounded-lg'>

            {/* Pricing Summary */}
            <div className="border-t lg:border-none  border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between text-gray-600 text-lg">
                <span>Subtotal:</span>
                <span>145 AZN</span>
              </div>
              <div className="flex justify-between text-red-500 text-lg">
                <span>Discount:</span>
                <span>- 15 AZN</span>
              </div>
              <div className="flex justify-between text-lg mb-7 font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total:</span>
                <span>130 AZN</span>
              </div>
            </div>

            {/* Buy Now Button */}
            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
              <ShoppingCart size={20} />
              <span>Buy Now</span>
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
