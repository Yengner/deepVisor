'use client';

import { useGlobalState } from '@/lib/store/globalState';

const Sidebar = () => {
  const { selectedPlatform, setPlatform } = useGlobalState();

  const platforms = ['facebook', 'tiktok', 'instagram']; // change this to be dyanmic check if platform is inetgrated through supabase

  return (
    <div className="w-16 md:w-64 bg-white dark:bg-gray-800 shadow flex flex-col">
      <div className="p-4 text-center font-bold text-gray-700 dark:text-gray-300">Platforms</div>
      <div className="flex-1">
        {platforms.map((platform) => (
          <button
            key={platform}
            onClick={() => setPlatform(platform)}
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
