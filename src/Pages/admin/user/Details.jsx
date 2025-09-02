import React from 'react';
import { Heart, Download, Share2, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

function Details() {
  const thumbnails = [
    '/laptop-thumb1.jpg',
    '/laptop-thumb2.jpg', 
    '/laptop-thumb3.jpg',
    '/laptop-thumb4.jpg'
  ];

  const specifications = [
    '16GB RAM',
    'Intel® Core™ i7',
    'Gray'
  ];

  const additionalSpecs = [
    'Gray',
    'Gray', 
    'Intel® Core™ i7'
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
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      name: 'Pos Komputer',
      description: 'Description',
      price: '680 AZN',
      image: 'https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      name: 'Pos Komputer',
      description: 'Description',
      price: '680 AZN',
      image: 'https://images.pexels.com/photos/4498479/pexels-photo-4498479.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 4,
      name: 'Pos Komputer',
      description: 'Description',
      price: '680 AZN',
      image: 'https://images.pexels.com/photos/4498318/pexels-photo-4498318.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="bg-white">
          {/* Header */}
          <div className="px-4 py-3">
            <div className="flex items-center text-red-500 text-sm font-medium mb-2">
              <span className="mr-1">×</span>
              <span>No stock</span>
            </div>
            <div className="flex items-center ">
              <h1 className="text-lg font-semibold text-gray-900">Laptop name</h1>
              
            </div>
          </div>

          {/* Main Image */}
          <div className="relative px-4 mb-4 flex w-full justify-center">
            
            <div className='self-center w-full'>
              <img 
              src="./deals/productImageExample.svg"
              alt="Laptop"
              className=" h-64 mx-auto self-center rounded-lg"
            />
            </div>
            

            <div className="absolute top-10 right-4 flex flex-col  gap-3 space-x-2 ">
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

          {/* Thumbnails */}
          <div className="px-4 mb-6 ">
            <div className="flex space-x-2 justify-center">
              {[1,2,3,4].map((item, index) => (
                <div key={item} className={`w-16 h-16 rounded-lg border-2 ${index === 0 ? 'border-orange-400' : 'border-gray-200'} overflow-hidden`}>
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="px-4 mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {specifications.map((spec, index) => (
                <span key={index} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                  {spec}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {additionalSpecs.map((spec, index) => (
                <span key={index} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* WhatsApp Button */}
          <div className="px-4 mb-6">
            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium">
              Get Information via WhatsApp
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white mt-4">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Features</h2>
              <span className="text-red-500 text-sm font-medium">More</span>
            </div>
            <div className="space-y-3">
              {features.slice(0, 5).map((feature, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{feature.label}</span>
                  <span className="text-gray-900 font-medium">{feature.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="bg-white mt-4">
          <div className="px-4 py-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Similar Products</h2>
            <div className="space-y-4">
              {similarProducts.slice(0, 2).map((product) => (
                <div key={product.id} className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-red-500 rounded-lg overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-gray-500 text-sm">{product.description}</p>
                    <p className="text-red-500 font-semibold">{product.price}</p>
                  </div>
                  <button className="p-1">
                    <Heart className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <img 
                src="https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Laptop"
                className="w-full h-80 object-cover rounded-lg"
              />
              
              {/* Thumbnails */}
              <div className="flex space-x-2 mt-4">
                {[1,2,3,4].map((item, index) => (
                  <div key={item} className={`w-16 h-16 rounded-lg border-2 ${index === 0 ? 'border-orange-400' : 'border-gray-200'} overflow-hidden`}>
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              {/* Header */}
              <div className="flex items-center text-red-500 text-sm font-medium mb-3">
                <span className="mr-1">×</span>
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
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {specifications.map((spec, index) => (
                    <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {additionalSpecs.map((spec, index) => (
                    <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center space-x-4 mb-6">
                <button className="p-2 border border-gray-300 rounded-lg">
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="text-lg font-medium">1</span>
                <button className="p-2 border border-gray-300 rounded-lg">
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* WhatsApp Button */}
              <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium">
                Get Information via WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Features</h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{feature.label}</span>
                <span className="text-gray-900 font-medium">{feature.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Similar Products</h2>
            <div className="flex space-x-2">
              <button className="p-2 border border-gray-300 rounded-lg">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 bg-red-100 border border-red-300 rounded-lg">
                <ChevronRight className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {similarProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg p-4 space-y-3">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg" />
                  <button className="absolute top-2 right-2 p-1">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">{product.price}</p>
                  <h3 className="font-medium text-gray-700">{product.name}</h3>
                </div>
                <button className="w-full bg-red-500 text-white py-2 rounded-lg text-sm font-medium">
                  Add to the cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;