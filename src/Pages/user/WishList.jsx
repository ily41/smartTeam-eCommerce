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

            {cartItems.map((item, index) => (
              <>
                <div key={item.id} className="space-y-4  bg-white border-1 border-[#dee2e6] p-3 rounded-lg  lg:hidden py-4">
                {/* Product Info Row */}
                <div className="flex rounded-lg ">
                  {/* Product Image */}
                  <div className="  rounded-lg flex  p-[1px] max-w-[135px] h-fit  mr-4 justify-center  overflow-hidden">
                    <img
                      src="./deals/product.avif"
                      alt={item.name}
                      className="  object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className=" flex flex-col justify-between flex-1">
                    <div className="text-lg flex justify-between mb-3 font-semibold text-gray-900">
                      <div>
                        <h3 className="font-semibold text-xl text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        {item.price * item.quantity} AZN
                      </div>
                      <Heart color='red' size={30} fill='red'/>
                        
                    </div>
                    
                    <p className="text-sm text-gray-500">
                      Size: {item.size}, Color: {item.color}
                    </p>
                    <p className="text-sm text-gray-500">
                      Material: {item.material}
                    </p>

                    <div className="flex items-center justify-end  mt-6">
                      <button className="w-fit text-sm lg:text-md bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
                         Add to the cart
                      </button>
                      
                    </div>
                  </div>
                </div>

                {/* Quantity Controls + Price */}
                

                {/* Divider */}
                
                </div>

                <div className='hidden lg:flex gap-4 p-4 bg-white rounded-lg'>

                  <div className='flex-1 flex'>
                    <div className="w-40 h-40  bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mr-4 md:mr-14 overflow-hidden">
                      <img
                        src="./deals/product.avif"
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <div className="flex-1 flex flex-col gap-3">
                        <h3 className="font-semibold text-2xl text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <div className="text-xl font-semibold text-gray-900">
                            {item.price * item.quantity} AZN
                        </div>
                        <p className="text-md text-gray-500">
                          Size: {item.size}, Color: {item.color} <br></br>
                          Material: {item.material}
                        </p>
                      </div>


                    </div>
                  </div>

                  <div className="flex flex-col  items-end gap-8 justify-around px-4">
                      
                    <Heart color='red' size={30} fill='red'/>

                    <button className="w-fit text-md lg:text-md bg-red-500 hover:bg-red-600 text-white py-3 px-8 rounded-md font-medium transition-colors duration-200">
                       Add to the cart
                    </button>

                     

                  </div>
                  
                </div>

              </>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default WishList;
