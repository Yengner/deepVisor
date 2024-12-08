'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      {/* TopBar */}
      <header className="bg-emerald-700 text-white py-4 px-8 shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">DeepVisor</h1>
          <nav className="flex gap-6">
            <button
              onClick={() => router.push('/help')}
              className="text-white hover:underline"
            >
              Help
            </button>
            <button
              onClick={() => router.push('/blog')}
              className="text-white hover:underline"
            >
              Blog
            </button>
            <button
              onClick={() => router.push('/sign-in')}
              className="bg-white text-emerald-700 font-bold px-4 py-2 rounded hover:bg-gray-200"
            >
              Log In
            </button>
            <button
              onClick={() => router.push('/sign-up')}
              className="bg-emerald-600 font-bold px-4 py-2 rounded hover:bg-emerald-800"
            >
              Sign Up
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center bg-gray-100 px-4">
        <h1 className="text-4xl font-bold mb-6">
          Empower Your Business with Advanced Ad Insights
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mb-8">
          DeepVisor provides cutting-edge tools for managing your ad campaigns, setting up pixels, and analyzing results to maximize your business growth.
        </p>
        <button
          onClick={() => router.push('/auth/sign-up')}
          className="bg-emerald-700 text-white font-bold px-8 py-4 rounded-lg text-xl hover:bg-emerald-800"
        >
          Get Started Now
        </button>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} DeepVisor. All rights reserved.</p>
          <nav className="flex justify-center gap-4 mt-2">
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="hover:underline">
              Terms of Service
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
