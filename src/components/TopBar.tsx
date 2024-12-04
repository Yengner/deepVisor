'use client';

import { useGlobalState } from '@/lib/store/globalState';
import AdAccountSelector from './AdAccountSelector';
import { useRouter } from 'next/navigation';

const TopBar = () => {
  const { selectedPlatform, setPlatform, toggleSidebar } = useGlobalState();
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
    <div className="flex justify-between items-center px-10 py-4 bg-emerald-700 shadow-md dark:bg-gray-800">
      {/* Left Section: Burger Menu and Logo */}
      <div className="flex items-center gap-16">
        {/* Burger Menu */}
        <div className="bg-white shadow-md focus:opacity-100 hover:opacity-80 transition-opacity pb-1 pl-2 pr-2 pt-1 rounded-full">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 dark:text-gray-300 flex flex-row gap-2 items-center"
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
            <h2 className="flex size-8 items-center justify-center rounded-full bg-gray-200 max-xl:hidden">
              {user.firstName[0]}
            </h2>
          </button>
        </div>

        {/* LOGO */}
        <div className="items-center text-white text-xl">
          <h1>LOGO 'DEEPVISOR'</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6">
        {navigationItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className="font-medium text-lg text-white hover:text-opacity-50 dark:text-gray-300"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Platform & Ad Account Selectors */}
      <div className="flex items-center gap-4">
        <select
          value={selectedPlatform || ''}
          onChange={(e) => setPlatform(e.target.value)}
          className="py-2 px-4 border rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="" disabled>
            Select Platform
          </option>
          <option value="facebook">Facebook</option>
          <option value="tiktok">TikTok</option>
          <option value="instagram">Instagram</option>
          {/* Dynamically populate based on integration */}
        </select>

        {selectedPlatform && <AdAccountSelector />}
      </div>
    </div>
  );
};

export default TopBar;
