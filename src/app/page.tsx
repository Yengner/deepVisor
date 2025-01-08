'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const goToDashboard = () => {
    router.push('/dashboard/platforms');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to DeepVisor</h1>
          <p className="text-xl font-medium mb-6">
            Empower your business with actionable insights and seamless ad campaign management.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleSignUp}
              className="px-6 py-3 bg-white text-teal-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
            >
              Sign Up
            </button>
            <button
              onClick={handleLogin}
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
            >
              Log In
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-teal-600 mb-4">Streamlined Campaigns</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Create, manage, and optimize your ad campaigns effortlessly with our easy-to-use tools.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Data-Driven Insights</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Visualize performance metrics and uncover actionable insights to grow your business.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-yellow-600 mb-4">Multi-Platform Support</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Manage ads across Facebook, Instagram, and more—all from one platform.
            </p>
          </div>
        </div>
      </main>

      {/* Call-to-Action Section */}
      <section className="bg-teal-600 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6">
            Sign up today and take your advertising to the next level.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleSignUp}
              className="px-6 py-3 bg-white text-teal-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
            >
              Sign Up
            </button>
            <button
              onClick={goToDashboard}
              className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg shadow transition"
            >
              Go to Dashboard (Testing)
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 py-4">
        <div className="container mx-auto px-6 text-center text-gray-700 dark:text-gray-300">
          &copy; {new Date().getFullYear()} DeepVisor. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
