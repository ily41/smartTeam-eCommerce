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
          <h1>Favorites ({cartItems.length})</h1>
        </div>

        <div className="bg-white lg:bg-transparent rounded-lg flex flex-col lg:flex-row lg:gap-4 shadow-sm lg:shadow-none p-4 space-y-4">
          <div className='flex-5 flex gap-5 p-4 flex-col bg-white lg:rounded-lg'>

            {cartItems.map((item, index) => (
              <>
                <div key={item.id} className="space-y-4 lg:hidden py-4">
                {/* Product Info Row */}
                <div className="flex rounded-lg ">
                  {/* Product Image */}
                  <div className="  rounded-lg flex items-center p-[1px] max-w-[150px] justify-center mr-3 overflow-hidden">
                    <img
                      src="./deals/product.avif"
                      alt={item.name}
                      className="w-full h-full  object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className=" flex flex-col justify-between flex-1">
                    <div className="text-md flex justify-between mb-3 font-semibold text-gray-900">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        {item.price * item.quantity} AZN
                    </div>
                    
                    <p className="text-md text-gray-500">
                      Size: {item.size}, Color: {item.color}
                    </p>
                    <p className="text-md text-gray-500">
                      Material: {item.material}
                    </p>

                    <div className="flex items-center md:justify-end  mt-6">
                      <button className="w-fit text-sm lg:text-md bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
                         Add to the cart
                      </button>
                      
                    </div>
                  </div>

                  

                  

                </div>

                {/* Quantity Controls + Price */}
                

                {/* Divider */}
                
                </div>

                <div className='hidden lg:flex gap-4 p-4 '>

                  <div className='flex-1 flex'>
                    <div className="w-30 h-30 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
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
                        <div className="text-xl font-semibold text-gray-900">
                            {item.price * item.quantity} AZN
                        </div>
                        <p className="text-md text-gray-500">
                          Size: {item.size}, Color: {item.color}
                        </p>
                        <p className="text-md text-gray-500">
                          Material: {item.material}
                        </p>
                      </div>


                    </div>
                  </div>

                  <div className="flex flex-col  items-end gap-8 justify-around px-4">
                      
                    <Heart color='red' size={30} fill='red'/>

                    <button className="w-full bg-red-500  hover:bg-red-600 text-white font-semibold py-3 px-15 rounded-lg transition-colors flex items-center justify-center space-x-2">
                      <ShoppingCart size={20} />
                      <span>Buy Now</span>
                    </button>

                     

                  </div>
                  
                </div>
                {index < cartItems.length - 1 && (
                  <hr className="mx-2 border-[#dee2e6]" />
                )}

              </>
            ))}

          </div>

          <div className='lg:bg-white lg:p-5 lg:shadow-sm  lg:h-fit flex-2 lg:rounded-lg'>

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

export default WishList;
