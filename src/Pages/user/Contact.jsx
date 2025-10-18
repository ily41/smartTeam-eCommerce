import { ArrowRight } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();
    const [isSwapped, setIsSwapped] = useState(false);

    const handleBranchClick = () => {
      setIsSwapped(!isSwapped);
    };
    console.log(isSwapped)
  return (
    <section className='bg-[#f7fafc] pt-10 inter min-h-screen'>
        <div className='bg-white md:max-w-[80vw] mx-auto md:rounded-lg border-1 border-[#dee2e6]'>
            
            <div className='border-1 border-[#dee2e6] text-2xl font-bold text-center py-5 md:rounded-t-lg md:border-0 md:text-start md:p-9'>
                <h1>{t('contact.contactUs')}</h1>
            </div>
            <div className='border-b-1 md:border-0 border-[#dee2e6] md:flex justify-between'>
                <div className='flex p-9 md:pt-0 gap-3 flex-col text-md whitespace-nowrap font-semibold'>
                    <div className='flex items-center gap-4'>
                        <img className = 'w-8 shrink-0' src="./Icons/phone.svg" alt="" />
                        <p>{t('contact.phoneNumber')}: +994 055 674 06 49</p>
                    </div>

                    <div className='flex items-center gap-4'>
                        <img className = 'w-8' src="./Icons/email-icon.svg" alt="" />
                        <p>{t('contact.email')}: İnfo@smartteam.az</p>
                    </div>

                </div>
                
                <div>
                    <p className='p-9 md:pb-3 pt-0 text-lg font-semibold text-[#808080]'>{t('contact.socialMedia')}</p>

                    <div className='flex gap-3 p-9 pt-0'>
                        <a href="https://www.tiktok.com/@smartteam.az" target="_blank" rel="noopener noreferrer">
                            <img className='w-8 h-8' src="./Icons/tiktok.svg" alt="" />
                           

                        </a>
                        <a href="https://www.instagram.com/smart_team.az" target="_blank" rel="noopener noreferrer">
                            <img className='w-8' src="./Icons/instagram.svg" alt="" />
                        </a>
                    </div>
                </div>

               
            </div>

        </div>

        {/* <div className='py-10 max-w-[90vw] md:max-w-[80vw] mx-auto'>
            <h1 className='text-xl font-semibold'>Branches</h1>

            <div className='bg-white rounded-lg mt-8 md:hidden'>
                <div className='h-[12vh] bg-gray-400 rounded-t-lg'></div>
                <div className='p-4'>
                    <h1 className='text-xl font-semibold'>Branch</h1>
                    <div className='flex justify-between'>
                        <p className='text-[#787878] text-lg font-medium'>short location</p>
                        <h1 className='text-lg text-[#E60C03] flex gap-4 font-semibold '>More <ArrowRight /></h1>
                    </div>
                </div>
            </div>

            <div className='bg-white rounded-lg mt-8 md:hidden'>
                <div className='h-[12vh] bg-gray-400 rounded-t-lg'></div>
                <div className='p-4'>
                    <h1 className='text-xl font-semibold'>Branch</h1>
                    <div className='flex justify-between'>
                        <p className='text-[#787878] text-lg font-medium'>short location</p>
                        <h1 className='text-lg text-[#E60C03] flex gap-4 font-semibold '>More <ArrowRight /></h1>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-2 mt-8'>
                <div className='flex flex-col gap-5'>
                    <div onClick={handleBranchClick} className={`rounded-lg cursor-pointer flex w-full transition-all duration-500 ease-in-out  ${
                                      isSwapped
                                        ? 'translate-y-56'    // Move down when swapped
                                        : 'translate-y-0'    // Stay at top when not swapped
                                    }`}>
                        <div className='flex-1 bg-gray-400 rounded-l-lg'></div>
                        <div className={`flex-1 p-8 pt-6 pb-15 flex flex-col gap-3 ${isSwapped ? 'bg-[#323232]' : 'bg-white'} transition-all duration-500 ease-in-out  rounded-r-lg`}>
                            <h1 className={`text-2xl font-semibold mb-3 ${isSwapped ? 'text-white' : 'text-black'}`}>Branch 1</h1>
                            <hr className='text-[#9F9F9F]'/>
                            <p className={`mt-6 text-xl ${isSwapped ? 'text-white' : 'text-[#9F9F9F]'}  font-medium`}>Baki short location</p>
                        </div>
                        <img className = {`${isSwapped ? 'opacity-100' : 'opacity-0'}   px-5 transition-all duration-500 ease-in-out `} src="./Icons/triangle.svg" alt="" />
                    </div>

                   <div onClick={handleBranchClick} className={`rounded-lg cursor-pointer  flex w-full transition-all duration-500 ease-in-out ${
                                      isSwapped
                                        ? '-translate-y-56'    // Move down when swapped
                                        : 'translate-y-0'     // Stay at top when not swapped
                                    }`}>
                        <div className='flex-1 bg-gray-400 rounded-l-lg'></div>
                        <div className={`flex-1 p-8 pt-6 pb-15 flex flex-col gap-3 ${isSwapped ? 'bg-white' : 'bg-[#323232]'} transition-all duration-500 ease-in-out  rounded-r-lg`}>
                            <h1 className={`text-2xl font-semibold mb-3 ${isSwapped ? 'text-black' : 'text-white'}`}>Branch 2</h1>
                            <hr className='text-[#9F9F9F]'/>
                            <p className={`mt-6 text-xl ${isSwapped ? 'text-[#9F9F9F]' : 'text-white'}  font-medium`}>Baki short location</p>
                        </div>
                        <img className={`${isSwapped ? 'opacity-0' : 'opacity-100'} px-5 transition-all duration-500 ease-in-out`} src="./Icons/triangle.svg" alt="" />
                    </div>

                </div>


                <div className='ml-8'>
                    <h1 className='text-2xl font-semibold mb-5'>Branch 1</h1>
                    <div className='flex flex-col gap-5'>
                        <div className='flex gap-2 text-lg'>
                            <img className='w-8' src="./Icons/footer-location.svg" alt="" />
                            <p>Location</p>
                        </div>

                        <div className='flex text-lg gap-5'>
                            <img src="./Icons/contact-clock.svg" alt="" />
                            <p>Work time</p>
                        </div>
                    </div>

                    <div className='h-[30vh] w-[30vw] mt-10 bg-gray-800'></div>
                </div>
            </div>
        </div> */}



    </section>
)
}

export default Contact