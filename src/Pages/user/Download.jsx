import { DownloadIcon } from 'lucide-react'
import React from 'react'

const Download = () => {
  return (
    <section className='bg-[#f7fafc]  inter pb-18'>
        <div className='md:max-w-[90vw] mx-auto'>
            <h1 className='text-2xl font-semibold text-center p-5 py-7 md:px-0 bg-white border-1 border-[#dee2e6] md:text-start md:bg-transparent md:border-0'>Download <h1 className='hidden md:inline'>Program</h1></h1>
        </div>

        <div className='max-w-[90vw] flex flex-col gap-3 lg:gap-x-16 lg:gap-y-10 mx-auto mt-8 sm:grid sm:grid-cols-2 lg:grid-cols-3'>
            <div className=' bg-white  rounded-lg border-1 border-[#dee2e6] p-6 md:p-8 py-8 flex justify-between items-center'>

                <div className='flex flex-col gap-2'>
                    <h1 className='font-semibold text-xl lg:text-2xl'>Windows</h1>
                    <p className='text-[#4E4E4E] lg:text-lg'>description</p>
                </div>
                <div className=' border-1 border-[#BEBEBE] p-3 rounded-full'>
                    <DownloadIcon />
                </div>
            </div>

            <div className=' bg-white  rounded-lg border-1 border-[#dee2e6] p-6 md:p-8 py-8 flex justify-between items-center'>

                <div className='flex flex-col gap-2'>
                    <h1 className='font-semibold text-xl lg:text-2xl'>Windows</h1>
                    <p className='text-[#4E4E4E] lg:text-lg'>description</p>
                </div>
                <div className=' border-1 border-[#BEBEBE] p-3 rounded-full'>
                    <DownloadIcon />
                </div>
            </div>

            <div className=' bg-white hidden sm:flex rounded-lg border-1 border-[#dee2e6] p-6 md:p-8 py-8  justify-between items-center'>

                <div className='flex flex-col gap-2'>
                    <h1 className='font-semibold text-xl lg:text-2xl'>Windows</h1>
                    <p className='text-[#4E4E4E] lg:text-lg'>description</p>
                </div>
                <div className=' border-1 border-[#BEBEBE] p-3 rounded-full'>
                    <DownloadIcon />
                </div>
            </div>

            <div className=' bg-white  rounded-lg border-1 border-[#dee2e6] p-6 md:p-8 py-8 hidden sm:flex justify-between items-center'>

                <div className='flex flex-col gap-2'>
                    <h1 className='font-semibold text-xl lg:text-2xl'>Windows</h1>
                    <p className='text-[#4E4E4E] lg:text-lg'>description</p>
                </div>
                <div className=' border-1 border-[#BEBEBE] p-3 rounded-full'>
                    <DownloadIcon />
                </div>
            </div>

            <div className=' bg-white  rounded-lg border-1 border-[#dee2e6] p-6 md:p-8 py-8 hidden lg:flex justify-between items-center'>

                <div className='flex flex-col gap-2'>
                    <h1 className='font-semibold text-xl lg:text-2xl'>Windows</h1>
                    <p className='text-[#4E4E4E] lg:text-lg'>description</p>
                </div>
                <div className=' border-1 border-[#BEBEBE] p-3 rounded-full'>
                    <DownloadIcon />
                </div>
            </div>

            <div className=' bg-white  rounded-lg border-1 border-[#dee2e6] p-6 md:p-8 py-8 hidden lg:flex justify-between items-center'>

                <div className='flex flex-col gap-2'>
                    <h1 className='font-semibold text-xl lg:text-2xl'>Windows</h1>
                    <p className='text-[#4E4E4E] lg:text-lg'>description</p>
                </div>
                <div className=' border-1 border-[#BEBEBE] p-3 rounded-full'>
                    <DownloadIcon />
                </div>
            </div>
        </div>



    </section>
  )
}

export default Download