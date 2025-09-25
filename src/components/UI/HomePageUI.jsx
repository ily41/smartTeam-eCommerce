import React from 'react'
import { Link } from 'react-router'

const HomePageUI = ({deal,product,url}) => {
    console.log(url)
    if(deal) {
        return (
        
            <Link to={`/details/${product.id}`} className='bg-white p-1 border-1 border-gray-300 cursor-pointer rounded-lg relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-400'>
                <img className='w-full rounded-lg p-3' src={`http://localhost:5056${url}`} alt="" />
                <div className='font-semibold p-2 inter'>
                    <div className='[@media(min-width:450px)]:flex gap-2 items-center '>
                        <h1 className='line-through  text-lg sm:text-[16px] text-[#8c8c8c]'>{product.originalPrice} AZN</h1>
                        <h1 className='text-[#FF4B43] text-xl mb-1 sm:text-xl'>{product.currentPrice} AZN</h1>
                    </div>
                    
                    <p className='font-medium mb-3'>{product.name}</p>
                    <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words line-clamp-3'>{product.shortDescription}</p>
                </div>
                <div className='absolute top-2 right-2 lg:top-3 lg:right-3 p-6 w-0 h-0 flex justify-center items-center  rounded-[50%] bg-[#FF4B43] text-white inter '>
                        <p className='text-xs text-center font-semibold lg:text-sm'>{product.discountPercentage}%</p>
                    </div>
            </Link>
          )
    }
    else {
        return (
        <Link  to={`/details/${product.id}`} className='bg-white p-1 border-1 cursor-pointer border-gray-300 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-400'>
            <img className='w-full rounded-lg p-3' src={`http://localhost:5056${url}`}  alt="" />
            <div className='font-semibold p-2 inter'>
                <h1 className='text-lg'>{product.currentPrice} AZN</h1>
                <p className='font-medium mb-3'>{product.name}</p>
                <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words line-clamp-3'>{product.shortDescription}</p>
            </div>
        </Link>
  )
    }
  
}

export default HomePageUI