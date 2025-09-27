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
    const { data: recommended, isLoading: isRecommendedLoading } = useGetRecommendedQuery();
    const [addCartItem, { isLoading: isAddingToCart, error: cartError }] = useAddCartItemMutation();
    

    const { data: parentCategories, isLoading: isParentLoading, refetchCategories } = useGetParentCategoriesQuery();
    const { data: subCategories, isLoading: isSubLoading, refetch: refetchSub } =
    useGetSubCategoriesQuery(hoveredCategorie, { skip: !hoveredCategorie });


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
      <main className=' bg-[#f7fafc] lg:pt-5'>
        
        <div className='p-5 pb-0 md:pb-5'>
            <SearchUI />
        </div>

        <section onMouseLeave={() => setHoveredCategorie(null)} className="lg:flex lg:w-[85vw] mt-10 lg:max-h-[400px] lg:mx-auto lg:shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:rounded-lg lg:gap-5 lg:bg-white">
            
           <div className='hidden lg:mt-5 lg:m-4 lg:flex flex-col text-black mt-1 whitespace-nowrap'>
                {isParentLoading ? (
                  // Skeleton for parent categories
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
                        to={`/subcategories/${item.slug}`}
                        onMouseEnter={() => {setHoveredCategorie(item.id), setHoveredName(item.name)}}
                        onClick={() => setActiveCategorie(activeCategorie === item.slug ? null : item.slug)}
                        className={`p-2 pl-3 flex gap-2 lg:mb-3 lg:hover:bg-[#ffe2e1] ${activeCategorie === item.slug && 'bg-[#ffe2e1]'} cursor-pointer lg:rounded-2xl min-w-[220px] lg:pr-5`}
                      >
                        <img className="w-[24px]" src={getCategoryIcon(item.slug)} alt="" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })
                )}
            </div>

            <div className={` lg:${hoveredCategorie && 'hidden border-l-1' || activeCategorie && 'hidden border-l-1' }  border-[#E0E0E0]`}>
                <BannerSlider />
            </div>
            
            <div className={`${activeCategorie ? 'lg:flex' : hoveredCategorie ? 'lg:flex' : 'hidden' } hidden gap-10 p-10 border-l-1 whitespace-nowrap flex-wrap border-[#E0E0E0]`}>
                {isSubLoading ? (
                  <SubCategorySkeleton />
                ) : (
                  <div className='flex flex-col gap-4 '>
                    <h1 className='text-xl font-semibold text-center'>{hoveredName}</h1>
                    <div className={`grid ${subCategories?.length < 4 ? 'grid-cols-1' : 'grid-cols-2'} gap-x-10 gap-y-4`}>
                      {subCategories?.map(item => {
                        return (
                          <div key={item.id} className=''>
                            <p className='text-lg text-center'>{item.name}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
            </div>
        </section>

        <section className='mt-12 mx-4 inter lg:hidden'>
            <div className='flex justify-between text-xl font-semibold'>
                <h1>Categories</h1>
            </div>

            <div className='grid grid-cols-3 mt-10 gap-5 text-sm '>
                <div className='justify-center md:justify-start flex col-span-3 items-center bg-white lg:hidden rounded-lg border-1 border-[#DEE2E6] p-4'>
                  <div className='flex flex-row gap-4 '>
                    <div className='w-full h-full flex-2 my-auto object-cover'>
                      <img className=' w-full flex-shrink-0 object-contain max-h-[160px]' src="./deals/network.svg" alt="" />
                    </div>
                    <div className='flex flex-col flex-3 w-full text-start self-start'>
                      <p className=' text-xl inter mb-1 md:text-2xl'>Network Equipment</p>
                      <p className='text-md text-[#AFB0B1] md:text-lg '>Reliable routers, switches, and cabling systems for fast, stable, and secure connectivity. Scalable solutions to keep your business connected and future-ready.</p>
                    </div>
                  </div>
                </div>

              <div className='bg-white flex justify-center items-center flex-col gap-4 rounded-lg border-1 border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='min-h-[120px]' src="./deals/homeComputer.svg" alt="" />
                </div>
                <p className='text-center'>Computers</p>
              </div>
              <div className='bg-white flex justify-center items-center flex-col gap-4 rounded-lg border-1 border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='min-h-[120px]' src="./deals/homeLaptop.svg" alt="" />
                </div>
                <p className='text-center'>Laptops</p>
              </div>
              <div className='bg-white flex justify-center items-center flex-col gap-4 rounded-lg border-1 border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='min-h-[120px]' src="./deals/homePrinter.svg" alt="" />
                </div>
                <p className='text-center'>Office Equipment</p>
              </div>
              <div className='bg-white flex justify-center items-center flex-col gap-4 rounded-lg border-1 border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='min-h-[120px]' src="./deals/homeBarcode.svg" alt="" />
                </div>
                <p className='text-center'>Commercial Equipment</p>
              </div>
              <div className='bg-white flex justify-center items-center flex-col gap-4 rounded-lg border-1 border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='min-h-[120px]' src="./deals/homeSurveillance.svg" alt="" />
                </div>
                <p className='text-center'>Surveillance system</p>
              </div>
              <div className='bg-white flex self-center justify-center items-center flex-col gap-4 rounded-lg border-1 border-[#DEE2E6] p-4'>
                <div className='max-w-[130px]'>
                  <img className='min-h-[120px]' src="./deals/homeKeyboard.svg" alt="" />
                </div>
                <p className='text-center'>Computer Equipment</p>
              </div>
            </div>
        </section>

         <section className='hidden mt-12 bg-white lg:grid grid-cols-6 lg:w-[85vw] lg:mx-auto p-6 rounded-lg shadow-lg'>
           <img className='w-full h-full object-cover col-span-2 rounded-lg' src="./Banners/left-side.svg" alt="" />
           
           <div className="col-span-4 grid grid-cols-2 gap-4 ml-4">
             
             <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
               <div className="flex justify-between items-start mb-3">
                 <div>
                   <h3 className="font-semibold text-gray-800">Smart watches</h3>
                   <p className="text-sm text-gray-500">From<br />USD 19</p>
                 </div>
                 <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                   <div className="w-12 h-12 bg-black rounded-lg relative">
                     <div className="w-10 h-6 bg-white rounded-sm absolute top-1 left-1"></div>
                     <div className="w-8 h-1 bg-gray-400 absolute bottom-2 left-2"></div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
               <div className="flex justify-between items-start mb-3">
                 <div>
                   <h3 className="font-semibold text-gray-800">Cameras</h3>
                   <p className="text-sm text-gray-500">From<br />USD 89</p>
                 </div>
                 <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                   <div className="w-12 h-8 bg-black rounded-md relative">
                     <div className="w-4 h-4 bg-blue-600 rounded-full absolute top-1 right-1"></div>
                     <div className="w-6 h-2 bg-gray-600 rounded absolute bottom-1 left-1"></div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
               <div className="flex justify-between items-start mb-3">
                 <div>
                   <h3 className="font-semibold text-gray-800">Gaming set</h3>
                   <p className="text-sm text-gray-500">From<br />USD 35</p>
                 </div>
                 <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                   <div className="w-12 h-10 bg-black rounded-full relative">
                     <div className="w-8 h-6 bg-blue-500 rounded-full absolute top-1 left-2"></div>
                     <div className="w-2 h-4 bg-gray-600 absolute bottom-1 left-1"></div>
                     <div className="w-2 h-4 bg-gray-600 absolute bottom-1 right-1"></div>
                   </div>
                 </div>
               </div>
             </div>
       
             <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
               <div className="flex justify-between items-start mb-3">
                 <div>
                   <h3 className="font-semibold text-gray-800">Laptops & PC</h3>
                   <p className="text-sm text-gray-500">From<br />USD 340</p>
                 </div>
                 <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                   <div className="w-12 h-8 bg-gray-800 rounded relative">
                     <div className="w-10 h-6 bg-orange-400 rounded-sm absolute top-1 left-1"></div>
                     <div className="w-8 h-1 bg-gray-600 absolute bottom-1 left-2"></div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
               <div className="flex justify-between items-start mb-3">
                 <div>
                   <h3 className="font-semibold text-gray-800">Headphones</h3>
                   <p className="text-sm text-gray-500">From<br />USD 10</p>
                 </div>
                 <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                   <div className="relative">
                     <div className="w-8 h-8 border-4 border-gray-300 rounded-full"></div>
                     <div className="w-2 h-6 bg-gray-300 absolute -top-3 left-3"></div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
               <div className="flex justify-between items-start mb-3">
                 <div>
                   <h3 className="font-semibold text-gray-800">Smartphones</h3>
                   <p className="text-sm text-gray-500">From<br />USD 19</p>
                 </div>
                 <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                   <div className="w-8 h-12 bg-gradient-to-br from-teal-400 to-orange-400 rounded-lg relative">
                     <div className="w-6 h-8 bg-black rounded-sm absolute top-2 left-1 opacity-20"></div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
               <div className="flex justify-between items-start mb-3">
                 <div>
                   <h3 className="font-semibold text-gray-800">Smart watches</h3>
                   <p className="text-sm text-gray-500">From<br />USD 90</p>
                 </div>
                 <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                   <div className="w-10 h-12 bg-black rounded-lg relative">
                     <div className="w-2 h-8 bg-gray-600 absolute top-2 left-1"></div>
                     <div className="w-2 h-8 bg-gray-600 absolute top-2 right-1"></div>
                     <div className="w-6 h-6 bg-white rounded absolute top-3 left-2"></div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
               <div className="flex justify-between items-start mb-3">
                 <div>
                   <h3 className="font-semibold text-gray-800">Electric kettle</h3>
                   <p className="text-sm text-gray-500">From<br />USD 240</p>
                 </div>
                 <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                   <div className="w-8 h-10 bg-gradient-to-b from-red-500 to-red-600 rounded-lg relative">
                     <div className="w-2 h-3 bg-black rounded absolute top-1 right-1"></div>
                     <div className="w-6 h-6 bg-red-400 rounded-full absolute bottom-1 left-1"></div>
                   </div>
                 </div>
               </div>
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
            <span className='flex gap-2 text-[#E60C03] font-semibold mt-3'>Explore now <img src="./Icons/rightarrowHome.svg" alt="" /></span>
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
                  <div 
                    key={item.id} 
                    className='relative py-5 inter border border-gray-300 lg:border-t-0 lg:border-b-0 bg-white w-full flex flex-col items-center gap-2'
                  >
                    <div className='w-full flex justify-center'>
                      <img 
                        className='w-full max-w-[140px] h-auto object-contain px-2' 
                        src={`http://localhost:5056${item.primaryImageUrl}`} 
                        alt="Smart watch" 
                      />
                    </div>
                    <p className='text-md font-semibold text-center px-2 leading-tight'>{item.name}</p>
                    <div className='absolute top-2 right-2 w-8 h-8 p-6 flex justify-center items-center rounded-full bg-red-500 text-white inter'>
                      <p className='text-xs font-semibold '>{item.discountPercentage}%</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Tablet (sm to lg): Show 3 items */}
            <div className='hidden sm:flex lg:hidden w-full'>
              {isLoading ? (
                <>
                  <HotDealCardSkeleton />
                  <HotDealCardSkeleton />
                  <HotDealCardSkeleton />
                </>
              ) : (
                hotDeals?.slice(0, 3).map(item => (
                  <div 
                    key={item.id} 
                    className='relative py-5 inter border border-gray-300 bg-white w-full flex flex-col items-center gap-2'
                  >
                    <div className='w-full flex justify-center'>
                      <img 
                        className='w-full max-w-[140px] h-auto object-contain px-2' 
                        src={`http://localhost:5056${item.primaryImageUrl}`} 
                        alt="Smart watch" 
                      />
                    </div>
                    <p className='text-md font-semibold text-center px-2 leading-tight'>{item.name}</p>
                    <div className='absolute top-2 right-2 w-8 h-8 p-6 flex justify-center items-center rounded-full bg-red-500 text-white inter'>
                      <p className='text-xs font-semibold'>{item.discountPercentage}%</p>
                    </div>
                  </div>
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
                  <div 
                    key={item.id} 
                    className='relative py-5 inter border border-gray-300 border-t-0 border-b-0 bg-white w-full flex flex-col items-center gap-2 min-h-[15vh] p-3'
                  >
                    <div className='w-full flex justify-center'>
                      <img 
                        className='w-full max-w-[160px] h-auto object-contain px-2' 
                        src={`http://localhost:5056${item.primaryImageUrl}`} 
                        alt="Smart watch" 
                      />
                    </div>
                    <p className='text-md font-semibold text-center px-2 leading-tight'>{item.name}</p>
                    <div className='absolute top-2 right-2 w-8 h-8 p-6 flex justify-center items-center rounded-full bg-red-500 text-white inter'>
                      <p className='text-xs font-semibold'>{item.discountPercentage}%</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

        <section className='mt-12 mx-4 lg:w-[85vw] lg:mx-auto'>
            <div className='flex justify-between text-xl font-semibold'>
                <h1>Recommended items</h1>
                <Link to='./products'><h1 className='text-[#E60C03] cursor-pointer text-lg'>More </h1></Link>
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
                <h1 className='text-[#E60C03] text-lg'>More</h1>
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

        <section className='my-12 mx-4 lg:w-[85vw] lg:mx-auto'>
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