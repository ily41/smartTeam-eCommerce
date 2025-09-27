import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useFilterProductsMutation, useGetCategoriesQuery, useGetParentCategoriesQuery, useGetProductQuery } from '../store/API';

export function FilterSidebar({ onFilterResults, onLoadingChange, currentSort, currentPage, pageSize }) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  const [filterProducts, { isLoading: isFiltering }] = useFilterProductsMutation();
  
  // Track if filters have been applied to prevent loops
  const hasFiltersApplied = useRef(false);
  // Debounce timer for price inputs
  const debounceTimer = useRef(null);

  const toggleShowAll = () => {
    setShowAllCategories(prev => !prev);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      }
      return [categoryId]; // Only allow single category selection
    });
  };

  // Apply filters
  useEffect(() => {
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Debounce the filter call (especially for price inputs)
    // But don't debounce the initial load
    const delay = hasFiltersApplied.current ? 300 : 0;
    
    debounceTimer.current = setTimeout(async () => {
      hasFiltersApplied.current = true;
      // Parse sort value
      let sortByValue, sortOrderValue;
      if (currentSort) {
        const sortParts = currentSort.split('_');
        if (sortParts[0] === 'price') {
          sortByValue = 'price';
          sortOrderValue = sortParts[1];
        } else if (sortParts[0] === 'name') {
          sortByValue = 'name';
          sortOrderValue = sortParts[1];
        } else if (currentSort === 'newest') {
          sortByValue = 'createdDate';
          sortOrderValue = 'desc';
        }
      }

      // Build filter payload
      const filterPayload = {
        categoryId: selectedCategories.length > 0 ? selectedCategories[0] : null,
        filterCriteria: [],
        minPrice: minPrice ? parseFloat(minPrice) : null,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null,
        sortBy: sortByValue || null,
        sortOrder: sortOrderValue || null,
        page: currentPage || 0,
        pageSize: pageSize || 20
      };
      console.log(filterPayload)

      // Notify parent that loading has started
      if (onLoadingChange) {
        onLoadingChange(true);
      }

      try {
        const result = await filterProducts(filterPayload).unwrap();
        
        // Notify parent component with results
        if (onFilterResults) {
          onFilterResults(result);
        }
      } catch (error) {
        console.error('Failed to filter products:', error);
        
        // Still notify parent to stop loading
        if (onFilterResults) {
          onFilterResults({ products: [], totalCount: 0 });
        }
      } finally {
        // Notify parent that loading has finished
        if (onLoadingChange) {
          onLoadingChange(false);
        }
      }
    }, delay); // 300ms debounce after first load, 0ms for initial load

    // Cleanup
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [selectedCategories, minPrice, maxPrice, currentSort, currentPage, pageSize]);

  if (isCategoriesLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white border border-gray-200">
      <hr className="mx-4 border-[#dee2e6]" />
      
      {/* Category Filter */}
      <details open>
        <summary className="w-full flex items-center justify-between p-4 text-left cursor-pointer">
          <span className="font-medium text-gray-900">Category</span>
          <ChevronDown className="chevron w-4 h-4 text-gray-500 transition-transform duration-200" />
        </summary>
        <div className="px-4 pb-4 space-y-2">
          {categories
            ?.slice(0, showAllCategories ? categories.length : 5)
            .map(item => (
              <label key={item.id} className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  checked={selectedCategories.includes(item.id)}
                  onChange={() => handleCategoryChange(item.id)}
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </label>
            ))}

          {categories?.length > 5 && (
            <button
              onClick={toggleShowAll}
              className="text-sm text-red-500 hover:text-red-600 font-medium"
            >
              {showAllCategories ? 'See less' : 'See all'}
            </button>
          )}
        </div>
      </details>

      <hr className="mx-4 border-[#dee2e6]" />

      {/* Price Filter */}
      <details open>
        <summary className="w-full flex items-center justify-between p-4 text-left cursor-pointer">
          <span className="font-medium text-gray-900">Price Range</span>
          <ChevronDown className="chevron w-4 h-4 text-gray-500 transition-transform duration-200" />
        </summary>
        <div className="px-4 pb-4 space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              min="0"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              min="0"
            />
          </div>
        </div>
      </details>

      {isFiltering && (
        <div className="px-4 py-2 text-sm text-gray-500 flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
          <span>Filtering...</span>
        </div>
      )}
    </div>
  );
}