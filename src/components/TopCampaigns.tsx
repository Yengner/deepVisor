'use client';

interface Campaign {
  id: string;
  name: string;
  status: string;
  start_time: string;
  stop_time: string;
  impressions: number;
  clicks: number;
  spend: number;
  leads: number;
  messages: number;
}

interface TopCampaignsProps {
  campaignsData: {
    top3ByLeads: Campaign[]; // Only using top3ByLeads for simplicity
  };
}

const TopCampaigns = ({ campaignsData }: TopCampaignsProps) => {
  const campaigns = campaignsData.top3ByLeads || []; // Fallback if no data is available

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Top 3 Campaigns by Leads</h2>

      {campaigns.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No campaigns available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-gray-100 dark:bg-gray-700 shadow rounded-lg p-4">
              {/* Campaign Name */}
              <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100">
                {campaign.name || 'Unnamed Campaign'}
              </h3>

              {/* Campaign Details */}
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Status:</strong>{' '}
                  <span
                    className={`font-semibold ${campaign.status === 'ACTIVE' ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {campaign.status}
                  </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Date Range:</strong>{' '}
                  {campaign.start_time && campaign.stop_time
                    ? `${new Date(campaign.start_time).toLocaleDateString()} - ${new Date(
                        campaign.stop_time
                      ).toLocaleDateString()}`
                    : 'N/A'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Leads:</strong> {Number(campaign.leads || 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Spend:</strong> ${Number(campaign.spend || 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Clicks:</strong> {Number(campaign.clicks || 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Impressions:</strong> {Number(campaign.impressions || 0).toLocaleString()}
                </p>
              </div>

              {/* View Details Link */}
              <a
                href={`/campaigns/${campaign.id}`}
                className="text-sm text-blue-500 hover:underline mt-2 inline-block"
              >
                View Details →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopCampaigns;
