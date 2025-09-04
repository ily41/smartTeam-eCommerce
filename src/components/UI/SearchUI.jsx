import React, { useState } from 'react'
import { Search, X } from 'lucide-react';

const SearchUI = () => {

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e) => {
      e.preventDefault();
      if (searchValue.trim()) {
        console.log('Searching for:', searchValue);
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
              <div className={`relative rounded-lg  `}
               >
                <Search 
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 `} 
                  size={20} 
                />
                
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`w-full pl-11 pr-12 py-2 bg-white border rounded-lg  focus:outline-none placeholder:text-gray-400 text-gray-700 text-base `}
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