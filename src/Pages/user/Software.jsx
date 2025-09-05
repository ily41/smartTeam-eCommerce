
import React from 'react'
import { Breadcrumb } from '../../products/Breadcrumb'

const Software = () => {
  return (
        <section className='bg-[#f7fafc]  inter pt-4'>
           <div className='hidden md:block md:max-w-[80vw] mx-auto'>
               <Breadcrumb />
           </div>
           
           <div className='bg-white p-5 border-1 border-[#dee2e6] flex flex-col md:flex-row md:gap-4 md:max-w-[85vw] lg:max-w-[75vw] mx-auto md:mt-8 md:rounded-lg md:shadow-md lg:p-8 lg:gap-5'>
               <div className='md:hidden'>
                   <Breadcrumb  />
               </div>
               
   
               <div className=' w-full lg:max-h-[30vh] mt-9 md:mt-0  mx-auto rounded-xl md:flex-3 lg:flex-5'>
                   <img className='rounded-xl  object-cover md:h-full lg:max-h-[280px] w-full ' src="./Banners/cameraService.svg" alt="" />
               </div>
   
               <div className='text-center my-7 md:my-0 flex flex-col gap-3 md:flex-8 md:text-start   [@media(min-width:1100px)]:p-7'>
                   <h1 className='font-semibold text-xl lg:text-2xl'>Protect Your Space with  <br className='md:hidden'></br>Advanced Technology</h1>
                   <p className='max-w-[83vw] mx-auto text-[#505050] md:text-sm md:mb-4  lg:text-lg'>We provide reliable protection for your workplace and living spaces through security systems built on modern technologies.</p>
                   <button className=' py-4 my-4 bg-gradient-to-b from-[#FF1206] to-[#D91205] rounded-lg mx-3 text-white md:w-fit md:py-3 md:text-sm md:px-7 md:mx-0'>Contact via Whatssap</button>
               </div>
           </div>
   
           <div className='max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] md:mt-10 mx-auto pb-25'>
               <div className='py-6 pt-8 text-center '>
                   <h1 className='text-xl font-semibold'>Our Services</h1>
                   <p className='text-[#505050]  '>Our services are designed to provide maximum safety and smooth operation. These systems, installed by our professional team, ensure the highest level of security for your property.</p>
               </div>
               <div className='flex flex-col gap-5 max-w-[90vw] mx-auto md:grid md:grid-cols-2 lg:flex lg:flex-row'>
                   <div className='relative bg-white border-1 border-[#dee2e6] p-7 pt-13 rounded-lg'>
                       <img className='absolute top-4 right-4 bg-[#ff4b43] p-5 rounded-full' src="./Icons/service-2-1.svg" alt="" />
                       <h1 className='font-semibold text-lg'>Video Surveillance Camera Installation</h1>
                       <p className='text-md text-[#7D7D7D] font-medium max-w-[84%]'>Stay in control with high-quality CCTV cameras.</p>
                   </div>
   
                   <div className='relative bg-white border-1 border-[#dee2e6] p-7 pt-13 rounded-lg'>
                       <img className='absolute top-4 right-4 bg-[#ff4b43] p-5 rounded-full' src="./Icons/service-2-2.svg" alt="" />
                       <h1 className='font-semibold text-lg'>IP & Analog System Integration</h1>
                       <p className='text-md text-[#7D7D7D] font-medium max-w-[84%]'>Smoothly connect and manage different system types.</p>
                   </div>
   
                   <div className='relative bg-white border-1 border-[#dee2e6] p-7 pt-13 rounded-lg'>
                       <img className='absolute top-4 right-4 bg-[#ff4b43] p-5 rounded-full' src="./Icons/service-2-3.svg" alt="" />
                       <h1 className='font-semibold text-lg'>Staff Training & Support</h1>
                       <p className='text-md text-[#7D7D7D] font-medium max-w-[84%]'>Your team receives practical training and guidance to use the system effectively.</p>
                   </div>
   
                   <div className='relative bg-white border-1 border-[#dee2e6] p-7 pt-13 rounded-lg'>
                       <img className='absolute top-4 right-4 bg-[#ff4b43] p-5 rounded-full' src="./Icons/service-2-4.svg" alt="" />
                       <h1 className='font-semibold text-lg'> Fire Alarm & Signaling Systems</h1>
                       <p className='text-md text-[#7D7D7D] font-medium max-w-[84%]'>Ensure quick response to emergencies.</p>
                   </div>
               </div>
               
           </div>
   
   
       </section>
  )
}

export default Software