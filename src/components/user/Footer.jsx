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
                        <a href="https://www.tiktok.com/@smartteam.az" target="_blank" rel="noopener noreferrer">
                           <svg width="40" height="40" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="100" cy="100" r="100" fill="#BDC3C7"/>
                              <path d="M138.7 64.6c-6.5-3.6-11.2-9.8-12.8-17h-0.1V42h-17.6v77.3c0 8.3-6.7 15-15 15s-15-6.7-15-15 6.7-15 15-15c1.7 0 3.3 0.3 4.9 0.9V87.5c-1.6-0.2-3.2-0.4-4.9-0.4-17.6 0-31.9 14.3-31.9 31.9s14.3 31.9 31.9 31.9 31.9-14.3 31.9-31.9V89.3c5.5 3.2 11.9 5.1 18.7 5.1V77.2c-2.1 0-4.1-0.3-6-0.7-2.1-0.5-4.2-1.3-6.1-2.4z" fill="#FFFFFF"/>
                            </svg>

                        </a>
                        <a href="https://www.instagram.com/smart_team.az" target="_blank" rel="noopener noreferrer">
                            <img className='w-10' src="./Icons/instagram.svg" alt="" />
                        </a>
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