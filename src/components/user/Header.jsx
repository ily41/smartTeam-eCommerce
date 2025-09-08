
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import Burger from './Burger'


const Header = () => {

  const [burgerVi, setBurgerVi] = useState(false)
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
    <header>
        <Burger burgerV={burgerVi} setBurgerV={setBurgerVi}/>
        <nav className='border-b-1 border-[#dee2e6]'>
            <div className='flex justify-between lg:justify-around lg:items-center p-6 items-center'>
                <Link to='/' className='flex lg:flex-1 cursor-pointer lg:justify-center gap-2'>
                    <img onClick={() => setBurgerVi(true)}className='md:hidden cursor-pointer' src="./Icons/burger.svg" alt="" />
                    <img className=' min-w-[100px] max-w-[230px] w-[18vh] lg:w-[20vh] ' src="./Icons/logo.svg" alt="" />

                </Link>

                <div className='hidden lg:flex-4 mr-20 lg:mr-0 lg:px-10 lg:block'>
                    <div className="max-w-4xl self-center mx-auto">
                        <div className="flex rounded-lg overflow-hidden shadow-sm hover:shadow-md border-1 border-[#dee2e6]">
                            <div className="flex items-center pl-3 bg-white">
                                <img 
                                    src="./Icons/search-icon-desktop.svg" 
                                    alt="Search" 
                                    className="w-5 h-5 text-gray-400"
                                />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search" 
                                className="flex-1 py-2 px-3   text-base border-none outline-none placeholder-gray-400 "
                            />
                        </div>
                    </div>
                </div>

                
                <div className='flex lg:flex-1 gap-3 pr-2 flex-shrink-0 lg:hidden'>
                  <Link to='/profile' className='flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                    <img className='scale-[1.1]' src="./Icons/profile.svg" alt="" />
                  </Link>
                  <Link to='/favorites' className='flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                    <img className='scale-[1.1]' src="./Icons/favorites.svg" alt="" />
                  </Link>
                  <Link to='/cart'  className='flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                    <img className='scale-[1.1]' src="./Icons/cart.svg" alt="" />
                  </Link>
                </div>


                <div className='hidden lg:flex gap-0 lg:gap-5 lg:flex-1  pr-2 '>
                    <Link to='/profile' className='flex flex-col gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                        <img src="./Icons/profile-gray.svg" alt="" />
                        <p className='text-gray-500 text-md whitespace-nowrap'>Profile</p>
                    </Link>

                    <Link to='/favorites' className='flex flex-col gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                        <img src="./Icons/favorites-gray.svg" alt="" />
                        <p className='text-gray-500 text-md whitespace-nowrap'>Favorites</p>
                    </Link>

                    <Link to='/cart' className='flex flex-col gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                        <img src="./Icons/cart-gray.svg" alt="" />
                        <p className='text-gray-500 text-md whitespace-nowrap'>My Cart</p>
                    </Link>
                    
                </div>
            </div>
        </nav>

        <div className="hidden md:block w-full bg-white border-y-1 border-gray-200 px-2 py-4">
          <div className="flex items-center justify-between max-w-[85vw] mx-auto">
                    
            {/* Left Section - Menu and Navigation */}
            <div className="flex items-center space-x-8">
              {/* Menu Icon */}
              <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200">
                <div className="flex flex-col space-y-1">
                  <div className="w-4 h-0.5 bg-gray-600"></div>
                  <div className="w-4 h-0.5 bg-gray-600"></div>
                  <div className="w-4 h-0.5 bg-gray-600"></div>
                </div>
                <span className="text-gray-600 inter text-sm lg:text-base ">All category</span>
              </div>
                    
              {/* Navigation Links */}
              <nav className="flex items-center space-x-6 lg:space-x-8">
                <Link to='/' className="text-gray-700 inter text-sm lg:text-base cursor-pointer hover:text-gray-900 transition-colors duration-200">Home</Link>
                <Link to='/about' className="text-gray-700 inter text-sm lg:text-base  cursor-pointer hover:text-gray-900 transition-colors duration-200">About Us</Link>
                <Link to='/download'  className="text-gray-700 inter text-sm lg:text-base  cursor-pointer hover:text-gray-900 transition-colors duration-200">Download Program</Link>
                <Link to='/contact'   className="text-gray-700 inter text-sm lg:text-base  cursor-pointer hover:text-gray-900 transition-colors duration-200">Contact</Link>
              </nav>
            </div>
                    
            {/* Right Section - Language and Phone */}
            <div className="flex items-center space-x-6">
              {/* Language Dropdown */}
              <div className="relative">
                <div 
                  onClick={() => setOpen(prev => !prev)} 
                  className="flex items-center space-x-1 cursor-pointer hover:opacity-80 transition-opacity duration-200"
                >
                  <span className="text-gray-700 inter text-sm lg:text-base">English</span>
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>

                {open && (
                  <div ref={dropdownRef} className="absolute top-full mt-1 right-0 bg-white border-[1.5px] border-black rounded-sm px-3 py-1 whitespace-nowrap z-10">
                    <span>Azerbaijan</span>
                  </div>
                )}
              </div>
              
              {/* Phone Number */}
              <div className="items-center space-x-2 cursor-pointer [@media(max-width:870px)]:hidden flex hover:opacity-80 transition-opacity duration-200">
                <img src="./Icons/phone.svg" alt="phone" className="w-4 h-4" />
                <span className="text-gray-700 inter text-sm lg:text-base">+994 50 xxx xx xx</span>
              </div>
            </div>
          </div>
        </div>

        

        


    </header>
  )
}

export default Header