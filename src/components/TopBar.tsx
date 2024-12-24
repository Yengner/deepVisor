'use client';

import { useGlobalState } from '@/lib/store/globalState';
import { usePathname, useRouter } from 'next/navigation';
import PlatformAdAccountSelector from './Platform&AdAccountSelector';

const TopBar = () => {
  const { toggleSidebar } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

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

  const getPageTitle = () => {
    if (pathname.startsWith('/dashboard')) return 'Dashboard';
    if (pathname.startsWith('/campaigns')) return 'Campaigns';
    if (pathname.startsWith('/integration')) return 'Integration';
    if (pathname.startsWith('/analytics')) return 'Analytics';
    return 'DeepVisor';
  };


  return (
    <div className="flex justify-between items-center px-10 py-4 bg-[#5c6bc0] shadow-lg h-auto">
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

        {/* Page Title */}
        <h1 className="text-lg font-bold text-white">{getPageTitle()}</h1>
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

    </div>
  );
};

export default TopBar;