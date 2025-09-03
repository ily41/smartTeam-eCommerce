import React, { useEffect, useState } from 'react';
import { Grid, List } from 'lucide-react';
import { Breadcrumb } from '../../products/Breadcrumb'
import SearchUI from '../../components/UI/SearchUI';
import { FilterSidebar } from '../../products/FilterSidebar';
import { MobileFilterButtons } from '../../products/MobileFilters';
import { ActiveFilters } from '../../products/ActiveFilters';
import { ProductCard } from '../../products/ProductCard';
import { Pagination } from '../../products/Pagination';



function Products() {

  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); 
  const [template, setTemplate] = useState(isMobile ? "cols" : "rows"); // give both cases

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
  

  return (
    <div className="min-h-screen bg-[#f7fafc] inter ">
      <div className='lg:hidden px-4 py-4 border-y-1 border-[#dee2e6] bg-white'>
            <div className='mb-4'>
                <SearchUI />
            </div>
            <Breadcrumb />
            
      </div>
      <div className='lg:hidden bg-white px-4 py-4'>
        <h1 className="text-2xl font-medium text-gray-900">Office Laptops (25)</h1>
      </div>
       
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 ">
        <div className='hidden lg:block lg:pl-4'>
            <Breadcrumb />
        </div>
        

        <div className="lg:flex lg:gap-8 lg:mt-5">

          <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <FilterSidebar />
          </div>

          <div className="flex-1">
            <MobileFilterButtons />

            <div className="hidden lg:flex items-center justify-between bg-white p-3 rounded-lg border-[#dee2e6] border-1">
              <span className="text-sm text-gray-600">12,911 items in <span className='font-semibold'>Office Laptops</span></span>

              <div className="hidden lg:flex items-center space-x-4">
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                  <option>Sort by</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <button onClick = {() => setTemplate("cols")} className={`p-2 ${template == "cols" ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}  cursor-pointer`}>
                    <Grid  className="w-4 h-4 " />
                  </button>

                  <button onClick = {() => setTemplate("rows")} className={`p-2 ${template == "cols" ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}  cursor-pointer`}>
                    <List  className="w-4 h-4 " />
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <ActiveFilters />
            </div>

              <div className={`${template == "cols" ? 'grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6' : 'flex flex-col gap-4'}`}>
                <ProductCard col={template === "cols" ? true : false}/>
                <ProductCard col={template === "cols" ? true : false}/>
                <ProductCard col={template === "cols" ? true : false}/>
                <ProductCard col={template === "cols" ? true : false}/>
                <ProductCard col={template === "cols" ? true : false}/>
                <ProductCard col={template === "cols" ? true : false}/>
                <ProductCard col={template === "cols" ? true : false}/>
                <ProductCard col={template === "cols" ? true : false}/>
                <ProductCard col={template === "cols" ? true : false}/>
              </div>
            

            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;