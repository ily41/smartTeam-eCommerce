import React, { useState } from 'react'
import SearchUI from '../../components/UI/SearchUI'
import { Breadcrumb } from '../../products/Breadcrumb'
import { Heart, Loader2, Check, Trash2 } from 'lucide-react';
import { 
  useGetFavoritesQuery, 
  useRemoveFavoriteMutation, 
  useAddCartItemMutation,
  useClearFavoritesMutation, 
  useGetRecommendedQuery
} from '../../store/API';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import SimilarProducts from '../../components/UI/SimilarRecommendedProducts'

const WishList = () => {
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(null);
  const {data: recommendation, isRecLoading} = useGetRecommendedQuery({limit: 6})
  

  const { data: favoritesData, isLoading, error } = useGetFavoritesQuery({ page, pageSize });
  console.log(favoritesData)
  

  const [removeFavorite, { isLoading: isRemovingFavorite }] = useRemoveFavoriteMutation();
  const [addCartItem, { isLoading: isAddingToCart }] = useAddCartItemMutation();
  const [clearFavorites] = useClearFavoritesMutation();

  const favorites = favoritesData?.favorites || [];
  const totalCount = favoritesData?.totalCount || 0;

  const handleRemoveFavorite = async (e, productId) => {
    console.log(productId)
    e.preventDefault();
    e.stopPropagation();
    
    try {
      console.log(productId)
      await removeFavorite({ productId }).unwrap();
    } catch (err) {
      toast.error('Failed to remove from favorites');
      console.error('Remove favorite error:', err);
    }
  };

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoadingProductId(productId);
    
    try {
      await addCartItem({ productId, quantity: 1 }).unwrap();
      setShowSuccess(productId);
      
      setTimeout(() => {
        setShowSuccess(null);
        setLoadingProductId(null);
      }, 2000);
    } catch (err) {
      setLoadingProductId(null);
      
      if (err?.status === 401 || err?.data?.status === 401) {
        toast.error("Please log in first");
      } else {
        toast.error("Failed to add to cart");
      }
      console.error('Add to cart error:', err);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      try {
        await clearFavorites().unwrap();
      } catch (err) {
        toast.error('Failed to clear favorites');
        console.error('Clear favorites error:', err);
      }
    }
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
    
    if (showSuccess === productId) {
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
        onClick={(e) => handleAddToCart(e, productId)}
        className="w-full cursor-pointer flex justify-center items-center text-sm lg:text-md bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
      >
        Add to cart
      </button>
    );
  };

  if (isLoading) {
    return (
      <section className="inter bg-[#f7fafc] min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading favorites...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="inter bg-[#f7fafc] min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error loading favorites</div>
      </section>
    );
  }

  return (
    <section className="inter bg-[#f7fafc] whitepsace-nowrap pb-8">
      {/* Mobile Search + Breadcrumb */}
      <div className="lg:hidden px-4 pl-7 py-4  bg-white lg:border-transparent ">
        <Breadcrumb />
      </div>

      <div className="min-h-[80vh] lg:max-w-[90vw] lg:mx-auto border border-[#dee2e6] lg:border-0">
        <div className='p-4 pl-7 pb-0 hidden lg:block'>
          <Breadcrumb />
        </div>
        
        <div className="p-4 pl-7 text-xl md:text-2xl font-semibold bg-white lg:bg-transparent border-b lg:border-0 border-[#dee2e6] mb-3 flex justify-between items-center">
          <h1>Favorites ({totalCount})</h1>
          {favorites?.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="text-sm text-red-600 hover:text-red-700 font-normal flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        <div className="lg:bg-transparent rounded-lg flex flex-col mx-auto md:mx-0 max-w-[95vh] md:max-w-full lg:flex-row lg:gap-4 shadow-sm lg:shadow-none p-4 space-y-4">
          <div className='flex-5 flex gap-5 flex-col lg:rounded-lg'>
            {favorites?.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-600">Your favorites list is empty</p>
                <p className="text-gray-500 mt-2">Start adding products you love!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 [@media(min-width:1300px)]:grid-cols-5 lg:grid-cols-4 gap-2 whitespace-nowrap">
                {favorites?.map((item) => {
                  console.log(item)
                  
                  return (
                  <Link 
                    key={item.id} 
                    to={`/details/${item.product.id}`}
                    className='bg-white p-1 border-1 cursor-pointer border-gray-300 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-400 relative'
                  >
                    <img 
                      className='w-full rounded-lg p-3 aspect-square' 
                      src={`https://smartteamaz-001-site1.qtempurl.com${item.product.primaryImageUrl}`} 
                      alt={item.product.name || 'Product'}
                      onError={(e) => {
                        e.target.src =  "/Icons/logo.svg"
                      }}
                    />
                    <div className='font-semibold p-2 inter'>
                      <h1 className='text-lg'>{item.product.currentPrice} AZN</h1>
                      <p className='font-medium mb-3 line-clamp-2'>{item.product.name || 'Product'}</p>
                      {item.product.shortDescription && (
                        <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words line-clamp-3 text-sm'>
                          {item.product.shortDescription}
                        </p>
                      )}
                    </div>
                    <div className='flex gap-3 p-2'>
                      {renderButton(item.product.id)}

                      <button 
                        onClick={(e) => handleRemoveFavorite(e, item.product.id)}
                        disabled={isRemovingFavorite}
                        className="p-3 rounded-lg border-[#DEE2E7] bg-white shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <Heart 
                          className="w-4 h-4 lg:w-5 lg:h-5 fill-red-500 text-red-500"
                        />
                      </button>
                    </div>
                  </Link>
                )})}
              </div>
            )}

            {/* Pagination */}
            {totalCount > pageSize && (
              <div className="flex justify-center gap-2 mt-6">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <span className="px-4 py-2 bg-white border border-gray-300 rounded-md">
                  Page {page} of {Math.ceil(totalCount / pageSize)}
                </span>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= Math.ceil(totalCount / pageSize)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        <SimilarProducts
                  products={recommendation?.recentlyAdded} 
                  isLoading={isRecLoading} 
                />
      </div>
    </section>
  );
};

export default WishList;