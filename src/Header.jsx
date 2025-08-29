import React, { useState } from 'react'
import { Search, X } from 'lucide-react';

const Header = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = (e) => {
      e.preventDefault();
      if (searchValue.trim()) {
        console.log('Searching for:', searchValue);
        // Here you would typically call your search API or function
        alert(`Searching for: ${searchValue}`);
      }
    };

    const clearSearch = () => {
      setSearchValue('');
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSearch(e);
      }
      if (e.key === 'Escape') {
        clearSearch();
        e.target.blur();
      }
    };
  return (
    <header>
        <nav >
            <div className='flex justify-between lg:justify-around p-6 items-center'>
                <div className='flex gap-2'>
                    <img className='lg:hidden' src="./Icons/burger.svg" alt="" />
                    <img className=' min-w-[100px] max-w-[230px] w-[13vh] lg:w-[20vh] ' src="./Icons/logo.svg" alt="" />

                </div>

                <div className='hidden lg:block'>
                    <div className="max-w-4xl mx-auto">
                      <div className="flex bg-white border-2 border-black rounded-lg overflow-hidden shadow-sm hover:shadow-md ">
                        <input 
                          type="text" 
                          placeholder="Search" 
                          className="flex-1 px-5 py-2 text-base border-none outline-none placeholder-gray-400"
                        />
                        <div className="relative border-x-2 border-black">
                          <button className="flex items-center px-5 py-2  hover:bg-gray-50 transition-colors duration-200 text-base whitespace-nowrap">
                            <span>All category</span>
                            <svg className="ml-3 w-4 h-4 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        <button className="px-8 py-2 bg-black text-white font-medium hover:bg-gray-800 active:translate-y-0.5 transition-all duration-150">
                          Search
                        </button>
                      </div>
                    </div>
                </div>

                
                <div className='flex gap-3 pr-2 flex-shrink-0 lg:hidden'>
                  <div className='flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                    <img className='scale-[1.1]' src="./Icons/profile.svg" alt="" />
                  </div>
                  <div className='flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                    <img className='scale-[1.1]' src="./Icons/favorites.svg" alt="" />
                  </div>
                  <div className='flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                    <img className='scale-[1.1]' src="./Icons/cart.svg" alt="" />
                  </div>
                </div>


                <div className='hidden lg:flex gap-0 lg:gap-5 pr-2 '>
                    <div className='flex flex-col gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                        <img src="./Icons/profile-gray.svg" alt="" />
                        <p className='text-gray-500 text-md'>Profile</p>
                    </div>

                    <div className='flex flex-col gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                        <img src="./Icons/favorites-gray.svg" alt="" />
                        <p className='text-gray-500 text-md'>Favorites</p>
                    </div>

                    <div className='flex flex-col gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                        <img src="./Icons/cart-gray.svg" alt="" />
                        <p className='text-gray-500 text-md'>My Cart</p>
                    </div>
                    
                </div>
            </div>


             <div className="p-6  rounded-lg lg:hidden  ">
              <div className=" rounded-lg  mx-auto">
                <div className="relative rounded-lg ">
                  <div className={`relative rounded-lg  transition-all duration-200 ${
                    isFocused ? 'transform scale-105 shadow-lg' : 'shadow-md'
                  }`}>
                    <Search 
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                        isFocused ? 'text-blue-500' : 'text-gray-400'
                      }`} 
                      size={20} 
                    />
                    
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onKeyDown={handleKeyDown}
                      className={`w-full pl-11 pr-12 py-3 bg-white border rounded-lg 
                        placeholder:text-gray-400 text-gray-700 text-base
                        transition-all duration-200 outline-none
                        ${isFocused 
                          ? 'border-blue-500 ring-2 ring-blue-100' 
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                      placeholder="Search"
                    />

                    {searchValue && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 
                          p-1 rounded-full hover:bg-gray-100 transition-colors duration-200
                          text-gray-400 hover:text-gray-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            
        </nav>

        <div className='flex p-3 overflow-x-auto gap-2 text-center scrollbar-hide lg:hidden'>
            <div className='min-w-[20%] w-fit flex-shrink-0 whitespace-nowrap bg-gray-200 p-2 rounded-lg font-normal transition-all duration-200 hover:bg-gray-300 cursor-pointer'>
                <span className='inter'>Hello bextiyar</span>
            </div>
            <div className='min-w-[20%] w-fit flex-shrink-0 whitespace-nowrap bg-gray-200 p-2 rounded-lg font-normal transition-all duration-200 hover:bg-gray-300 cursor-pointer'>
                <span className='inter'>All categories</span>
            </div>
            <div className='min-w-[20%] w-fit flex-shrink-0 whitespace-nowrap bg-gray-200 p-2 rounded-lg font-normal transition-all duration-200 hover:bg-gray-300 cursor-pointer'>
                <span className='inter'>Technology</span>
            </div>
            <div className='min-w-[20%] w-fit flex-shrink-0 whitespace-nowrap bg-gray-200 p-2 rounded-lg font-normal transition-all duration-200 hover:bg-gray-300 cursor-pointer'>
                <span className='inter'>Sports</span>
            </div>
        </div>

        <div className="hidden lg:block w-full bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-around">
                    
            {/* Left Section - Menu and Navigation */}
            <div className="flex items-center space-x-8">
              {/* Menu Icon */}
              <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200">
                <div className="flex flex-col space-y-1">
                  <div className="w-4 h-0.5 bg-gray-600"></div>
                  <div className="w-4 h-0.5 bg-gray-600"></div>
                  <div className="w-4 h-0.5 bg-gray-600"></div>
                </div>
                <span className="text-gray-600 inter">All category</span>
              </div>
                    
              {/* Navigation Links */}
              <nav className="flex items-center space-x-8">
                <a href="#" className="text-gray-700 inter cursor-pointer hover:text-gray-900 transition-colors duration-200">Home</a>
                <a href="#" className="text-gray-700 inter cursor-pointer hover:text-gray-900 transition-colors duration-200">About Us</a>
                <a href="#" className="text-gray-700 inter cursor-pointer hover:text-gray-900 transition-colors duration-200">Download Program</a>
                <a href="#" className="text-gray-700 inter cursor-pointer hover:text-gray-900 transition-colors duration-200">Contact</a>
              </nav>
            </div>
                    
            {/* Right Section - Language and Phone */}
            <div className="flex items-center space-x-6">
              {/* Language Dropdown */}
              <div className="flex items-center space-x-1 cursor-pointer hover:opacity-80 transition-opacity duration-200">
                <span className="text-gray-700 inter">English</span>
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
                    
              {/* Phone Number */}
              <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200">
                <img src="./Icons/phone.svg" alt="phone" className="w-4 h-4" />
                <span className="text-gray-700 inter">+994 50 xxx xx xx</span>
              </div>
            </div>
          </div>
        </div>


    </header>
  )
}

export default Header