'use client';

import { useGlobalState } from '@/lib/store/globalState';
import { usePathname, useRouter } from 'next/navigation';

const TopBar = () => {
  const { toggleSidebar } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  // Updated navigation items with a "comingSoon" flag
  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard/platforms', comingSoon: false },
    { label: 'Reports', path: '/reports', comingSoon: true },
    { label: 'Campaigns', path: '/campaigns', comingSoon: true },
    { label: 'Analytics', path: '/analytics', comingSoon: true },
    { label: 'Integration', path: '/integration', comingSoon: false },
    // Add future tabs here
  ];

  const handleNavigation = (path: string, comingSoon: boolean) => {
    if (!comingSoon) {
      router.push(path);
    }
  };

  const getPageTitle = () => {
    if (pathname.startsWith('/dashboard/platforms')) return 'Dashboard';
    if (pathname.startsWith('/reports')) return 'Reports';
    if (pathname.startsWith('/campaigns')) return 'Campaigns';
    if (pathname.startsWith('/analytics')) return 'Analytics';
    if (pathname.startsWith('/integration')) return 'Integration';
    return 'DeepVisor';
  };

  return (
    <div className="flex justify-between items-center px-10 py-4 bg-gradient-to-r from-teal-500 to-blue-500 shadow-lg h-auto">
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
      <div className="flex items-center ">
        {navigationItems.map((item) => (
          <div key={item.path} className="relative group">
            <button
              onClick={() => handleNavigation(item.path, item.comingSoon)}
              className={`text-lg font-bold px-4 py-2 rounded transition ${
                item.comingSoon
                  ? 'text-gray-200 cursor-not-allowed'
                  : 'text-[#fbfbe9] hover:text-gray-200'
              }`}
            >
              {item.label}
            </button>
            {item.comingSoon && (
              <div className="coming-soon-overlay">
                <span>Coming Soon</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
