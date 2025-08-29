import React from 'react'

const Home = () => {
  return (
    <main className='overflow-x-hidden lg:bg-[#f7fafc] h-screen'>
        <section className=" mt-5 bg-white lg:flex lg:p-4 lg:w-[80vw] lg:max-h-[400px] lg:mx-auto lg:shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:rounded-lg lg:gap-10">


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
                <img className="w-full object-cover h-[35vh] lg:h-full lg:w-full" src="./Banners/headerBanner.svg" alt="Banner" />
          
                <div className="absolute top-[13%] left-[8%] lg:left-[5%] lg:top-[13%] flex flex-col gap-15 max-w-[80%]">
                  <div>
                    <h1 className="inter text-xl sm:text-2xl  lg:text-3xl lg:hidden font-medium">
                      Latest trending
                    </h1>
                    <p className="inter text-xl sm:text-2xl  lg:text-4xl lg:hidden font-bold">
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
  
                  <button className="px-8 sm:px-14 py-4 sm:py-5 lg:py-3 rounded-lg text-sm sm:text-xl inter lg:text-lg bg-gradient-to-b from-[#FD1206] to-[#DD1205] transition text-white font-medium w-fit">
                    Shop now
                  </button>
                </div>
            </div>
            
        </section>
        
         {/* <div class="slider-container ">
            <div class="slider-wrapper ">
                <div class="slider-track ">
                    <div class="brand-item lg">
                        <div class="brand-text">LG</div>
                    </div>
                    <div class="brand-item dell">
                        <div class="brand-text">DELL</div>
                    </div>
                    <div class="brand-item toshiba">
                        <div class="brand-text">TOSHIBA</div>
                    </div>
                    <div class="brand-item oppo">
                        <div class="brand-text">OPPO</div>
                    </div>
                    <div class="brand-item asus">
                        <div class="brand-text">ASUS</div>
                    </div>
                    <div class="brand-item samsung">
                        <div class="brand-text">SAMSUNG</div>
                    </div>
                    <div class="brand-item lg">
                        <div class="brand-text">LG</div>
                    </div>
                    <div class="brand-item dell">
                        <div class="brand-text">DELL</div>
                    </div>
                    <div class="brand-item toshiba">
                        <div class="brand-text">TOSHIBA</div>
                    </div>
                    <div class="brand-item oppo">
                        <div class="brand-text">OPPO</div>
                    </div>
                    <div class="brand-item asus">
                        <div class="brand-text">ASUS</div>
                    </div>
                    <div class="brand-item samsung">
                        <div class="brand-text">SAMSUNG</div>
                    </div>
                </div>
            </div>
        </div> */}

    </main>
  )
}

export default Home