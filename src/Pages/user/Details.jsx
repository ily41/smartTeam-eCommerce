import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/pagination';
import { Heart, Download, Share2, Minus, Plus, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Breadcrumb } from '../../products/Breadcrumb';
import SearchUI from '../../components/UI/SearchUI';

function Details() {
  const thumbnails = [
    '/laptop-thumb1.jpg',
    '/laptop-thumb2.jpg', 
    '/laptop-thumb3.jpg',
    '/laptop-thumb4.jpg'
  ];

  const specifications = [
    '16GB RAM',
    'Gray',
    'Intel® Core™ i7',
    'Gray',
    'Intel® Core™ i7',
    'Gray', 
  ];

  

  const features = [
    { label: 'Brand', value: 'Asus' },
    { label: 'Brand', value: 'Asus' },
    { label: 'Brand', value: 'Asus' },
    { label: 'Brand', value: 'Asus' },
    { label: 'Brand', value: 'Asus' },
    { label: 'Brand', value: 'Asus' },
    { label: 'Brand', value: 'Asus' },
    { label: 'Brand', value: 'Asus' },
    { label: 'Brand', value: 'Asus' },
    { label: 'Brand', value: 'Asus' },
    { label: 'Brand', value: 'Asus' },
    { label: 'Brand', value: 'Asus' }
  ];

  const similarProducts = [
    {
      id: 1,
      name: 'Pos Komputer',
      description: 'Description',
      price: '680 AZN',
      image: './deals/productImageExample.svg'
    },
    {
      id: 1,
      name: 'Pos Komputer',
      description: 'Description',
      price: '680 AZN',
      image: './deals/productImageExample.svg'
    },
    {
      id: 1,
      name: 'Pos Komputer',
      description: 'Description',
      price: '680 AZN',
      image: './deals/productImageExample.svg'
    },
    {
      id: 2,
      name: 'Pos Komputer',
      description: 'Description',
      price: '680 AZN',
      image: './deals/productImageExample.svg'
    },
    {
      id: 3,
      name: 'Pos Komputer',
      description: 'Description',
      price: '680 AZN',
      image: './deals/productImageExample.svg'
    },
    {
      id: 4,
      name: 'Pos Komputer',
      description: 'Description',
      price: '680 AZN',
      image: './deals/productImageExample.svg'
    }
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <>
      <div className='p-6 py-4  border-y-1 border-[#DEE2E6] sm:hidden flex flex-col gap-5'>
        <SearchUI />
        <Breadcrumb />
        
      </div>
      <div className="min-h-screen bg-gray-50 pt-8 sm:pt-0">
      {/* Mobile Layout */}
      <div className="md:hidden ">
        <div className=" bg-white border-y-1 border-[#DEE2E6]">
          {/* Header */}
          <div className="px-7 py-3">
            <div className="flex items-center text-red-500 text-lg font-medium mb-2 inter">
              <X className='w-[20px]'></X>
              <span>No stock</span>
            </div>
            <div className="flex items-center ">
              <h1 className="text-xl  text-gray-900 inter">Laptop name</h1>
              
            </div>
          </div>

          {/* Main Image */}
          <div className="relative px-4 mb-4 flex w-full justify-center">
            <div className='self-center w-full'>
              <Swiper
                pagination={false} // Disable default pagination
                autoplay={{ delay: 3000, disableOnInteraction: false }} 
                modules={[Pagination, Autoplay]} 
                className="mySwiper"
                onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                onSwiper={setSwiperRef}
              >
                <SwiperSlide className='relative h-64 py-5 pt-8 rounded-lg'>
                  <img 
                    src='./deals/product.avif'
                    alt='name'
                    className=" h-48 object-contain mx-auto rounded-lg" 
                  />
                </SwiperSlide>
                <SwiperSlide className='relative h-64 py-5 pt-8 rounded-lg'>
                  <img 
                    src='./deals/product.avif'
                    alt='name'
                    className=" h-48 object-contain mx-auto rounded-lg" 
                  />
                </SwiperSlide>
                <SwiperSlide className='relative h-64 py-5 pt-8 rounded-lg'>
                  <img 
                    src='./deals/product.avif'
                    alt='name'
                    className=" h-48 object-contain mx-auto rounded-lg" 
                  />
                </SwiperSlide>
              </Swiper>
            </div>

            <div className="absolute top-10 right-6 flex flex-col gap-3">
              <button className="p-2 bg-gray-100 rounded-lg">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg">
                <Download className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          {/* Thumbnails as Navigation */}
          <div className="px-4 pb-6 bg-white">
            <div className="flex space-x-2 justify-center">
              {[1,2,3].map((item, index) => (
                <button 
                  key={item} 
                  className={`w-16 h-16 rounded-lg border-2 ${activeSlide === index ? 'border-red-500' : 'border-gray-200'} overflow-hidden`}
                  onClick={() => swiperRef?.slideTo(index)}
                >
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                  </div>
                </button>
              ))}
            </div>

          </div>

          
          
        </div>
        

          {/* Specifications */}
          <div className="p-4 mt-6 border-[#DEE2E6] border-y-1 border-b-0 bg-white">
            <div className="flex flex-wrap gap-2 mb-4">
              {specifications.map((spec, index) => (
                <span key={index} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium inter">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* WhatsApp Button */}
          <div className="p-4 mb-6 border-y-1 border-[#DEE2E6] bg-white w-full h-full">
            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium">
              Get Information via WhatsApp
            </button>
          </div>

          {/* Features */}
          <div className="bg-white border-y-1 border-[#DEE2E6] mt-4 helveticaNow">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-4 px-2 inter">
                <h2 className="text-lg font-semibold text-gray-900 ">Features</h2>
                <span className="text-red-500 text-sm font-medium">More</span>
              </div>
              <div className="space-y-3">
                {features.slice(0, 5).map((feature, index) => (
                  <div key={index}>
                    <div className="flex justify-between px-3 items-center inter">
                      <span className="text-[#858a92]">{feature.label}</span>
                      <span className="text-gray-900 ">{feature.value}</span>
                    </div>
                    {/* Add hr between items, except after the last one */}
                    {index < features.slice(0, 5).length - 1 && (
                      <hr className="my-2 mx-2 border-gray-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        {/* Similar Products */}
        <div className=" mt-4">
          <div className="px-4 py-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Similar Products</h2>
            <div className="overflow-x-scroll scrollbar-hide flex gap-3 rounded-lg p-3">
              {similarProducts.slice(0, 2).map((product) => (
                <div key={product.id} className="flex items-center space-x-3 min-w-[70%] p-2 bg-white  rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
                  <div className="  h-28  overflow-hidden">
                    <img src='./deals/product.avif' alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col self-start mt-2">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                    <p className="text-red-500 font-semibold">{product.price}</p>
                  </div>
                  <button className="p-1 m-1 self-start border-1 border-[#DEE2E6] rounded-lg">
                    <Heart className="w-4 h-4  text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 pb-8">
        <div className='py-4 pb-8'>
          <Breadcrumb />
        
        </div>
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4 w-full ">
            <div className="bg-white rounded-lg p-4 w-full flex flex-col items-center py-9 sm:border-1 sm:border-[#DEE2E6]">
              <div className='w-fit'>
                <img 
                  src="./deals/productImageExample.svg"
                  alt="Laptop"
                  className=" h-80 object-cover rounded-lg"
                />
              </div>
              
              {/* Thumbnails */}
              <div className="flex space-x-2 mt-4">
                {[1,2,3,4].map((item, index) => (
                  <div key={item} className={`w-16 h-16 rounded-lg border-2 ${index === 0 ? 'border-red-500' : 'border-gray-200'} overflow-hidden`}>
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6 h-full">
            <div className="bg-white rounded-lg p-10 h-full sm:border-1 sm:border-[#DEE2E6]">
              {/* Header */}
              <div className="flex items-center text-red-500 text-lg font-medium mb-3 inter">
                <X className='w-[20px]'></X>
                <span>No stock</span>
              </div>
              
              <div className="flex items-start justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Laptop name</h1>
                <div className="flex space-x-2">
                  <button className="p-2 bg-gray-100 rounded-lg">
                    <Download className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-6 mt-8">
                <div className="flex flex-wrap gap-2 mb-3">
                  {specifications.map((spec, index) => (
                    <span key={index} className="px-4 py-2 border-1 border-[#DEE2E6]  text-gray-700 rounded-lg text-sm font-semibold inter">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6 mt-12">
                <button className="p-2 border border-transparent hover:border-gray-300  hover:bg-white cursor-pointer bg-[#ebebeb] rounded-full">
                  <Minus className="w-4 h-4 text-[#6C6C6C]" />
                </button>
                <span className="text-2xl self-center font-medium text-[#6C6C6C] text-center inter">1</span>
                <button className="p-2  border border-transparent hover:border-gray-300  hover:bg-white cursor-pointer bg-[#ebebeb] rounded-full">
                  <Plus className="w-4 h-4 text-[#6C6C6C]" />
                </button>
              </div>

              {/* WhatsApp Button */}
              <button className="w-full bg-green-500 text-white py-3 mt-6 rounded-lg font-medium">
                Get Information via WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg p-6 mt-8 sm:border-1 sm:border-[#DEE2E6]">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Features</h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            {features.map((feature, index) => (
              <div key={index}>
                <div className="flex justify-between items-center inter mx-2">
                  <span className="text-gray-600">{feature.label}</span>
                  <span className="text-gray-900 font-medium">{feature.value}</span>
                </div>
                  <hr className="my-2 border-gray-300" />
                
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-900">Similar Products</h2>
            <div className="flex space-x-2">
              <button className="p-2 cursor-pointer hover:bg-red-100 hover:border-red-300 border border-gray-300 rounded-full">
                <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-red-600" />
              </button>
              <button className="p-2 cursor-pointer hover:bg-red-100 hover:border-red-300 border border-gray-300 rounded-full">
                <ChevronRight className="w-5 h-5 text-gray-600 hover:text-red-600" />
              </button>
              
            </div>
          </div>
          
          <div className="flex overflow-x-scroll gap-4 py-2">
            {similarProducts.map((product) => (
              <div key={product.id} className=" bg-white rounded-lg p-4 border border-[#DEE2E6] min-w-[200px] flex-shrink-0 space-y-3">
                <div className="py-4 ">
                  <img 
                    src='./deals/product.avif'
                    alt='name'
                    className=" h-48 object-contain mx-10 rounded-lg" 
                  />
                </div>
                
                <div className='flex justify-between'>
                  <div>
                    <h3 className="font-medium text-gray-700 mb-1">{product.name}</h3>
                    <p className="text-lg font-semibold text-gray-900">{product.price}</p>
                  </div>
                  <button className="top-2 right-2 self-start p-2 border border-[#DEE2E6] bg-white rounded-lg shadow-sm">
                    <Heart className="w-5 h-5 text-red-400" />
                  </button>

                </div>
                <button className="w-full bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            ))}
            
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Details;