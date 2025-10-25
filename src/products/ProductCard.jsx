import React, { useState, useEffect } from 'react';
import { Heart, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useGetFavoriteStatusQuery } from '../store/API';




export function ProductCard({
  col,
  info,
  productData,
  handleAddToCart,
  isAddingToCart,
  toggleFavorite,
  isFavorite = false
}) {
  const { url, name, priceOriginal, price, id, description, discountPercentage, isHotDeal } = info;
  const [localFavorite, setLocalFavorite] = useState(isFavorite);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { data: favoriteStatus } = useGetFavoriteStatusQuery({ productId: info.id });
  


  const hasDiscount = priceOriginal && price && priceOriginal > price;

  useEffect(() => {
    if (justAdded) {
      const timer = setTimeout(() => setJustAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [justAdded]);

  const handleCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (handleAddToCart) {
      handleAddToCart(id, productData);
      setJustAdded(true);
    }
  };

  

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isTogglingFavorite || !toggleFavorite) return;
    
    
    try {
       
      await toggleFavorite(id);
    } catch (error) {
      console.log(error)
    }
  };

  if (col) {
    // Column layout (grid view)
    return (
      <div className="bg-white rounded-xl shadow-sm border flex flex-col justify-between border-gray-200 overflow-hidden relative">

        <Link to={`/details/${id}`} className="block">
          <div className="aspect-square p-4 relative">
            <img
              src={`https://smartteamaz-001-site1.qtempurl.com${url}`}
              alt={name || 'Product'}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = '/Icons/logo.svg';
              }}
            />
            
            {/* Badges */}
            {isHotDeal && (
              <div className="absolute top-2 right-2 bg-[#E60C03] text-white text-xs px-2 py-1 rounded font-semibold">
                Hot Deal
              </div>
            )}
            {hasDiscount && discountPercentage > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                -{discountPercentage}%
              </div>
            )}
          </div>
        </Link>

        <div className="p-4 ">
          <button
            onClick={handleFavoriteClick}
            disabled={isTogglingFavorite}
            className="absolute top-4 right-4 p-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
          >
            <Heart
              className={`w-5 h-5 transition-colors text-red-500 hover:fill-red-400 cursor-pointer ${
                favoriteStatus?.isFavorite && 'fill-red-500'
              }`}

            />
          </button>

          <Link to={`/details/${id}`} className="block mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[56px]">
              {name}
            </h3>
            {description && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {description}
              </p>
            )}
            
            {/* Price Display - Always show both prices */}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <p className="text-xl font-bold text-[#E60C03]">
                {price} ₼
              </p>
              {hasDiscount && (
                <p className="text-sm text-gray-400 line-through">
                  {priceOriginal} ₼
                </p>
              )}
            </div>
            
            {hasDiscount && (
              <p className="text-xs text-green-600 font-medium mt-1">
                Save {(priceOriginal - price).toFixed(2)} ₼
              </p>
            )}
          </Link>

          <button
            onClick={handleCartClick}
            disabled={isAddingToCart || justAdded}
            className={`w-full cursor-pointer text-sm lg:text-md py-3 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              justAdded
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-[#E60C03] hover:bg-red-600 disabled:bg-red-400 disabled:cursor-not-allowed text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                Added to cart
              </>
            ) : isAddingToCart ? (
              'Adding...'
            ) : (
              'Add to the cart'
            )}
          </button>
        </div>
      </div>
    );
  } else {
    // Row layout (list view)
    return (
      <>
        <Link
        to={`/details/${id}`}
        className="border border-[#dbdbdb] rounded-xl p-4 bg-white flex items-center gap-6 relative"
      >
        {/* Product Image */}
        <div className="flex-shrink-0 h-full w-full max-w-[150px] relative">
          <img
            src={`https://smartteamaz-001-site1.qtempurl.com${url}`}
            alt={name || "Product"}
            className="max-w-[150px] object-cover aspect-square w-full h-full rounded-lg"
            onError={(e) => {
              e.currentTarget.src = "/Icons/logo.svg";
              e.currentTarget.className =
                "object-contain aspect-square w-full h-full rounded-lg";
            }}
          />
          
          {/* Badges on image */}
          {hasDiscount && discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              -{discountPercentage}%
            </div>
          )}
          {isHotDeal && (
            <div className="absolute top-2 right-2 bg-[#E60C03] text-white text-xs px-2 py-1 rounded font-semibold">
              Hot Deal
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{name}</h2>
              {description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {description}
                </p>
              )}
              
              {/* Price Display - Always show both prices */}
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <p className="text-2xl font-bold text-[#E60C03]">
                  {price} ₼
                </p>
                {/* {hasDiscount && (
                  <>
                    <p className="text-lg text-gray-400 line-through">
                      {priceOriginal} ₼
                    </p>
                    <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                      Save {(priceOriginal - price).toFixed(2)} ₼
                    </span>
                  </>
                )} */}
              </div>
            </div>

            <button
              onClick={handleFavoriteClick}
              disabled={isTogglingFavorite}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Heart
                className={`w-6 h-6 transition-colors text-red-500 hover:fill-red-400  cursor-pointer ${
                  favoriteStatus?.isFavorite
                    && 'fill-red-500 '
                }`}
              />
            </button>
          </div>

          <button
            onClick={handleCartClick}
            disabled={isAddingToCart || justAdded}
            className={`h-fit self-end cursor-pointer w-[200px] text-sm lg:text-md py-3 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              justAdded
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-[#E60C03] hover:bg-red-600 disabled:bg-red-400 disabled:cursor-not-allowed text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                Added to cart
              </>
            ) : isAddingToCart ? (
              'Adding...'
            ) : (
              'Add to the cart'
            )}
          </button>
        </div>
        </Link>
        
      </>
    );
  }
}