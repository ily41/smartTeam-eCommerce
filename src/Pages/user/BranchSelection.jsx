import React, { useState } from 'react';
import { MapPin, Clock, ChevronRight } from 'lucide-react';
import MyMap from '../../components/UI/googleMaps';
import { useTranslation } from 'react-i18next';

const BranchesSection = () => {
  const [selectedBranch, setSelectedBranch] = useState(0);
  const { t } = useTranslation();

  const branches = [
    {
      id: 0,
      name: 'sederek',
      location: 'footer.address1',
      locationDetails: 'footer.address2',
      locationStore: 'footer.address3',
      workTime: 'workTime1',
      phone: '+994707513111',
      phoneDisplay: '070-751-31-11',
      image: '/contact/field1.jpg',
      coordinates: { lat: 40.3419741, lng: 49.8399698 }
    },
    {
      id: 1,
      name: 'bayil',
      location: 'footer.address1',
      locationDetails: 'footer.address2',
      locationStore: 'footer.address3',
      workTime: 'workTime2',
      phone: '+994706740649',
      phoneDisplay: '070-674-06-49',
      image: '/contact/field2.jpg',
      coordinates: { lat: 40.329590, lng: 49.781784 }
    }
  ];

  const getFullAddress = (branch) => {
    return `${t(branch.location)}, ${t(branch.locationDetails)}${t(branch.locationStore)}`;
  };

  return (
    <div className='py-8 sm:py-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1400px] mx-auto'>
      <h1 className='text-xl sm:text-2xl font-semibold mb-6 sm:mb-8'>{t('footer.contactUs')}</h1>

      {/* Mobile View - Cards */}
      <div className='lg:hidden space-y-4 sm:space-y-6'>
        {branches.map((branch) => (
          <div 
            key={branch.id}
            className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'
          >
            <div className='h-32 sm:h-40 bg-gray-200 overflow-hidden'>
              <img 
                src={branch.image} 
                alt={t(branch.name)}
                className='w-full h-full object-cover'
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.style.backgroundColor = '#e5e7eb';
                }}
              />
            </div>
            <div className='p-4 sm:p-5'>
              <h2 className='text-lg sm:text-xl font-semibold mb-2'>{t(branch.name)}</h2>
              <div className='flex items-start gap-2 mb-3'>
                <MapPin className='w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0 mt-0.5' />
                <p className='text-sm sm:text-base text-gray-600'>{getFullAddress(branch)}</p>
              </div>
              <div className='flex items-start gap-2 mb-4'>
                <Clock className='w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0 mt-0.5' />
                <p className='text-sm sm:text-base text-gray-600'>
                  {t(branch.workTime)}
                  {branch.phone && (
                    <>
                      {' '}
                      (<a href={`tel:${branch.phone}`} className='text-[#E60C03] hover:underline'>{branch.phoneDisplay}</a>)
                    </>
                  )}
                </p>
              </div>
              <button 
                onClick={() => setSelectedBranch(branch.id)}
                className='text-[#E60C03] font-semibold flex items-center gap-2 text-sm sm:text-base hover:gap-3 transition-all'
              >
                View on Map <ChevronRight className='w-4 h-4 sm:w-5 sm:h-5' />
              </button>
            </div>
          </div>
        ))}
        
        {/* Mobile Map View */}
        <div className='h-[400px] bg-gray-900 rounded-lg overflow-hidden'>
          <MyMap markerIndex={selectedBranch} />
        </div>
      </div>

      {/* Desktop View - Split Layout */}
      <div className='hidden lg:grid lg:grid-cols-2 gap-8 xl:gap-12'>
        {/* Left Side - Branch Cards */}
        <div className='flex flex-col gap-5 justify-center'>
          {branches.map((branch, index) => (
            <div
              key={branch.id}
              onClick={() => setSelectedBranch(index)}
              className={`rounded-lg cursor-pointer flex transition-all duration-300 hover:shadow-lg ${
                selectedBranch === index ? 'shadow-md' : ''
              }`}
            >
              <div className='w-44 xl:w-52 h-60 xl:h-48 bg-gray-200 rounded-l-lg overflow-hidden flex-shrink-0'>
                <img 
                  src={branch.image} 
                  alt={t(branch.name)}
                  className='w-full h-full object-cover'
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.backgroundColor = '#e5e7eb';
                  }}
                />
              </div>
              <div 
                className={`flex-1 p-6 xl:p-8 flex flex-col rounded-r-lg transition-all duration-300 ${
                  selectedBranch === index 
                    ? 'bg-[#323232] text-white' 
                    : 'bg-white text-black'
                }`}
              >
                <div>
                  <h2 className='text-xl xl:text-2xl font-semibold mb-3'>{t(branch.name)}</h2>
                  <hr className={`border-t ${selectedBranch === index ? 'border-gray-600' : 'border-gray-300'}`} />
                </div>
                <p className={`text-lg xl:text-xl font-medium mt-4 ${
                  selectedBranch === index ? 'text-white' : 'text-gray-500'
                }`}>
                  {getFullAddress(branch)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Branch Details & Map */}
        <div className='flex flex-col'>
          <div className='mb-6'>
            <h2 className='text-2xl xl:text-3xl font-semibold mb-6'>
              {t(branches[selectedBranch].name)}
            </h2>
            <div className='space-y-4'>
              <div className='flex items-start gap-3 text-base xl:text-lg'>
                <MapPin className='w-6 h-6 text-gray-700 flex-shrink-0 mt-1' />
                <p className='text-gray-700'>{getFullAddress(branches[selectedBranch])}</p>
              </div>
              <div className='flex items-start gap-3 text-base xl:text-lg'>
                <Clock className='w-6 h-6 text-gray-700 flex-shrink-0 mt-1' />
                <p className='text-gray-700'>
                  {t(branches[selectedBranch].workTime)}
                  {branches[selectedBranch].phone && (
                    <>
                      {' '}
                      (<a href={`tel:${branches[selectedBranch].phone}`} className='text-[#E60C03] hover:underline'>{branches[selectedBranch].phoneDisplay}</a>)
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className='flex-1 min-h-[300px] xl:min-h-[350px] bg-gray-900 rounded-lg overflow-hidden'>
            <MyMap markerIndex={selectedBranch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchesSection                                                                                 
