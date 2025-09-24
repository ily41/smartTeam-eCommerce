import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router';

const Footer = () => {

    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null);
    
      useEffect(() => {
        function handleClickOutside(event) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false); // close dropdown if clicked outside
          }
        }
    
        if (open) {
          document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [open, setOpen]);

  return (
    <>
        <footer className='p-10 inter pb-0 '>
            <div className='bg-white flex flex-col lg:flex-row lg:justify-between lg:items-start'>
                <div>
                    <img className='w-[160px]' src="./Icons/logo.svg" alt="" />
                    <p className='text-lg mt-5 text-gray-600'>Our company provides sales and installation </p>
                    <p className='text-lg text-gray-600'>services for computers, office equipment, and  </p>
                    <p className='text-lg mb-5 text-gray-600'>low-current systems.</p>
                    <div className='flex gap-3'>
                        <img className='w-10'  src="./Icons/facebook.svg" alt="" />
                        <img className='w-10' src="./Icons/twitter.svg" alt="" />
                        <img className='w-10' src="./Icons/linkedin.svg" alt="" />
                        <img className='w-10' src="./Icons/instagram.svg" alt="" />
                        <img className='w-10' src="./Icons/youtube.svg" alt="" />
                    </div>
                </div>
                

                <div className='flex justify-between  mt-15 lg:hidden'>
                    <div>
                        <h1 className='font-semibold text-xl text-[#1C1C1C]'>Main Pages</h1>
                        <div className='text-[#8B96A5] flex flex-col gap-1 mt-3'>
                            <Link to='/'>Home</Link>
                            <Link to='/about'>About Us</Link>
                            <Link to='/download'>Download Linkrogram</Link>
                            <Link to='/contact'>Contact</Link>
                        </div>
                    </div>
                    <div>
                        <h1 className='font-semibold text-xl text-[#1C1C1C]'>Authentication</h1>
                        <div className='text-[#8B96A5] flex flex-col gap-1 mt-3'>
                            <Link to='/login'>Log In</Link>
                        </div>
                    </div>
                </div>

                <div className='hidden lg:block'>
                    <h1 className='font-semibold text-xl text-[#1C1C1C]'>Main Pages</h1>
                    <div className='text-[#8B96A5] flex flex-col gap-1 mt-3'>
                        <Link to='/'>Home</Link>
                        <Link to='/about'>About Us</Link>
                        <Link to='/download'>Download Linkrogram</Link>
                        <Link to='/contact'>Contact</Link>
                    </div>
                </div>

                <div className='hidden lg:block'>
                    <h1 className='font-semibold text-xl text-[#1C1C1C]'>Authentication</h1>
                    <div className='text-[#8B96A5] flex flex-col gap-1 mt-3'>
                        <Link to="/login">Log In</Link >
                    </div>
                </div>

                <div className='mt-15 lg:mt-0 flex flex-col gap-2'>
                    <h1 className='font-semibold text-xl text-[#1C1C1C]'>Contact Us</h1>

                    <div className='flex gap-2'>
                        <img className='w-[23px]' src="./Icons/footer-phone.svg" alt="" />
                        <p className='font-semibold text-md text-[#1C1C1C]'>+994 55 874 06 49</p>
                    </div>
                    <div className='flex gap-2'>
                        <img className='w-[25px]' src="./Icons/footer-location.svg" alt="" />
                        <p>Qurban Abbasov 35</p>
                    </div>
                    <div className='flex gap-2'>
                        <img className='w-[25px]' src="./Icons/footer-location.svg" alt="" />
                        <p>Sadarak Mall, Row 5-6, Store 60</p>
                    </div>

                </div>



            </div>
    
        </footer>

        <div className='mt-4 border-t-1 border-[#DCDCDC] p-4 pl-10 lg:flex lg:px-30 lg:justify-between lg:border-[#DEE2E7] lg:bg-[#EFF2F4] lg:mt-8'>
            <p>&#169; {new Date().getFullYear()} smartteam.az</p>
            <div className='cursor-pointer relative'>
                <div onClick={() => setOpen(prev => !prev)} className='  hidden lg:flex gap-1'>
                    <img src='./Icons/usa-flag.svg' alt="" />
                    <p>English</p>
                    <img src="./Icons/arrow-up.svg" alt="" />
                </div>
                
                {open && (
                <div ref={dropdownRef} className="absolute flex items-center bottom-full gap-2 mb-1 right-0 bg-white border-[1.5px] border-black rounded-sm px-3 py-1 min-w-max z-10">
                    
                    <img src='./Icons/az-flag.svg' alt="Azerbaijan flag" className="w-4 h-3" />
                    <span className="text-gray-700 inter text-sm lg:text-base">Azerbaijan</span>
                  </div>
                )}
            </div>
        </div>
    </>
  )
}

export default Footer