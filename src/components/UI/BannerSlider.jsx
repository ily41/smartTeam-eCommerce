import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const BannerSlider = () => {
  // Mock banner data - replace with your API data


  
  const banners = [
    {
      id: 1,
      title: "Where Quality Meets",
      subtitle: "Convenience", 
      description: "Discover top deals, trending styles, and everyday essentials—all in one place.",
      buttonText: "Shop now",
      buttonLink: "/login",
      image: "./Banners/headerBanner.svg"
    },
    {
      id: 2,
      title: "Latest trending",
      subtitle: "Electronic items",
      description: "Find the best deals on cutting-edge technology and modern gadgets.",
      buttonText: "Explore now",
      buttonLink: "/products",
      image: "./Banners/headerBanner.svg"
    },
    {
      id: 3,
      title: "Premium Quality",
      subtitle: "Guaranteed",
      description: "Shop with confidence knowing every product meets our high standards.",
      buttonText: "Shop now",
      buttonLink: "/shop",
      image: "./Banners/headerBanner.svg"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [banners.length, isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + banners.length) % banners.length);
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div className='w-full h-full '>
        <div 
      className="w-full relative flex-1 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Banner Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-fit"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div key={banner.id} className="w-full flex-shrink-0   relative">
            <img 
              className="w-full object-cover rounded-lg lg:h-[400px] h-[35vh] lg:p-2" 
              src={banner.image} 
              alt={`Banner ${index + 1}`} 
            />
            
            <div className="absolute top-[13%] left-[8%] lg:left-[10%] lg:top-[13%] flex flex-col gap-4 max-w-[80%]">
              <div>
                <h1 className="inter text-2xl lg:text-3xl lg:hidden font-medium">
                  {banner.title}
                </h1>
                <p className="inter text-2xl lg:text-4xl lg:hidden font-bold">
                  {banner.subtitle}
                </p>
                <h1 className="hidden lg:block text-3xl font-semibold inter">
                  {banner.title}
                </h1>
                <h1 className="hidden lg:block text-3xl mb-3 font-semibold inter">
                  {banner.subtitle}
                </h1>
                <p className="hidden lg:block inter font-normal">
                  {banner.description}
                </p>
              </div>

              <Link 
                to={banner.buttonLink} 
                className="px-12 py-4 lg:py-3 rounded-lg text-lg inter lg:text-lg bg-gradient-to-b from-[#FD1206] to-[#DD1205] transition text-white font-medium w-fit hover:shadow-lg transform hover:scale-105"
              >
                {banner.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
      <button
        onClick={prevSlide}
        className="hidden lg:block absolute top-1/2 left-8 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="hidden lg:block absolute top-1/2 right-8 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              currentSlide === index 
                ? 'bg-white shadow-lg scale-110' 
                : 'bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

        </div>
    </div>
  );
};

export default BannerSlider;