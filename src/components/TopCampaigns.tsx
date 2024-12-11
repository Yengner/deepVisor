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
  const campaigns = campaignsData.top3ByLeads || []; 

  return (
    <div className="bg-[#e1e6cb]p-6">
      <h2 className="text-xl font-bold text-[#3e4e38] mb-4">Top 3 Campaigns by Leads</h2>
      {campaigns.length === 0 ? (
        <p className="text-sm text-gray-200">
          No campaigns available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-[#faffe3] shadow border border-gray-300 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              {/* Campaign Name */}
              <h3 className="text-lg font-semibold text-[#5f743b] truncate">
                {campaign.name || 'Unnamed Campaign'}
              </h3>

              {/* Campaign Details in Two Columns */}
              <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2  overflow-hidden whitespace-nowrap text-ellipsis">
                {/* Status */}
                <div className="text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300 ">Status:</span>{' '}
                  <span
                    className={`px-2 py-1 text-xs font-bold rounded ${
                      campaign.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {campaign.status}
                  </span>
                </div>
                {/* Date Range */}
                <div className="text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Date Range:</span>{' '}
                  <span className="text-gray-600 dark:text-gray-400">
                    {campaign.start_time && campaign.stop_time
                      ? `${new Date(campaign.start_time).toLocaleDateString()} - ${new Date(
                          campaign.stop_time
                        ).toLocaleDateString()}`
                      : 'N/A'}
                  </span>
                </div>
                {/* Leads */}
                <div className="text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Leads:</span>{' '}
                  <span className="text-gray-600 dark:text-gray-400">{Number(campaign.leads || 0).toLocaleString()}</span>
                </div>
                {/* Clicks */}
                <div className="text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Clicks:</span>{' '}
                  <span className="text-gray-600 dark:text-gray-400">{Number(campaign.clicks || 0).toLocaleString()}</span>
                </div>
                {/* Spend */}
                <div className="text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Spend:</span>{' '}
                  <span className="text-gray-600 dark:text-gray-400">${Number(campaign.spend || 0).toLocaleString()}</span>
                </div>
                {/* Impressions */}
                <div className="text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Impressions:</span>{' '}
                  <span className="text-gray-600 dark:text-gray-400">
                    {Number(campaign.impressions || 0).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* View Details Link */}
              <a
                href={`/campaigns/${campaign.id}`}
                className="block mt-4 text-center text-sm font-medium text-white bg-[#dba866] hover:bg-emerald-800 rounded-md px-4 py-2"
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