import React, { act, useState } from 'react'
import MyMap from '../UI/googleMaps'
import SearchUI from '../UI/SearchUI'
import HomePageUI from '../UI/HomePageUI'
import { Link } from 'react-router'

const Home = () => {
    const [hoveredCategorie, setHoveredCategorie] = useState(null)
    const [activeCategorie,setActiveCategorie ] = useState(null)
    

  return (
    <>
      <main className=' bg-[#f7fafc] lg:pt-5'>
        
        <div className='p-5 pb-0 md:pb-5'>
            <SearchUI />
        </div>
        
        <div className='flex p-5 pb-8 overflow-x-auto gap-2 text-center scrollbar-hide bg-[#f7fafc] lg:hidden'>
            <div className='min-w-[20%] w-fit flex-shrink-0 whitespace-nowrap bg-white p-2 rounded-lg font-medium border-1 border-[#DEE2E6] transition-all duration-200 hover:bg-gray-300 cursor-pointer'>
                <span className='inter'>Hello bextiyar</span>
            </div>
            <div className='min-w-[20%] w-fit flex-shrink-0 whitespace-nowrap bg-white p-2 rounded-lg font-medium border-1 border-[#DEE2E6] transition-all duration-200 hover:bg-gray-300 cursor-pointer'>
                <span className='inter'>All categories</span>
            </div>
            <div className='min-w-[20%] w-fit flex-shrink-0 whitespace-nowrap bg-white p-2 rounded-lg font-medium border-1 border-[#DEE2E6] transition-all duration-200 hover:bg-gray-300 cursor-pointer'>
                <span className='inter'>Technology</span>
            </div>
            <div className='min-w-[20%] w-fit flex-shrink-0 whitespace-nowrap bg-white p-2 rounded-lg font-medium border-1 border-[#DEE2E6] transition-all duration-200 hover:bg-gray-300 cursor-pointer'>
                <span className='inter'>Sports</span>
            </div>
        </div>

        <section onMouseLeave={() => setHoveredCategorie(null)} className="    lg:flex lg:w-[85vw] lg:max-h-[400px] lg:mx-auto lg:shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:rounded-lg lg:gap-5 lg:bg-white">
            
           <div className='hidden lg:mt-5 lg:m-4  lg:flex flex-col text-black mt-1 whitespace-nowrap'>
                <Link 
                  to='/subcategories'
                  onMouseEnter={() => setHoveredCategorie("commercial")}
                  onClick={() => setActiveCategorie(activeCategorie === "commercial" ? null : "commercial")}
                  className={`p-2  pl-3 flex gap-2 lg:mb-3 lg:hover:bg-[#ffe2e1] ${activeCategorie === "commercial" && 'bg-[#ffe2e1]'} cursor-pointer lg:rounded-2xl min-w-[220px] lg:pr-5`}
                >
                  <img className="w-[24px]" src="./Icons/banner-commercial.svg" alt="" />
                  <span>Commercial-equipment</span>
                </Link>
            
                <div
                  onMouseEnter={() => setHoveredCategorie("computers")}
                  onClick={() => setActiveCategorie(activeCategorie === "computers" ? null : "computers")}
                  className={`p-2 pl-3 flex gap-2 lg:mb-3 lg:hover:bg-[#ffe2e1] ${activeCategorie === "computers" && 'bg-[#ffe2e1]'} cursor-pointer lg:rounded-2xl lg:pr-5`}
                >
                  <img className="w-[24px]" src="./Icons/banner-computers.svg" alt="" />
                  <span>Computers</span>
                </div>
            
                <div
                  onMouseEnter={() => setHoveredCategorie("laptops")}
                  onClick={() => setActiveCategorie(activeCategorie === "laptops" ? null : "laptops")}
                  className={`p-2 pl-3 flex gap-2 lg:mb-3 lg:hover:bg-[#ffe2e1] ${activeCategorie === "laptops" && 'bg-[#ffe2e1]'} cursor-pointer lg:rounded-2xl lg:pr-5`}
                >
                  <img className="w-[24px]" src="./Icons/banner-laptops.svg" alt="" />
                  <span>Laptops</span>
                </div>
            
                <div
                  onMouseEnter={() => setHoveredCategorie("surveillance")}
                  onClick={() => setActiveCategorie(activeCategorie === "surveillance" ? null : "surveillance")}
                  className={`p-2 pl-3 flex gap-2 lg:mb-3 lg:hover:bg-[#ffe2e1] ${activeCategorie === "surveillance" && 'bg-[#ffe2e1]'} cursor-pointer lg:rounded-2xl lg:pr-5`}
                >
                  <img className="w-[24px]" src="./Icons/banner-surveillance.svg" alt="" />
                  <span>Surveillance Systems</span>
                </div>
            
                <div
                  onMouseEnter={() => setHoveredCategorie("computer-equipment")}
                  onClick={() => setActiveCategorie(activeCategorie === "computer-equipment" ? null : "computer-equipment")}
                  className={`p-2 pl-3 flex gap-2 lg:mb-3 lg:hover:bg-[#ffe2e1] ${activeCategorie === "computer-equipment" && 'bg-[#ffe2e1]'} cursor-pointer lg:rounded-2xl lg:pr-5`}
                >
                  <img className="w-[24px]" src="./Icons/banner-mouse.svg" alt="" />
                  <span>Computer Equipment</span>
                </div>
            
                <div
                  onMouseEnter={() => setHoveredCategorie("office-systems")}
                  onClick={() => setActiveCategorie(activeCategorie === "office-systems" ? null : "office-systems")}
                  className={`p-2 pl-3 flex gap-2 lg:mb-3 lg:hover:bg-[#ffe2e1] ${activeCategorie === "office-systems" && 'bg-[#ffe2e1]'} cursor-pointer lg:rounded-2xl lg:pr-5`}
                >
                  <img className="w-[24px]" src="./Icons/banner-printer.svg" alt="" />
                  <span>Office Systems</span>
                </div>
            
                <div
                  onMouseEnter={() => setHoveredCategorie("network-systems")}
                  onClick={() => setActiveCategorie(activeCategorie === "network-systems" ? null : "network-systems")}
                  className={`p-2 pl-3 flex gap-2 lg:mb-3 lg:hover:bg-[#ffe2e1] ${activeCategorie === "network-systems" && 'bg-[#ffe2e1]'} cursor-pointer lg:rounded-2xl lg:pr-5`}
                >
                  <img className="w-[24px]" src="./Icons/banner-global.svg" alt="" />
                  <span>Network Systems</span>
                </div>
            </div>


            <div className={` w-full relative flex-1 lg:${hoveredCategorie && 'hidden border-l-1' || activeCategorie && 'hidden border-l-1' }  border-[#E0E0E0]`}>
                    <img className="w-full object-cover h-[35vh] lg:h-full lg:p-4" src="./Banners/headerBanner.svg" alt="Banner" />
            
                    <div className="absolute top-[13%] left-[8%] lg:left-[5%] lg:top-[13%] flex flex-col gap-15 max-w-[80%]">
                  <div>
                    <h1 className="inter text-2xl   lg:text-3xl lg:hidden font-medium">
                      Latest trending
                    </h1>
                    <p className="inter text-2xl   lg:text-4xl lg:hidden font-bold">
                      Electronic items
                    </p>
                    <h1 className="hidden lg:block text-3xl font-semibold inter  ">
                      Where Quality Meets
                    </h1>
                    <h1 className="hidden lg:block text-3xl mb-3 font-semibold inter">
                      Convenience
                    </h1>
                    <p className="hidden lg:block inter font-normal">
                      Discover top deals, trending styles, and 
                    </p>
                    <p className="hidden lg:block inter font-normal">
                       everyday essentials—all in one place.
                    </p>
                  </div>
  
                  <Link  to='/login' className="px-12 py-4  lg:py-3 rounded-lg text-lg inter lg:text-lg bg-gradient-to-b from-[#FD1206] to-[#DD1205] transition text-white font-medium w-fit">
                    Shop now
                  </Link>
                    </div>
                </div>
            
                <div className={`${activeCategorie ? 'lg:flex' : hoveredCategorie ? 'lg:flex' : 'hidden' } hidden gap-10 p-10 border-l-1 whitespace-nowrap flex-wrap border-[#E0E0E0]`}>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xl font-semibold'>Analog camera systems</h1>
                        <p className='text-lg'>scales</p>
                        <p className='text-lg'>cash drawers</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xl font-semibold'>Analog camera systems</h1>
                        <p className='text-lg'>scales</p>
                        <p className='text-lg'>cash drawers</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xl font-semibold'>Analog camera systems</h1>
                        <p className='text-lg'>scales</p>
                        <p className='text-lg'>cash drawers</p>
                    </div>
                </div>
            
        </section>

        <section className='mt-12 mx-4 inter  lg:hidden'>
            <div className='flex justify-between text-xl font-semibold'>
                <h1 >Categories</h1>
            </div>

            <div className='grid grid-cols-3 mt-10 gap-5 text-sm '>
                <div className='  justify-center flex col-span-3 items-center bg-white  md:hidden  rounded-lg border-1 border-[#DEE2E6] p-4'>
                  <div className='flex flex-row  max-w-[450px] gap-4 '>
                    <div className='w-full h-full'>
                      <img className=' self-start w-full h-full object-contain min-h-[130px] max-h-[190px]' src="./deals/categorieExample.svg" alt="" />
                    </div>
                    <div className='flex flex-col text-start self-start'>
                      <p className=' text-xl inter mb-1'>Surveillance System</p>
                      <p className='text-md text-[#AFB0B1]'>Reliable routers, switches, and cabling systems for fast, stable, and secure connectivity. Scalable solutions to keep your business connected and future-ready.</p>
                    </div>
                  </div>
                </div>

              <div className='bg-white flex justify-center items-center flex-col gap-4 rounded-lg border-1 border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='' src="./deals/product.avif" alt="" />
                </div>
                <p className='text-center'>Surveillance system</p>
              </div>
              <div className='bg-white flex justify-center items-center flex-col gap-4 rounded-lg border-1 border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='' src="./deals/product.avif" alt="" />
                </div>
                <p className='text-center'>Surveillance system</p>
              </div>
              <div className='bg-white flex justify-center items-center flex-col gap-4 rounded-lg border-1 border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='' src="./deals/product.avif" alt="" />
                </div>
                <p className='text-center'>Surveillance system</p>
              </div>
              <div className='bg-white flex justify-center items-center flex-col gap-4 rounded-lg border-1 border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='' src="./deals/product.avif" alt="" />
                </div>
                <p className='text-center'>Surveillance system</p>
              </div>
              <div className='bg-white flex justify-center items-center flex-col gap-4 rounded-lg border-1 border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='' src="./deals/product.avif" alt="" />
                </div>
                <p className='text-center'>Surveillance system</p>
              </div>
              <div className='bg-white flex self-center justify-center items-center flex-col gap-4 rounded-lg border-1 border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='' src="./deals/product.avif" alt="" />
                </div>
                <p className='text-center'>Surveillance system</p>
              </div>
              
              
              
              
              
            </div>
        </section>

         <section className='hidden mt-12 bg-white lg:grid grid-cols-6 lg:w-[85vw] lg:mx-auto p-6 rounded-lg shadow-lg'>
           <img className='w-full h-full object-cover col-span-2 rounded-lg' src="./Banners/left-side.svg" alt="" />
           
           <div className="col-span-4 grid grid-cols-2 gap-4 ml-4">
             
             <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
               <div className="flex justify-between items-start mb-3">
                 <div>
                   <h3 className="font-semibold text-gray-800">Smart watches</h3>
                   <p className="text-sm text-gray-500">From<br />USD 19</p>
                 </div>
                 <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                   <div className="w-12 h-12 bg-black rounded-lg relative">
                     <div className="w-10 h-6 bg-white rounded-sm absolute top-1 left-1"></div>
                     <div className="w-8 h-1 bg-gray-400 absolute bottom-2 left-2"></div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
               <div className="flex justify-between items-start mb-3">
                 <div>
                   <h3 className="font-semibold text-gray-800">Cameras</h3>
                   <p className="text-sm text-gray-500">From<br />USD 89</p>
                 </div>
                 <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                   <div className="w-12 h-8 bg-black rounded-md relative">
                     <div className="w-4 h-4 bg-blue-600 rounded-full absolute top-1 right-1"></div>
                     <div className="w-6 h-2 bg-gray-600 rounded absolute bottom-1 left-1"></div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
               <div className="flex justify-between items-start mb-3">
                 <div>
                   <h3 className="font-semibold text-gray-800">Gaming set</h3>
                   <p className="text-sm text-gray-500">From<br />USD 35</p>
                 </div>
                 <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                   <div className="w-12 h-10 bg-black rounded-full relative">
                     <div className="w-8 h-6 bg-blue-500 rounded-full absolute top-1 left-2"></div>
                     <div className="w-2 h-4 bg-gray-600 absolute bottom-1 left-1"></div>
                     <div className="w-2 h-4 bg-gray-600 absolute bottom-1 right-1"></div>
                   </div>
                 </div>
               </div>
             </div>
       
             <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
               <div className="flex justify-between items-start mb-3">
                 <div>
                   <h3 className="font-semibold text-gray-800">Laptops & PC</h3>
                   <p className="text-sm text-gray-500">From<br />USD 340</p>
                 </div>
                 <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                   <div className="w-12 h-8 bg-gray-800 rounded relative">
                     <div className="w-10 h-6 bg-orange-400 rounded-sm absolute top-1 left-1"></div>
                     <div className="w-8 h-1 bg-gray-600 absolute bottom-1 left-2"></div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
               <div className="flex justify-between items-start mb-3">
                 <div>
                   <h3 className="font-semibold text-gray-800">Headphones</h3>
                   <p className="text-sm text-gray-500">From<br />USD 10</p>
                 </div>
                 <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                   <div className="relative">
                     <div className="w-8 h-8 border-4 border-gray-300 rounded-full"></div>
                     <div className="w-2 h-6 bg-gray-300 absolute -top-3 left-3"></div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
               <div className="flex justify-between items-start mb-3">
                 <div>
                   <h3 className="font-semibold text-gray-800">Smartphones</h3>
                   <p className="text-sm text-gray-500">From<br />USD 19</p>
                 </div>
                 <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                   <div className="w-8 h-12 bg-gradient-to-br from-teal-400 to-orange-400 rounded-lg relative">
                     <div className="w-6 h-8 bg-black rounded-sm absolute top-2 left-1 opacity-20"></div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
               <div className="flex justify-between items-start mb-3">
                 <div>
                   <h3 className="font-semibold text-gray-800">Smart watches</h3>
                   <p className="text-sm text-gray-500">From<br />USD 90</p>
                 </div>
                 <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                   <div className="w-10 h-12 bg-black rounded-lg relative">
                     <div className="w-2 h-8 bg-gray-600 absolute top-2 left-1"></div>
                     <div className="w-2 h-8 bg-gray-600 absolute top-2 right-1"></div>
                     <div className="w-6 h-6 bg-white rounded absolute top-3 left-2"></div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
               <div className="flex justify-between items-start mb-3">
                 <div>
                   <h3 className="font-semibold text-gray-800">Electric kettle</h3>
                   <p className="text-sm text-gray-500">From<br />USD 240</p>
                 </div>
                 <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                   <div className="w-8 h-10 bg-gradient-to-b from-red-500 to-red-600 rounded-lg relative">
                     <div className="w-2 h-3 bg-black rounded absolute top-1 right-1"></div>
                     <div className="w-6 h-6 bg-red-400 rounded-full absolute bottom-1 left-1"></div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </section>
        

        <section className='lg:flex lg:bg-white lg:mt-8 lg:rounded-lg lg:w-[85vw] mx-auto lg:border-1 lg:border-gray-300'>
            <div className='p-4 pr-9 border-r-1 border-gray-300 '>
                <div className='inter lg:mb-5 border-t-gray-300 p-4 lg:p-0'>
                    <h1 className='text-xl font-semibold mb-1'>Deals and offers</h1>
                    <p className='text-md font-medium text-gray-600'>Electronic equipments</p>
                </div>
                <div className='hidden lg:flex gap-2'>

                    <div className='inter text-sm min-w-[50px] bg-[#606060] text-white p-2 rounded-lg items-center flex flex-col'>
                        <p className='font-semibold'>04</p>
                        <p>Days</p>
                    </div>

                    <div className='inter text-sm min-w-[50px] bg-[#606060] text-white p-2 rounded-lg items-center flex flex-col'>
                        <p className='font-semibold'>13</p>
                        <p>Hour</p>
                    </div>

                    <div className='inter text-sm min-w-[50px] bg-[#606060] text-white p-2 rounded-lg items-center flex flex-col'>
                        <p className='font-semibold'>34</p>
                        <p>Min </p>
                    </div>

                    <div className='inter text-sm min-w-[50px] bg-[#606060] text-white p-2 rounded-lg items-center flex flex-col'>
                        <p className='font-semibold'>56</p>
                        <p>Sec </p>
                    </div>
                </div>
                
            </div>

            <div className='flex flex-1 rounded-lg'>
                <div className='relative py-5 inter border-1 lg:border-t-0 bg-white lg:border-b-0 border-gray-300 w-full flex flex-col items-center  gap-1 lg:min-h-[15vh] lg:p-3  '>
                    <img className='w-full  max-w-[180px] px-2  lg:max-w-none' src="./deals/1.svg" alt="" />
                    <p className='sm:whitespace-nowrap text-md'>Smart watches</p>
                    <div className='absolute top-2 right-2 lg:top-3 lg:right-3 p-6 w-0 h-0 flex justify-center items-center  rounded-[50%] bg-[#FF4B43] text-white inter '>
                        <p className='text-xs text-center font-semibold lg:text-sm'>-25%</p>
                    </div>
                </div>
                <div className='border-1 relative py-5 inter lg:border-t-0 bg-white lg:border-b-0 border-gray-300 w-full flex flex-col items-center  gap-1 lg:min-h-[15vh] lg:p-3'>
                    <img className='w-full max-w-[180px]  px-2 lg:max-w-none ' src="./deals/2.svg" alt="" />
                    <p className='sm:whitespace-nowrap text-md'>Smart watches</p>
                    <div className='absolute top-2 right-2 lg:top-3 lg:right-3 p-6 w-0 h-0 flex justify-center items-center  rounded-[50%] bg-[#FF4B43] text-white inter '>
                        <p className='text-xs text-center font-semibold lg:text-sm'>-25%</p>
                    </div>
                </div>
                <div className='border-1 relative py-5 inter lg:border-t-0 bg-white lg:border-b-0 border-gray-300 w-full flex flex-col items-center  gap-1 lg:min-h-[15vh] lg:p-3'>
                    <img className='w-full max-w-[180px]  px-2 lg:max-w-none ' src="./deals/3.svg" alt="" />
                    <p className='sm:whitespace-nowrap text-md'>Smart watches</p>
                    <div className='absolute top-2 right-2 lg:top-3 lg:right-3 p-6 w-0 h-0 flex justify-center items-center  rounded-[50%] bg-[#FF4B43] text-white inter '>
                        <p className='text-xs text-center font-semibold lg:text-sm'>-25%</p>
                    </div>
                </div>
                <div className='hidden relative py-5 inter lg:flex border-1 lg:border-t-0 lg:border-b-0 border-gray-300 w-full  flex-col items-center  gap-1 lg:min-h-[15vh] lg:p-3'>
                    <img className='w-full max-w-[180px]  px-2 lg:max-w-none ' src="./deals/1.svg" alt="" />
                    <p className='whitespace-nowrap text-md'>Smart watches</p>
                    <div className='absolute top-2 right-2 lg:top-3 lg:right-37p-6 lg:p-6 w-0 h-0 flex justify-center items-center  rounded-[50%] bg-[#FF4B43] text-white inter '>
                        <p className='text-xs text-center font-semibold lg:text-sm'>-25%</p>
                    </div>
                </div>
                <div className='hidden relative py-5 inter [@media(min-width:1200px)]:flex border-1 lg:border-t-0 lg:border-b-0 border-gray-300 w-full x flex-col items-center  gap-1 lg:min-h-[15vh] lg:p-3'>
                    <img className='w-full max-w-[180px]  px-2 lg:max-w-none ' src="./deals/1.svg" alt="" />
                    <p className='whitespace-nowrap text-md'>Smart watches</p>
                    <div className='absolute top-2 right-2 lg:top-3 lg:right-3 p-6 lg:p-6 w-0 h-0 flex justify-center items-center  rounded-[50%] bg-[#FF4B43] text-white inter '>
                        <p className='text-xs text-center font-semibold lg:text-sm'>-25%</p>
                    </div>
                </div>

               
               
            </div>
            
        </section>

        

        <section className='mt-12 mx-4 lg:w-[85vw] lg:mx-auto'>
            <div className='flex justify-between text-xl font-semibold'>
                <h1 >Recommended items</h1>
                <Link to='./products'><h1 className='text-[#E60C03] cursor-pointer text-lg'>More </h1></Link>

            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-2 mt-5 whitespace-nowrap'>
                <HomePageUI deal={false} />
                <HomePageUI deal={false} />
                <HomePageUI deal={false} />
                <HomePageUI deal={false} />
                <HomePageUI deal={false} />
                <HomePageUI deal={false} />
                <HomePageUI deal={false} />
                <HomePageUI deal={false} />
                <HomePageUI deal={false} />
                <HomePageUI deal={false} />
                
                
            </div>
        </section>

        <section className='mt-12 mx-4 lg:w-[85vw] lg:mx-auto'>
            <div className='flex justify-between text-xl font-semibold'>
                <h1 >Hot Deals</h1>
                <h1 className='text-[#E60C03] text-lg'>More</h1>

            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-5 whitespace-nowrap'>
                <HomePageUI  deal={true}/>
                <HomePageUI  deal={true}/>
                <HomePageUI  deal={true}/>
                <HomePageUI  deal={true}/>
                <HomePageUI  deal={true}/>
                <HomePageUI  deal={true}/>
                <HomePageUI  deal={true}/>
                <HomePageUI  deal={true}/>
                <HomePageUI  deal={true}/>
                <HomePageUI  deal={true}/>
                
            </div>
        </section>

        {/* <section className='mt-12 mx-4 lg:w-[85vw] lg:mx-auto '>
            <div className='text-xl font-semibold'>
                <h1>Extra Services</h1>
            </div>
            <div className="lg:flex gap-3">
              <div className="flex-1 rounded-lg border-2 mt-8 border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-400">
                <img
                  className="w-full rounded-t-lg"
                  src="./deals/systemServices.svg"
                  alt=""
                />
                <div className="relative bg-white p-7 pb-15 rounded-lg text-2xl lg:text-xl inter font-semibold">
                  <h1>All in One</h1>
                  <div className="absolute -top-0 right-7 bg-[#FF4B43] rounded-full border-2 border-white p-6 lg:p-4 transform -translate-y-1/2">
                    <img className="w-10 lg:w-7" src="./Icons/all-in-one.svg" alt="" />
                  </div>
                </div>
              </div>

              <div className="flex-1 rounded-lg border-2 mt-8 border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-400">
                <img
                  className="w-full rounded-t-lg"
                  src="./deals/computersService.svg"
                  alt=""
                />
                <div className="relative bg-white p-7 pb-15 rounded-lg text-2xl lg:text-xl inter font-semibold">
                  <h1>Computers</h1>
                  <div className="absolute -top-0 right-7 bg-[#FF4B43] rounded-full border-2 border-white p-6 lg:p-4 transform -translate-y-1/2">
                    <img className="w-10 lg:w-7" src="./Icons/computer-service.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>

            
        </section> */}

        <section className='my-12  mx-4  lg:w-[85vw] lg:mx-auto'>
            <div className='text-2xl mb-8 font-semibold'>
                <h1>Location</h1>
            </div>
            <MyMap />
        </section>


      </main>
    </>
  )
}

export default Home