import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router';
import icons from '../../../public/Icons/icons.jpg';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const Footer = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(i18next.language || 'en');
    const dropdownRef = useRef(null);
    const { t } = useTranslation();
    
    const languages = [
        {
            name: "English",
            value: "en",
            flag: "./Icons/usa-flag.svg"
        },
        {
            name: "Azerbaijan",
            value: "az",
            flag: "./Icons/az-flag.svg"
        }
    ];

    // Sync with i18next language changes
    useEffect(() => {
        const handleLanguageChange = (lng) => {
            setSelected(lng);
            // Store in cookie for persistence
            document.cookie = `language=${lng}; path=/; max-age=31536000`; // 1 year
        };

        i18next.on('languageChanged', handleLanguageChange);
        
        return () => {
            i18next.off('languageChanged', handleLanguageChange);
        };
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const handleLanguageChange = (langValue) => {
        setSelected(langValue);
        i18next.changeLanguage(langValue);
        document.cookie = `language=${langValue}; path=/; max-age=31536000`; // Store for 1 year
        setOpen(false);
    };

    const currentLanguage = languages.find(lang => lang.value === selected) || languages[0];
    const otherLanguage = languages.find(lang => lang.value !== selected) || languages[1];

    return (
        <>
            <footer className='p-10 inter pb-0 '>
                <div className='bg-white flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start'>
                    <div>
                        <img 
                          className='w-[160px]' 
                          src="./Icons/logo.svg" 
                          alt="" 
                          style={{
                            imageRendering: '-webkit-optimize-contrast',
                            WebkitTransform: 'translateZ(0)',
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden'
                          }}
                        />
                        <p className='text-lg mt-5 text-gray-600'>{t("footer.desc1")} </p>
                        <p className='text-lg text-gray-600'>{t("footer.desc2")}  </p>
                        <p className='text-lg mb-5 text-gray-600'>{t("footer.desc3")}</p>
                        <div className='flex gap-3'>
                            <a href="https://www.tiktok.com/@smartteam.az" target="_blank" rel="noopener noreferrer">
                               <img className='w-7 h-7' src="/Icons/tiktok.svg" alt="" />
                            </a>
                            <a href="https://www.instagram.com/smart_team.az" target="_blank" rel="noopener noreferrer">
                                <img className='w-7 h-7' src="/Icons/instagram.svg" alt="" />
                            </a>
                        </div>
                    </div>
                    
                    <div className='flex justify-between  mt-15 lg:hidden'>
                        <div>
                            <h1 className='font-semibold text-xl text-[#1C1C1C]'>{t("footer.mainPages")}</h1>
                            <div className='text-[#8B96A5] flex flex-col gap-1 mt-3'>
                                <Link to='/'>{t("footer.home")}</Link>
                                <Link to='/about'>{t("footer.about")}</Link>
                                <Link to='/download'>{t("footer.download")}</Link>
                                <Link to='/contact'>{t("footer.contact")}</Link>
                            </div>
                        </div>
                        <div>
                            <h1 className='font-semibold text-xl text-[#1C1C1C]'>{t("footer.auth")}</h1>
                            <div className='text-[#8B96A5] flex flex-col gap-1 mt-3'>
                                <Link to='/login'>{t("footer.login")}</Link>
                            </div>
                        </div>
                    </div>

                    <div className='hidden lg:block'>
                        <h1 className='font-semibold text-xl text-[#1C1C1C]'>{t("footer.mainPages")}</h1>
                        <div className='text-[#8B96A5] flex flex-col gap-1 mt-3'>
                            <Link to='/'>{t("footer.home")}</Link>
                            <Link to='/about'>{t("footer.about")}</Link>
                            <Link to='/download'>{t("footer.download")}</Link>
                            <Link to='/contact'>{t("footer.contact")}</Link>
                        </div>
                    </div>

                    <div className='hidden lg:block'>
                        <h1 className='font-semibold text-xl text-[#1C1C1C]'>{t("footer.auth")}</h1>
                        <div className='text-[#8B96A5] flex flex-col gap-1 mt-3'>
                            <Link to="/login">{t("footer.login")}</Link >
                        </div>
                    </div>

                    <div className='mt-15 lg:mt-0 flex flex-col gap-2'>
                        <h1 className='font-semibold text-xl text-[#1C1C1C]'>{t("footer.contactUs")}</h1>

                        <div className='flex gap-2'>
                            <img className='w-[23px]' src="./Icons/footer-phone.svg" alt="" />
                            <p className='font-semibold text-md text-[#1C1C1C]'>+994 55 674 06 49</p>
                        </div>
                        <div className='flex gap-2'>
                            <img className='w-[25px]' src="./Icons/footer-location.svg" alt="" />
                            <p>{t("footer.address1")}</p>
                        </div>
                        <div className='flex gap-2 items-start'>
                            <img className='w-[25px] whitespace-normal' src="./Icons/footer-location.svg" alt="" />
                            <div className='flex flex-col'>
                                <p>{t("footer.address2")}</p>
                                <p>{t("footer.address3")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <div className='mt-4 border-t-1 border-[#DCDCDC] p-4 pl-10 lg:flex lg:px-30 lg:justify-between lg:border-[#DEE2E7] lg:bg-[#EFF2F4] lg:mt-8'>
                <p>&#169; {new Date().getFullYear()} smartteam.az</p>
                <div className='cursor-pointer relative'>
                    <div 
                        onClick={() => setOpen(prev => !prev)} 
                        className='hidden lg:flex gap-1 items-center hover:opacity-80 transition-opacity'
                    >
                        <img src={currentLanguage.flag} alt="" className="w-5 h-4" />
                        <p>{currentLanguage.name}</p>
                        <img 
                            src="./Icons/arrow-up.svg" 
                            alt="" 
                            className={`transition-transform duration-200 ${open ? '' : 'rotate-180'}`}
                        />
                    </div>
                    
                    {open && (
                        <div 
                            ref={dropdownRef} 
                            className="absolute flex items-center bottom-full gap-2 mb-1 right-0 bg-white border-[1.5px] border-black rounded-sm px-3 py-2 min-w-max z-10 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => handleLanguageChange(otherLanguage.value)}
                        >
                            <img src={otherLanguage.flag} alt={`${otherLanguage.name} flag`} className="w-5 h-4" />
                            <span className="text-gray-700 inter text-sm lg:text-base">{otherLanguage.name}</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Footer