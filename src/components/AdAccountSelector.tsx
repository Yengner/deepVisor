'use client';

import { useGlobalState } from '@/lib/store/globalState';
import { useAdAccounts } from '@/hooks/useAdAccounts';

const AdAccountSelector = () => {
  const { selectedPlatform, selectedAdAccount, setAdAccount } = useGlobalState();
  const { data: adAccounts, isLoading, error } = useAdAccounts(selectedPlatform);

  if (!selectedPlatform) return null; // Don't show the selector if no platform is selected

  if (isLoading) {
    return <p>Loading ad accounts...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error fetching ad accounts: {error.message}</p>;
  }

  if (!adAccounts?.length) {
    return <p>No ad accounts available for {selectedPlatform}</p>;
  }

  return (
    <select
      value={selectedAdAccount || ''}
      onChange={(e) => setAdAccount(e.target.value)}
      className="py-2 px-4 border rounded dark:bg-gray-700"
    >
      <option value="" disabled>
        Select Ad Account
      </option>
      {adAccounts.map((account) => (
        <option key={account.id} value={account.id}>
          {account.account_id}
        </option>
      ))}
    </select>
  );
};

export default AdAccountSelector;
