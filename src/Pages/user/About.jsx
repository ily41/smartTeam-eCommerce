import { ArrowRight } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router';

const About = () => {
    const [expanded, setExpanded] = useState(false);
  return (
    <section className='bg-[#F7FAFC] pt-5 inter'>
        <div className='flex flex-col p-12 md:p-7 md:pb-13 bg-white border-1 md:gap-10  md:max-w-[90vw] md:mx-auto md:rounded-lg border-[#dee2e6] md:flex-row'>

            <div className="relative md:order-2 md:flex-3">
              <img className="rounded-lg w-full md:hidden" src="/Banners/aboutBanner.svg" alt="" />
              <img className="rounded-lg  hidden md:block min-h-[250px] w-full object-cover" src="/Banners/aboutBannerDesk.svg" alt="" />

              <div className="absolute left-[-6%] md:left-[-10%] bottom-[-6%] md:bottom-[-5%] md:min-w-[270px]  md:text-[11px] text-white rounded-lg border max-w-[280px] border-[#818686] bg-transparent backdrop-blur-[29px] p-4 w-[66%] md:w-[70%]  lg:text-[12px]   text-xs inter">
                <p >
                 We believe that technology should make life easier, safer, and more productive. That is why we deliver modern IT and security solutions designed to support both businesses and individuals. From small offices to large enterprises, our services are built to provide efficiency, safety, and long-term reliability.
                </p>
              </div>
            </div>


            <div className='mt-15 md:mt-0 text-center flex flex-col md:flex-4 md:items-start md:text-start items-center md:order-1'>
                <h1 className='text-2xl font-semibold mb-4 '>Who we are?</h1>
                <span
                  className={`text-[#505050] md:line-clamp-none md:text-sm lg:text-lg max-w-[550px] ${expanded ? "" : "line-clamp-4 "}`}
                >
                  Our company specializes in the sales and installation of computers,
                  office equipment, and low-current systems. We provide complete
                  solutions including network setup, fire alarm systems, security
                  cameras, intercom systems, and more. With years of experience and a
                  professional team, we ensure high-quality services that are reliable,
                  secure, and tailored to your needs.
                </span>
            
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-[#e60c03] ml-1 font-medium md:hidden"
                >
                  {expanded ? "Less" : "More"}
                </button>
            </div>
            

            
        </div>

        <section className='mt-12 mx-4 max-w-[90vw] lg:mx-auto'>
          <div className='text-xl font-semibold mb-6'>
            <h1>Featured Brands</h1>
          </div>
          <div className='relative overflow-hidden bg-white rounded-lg border border-gray-200 p-6'>
            <div className='flex animate-scroll gap-8 items-center'>
              {/* First set of logos */}
              <div className='flex gap-8 items-center min-w-max'>
                <img src='./slider/slider1.svg' alt='LG' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider2.svg' alt='Dell' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider3.svg' alt='' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider4.svg' alt='Oppo' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider5.svg' alt='Asus' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider6.svg' alt='Samsung' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider7.svg' alt='HP' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider8.svg' alt='Lenovo' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider9.svg' alt='Apple' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider10.svg' alt='Acer' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider11.svg' alt='Sony' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider12.svg' alt='Microsoft' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className='flex gap-8 items-center min-w-max'>
                <img src='./slider/slider1.svg' alt='LG' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider2.svg' alt='Dell' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider3.svg' alt='' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider4.svg' alt='Oppo' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider5.svg' alt='Asus' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider6.svg' alt='Samsung' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider7.svg' alt='HP' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider8.svg' alt='Lenovo' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider9.svg' alt='Apple' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider10.svg' alt='Acer' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider11.svg' alt='Sony' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider12.svg' alt='Microsoft' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
              </div>
            </div>
          </div>
          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            
            .animate-scroll {
              animation: scroll 30s linear infinite;
            }
            
            .animate-scroll:hover {
              animation-play-state: paused;
            }
            `}
          </style>
        </section>


        <div className='flex flex-col md:grid lg:flex lg:flex-row md:grid-cols-2 gap-4 max-w-[90vw] mx-auto mt-8'>
            <div className='flex flex-1 bg-white rounded-lg border-2 border-[#dee2e6] p-5 py-7 md:py-3 md:min-h-[140px]'>
                <img className='mr-7 md:mr-3  md:w-[55px] md:h-[55px] md:object-contain shrink-0  md:self-center' src="/Icons/about1.svg" alt="" />

                <div className='flex flex-col justify-center  items-center'>
                    <h1 className='text-md font-semibold self-start '>Who we are</h1>
                    <p className='text-[#505050] text-xs md:text-base'>A trusted partner in IT and security solutions, serving businesses and individuals.</p>
                </div>

            </div>

            <div className='flex flex-1  bg-white rounded-lg border-2 border-[#dee2e6] p-5 py-7 md:py-3 md:min-h-[140px]'>
                <img className='mr-7 md:mr-3  md:w-[55px] shrink-0 md:self-center' src="/Icons/about2.svg" alt="" />

                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-md font-semibold self-start'>Who we do</h1>
                    <p className='text-[#505050] text-xs md:text-base'>We provide professional sales, installation, and support for computers, office equipment, and low-current systems.</p>
                </div>

            </div>

            <div className='flex flex-1  bg-white rounded-lg border-2 border-[#dee2e6] p-5 py-7 md:py-3 md:min-h-[140px]'>
                <img className='mr-7 md:mr-3  md:w-[55px] shrink-0 md:self-center' src="/Icons/about3.svg" alt="" />

                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-md font-semibold self-start'>Our mission</h1>
                    <p className='text-[#505050] text-xs md:text-base'>To deliver secure, innovative, and reliable technology that improves efficiency and safety.</p>
                </div>

            </div>
        </div>
        <div className='pb-10 pt-18 max-w-[90vw] mx-auto   text-2xl font-semibold'>
          <h1>Our extra services</h1>
        </div>
        <div className='max-w-[90vw] mx-auto pb-25 flex flex-col md:flex-row md:gap-4'>
          <Link to='/secure' className="flex-1 h-fit cursor-pointer bg-white rounded-lg border-2 border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-400">
              <img
                className="w-full rounded-t-md h-[190px] lg:h-[220px]  object-cover"
                src="./deals/cameraService.svg"
                alt=""
              />
              <div className="relative bg-white p-5 pb-4 ">
                  <h1 className='font-semibold text-xl'>Security Systems</h1>
                  <p className='text-[#505050] text-sm mt-3 font-medium'>We reliably protect your workplaces and living spaces with security systems developed... </p>
              </div>
              <div className='bg-white p-7 pt-0 flex justify-end rounded-b-lg'>
                  <button className='flex self-end items-center gap-4 border-1 border-[#dee2e6] rounded-full p-3 py-2'>
                  Learn More 
                  <div className='p-1 bg-[#FF4B43] rounded-full '><ArrowRight size={18} color='white'/></div>
              </button>
              </div>
              
          </Link>  
          <Link to='/software' className="flex-1 bg-white  rounded-lg border-2 mt-4 md:mt-0 border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-400">
              <img
                className="w-full rounded-t-md h-[190px] lg:h-[220px] object-cover"
                src="./Banners/aboutExtra.svg"
                alt=""
              />
              <div className="relative bg-white p-5 pb-4 ">
                  <h1 className='font-semibold text-xl'>Hemsoft Software Installation</h1>
                  <p className='text-[#505050] text-sm mt-3 font-medium'>The Hemsoft software, provided by Smartteam, is a modern POS and management system... </p>

              </div>
              <div className='bg-white p-7 pt-0 flex justify-end rounded-b-lg'>
                  <button className='flex self-end items-center gap-4 border-1 border-[#dee2e6] rounded-full p-3 py-2'>
                  Learn More 
                  <div className='p-1 bg-[#FF4B43] rounded-full '><ArrowRight size={18} color='white'/></div>
              </button>
              </div>
              

          </Link>
        </div>

    </section>
  )
}

export default About