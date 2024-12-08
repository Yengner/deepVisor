'use client';

import { useGlobalState } from '@/lib/store/globalState';
import { useAdAccounts } from '@/hooks/useAdAccounts';
import { ReactNode } from 'react';
import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

const GlobalWrapper = ({ children }: { children: ReactNode }) => {
  const { selectedPlatform } = useGlobalState();
  const { data, isLoading } = useAdAccounts(selectedPlatform);
  const router = useRouter();


  if (!selectedPlatform || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#3498db" size={50} />
      </div>
    );
  }

  // Handle no ad accounts state
  if (!data?.hasAdAccounts) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 text-center max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            No Ad Accounts Found for {selectedPlatform}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            It seems like you don't have any ad accounts set up for this platform.
            Setting up an ad account is necessary to manage your ads and campaigns.
          </p>
          <button
            onClick={() => router.push(`/help/${selectedPlatform}/setup-guide`)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Learn How to Set Up an Ad Account
          </button>
        </div>
      </div>
    );
  }

  // Render children only after everything is ready
  return <>{children}</>;
};
export default GlobalWrapper;
