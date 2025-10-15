import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Grid, List, ChevronDown, Check } from 'lucide-react';
import { Breadcrumb } from '../../products/Breadcrumb';
import SearchUI from '../../components/UI/SearchUI';
import { FilterSidebar } from '../../products/FilterSidebar';
import { MobileFilterButtons } from '../../products/MobileFilters';
import { ProductCard } from '../../products/ProductCard';
import { Pagination } from '../../products/Pagination';
import { 
  useAddCartItemMutation, 
  useGetProductsQuery, 
  useGetCategoriesQuery, 
  useToggleFavoriteMutation,
  useGetFavoritesQuery,
  useGetHotDealsQuery,
  useGetRecommendedQuery,
  useGetProductsBrandQuery,
  useGetProductsCategorySlugQuery
} from '../../store/API';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';


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


const CustomDropdown = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full lg:w-auto min-w-[180px] flex items-center justify-between gap-3 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
      >
        <span>{selectedOption.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-full lg:w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left transition-colors ${
                value === option.value
                  ? 'bg-gray-50 text-gray-900 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{option.label}</span>
              {value === option.value && <Check className="w-4 h-4 text-gray-900" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

function Products() {
  const { slug } = useParams();
  const location = window.location.pathname;
  const { t } = useTranslation();
  
  // Extract brand slug if this is a brand route
  const pathParts = location.split('/');
  const isBrandRoute = pathParts.includes('brand');
  const brandSlug = isBrandRoute ? pathParts[pathParts.indexOf('brand') + 1] : null;
  
  
  // Determine if this is a special slug
  const isHotDeals = slug === 'hot-deals';
  const isRecommended = slug === 'recommended';
  const isBrand = isBrandRoute && brandSlug;
  const isSpecialSlug = isHotDeals || isRecommended || isBrand;
  
  const categoryName = isHotDeals 
    ? 'Hot Deals' 
    : isRecommended 
    ? 'Recommended' 
    : isBrand
    ? brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1)
    : slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); 
  const [template, setTemplate] = useState(isMobile ? "cols" : "rows");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  console.log(slug)
  const { data: productDefault, isLoading: isLoadingProducts } = useGetProductsCategorySlugQuery(slug);
  console.log("default")
  console.log(productDefault)

  const { data: hotDeals, isLoading: isHotDealsLoading } = useGetHotDealsQuery(undefined,
    { limit: 10 }, 
    { skip: !isHotDeals });
  
  const { data: recommended, isLoading: isRecommendedLoading } = useGetRecommendedQuery(
    { limit: 10 }, 
    { skip: !isRecommended }
  );
  
  const { data: brandProducts, isLoading: isBrandLoading } = useGetProductsBrandQuery(
    { brandSlug }, 
    { skip: !isBrand }
  );
  console.log(brandProducts)
  
  const { data: categories } = useGetCategoriesQuery();
  const { data: favorites } = useGetFavoritesQuery();
  
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  
  const [addCartItem] = useAddCartItemMutation();
  const [toggleFavorite] = useToggleFavoriteMutation();
  const [addingIds, setAddingIds] = useState(new Set());

  // Sort options for dropdown
  const sortOptions = [
    { value: null, label: 'Sort by' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'name_asc' , label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A',  }
  ];

  // Find category ID from slug (only for regular category pages)
  const categoryId = React.useMemo(() => {
    if (!slug || !categories || isSpecialSlug) return null;
    const category = categories.find(cat => 
      cat.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
    );
    return category?.id || null;
  }, [slug, categories, isSpecialSlug]);

  // Set products based on slug type
  useEffect(() => {
    if (isHotDeals && hotDeals && !filtersApplied) {
      setProducts(hotDeals);
      setTotalItems(hotDeals.length);
      console.log("set to hotdeals")

    } else if (isRecommended && recommended?.recentlyAdded && !filtersApplied) {
      setProducts(recommended.recentlyAdded);
      setTotalItems(recommended.recentlyAdded.length);
      console.log("set to recently")

    } else if (isBrand && brandProducts && !filtersApplied) {
      setProducts(brandProducts);
      setTotalItems(brandProducts.length);
      console.log("set to brand")
    } else if (!isSpecialSlug && productDefault && !filtersApplied) {
      setProducts(productDefault);
      setTotalItems(productDefault.length);
      console.log("set to default")
    }
  }, [productDefault, hotDeals, recommended, brandProducts, filtersApplied, isHotDeals, isRecommended, isBrand, isSpecialSlug]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterResults = useCallback((data, filters = []) => {
    setActiveFilters(filters);

    if (data === null) {
      setFiltersApplied(false);
      // Reset to appropriate default data
      if (isHotDeals && hotDeals) {
        setProducts(hotDeals);
        setTotalItems(hotDeals.length);
      } else if (isRecommended && recommended?.recentlyAdded) {
        setProducts(recommended.recentlyAdded);
        setTotalItems(recommended.recentlyAdded.length);
      } else if (isBrand && brandProducts) {
        setProducts(brandProducts);
        setTotalItems(brandProducts.length);
      } else if (productDefault) {
        setProducts(productDefault);
        setTotalItems(productDefault.length);
      }
    } else if (data?.products) {
      setFiltersApplied(true);
      setProducts(data.products);
      setTotalItems(data.totalCount || data.products?.length);
    } else {
      setFiltersApplied(true);
      setProducts([]);
      setTotalItems(0);
    }
  }, [productDefault, hotDeals, recommended, brandProducts, isHotDeals, isRecommended, isBrand]);



  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleAddToCart = async (id) => {
    if (!id) return;

    setAddingIds(prev => new Set(prev).add(id));

    try {
      await addCartItem({ productId: id, quantity: 1 }).unwrap();
    } catch (err) {
      console.error(err);
      if (err?.status === 401 || err?.data?.status === 401) {
        toast.error("Please log in first");
      } else {
        toast.error("Failed to add product to cart");
      }
    } finally {
      setAddingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
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
  };

  const isProductFavorited = (productId) => {
    if (!favorites) return false;
    return favorites.includes(productId);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setTemplate(isMobile ? "cols" : "rows"); 
  }, [isMobile]);

  // Determine loading state based on slug type
  const shouldShowLoading = isLoading || 
    (isHotDeals && isHotDealsLoading && !filtersApplied) ||
    (isRecommended && isRecommendedLoading && !filtersApplied) ||
    (isBrand && isBrandLoading && !filtersApplied) ||
    (!isSpecialSlug && isLoadingProducts && !filtersApplied);

  return (
    <div className="min-h-screen bg-[#f7fafc] inter">
      <div className='lg:hidden px-4 py-4 border-y-1 border-[#dee2e6] bg-white'>
        <div className='mb-4'><SearchUI /></div>
        <Breadcrumb />
      </div>
      
      <div className='lg:hidden bg-white px-4 py-4'>
        <h1 className="text-2xl font-medium text-gray-900">
          {categoryName || 'Products'} ({totalItems})
        </h1>
      </div>
       
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className='hidden lg:block lg:pl-4'><Breadcrumb /></div>
        
        <div className="lg:flex lg:gap-8 lg:mt-5">
          <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <FilterSidebar 
              onFilterResults={handleFilterResults}
              onLoadingChange={setIsLoading}
              currentSort={sortBy}
              currentPage={currentPage}
              pageSize={itemsPerPage}
              forcedCategoryId={categoryId}
              showCategory={isSpecialSlug}
            />
          </div>

          <div className="flex-1"> 
            <MobileFilterButtons 
              onFilterResults={handleFilterResults}
              onLoadingChange={setIsLoading}
              currentSort={sortBy}
              onSortChange={handleSortChange}
              currentPage={currentPage}
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
                    {categoryName && <> in <span className='font-semibold'>{categoryName}</span></>}
                  </span>

                  <div className="hidden lg:flex items-center space-x-4">
                    <CustomDropdown
                      value={sortBy}
                      onChange={handleSortChange}
                      options={sortOptions}
                    />
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

            <div className={`mt-4 ${template === "cols" ? 'grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6' : 'flex flex-col gap-4'}`}>
              {shouldShowLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={index} col={template === "cols"} />
                ))
              ) : products?.length > 0 ? (
                products.map((item, index) => {
                  const cardInfo = {
                    url: item.primaryImageUrl,
                    name: item.name,
                    priceOriginal: item?.originalPrice,
                    price: item?.currentPrice,
                    id: item.id,
                    description: item.shortDescription
                  };
                  return (
                    <ProductCard 
                      key={item.id || index} 
                      col={template === "cols"} 
                      info={cardInfo}
                      handleAddToCart={handleAddToCart}
                      isAddingToCart={addingIds.has(item.id)}
                      toggleFavorite={handleToggleFavorite}
                      isFavorite={isProductFavorited(item.id)}
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