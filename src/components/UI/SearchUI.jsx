import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { Search, X } from 'lucide-react';
import { SearchContext } from '../../router/Context';
import { useSearchProductsQuery } from "../../store/API";

// Skeleton for search results - Mobile
const SearchProductSkeletonMobile = () => (
  <div className="bg-white rounded-lg border border-[#dee2e6] p-2 animate-pulse">
    <div className="w-full aspect-square bg-gray-200 rounded-lg mb-2" />
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-1/3 mt-1" />
    </div>
  </div>
);

const SearchUI = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { searchOpen, setSearchOpen } = useContext(SearchContext);
  const searchDropdownRef = useRef(null);

  // Call search API with the query
  const { data: searchResult, isLoading: isSearching } = useSearchProductsQuery(
    { q: searchQuery }, 
    {
      skip: !searchQuery || searchQuery.length < 2
    }
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target)) {
        ;
      }
    }

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen, setSearchOpen]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length >= 2) {
      setSearchOpen(true);
    } else {
      ;
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    ;
  };

  const handleSearchFocus = () => {
    if (searchQuery.length >= 2) {
      setSearchOpen(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClearSearch();
      e.target.blur();
    }
  };

  const handleProductClick = (productId) => {
    ;
    setSearchQuery('');
    navigate(`/details/${productId}`);
  };

  const handleViewAllClick = () => {
    const query = searchQuery;
    ;
    setSearchQuery('');
    navigate(`/products?search=${query}`);
  };

  return (
    <div className="pb-0 lg:hidden bg-[#f7fafc] border-t-1 border-t-[#DEE2E6]" ref={searchDropdownRef}>
      <div className="p-3">
        <div className="relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={20} 
          />
          
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onKeyDown={handleKeyDown}
            className="w-full pl-11 pr-12 py-2 bg-white border border-[#dee2e6] rounded-lg focus:outline-none placeholder:text-gray-400 text-gray-700 text-base"
            placeholder="Search products..."
          />
          
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
                p-1 rounded-full hover:bg-gray-100 transition-colors duration-200
                text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {searchOpen && (
        <div className="bg-white border-t border-[#dee2e6] shadow-lg max-h-[70vh] overflow-y-auto">
          <div className="p-4">
            {isSearching ? (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-3">PRODUCTS</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[...Array(4)].map((_, idx) => (
                    <SearchProductSkeletonMobile key={idx} />
                  ))}
                </div>
              </div>
            ) : searchResult && searchResult.length > 0 ? (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-3">
                  PRODUCTS ({searchResult.length})
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {searchResult.slice(0, 6).map(product => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="bg-white rounded-lg border border-[#dee2e6] p-2 hover:shadow-md cursor-pointer transition-all"
                    >
                      <div className="relative w-full aspect-square max-w-[200px] bg-white rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                        <img 
                          src={`http://localhost:5056${product.primaryImageUrl}`}
                          alt={product.name}
                          className="max-w-[200px] object-contain"
                          onError={(e) => {
                            e.target.src = '/Icons/logo.svg';
                          }}
                        />
                        {product.isHotDeal && (
                          <div className="absolute top-1 right-1 bg-[#E60C03] text-white text-[10px] px-1.5 py-0.5 rounded">
                            Hot
                          </div>
                        )}
                        {product.discountPercentage > 0 && (
                          <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">
                            -{product.discountPercentage}%
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-gray-800 font-medium text-xs mb-1 line-clamp-2 min-h-[32px]">
                          {product.name}
                        </h4>
                        <p className="text-gray-400 text-[10px] mb-1 truncate">
                          {product.categoryName?.replace(/-/g, ' ')}
                        </p>
                        <div className="flex items-center gap-1 flex-wrap">
                          <span className="text-[#E60C03] font-bold text-sm">
                            ${product.currentPrice.toLocaleString()}
                          </span>
                          {product.discountPercentage > 0 && (
                            <span className="text-gray-400 text-[10px] line-through">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {searchResult.length > 6 && (
                  <button
                    onClick={handleViewAllClick}
                    className="block w-full text-center mt-4 py-3 text-[#E60C03] hover:text-red-700 font-medium text-sm transition-colors bg-gray-50 rounded-lg"
                  >
                    View all {searchResult.length} results →
                  </button>
                )}
              </div>
            ) : searchQuery.length >= 2 ? (
              <div className="py-12 text-center">
                <Search className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-600 font-medium mb-1">No results found</p>
                <p className="text-gray-400 text-sm">
                  Try searching with different keywords
                </p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchUI;