import React from 'react'
import MyMap from './googleMaps'

const Home = () => {
  return (
    <main className=' bg-[#f7fafc] pt-5'>
        <section className=" pt-5   lg:flex lg:p-4 lg:w-[80vw] lg:max-h-[400px] lg:mx-auto lg:shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:rounded-lg lg:gap-10 lg:bg-white">
            
            <div className='hidden lg:flex flex-col text-[#1C1C1C] mt-1 gap-3'>
                <div className='p-2 pl-3'>
                    <span>Commercial-equipment</span>
                </div>
                <div className='p-2 pl-3'>
                    <span>Computers</span>
                </div>
                <div className='p-2 pl-3'>
                    <span>Laptops</span>
                </div>
                <div className='p-2 pl-3'>
                    <span>Surveillance Systems</span>
                </div>
                <div className='p-2 pl-3'>
                    <span>Computer Equipment</span>
                </div>
                <div className='p-2 pl-3'>
                    <span>Office Systems</span>
                </div>
                <div className='p-2 pl-3'>
                    <span>Network Systems</span>
                </div>
            </div>


            <div className='relative flex-1'>
                <img className="w-full object-cover h-[25vh] lg:h-full lg:w-full" src="./Banners/headerBanner.svg" alt="Banner" />
          
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
  
                  <button className="px-12 py-4  lg:py-3 rounded-lg text-lg inter lg:text-lg bg-gradient-to-b from-[#FD1206] to-[#DD1205] transition text-white font-medium w-fit">
                    Shop now
                  </button>
                </div>
            </div>
            
        </section>
        

        <section className='lg:flex lg:bg-white lg:mt-8 lg:rounded-lg lg:w-[80vw] mx-auto lg:border-1 lg:border-gray-300'>
            <div className='p-4 pr-9 border-r-1 border-gray-300 '>
                <div className='inter lg:mb-5 border-t-gray-300 p-4 lg:p-0'>
                    <h1 className='text-2xl font-semibold'>Deals and offers</h1>
                    <p className='text-lg font-medium text-gray-600'>Electronic equipments</p>
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
                <div className='border-1 lg:border-t-0 bg-white lg:border-b-0 border-gray-300 w-full flex flex-col items-center  gap-1 lg:min-h-[15vh] lg:p-3 pb-3 '>
                    <img className='w-full  max-w-[180px] lg:max-w-none' src="./deals/1.svg" alt="" />
                    <p className='sm:whitespace-nowrap text-lg'>Smart watches</p>
                    <div className='p-[1px] px-3 rounded-2xl bg-[#FFE3E3] text-[#EB001B] w-fit'>
                        <p className='text-lg font-semibold'>-25%</p>
                    </div>
                </div>
                <div className='border-1 lg:border-t-0 bg-white lg:border-b-0 border-gray-300 w-full flex flex-col items-center  gap-1 lg:min-h-[15vh] lg:p-3'>
                    <img className='w-full max-w-[180px] lg:max-w-none ' src="./deals/2.svg" alt="" />
                    <p className='sm:whitespace-nowrap text-lg'>Smart watches</p>
                    <div className='p-[1px] px-3 rounded-2xl bg-[#FFE3E3] text-[#EB001B] w-fit'>
                        <p className='text-lg font-semibold'>-25%</p>
                    </div>
                </div>
                <div className='border-1 lg:border-t-0 bg-white lg:border-b-0 border-gray-300 w-full flex flex-col items-center  gap-1 lg:min-h-[15vh] lg:p-3'>
                    <img className='w-full max-w-[180px] lg:max-w-none ' src="./deals/3.svg" alt="" />
                    <p className='sm:whitespace-nowrap text-lg'>Smart watches</p>
                    <div className='p-[1px] px-3 rounded-2xl bg-[#FFE3E3] text-[#EB001B] w-fit'>
                        <p className='text-lg font-semibold'>-25%</p>
                    </div>
                </div>
                <div className='hidden lg:flex border-1 lg:border-t-0 lg:border-b-0 border-gray-300 w-full  flex-col items-center  gap-1 lg:min-h-[15vh] lg:p-3'>
                    <img className='w-full max-w-[180px] lg:max-w-none ' src="./deals/1.svg" alt="" />
                    <p className='whitespace-nowrap text-lg'>Smart watches</p>
                    <div className='p-[1px] px-3 rounded-2xl bg-[#FFE3E3] text-[#EB001B] w-fit'>
                        <p className='text-lg font-semibold'>-25%</p>
                    </div>
                </div>
                <div className='hidden [@media(min-width:1200px)]:flex border-1 lg:border-t-0 lg:border-b-0 border-gray-300 w-full x flex-col items-center  gap-1 lg:min-h-[15vh] lg:p-3'>
                    <img className='w-full max-w-[180px] lg:max-w-none ' src="./deals/1.svg" alt="" />
                    <p className='whitespace-nowrap text-lg'>Smart watches</p>
                    <div className='p-[1px] px-3 rounded-2xl bg-[#FFE3E3] text-[#EB001B] w-fit'>
                        <p className='text-lg font-semibold'>-25%</p>
                    </div>
                </div>
               
               
            </div>
            
        </section>

        <section className='p-8'>
            <div className='flex justify-between text-2xl font-semibold'>
                <h1 >Recommended items</h1>
                <h1 className='text-[#E60C03]'>More </h1>

            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-2 mt-5 whitespace-nowrap'>

                <div className='bg-white  p-1 border-1 border-gray-300 rounded-lg'>
                    <img className='w-full rounded-lg' src="./deals/recommended.svg" alt="" />
                    <div className='font-semibold p-2 inter'>
                        <h1 className='text-lg'>680 AZN</h1>
                        <p className='font-medium mb-3'>Pos Komputer</p>
                        <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words'>Bakı, bu gün, 11:14</p>
                    </div>
                </div>
                <div className='bg-white  p-1 border-1 border-gray-300 rounded-lg'>
                    <img className='w-full rounded-lg' src="./deals/recommended.svg" alt="" />
                    <div className='font-semibold p-2 inter'>
                        <h1 className='text-lg'>680 AZN</h1>
                        <p className='font-medium mb-3'>Pos Komputer</p>
                        <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words'>Bakı, bu gün, 11:14</p>
                    </div>
                </div>
                <div className='bg-white  p-1 border-1 border-gray-300 rounded-lg'>
                    <img className='w-full rounded-lg' src="./deals/recommended.svg" alt="" />
                    <div className='font-semibold p-2 inter'>
                        <h1 className='text-lg'>680 AZN</h1>
                        <p className='font-medium mb-3'>Pos Komputer</p>
                        <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words'>Bakı, bu gün, 11:14</p>
                    </div>
                </div>
                <div className='bg-white  p-1 border-1 border-gray-300 rounded-lg'>
                    <img className='w-full rounded-lg' src="./deals/recommended.svg" alt="" />
                    <div className='font-semibold p-2 inter'>
                        <h1 className='text-lg'>680 AZN</h1>
                        <p className='font-medium mb-3'>Pos Komputer</p>
                        <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words'>Bakı, bu gün, 11:14</p>
                    </div>
                </div>
                <div className='bg-white  p-1 border-1 border-gray-300 rounded-lg'>
                    <img className='w-full rounded-lg' src="./deals/recommended.svg" alt="" />
                    <div className='font-semibold p-2 inter'>
                        <h1 className='text-lg'>680 AZN</h1>
                        <p className='font-medium mb-3'>Pos Komputer</p>
                        <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words'>Bakı, bu gün, 11:14</p>
                    </div>
                </div>
                
                
            </div>
        </section>

        <section className='p-8'>
            <div className='flex justify-between text-2xl font-semibold'>
                <h1 >Hot Deals</h1>
                <h1 className='text-[#E60C03]'>More</h1>

            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-5 whitespace-nowrap'>

                <div className='bg-white  p-1 border-1 border-gray-300 rounded-lg relative '>
                    <img className='w-full rounded-lg ' src="./deals/recommended.svg" alt="" />
                    <div className='font-semibold p-2 inter'>
                        <div className='[@media(min-width:450px)]:flex gap-2 items-center '>
                            <h1 className='line-through  text-lg sm:text-[16px] text-[#8c8c8c]'>680 AZN</h1>
                            <h1 className='text-[#FF4B43] text-lg sm:text-xl'>450 AZN</h1>
                        </div>
                        
                        <p className='font-medium mb-3'>Pos Komputer</p>
                        <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words'>Bakı, bu gün, 11:14</p>
                    </div>
                    <div className='absolute top-6 right-6 p-[1px] px-3 rounded-2xl bg-[#FFE3E3] text-[#EB001B] w-fit'>
                        <p className='text-lg font-semibold'>-25%</p>
                    </div>
                </div>
                <div className='bg-white  p-1 border-1 border-gray-300 rounded-lg relative '>
                    <img className='w-full rounded-lg ' src="./deals/recommended.svg" alt="" />
                    <div className='font-semibold p-2 inter'>
                        <div className='[@media(min-width:450px)]:flex gap-2 items-center '>
                            <h1 className='line-through  text-lg sm:text-[16px] text-[#8c8c8c]'>680 AZN</h1>
                            <h1 className='text-[#FF4B43] text-lg sm:text-xl'>450 AZN</h1>
                        </div>
                        
                        <p className='font-medium mb-3'>Pos Komputer</p>
                        <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words'>Bakı, bu gün, 11:14</p>
                    </div>
                    <div className='absolute top-6 right-6 p-[1px] px-3 rounded-2xl bg-[#FFE3E3] text-[#EB001B] w-fit'>
                        <p className='text-lg font-semibold'>-25%</p>
                    </div>
                </div>
                <div className='bg-white  p-1 border-1 border-gray-300 rounded-lg relative '>
                    <img className='w-full rounded-lg ' src="./deals/recommended.svg" alt="" />
                    <div className='font-semibold p-2 inter'>
                        <div className='[@media(min-width:450px)]:flex gap-2 items-center '>
                            <h1 className='line-through  text-lg sm:text-[16px] text-[#8c8c8c]'>680 AZN</h1>
                            <h1 className='text-[#FF4B43] text-lg sm:text-xl'>450 AZN</h1>
                        </div>
                        
                        <p className='font-medium mb-3'>Pos Komputer</p>
                        <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words'>Bakı, bu gün, 11:14</p>
                    </div>
                    <div className='absolute top-6 right-6 p-[1px] px-3 rounded-2xl bg-[#FFE3E3] text-[#EB001B] w-fit'>
                        <p className='text-lg font-semibold'>-25%</p>
                    </div>
                </div>
                <div className='bg-white  p-1 border-1 border-gray-300 rounded-lg relative '>
                    <img className='w-full rounded-lg ' src="./deals/recommended.svg" alt="" />
                    <div className='font-semibold p-2 inter'>
                        <div className='[@media(min-width:450px)]:flex gap-2 items-center '>
                            <h1 className='line-through  text-lg sm:text-[16px] text-[#8c8c8c]'>680 AZN</h1>
                            <h1 className='text-[#FF4B43] text-lg sm:text-xl'>450 AZN</h1>
                        </div>
                        
                        <p className='font-medium mb-3'>Pos Komputer</p>
                        <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words'>Bakı, bu gün, 11:14</p>
                    </div>
                    <div className='absolute top-6 right-6 p-[1px] px-3 rounded-2xl bg-[#FFE3E3] text-[#EB001B] w-fit'>
                        <p className='text-lg font-semibold'>-25%</p>
                    </div>
                </div>
                <div className='bg-white  p-1 border-1 border-gray-300 rounded-lg relative '>
                    <img className='w-full rounded-lg ' src="./deals/recommended.svg" alt="" />
                    <div className='font-semibold p-2 inter'>
                        <div className='[@media(min-width:450px)]:flex gap-2 items-center '>
                            <h1 className='line-through  text-lg sm:text-[16px] text-[#8c8c8c]'>680 AZN</h1>
                            <h1 className='text-[#FF4B43] text-lg sm:text-xl'>450 AZN</h1>
                        </div>
                        
                        <p className='font-medium mb-3'>Pos Komputer</p>
                        <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words'>Bakı, bu gün, 11:14</p>
                    </div>
                    <div className='absolute top-6 right-6 p-[1px] px-3 rounded-2xl bg-[#FFE3E3] text-[#EB001B] w-fit'>
                        <p className='text-lg font-semibold'>-25%</p>
                    </div>
                </div>
                
            </div>
        </section>

        <section className='p-8 '>
            <div className='text-2xl font-semibold'>
                <h1>Extra Services</h1>
            </div>
            <div className="lg:flex gap-3">
              <div className="flex-1 rounded-lg border-2 mt-8 border-gray-200">
                <img
                  className="w-full rounded-t-lg"
                  src="./deals/systemServices.svg"
                  alt=""
                />
                <div className="relative bg-white p-7 pb-15 rounded-lg text-2xl lg:text-xl inter font-semibold">
                  <h1>System Service</h1>
                  <div className="absolute -top-0 right-7 bg-[#FF4B43] rounded-full border-2 border-white p-6 lg:p-4 transform -translate-y-1/2">
                    <img
                      className="w-10 lg:w-7"
                      src="./Icons/system-service-icon.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 rounded-lg border-2 mt-8 border-gray-200">
                <img
                  className="w-full rounded-t-lg"
                  src="./deals/cameraService.svg"
                  alt=""
                />
                <div className="relative bg-white p-7 pb-15 rounded-lg text-2xl lg:text-xl inter font-semibold">
                  <h1>Camera Service</h1>
                  <div className="absolute -top-0 right-7 bg-[#FF4B43] rounded-full border-2 border-white p-6 lg:p-4 transform -translate-y-1/2">
                    <img className="w-10 lg:w-7" src="./Icons/camera-service.svg" alt="" />
                  </div>
                </div>
              </div>

              <div className="flex-1 rounded-lg border-2 mt-8 border-gray-200">
                <img
                  className="w-full rounded-t-lg"
                  src="./deals/allInOneService.svg"
                  alt=""
                />
                <div className="relative bg-white p-7 pb-15 rounded-lg text-2xl lg:text-xl inter font-semibold">
                  <h1>All in One</h1>
                  <div className="absolute -top-0 right-7 bg-[#FF4B43] rounded-full border-2 border-white p-6 lg:p-4 transform -translate-y-1/2">
                    <img className="w-10 lg:w-7" src="./Icons/all-in-one.svg" alt="" />
                  </div>
                </div>
              </div>

              <div className="flex-1 rounded-lg border-2 mt-8 border-gray-200">
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

            
        </section>

        <section className='p-8 pb-28'>
            <div className='text-2xl mb-8 font-semibold'>
                <h1>Location</h1>
            </div>
            <MyMap />
        </section>


    </main>
  )
}

export default Home