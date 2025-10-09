import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/pagination';
import { Heart, Download, Share2, Minus, Plus, X, Check, Copy, MessageCircle,   Send, LogIn, UserPlus, Loader2 } from 'lucide-react';
import { Breadcrumb } from '../../products/Breadcrumb';
import SearchUI from '../../components/UI/SearchUI';
import { 
  useGetProductQuery, 
  useGetProductSpecificationsQuery, 
  useAddCartItemMutation, 
  useToggleFavoriteMutation, 
  useGetFavoriteStatusQuery,
  useGetRecommendedQuery,
} from '../../store/API';
import { toast } from 'react-toastify';
import SimilarProducts from '../../components/UI/SimilarRecommendedProducts';


// Unauthorized Modal Component
const UnauthorizedModal = ({ isOpen, onClose, action }) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <LogIn className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Sign In Required
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              You need to be logged in to {action || 'perform this action'}. Please sign in or create an account to continue.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/login')}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </button>
            </div>
            <button
              onClick={onClose}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Continue browsing
            </button>
          </div>
        </div>
      </div>
    </>
  );
};






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
      <div className="relative px-4 mb-4 flex w-full justify-center">
        <div className="w-full max-w-[65vw]">
          <ImageSkeleton />
        </div>
        <div className="absolute top-10 right-6 flex flex-col gap-3">
          {[1, 2, 3].map(i => <SkeletonBox key={i} className="w-9 h-9" />)}
        </div>
      </div>
      <div className="px-4 pb-6 bg-white">
        <div className="flex space-x-2 justify-center">
          {[1, 2, 3].map(i => <ThumbnailSkeleton key={i} />)}
        </div>
      </div>
    </div>
    <div className="p-4 mt-6 border-[#DEE2E6] border-y-1 border-b-0 bg-white">
      <div className="flex flex-wrap gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <SkeletonBox key={i} className="w-20 h-8" />
        ))}
      </div>
    </div>
    <div className="p-4 mb-6 space-y-3 border-y-1 border-[#DEE2E6] bg-white">
      <SkeletonBox className="w-full h-12" />
      <SkeletonBox className="w-full h-12" />
    </div>
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
      <div className="space-y-4 w-full">
        <div className="bg-white rounded-lg p-4 w-full flex h-full justify-center flex-col items-center py-9 sm:border-1 sm:border-[#DEE2E6]">
          <ImageSkeleton />
          <div className="flex space-x-2 mt-4">
            {[1, 2, 3, 4].map(i => <ThumbnailSkeleton key={i} />)}
          </div>
        </div>
      </div>
      <div className="space-y-6 h-full">
        <div className="bg-white rounded-lg p-10 h-full sm:border-1 sm:border-[#DEE2E6]">
          <div className="flex items-center mb-3">
            <SkeletonBox className="w-5 h-5 mr-2" />
            <SkeletonBox className="w-32 h-5" />
          </div>
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <SkeletonBox className="w-3/4 h-8 mb-2" />
              <SkeletonBox className="w-full h-5 mb-4" />
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
          <div className="flex items-center gap-4 mb-6 mt-12">
            <SkeletonBox className="w-9 h-9 rounded-full" />
            <SkeletonBox className="w-8 h-8" />
            <SkeletonBox className="w-9 h-9 rounded-full" />
          </div>
          <div className="flex flex-col">
            <SkeletonBox className="w-full h-12 mt-6" />
            <SkeletonBox className="w-full h-12 mt-6" />
          </div>
        </div>
      </div>
    </div>
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
const ImageMagnifier = ({ src, alt, magnifierHeight = 150, magnifierWidth = 150, zoomLevel = 2.5 }) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const imgRef = useRef(null);

  const handleMouseEnter = (e) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setImgSize({ width, height });
    setShowMagnifier(true);
  };

  const handleMouseMove = (e) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setMagnifierPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  return (
    <div className="relative inline-block">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="h-80 object-contain rounded-lg cursor-crosshair"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onError={(e) => {
          e.target.src = "/Icons/logo.svg";
        }}
      />

      {showMagnifier && (
        <div
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${magnifierPosition.y - magnifierHeight / 2}px`,
            left: `${magnifierPosition.x - magnifierWidth / 2}px`,
            opacity: '1',
            border: '2px solid #e5e7eb',
            backgroundColor: 'white',
            backgroundImage: `url('${src}')`,
            backgroundRepeat: 'no-repeat',
            borderRadius: '50%',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            backgroundSize: `${imgSize.width * zoomLevel}px ${imgSize.height * zoomLevel}px`,
            backgroundPositionX: `${-magnifierPosition.x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-magnifierPosition.y * zoomLevel + magnifierHeight / 2}px`,
          }}
        />
      )}
    </div>
  );
};

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [hovered, setHovered] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [swiperRef, setSwiperRef] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);
  const [unauthorizedAction, setUnauthorizedAction] = useState('');
  const {data: recommendation, isRecLoading} = useGetRecommendedQuery({limit: 6})

  // RTK Query hooks
  const { data: product, isLoading: loading, error, isError } = useGetProductQuery(id, { skip: !id });
  console.log(product)
  const { data: productSpec, isLoading: isSpecLoading } = useGetProductSpecificationsQuery(product?.id, { skip: !product?.id });
  const { data: favoriteStatus } = useGetFavoriteStatusQuery({ productId: product?.id }, { skip: !product?.id });
  const [showSuccess, setShowSuccess] = useState(false);


  
  const [toggleFavorite] = useToggleFavoriteMutation();
  const [addCartItem, { isLoading: isAddingToCart, error: cartError }] = useAddCartItemMutation();

  const isInStock = product?.stockQuantity > 0;
  
  useEffect(() => {
    if (!isAddingToCart && showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAddingToCart, showSuccess]);

  // Handle toggle favorite
  const handleToggleFavorite = async (productId) => {
    if (!productId) return;

    try {
      await toggleFavorite({ productId }).unwrap();
    } catch (err) {
      console.error(err);
      if (err?.status === 401 || err?.data?.status === 401) {
        setUnauthorizedAction('add items to favorites');
        setShowUnauthorizedModal(true);
      } else {
        toast.error("Failed to update favorites");
      }
    }
  };

  // Handle PDF download
  const handleDownloadPdf = async () => {
    if (!product?.id) {
      toast.error("Product not loaded");
      return;
    }

    try {
      
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      const headers = {
        'Accept': '*/*',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`https://smartteamaz-001-site1.qtempurl.com/api/v1/product-pdfs/download/product/${product.id}`, {
        method: 'GET',
        headers: headers,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to download PDF: ${response.status}`);
      }

      const blob = await response.blob();
      
      if (blob.size === 0) {
        throw new Error('Downloaded file is empty');
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${product.name.replace(/[^a-z0-9]/gi, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Download error:', error);
      toast.error("No file exists for this product.");

    }
  };

  // Handle 401 errors
  useEffect(() => {
    if (error?.status === 401 || error?.data?.status === 401) {
      setUnauthorizedAction('view this product');
      setShowUnauthorizedModal(true);
    }
  }, [error]);

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!product || !id) {
      console.error('Product not available');
      return;
    }

    try {
      await addCartItem({
        productId: id,
        quantity: quantity
      }).unwrap();

      // Set success state after successful add
      setShowSuccess(true);
    } catch (err) {
      console.error('Failed to add product to cart:', err);

      if (err?.status === 401 || err?.data?.status === 401) {
        setUnauthorizedAction('add items to cart');
        setShowUnauthorizedModal(true);
      } else {
        toast.error("Failed to add product to cart");
      }
    }
  };

  // Handle share functionality
  const handleShare = async (platform) => {
    const productUrl = window.location.href;
    const productTitle = product.name;
    const productDescription = product.shortDescription || `Check out ${product.name}`;
    
    if (platform === 'native') {
      if (navigator.share) {
        try {
          await navigator.share({
            title: productTitle,
            text: productDescription,
            url: productUrl,
          });
          setShowShareMenu(false);
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error('Error sharing:', error);
            toast.error('Failed to share');
          }
        }
      } else {
        toast.info('Share API not supported on this browser');
      }
    } else if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(productUrl);
        setShowShareMenu(false);
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        toast.error('Failed to copy link');
      }
    } else if (platform === 'whatsapp') {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(productTitle + ' - ' + productUrl)}`;
      window.open(whatsappUrl, '_blank');
      setShowShareMenu(false);
    }   else if (platform === 'telegram') {
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(productTitle)}`;
      window.open(telegramUrl, '_blank');
      setShowShareMenu(false);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  // Get specifications
  const getSpecifications = (product, productSpec) => {
    if (!product) return [];
    
    const specs = [];
    
    if (productSpec && productSpec.specificationGroups) {
      productSpec.specificationGroups.forEach(group => {
        if (group.items && Array.isArray(group.items)) {
          group.items.forEach(item => {
            const basicFields = ['sku', 'category', 'stock status', 'availability', 'name'];
            if (!basicFields.includes(item.name.toLowerCase())) {
              const spec = item.unit ? `${item.value} ${item.unit}` : item.value;
              specs.push(spec);
            }
          });
        }
      });
    }
    
    if (specs.length === 0) {
      return ['16GB RAM', 'RTX 4060', 'Intel® Core™ i7', '240Hz Display', 'Advanced Cooling', '1TB SSD'];
    }
    
    return specs;
  };

  // Get features
  const getFeatures = (product, productSpec) => {
    if (!product) return [];
    
    const features = [];
    
    features.push(
      { label: 'Name', value: product.name },
      { label: 'SKU', value: product.sku },
      { label: 'Category', value: product.categoryName },
      { label: 'Stock', value: product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock' }
    );
    
    if (productSpec && productSpec.specificationGroups) {
      productSpec.specificationGroups.forEach(group => {
        if (group.items && Array.isArray(group.items)) {
          group.items.forEach(item => {
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
  const hasDiscount = product.discountPercentage > 0;

  

  return (
    <>
      <UnauthorizedModal 
        isOpen={showUnauthorizedModal} 
        onClose={() => setShowUnauthorizedModal(false)}
        action={unauthorizedAction}
      />
      
      <div className='p-6 py-4 border-y-1 border-[#DEE2E6] sm:hidden flex flex-col gap-5'>
        <SearchUI />
        <Breadcrumb productData={product}/>
        
      </div>
      <div className="min-h-[70vh] bg-gray-50 pt-8 sm:pt-0">
        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="bg-white border-y-1 border-[#DEE2E6]">
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
                  <span className="text-lg text-gray-500 line-through">{product?.prices[0].price} AZN</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                    -{product.discountPercentage}%
                  </span>
                </div>
              )}
            </div>

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
                  {product?.images.map((item, index) => (
                    <SwiperSlide key={index} className='relative h-64 py-5 pt-8 rounded-lg'>
                      <img 
                        className='w-full rounded-lg p-3 aspect-square' 
                        src={`https://smartteamaz-001-site1.qtempurl.com${item?.imageUrl}`} 
                        alt={item?.name || 'Product'}
                        onError={(e) => {
                          e.target.src =  "/Icons/logo.svg"
                        }}
                      />
                    </SwiperSlide>
                  ))}
                  <SwiperSlide className='relative h-64 py-5 pt-8 rounded-lg'>
                     <img 
                        className='w-full rounded-lg p-3 aspect-square' 
                        src={`https://smartteamaz-001-site1.qtempurl.com${product?.imageUrl}`} 
                        alt={product?.name || 'Product'}
                        onError={(e) => {
                          e.target.src =  "/Icons/logo.svg"
                        }}
                      />
                  </SwiperSlide>
                </Swiper>
              </div>

              <div className="absolute top-10 right-6 flex flex-col gap-3">
                <button onClick={() => handleToggleFavorite(id)} className="p-2 bg-gray-100 cursor-pointer rounded-lg hover:bg-gray-200 transition-colors"> 
                  <Heart className={`w-5 h-5 text-gray-600 ${favoriteStatus?.isFavorite && 'fill-current'}`} />
                </button>
                <button 
                  onClick={handleDownloadPdf} 
                  className="p-2 bg-gray-100 cursor-pointer rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  {showShareMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowShareMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <button
                          onClick={() => handleShare('copy')}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-sm"
                        >
                          <Copy className="w-4 h-4 text-gray-600" />
                          <span>Copy Link</span>
                        </button>
                        <button
                          onClick={() => handleShare('whatsapp')}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-sm"
                        >
                          <MessageCircle className="w-4 h-4 text-green-600" />
                          <span>WhatsApp</span>
                        </button>
                        <button
                          onClick={() => handleShare('telegram')}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-sm"
                        >
                          <Send className="w-4 h-4 text-blue-500" />
                          <span>Telegram</span>
                        </button>
                        {navigator.share && (
                          <>
                            <hr className="my-2 border-gray-200" />
                            <button
                              onClick={() => handleShare('native')}
                              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-sm"
                            >
                              <Share2 className="w-4 h-4 text-gray-600" />
                              <span>More Options</span>
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="px-4 pb-6 bg-white">
              <div className="flex space-x-2 justify-center">
                {product?.images.map((item, index) => (
                  <button 
                    key={index} 
                    className={`w-16 h-16 rounded-lg border-2 ${activeSlide === index ? 'border-red-500' : 'border-gray-200'} overflow-hidden`}
                    onClick={() => swiperRef?.slideTo(index)}
                  >
                    <img 
                      src={`https://smartteamaz-001-site1.qtempurl.com${item?.imageUrl}`}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full aspect-square h-full object-contain"
                      onError={(e) => {
                          e.target.src =  "/Icons/logo.svg"
                        }}
                    />

                  </button>
                ))}
              </div>
            </div>
          </div>


          <div className="p-4 mb-6 space-y-3 border-y-1 border-[#DEE2E6] bg-white w-full h-full self-end">
            <button 
                onClick={handleAddToCart}
                disabled={!isInStock || isAddingToCart || showSuccess}
                className={`w-full flex justify-center items-center py-3 mt-6 rounded-lg font-medium transition-colors duration-200 ${
                    !isInStock 
                        ? 'bg-gray-400 cursor-not-allowed text-white' 
                        : isAddingToCart
                        ? 'bg-red-400 cursor-not-allowed text-white'
                        : showSuccess
                        ? 'bg-green-500 cursor-default text-white'
                        : 'bg-red-500 hover:bg-red-600 cursor-pointer text-white'
                }`}
            >
                {!isInStock ? (
                    'Out of Stock'
                ) : isAddingToCart ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Adding...
                    </>
                ) : showSuccess ? (
                    <>
                        <Check className="w-4 h-4 mr-2" />
                        Added to cart
                    </>
                ) : (
                    'Add To Cart'
                )}
            </button>
          </div>

          <div className="bg-white border-y-1 border-[#DEE2E6] mt-4 helveticaNow">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-4 px-2 inter">
                <h2 className="text-lg font-semibold text-gray-900">Features</h2>
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

          <SimilarProducts
             products={recommendation?.recentlyAdded} 
             isLoading={isRecLoading} 
           />
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 pb-8">
          <div className='py-4 pb-8'>
            <Breadcrumb productData={product}/>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4 w-full">
              <div className="bg-white rounded-lg p-4 w-full flex h-full justify-center flex-col items-center py-9 sm:border-1 sm:border-[#DEE2E6]">
                <div className='w-fit'>
                  <ImageMagnifier
                    src={hovered ? `https://smartteamaz-001-site1.qtempurl.com${hovered}` : `https://smartteamaz-001-site1.qtempurl.com${product.imageUrl}`}
                    alt={product.name}
                    magnifierHeight={180}
                    magnifierWidth={180}
                    zoomLevel={2.5}
                  />
                </div>

                <div className="flex space-x-2 mt-4">
                  {product?.images.map((item, index) => (
                    <div 
                      key={index} 
                      onMouseEnter={() => setHovered(item.imageUrl)} 
                      onMouseLeave={() => setHovered(null)} 
                      className={`w-16 h-16 rounded-lg border-2 border-gray-200 overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 hover:shadow-lg ${hovered === item.imageUrl ? 'ring-2 ring-red-500 ring-offset-2' : ''}`}
                    >
                      <img 
                        src={`https://smartteamaz-001-site1.qtempurl.com${item.imageUrl}`}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-contain transition-transform duration-200 hover:scale-105"
                        onError={(e) => {
                          e.target.src = "/Icons/logo.svg"
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 h-full">
              <div className="bg-white rounded-lg flex flex-col justify-between p-10 h-full sm:border-1 sm:border-[#DEE2E6]">
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
                    <p className="text-gray-600 mb-4 line-clamp-5">{product.description}</p>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-red-500">{product?.prices[0].discountedPrice} AZN</span>
                      {hasDiscount && (
                        <>
                          <span className="text-xl text-gray-500 line-through">{product?.prices[0].price} AZN</span>
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
                      className="p-2 bg-gray-100 cursor-pointer rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Download className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="relative">
                      <button 
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Share2 className="w-5 h-5 text-gray-600" />
                      </button>
                      
                      {showShareMenu && (
                        <>
                          <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setShowShareMenu(false)}
                          />
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                            <button
                              onClick={() => handleShare('copy')}
                              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-sm"
                            >
                              <Copy className="w-4 h-4 text-gray-600" />
                              <span>Copy Link</span>
                            </button>
                            <button
                              onClick={() => handleShare('whatsapp')}
                              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-sm"
                            >
                              <MessageCircle className="w-4 h-4 text-green-600" />
                              <span>WhatsApp</span>
                            </button>
                            <button
                              onClick={() => handleShare('telegram')}
                              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-sm"
                            >
                              <Send className="w-4 h-4 text-blue-500" />
                              <span>Telegram</span>
                            </button>
                            {navigator.share && (
                              <>
                                <hr className="my-2 border-gray-200" />
                                <button
                                  onClick={() => handleShare('native')}
                                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-sm"
                                >
                                  <Share2 className="w-4 h-4 text-gray-600" />
                                  <span>More Options</span>
                                </button>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    <button onClick={() => handleToggleFavorite(id)} className="p-2 bg-gray-100 cursor-pointer rounded-lg hover:bg-gray-200 transition-colors">
                      <Heart className={`w-5 h-5 text-gray-600 ${favoriteStatus?.isFavorite && 'fill-current'}`} />
                    </button>
                  </div>
                </div>

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

                <div className='flex flex-col'>
                  <button 
                      onClick={handleAddToCart}
                      disabled={!isInStock || isAddingToCart || showSuccess}
                      className={`w-full flex justify-center items-center py-3 mt-6 rounded-lg font-medium transition-colors duration-200 ${
                          !isInStock 
                              ? 'bg-gray-400 cursor-not-allowed text-white' 
                              : isAddingToCart
                              ? 'bg-red-400 cursor-not-allowed text-white'
                              : showSuccess
                              ? 'bg-green-500 cursor-default text-white'
                              : 'bg-red-500 hover:bg-red-600 cursor-pointer text-white'
                      }`}
                  >
                      {!isInStock ? (
                          'Out of Stock'
                      ) : isAddingToCart ? (
                          <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Adding...
                          </>
                      ) : showSuccess ? (
                          <>
                              <Check className="w-4 h-4 mr-2" />
                              Added to cart
                          </>
                      ) : (
                          'Add To Cart'
                      )}
                  </button>
                </div>
              </div>
            </div>
          </div>

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
          <SimilarProducts
             products={recommendation?.recentlyAdded} 
             isLoading={isRecLoading} 
           />
        </div>
      </div>
    </>
  )
}

export default Details;