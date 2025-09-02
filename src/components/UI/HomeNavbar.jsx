import React from 'react'

const HomeNavbar = () => {
  return (
    <div className="hidden lg:block w-full bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-around">
                    
            {/* Left Section - Menu and Navigation */}
            <div className="flex items-center space-x-8">
              {/* Menu Icon */}
              <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200">
                <div className="flex flex-col space-y-1">
                  <div className="w-4 h-0.5 bg-gray-600"></div>
                  <div className="w-4 h-0.5 bg-gray-600"></div>
                  <div className="w-4 h-0.5 bg-gray-600"></div>
                </div>
                <span className="text-gray-600 inter">All category</span>
              </div>
                    
              {/* Navigation Links */}
              <nav className="flex items-center space-x-8">
                <a href="#" className="text-gray-700 inter cursor-pointer hover:text-gray-900 transition-colors duration-200">Home</a>
                <a href="#" className="text-gray-700 inter cursor-pointer hover:text-gray-900 transition-colors duration-200">About Us</a>
                <a href="#" className="text-gray-700 inter cursor-pointer hover:text-gray-900 transition-colors duration-200">Download Program</a>
                <a href="#" className="text-gray-700 inter cursor-pointer hover:text-gray-900 transition-colors duration-200">Contact</a>
              </nav>
            </div>
                    
            {/* Right Section - Language and Phone */}
            <div className="flex items-center space-x-6">
              {/* Language Dropdown */}
              <div className="flex items-center space-x-1 cursor-pointer hover:opacity-80 transition-opacity duration-200">
                <span className="text-gray-700 inter">English</span>
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
                    
              {/* Phone Number */}
              <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200">
                <img src="./Icons/phone.svg" alt="phone" className="w-4 h-4" />
                <span className="text-gray-700 inter">+994 50 xxx xx xx</span>
              </div>
            </div>
          </div>
        </div>
  )
}

export default HomeNavbar