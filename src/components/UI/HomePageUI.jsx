import { Heart, Loader2, Check } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'

const HomePageUI = ({deal, product, url, handleAddToCart, isAddingToCart}) => {
    const [loadingProductId, setLoadingProductId] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // Reset success state when loading starts
    useEffect(() => {
        if (isAddingToCart && loadingProductId === product.id) {
            setShowSuccess(false);
        }
    }, [isAddingToCart, loadingProductId, product.id]);

    // Show success when loading finishes for this product
    useEffect(() => {
        if (!isAddingToCart && loadingProductId === product.id && !showSuccess) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
                setLoadingProductId(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isAddingToCart, loadingProductId, product.id, showSuccess]);

    const onAddToCart = async (e, productId) => {
        e.preventDefault();
        e.stopPropagation();
        
        setLoadingProductId(productId);
        await handleAddToCart(productId);
    };

    const renderButton = (productId) => {
        const isThisProductLoading = isAddingToCart && loadingProductId === productId;
        
        if (isThisProductLoading) {
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
        
        if (showSuccess && loadingProductId === productId) {
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
                onClick={(e) => onAddToCart(e, productId)}
                className="w-full cursor-pointer flex justify-center items-center text-sm lg:text-md bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
            >
                Add to cart
            </button>
        );
    };

    if(deal) {
        return (
            <Link to={`/details/${product.id}`} className='bg-white p-1 border-1 border-gray-300 cursor-pointer rounded-lg relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-400'>
                <img className='w-full rounded-lg p-3' src={`http://localhost:5056${url}`} alt="" />
                <div className='font-semibold p-2 inter'>
                    <div className="flex flex-nowrap gap-2 items-center overflow-hidden">
                      <h1 className="line-through truncate">{product.originalPrice} AZN</h1>
                      <h1 className="text-[#FF4B43] truncate">{product.currentPrice} AZN</h1>
                    </div>
                    
                    <p className='font-medium mb-3'>{product.name}</p>
                    <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words line-clamp-3'>{product.shortDescription}</p>
                </div>
                <div className='absolute top-2 right-2 lg:top-3 lg:right-3 p-6 w-0 h-0 flex justify-center items-center rounded-[50%] bg-[#FF4B43] text-white inter'>
                    <p className='text-xs text-center font-semibold lg:text-sm'>{product.discountPercentage}%</p>
                </div>
                <div className='flex gap-3 p-2'>
                    {renderButton(product.id)}

                    <button className="p-3 rounded-lg border-[#DEE2E7] bg-white shadow-sm">
                      <Heart color="red" className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                    </button>
                </div>
            </Link>
        )
    }
    else {
        return (
            <Link to={`/details/${product.id}`} className='bg-white p-1 border-1 cursor-pointer border-gray-300 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-400'>
                <img className='w-full rounded-lg p-3' src={`http://localhost:5056${url}`} alt="" />
                <div className='font-semibold p-2 inter'>
                    <h1 className='text-lg'>{product.currentPrice} AZN</h1>
                    <p className='font-medium mb-3'>{product.name}</p>
                    <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words line-clamp-3'>{product.shortDescription}</p>
                </div>
                <div className='flex gap-3 p-2'>
                    {renderButton(product.id)}

                    <button className="p-3 rounded-lg border-[#DEE2E7] bg-white shadow-sm">
                      <Heart color="red" className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                    </button>
                </div>
            </Link>
        )
    }
}

export default HomePageUI