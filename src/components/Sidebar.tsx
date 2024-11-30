'use client';

import { useGlobalState } from '@/lib/store/globalState';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LuLogOut, LuUser2 } from 'react-icons/lu'
const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, selectedPlatform, setPlatform } = useGlobalState();
  const router = useRouter(); // Initialize router
  const platforms = ['facebook', 'tiktok', 'instagram'];

  const user = {
    firstName: 'Yengner',
    email: 'test@gmail.com'
  }

  const handlePush = () => {
    router.push('/settings')
  };
  return (
    <div
      className={`flex flex-col fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}
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
            className={`w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedPlatform === platform ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
          >
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </button>
        ))}
      </div>

      {/* Bottom section */}
      <div className="flex flex-col m-2">
        {/* User profile */}
        <div className="flex flex-row justify-center py-11 border-t border-black border-opacity-[0.10]">
          <div className="flex flex-row gap-4 items-center">

            <div className='footer_name'>
              <p className="text-2xl font-bold text-gray-70">
                {user.firstName[0]}
              </p>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-[19px]">{user.firstName}</span>
              <p className="text-[15px] truncate font-normal text-black ">
                {user?.email}
              </p>
            </div>

            <div>
              <button onClick={handlePush}>
                <LuUser2 className='w-6 h-6'/>
              </button>
            </div>
          </div>

          {/* <BsThreeDotsVertical size={24} /> */}
        </div>

        {/* Logout Button */}
        <button className="flex flex-row justify-center items-center opacity-75 focus:opacity-100 hover:opacity-100 bg-gray-900 bg-opacity-[0.08] rounded-md shadow py-3 justify-left font-semibold transition-opacity">
          <LuLogOut/>
          Logout
        </button>
      </div>
    </div>

  );
};

export default Sidebar;
