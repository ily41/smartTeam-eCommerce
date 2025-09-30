import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const SkeletonProductCard = ({ isMobile = false }) => {
  if (isMobile) {
    return (
      <div className="flex items-center min-w-[80%] p-2 bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] animate-pulse">
        <div className="h-38 w-32 bg-gray-200 rounded"></div>
        <div className="flex-1 flex flex-col self-start mt-2 ml-3 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="p-1 m-1 self-start">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 min-w-[200px] flex-shrink-0 space-y-3 animate-pulse">
      <div className="py-4">
        <div className="h-48 bg-gray-200 rounded-lg mx-10"></div>
      </div>
      
      <div className="flex justify-between">
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-5 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
      </div>
      
      <div className="w-full h-9 bg-gray-200 rounded-lg"></div>
    </div>
  );
};

const SimilarProducts = ({ products, isLoading }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.offsetWidth * 0.8; // Scroll 80% of visible width
      
      if (direction === 'left') {
        container.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
        });
      } else {
        container.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };

  if (isLoading) {
    return (
      <>
        {/* Mobile Skeleton */}
        <div className="md:hidden mt-4">
          <div className="px-4 py-4">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
            <div className="overflow-x-scroll scrollbar-hide flex gap-3 rounded-lg p-3">
              {[...Array(2)].map((_, index) => (
                <SkeletonProductCard key={index} isMobile={true} />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Skeleton */}
        <div className="mt-8 hidden md:block">
          <div className="flex items-center justify-between mb-2">
            <div className="h-6 bg-gray-200 rounded w-36 animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="flex overflow-x-scroll gap-4 py-2">
            {[...Array(6)].map((_, index) => (
              <SkeletonProductCard key={index} />
            ))}
          </div>
        </div>
      </>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile Version */}
      <div className="md:hidden mt-4">
        <div className="px-4 py-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Similar Products</h2>
          <div className="overflow-x-scroll scrollbar-hide flex gap-3 rounded-lg p-3">
            {products.map((product) => (
              <div key={product.id} className="flex items-center min-w-[80%] p-2 bg-white rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
                <div className="h-38">
                  <img src='./deals/product.avif' alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col self-start mt-2">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                  <p className="text-red-500 font-semibold">{product.price}</p>
                </div>
                <button className="p-1 m-1 self-start border-1 border-[#DEE2E6] rounded-lg">
                  <Heart className="w-4 h-4 text-red-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Version */}
      <div className="mt-8 hidden md:block">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-gray-900">Similar Products</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 cursor-pointer hover:bg-red-100 hover:border-red-300 border border-gray-300 rounded-full"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-red-600" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 cursor-pointer hover:bg-red-100 hover:border-red-300 border border-gray-300 rounded-full"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 hover:text-red-600" />
            </button>
          </div>
        </div>
        
        <div ref={scrollContainerRef} className="flex overflow-x-scroll gap-4 py-2">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg p-4 border border-[#DEE2E6] min-w-[200px] flex-shrink-0 space-y-3">
              <div className="py-4">
                <img 
                  src={`http://localhost:5056${product.primaryImageUrl}`} 
                  alt={product.name}
                  className="h-48 object-contain mx-10 rounded-lg" 
                />
              </div>
              
              <div className='flex justify-between'>
                <div>
                  <h3 className="font-medium text-gray-700 mb-1">
                    {product.name && product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">{product.currentPrice} AZN</p>
                </div>
                <button className="top-2 right-2 self-start p-2 border border-[#DEE2E6] bg-white rounded-lg shadow-sm">
                  <Heart className="w-5 h-5 text-red-400" />
                </button>
              </div>
              
              <button className="w-full bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SimilarProducts;