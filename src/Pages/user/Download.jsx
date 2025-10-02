import { DownloadIcon, Loader2 } from 'lucide-react';
import React from 'react';
import { useGetFilesQuery } from '../../store/API'; // Adjust the import path

const Download = () => {
  const { data: files, isLoading, error } = useGetFilesQuery();

  return (
    <section className='bg-[#f7fafc] inter pb-18'>
      <div className='md:max-w-[90vw] mx-auto'>
        <h1 className='text-2xl font-semibold text-center p-5 py-7 md:px-0 bg-white border-1 border-[#dee2e6] md:text-start md:bg-transparent md:border-0'>
          Download <h1 className='hidden md:inline'>Program</h1>
        </h1>
      </div>

      <div className='max-w-[90vw] flex flex-col gap-3 lg:gap-x-16 lg:gap-y-10 mx-auto mt-8 sm:grid sm:grid-cols-2 lg:grid-cols-3'>
        {isLoading ? (
          <div className='col-span-full flex justify-center items-center py-12'>
            <Loader2 className='w-12 h-12 animate-spin text-gray-600' />
          </div>
        ) : error ? (
          <div className='col-span-full text-center py-12'>
            <p className='text-red-600 text-lg'>Failed to load files. Please try again later.</p>
          </div>
        ) : files?.length === 0 ? (
          <div className='col-span-full text-center py-12'>
            <p className='text-gray-600 text-lg'>No files available for download yet.</p>
          </div>
        ) : (
          files?.map((file, index) => (
            <a
              key={file.id}
              href={file.filePath}
              download
              className={`bg-white rounded-lg border-1 border-[#dee2e6] p-6 md:p-8 py-8 flex justify-between items-center hover:shadow-lg transition-shadow duration-200 cursor-pointer
                ${index >= 2 ? 'hidden sm:flex' : ''}
                ${index >= 4 ? 'hidden lg:flex' : ''}
              `}
            >
              <div className='flex flex-col gap-2'>
                <h1 className='font-semibold text-xl lg:text-2xl'>
                  {file.originalFileName || file.fileName || file.category || 'Download'}
                </h1>
                <p className='text-[#4E4E4E] lg:text-lg'>
                  {file.description || 'Click to download'}
                </p>
              </div>
              <div className='border-1 border-[#BEBEBE] p-3 rounded-full hover:bg-gray-50 transition-colors'>
                <DownloadIcon />
              </div>
            </a>
          ))
        )}
      </div>
    </section>
  );
};

export default Download;