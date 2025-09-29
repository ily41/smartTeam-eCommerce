import React, { useEffect, useState, useCallback } from 'react';
import { Grid, List } from 'lucide-react';
import { Breadcrumb } from '../../products/Breadcrumb';
import SearchUI from '../../components/UI/SearchUI';
import { FilterSidebar } from '../../products/FilterSidebar';
import { MobileFilterButtons } from '../../products/MobileFilters';
import { ActiveFilters } from '../../products/ActiveFilters';
import { ProductCard } from '../../products/ProductCard';
import { Pagination } from '../../products/Pagination';
import { useAddCartItemMutation, useGetProductsQuery, useGetCategoriesQuery } from '../../store/API';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

// Skeleton Components
const ProductCardSkeleton = ({ col }) => (
  <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${col ? '' : 'flex'}`}>
    {col ? (
      <>
        <div className="w-full aspect-square bg-gray-200 animate-pulse" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
        </div>
      </>
    ) : (
      <>
        <div className="w-48 h-48 bg-gray-200 animate-pulse flex-shrink-0" />
        <div className="p-4 flex-1 space-y-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
        </div>
      </>
    )}
  </div>
);

function Products() {

  const {slug} = useParams()
  const categoryName = slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); 
  const [template, setTemplate] = useState(isMobile ? "cols" : "rows");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  const {data: productDefault, isLoading: isLoadingProducts } = useGetProductsQuery();
  const {data: categories} = useGetCategoriesQuery();
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  
  const [addCartItem, { isLoading: isAddingToCart }] = useAddCartItemMutation();
  
  // Find category ID from slug
  const categoryId = React.useMemo(() => {
    if (!slug || !categories) return null;
    const category = categories.find(cat => 
      cat.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
    );
    return category?.id || null;
  }, [slug, categories]);

  // Set default products when they load and no filters are applied
  useEffect(() => {
    if (productDefault && !filtersApplied) {
      setProducts(productDefault);
      setTotalItems(productDefault.length);
    }
  }, [productDefault, filtersApplied]);

  // Calculate total pages based on API totalItems
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Memoize the filter results handler to prevent re-creation on every render
  const handleFilterResults = useCallback((data, filters = []) => {
    // Update active filters
    setActiveFilters(filters);

    if (data === null) {
      // No filters applied - use default products
      setFiltersApplied(false);
      if (productDefault) {
        setProducts(productDefault);
        setTotalItems(productDefault.length);
      }
    } else if (data?.products) {
      // Filters applied - use filtered results
      setFiltersApplied(true);
      setProducts(data.products);
      setTotalItems(data.totalCount || data.products?.length);
     
    } else {
      
      setFiltersApplied(true);
      setProducts([]);
      setTotalItems(0);
    }
  }, [productDefault]);

  const handleRemoveFilter = (filterToRemove) => {
    // This is a placeholder - you'll need to implement the actual logic
    // to communicate back to FilterSidebar to remove the specific filter
    console.log('Remove filter:', filterToRemove);
    // You may need to lift this state up or use a different approach
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    // Reset to first page when sorting changes
    setCurrentPage(1);
  };

  const handleAddToCart = async (id) => {
    if (!id) {
      console.error('Product not available');
      return;
    }

    try {
      const result = await addCartItem({
        productId: id,
        quantity: 1
      }).unwrap();
      
      toast.success('Product added to cart');
    } catch (err) {
      console.error('Failed to add product to cart:', err);
      
      if (err?.status === 401 || err?.data?.status === 401) {
        toast.error("Please log in first");
      } else {
        toast.error("Failed to add product to cart");
      }
    }
  };
  
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setTemplate(isMobile ? "cols" : "rows"); 
  }, [isMobile]);

  // Determine if we should show loading state
  const shouldShowLoading = isLoading || (isLoadingProducts && !filtersApplied);
  
  return (
    <div className="min-h-screen bg-[#f7fafc] inter">
      <div className='lg:hidden px-4 py-4 border-y-1 border-[#dee2e6] bg-white'>
        <div className='mb-4'>
          <SearchUI />
        </div>
        <Breadcrumb />
      </div>
      
      <div className='lg:hidden bg-white px-4 py-4'>
        <h1 className="text-2xl font-medium text-gray-900">
          {categoryName || 'Products'} ({totalItems})
        </h1>
      </div>
       
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className='hidden lg:block lg:pl-4'>
          <Breadcrumb />
        </div>
        
        <div className="lg:flex lg:gap-8 lg:mt-5">
          <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <FilterSidebar 
              onFilterResults={handleFilterResults}
              onLoadingChange={setIsLoading}
              currentSort={sortBy}
              currentPage={currentPage - 1}
              pageSize={itemsPerPage}
              hideCategoryFilter={!!slug}
              forcedCategoryId={categoryId}
            />
          </div>

          <div className="flex-1">
            <MobileFilterButtons 
              onFilterResults={handleFilterResults}
              onLoadingChange={setIsLoading}
              currentSort={sortBy}
              onSortChange={handleSortChange}
              currentPage={currentPage - 1}
              pageSize={itemsPerPage}
              forcedCategoryId={categoryId}
            />
            <div className="hidden lg:flex items-center justify-between bg-white p-3 rounded-lg border-[#dee2e6] border-1">
              {shouldShowLoading ? (
                <>
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-48" />
                  <div className="flex items-center space-x-4">
                    <div className="h-10 bg-gray-200 rounded animate-pulse w-32" />
                    <div className="h-10 bg-gray-200 rounded animate-pulse w-20" />
                  </div>
                </>
              ) : (
                <>
                  <span className="text-sm text-gray-600">
                    {totalItems.toLocaleString()} items
                    {categoryName && (
                      <> in <span className='font-semibold'>{categoryName}</span></>
                    )}
                  </span>

                  <div className="hidden lg:flex items-center space-x-4">
                    <select 
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                      value={sortBy}
                      onChange={handleSortChange}
                    >
                      <option value="">Sort by</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                      <option value="name_asc">Name: A to Z</option>
                      <option value="name_desc">Name: Z to A</option>
                    </select>
                    <div className="flex border border-gray-300 rounded-md overflow-hidden">
                      <button 
                        onClick={() => setTemplate("cols")} 
                        className={`p-2 ${template === "cols" ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} cursor-pointer`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>

                      <button 
                        onClick={() => setTemplate("rows")} 
                        className={`p-2 ${template === "cols" ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'} cursor-pointer`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="hidden lg:block">
              <ActiveFilters 
                filters={activeFilters}
                onRemoveFilter={handleRemoveFilter}
              />
            </div>

            <div className={`mt-4 ${template === "cols" ? 'grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6' : 'flex flex-col gap-4'}`}>
              {shouldShowLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={index} col={template === "cols"} />
                ))
              ) : products?.length > 0 ? (
                products?.map((item, index) => {
                  const cardInfo = {
                    url: item.primaryImageUrl,
                    name: item.name,
                    price: item.currentPrice,
                    id: item.id
                  };
                  return (
                    <ProductCard 
                      key={item.id || index} 
                      col={template === "cols"} 
                      info={cardInfo}
                      handleAddToCart={handleAddToCart}
                      isAddingToCart={isAddingToCart}
                    />
                  );
                })
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products found</p>
                  <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
                </div>
              )}
            </div>

            {!shouldShowLoading && totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;