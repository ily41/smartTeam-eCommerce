import React, { useState, useEffect } from 'react';
import { useLoginMutation, useSignupMutation } from '../../store/API';
import {jwtDecode} from "jwt-decode";
import { Loader, Loader2, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: ""
  });
  const [currentView, setCurrentView] = useState('login');
  const [countdown, setCountdown] = useState(20);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/'

  const [login, { isLoading: isLoginLoading }] = useLoginMutation(); 
  const [signup, { isLoading: isSignLoading }] = useSignupMutation(); 

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentView === 'codeVerification' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentView, countdown]);

  const togglePassword = (inputId) => {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    if (input.type === 'password') {
      input.type = 'text';
      button.textContent = '🙈';
    } else {
      input.type = 'password';
      button.textContent = '👁';
    }
  };

  const moveToNext = (current, index) => {
    if (current.value.length === 1 && index < 3) {
      const inputs = document.querySelectorAll('.code-input input');
      inputs[index + 1].focus();
    }
  };

  const setCookie = (name, value, expiresAt) => {
  const expires = "expires=" + new Date(expiresAt).toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax; Secure`;
};

  // const formatCountdown = (seconds) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  // };

  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );

  const FacebookIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );

  const handleLogin = async (e) =>{
    e.preventDefault(); 
     try {
      const result = await login({
        email: formData.email,
        password: formData.password
      }).unwrap();

      setCookie("token", result.token, result.expiresAt)
      const token = jwtDecode(result.token);
      console.log(token)

      toast.success("Login successful!")
      

      if (token.role != "Admin") {
        if (from && from !== '/') {
          navigate(from, { replace: true })
        } else {
          navigate("/") 
        }
      } else {
        navigate("/admin")
      }
      
    }catch (error){
      console.error("Signup failed:", error);
      if (error?.status === 401) {
        toast.error("Login failed. Invalid email or password.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  }
  const handleSignUp = async (e) => {
  e.preventDefault(); 

  try {
    const result = await signup({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password.trim(),
      confirmPassword: formData.confirmPassword.trim()
    }).unwrap();

    toast.success("Registration successful!");
    setCurrentView("login");
    console.log("Navigated to login");

  } catch (error) { // ✅ catch error properly
    console.error("Signup failed:", error);

    if (error?.status === 400) {
      console.log(error.data)
      toast.error(error?.data || "Email or phone already exists");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }
};




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Mobile Logo */}
        <div className="text-center mb-8 mt-4">
          <div className="text-2xl font-bold">
            <span className="text-blue-600">SMART</span>
            <span className="text-red-600">TEAM</span>
          </div>
        </div>

        {/* Mobile Sign In Form */}
        {currentView === 'signup' && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600 text-sm mb-6">Create your account in a seconds</p>

            <form className="space-y-4" onSubmit={handleSignUp}>
              <input type="text" name='firstName' onChange={handleChange}  placeholder="First Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              <input type="text" name='lastName' onChange={handleChange} placeholder="Last Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              <input type="email" name='email' onChange={handleChange}placeholder="Email Address" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              <div className="flex">
                <div className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-sm">
                  🇦🇿 (+994)
                </div>
                <input type="tel" name='phoneNumber' onChange={handleChange} placeholder="xxx xx xx" className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg" />
              </div>
              <div className="relative">
                <input type="password" minLength={8}  name='password' onChange={handleChange}  id="mobileSignupPassword" placeholder="Create Password" className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12" />
                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" onClick={() => togglePassword('mobileSignupPassword')}>👁</button>
              </div>
              <div className="relative">
                <input type="password" minLength={8}  name='confirmPassword' onChange={handleChange}  id="mobileAgain" placeholder="Create Password" className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12" />
                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" onClick={() => togglePassword('mobileAgain')}>👁</button>
              </div>
              <div className="flex items-center text-sm">
                <input type="checkbox" className="w-4 h-4 text-red-600 border-gray-300 rounded mr-2" />
                <span className="text-gray-600">I agree to the terms and privacy policy</span>
              </div>
              <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold">Create an account</button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              Already a member? <button type="button" className="text-blue-600" onClick={() => setCurrentView('login')}>Login</button>
            </div>

            <div className="mt-4 flex space-x-3">
              <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg">
                <GoogleIcon />
              </button>
              <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg">
                <FacebookIcon />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Log In Form */}
        {currentView === 'login' && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            {isLoginLoading ? <Loader className="animate-spin mx-auto text-white" size={28} /> : <h2 className="text-2xl font-bold text-gray-900 mb-2">Log In</h2>}
            <p className="text-gray-600 text-sm mb-6">Login your account in a seconds</p>

            <form className="space-y-4" onSubmit={handleLogin}>
              <input type="email" required name='email' onChange={handleChange}  placeholder="Email Address"  className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              <div className="relative">
                <input type="password" required minLength={8} name='password' id="mobileLoginPassword" onChange={handleChange} placeholder="Password" className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12" />
                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" onClick={() => togglePassword('mobileLoginPassword')}>👁</button>
              </div>
              <div className="text-right">
                <button type="button" className="text-red-600 text-sm" onClick={() => setCurrentView('forgotPassword')}>Forgot password?</button>
              </div>
              <button type="submit" required disabled={isLoginLoading} className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold">{isLoginLoading ? <Loader className="animate-spin mx-auto text-white" size={28} /> : 'Log in'}</button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              Don't have an account? <button type="button" className="text-red-600" onClick={() => setCurrentView('signup')}>Sign up</button>
            </div>

            <div className="mt-4 flex space-x-3">
              <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg">
                <GoogleIcon />
              </button>
              <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg">
                <FacebookIcon />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Forgot Password */}
        {currentView === 'forgotPassword' && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <button className="flex items-center text-gray-600 text-sm mb-6" onClick={() => setCurrentView('login')}>
              ← Back
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot password?</h2>
            <p className="text-gray-600 text-sm mb-6">Don't worry! It happens. Please enter the email associated with your account.</p>

            <form className="space-y-4">
              <input type="email" placeholder="Email address" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              <button type="button" className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold" onClick={() => { setCurrentView('codeVerification'); setCountdown(20); }}>Send a code</button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              Remember password? <button type="button" className="text-blue-600" onClick={() => setCurrentView('login')}>Log in</button>
            </div>
          </div>
        )}

        {/* Mobile Code Verification */}
        {currentView === 'codeVerification' && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <button className="flex items-center text-gray-600 text-sm mb-6" onClick={() => setCurrentView('forgotPassword')}>
              ← Back
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot password - code</h2>
            <p className="text-gray-600 text-sm mb-6">We've sent a code to <strong>helloworld@gmail.com</strong></p>

            <div className="flex justify-center space-x-2 mb-6 code-input">
              <input type="text" maxLength="1" className="w-12 h-12 text-center border border-gray-300 rounded-lg font-bold text-lg" onInput={(e) => moveToNext(e.target, 0)} defaultValue="8" />
              <input type="text" maxLength="1" className="w-12 h-12 text-center border border-gray-300 rounded-lg font-bold text-lg" onInput={(e) => moveToNext(e.target, 1)} defaultValue="2" />
              <input type="text" maxLength="1" className="w-12 h-12 text-center border border-gray-300 rounded-lg font-bold text-lg" onInput={(e) => moveToNext(e.target, 2)} defaultValue="2" />
              <input type="text" maxLength="1" className="w-12 h-12 text-center border border-gray-300 rounded-lg font-bold text-lg" onInput={(e) => moveToNext(e.target, 3)} />
            </div>

            <button type="button" className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold" onClick={() => setCurrentView('resetPassword')}>Verify</button>

          </div>
        )}

        {/* Mobile Reset Password */}
        {currentView === 'resetPassword' && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <button className="flex items-center text-gray-600 text-sm mb-6" onClick={() => setCurrentView('codeVerification')}>
              ← Back
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset password</h2>
            <p className="text-gray-600 text-sm mb-6">Please type something you'll remember</p>

            <form className="space-y-4">
              <div className="relative">
                <input type="password" id="mobileNewPassword" placeholder="New password" className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12" />
                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" onClick={() => togglePassword('mobileNewPassword')}>👁</button>
              </div>
              <div className="relative">
                <input type="password" id="mobileConfirmPassword" placeholder="Confirm new password" className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12" />
                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" onClick={() => togglePassword('mobileConfirmPassword')}>👁</button>
              </div>
              <button type="button" className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold" onClick={() => setCurrentView('passwordChanged')}>Verify</button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account? <button type="button" className="text-blue-600" onClick={() => setCurrentView('login')}>Log in</button>
            </div>
          </div>
        )}

        {/* Mobile Password Changed */}
        {currentView === 'passwordChanged' && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4 text-center">
            <div className="text-6xl mb-6">✨</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Password changed</h2>
            <p className="text-gray-600 text-sm mb-6">Your password has been changed successfully</p>
            <button type="button" className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold" onClick={() => setCurrentView('login')}>Log in now</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image Background */}
      {/* <div className="flex-1 bg-gradient-to-br from-slate-700 to-slate-800 relative">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-80 h-48 bg-gray-800 bg-opacity-50 rounded-lg mx-auto mb-8 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-2">
                <div className="w-12 h-12 bg-red-500 rounded"></div>
                <div className="w-12 h-12 bg-blue-500 rounded"></div>
                <div className="w-12 h-12 bg-green-500 rounded"></div>
                <div className="col-span-3 w-full h-8 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Right Side - Forms */}
      <div className="flex-1 bg-white flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-2xl font-bold">
              <span className="text-blue-600">SMART</span>
              <span className="text-red-600">TEAM</span>
            </div>
          </div>

          {/* Login Form */}
          {currentView === 'login' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Log in</h2>
              <p className="text-gray-600 text-sm mb-8">Login your account in a seconds</p>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <input type="email" required name='email' onChange={handleChange} placeholder="Email Address" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                
                <div className="relative">
                  <input type="password" required minLength={8} name='password' onChange={handleChange} id="loginPassword" placeholder="Password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-12" />
                  <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" onClick={() => togglePassword('loginPassword')}>👁</button>
                </div>



                <button type="submit" className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition duration-200">{isLoginLoading ? <Loader2 className="animate-spin mx-auto text-white" size={28} /> : 'Log in'}</button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                or continue with
              </div>

              <div className="mt-4 flex space-x-3">
                <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <GoogleIcon />
                </button>
                <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FacebookIcon />
                </button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-600">
                Don't have an account? <button type="button" className="text-red-600 hover:underline" onClick={() => setCurrentView('signup')}>Sign up</button>
              </div>
            </div>
          )}

          {/* Signup Form */}
          {currentView === 'signup' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
              <p className="text-gray-600 text-sm mb-8">Create your account in a seconds</p>

              <form className="space-y-6" onSubmit={handleSignUp}>
                <div>
                  <input type="text" required name='firstName' onChange={handleChange} placeholder="First Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                
                <div>
                  <input type="text" required name='lastName' onChange={handleChange} placeholder="Last Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                
                <div>
                  <input type="email" required name='email' onChange={handleChange} placeholder="Email Address" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>

                <div className="flex">
                  <div className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-sm">
                    🇦🇿 (+994)
                  </div>
                  <input type="tel" required name='phoneNumber' onChange={handleChange} placeholder="xxx xx xx" className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                
                <div className="relative">
                  <input type="password" required minLength={8}  id="signupPassword" name='password' onChange={handleChange}  placeholder="Create Password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-12" />
                  <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" onClick={() => togglePassword('signupPassword')}>👁</button>
                </div>

                <div className="relative"> 
                  <input type="password" required minLength={8}  id="confirmpass"  name='confirmPassword' onChange={handleChange}  placeholder="Create Password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-12" />
                  <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" onClick={() => togglePassword('confirmpass')}>👁</button>
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="agreeTerms" className="w-4 h-4 text-red-600 border-gray-300 rounded" />
                  <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-600">I agree to the <a href="#" className="text-blue-600 hover:underline">terms and privacy policy</a></label>
                </div>

                <button type="submit" className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition duration-200">Create an account</button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                or continue with
              </div>

              <div className="mt-4 flex space-x-3">
                <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <GoogleIcon />
                </button>
                <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FacebookIcon />
                </button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-600">
                Already a member? <button type="button" className="text-blue-600 hover:underline" onClick={() => setCurrentView('login')}>Login</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;