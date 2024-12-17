'use client';

import { useGlobalState } from '@/lib/store/globalState';
import { useRouter } from 'next/navigation';
import PlatformAdAccountSelector from './Platform&AdAccountSelector';

const TopBar = () => {
  const { toggleSidebar } = useGlobalState();
  const router = useRouter();

  const user = {
    firstName: 'Yengner',
    email: 'test@gmail.com'
  };

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Campaigns', path: '/campaigns' },
    { label: 'Integration', path: '/integration' },
    { label: 'Analytics', path: '/analytics' },
    // Add future tabs here
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };


  return (
    <div className="flex justify-between items-center px-10 py-4 bg-[#3e4e38] shadow-lg h-auto">
      {/* Left Section: Burger Menu and Logo */}
      <div className="flex items-center gap-8">
        {/* Burger Menu */}
        <button
          onClick={toggleSidebar}
          className="bg-white text-gray-700 shadow-md rounded-full p-2 hover:bg-gray-100 transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* LOGO */}
        <h1 className="text-white text-xl font-bold tracking-wide">
          LOGO <span className="text-blue-200">DEEPVISOR</span>
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-8">
        {navigationItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className="text-lg text-[#fbfbe9] font-bold hover:text-gray-200 transition"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Platform & Ad Account Selectors */}
      <div className="flex items-center selector-container">
        <PlatformAdAccountSelector />
      </div>
      
    </div>
  );
};

export default TopBar;