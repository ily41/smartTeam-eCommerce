import React, { useState } from 'react'
import SearchUI from '../../components/UI/SearchUI'
import { Breadcrumb } from '../../products/Breadcrumb'
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';

const Cart = () => {

    const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'LapTop',
      size: 'medium',
      color: 'blue',
      material: 'Plastic',
      price: 680,
      quantity: 1,
    },
    {
      id: 2,
      name: 'LapTop',
      size: 'medium',
      color: 'blue',
      material: 'Plastic',
      price: 680,
      quantity: 1,
    }
  ]);


  return (
    <section className='inter'> 
        <div className='lg:hidden px-4 py-4 border-y-1 border-[#dee2e6] bg-white'>
            <div className='mb-4'>
                <SearchUI />
            </div>
            <Breadcrumb />
        </div>

    <div className=" min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">

        {cartItems.map((item) => (
            <>
            <div>
                <div key={item.id} className="flex items-center rounded-lg p-4">
                  {/* Product Image */}
                  <div className="w-25 h-25 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-2xl mr-4">
                    <img src="./deals/product.avif" alt="" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 self-start">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Size: {item.size}, Color: {item.color},
                    </p>
                    <p className="text-sm text-gray-500">
                      Material: {item.material}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 self-start hover:bg-red-50 rounded-lg transition-colors ml-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div>
                    <div key={`controls-${item.id}`} className="flex items-center justify-between px-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  className="p-2 hover:bg-gray-100   transition-colors"
                                >
                                  <Minus size={16} />
                                </button>
                            <span className="px-4 py-2 border-x-1 border-[#dee2e6] text-center">
                              1
                            </span>
                            <button
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                        </div>    
            
                        <div className="text-xl font-semibold text-gray-900">
                          {item.price * item.quantity} AZN
                        </div>
                    </div>
                </div>
            </div>
            {}
            <hr className='mx-2 border-[#dee2e6]'/>
            </>
            
        ))}


        {/* Pricing Summary */}
        <div className="border-t border-gray-200 pt-4 space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal:</span>
            <span>145$</span>
          </div>
          <div className="flex justify-between text-red-500">
            <span>Discount:</span>
            <span>- 145$</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total:</span>
            <span>145$</span>
          </div>
        </div>

        {/* Buy Now Button */}
        <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
          <ShoppingCart size={20} />
          <span>Buy Now</span>
        </button>
      </div>
    </div>





    </section>
  )
}

export default Cart