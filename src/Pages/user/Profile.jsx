import React from 'react'
import SearchUI from '../../components/UI/SearchUI'
import { Breadcrumb } from '../../products/Breadcrumb'
import { LampWallDown } from 'lucide-react'

const Profile = () => {
  return (
    <section className='bg-[#f7fafc] inter'>
        <div className="lg:hidden px-4 pl-7 py-4 border-y bg-white lg:border-transparent border-[#dee2e6] ">
            <div className="mb-4 lg:hidden">
              <SearchUI />
            </div>
            <Breadcrumb />
        </div>

        <div className=" p-4 pl-7 text-xl md:text-2xl font-semibold bg-white lg:bg-transparent border-b lg:border-0 border-[#dee2e6] mb-3">
          <div className='hidden lg:block'>
            <Breadcrumb />
          </div>
          <h1 className='mt-4'>Settings</h1>
        </div>

        <div className='bg-white p-6 pt-7'>
            <h1 className='font-semibold text-xl'>My details</h1>
            <div className='flex flex-col mt-5'>
                <span className='font-semibold'>First Name</span>
                <input type="text" className='bg-[#fbfbfb] py-2 mt-2 rounded-lg border-1 border-[#DEE2E6] pl-4' value={"Laman"}/>
            </div>
            <div className='flex flex-col mt-5'>
                <span className='font-semibold'>Last Name</span>
                <input type="text" className='bg-[#fbfbfb] py-2 mt-2 rounded-lg border-1 border-[#DEE2E6] pl-4' value={"Laman"}/>
            </div>
            <div className='flex flex-col mt-5'>
                <span className='font-semibold'>E-mail</span>
                <input type="text" className='bg-[#fbfbfb] py-2 mt-2 rounded-lg border-1 border-[#DEE2E6] pl-4' value={"Laman"}/>
            </div>

            <button className='bg-[#DDDDDD] py-2 my-7 rounded-lg border-1 border-[#DEE2E6] w-full'>Save</button>
        </div>
        
        <div className='bg-white mt-7 p-6'>
            <h1 className='font-semibold text-xl'>Password</h1>
            

            <div className='flex flex-col mt-5'>
                <span className='font-semibold'>Old Password</span>
                <input type="text" className='bg-[#fbfbfb] py-2 mt-2 rounded-lg border-1 border-[#DEE2E6] pl-4' value={"Laman"}/>
            </div>
            
            <div className='flex flex-col mt-5'>
                <span className='font-semibold'>New Password</span>
                <input type="text" className='bg-[#fbfbfb] py-2 mt-2 rounded-lg border-1 border-[#DEE2E6] pl-4' value={"Laman"}/>
            </div>

            <button className='bg-[#DDDDDD] py-2 my-7 rounded-lg border-1 border-[#DEE2E6] w-full'>Save</button>

        </div>


    </section>
  )
}

export default Profile