'use client';

import { useState } from 'react';
import { Droplet, UserPlus, AlertTriangle, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function Register() {
  const router = useRouter();
  const { register, loading } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Prepare user data for registration
    const firstName = (formData.get('firstName') as string || '').trim();
    const lastName = (formData.get('lastName') as string || '').trim();
    
    // Default values if empty
    const safeFirstName = firstName || 'Anonymous';
    const safeLastName = lastName || 'User';
    
    const userData = {
      firstName: safeFirstName,
      lastName: safeLastName,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      bloodType: formData.get('bloodType') as string,
      role: 'DONOR', // Default role
      // Explicitly add the name field to prevent undefined errors
      name: `${safeFirstName} ${safeLastName}`
    };
    
    try {
      // Pass the required arguments to the register function
      await register(
        userData.email, 
        userData.password, 
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          name: userData.name, // Include explicit name field
          bloodType: userData.bloodType,
          role: userData.role
        }
      );
      
      // Show success message
      setShowAlert(true);
      setAlertType('success');
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      
      // Show error message
      setShowAlert(true);
      setAlertType('error');
      setErrorMessage(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 border-b border-red-100">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-gray-900">
            <Droplet className="h-6 w-6 text-[#DC2626]" />
            <span className="text-xl font-semibold">BloodConnect</span>
          </Link>
          <Link 
            href="/"
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-lg bg-white border border-red-100 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-2">Join our blood donation community</p>
          </div>
          
          {/* Alert section */}
          {showAlert && (
            <div className="mb-6">
              <div className={`rounded-lg p-4 border ${
                alertType === 'success' 
                  ? 'bg-green-50 border-green-500 text-green-700' 
                  : 'bg-red-50 border-red-500 text-red-700'
              }`}>
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span>
                    {alertType === 'success' 
                      ? 'Registration successful! Redirecting to login...' 
                      : errorMessage || 'Registration failed. Please try again.'}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="First Name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] rounded-md text-gray-900 placeholder-gray-400"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  placeholder="Last Name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] rounded-md text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] rounded-md text-gray-900 placeholder-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Create a password"
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] rounded-md text-gray-900 placeholder-gray-400"
              />
              <p className="text-xs text-gray-500">Must be at least 8 characters</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">
                Blood Type
              </label>
              <select
                id="bloodType"
                name="bloodType"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] rounded-md text-gray-900"
              >
                <option value="" disabled>Select your blood type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-[#DC2626] bg-white border-gray-300 rounded focus:ring-[#DC2626]"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                I agree to the <Link href="/terms" className="text-[#DC2626] hover:text-[#B91C1C]">Terms of Service</Link> and <Link href="/privacy" className="text-[#DC2626] hover:text-[#B91C1C]">Privacy Policy</Link>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account?</span>
            <Link href="/auth/login" className="ml-1 text-[#DC2626] hover:text-[#B91C1C]">
              Sign in
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}