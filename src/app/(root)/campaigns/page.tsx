'use client';

import { useCampaigns } from '@/hooks/useCampaigns';
import { useGlobalState } from '@/lib/store/globalState';

const CampaignsPage = () => {
  const { selectedPlatform, selectedAdAccount } = useGlobalState();
  const { data: campaigns, isLoading, error } = useCampaigns(selectedPlatform, selectedAdAccount);

  if (!selectedPlatform || !selectedAdAccount) {
    return <p>Please select a platform and an ad account to view campaigns.</p>;
  }

  if (isLoading) {
    return <p>Loading campaigns...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error fetching campaigns: {error.message}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Campaigns</h1>

      {campaigns?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign: { id: string; name: string; status: string }) => (
            <div
              key={campaign.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md"
            >
              <h2 className="font-semibold text-lg mb-2">{campaign.name}</h2>
              <p>Status: <span className={campaign.status === 'active' ? 'text-green-600' : 'text-red-600'}>{campaign.status}</span></p>
              <button
                onClick={() => alert(`Details for Campaign ID: ${campaign.id}`)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No campaigns available for this ad account.</p>
      )}
    </div>
  );
};

export default CampaignsPage;
