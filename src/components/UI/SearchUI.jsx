import React, { useState } from 'react'
import { Search, X } from 'lucide-react';

const SearchUI = () => {

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
    <div className=" pb-0 rounded-lg lg:hidden bg-[#f7fafc] border-t-1 border-t-[#DEE2E6] ">
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
                  className={`w-full pl-11 pr-12 py-2 bg-white border rounded-lg 
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
  )
}

export default SearchUI