// LogoutButton.tsx
'use client';

import React, { useState } from 'react';
import { handleSignOut } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation'; // Import router to redirect after logout
import toast from 'react-hot-toast';

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    const { errorMessage } = await handleSignOut();

    if (errorMessage) {
        toast.error(errorMessage)
        
    } else {
        router.push('/login'); // Redirect after logout
        toast.success("Signed Out!")
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full mt-4 flex items-center gap-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-700 p-2 rounded-md transition"
    >
      {loading ? 'Logging Out...' : 'Logout'}
    </button>
  );
};

export default LogoutButton;
