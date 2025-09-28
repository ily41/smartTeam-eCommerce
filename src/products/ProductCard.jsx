import React from 'react';
import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';

export function ProductCard({ col, info, handleAddToCart, isAddingToCart }) {
  const { url, name, price, id } = info;

  // CRITICAL FIX: Stop event propagation to prevent nested link issues
  const handleCartClick = (e) => {
    e.preventDefault(); // Prevent any default link behavior
    e.stopPropagation(); // Stop event from bubbling to parent Link
    if (handleAddToCart) {
      handleAddToCart(id);
    }
  };

  if (col) {
    // Column layout (grid view)
    return (
      <div className="border rounded-xl bg-white overflow-hidden flex flex-col">
        {/* Image link - separate from content */}
        <Link to={`/details/${id}`} className="block">
          <img 
            src={`http://localhost:5056${url}`} 
            alt={name}
            className="w-full aspect-square object-cover"
          />
        </Link>
        
        <div className="p-4 flex flex-col flex-1">
          {/* Product info link - separate from button */}
          <Link to={`/details/${id}`} className="block flex-1">
            <h3 className="text-sm lg:text-base font-medium text-gray-900 line-clamp-2 mb-2">
              {name}
            </h3>
            <p className="text-lg font-bold text-gray-900">
              ${price?.toFixed(2)}
            </p>
          </Link>
          
          {/* Button is NOT wrapped in Link - uses onClick instead */}
          <button
            onClick={handleCartClick}
            disabled={isAddingToCart}
            className="w-full mt-3 py-2 px-4 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    );
  }

  // Row layout (list view)
  return (
    <div className="border rounded-xl p-4 bg-white flex items-center gap-6">
      {/* Image link - separate */}
      <Link to={`/details/${id}`} className="flex-shrink-0">
        <img 
          src={`http://localhost:5056${url}`} 
          alt={name}
          className="w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-lg"
        />
      </Link>
      
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between flex-1 gap-4">
        <div className="flex-1">
          {/* Product info link - separate */}
          <Link to={`/details/${id}`} className="block">
            <h3 className="text-base lg:text-lg font-medium text-gray-900 line-clamp-2 mb-2">
              {name}
            </h3>
          </Link>
          <p className="text-xl font-bold text-gray-900">
            ${price?.toFixed(2)}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Button is NOT wrapped in Link */}
          <button
            onClick={handleCartClick}
            disabled={isAddingToCart}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <ShoppingCart className="w-4 h-4" />
            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}