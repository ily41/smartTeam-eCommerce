import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/pagination';
import { Heart, Download, Share2, Minus, Plus, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import { Breadcrumb } from '../../products/Breadcrumb';
import SearchUI from '../../components/UI/SearchUI';
import { useGetMeQuery, useGetProductQuery, useGetProductSpecificationsQuery, useAddCartItemMutation, useToggleFavoriteMutation, useGetFavoriteStatusQuery, useGetProductPdfByIdUserQuery } from '../../store/API';
import { toast } from 'react-toastify';
import { SearchContext } from '../../router/Context';

// Skeleton Components
const SkeletonBox = ({ className = "", width, height }) => (
  <div 
    className={`bg-gray-200 animate-pulse rounded-lg ${className}`}
    style={{ width, height }}
  />
);

const ImageSkeleton = () => (
  <div className="bg-gray-200 animate-pulse rounded-lg h-48 md:h-80 w-full" />
);

const ThumbnailSkeleton = () => (
  <div className="bg-gray-200 animate-pulse rounded-lg w-16 h-16" />
);

const MobileDetailsSkeleton = () => (
  <div className="md:hidden">
    <div className="bg-white border-y-1 border-[#DEE2E6]">
      {/* Header */}
      <div className="px-7 py-3">
        <div className="flex items-center mb-2">
          <SkeletonBox className="w-5 h-5 mr-2" />
          <SkeletonBox className="w-20 h-5" />
        </div>
        <SkeletonBox className="w-3/4 h-6 mb-2" />
        <div className="flex items-center gap-2 mt-2">
          <SkeletonBox className="w-24 h-8" />
          <SkeletonBox className="w-20 h-6" />
          <SkeletonBox className="w-12 h-6" />
        </div>
      </div>

      {/* Main Image */}
      <div className="relative px-4 mb-4 flex w-full justify-center">
        <div className="w-full max-w-[65vw]">
          <ImageSkeleton />
        </div>
        <div className="absolute top-10 right-6 flex flex-col gap-3">
          {[1, 2, 3].map(i => <SkeletonBox key={i} className="w-9 h-9" />)}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="px-4 pb-6 bg-white">
        <div className="flex space-x-2 justify-center">
          {[1, 2, 3].map(i => <ThumbnailSkeleton key={i} />)}
        </div>
      </div>
    </div>

    {/* Specifications */}
    <div className="p-4 mt-6 border-[#DEE2E6] border-y-1 border-b-0 bg-white">
      <div className="flex flex-wrap gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <SkeletonBox key={i} className="w-20 h-8" />
        ))}
      </div>
    </div>

    {/* Buttons */}
    <div className="p-4 mb-6 space-y-3 border-y-1 border-[#DEE2E6] bg-white">
      <SkeletonBox className="w-full h-12" />
      <SkeletonBox className="w-full h-12" />
    </div>

    {/* Features */}
    <div className="bg-white border-y-1 border-[#DEE2E6] mt-4">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4 px-2">
          <SkeletonBox className="w-20 h-6" />
          <SkeletonBox className="w-12 h-5" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i}>
              <div className="flex justify-between px-3 items-center">
                <SkeletonBox className="w-20 h-5" />
                <SkeletonBox className="w-24 h-5" />
              </div>
              {i < 5 && <hr className="my-2 mx-2 border-gray-300" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const DesktopDetailsSkeleton = () => (
  <div className="hidden md:block max-w-7xl mx-auto px-4 pb-8">
    <div className="py-4 pb-8">
      <SkeletonBox className="w-64 h-6" />
    </div>
    <div className="grid grid-cols-2 gap-8">
      {/* Left Column - Images */}
      <div className="space-y-4 w-full">
        <div className="bg-white rounded-lg p-4 w-full flex h-full justify-center flex-col items-center py-9 sm:border-1 sm:border-[#DEE2E6]">
          <ImageSkeleton />
          
          {/* Thumbnails */}
          <div className="flex space-x-2 mt-4">
            {[1, 2, 3, 4].map(i => <ThumbnailSkeleton key={i} />)}
          </div>
        </div>
      </div>

      {/* Right Column - Product Info */}
      <div className="space-y-6 h-full">
        <div className="bg-white rounded-lg p-10 h-full sm:border-1 sm:border-[#DEE2E6]">
          {/* Header */}
          <div className="flex items-center mb-3">
            <SkeletonBox className="w-5 h-5 mr-2" />
            <SkeletonBox className="w-32 h-5" />
          </div>
          
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <SkeletonBox className="w-3/4 h-8 mb-2" />
              <SkeletonBox className="w-full h-5 mb-4" />
              
              {/* Price */}
              <div className="flex items-center gap-3">
                <SkeletonBox className="w-28 h-10" />
                <SkeletonBox className="w-20 h-6" />
                <SkeletonBox className="w-16 h-6" />
              </div>
            </div>
            
            <div className="flex space-x-2">
              {[1, 2, 3].map(i => <SkeletonBox key={i} className="w-9 h-9" />)}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6 mt-12">
            <SkeletonBox className="w-9 h-9 rounded-full" />
            <SkeletonBox className="w-8 h-8" />
            <SkeletonBox className="w-9 h-9 rounded-full" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col">
            <SkeletonBox className="w-full h-12 mt-6" />
            <SkeletonBox className="w-full h-12 mt-6" />
          </div>
        </div>
      </div>
    </div>

    {/* Features Section */}
    <div className="bg-white rounded-lg p-6 mt-8 sm:border-1 sm:border-[#DEE2E6]">
      <SkeletonBox className="w-20 h-6 mb-6" />
      <div className="grid grid-cols-2 gap-x-12 gap-y-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i}>
            <div className="flex justify-between items-center mx-2">
              <SkeletonBox className="w-24 h-5" />
              <SkeletonBox className="w-32 h-5" />
            </div>
            <hr className="my-2 border-gray-300" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

function Details() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [hovered, setHovered] = useState(null)
  const [toggleFavorite] = useToggleFavoriteMutation();

  const { data: pdfBlob, isLoading } = useGetProductPdfByIdUserQuery({ productId :  id });
  console.log(pdfBlob)

  const handleDownloadPdf = () => {
    if (pdfBlob) {
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = "product.pdf";
      a.click();
      URL.revokeObjectURL(pdfUrl);
    }
  };
  

  const handleToggleFavorite = async (id) => {
      if (!id) return;
  
      try {
        await toggleFavorite({productId: id}).unwrap();
      } catch (err) {
        console.error(err);
        if (err?.status === 401 || err?.data?.status === 401) {
          toast.error("Please log in first");
        } else {
          toast.error("Failed to update favorites");
        }
      }
    }
  

  
  const [addCartItem, { isLoading: isAddingToCart, error: cartError }] = useAddCartItemMutation();

  const { 
    data: product, 
    isLoading: loading, 
    error, 
    isError 
  } = useGetProductQuery(id, {
    skip: !id 
  });
  console.log(product?.id)
  const { data: favoriteStatus } = useGetFavoriteStatusQuery({ productId: product?.id });
  const { data: productSpec, isLoading: isSpecLoading } = useGetProductSpecificationsQuery(product?.id);

  // Check for 401 errors and show toast
  useEffect(() => {
    const handle401Error = (error) => {
      if (error?.status === 401 || error?.data?.status === 401) {
        toast.error("Please log in first");
      }
    };

    // Check product query error
    if (error) {
      handle401Error(error);
    }

    // Check cart error
    if (cartError) {
      handle401Error(cartError);
    }
  }, [error, cartError]);

  // Handle add to cart functionality
  const handleAddToCart = async () => {
    if (!product || !product.id) {
      console.error('Product not available');
      return;
    }

    try {
      const result = await addCartItem({
        productId: product.id,
        quantity: quantity
      }).unwrap();
      toast.success("Product added to cart successfully")
      
      
    } catch (err) {
      console.error('Failed to add product to cart:', err);
      
      if (err?.status === 401 || err?.data?.status === 401) {
        toast.error("Please log in first");
      } else {
        toast.error("Failed to add product to cart");
      }
    }
  };

  // Dynamic specifications based on actual product data
  const getSpecifications = (product, productSpec) => {
    if (!product) return [];
    
    const specs = [];
    
    // Add specifications from API if available
    if (productSpec && productSpec.specificationGroups) {
      productSpec.specificationGroups.forEach(group => {
        if (group.items && Array.isArray(group.items)) {
          group.items.forEach(item => {
            // Only include meaningful spec items (skip basic info like SKU, category)
            const basicFields = ['sku', 'category', 'stock status', 'availability', 'name'];
            if (!basicFields.includes(item.name.toLowerCase())) {
              const spec = item.unit ? `${item.value} ${item.unit}` : item.value;
              specs.push(spec);
            }
          });
        }
      });
    }
    
    // If no specs from API, return some default ones
    if (specs.length === 0) {
      return [
        '16GB RAM',
        'RTX 4060',
        'Intel® Core™ i7',
        '240Hz Display',
        'Advanced Cooling',
        '1TB SSD'
      ];
    }
    
    return specs;
  };

  // Updated features based on actual product specifications
  const getFeatures = (product, productSpec) => {
    if (!product) return [];
    
    const features = [];
    
    // Add basic product information first
    features.push(
      { label: 'Name', value: product.name },
      { label: 'SKU', value: product.sku },
      { label: 'Category', value: product.categoryName },
      { label: 'Stock', value: product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock' }
    );
    
    // Add specifications from API if available
    if (productSpec && productSpec.specificationGroups) {
      productSpec.specificationGroups.forEach(group => {
        if (group.items && Array.isArray(group.items)) {
          group.items.forEach(item => {
            // Skip duplicate entries we already added above
            const duplicateFields = ['sku', 'category', 'stock status', 'availability'];
            if (!duplicateFields.includes(item.name.toLowerCase())) {
              const value = item.unit ? `${item.value} ${item.unit}` : item.value;
              features.push({ label: item.name, value: value });
            }
          });
        }
      });
    }
    
    return features;
  };



  const [activeSlide, setActiveSlide] = useState(0);
  const [swiperRef, setSwiperRef] = useState(null);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  // Show skeleton while loading
  if (loading || isSpecLoading) {
    return (
      <>
        <div className='p-6 py-4 border-y-1 border-[#DEE2E6] sm:hidden flex flex-col gap-5'>
          <div className="animate-pulse">
            <SkeletonBox className="w-full h-10 mb-4" />
            <SkeletonBox className="w-48 h-6" />
          </div>
        </div>
        <div className="min-h-[70vh] bg-gray-50 pt-8 sm:pt-0">
          <MobileDetailsSkeleton />
          <DesktopDetailsSkeleton />
        </div>
      </>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-[70vh] bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <X className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
          {error && error.status !== 401 && (
            <p className="text-sm text-gray-500 mt-2">
              Error: {error.data?.message || error.message || 'Failed to load product'}
            </p>
          )}
        </div>
      </div>
    );
  }

  const specifications = getSpecifications(product, productSpec);
  const features = getFeatures(product, productSpec);
  const isInStock = product.stockQuantity > 0;
  const hasDiscount = product.discountPercentage > 0;

  return (
    <>
      <div className='p-6 py-4 border-y-1 border-[#DEE2E6] sm:hidden flex flex-col gap-5'>
        <SearchUI />
        <Breadcrumb />
      </div>
      <div className="min-h-[70vh] bg-gray-50 pt-8 sm:pt-0">
        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="bg-white border-y-1 border-[#DEE2E6]">
            {/* Header */}
            <div className="px-7 py-3">
              <div className="flex items-center text-lg font-medium mb-2 inter">
                {isInStock ? (
                  <>
                    <Check className='w-[20px] text-green-500' />
                    <span className="text-green-500">In stock</span>
                  </>
                ) : (
                  <>
                    <X className='w-[20px] text-red-500' />
                    <span className="text-red-500">No stock</span>
                  </>
                )}
              </div>
              <div className="flex items-center">
                <h1 className="text-xl text-gray-900 inter">{product.name}</h1>
              </div>
              {hasDiscount && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl font-bold text-red-500">{product?.prices[0].discountedPrice} AZN</span>
                  <span className="text-lg text-gray-500 line-through">{product?.prices[0].discountedPrice} AZN</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                    -{product.discountPercentage}%
                  </span>
                </div>
              )}
            </div>

            {/* Main Image */}
            <div className="relative px-4 mb-4 flex w-full justify-center">
              <div className='self-center w-full'>
                <Swiper
                  pagination={false}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  modules={[Pagination, Autoplay]}
                  className="mySwiper max-w-[65vw]"
                  onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                  onSwiper={setSwiperRef}
                >
                  {product?.images.map(item => {

                    return (
                      <SwiperSlide className='relative h-64 py-5 pt-8 rounded-lg'>
                        <img 
                          src={`http://smartteamaz-001-site1.qtempurl.com${item.imageUrl}` || './deals/product.avif'}
                          alt={product.name}
                          className="h-48 object-contain mx-auto rounded-lg" 
                        />
                      </SwiperSlide>
                    )
                  })}
                 
                  <SwiperSlide className='relative h-64 py-5 pt-8 rounded-lg'>
                    <img 
                      src={`http://smartteamaz-001-site1.qtempurl.com${product.imageUrl}` || './deals/product.avif'}
                      alt={product.name}
                      className="h-48 object-contain mx-auto rounded-lg" 
                    />
                  </SwiperSlide>
                  <SwiperSlide className='relative h-64 py-5 pt-8 rounded-lg'>
                    <img 
                      src={`http://smartteamaz-001-site1.qtempurl.com${product.imageUrl}` || './deals/product.avif'}
                      alt={product.name}
                      className="h-48 object-contain mx-auto rounded-lg" 
                    />
                  </SwiperSlide>
                </Swiper>
              </div>

              <div className="absolute top-10 right-6 flex flex-col gap-3">
                <button onClick={() => handleToggleFavorite(product.id)} className="p-2 bg-gray-100 cursor-pointer rounded-lg"> 
                  <Heart className={`w-5 h-5 text-gray-600 ${favoriteStatus?.isFavorite && 'fill-current'}`} />
                </button>

               <button 
                onClick={handleDownloadPdf} 
                disabled={isLoading || !pdfBlob}
                className="p-2 bg-gray-100 cursor-pointer rounded-lg disabled:opacity-50"
              >
                <Download className="w-5 h-5 text-gray-600" />
              </button>

                <button className="p-2 bg-gray-100 rounded-lg">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Thumbnails as Navigation */}
            <div className="px-4 pb-6 bg-white">
              <div className="flex space-x-2 justify-center">
                {product?.images.map((item, index) => (
                  <button 
                    key={item} 
                    className={`w-16 h-16 rounded-lg border-2 ${activeSlide === index ? 'border-red-500' : 'border-gray-200'} overflow-hidden`}
                    onClick={() => swiperRef?.slideTo(index)}
                  >
                    <img 
                      src={`http://smartteamaz-001-site1.qtempurl.com${item.imageUrl}` || './deals/product.avif'}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="p-4 mt-6 border-[#DEE2E6] border-y-1 border-b-0 bg-white">
            <div className="flex flex-wrap gap-2 mb-4">
              {specifications.map((spec, index) => (
                <span key={index} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium inter">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="p-4 mb-6 space-y-3 border-y-1 border-[#DEE2E6] bg-white w-full h-full self-end">
            <button 
              onClick={handleAddToCart}
              disabled={!isInStock || isAddingToCart}
              className={`w-full py-3 mt-6 rounded-lg font-medium ${
                !isInStock 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : isAddingToCart
                  ? 'bg-red-400 cursor-not-allowed text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              {isAddingToCart ? 'Adding...' : !isInStock ? 'Out of Stock' : 'Add To Cart'}
            </button>
            {cartError && cartError.status !== 401 && (
              <p className="text-red-500 text-sm mt-2">
                Error: {cartError.data?.message || cartError.message || 'Failed to add to cart'}
              </p>
            )}
          </div>

          {/* Features */}
          <div className="bg-white border-y-1 border-[#DEE2E6] mt-4 helveticaNow">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-4 px-2 inter">
                <h2 className="text-lg font-semibold text-gray-900">Features</h2>
                <span className="text-red-500 text-sm font-medium">More</span>
              </div>
              <div className="space-y-3">
                {features.slice(0, 5).map((feature, index) => (
                  <div key={index}>
                    <div className="flex justify-between px-3 items-center inter">
                      <span className="text-[#858a92]">{feature.label}</span>
                      <span className="text-gray-900">{feature.value}</span>
                    </div>
                    {index < features.slice(0, 5).length - 1 && (
                      <hr className="my-2 mx-2 border-gray-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 pb-8">
          <div className='py-4 pb-8'>
            <Breadcrumb />
          </div>
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div className="space-y-4 w-full">
              <div className="bg-white rounded-lg p-4 w-full flex h-full justify-center flex-col items-center py-9 sm:border-1 sm:border-[#DEE2E6]">
                <div className='w-fit'>
                  <img 
                    src={hovered ? `http://smartteamaz-001-site1.qtempurl.com${hovered}` : `http://smartteamaz-001-site1.qtempurl.com${product.imageUrl}`  || "./deals/productImageExample.svg"}
                    alt={product.name}
                    className="h-80 object-cover rounded-lg transition-opacity duration-300 ease-in-out"
                    key={hovered || product.imageUrl} // Force re-render for fade effect
                    style={{ animation: 'fadeIn 0.3s ease-in-out' }}
                  />
                </div>

                {/* Thumbnails */}
                <div className="flex space-x-2 mt-4">
                  {product?.images.map((item, index) => {
    return (
    <div 
      key={item} 
      onMouseEnter={() => setHovered(item.imageUrl)} 
      onMouseLeave={() => setHovered(null)} 
      className={`w-16 h-16 rounded-lg border-2 border-gray-200 overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 hover:shadow-lg ${hovered === item.imageUrl ? 'ring-2 ring-red-500 ring-offset-2' : ''}`}
    >
      <img 
        src={`http://smartteamaz-001-site1.qtempurl.com${item.imageUrl}` || "./deals/productImageExample.svg"}
        alt={`${product.name} ${index + 1}`}
        className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
      />
    </div>
    )
                  })}
                </div>
                
                <style jsx>{`
                  @keyframes fadeIn {
                    from {
                      opacity: 0;
                    }
                    to {
                      opacity: 1;
                    }
                  }
                `}</style>

                
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6 h-full ">
              <div className="bg-white rounded-lg flex flex-col justify-between p-10 h-full sm:border-1 sm:border-[#DEE2E6]">
                {/* Header */}
                <div className="flex items-center text-lg font-medium mb-3 inter">
                  {isInStock ? (
                    <>
                      <Check className='w-[20px] text-green-500' />
                      <span className="text-green-500">In stock ({product.stockQuantity} available)</span>
                    </>
                  ) : (
                    <>
                      <X className='w-[20px] text-red-500' />
                      <span className="text-red-500">No stock</span>
                    </>
                  )}
                </div>
                
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">{product.name}</h1>
                    <p className="text-gray-600 mb-4">{product.shortDescription}</p>
                    
                    {/* Price */}
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-red-500">{product?.prices[0].discountedPrice} AZN</span>
                      {hasDiscount && (
                        <>
                          <span className="text-xl text-gray-500 line-through">{product?.prices[0].discountedPrice} AZN</span>
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm font-medium">
                            -{product.discountPercentage}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleDownloadPdf} 
                      disabled={isLoading || !pdfBlob}
                      className="p-2 bg-gray-100 cursor-pointer rounded-lg disabled:opacity-50"
                    >
                      <Download className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-lg">
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                    <button onClick={() => handleToggleFavorite(product.id)} className="p-2 bg-gray-100 cursor-pointer rounded-lg">
                      <Heart className={`w-5 h-5 text-gray-600 ${favoriteStatus?.isFavorite && 'fill-current'}`} />

                    </button>
                  </div>
                </div>

                {/* Quantity */}
                {isInStock && (
                  <div className="flex items-center gap-4 mb-6 mt-12">
                    <button 
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 border border-transparent hover:border-gray-300 hover:bg-white cursor-pointer bg-[#ebebeb] rounded-full"
                    >
                      <Minus className="w-4 h-4 text-[#6C6C6C]" />
                    </button>
                    <span className="text-2xl self-center font-medium text-[#6C6C6C] text-center inter">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 border border-transparent hover:border-gray-300 hover:bg-white cursor-pointer bg-[#ebebeb] rounded-full"
                    >
                      <Plus className="w-4 h-4 text-[#6C6C6C]" />
                    </button>
                  </div>
                )}

                {/* Add to Cart Button */}
                <div className='flex flex-col  '>
                  <button 
                    onClick={handleAddToCart}
                    disabled={!isInStock || isAddingToCart}
                    className={`w-full flex justify-center items-center   py-3 mt-6 rounded-lg font-medium ${
                      !isInStock 
                        ? 'bg-gray-400 cursor-not-allowed text-white' 
                        : isAddingToCart
                        ? 'bg-red-400 cursor-not-allowed text-white'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                  >
                    {isAddingToCart ? 'Adding...' : !isInStock ? 'Out of Stock' : 'Add To Cart'}
                  </button>

                 
                  
                  {cartError && cartError.status !== 401 && (
                    <p className="text-red-500 text-sm mt-2">
                      Error: {cartError.data?.message || cartError.message || 'Failed to add to cart'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-lg p-6 mt-8 sm:border-1 sm:border-[#DEE2E6]">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Features</h2>
            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
              {features.map((feature, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center inter mx-2">
                    <span className="text-gray-600">{feature.label}</span>
                    <span className="text-gray-900 font-medium">{feature.value}</span>
                  </div>
                  <hr className="my-2 border-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;