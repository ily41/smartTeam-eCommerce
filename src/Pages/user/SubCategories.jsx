import React from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

// Mock Breadcrumb component
const Breadcrumb = () => (
  <nav className="flex items-center space-x-2 text-gray-600 mb-6">
    <span className="text-gray-500">Home</span>
    <ChevronRight className="w-4 h-4 text-gray-400" />
    <span className="text-gray-900 font-medium">Commercial Equipment</span>
  </nav>
);

const CategoryCard = ({ title, imageSrc = null }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer group">
    <div className="flex flex-col items-center text-center h-full">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-50 transition-colors">
        {imageSrc ? (
          <img src={imageSrc} alt={title} className="w-full h-full object-contain rounded-lg" />
        ) : (
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-200 rounded-md"></div>
        )}
      </div>
      <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
    </div>
  </div>
);

const SubCategories = () => {
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

  const categories = [
    { title: "POS Computers", imageSrc: "./deals/categorieExample.svg" },
    { title: "Receipt Printers", imageSrc: "./deals/categorieExample.svg" },
    { title: "Barcode Printers", imageSrc: "./deals/categorieExample.svg" },
    { title: "Mini Printers", imageSrc: "./deals/categorieExample.svg" },
    { title: "Barcode Scanners", imageSrc: "./deals/categorieExample.svg" },
    { title: "Scales", imageSrc: "./deals/categorieExample.svg" },
    { title: "Cash Drawers", imageSrc: "./deals/categorieExample.svg" },
    { title: "Receipt&Barcode Paper", imageSrc: "./deals/categorieExample.svg" }
  ];

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        <div className="hidden md:block">
          <Breadcrumb />
        </div>
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Commercial Equipment
          </h1>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index} 
              title={category.title} 
              imageSrc={category.imageSrc}
            />
          ))}
        </div>

        <div className="md:hidden mt-4">
          <div className="px-4 py-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Similar Products</h2>
            <div className="overflow-x-scroll scrollbar-hide flex gap-3 rounded-lg p-3">
              {similarProducts.slice(0, 2).map((product) => (
                <div key={product.id} className="flex items-center  min-w-[80%] p-2 bg-white  rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
                  <div className="h-38">
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

        <div className="mt-8 hidden md:block">
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
        
    </section>
  );
};

export default SubCategories;