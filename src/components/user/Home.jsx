import React, { act, useEffect, useState } from 'react'
import MyMap from '../UI/googleMaps'
import SearchUI from '../UI/SearchUI'
import HomePageUI from '../UI/HomePageUI'
import { Link } from 'react-router'
import BannerSlider from '../UI/BannerSlider'
import {  useAddCartItemMutation, useGetBannersQuery, useGetHotDealsQuery, useGetParentCategoriesQuery, useGetRecommendedQuery, useGetSubCategoriesQuery } from '../../store/API'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

// Skeleton Components
const CategorySkeleton = () => (
  <div className="p-2 pl-3 flex gap-2 lg:mb-3 cursor-pointer lg:rounded-2xl min-w-[220px] lg:pr-5 animate-pulse">
    <div className="w-[24px] h-[24px] bg-gray-300 rounded"></div>
    <div className="h-4 bg-gray-300 rounded w-32"></div>
  </div>
);

const SubCategorySkeleton = () => (
  <div className="flex flex-col gap-4 animate-pulse">
    <div className="h-6 bg-gray-300 rounded w-48 mx-auto"></div>
    <div className="grid grid-cols-2 gap-x-10 gap-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-300 rounded w-24"></div>
      ))}
    </div>
  </div>
);

const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg border border-gray-200 p-3 animate-pulse">
    <div className="aspect-square bg-gray-300 rounded-lg mb-3"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

const HotDealCardSkeleton = () => (
  <div className="relative py-5 border border-gray-300 bg-white w-full flex flex-col items-center gap-2 animate-pulse">
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[140px] lg:max-w-[160px] h-32 bg-gray-300 rounded"></div>
    </div>
    <div className="h-4 bg-gray-300 rounded w-3/4 mx-2"></div>
    <div className="absolute top-2 right-2 w-8 h-8 bg-gray-300 rounded-full"></div>
  </div>
);

