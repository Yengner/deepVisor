'use client';

interface AdAccountSelectorProps {
  adAccounts: Array<{ ad_account_id: string }> | null; // Null when not yet loaded
  selectedAdAccount: string | null;
  setAdAccount: (adAccount: string) => void;
  isLoading: boolean;
  selectedPlatform: string | null;
}

const AdAccountSelector = ({
  adAccounts,
  selectedAdAccount,
  setAdAccount,
  isLoading,
  selectedPlatform,
}: AdAccountSelectorProps) => {

  if (isLoading || !selectedPlatform) {
    return <p>Loading ad accounts...</p>;
  }

  return (
    <select
      value={selectedAdAccount || ''}
      onChange={(e) => setAdAccount(e.target.value)}
      className="py-2 px-4 border rounded dark:bg-gray-700 dark:text-white"
    >
      <option value="" disabled>
        Select Ad Account
      </option>
      {adAccounts?.map((account) => (
        <option key={account.ad_account_id} value={account.ad_account_id}>
          {account.ad_account_id}
        </option>
      ))}
    </select>
  );
};

export default AdAccountSelector;
