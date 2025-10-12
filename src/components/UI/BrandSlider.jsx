import React, { useRef, useState, useEffect } from 'react';

const InfiniteBrandSlider = () => {
  const brandsImg = [
    { src: './slider/slider1.svg', alt: 'Hem', slug: 'hem' },
    { src: './slider/slider2.svg', alt: 'Hp', slug: 'hp' },
    { src: './slider/slider3.svg', alt: 'Dell', slug: 'dell' },
    { src: './slider/slider4.svg', alt: 'Lg', slug: 'lg' },
    { src: './slider/slider5.svg', alt: 'Xprinter', slug: 'xprinter' },
    { src: './slider/slider6.svg', alt: 'Lenovo', slug: 'lenovo' },
    { src: './slider/slider7.svg', alt: 'Western Digital', slug: 'westernDigital' },
    { src: './slider/slider8.svg', alt: 'Acer', slug: 'acer' },
    { src: './slider/slider9.svg', alt: 'Hikvision', slug: 'hikvision' },
    { src: './slider/slider10.svg', alt: 'Unv', slug: 'unv' },
    { src: './slider/slider11.svg', alt: 'Canon', slug: 'canon' },
    { src: './slider/slider12.svg', alt: 'Seagate', slug: 'seagate' }
  ];

  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollPosition = useRef(0);
  const animationFrameId = useRef(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize scroll position to middle set
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Wait for images to load
    const timer = setTimeout(() => {
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
      scrollPosition.current = singleSetWidth;
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      if (!isDragging) {
        const singleSetWidth = container.scrollWidth / 3;
        scrollPosition.current += 0.5; // Scroll speed

        // Seamless infinite loop
        if (scrollPosition.current >= singleSetWidth * 2) {
          scrollPosition.current = singleSetWidth;
        } else if (scrollPosition.current < singleSetWidth) {
          scrollPosition.current = singleSetWidth * 2;
        }

        container.scrollLeft = scrollPosition.current;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isDragging]);

  // Touch/Mouse start
  const handleStart = (e) => {
    if (!isMobile) return;
    
    setIsDragging(true);
    setDragDistance(0);
    
    const pageX = e.type === 'touchstart' ? e.touches[0].pageX : e.pageX;
    setStartX(pageX);
    setScrollLeft(containerRef.current.scrollLeft);
    scrollPosition.current = containerRef.current.scrollLeft;
  };

  // Touch/Mouse move
  const handleMove = (e) => {
    if (!isMobile || !isDragging) return;

    const pageX = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX;
    const distance = pageX - startX;
    setDragDistance(Math.abs(distance));
    
    const newScroll = scrollLeft - distance;
    const singleSetWidth = containerRef.current.scrollWidth / 3;

    // Update position with infinite wrapping
    if (newScroll >= singleSetWidth * 2) {
      containerRef.current.scrollLeft = singleSetWidth + (newScroll - singleSetWidth * 2);
      setScrollLeft(containerRef.current.scrollLeft);
      setStartX(pageX);
      scrollPosition.current = containerRef.current.scrollLeft;
    } else if (newScroll < singleSetWidth) {
      containerRef.current.scrollLeft = singleSetWidth * 2 - (singleSetWidth - newScroll);
      setScrollLeft(containerRef.current.scrollLeft);
      setStartX(pageX);
      scrollPosition.current = containerRef.current.scrollLeft;
    } else {
      containerRef.current.scrollLeft = newScroll;
      scrollPosition.current = newScroll;
    }
  };

  // Touch/Mouse end
  const handleEnd = () => {
    if (!isMobile) return;
    setIsDragging(false);
  };

  // Handle brand click
  const handleBrandClick = (e, slug) => {
    // Prevent click if dragged more than 5px
    if (dragDistance > 5) {
      e.preventDefault();
      return;
    }
    
    if (slug) {
      console.log('Navigate to:', slug);
    }
  };

  return (
    <>
      <div className="text-xl hidden md:block font-semibold mb-6">
        <h1>Featured Brands</h1>
      </div>

      <div className="relative overflow-hidden bg-white rounded-lg border border-gray-200 py-3 md:p-6">
        <div
          ref={containerRef}
          className="flex gap-8 items-center overflow-x-auto scrollbar-hide select-none"
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
        >
          {/* Render 3 sets for seamless infinite scroll */}
          {[0, 1, 2].map((setIndex) => (
            <div key={`set-${setIndex}`} className="flex gap-8 py-1 items-center brand-set">
              {brandsImg.map((brand, idx) =>
                brand.slug ? (
                  <a
                    key={`set${setIndex}-${idx}`}
                    href={`/products/brand/${brand.slug}`}
                    onClick={(e) => handleBrandClick(e, brand.slug)}
                    className="pointer-events-auto flex-shrink-0"
                  >
                    <img
                      src={brand.src}
                      alt={brand.alt}
                      className="h-12 w-auto min-w-[80px] object-contain grayscale hover:grayscale-0 transition-transform duration-300 hover:scale-110"
                      draggable="false"
                    />
                  </a>
                ) : (
                  <div key={`set${setIndex}-${idx}`} className="flex-shrink-0">
                    <img
                      src={brand.src}
                      alt={brand.alt}
                      className="h-12 w-auto min-w-[80px] object-contain grayscale hover:grayscale-0 transition-transform duration-300 hover:scale-110 pointer-events-none"
                      draggable="false"
                    />
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default InfiniteBrandSlider;