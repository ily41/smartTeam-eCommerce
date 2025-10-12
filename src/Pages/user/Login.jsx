// Login.jsx
import React, { useState, useEffect } from 'react';
import { useLoginMutation } from '../../store/API';
import { jwtDecode } from "jwt-decode";
import { Loader2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [currentView, setCurrentView] = useState('login');
  const [countdown, setCountdown] = useState(20);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login({
        email: formData.email,
        password: formData.password
      }).unwrap();

      setCookie("token", result.token, result.expiresAt);
      const token = jwtDecode(result.token);

      if (token.role != "Admin") {
        if (from && from !== '/') {
          navigate(from, { replace: true });
        } else {
          navigate("/");
        }
      } else {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error?.status === 401) {
        toast.error("Login failed. Invalid email or password.");
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
        <div className="text-center mb-8 mt-4">
          <img className='mx-auto w-50' src="./Icons/logo.svg" alt="" />
        </div>

        {currentView === 'login' && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Log In</h2>
            <p className="text-gray-600 text-sm mb-6">Login your account in a seconds</p>

            <form className="space-y-4" onSubmit={handleLogin}>
              <input 
                type="email" 
                required 
                name='email' 
                onChange={handleChange} 
                placeholder="Email Address" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
              />
              <div className="relative">
                <input 
                  type="password" 
                  required 
                  minLength={8} 
                  name='password' 
                  id="mobileLoginPassword" 
                  onChange={handleChange} 
                  placeholder="Password" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12" 
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 transform cursor-pointer -translate-y-1/2 text-gray-400" 
                  onClick={() => togglePassword('mobileLoginPassword')}
                >
                  👁
                </button>
              </div>
              <div className="text-right">
                <button 
                  type="button" 
                  className="text-red-600 text-sm" 
                  onClick={() => setCurrentView('forgotPassword')}
                >
                  Forgot password?
                </button>
              </div>
              <button 
                type="submit" 
                disabled={isLoginLoading} 
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold"
              >
                {isLoginLoading ? <Loader2 className="animate-spin mx-auto text-white" size={28} /> : 'Log in'}
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              Don't have an account? <button type="button" className="text-red-600" onClick={() => navigate('/register')}>Sign up</button>
            </div>

            <div className="mt-4 text-center">
              <button type="button" className="text-gray-500 text-sm hover:text-gray-700 underline" onClick={() => navigate('/')}>Continue without logging in</button>
            </div>
          </div>
        )}

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
                <button type="button" className="absolute right-3 top-1/2 transform cursor-pointer -translate-y-1/2 text-gray-400" onClick={() => togglePassword('mobileNewPassword')}>👁</button>
              </div>
              <div className="relative">
                <input type="password" id="mobileConfirmPassword" placeholder="Confirm new password" className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12" />
                <button type="button" className="absolute right-3 top-1/2 transform cursor-pointer -translate-y-1/2 text-gray-400" onClick={() => togglePassword('mobileConfirmPassword')}>👁</button>
              </div>
              <button type="button" className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold" onClick={() => setCurrentView('passwordChanged')}>Verify</button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account? <button type="button" className="text-blue-600" onClick={() => setCurrentView('login')}>Log in</button>
            </div>
          </div>
        )}

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
      <div className="flex-1 bg-white flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img className='mx-auto w-50' src="./Icons/logo.svg" alt="" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Log in</h2>
            <p className="text-gray-600 text-sm mb-8">Login your account in a seconds</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <input 
                  type="email" 
                  required 
                  name='email' 
                  onChange={handleChange} 
                  placeholder="Email Address" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                />
              </div>
              
              <div className="relative">
                <input 
                  type="password" 
                  required 
                  minLength={8} 
                  name='password' 
                  onChange={handleChange} 
                  id="loginPassword" 
                  placeholder="Password" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-12" 
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-400" 
                  onClick={() => togglePassword('loginPassword')}
                >
                  👁
                </button>
              </div>

              <button 
                type="submit" 
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
              >
                {isLoginLoading ? <Loader2 className="animate-spin mx-auto text-white" size={28} /> : 'Log in'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account? <button type="button" className="text-red-600 hover:underline cursor-pointer" onClick={() => navigate('/register')}>Sign up</button>
            </div>

            <div className="mt-4 text-center">
              <button type="button" className="text-gray-500 text-sm hover:text-gray-700 underline" onClick={() => navigate('/')}>Continue without logging in</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;