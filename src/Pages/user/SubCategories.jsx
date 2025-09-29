import React from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useGetCategoryQuery, useGetRecommendedQuery } from '../../store/API';
import { Link, useParams } from 'react-router';
import { Breadcrumb } from '../../products/Breadcrumb';

// Skeleton Components
const SkeletonCategoryCard = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
    <div className="flex flex-col items-center text-center h-full">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-24 sm:w-28 md:w-32"></div>
    </div>
  </div>
);

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

const SubCategoriesSkeleton = () => {
  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Breadcrumb Skeleton */}
        <div className="hidden md:block mb-5">
          <div className="flex items-center space-x-2 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-1"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        
        {/* Page Title Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-8 sm:h-9 md:h-10 bg-gray-200 rounded w-48 sm:w-56 md:w-64"></div>
        </div>
        
        {/* Categories Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, index) => (
            <SkeletonCategoryCard key={index} />
          ))}
        </div>

        {/* Mobile Similar Products Skeleton */}
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

        {/* Desktop Similar Products Skeleton */}
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
        
      </div>
    </section>
  );
};

// Main Components
const CategoryCard = ({ title, imageSrc = null, slug }) => (
  <Link to={`/products/${slug}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer group">
    <div className="flex flex-col items-center text-center h-full">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-50 transition-colors">
        {imageSrc ? (
          <img src={imageSrc} alt={title} className="w-full h-full object-contain rounded-lg" />
        ) : (
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-200 rounded-md"></div>
        )}
      </div>
      <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
    </div>
  </Link>
);

const formatName = (value) =>
  value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const SubCategories = () => {
  const { slug } = useParams();
  const { data: subs, isLoading } = useGetCategoryQuery(slug);
  const { data: similar, isSimilarLoading } = useGetRecommendedQuery({categoryId: subs?.id, limit: 6});
  console.log(similar?.recentlyAdded)
  console.log(subs);


  // Show skeleton while loading
  if (isLoading) {
    return <SubCategoriesSkeleton />;
  }

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        <div className="hidden md:block mb-5">
          <Breadcrumb />
        </div>
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            {formatName(slug)}
          </h1>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {subs?.subCategories?.map((category, index) => {
            console.log(category)
            return (
            <CategoryCard 
              key={index} 
              title={category.name} 
              imageSrc={category.imageSrc}
              slug={category.slug}
            />
          )})}
        </div>

        <div className="md:hidden mt-4">
          <div className="px-4 py-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Similar Products</h2>
            <div className="overflow-x-scroll scrollbar-hide flex gap-3 rounded-lg p-3">
              {similar?.recentlyAdded?.map((product) => (
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

        <div className="mt-8 hidden md:block">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-900">Similar Products</h2>
            <div className="flex space-x-2">
              <button className="p-2 cursor-pointer hover:bg-red-100 hover:border-red-300 border border-gray-300 rounded-full">
                <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-red-600" />
              </button>
              <button className="p-2 cursor-pointer hover:bg-red-100 hover:border-red-300 border border-gray-300 rounded-full">
                <ChevronRight className="w-5 h-5 text-gray-600 hover:text-red-600" />
              </button>
            </div>
          </div>
          
          <div className="flex overflow-x-scroll gap-4 py-2">
            {similar?.recentlyAdded?.map((product) => (
              <div key={product.id} className="bg-white rounded-lg p-4 border border-[#DEE2E6] min-w-[200px] flex-shrink-0 space-y-3">
                <div className="py-4">
                  <img 
                    src={`http://localhost:5056${product.primaryImageUrl}`} 
                    alt='name'
                    className="h-48 object-contain mx-10 rounded-lg" 
                  />
                </div>
                
                <div className='flex justify-between'>
                  <div>
                    <h3 className="font-medium text-gray-700 mb-1">{product.name && product.name.charAt(0).toUpperCase() + product.name.slice(1)}</h3>
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
      </div>
    </section>
  );
};

export default SubCategories;