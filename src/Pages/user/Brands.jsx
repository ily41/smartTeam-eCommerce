import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

const Brands = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('All');

  // Brand data with logos
  const brands = [
    { name: 'LG', logo: './slider/slider1.svg', products: 245 },
    { name: 'Dell', logo: './slider/slider2.svg', products: 189 },
    { name: 'Oppo', logo: './slider/slider4.svg', products: 156 },
    { name: 'Asus', logo: './slider/slider5.svg', products: 312 },
    { name: 'Samsung', logo: './slider/slider6.svg', products: 428 },
    { name: 'HP', logo: './slider/slider7.svg', products: 267 },
    { name: 'Lenovo', logo: './slider/slider8.svg', products: 198 },
    { name: 'Apple', logo: './slider/slider9.svg', products: 134 },
    { name: 'Acer', logo: './slider/slider10.svg', products: 176 },
    { name: 'Sony', logo: './slider/slider11.svg', products: 203 },
    { name: 'Microsoft', logo: './slider/slider12.svg', products: 142 },
    { name: 'Canon', logo: './slider/slider1.svg', products: 98 },
    { name: 'Epson', logo: './slider/slider2.svg', products: 87 },
    { name: 'Xiaomi', logo: './slider/slider3.svg', products: 234 },
    { name: 'Huawei', logo: './slider/slider4.svg', products: 165 },
    { name: 'Intel', logo: './slider/slider5.svg', products: 78 },
    { name: 'AMD', logo: './slider/slider6.svg', products: 92 },
    { name: 'Logitech', logo: './slider/slider7.svg', products: 156 },
    { name: 'TP-Link', logo: './slider/slider8.svg', products: 123 },
    { name: 'Cisco', logo: './slider/slider9.svg', products: 89 },
  ];

  // Generate alphabet for filter
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Filter brands based on search and selected letter
  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLetter = selectedLetter === 'All' || brand.name.startsWith(selectedLetter);
    return matchesSearch && matchesLetter;
  });

  return (
    <section className='bg-[#F7FAFC] min-h-screen inter'>
      {/* Hero Section */}
      <div className='bg-white border-b border-[#dee2e6]'>
        <div className='max-w-[90vw] mx-auto py-12 md:py-16'>
          <h1 className='text-3xl md:text-4xl font-bold text-center mb-4'>
            Explore Our Brands
          </h1>
          <p className='text-center text-[#505050] max-w-2xl mx-auto'>
            Discover premium technology brands. From computers to electronics, find trusted manufacturers for all your needs.
          </p>
        </div>
      </div>

      <div className='max-w-[90vw] mx-auto py-8'>
        {/* Search Bar */}
        <div className='bg-white rounded-lg border border-[#dee2e6] p-4 mb-6'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
            <input
              type='text'
              placeholder='Search brands...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-4 py-3 border border-[#dee2e6] rounded-lg focus:outline-none focus:border-[#E60C03] transition-colors'
            />
          </div>
        </div>

        {/* Alphabet Filter */}
        <div className='bg-white rounded-lg border border-[#dee2e6] p-4 mb-8 overflow-x-auto'>
          <div className='flex gap-2 min-w-max'>
            <button
              onClick={() => setSelectedLetter('All')}
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                selectedLetter === 'All'
                  ? 'bg-[#E60C03] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  selectedLetter === letter
                    ? 'bg-[#E60C03] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Brands Count */}
        <div className='mb-6'>
          <p className='text-[#505050]'>
            Showing <span className='font-semibold text-black'>{filteredBrands.length}</span> brands
          </p>
        </div>

        {/* Brands Grid */}
        {filteredBrands.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {filteredBrands.map((brand, index) => (
              <Link
                key={index}
                to={`/products?brand=${brand.name.toLowerCase()}`}
                className='group bg-white rounded-lg border-2 border-[#dee2e6] p-6 hover:border-[#E60C03] hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
              >
                <div className='flex flex-col items-center'>
                  {/* Brand Logo */}
                  <div className='w-full h-24 flex items-center justify-center mb-4'>
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className='max-w-full max-h-full object-contain'
                    />
                  </div>

                  {/* Brand Name */}
                  <h3 className='text-lg font-semibold text-center mb-2 group-hover:text-[#E60C03] transition-colors'>
                    {brand.name}
                  </h3>

                  {/* Product Count */}
                  <p className='text-sm text-[#505050] text-center mb-3'>
                    {brand.products} products
                  </p>

                  {/* View Button */}
                  <div className='flex items-center gap-2 text-[#E60C03] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity'>
                    View Products
                    <ChevronRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className='bg-white rounded-lg border border-[#dee2e6] p-12 text-center'>
            <img
              src='./Icons/banner-commercial.svg'
              alt='No results'
              className='w-24 h-24 mx-auto mb-4 opacity-50'
            />
            <h3 className='text-xl font-semibold mb-2'>No brands found</h3>
            <p className='text-[#505050]'>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Featured Brands Section */}
        <div className='mt-16'>
          <h2 className='text-2xl font-bold mb-6'>Featured Brands</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {brands.slice(0, 3).map((brand, index) => (
              <Link
                key={index}
                to={`/products?brand=${brand.name.toLowerCase()}`}
                className='group bg-white rounded-lg border-2 border-[#dee2e6] overflow-hidden hover:border-[#E60C03] hover:shadow-lg transition-all duration-300'
              >
                <div className='h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8'>
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className='max-w-full max-h-full object-contain'
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-semibold mb-2 group-hover:text-[#E60C03] transition-colors'>
                    {brand.name}
                  </h3>
                  <p className='text-[#505050] mb-4'>
                    Explore {brand.products} quality products from {brand.name}
                  </p>
                  <div className='flex items-center gap-2 text-[#E60C03] font-medium'>
                    Shop Now
                    <ChevronRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;