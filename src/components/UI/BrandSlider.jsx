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
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const animationRef = useRef(null);

  // Detect if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Infinite scroll logic
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollSpeed = 0.4; // pixels per frame

    const animate = () => {
      if (!isDragging) {
        const currentScroll = container.scrollLeft;
        const newScroll = currentScroll + scrollSpeed;
        
        // Get the width of one set of brands
        const firstChild = container.querySelector('.brand-set');
        if (firstChild) {
          const setWidth = firstChild.offsetWidth;
          
          // Reset when first set is completely off screen
          if (newScroll >= setWidth) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft = newScroll;
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging]);

  // Touch handlers (mobile only)
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isMobile || !isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    setIsDragging(false);
  };

  const handleBrandClick = (e, slug) => {
    if (isDragging) {
      e.preventDefault();
    } else if (slug) {
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
          ref={scrollRef}
          className="flex gap-8 items-center overflow-x-auto scrollbar-hide select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex gap-8 py-1 items-center brand-set">
            {brandsImg.map((brand, idx) =>
              brand.slug ? (
                <a
                  key={`set1-${idx}`}
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
                <div key={`set1-${idx}`} className="flex-shrink-0">
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
          
          <div className="flex gap-8 items-center">
            {brandsImg.map((brand, idx) =>
              brand.slug ? (
                <a
                  key={`set2-${idx}`}
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
                <div key={`set2-${idx}`} className="flex-shrink-0">
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