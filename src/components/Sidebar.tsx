'use client';

import { useGlobalState } from '@/lib/store/globalState';

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, selectedPlatform, setPlatform } = useGlobalState();

  const platforms = ['facebook', 'tiktok', 'instagram'];

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } z-50`}
    >
      {/* Close Button */}
      <button
        onClick={() => setSidebarOpen(false)}
        className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 focus:outline-none"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Sidebar Content */}
      <div className="p-4 text-center font-bold text-gray-700 dark:text-gray-300">
        Platforms
      </div>
      <div className="flex-1">
        {platforms.map((platform) => (
          <button
            key={platform}
            onClick={() => {
              setPlatform(platform);
              setSidebarOpen(false); // Close sidebar after selection
            }}
            className={`w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700 ${
              selectedPlatform === platform ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
          >
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