const Home = () => {
    const [hoveredCategorie, setHoveredCategorie] = useState(null)
    const [hoveredName, setHoveredName] = useState(null)
    const [activeCategorie,setActiveCategorie ] = useState(null)
    const { data: hotDeals, isLoading, error, refetch } = useGetHotDealsQuery();
    const { data: recommended, isLoading: isRecommendedLoading } = useGetRecommendedQuery({limit: 10});
    const [addCartItem, { isLoading: isAddingToCart, error: cartError }] = useAddCartItemMutation();
    
    

    const { data: parentCategories, isLoading: isParentLoading, refetchCategories } = useGetParentCategoriesQuery();
       const subCategories = hoveredCategorie 
       ? parentCategories?.find(cat => cat.id === hoveredCategorie)?.subCategories 
       : null;


    const handleAddToCart = async (id) => {
        if (!id) {
          console.error('Product not available');
          return;
        }
    
        try {
          const result = await addCartItem({
            productId: id,
            quantity: 1
          }).unwrap();
          console.log(result)
          
          
        } catch (err) {
          console.error('Failed to add product to cart:', err);
          
          if (err?.status === 401 || err?.data?.status === 401) {
            toast.error("Please log in first");
          } else {
            toast.error("Failed to add product to cart");
          }
        }
      };

    // Category icon mapping
    const getCategoryIcon = (slug) => {
        const iconMap = {
            'ticaret-avadanliqlari': './Icons/banner-commercial.svg',
            'komputerler': './Icons/banner-computers.svg',
            'noutbuklar': './Icons/banner-laptops.svg',
            'musahide-sistemleri': './Icons/banner-surveillance.svg',
            'komputer-avadanliqlari': './Icons/banner-mouse.svg',
            'ofis-avadanliqlari': './Icons/banner-printer.svg',
            'sebeke-avadanliqlari': './Icons/banner-global.svg',
        };
        return iconMap[slug] || './Icons/banner-commercial.svg';
    };

  return (
    <>
      <main className='bg-[#f7fafc] lg:pt-5'>
        
        <div className='p-5 pb-0 md:pb-5'>
            <SearchUI />
        </div>

        <section onMouseLeave={() => setHoveredCategorie(null)} className="lg:flex lg:w-[85vw]  lg:mx-auto lg:shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:rounded-lg lg:gap-5 lg:bg-white">
            
           <div className='hidden lg:mt-5 lg:m-4 lg:flex flex-col text-black mt-1 whitespace-nowrap'>
                {isParentLoading ? (
                  <>
                    {[...Array(7)].map((_, i) => (
                      <CategorySkeleton key={i} />
                    ))}
                  </>
                ) : (
                  parentCategories?.map((item) => {
                    return (
                      <Link 
                        key={item.id}
                        to={`/${item.slug}`}
                        onMouseEnter={() => {setHoveredCategorie(item.id); setHoveredName(item.name)}}
                        onClick={() => setActiveCategorie(activeCategorie === item.slug ? null : item.slug)}
                        className={`p-2 pl-3 flex gap-2 lg:mb-3 lg:hover:bg-[#ffe2e1] ${activeCategorie === item.slug ? 'bg-[#ffe2e1]' : ''} cursor-pointer lg:rounded-2xl min-w-[220px] lg:pr-5`}
                      >
                        <img className="w-[24px]" src={getCategoryIcon(item.slug)} alt="" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })
                )}
            </div>

            <div className={`${hoveredCategorie || activeCategorie ? 'lg:hidden' : ''} border-[#E0E0E0]`}>
                <BannerSlider />
            </div>
            
            <div className={`${activeCategorie || hoveredCategorie ? 'lg:flex' : 'hidden'} hidden border-l border-[#E0E0E0] flex-1 overflow-y-auto`}>
                {isParentLoading ? (
                  <div className="w-full p-10">
                    <SubCategorySkeleton />
                  </div>
                ) : (
                  <div className={`${activeCategorie || hoveredCategorie ? 'lg:flex' : 'hidden'} hidden border-l border-[#E0E0E0] flex-1 overflow-y-auto`}>
                      {isParentLoading ? (
                        <div className="w-full p-10">
                          <SubCategorySkeleton />
                        </div>
                      ) : (
                        <div className='w-full p-8 py-10 animate-fadeIn'>
                          <h1 className='text-2xl font-bold text-gray-800 mb-8 pb-4 border-b-2 border-[#E60C03] animate-slideDown'>{hoveredName}</h1>
                          <div className={`grid ${subCategories?.length <= 3 ? 'grid-cols-1' : subCategories?.length <= 6 ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
                            {subCategories?.map((item, index) => {
                              return (
                                <Link 
                                  key={item.id}
                                  to={`/products/${item.slug || '#'}`}
                                  className='group relative flex items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:border-[#E60C03] hover:shadow-lg hover:scale-[1.03] transition-all duration-300 cursor-pointer animate-slideIn overflow-hidden'
                                  style={{ animationDelay: `${index * 50}ms` }}
                                >
                                  {/* Animated background on hover */}
                                  <div className='absolute inset-0 bg-gradient-to-r from-[#ffe2e1] to-[#fff5f5] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                                  {/* Text */}
                                  <div className='relative z-10 flex-1'>
                                    <p className='text-base font-medium text-gray-700 group-hover:text-[#E60C03] transition-all duration-300'>{item.name}</p>
                                  </div>

                                  {/* Arrow icon */}
                                  <div className='relative z-10 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300'>
                                    <svg className='w-5 h-5 text-[#E60C03]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                    </svg>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                          
                          <style jsx>{`
                            @keyframes fadeIn {
                              from {
                                opacity: 0;
                              }
                              to {
                                opacity: 1;
                              }
                            }

                            @keyframes slideDown {
                              from {
                                opacity: 0;
                                transform: translateY(-10px);
                              }
                              to {
                                opacity: 1;
                                transform: translateY(0);
                              }
                            }

                            @keyframes slideIn {
                              from {
                                opacity: 0;
                                transform: translateX(-20px);
                              }
                              to {
                                opacity: 1;
                                transform: translateX(0);
                              }
                            }

                            .animate-fadeIn {
                              animation: fadeIn 0.3s ease-out;
                            }

                            .animate-slideDown {
                              animation: slideDown 0.4s ease-out;
                            }

                            .animate-slideIn {
                              animation: slideIn 0.4s ease-out forwards;
                              opacity: 0;
                            }
                          `}</style>
                        </div>
                      )}
                  </div>
                )}
            </div>
        </section>


        <section>
          <section className='mt-12 mx-4 lg:w-[85vw] lg:mx-auto'>
          <div className='text-xl font-semibold mb-6'>
            <h1>Featured Brands</h1>
          </div>
          
          <div className='relative overflow-hidden bg-white rounded-lg border border-gray-200 p-6'>
            <div className='flex animate-scroll gap-8 items-center'>
              {/* First set of logos */}
              <div className='flex gap-8 items-center min-w-max'>
                <img src='./slider/slider1.svg' alt='LG' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider2.svg' alt='Dell' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider3.svg' alt='' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider4.svg' alt='Oppo' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider5.svg' alt='Asus' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider6.svg' alt='Samsung' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider7.svg' alt='HP' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider8.svg' alt='Lenovo' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider9.svg' alt='Apple' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider10.svg' alt='Acer' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider11.svg' alt='Sony' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider12.svg' alt='Microsoft' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className='flex gap-8 items-center min-w-max'>
                <img src='./slider/slider1.svg' alt='LG' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider2.svg' alt='Dell' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider3.svg' alt='' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider4.svg' alt='Oppo' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider5.svg' alt='Asus' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider6.svg' alt='Samsung' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider7.svg' alt='HP' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider8.svg' alt='Lenovo' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider9.svg' alt='Apple' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider10.svg' alt='Acer' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider11.svg' alt='Sony' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
                <img src='./slider/slider12.svg' alt='Microsoft' className='h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all' />
              </div>
            </div>
          </div>
          
          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            
            .animate-scroll {
              animation: scroll 30s linear infinite;
            }
            
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>
        </section>
        </section>

        <section className='mt-12 mx-4 inter lg:hidden'>
            <div className='flex justify-between text-xl font-semibold'>
                <h1>Categories</h1>
            </div>

            <div className='grid grid-cols-3 mt-10 gap-5 text-sm'>
                <div className='justify-center md:justify-start flex col-span-3 items-center bg-white lg:hidden rounded-lg border border-[#DEE2E6] p-4'>
                  <div className='flex flex-row gap-4'>
                    <div className='w-full h-full flex-shrink-0 my-auto object-cover max-w-[140px] md:max-w-[160px]'>
                      <img className='w-full object-contain max-h-[160px]' src="./deals/network.svg" alt="" />
                    </div>
                    <div className='flex flex-col w-full text-start self-start'>
                      <p className='text-xl inter mb-1 md:text-2xl'>Network Equipment</p>
                      <p className='text-sm md:text-base text-[#AFB0B1]'>Reliable routers, switches, and cabling systems for fast, stable, and secure connectivity. Scalable solutions to keep your business connected and future-ready.</p>
                    </div>
                  </div>
                </div>

              <div className='bg-white flex justify-center items-center flex-col gap-4 rounded-lg border border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='min-h-[120px]' src="./deals/homeComputer.svg" alt="" />
                </div>
                <p className='text-center'>Computers</p>
              </div>
              <div className='bg-white flex justify-center items-center flex-col gap-4 rounded-lg border border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='min-h-[120px]' src="./deals/homeLaptop.svg" alt="" />
                </div>
                <p className='text-center'>Laptops</p>
              </div>
              <div className='bg-white flex justify-center items-center flex-col gap-4 rounded-lg border border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='min-h-[120px]' src="./deals/homePrinter.svg" alt="" />
                </div>
                <p className='text-center'>Office Equipment</p>
              </div>
              <div className='bg-white flex justify-center items-center flex-col gap-4 rounded-lg border border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='min-h-[120px]' src="./deals/homeBarcode.svg" alt="" />
                </div>
                <p className='text-center'>Commercial Equipment</p>
              </div>
              <div className='bg-white flex justify-center items-center flex-col gap-4 rounded-lg border border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='min-h-[120px]' src="./deals/homeSurveillance.svg" alt="" />
                </div>
                <p className='text-center'>Surveillance system</p>
              </div>
              <div className='bg-white self-center justify-center items-center flex flex-col gap-4 rounded-lg border border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='min-h-[120px]' src="./deals/homeKeyboard.svg" alt="" />
                </div>
                <p className='text-center'>Computer Equipment</p>
              </div>
            </div>
        </section>

         
        

       <section className='lg:flex lg:bg-white lg:mt-8 lg:rounded-lg lg:w-[85vw] mx-auto lg:border lg:border-gray-300 px-4 lg:pr-0'>
        {/* Left section with timer */}
        <div className='py-4 lg:pr-9 lg:border-r my-auto lg:border-gray-300 lg:min-w-[200px]'>
          <div className='inter py-4 lg:border-t-0 lg:p-0'>
            <h1 className='text-xl font-semibold mb-1'>Deals and offers</h1>
          </div>
                    
          {/* Timer - hidden on mobile, shown on lg+ */}
          <div className='hidden lg:block text-[#8C8C8C]'>
            <p>Get the hottest discounts on top</p>
            <p>electronics — limited-time offers</p>
            <p>you don't want to miss!</p>
          </div>

          <div className='hidden lg:block'>
            <Link to='/products/hot-deals'className='flex gap-2 text-[#E60C03] font-semibold mt-3'>Explore now <img src="./Icons/rightarrowHome.svg" alt="" /></Link>
          </div>
        </div>
                    
        {/* Products grid - responsive */}
        <div className='flex-1'>
          <div className='flex'>
            {/* Mobile: Show 2 items */}
            <div className='flex sm:hidden w-full'>
              {isLoading ? (
                <>
                  <HotDealCardSkeleton />
                  <HotDealCardSkeleton />
                </>
              ) : (                          
                hotDeals?.slice(0, 2).map(item => (
                  <Link to={`/details/${item.id}`} 
                    key={item.id} 
                    className='relative py-5 inter border border-gray-300 lg:border-t-0 lg:border-b-0 bg-white w-full flex flex-col items-center gap-2'
                  >
                    <div className='w-full flex justify-center'>
                      <img 
                        className='w-full max-w-[140px] h-auto object-contain px-2' 
                        src={`http://smartteamaz-001-site1.qtempurl.com${item.primaryImageUrl}`} 
                        alt="Product" 
                      />
                    </div>
                    <p className='text-md font-semibold text-center px-2 leading-tight'>{item.name}</p>
                    <div className='absolute top-2 right-2 w-8 h-8 p-6 flex justify-center items-center rounded-full bg-red-500 text-white inter'>
                      <p className='text-xs font-semibold'>-{item.discountPercentage}%</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
            
            {/* Desktop (lg+): Show 4 items */}
            <div className='hidden lg:flex w-full'>
              {isLoading ? (
                <>
                  <HotDealCardSkeleton />
                  <HotDealCardSkeleton />
                  <HotDealCardSkeleton />
                  <HotDealCardSkeleton />
                </>
              ) : (
                hotDeals?.slice(0, 4).map(item => (
                  <Link to={`/details/${item.id}`}  
                    key={item.id} 
                    className='relative py-5 inter border border-gray-300 border-t-0 border-b-0 bg-white w-full flex flex-col items-center gap-2 min-h-[15vh] p-3'
                  >
                    <div className='w-full flex justify-center'>
                      <img 
                        className='w-full max-w-[160px] h-auto object-contain px-2' 
                        src={`http://smartteamaz-001-site1.qtempurl.com${item.primaryImageUrl}`} 
                        alt="Product" 
                      />
                    </div>
                    <p className='text-md font-semibold text-center px-2 leading-tight'>{item.name}</p>
                    <div className='absolute top-2 right-2 w-8 h-8 p-6 flex justify-center items-center rounded-full bg-red-500 text-white inter'>
                      <p className='text-xs font-semibold'>-{item.discountPercentage}%</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

        <section className='mt-12 mx-4 lg:w-[85vw] lg:mx-auto'>
            <div className='flex justify-between text-xl font-semibold'>
                <h1>Recommended items</h1>
                <Link to='/products/recommended'><h1 className='text-[#E60C03] cursor-pointer text-lg'>More</h1></Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 [@media(min-width:1300px)]:grid-cols-5 lg:grid-cols-4 gap-2 mt-5 whitespace-nowrap">
              {isRecommendedLoading ? (
                <>
                  {[...Array(8)].map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </>
              ) : (
                recommended?.recentlyAdded.map(item => (
                  <HomePageUI key={item.id} deal={false} product={item} url={item.primaryImageUrl} handleAddToCart={handleAddToCart} isAddingToCart={isAddingToCart} />
                ))
              )}
            </div>
        </section>

        <section className='mt-12 mx-4 lg:w-[85vw] lg:mx-auto'>
            <div className='flex justify-between text-xl font-semibold'>
                <h1>Hot Deals</h1>
                <Link to='/products/hot-deals' className='text-[#E60C03] cursor-pointer text-lg'>More</Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 [@media(min-width:1300px)]:grid-cols-5 lg:grid-cols-4 gap-2 mt-5 whitespace-nowrap">
              {isLoading ? (
                <>
                  {[...Array(8)].map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </>
              ) : (
                hotDeals?.map(item => (
                  <HomePageUI key={item.id} deal={true} product={item} url={item.primaryImageUrl} handleAddToCart={handleAddToCart} isAddingToCart={isAddingToCart}/>
                ))
              )}
            </div>
        </section>

        <section className='py-12 mx-4  lg:w-[85vw] lg:mx-auto'>
            <div className='text-2xl mb-8 font-semibold'>
                <h1>Location</h1>
            </div>
            <MyMap />
        </section>

      </main>
    </>
  )
}



export default Home