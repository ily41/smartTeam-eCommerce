import React from 'react'

const Footer = () => {
  return (
    <>
        <footer className='p-10 inter pb-0 '>
            <div className='bg-white flex flex-col lg:flex-row lg:justify-between lg:items-start'>
                <div>
                    <img className='w-[160px]' src="./Icons/logo.svg" alt="" />
                    <p className='text-lg mt-5 text-gray-600'>Our company provides sales and installation </p>
                    <p className='text-lg text-gray-600'>services for computers, office equipment, and  </p>
                    <p className='text-lg mb-5 text-gray-600'>low-current systems.</p>
                    <div className='flex gap-3'>
                        <img className='w-10'  src="./Icons/facebook.svg" alt="" />
                        <img className='w-10' src="./Icons/twitter.svg" alt="" />
                        <img className='w-10' src="./Icons/linkedin.svg" alt="" />
                        <img className='w-10' src="./Icons/instagram.svg" alt="" />
                        <img className='w-10' src="./Icons/youtube.svg" alt="" />
                    </div>
                </div>
                

                <div className='flex justify-between  mt-15 lg:hidden'>
                    <div>
                        <h1 className='font-semibold text-xl text-[#1C1C1C]'>Main Pages</h1>
                        <div className='text-[#8B96A5] flex flex-col gap-1 mt-3'>
                            <p>Home</p>
                            <p>About Us</p>
                            <p>Download Program</p>
                            <p>Contact</p>
                        </div>
                    </div>
                    <div>
                        <h1 className='font-semibold text-xl text-[#1C1C1C]'>Authentication</h1>
                        <div className='text-[#8B96A5] flex flex-col gap-1 mt-3'>
                            <p>Log In</p>
                            <p>Sign Up</p>
                            <p>Forgot</p>
                            <p>Confirm Email</p>
                        </div>
                    </div>
                </div>

                <div className='hidden lg:block'>
                    <h1 className='font-semibold text-xl text-[#1C1C1C]'>Main Pages</h1>
                    <div className='text-[#8B96A5] flex flex-col gap-1 mt-3'>
                        <p>Home</p>
                        <p>About Us</p>
                        <p>Download Program</p>
                        <p>Contact</p>
                    </div>
                </div>

                <div className='hidden lg:block'>
                    <h1 className='font-semibold text-xl text-[#1C1C1C]'>Authentication</h1>
                    <div className='text-[#8B96A5] flex flex-col gap-1 mt-3'>
                        <p>Log In</p>
                        <p>Sign Up</p>
                        <p>Forgot</p>
                        <p>Confirm Email</p>
                    </div>
                </div>

                <div className='mt-15 lg:mt-0 flex flex-col gap-2'>
                    <h1 className='font-semibold text-xl text-[#1C1C1C]'>Contact Us</h1>

                    <div className='flex gap-2'>
                        <img className='w-[23px]' src="./Icons/footer-phone.svg" alt="" />
                        <p className='font-semibold text-md text-[#1C1C1C]'>+994 50 xxx xx xx</p>
                    </div>
                    <div className='flex gap-2'>
                        <img className='w-[25px]' src="./Icons/footer-location.svg" alt="" />
                        <p>zire qesebesi </p>
                    </div>
                </div>



            </div>
    
        </footer>
        <div className='mt-4 border-t-1 border-[#DCDCDC] p-4 pl-10 lg:flex lg:px-30 lg:justify-between lg:border-[#DEE2E7] lg:bg-[#EFF2F4] lg:mt-8'>
            <p>&#169; 2025 smartteam.az</p>
            <div className='hidden lg:flex gap-1'>
                <img src='./Icons/usa-flag.svg' alt="" />
                <p>English</p>
                <img src="./Icons/arrow-up.svg" alt="" />
            </div>
        </div>
    </>
  )
}

export default Footer