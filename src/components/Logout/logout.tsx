// LogoutButton.tsx
'use client';

import React, { useState } from 'react';
import { handleSignOut } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation'; // Import router to redirect after logout
import toast from 'react-hot-toast';

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize router

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
      className={`gap-3 opacity-90 focus:opacity-100 hover:opacity-100 bg-white text-center rounded py-3 px-4 justify-c font-semibold transition-opacity items-center`}
    >
      {loading ? 'Logging Out...' : 'Logout'}
    </button>
  );
};

export default LogoutButton;
