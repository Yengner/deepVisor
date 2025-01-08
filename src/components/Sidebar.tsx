'use client';

import { useGlobalState } from '@/lib/store/globalState';
import { useRouter } from 'next/navigation';
import { LuUser } from 'react-icons/lu';
import { MdTrendingDown } from 'react-icons/md';
import { useMockNotifications } from '@/hooks/useMockNotifcations'; // Mock notifications
import LogoutButton from './LogoutButton';
import { createClient } from '@/lib/utils/supabase/clients/browser';
import { useEffect, useState } from 'react';

interface User {
  firstName: string;
  email: string;
}

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useGlobalState();
  const { notifications } = useMockNotifications(); // Fetch fake notifications
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);

  // Fetch user info on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user info:', error);
        setUser(null);
      } else {
        setUser({
          firstName: data.user.user_metadata?.first_name || 'User',
          email: data.user.email || 'No email provided',
        });
      }
    };

    fetchUserInfo();
  }, [supabase]);

  const handleNavigate = (path: string) => {
    router.push(path);
    setSidebarOpen(false);
  };

  return (
    <div
      className={`flex flex-col fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* User Info */}
      <div className="p-4 text-center border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl font-bold">
            {user?.firstName[0]}
          </div>
        </div>
        <div className="mt-2 text-gray-800 dark:text-gray-200">
          <p className="text-lg font-semibold">{user?.firstName}</p>
          <p className="text-sm truncate">{user?.email}</p>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Notifications</h2>
        {notifications.length > 0 ? (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md shadow cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-800 transition"
                onClick={() => handleNavigate(`/campaigns/${notification.campaignId}`)}
              >
                <MdTrendingDown className="inline-block text-emerald-600 mr-2" />
                {notification.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No new notifications</p>
        )}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <button
          onClick={() => handleNavigate('/settings')}
          className="w-full flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md transition"
        >
          <LuUser />
          Settings
        </button>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
