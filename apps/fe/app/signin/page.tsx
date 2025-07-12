"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Monitor, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/utils';
import { useRouter } from 'next/navigation';

function SignIn() {
     
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
   const router =useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try{

      let res= await axios.post(`${BACKEND_URL}/user/signin`,{
          username:formData.username,
          password:formData.password
  
           
      })
      // if (typeof window !== 'undefined') {
      //   localStorage.setItem("token",res.data.jwt)
      // }
        
        localStorage.setItem("token",res.data.jwt)
      
      router.push("/dashboard")
    }catch(e){
      console.log(e)   
      
    }
    // Handle sign in logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left side - Text content */}
      <div className="flex-1 flex items-center justify-center px-8 lg:px-16">
        <div className="max-w-md">
          <div className="flex items-center space-x-2 mb-8">
            <Monitor className="w-10 h-10 text-blue-500" />
            <span className="text-2xl font-bold text-white">UptimeWatch</span>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-6">
            Welcome Back
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Monitor your websites with confidence. Get instant alerts when your site goes down and keep your business running smoothly.
          </p>
          
          <div className="space-y-4 text-gray-400">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Real-time monitoring</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Instant notifications</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>99.9% uptime guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Sign in form */}
      <div className="flex-1 flex items-center justify-center px-8 lg:px-16 bg-gray-800">
        <div className="w-full max-w-md">
          <div className="bg-gray-900 rounded-xl shadow-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Sign In
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-gray-400 hover:text-gray-300 text-sm transition-colors">
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;