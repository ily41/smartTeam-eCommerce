
import React, { useState } from 'react'
import { Link } from 'react-router'


const Header = () => {
    
  return (
    <header>
        <nav >
            <div className='flex justify-between lg:justify-around lg:items-center p-6 items-center'>
                <Link to='/' className='flex lg:flex-1 cursor-pointer lg:justify-center gap-2'>
                    <img className='lg:hidden' src="./Icons/burger.svg" alt="" />
                    <img className=' min-w-[100px] max-w-[230px] w-[13vh] lg:w-[20vh] ' src="./Icons/logo.svg" alt="" />

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
                  <div className='flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                    <img className='scale-[1.1]' src="./Icons/profile.svg" alt="" />
                  </div>
                  <div className='flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                    <img className='scale-[1.1]' src="./Icons/favorites.svg" alt="" />
                  </div>
                  <div className='flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                    <img className='scale-[1.1]' src="./Icons/cart.svg" alt="" />
                  </div>
                </div>


                <div className='hidden lg:flex gap-0 lg:gap-5 lg:flex-1  pr-2 '>
                    <div className='flex flex-col gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                        <img src="./Icons/profile-gray.svg" alt="" />
                        <p className='text-gray-500 text-md whitespace-nowrap'>Profile</p>
                    </div>

                    <div className='flex flex-col gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                        <img src="./Icons/favorites-gray.svg" alt="" />
                        <p className='text-gray-500 text-md whitespace-nowrap'>Favorites</p>
                    </div>

                    <div className='flex flex-col gap-1 items-center cursor-pointer hover:opacity-80 transition-opacity duration-200'>
                        <img src="./Icons/cart-gray.svg" alt="" />
                        <p className='text-gray-500 text-md whitespace-nowrap'>My Cart</p>
                    </div>
                    
                </div>
            </div>
        </nav>

        

        


    </header>
  )
}

export default Header