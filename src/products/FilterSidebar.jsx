import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useFilterProductsMutation, useGetCategoriesQuery, useGetCategoryFiltersQuery, useGetFiltersQuery, useGetParentCategoriesQuery, useGetProductQuery } from '../store/API';

export function FilterSidebar({ onFilterResults, onLoadingChange, currentSort, currentPage, pageSize }) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  const { data: ParentCat, isLoading: isParentCatLoading } = useGetParentCategoriesQuery();
  console.log(categories)
  const { data: customFilters, isLoading: isCustomLoading } = useGetFiltersQuery();
  
  // Get category-specific filters when a category is selected
  const selectedCategoryId = selectedCategories.length > 0 ? selectedCategories[0] : null;
  const { data: categoryFilters, isLoading: isCategoryFiltersLoading } = useGetCategoryFiltersQuery(
    selectedCategoryId, 
    { skip: !selectedCategoryId }
  );
  const buildActiveFilters = () => {
    const activeFilters = [];
    
  
    // Add category filters
    if (selectedCategories.length > 0 && categories) {
      selectedCategories.forEach(categoryId => {
        const category = categories.find(cat => cat.id === categoryId);
        if (category) {
          activeFilters.push({
            id: `category-${categoryId}`,
            key: `category-${categoryId}`,
            label: category.name,
            type: 'category',
            value: categoryId
          });
        }
      });
    }
  
    // Add custom filter selections
    if (customFilters) {
      Object.values(selectedFilters).forEach(filter => {
        if (filter.filterOptionIds && filter.filterOptionIds.length > 0) {
          const customFilter = customFilters.find(cf => cf.id === filter.filterId);
          if (customFilter) {
            filter.filterOptionIds.forEach(optionId => {
              const option = customFilter.options?.find(opt => opt.id === optionId);
              if (option) {
                activeFilters.push({
                  id: `filter-${filter.filterId}-${optionId}`,
                  key: `filter-${filter.filterId}-${optionId}`,
                  label: `${customFilter.name}: ${option.displayName || option.label}`,
                  type: 'custom',
                  filterId: filter.filterId,
                  optionId: optionId
                });
              }
            });
          }
        }
      });
    }
  
    // Add price range filter
    if (minPrice || maxPrice) {
      const priceLabel = minPrice && maxPrice 
        ? `Price: $${minPrice} - $${maxPrice}`
        : minPrice 
          ? `Price: $${minPrice}+`
          : `Price: up to $${maxPrice}`;
      
      activeFilters.push({
        id: 'price-range',
        key: 'price-range',
        label: priceLabel,
        type: 'price',
        minPrice,
        maxPrice
      });
    }
  
    return activeFilters;
  };
  // Initialize selectedFilters state properly
  const [selectedFilters, setSelectedFilters] = useState({});
  
  const [filterProducts, { isLoading: isFiltering }] = useFilterProductsMutation();
  
  // Track if filters have been applied to prevent loops
  const hasFiltersApplied = useRef(false);
  // Debounce timer for price inputs
  const debounceTimer = useRef(null);

  // Determine which filters to show - category-specific or general
  const filtersToShow = selectedCategoryId && categoryFilters ? categoryFilters : customFilters;
  const isFiltersLoading = selectedCategoryId ? isCategoryFiltersLoading : isCustomLoading;

  // Initialize selectedFilters when filters load or change
  useEffect(() => {
    if (filtersToShow) {
      const initialFilters = {};
      filtersToShow.forEach(filter => {
        // Only initialize if not already exists to preserve selections
        if (!selectedFilters[filter.id]) {
          initialFilters[filter.id] = {
            filterId: filter.id,
            filterOptionIds: [],
            customValue: '',
            minValue: 0,
            maxValue: 0
          };
        }
      });
      
      // Update only new filters, preserve existing selections
      setSelectedFilters(prev => ({
        ...prev,
        ...initialFilters
      }));
    }
  }, [filtersToShow]);

  // Reset filters when category changes
  useEffect(() => {
    if (selectedCategoryId) {
      // Reset all filters when category changes
      setSelectedFilters({});
    }
  }, [selectedCategoryId]);

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

  const handleFilterChange = (isChecked, filterId, optionId) => {
    setSelectedFilters(prev => {
      const updatedFilters = { ...prev };
      
      if (!updatedFilters[filterId]) {
        updatedFilters[filterId] = {
          filterId: filterId,
          filterOptionIds: [],
          customValue: '',
          minValue: 0,
          maxValue: 0
        };
      }

      if (isChecked) {
        // Add option ID if not already present
        if (!updatedFilters[filterId].filterOptionIds.includes(optionId)) {
          updatedFilters[filterId].filterOptionIds.push(optionId);
        }
      } else {
        // Remove option ID
        updatedFilters[filterId].filterOptionIds = updatedFilters[filterId].filterOptionIds.filter(
          id => id !== optionId
        );
      }

      return updatedFilters;
    });
  };

  // Build filter criteria for API
  const buildFilterCriteria = () => {
    const criteria = [];
    
    Object.values(selectedFilters).forEach(filter => {
      if (filter.filterOptionIds.length > 0 || filter.customValue || filter.minValue > 0 || filter.maxValue > 0) {
        criteria.push({
          filterId: filter.filterId,
          filterOptionIds: filter.filterOptionIds.length > 0 ? filter.filterOptionIds : null,
          customValue: filter.customValue || null,
          minValue: filter.minValue || null,
          maxValue: filter.maxValue || null
        });
      }
    });
    
    return criteria;
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    const hasCategories = selectedCategories.length > 0;
    const hasPrice = minPrice || maxPrice;
    const hasCustomFilters = Object.values(selectedFilters).some(filter => 
      filter.filterOptionIds?.length > 0 || 
      filter.customValue || 
      filter.minValue > 0 || 
      filter.maxValue > 0
    );
    
    return hasCategories || hasPrice || hasCustomFilters;
  };

  // Apply filters
  useEffect(() => {
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  
    const delay = hasFiltersApplied.current ? 300 : 0;

    debounceTimer.current = setTimeout(async () => {
      const hasActiveFiltersApplied = hasActiveFilters();
      
      if (!hasActiveFiltersApplied) {
        if (onFilterResults) {
            const activeFilters = buildActiveFilters();////////////////
           onFilterResults(result, activeFilters);
        }
        return;
      }
    
      hasFiltersApplied.current = true;

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
      const filterCriteria = buildFilterCriteria();

      const filterPayload = {
        categoryId: selectedCategories.length > 0 ? selectedCategories[0] : null,
        filterCriteria: filterCriteria.length > 0 ? filterCriteria : [],
        minPrice: minPrice ? parseFloat(minPrice) : null,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null,
        sortBy: sortByValue || null,
        sortOrder: sortOrderValue || null,
        page: currentPage || 0,
        pageSize: pageSize || 20
      };
    
      console.log('Filter Payload:', filterPayload);
    
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
    }, delay);
  
    // Cleanup
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [selectedCategories, selectedFilters, minPrice, maxPrice, currentSort, currentPage, pageSize]);

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

      {/* Custom Filters - Show category-specific or general filters */}
      {isFiltersLoading ? (
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-5 bg-gray-200 rounded w-1/3" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-4/5" />
            </div>
          </div>
        </div>
      ) : (
        filtersToShow?.map(filter => {
          return (
            <details key={filter.id} open>
              <summary className="w-full flex items-center justify-between p-4 text-left cursor-pointer">
                <span className="font-medium text-gray-900">{filter.name}</span>
                <ChevronDown className="chevron w-4 h-4 text-gray-500 transition-transform duration-200" />
              </summary>
              <div className="px-4 pb-4 space-y-2">
                {filter.options?.map(option => (
                  <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                      checked={selectedFilters[filter.id]?.filterOptionIds?.includes(option.id) || false}
                      onChange={(e) => {
                        handleFilterChange(e.target.checked, filter.id, option.id);
                      }}
                    />
                    <span className="text-sm text-gray-700">{option.displayName || option.label}</span>
                  </label>
                ))}
              </div>
              <hr className="mx-4 border-[#dee2e6]" />
            </details>
          );
        })
      )}

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

      {(isFiltering || isFiltersLoading) && (
        <div className="px-4 py-2 text-sm text-gray-500 flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
          <span>{isFiltering ? 'Filtering...' : 'Loading filters...'}</span>
        </div>
      )}
    </div>
  );
}