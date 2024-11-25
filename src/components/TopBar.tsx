'use client';

import { useGlobalState } from '@/lib/store/globalState';
import AdAccountSelector from './AdAccountSelector';
import { useRouter } from 'next/navigation';

const TopBar = () => {
  const { selectedPlatform, setPlatform, toggleSidebar } = useGlobalState();
  const router = useRouter();

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
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow dark:bg-gray-800">
      {/* Burger Menu */}
      <button
        onClick={toggleSidebar}
        className="text-gray-700 dark:text-gray-300 focus:outline-none"
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

      {/* Navigation */}
      <div className="flex items-center gap-6">
        {navigationItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className="font-medium hover:underline dark:text-gray-300"
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
