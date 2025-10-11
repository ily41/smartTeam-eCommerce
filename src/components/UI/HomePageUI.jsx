import { Heart, Loader2, Check } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useToggleFavoriteMutation, useGetFavoriteStatusQuery } from '../../store/API'; // adjust path
import { toast } from 'react-toastify';

const HomePageUI = ({deal, product, url, handleAddToCart, isAddingToCart}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [hoverFav, setHoverFav] = useState(false)
    
    // Get favorite status for this product
    const { data: favoriteStatus } = useGetFavoriteStatusQuery({ productId: product.id });
    const [toggleFavorite, { isLoading: isTogglingFavorite }] = useToggleFavoriteMutation();
    const [localFavorite, setLocalFavorite] = useState(false);

    // Update local favorite state when API data arrives
    useEffect(() => {
        if (favoriteStatus) {
            setLocalFavorite(favoriteStatus.isFavorite);
        }
    }, [favoriteStatus]);

    const onAddToCart = async (e, productId) => {
        e.preventDefault();
        e.stopPropagation();
        
        setIsLoading(true);
        setShowSuccess(false);
        
        try {
            await handleAddToCart(productId);
            setIsLoading(false);
            setShowSuccess(true);
            
            // Hide success message after 2 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 2000);
        } catch (error) {
            setIsLoading(false);
            console.error('Add to cart error:', error);
        }
    };

    const handleFavoriteClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Optimistic update
        const newFavoriteState = !localFavorite;
        setLocalFavorite(newFavoriteState);
        
        try {
            await toggleFavorite({ productId: product.id }).unwrap();
        } catch (err) {
            // Revert on error
            setLocalFavorite(!newFavoriteState);
            toast.error('Failed to update favorites');
            console.error('Toggle favorite error:', err);
        }
    };

    const renderButton = () => {
        if (isLoading) {
            return (
                <button
                    disabled
                    className="w-full cursor-not-allowed flex justify-center items-center text-sm lg:text-md bg-red-400 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
                >
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                </button>
            );
        }
        
        if (showSuccess) {
            return (
                <button
                    disabled
                    className="w-full cursor-default flex justify-center items-center text-sm lg:text-md bg-green-500 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
                >
                    <Check className="w-4 h-4 mr-2" />
                    Added to cart
                </button>
            );
        }

        return (
            <button
                onClick={(e) => onAddToCart(e, product.id)}
                className="w-full cursor-pointer flex justify-center items-center text-sm lg:text-md bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
            >
                Add to cart
            </button>
        );
    };

    if(deal) {
        return (
            <Link to={`/details/${product.id}`} className='bg-white p-1 border-1 flex flex-col justify-between border-gray-300 cursor-pointer rounded-lg relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-400 '>
                <img className='w-full rounded-lg p-3 aspect-square' src={`https://smartteamaz-001-site1.qtempurl.com${url}`} alt=""  onError={(e) => {
                  e.target.src = '/Icons/logo.svg';
                }}/>
                <div className='font-semibold p-2 inter flex flex-col justify-between h-full'>
                    <div className="flex flex-nowrap gap-2 items-center overflow-hidden">
                      <h1 className="line-through truncate">{product.originalPrice} AZN</h1>
                      <h1 className="text-[#FF4B43] truncate">{product.currentPrice} AZN</h1>
                    </div>

                    <p className='font-medium mb-3 whitespace-normal'>{product.name}</p>
                    <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words line-clamp-3'>{product.shortDescription}</p>
                </div>
                <div className='absolute top-2 right-2 lg:top-3 lg:right-3 p-6 w-0 h-0 flex justify-center items-center rounded-[50%] bg-[#FF4B43] text-white inter'>
                    <p className='text-xs text-center font-semibold lg:text-sm'>{product.discountPercentage}%</p>
                </div>
                <div className='flex gap-3 p-2'>
                    {renderButton()}

                    <button 
                        onClick={handleFavoriteClick}
                        disabled={isTogglingFavorite}
                        className="p-3 rounded-lg cursor-pointer border-[#DEE2E7] bg-white shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      <Heart 
                        className={`w-4 h-4 lg:w-5 lg:h-5 transition-colors ${
                            localFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                        }`}
                      />
                    </button>
                </div>
            </Link>
        )
    }
    else {
        return (
            <Link
              to={`/details/${product.id}`}
              className=" bg-white p-1  border-1 cursor-pointer border-gray-300 rounded-lg relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-400 flex flex-col justify-between"
            >
              <img
                className="w-full rounded-lg p-3 aspect-square"
                src={`https://smartteamaz-001-site1.qtempurl.com${url}`}
                alt=""
                onError={(e) => {
                  e.target.src = '/Icons/logo.svg';
                }}
              />
              <div className="font-semibold p-2 inter">
                <h1 className="text-lg">{product.currentPrice} AZN</h1>
                <p className="font-medium whitespace-normal mb-3">{product.name}</p>
                <p className="text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words line-clamp-3">
                  {product.shortDescription}
                </p>
              </div>
              <div className="flex group gap-3 p-2 ">
                {renderButton()}
            
                <button
                  onClick={handleFavoriteClick}
                  disabled={isTogglingFavorite}
                  className="p-3 rounded-lg absolute right-3 top-3 border-[#DEE2E7] cursor-pointer shadow-sm transition-colors disabled:opacity-50"
                >
                  <Heart
                    className={`
                      w-4 h-4 lg:w-5 lg:h-5 transition-colors
                      ${localFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                      group-hover:fill-red-500 group-hover:text-red-500
                    `}
                  />
                </button>
              </div>
            </Link>

        )
    }
}

export default HomePageUI