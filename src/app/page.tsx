'use client';

import { useState, useEffect } from 'react';
import { Bell, Droplet, Heart, Users, LogIn, UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LampDemo } from '@/components/ui/lamp';
import { useAuth } from '@/lib/auth-context';
import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function Home() {
  const router = useRouter();
  const { error } = useAuth();
  
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-red-100 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Droplet className="h-8 w-8 text-[#DC2626] animate-pulse" />
            <h1 className="text-2xl font-bold text-gray-900">
              R.A.<span className="text-[#DC2626]">K.T</span>
            </h1>
          </div>
          <nav className="flex space-x-4">
            <Link 
              href="/auth/login"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-transparent border border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626]/10 transition-colors"
            >
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
            <Link 
              href="/auth/register"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#DC2626] text-white hover:bg-[#B91C1C] transition-colors"
            >
              <UserPlus className="h-5 w-5" />
              <span>Sign Up</span>
            </Link>
          </nav>
        </div>
      </header>
      

      {/* Hero Section with Lamp Effect */}
      <LampDemo />
      
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Why Choose <span className="text-[#DC2626]">Blood</span>Connect?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Join our mission to ensure blood availability for everyone in need
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-white border border-red-100 shadow-sm hover:shadow-md transition-all">
              <div className="h-12 w-12 bg-[#DC2626]/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-[#DC2626]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-time Matching
              </h3>
              <p className="text-gray-600">
                Instantly connect with compatible donors in your area when blood is needed.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white border border-red-100 shadow-sm hover:shadow-md transition-all">
              <div className="h-12 w-12 bg-[#DC2626]/10 rounded-lg flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-[#DC2626]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Emergency Alerts
              </h3>
              <p className="text-gray-600">
                Receive immediate notifications for urgent blood requirements in your vicinity.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-white border border-red-100 shadow-sm hover:shadow-md transition-all">
              <div className="h-12 w-12 bg-[#DC2626]/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-[#DC2626]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Community Impact
              </h3>
              <p className="text-gray-600">
                Join thousands of donors making a difference in their communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-white border border-red-100 shadow-sm">
              <div className="flex flex-col items-center">
                <Heart className="h-8 w-8 text-[#DC2626] mb-2" />
                <p className="text-gray-600 text-sm">Lives Saved</p>
                <p className="text-2xl font-bold text-gray-900">5,678+</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white border border-red-100 shadow-sm">
              <div className="flex flex-col items-center">
                <Users className="h-8 w-8 text-[#DC2626] mb-2" />
                <p className="text-gray-600 text-sm">Active Donors</p>
                <p className="text-2xl font-bold text-gray-900">1,234+</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white border border-red-100 shadow-sm">
              <div className="flex flex-col items-center">
                <Bell className="h-8 w-8 text-[#DC2626] mb-2" />
                <p className="text-gray-600 text-sm">Hospitals</p>
                <p className="text-2xl font-bold text-gray-900">348+</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white border border-red-100 shadow-sm">
              <div className="flex flex-col items-center">
                <Droplet className="h-8 w-8 text-[#DC2626] mb-2" />
                <p className="text-gray-600 text-sm">Blood Units</p>
                <p className="text-2xl font-bold text-gray-900">9,846+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Every donation counts. Join our community today and help save lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/auth/login')}
              className="px-8 py-4 rounded-lg bg-[#DC2626] text-white font-semibold hover:bg-[#B91C1C] transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push('/about')}
              className="px-8 py-4 rounded-lg bg-transparent border border-[#DC2626] text-[#DC2626] font-semibold hover:bg-[#DC2626]/10 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}