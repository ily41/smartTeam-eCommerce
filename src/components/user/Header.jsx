import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Burger from './Burger'
import { useGetCartCountQuery, useGetFavoritesCountQuery, useGetMeQuery, useSearchProductsQuery, useUpdateCartItemQuantityMutation } from "../../store/API";
import { Search, X } from 'lucide-react';
import { SearchContext } from '../../router/Context';
import { FaRegFile, FaRegUser, FaRegUserCircle, FaUserCircle } from 'react-icons/fa';
import { PiCarProfile } from 'react-icons/pi';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

// Skeleton for search results - Desktop
const SearchProductSkeletonDesktop = () => (
  <div className="bg-white rounded-lg border border-[#dee2e6] p-3 animate-pulse">
    <div className="w-full aspect-square bg-gray-200 rounded-lg mb-3" />
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-5 bg-gray-200 rounded w-1/3 mt-2" />
    </div>
  </div>
);

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

// Helper function to get cookie value
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const Header = () => {
  const navigate = useNavigate();
  const [burgerVi, setBurgerVi] = useState(false);
  const [open, setOpen] = useState(false);
  
  // Initialize language from cookie or default to 'en'
  const [selected, setSelected] = useState(() => {
    const savedLang = getCookie('language');
    return savedLang || i18next.language || 'en';
  });
  
  const { t } = useTranslation();
  const { searchOpen, setSearchOpen } = useContext(SearchContext);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const searchDropdownRef = useRef(null);
  const mobileSearchDropdownRef = useRef(null);
  const hasToken = document.cookie.split('; ').some((row) => row.startsWith('token='));
  const { data: cartCount } = useGetCartCountQuery();
  const { data: me, isLoading: isMeLoading } = useGetMeQuery();
  const { data: favoritesCount } = useGetFavoritesCountQuery();
  
  const [searchWidth, setSearchWidth] = useState(0);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchRef.current) {
      setSearchWidth(searchRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (searchRef.current) {
        setSearchWidth(searchRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dropdownRefLang = useRef(null);

  const languages = [
    {
      name: "English",
      value: "en"
    },
    {
      name: "Azerbaijani",
      value: "az"
    }
  ];

  const langName = {
    en: "English",
    az: "Azerbaijani"
  };

  // Initialize language on mount
  useEffect(() => {
    const savedLang = getCookie('language');
    if (savedLang && savedLang !== i18next.language) {
      i18next.changeLanguage(savedLang);
      setSelected(savedLang);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Handle language change
  useEffect(() => {
    i18next.changeLanguage(selected);
    // Store in cookie for persistence (1 year)
    document.cookie = `language=${selected}; path=/; max-age=31536000`;
  }, [selected]);

  const handleSelect = (language) => {
    setSelected(language);
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef?.current && !dropdownRef?.current.contains(event.target)) {
        if (window.innerWidth > 1024) {
          setSearchOpen(false);
        }
      }
    }

    if (open || searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, searchOpen, setSearchOpen]);

  const { data: searchResult, isLoading: isSearching } = useSearchProductsQuery({ q: searchQuery }, {
    skip: !searchQuery || searchQuery.length < 2
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length > 0) {
      setSearchOpen(true);
    } else {
      setSearchOpen(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleSearchFocus = () => {
    if (searchQuery.length > 0) {
      setSearchOpen(true);
    }
  };

  const handleProductClick = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    
    navigate(`/details/${productId}`);
    setTimeout(() => setSearchOpen(false), 100);
  };

  const handleViewAllClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const query = searchQuery;
    setSearchOpen(false);
    setSearchQuery('');
    
    setTimeout(() => {
      navigate(`/products?search=${query}`);
    }, 0);
  };

  return (
    <header className='pt-[59px] lg:pt-[84px]'>
      <Burger burgerV={burgerVi} setBurgerV={setBurgerVi}/>
      <nav className=''>
        <div className='flex justify-between lg:justify-around fixed top-0 z-50 bg-white w-full lg:items-center p-3 px-6 items-center'>
          <Link to='/' className='flex lg:flex-1 cursor-pointer lg:justify-center gap-2'>
            <img
              className='min-h-[35px] min-w-[70px] lg:w-[20vh]'
              src="/Icons/logo.svg"
              alt="Logo"
            />
          </Link>

          {/* Desktop Search */}
          <div className='hidden lg:flex-4 mr-20 lg:mr-0 lg:px-10 lg:block relative' ref={searchDropdownRef}>
            <div className="max-w-4xl self-center mx-auto">
              <div ref={searchRef} className="flex pl-2 rounded-lg items-center overflow-hidden shadow-sm hover:shadow-md border-1 border-[#dee2e6] bg-white">
                <Search className='p-[3px]'/>
                <input
                  type="text"
                  placeholder={t("searchProducts")}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  className="flex-1 py-2 px-3 text-base border-none outline-none placeholder-gray-400"
                />
                {searchQuery && (
                  <button 
                    onClick={handleClearSearch}
                    className="flex items-center pr-3 hover:opacity-70 transition-opacity"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Desktop Search Dropdown */}
              {searchOpen && (
                <div 
                  ref={dropdownRef}
                  style={{ width: searchWidth }} 
                  className="search-results-container absolute top-full mt-2 bg-white border border-[#dee2e6] rounded-lg shadow-lg z-50 overflow-hidden max-w-[95vw]"
                >         
                  {isSearching ? (
                    <div className="p-2 sm:p-4">
                      <h3 className="text-sm font-semibold text-gray-500 mb-3">{t('products').toUpperCase()}</h3>
                      <div className="grid grid-cols-2 [@media(min-width:1200px)]:grid-cols-3 [@media(min-width:1500px)]:grid-cols-4 gap-2 sm:gap-3">
                        {[...Array(4)].map((_, idx) => (
                          <SearchProductSkeletonDesktop key={idx} />
                        ))}
                      </div>
                    </div>
                  ) : searchResult && searchResult.length > 0 ? (
                    <div className="p-2 sm:p-4 overflow-y-auto w-full">
                      <h3 className="text-sm font-semibold text-gray-500 mb-3">
                        {t('products').toUpperCase()} ({searchResult.length})
                      </h3>
                      <div className="grid grid-cols-2 [@media(min-width:1200px)]:grid-cols-3 [@media(min-width:1500px)]:grid-cols-4 gap-2 sm:gap-3">
                        {searchResult.slice(0, 4).map(product => (
                          <div
                            key={product.id}
                            onClick={(e) => handleProductClick(e, product.id)}
                            onMouseDown={(e) => e.preventDefault()}
                            className="bg-white rounded-lg border border-[#dee2e6] p-2 sm:p-3 hover:shadow-md cursor-pointer transition-all group"
                          >
                            <div className="relative w-full aspect-square bg-white rounded-lg flex items-center justify-center mb-2 sm:mb-3 overflow-hidden">
                              <img 
                                src={`https://smartteamaz-001-site1.qtempurl.com${product.primaryImageUrl}`}
                                alt={product.name}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  e.target.src = '/Icons/logo.svg';
                                }}
                              />
                              {product.isHotDeal && (
                                <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-[#E60C03] text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                  Hot Deal
                                </div>
                              )}
                              {product.discountPercentage > 0 && (
                                <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-red-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-semibold">
                                  -{product.discountPercentage}%
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="text-gray-800 font-medium text-xs sm:text-sm mb-1 line-clamp-2 min-h-[32px] sm:min-h-[40px]">
                                {product.name}
                              </h4>
                              <p className="text-gray-400 text-[10px] sm:text-xs mb-1 sm:mb-2 truncate">
                                {product.categoryName?.replace(/-/g, ' ')}
                              </p>
                              <div className="flex items-center gap-1 sm:gap-2">
                                <span className="text-[#E60C03] font-bold text-sm sm:text-base">
                                  ${product.currentPrice.toLocaleString()}
                                </span>
                                {product.discountPercentage > 0 && (
                                  <span className="text-gray-400 text-[10px] sm:text-xs line-through">
                                    ${product.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {searchResult.length > 4 && (
                        <button
                          onClick={handleViewAllClick}
                          className="block w-full cursor-pointer text-center mt-3 sm:mt-4 py-2 text-[#E60C03] hover:text-red-700 font-medium text-xs sm:text-sm transition-colors"
                        >
                          View all {searchResult.length} results →
                        </button>
                      )}
                    </div>
                  ) : searchQuery.length >= 2 ? (
                    <div className="p-8 sm:p-12 text-center">
                      <Search className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-600 font-medium mb-1 text-sm sm:text-base">No results found</p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Try searching with different keywords
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Profile / Favorites / Cart */}
          <div className='flex gap-5 lg:gap-5 lg:flex-1 '>
            <div className='lg:hidden relative' ref={mobileSearchDropdownRef}>
              <button 
                className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
              >
              </button>
            </div>

            <Link
              to={hasToken ? "/favorites" : "/login"}
              className='flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity duration-200 relative'
            >
              <div className="relative">
                <img className='w-7' src="/Icons/favorites.svg" alt="Favorites" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#E60C03] text-white text-[10px] 
                                   rounded-full min-w-[18px] h-[18px] flex items-center justify-center 
                                   font-semibold px-1">
                    {favoritesCount > 99 ? '99+' : favoritesCount}
                  </span>
                )}
              </div>
              <p className='text-gray-500 text-md hidden lg:block whitespace-nowrap'>
                {t('favorites')}
              </p>
            </Link>

            <Link
              to={hasToken ? "/cart" : "/login"}
              className='flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity duration-200 relative'
            >
              <div className="relative">
                <img className='w-7' src="/Icons/cart.svg" alt="Cart" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#E60C03] text-white text-[10px] 
                                   rounded-full min-w-[18px] h-[18px] flex items-center justify-center 
                                   font-semibold px-1">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <p className='text-gray-500 text-md hidden lg:block whitespace-nowrap'>
                {t('myCart')}
              </p>
            </Link>
            
            <Link
              to={hasToken ? "/profile" : "/login"}
              className='flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity duration-200'
            >
              {isMeLoading ? (
                <div className='flex flex-col items-center gap-1'>
                  <div className='w-7 h-7 rounded-full bg-gray-200 animate-pulse'></div>
                  <div className='w-16 h-3 bg-gray-200 rounded hidden lg:block animate-pulse'></div>
                </div>
              ) : hasToken ? (
                <div className='flex flex-col items-center gap-1'>
                  <FaUserCircle color='#64748b' size={28} />
                  <p className='text-gray-600 text-sm font-medium hidden lg:block whitespace-nowrap max-w-[100px] truncate'>
                    {me.fullName}
                  </p>
                </div>
              ) : (
                <>
                  <img className='w-7' src="/Icons/profile.svg" alt="Profile" />
                  <p className='text-gray-500 hidden lg:block text-md whitespace-nowrap'>
                    {t('login')}
                  </p>
                </>
              )}
            </Link>

            <img
              onClick={() => setBurgerVi(true)}
              className='md:hidden cursor-pointer'
              src="/Icons/burger.svg"
              alt="Menu"
            />
          </div>
        </div>
      </nav>

      {/* Bottom Menu */}
      <div className="hidden md:block w-full bg-white border-gray-200 px-2 py-4">
        <div className="flex items-center justify-between max-w-[85vw] mx-auto">
          <div className="flex items-center space-x-8">
            {/* Navigation Links */}
            <nav className="flex items-center space-x-6 lg:space-x-8">
              <Link to='/' className="text-gray-700 inter text-sm lg:text-base hover:text-gray-900 transition-colors duration-200">
                {t('home')}
              </Link>
                          
              <Link to='/about' className="text-gray-700 inter text-sm lg:text-base hover:text-gray-900 transition-colors duration-200">
                {t('about')}
              </Link>
                          
              <Link to='/download' className="text-gray-700 inter text-sm lg:text-base hover:text-gray-900 transition-colors duration-200">
                {t('download')}
              </Link>
                          
              <Link to='/contact' className="text-gray-700 inter text-sm lg:text-base hover:text-gray-900 transition-colors duration-200">
                {t('contact')}
              </Link>

              <Link to='/brands' className="text-gray-700 inter text-sm lg:text-base hover:text-gray-900 transition-colors duration-200">
                Brands
              </Link>
            </nav>
          </div>

          {/* Language & Phone */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center justify-center p-2">
              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setOpen(prev => !prev)}
                  className="flex items-center space-x-1 cursor-pointer hover:opacity-80 transition-opacity duration-200"
                >
                  <span className="text-gray-700 inter text-sm lg:text-base">{langName[selected]}</span>
                  <svg 
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>

                {open && (
                  <div className="absolute top-full mt-1 right-0 bg-white border-[1px] border-black rounded-sm py-1 whitespace-nowrap z-10 shadow-lg">
                    {languages.map((language) => (
                      <div
                        key={language.value}
                        onClick={() => handleSelect(language.value)}
                        className={`px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-150 text-sm lg:text-base ${
                          selected === language.value ? 'bg-gray-50 font-medium' : ''
                        }`}
                      >
                        {language.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="items-center space-x-2 cursor-pointer [@media(max-width:870px)]:hidden flex hover:opacity-80 transition-opacity duration-200">
              <img src="/Icons/phone.svg" alt="phone" className="w-4 h-4" />
              <span className="text-gray-700 inter text-sm lg:text-base">
                +994 055 674 06 49
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header