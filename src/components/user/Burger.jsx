import { X } from 'lucide-react';
import React, { useEffect } from 'react'
import { Link } from 'react-router';

const Burger = ({burgerV, setBurgerV}) => {
    useEffect(() => {
      if (burgerV) {
        document.body.style.overflow = "hidden"; // stop scrolling
      } else {
        document.body.style.overflow = "auto"; // enable scrolling
      }


      return () => (document.body.style.overflow = "auto");
    }, [burgerV]);
    const isLogged = document.cookie

    if(burgerV) { 

      return (
        
        <section className='overflow-x-hidden '>
             <div className='w-screen h-screen bg-white fixed left-0 top-0 z-[100] flex flex-col'>
              <div className='flex items-center justify-between p-6 border-b border-gray-100'>
                <img 
                  src="./Icons/logo.svg" 
                  alt="SmartTeam Electronics" 
                  className='h-12 w-auto object-contain'
                />
                <button onClick = {() => setBurgerV(false)} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                  <X size={24} className='text-gray-600' />
                </button>
              </div>
        
              {/* Navigation items */}
              <nav className='flex-1 py-8 px-6'>
                <ul className='space-y-6'>
                  <li>
                    <Link
                      to='/'
                      onClick = {() => setBurgerV(false)}
                      className='block text-xl font-medium text-gray-800 hover:text-blue-600 transition-colors py-4 border-b border-gray-200'
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/about'
                      onClick = {() => setBurgerV(false)}
                      className='block text-xl font-medium text-gray-800 hover:text-blue-600 transition-colors py-4 border-b border-gray-200'
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/download'
                      onClick = {() => setBurgerV(false)}
                      className='block text-xl font-medium text-gray-800 hover:text-blue-600 transition-colors py-4 border-b border-gray-200'
                    >
                      Download Programs
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to='/contact'
                      className='block text-xl font-medium text-gray-800 hover:text-blue-600 transition-colors py-4 border-b border-gray-200'
                    >
                      Contact us
                    </Link>
                  </li>
                  {!isLogged &&
                    <li>
                      <Link 
                        to='/login'
                        className='block text-xl font-medium text-gray-800 hover:text-blue-600 transition-colors py-4 border-b border-gray-200'
                      >
                        Login
                      </Link>
                    </li>
                  } 
                  
                </ul>
              </nav>
            </div>
        </section>
        
      )}
    }

export default Burger