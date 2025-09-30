import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useGetBannersQuery, useGetCategoriesQuery, useGetParentCategoriesQuery } from '../../store/API';

const BannerSlider = () => {



  const { data: bannersD, isBannersLoading,  } = useGetBannersQuery();
  

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannersD?.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, [bannersD?.length, isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % bannersD?.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + bannersD?.length) % bannersD?.length);
  };

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
        {bannersD?.map((banner, index) => (
          <div key={banner.id} className="w-full flex-shrink-0   relative">
            <img 
              className="w-full object-cover rounded-lg lg:h-[400px] h-[35vh] lg:p-2" 
              src={`http://localhost:5056${banner.imageUrl}`}
              alt={`Banner ${index + 1}`} 
            />
            
            <div className="absolute top-[13%] left-[8%] lg:left-[10%] lg:top-[13%] flex flex-col gap-4 max-w-[80%]">
              <div className='flex flex-col gap-5'>
               <h1 className="inter text-2xl lg:text-3xl lg:hidden font-medium">
                {banner.title
                  .split(" ") // ✅ split string into words
                  .map((word, index) => (
                    <React.Fragment key={index}>
                      {word}{" "}
                      {(index + 1) % 3 === 0 && <br />}
                    </React.Fragment>
                  ))}
              </h1>
               <h1 className="hidden lg:block text-3xl font-semibold inter">
                {banner.title
                  .split(" ") // ✅ split string into words
                  .map((word, index) => (
                    <React.Fragment key={index}>
                      {word}{" "}
                      {(index + 1) % 3 === 0 && <br />}
                    </React.Fragment>
                  ))}
              </h1>

               <p className="hidden lg:block text-xl inter">
                {banner.description
                  .split(" ") 
                  .map((word, index) => (
                    <React.Fragment key={index}>
                      {word}{" "}
                      {(index + 1) % 5 === 0 && <br />}
                    </React.Fragment>
                  ))}
              </p>
              </div>

              <Link 
                to={`${banner.linkUrl}`}
                className="px-12 py-4 lg:py-3 rounded-lg text-lg inter lg:text-lg bg-gradient-to-b from-[#FD1206] to-[#DD1205] transition text-white font-medium w-fit hover:shadow-lg transform hover:scale-105"
              >
                {banner.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
      {bannersD?.length > 1 &&(
        <>

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
        { bannersD?.map((_, index) => (
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
      </>
      )}
        
        </div>
        
    </div>
  );
};

export default BannerSlider;