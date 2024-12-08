'use client';

import { useGlobalState } from '@/lib/store/globalState';
import AdAccountSelector from './AdAccountSelector';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import { useAdAccounts } from '@/hooks/useAdAccounts';
import PlatformAdAccountSelector from './Platform&AdAccountSelector';
import { useEffect } from 'react';

const TopBar = () => {
  const { selectedPlatform, setPlatform, toggleSidebar, selectedAdAccount, setAdAccount, isHydrated } = useGlobalState();
  const { data, isLoading } = useAdAccounts(selectedPlatform);
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

  // Automatically select the first ad account when a platform is selected and no ad account is selected
  useEffect(() => {
    if (selectedPlatform && !selectedAdAccount && data?.adAccounts?.length) {
      setAdAccount(data.adAccounts[0].ad_account_id);
    }
  }, [selectedPlatform, selectedAdAccount, data, setAdAccount]);

  // Wait until hydration is complete and `selectedAdAccount` is valid
  if (!isHydrated || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3498db" size={50} />
      </div>
    );
  }


  return (
    <div className="flex justify-between items-center px-10 py-4 bg-emerald-700 shadow-lg">
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
            className="text-lg text-white font-bold hover:text-gray-200 transition"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Platform & Ad Account Selectors */}
      <div className="flex items-center">
        <PlatformAdAccountSelector />

      </div>
    </div>
  );
};

export default TopBar;