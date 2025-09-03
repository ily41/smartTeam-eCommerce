import React from 'react'
import { Link } from 'react-router'

const HomePageUI = ({deal}) => {
    if(deal) {
        return (
        
            <Link to='/details' className='bg-white p-1 border-1 border-gray-300 cursor-pointer rounded-lg relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-400'>
                <img className='w-full rounded-lg ' src="./deals/product.avif" alt="" />
                <div className='font-semibold p-2 inter'>
                    <div className='[@media(min-width:450px)]:flex gap-2 items-center '>
                        <h1 className='line-through  text-lg sm:text-[16px] text-[#8c8c8c]'>680 AZN</h1>
                        <h1 className='text-[#FF4B43] text-lg sm:text-xl'>450 AZN</h1>
                    </div>
                    
                    <p className='font-medium mb-3'>Pos Komputer</p>
                    <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words'>Bakı, bu gün, 11:14</p>
                </div>
                <div className='absolute top-6 right-6 p-8 w-12 h-12 flex justify-center items-center  rounded-[50%] bg-[#FF4B43] text-white inter '>
                    <p className='text-lg font-semibold'>-25%</p>
                </div>
            </Link>
          )
    }
    else {
        return (
        <Link to='/details' className='bg-white p-1 border-1 cursor-pointer border-gray-300 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-400'>
            <img className='w-full rounded-lg' src="./deals/product.avif" alt="" />
            <div className='font-semibold p-2 inter'>
                <h1 className='text-lg'>680 AZN</h1>
                <p className='font-medium mb-3'>Pos Komputer</p>
                <p className='text-gray-600 font-normal whitespace-normal [@media(min-width:450px)]:break-words'>Bakı, bu gün, 11:14</p>
            </div>
        </Link>
  )
    }
  
}

export default HomePageUI