import React from 'react'
import SearchUI from '../../components/UI/SearchUI'
import { Breadcrumb } from '../../products/Breadcrumb'
import { LampWallDown } from 'lucide-react'

const Profile = () => {
  return (
    <section className='bg-[#f7fafc] inter pb-22'>
        <div className="lg:hidden px-4 pl-7 py-4 border-y bg-white lg:border-transparent border-[#dee2e6] ">
            <div className="mb-4 lg:hidden">
              <SearchUI />
            </div>
            <Breadcrumb />
        </div>
        <div className=" p-4 pl-7 pb-7 md:max-w-[80vw] md:mx-auto md:px-0  text-xl md:text-2xl font-semibold  lg:bg-transparent border-b md:border-0 border-[#dee2e6] ">
          <div className='hidden lg:block'>
            <Breadcrumb />
          </div>
          <h1 className='mt-4'>Settings</h1>
        </div>
        <div className='bg-white md:max-w-[80vw] md:mx-auto'>
          
          
          <div>
            <div className='bg-white p-6 pt-7'>
              <h1 className='font-semibold text-2xl'>My details</h1>
              <h1 className='mt-9 mb-2 font-semibold text-lg hidden md:block'>Personal Information</h1>
              <hr className='mb-10 hidden md:block'/>

              <div className='flex justify-between md:gap-14 '>
                <div className='hidden md:block'>
                  <p className='max-w-[250px] text-[#878787]'>View and update your personal details such as name, email address and other profile information to keep your account up to date.</p>
                </div>

                <div className='md:grid  w-full md:w-auto  md:grid-cols-2 md:gap-x-5 '>
                  <div className='flex flex-col  mt-5 md:mt-0'>
                      <span className='font-semibold'>First Name</span>
                      <input type="text" className='bg-[#fbfbfb] py-2 mt-2 rounded-lg border-1 border-[#DEE2E6] pl-4' value={"Laman"}/>
                  </div>
                  <div className='flex flex-col mt-5 md:mt-0'>
                      <span className='font-semibold'>Last Name</span>
                      <input type="text" className='bg-[#fbfbfb] py-2 mt-2 rounded-lg border-1 border-[#DEE2E6] pl-4' value={"Laman"}/>
                  </div>
                  <div className='flex flex-col col-span-2 mt-5 md:mt-5'>
                      <span className='font-semibold'>E-mail</span>
                      <input type="text" className='bg-[#fbfbfb] py-2 mt-2 rounded-lg border-1 border-[#DEE2E6] pl-4' value={"Laman"}/>
                  </div>

                  <button className='bg-[#DDDDDD] col-span-2 py-2 my-7 rounded-lg border-1 border-[#DEE2E6] w-full'>Save</button>
                </div>
              </div>
            </div>

          </div>

          <div>


            <div className='bg-white p-6 pt-7 mt-10 '>
              <h1 className='mt-9  mb-2 font-semibold text-lg hidden md:block'>Password</h1>
              <hr className='mb-10 hidden md:block'/>

              <div className='flex  md:justify-between md:gap-14 '>
                <div className='hidden md:block'>
                  <p className='max-w-[250px] text-[#878787]'>Change your account password to keep your profile secure. For your safety, make sure to use a strong password that includes letters, numbers, and symbols</p>
                </div>

                <div className='md:grid w-full md:w-auto md:grid-cols-2 md:gap-x-5 '>
                  <div className='flex flex-col  mt-5 md:mt-0'>
                      <span className='font-semibold'>First Name</span>
                      <input type="text" className='bg-[#fbfbfb] py-2 mt-2 rounded-lg border-1 border-[#DEE2E6] pl-4' value={"Laman"}/>
                  </div>
                  <div className='flex flex-col mt-5 md:mt-0'>
                      <span className='font-semibold'>Last Name</span>
                      <input type="text" className='bg-[#fbfbfb] py-2 mt-2 rounded-lg border-1 border-[#DEE2E6] pl-4' value={"Laman"}/>
                  </div>
                  <div className='flex flex-col col-span-2 mt-5 md:mt-5'>
                      <span className='font-semibold'>E-mail</span>
                      <input type="text" className='bg-[#fbfbfb] py-2 mt-2 rounded-lg border-1 border-[#DEE2E6] pl-4' value={"Laman"}/>
                  </div>

                  <button className='bg-[#DDDDDD] col-span-2 py-2 my-7 rounded-lg border-1 border-[#DEE2E6] w-full'>Save</button>
                </div>
              </div>
            </div>

          </div>
        </div>
          


    </section>
  )
}

export default Profile