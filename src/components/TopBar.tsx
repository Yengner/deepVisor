'use client';

import { useGlobalState } from '@/lib/store/globalState';
import AdAccountSelector from './AdAccountSelector';
import { useRouter } from 'next/navigation';

const TopBar = () => {
  const { selectedPlatform, setPlatform } = useGlobalState();
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
          {/* Add more platforms as needed | Also make sure that this become dynamic through integration check*/} 
        </select>

        {selectedPlatform && <AdAccountSelector />}
      </div>
    </div>
  );
};

export default TopBar;
