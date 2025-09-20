import React, { useState, useEffect } from 'react'
import SearchUI from '../../components/UI/SearchUI'
import { Breadcrumb } from '../../products/Breadcrumb'
import { useChangePasswordMutation, useGetMeQuery } from '../../store/API'
import { toast } from 'react-toastify';

const Profile = () => {
  const { data: me, isLoading: isUserLoading, error: userError } = useGetMeQuery();
  const [changePass, { isLoading: isPasswordLoading, error: passwordError }] = useChangePasswordMutation(); 
  console.log(me)
  
  const [data, setData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  
  const [newPass, setNewPass] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Track initial state for comparison
  const [initialData, setInitialData] = useState({});
  const [initialPassword, setInitialPassword] = useState('');

  // Set initial data when fetched
  useEffect(() => {
    if (me) {
      const userData = {
        name: me.firstName || '',
        lastName: me.lastName || '',
        email: me.email || '',
        password: ''
      };
      setData(userData);
      setInitialData(userData);
      setInitialPassword('');
      setNewPass('');
    }
  }, [me]);

  // Compare data to initial state
  const detailsChanged = 
    data.name !== initialData.name ||
    data.lastName !== initialData.lastName ||
    data.email !== initialData.email;

  const passwordChanged = data.password !== initialPassword || newPass !== '';

  // Password validation (computed values, no side effects)
  const getPasswordError = () => {
    if (!data.password && !newPass) return '';
    
    if (data.password && newPass && data.password === newPass) {
      return 'New password cannot be the same as current password';
    }
    
    return '';
  };

  const passwordValidationError = getPasswordError();
  const hasPasswordError = passwordValidationError !== '';

  // Toggle password visibility functions
  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  // Get API error message
  const getApiErrorMessage = (error) => {
    if (error?.status === 401) {
      return 'Unauthorized: Please log in again';
    }
    if (error?.data?.message) {
      return error.data.message;
    }
    if (error?.message) {
      return error.message;
    }
    return 'An error occurred. Please try again.';
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = {
        firstName: data.name,
        lastName: data.lastName,
        email: data.email
      };
      
      // Note: You'll need to implement updateProfile mutation in your API
      // const result = await updateProfile(formDataToSend).unwrap();
      console.log('Update profile data:', formDataToSend);
      
      // Reset initial data after successful update
      setInitialData({ ...data, password: '' });
      setSuccessMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    // Check for validation errors before submission
    if (hasPasswordError) {
      return;
    }

    try {
      console.log( typeof(data.password),typeof(newPass), data.password, newPass,   )
      const passwordData = {
        currentPass: data.password,        // Changed from currentPassword
        newPass: newPass,                  // Changed from newPassword
        confirmNewPassword: newPass        // Changed from data.password to newPass
      };

      const result = await changePass(passwordData).unwrap();
      toast.success('Password changed successfully')
      
      
      // Reset password fields after successful change
      setInitialPassword('');
      setData({ ...data, password: '' });
      setNewPass('');
      setSuccessMessage('Password changed successfully!');
      
      // Hide passwords after successful change
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to change password:', error);
    }
  };

  // Loading state for initial user data
  if (isUserLoading) {
    return (
      <section className='bg-[#f7fafc] inter pb-22'>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FD1206]"></div>
        </div>
      </section>
    );
  }

  // Error state for user data
  if (userError) {
    return (
      <section className='bg-[#f7fafc] inter pb-22'>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg max-w-md">
            <div className='flex items-center'>
              <svg className='w-5 h-5 mr-2 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
              </svg>
              <span className='font-medium'>{getApiErrorMessage(userError)}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='bg-[#f7fafc] inter pb-22'>
      <div className="lg:hidden px-4 pl-7 py-4 border-y bg-white lg:border-transparent border-[#dee2e6] ">
        <div className="mb-4 lg:hidden">
          <SearchUI />
        </div>
        <Breadcrumb />
      </div>

      <div className="p-4 pl-7 pb-7 md:max-w-[80vw] md:mx-auto md:px-0 text-xl md:text-2xl font-semibold lg:bg-transparent border-b md:border-0 border-[#dee2e6] ">
        <div className='hidden lg:block'>
          <Breadcrumb />
        </div>
        <h1 className='mt-4'>Settings</h1>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="md:max-w-[80vw] md:mx-auto px-4 pt-4">
          <div className='bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg'>
            <div className='flex items-center'>
              <svg className='w-4 h-4 mr-2 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
              </svg>
              <span className='text-sm font-medium'>{successMessage}</span>
            </div>
          </div>
        </div>
      )}

      <div className='bg-white md:max-w-[80vw] md:mx-auto'>
        {/* My details */}
        <div className='bg-white p-6 pt-7'>
          <h1 className='font-semibold text-2xl'>My details</h1>
          <h1 className='mt-9 mb-2 font-semibold text-lg hidden md:block'>Personal Information</h1>
          <hr className='mb-10 hidden md:block'/>

          <div className='flex justify-between md:gap-14'>
            <div className='hidden md:block'>
              <p className='max-w-[250px] text-[#878787]'>
                View and update your personal details such as name, email address and other profile
                information to keep your account up to date.
              </p>
            </div>

            <form
              onSubmit={handleDetailsSubmit}
              className='md:grid w-full md:w-[480px] md:grid-cols-2 md:gap-x-5'
            >
              <div className='flex flex-col mt-5 md:mt-0'>
                <span className='font-semibold'>First Name</span>
                <input
                  type='text'
                  required
                  disabled={isUserLoading}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className='bg-[#fbfbfb] py-2 mt-2 rounded-lg border border-[#DEE2E6] pl-4 w-full disabled:opacity-50 disabled:cursor-not-allowed'
                  value={data.name}
                />
              </div>

              <div className='flex flex-col mt-5 md:mt-0'>
                <span className='font-semibold'>Last Name</span>
                <input
                  type='text'
                  required
                  disabled={isUserLoading}
                  onChange={(e) => setData({ ...data, lastName: e.target.value })}
                  className='bg-[#fbfbfb] py-2 mt-2 rounded-lg border border-[#DEE2E6] pl-4 w-full disabled:opacity-50 disabled:cursor-not-allowed'
                  value={data.lastName}
                />
              </div>

              <div className='flex flex-col col-span-2 mt-5'>
                <span className='font-semibold'>E-mail</span>
                <input
                  type='email'
                  required
                  disabled={isUserLoading}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className='bg-[#fbfbfb] py-2 mt-2 rounded-lg border border-[#DEE2E6] pl-4 w-full disabled:opacity-50 disabled:cursor-not-allowed'
                  value={data.email}
                />
              </div>

              <button
                type="submit"
                disabled={!detailsChanged || isUserLoading}
                style={{
                  backgroundColor: (detailsChanged && !isUserLoading) ? '#FD1206' : '#DDDDDD',
                  cursor: (detailsChanged && !isUserLoading) ? 'pointer' : 'not-allowed'
                }}
                className='col-span-2 py-2 my-7 rounded-lg border border-[#DEE2E6] w-full text-white flex items-center justify-center'
              >
                {isUserLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Password section */}
        <div className='bg-white p-6 pt-7 mt-10'>
          <h1 className='mt-9 mb-2 font-semibold text-lg hidden md:block'>Password</h1>
          <hr className='mb-10 hidden md:block'/>

          <div className='flex md:justify-between md:gap-14'>
            <div className='hidden md:block'>
              <p className='max-w-[250px] text-[#878787]'>
                Change your account password to keep your profile secure. For your safety, make sure to use a
                strong password that includes letters, numbers, and symbols.
              </p>
            </div>

            <form
              onSubmit={handlePasswordSubmit}
              className='md:grid w-full md:w-[480px] md:grid-cols-2 md:gap-x-5'
            >
              <div className='flex flex-col col-span-2 mt-5 md:mt-0'>
                <span className='font-semibold'>Current Password</span>
                <div className='relative'>
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    required
                    disabled={isPasswordLoading}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    className={`bg-[#fbfbfb] py-2 mt-2 rounded-lg border pl-4 pr-12 w-full disabled:opacity-50 disabled:cursor-not-allowed ${
                      hasPasswordError && data.password ? 'border-red-500' : 'border-[#DEE2E6]'
                    }`}
                    value={data.password}
                  />
                  <button
                    type="button"
                    onClick={toggleCurrentPasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showCurrentPassword ? (
                      // Eye slash icon (hide)
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      // Eye icon (show)
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className='flex flex-col col-span-2 mt-5'>
                <span className='font-semibold'>New Password</span>
                <div className='relative'>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    disabled={isPasswordLoading}
                    onChange={(e) => setNewPass(e.target.value)}
                    className={`bg-[#fbfbfb] py-2 mt-2 rounded-lg border pl-4 pr-12 w-full disabled:opacity-50 disabled:cursor-not-allowed ${
                      hasPasswordError && newPass ? 'border-red-500' : 'border-[#DEE2E6]'
                    }`}
                    value={newPass}
                  />
                  <button
                    type="button"
                    onClick={toggleNewPasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showNewPassword ? (
                      // Eye slash icon (hide)
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      // Eye icon (show)
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Validation Error message */}
              {hasPasswordError && passwordValidationError && (
                <div className='col-span-2 mt-3 mb-2'>
                  <div className='bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg'>
                    <div className='flex items-center'>
                      <svg className='w-4 h-4 mr-2 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                      </svg>
                      <span className='text-sm font-medium'>{passwordValidationError}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* API Error message */}
              {passwordError && (
                <div className='col-span-2 mt-3 mb-2'>
                  <div className='bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg'>
                    <div className='flex items-center'>
                      <svg className='w-4 h-4 mr-2 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                      </svg>
                      <span className='text-sm font-medium'>{getApiErrorMessage(passwordError)}</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!passwordChanged || hasPasswordError || isPasswordLoading}
                style={{
                  backgroundColor: (passwordChanged && !hasPasswordError && !isPasswordLoading) ? '#FD1206' : '#DDDDDD',
                  cursor: (passwordChanged && !hasPasswordError && !isPasswordLoading) ? 'pointer' : 'not-allowed'
                }}
                className='col-span-2 py-2 my-7 rounded-lg border border-[#DEE2E6] w-full text-white flex items-center justify-center'
              >
                {isPasswordLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Changing Password...
                  </>
                ) : (
                  'Save'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;