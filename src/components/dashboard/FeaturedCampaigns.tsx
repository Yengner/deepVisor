'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Platform {
  platform_integration_id: string;
  platform_name: string;
  total_spend: number;
  total_leads: number;
  total_clicks: number;
  total_ctr: number;
  total_link_clicks: number;
  total_impressions: number;
  total_conversions: number;
  total_messages: number;
}

interface Campaign {
  campaign_id: string;
  campaign_name: string;
  leads: number;
  clicks: number;
  messages: number;
  spend: number;
  platform_name: string;
  conversion: number;
  conversion_rate: number;
  status: string;
}

interface FeaturedCampaignsProps {
  data?: {
    topPlatforms: Platform[];
    topCampaigns: Campaign[];
  };
}

const FeaturedCampaigns = ({ data }: FeaturedCampaignsProps) => {
  const { topPlatforms = [], topCampaigns = [] } = data || {};

  // Set the initial active platform
  const [activePlatformId, setActivePlatformId] = useState(
    topPlatforms.length > 0 ? topPlatforms[0].platform_integration_id : ''
  );

  // Filter campaigns for the active platform
  const filteredCampaigns = topCampaigns.filter(
    (campaign) =>
      topPlatforms.find((platform) => platform.platform_integration_id === activePlatformId)?.platform_name ===
      campaign.platform_name
  );

  return (
    <div className= "p-4 h-fit">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Featured Campaigns</h2>
          <p className="text-sm text-gray-500">Highlighting top platforms and campaigns</p>
        </div>
      </div>

      {/* Platform Tabs */}
      <div className="flex space-x-4 mb-4">
        {topPlatforms.map((platform) => (
          <button
            key={platform.platform_integration_id}
            onClick={() => setActivePlatformId(platform.platform_integration_id)}
            className={`px-4 py-2 rounded ${activePlatformId === platform.platform_integration_id
              ? 'bg-blue-100 text-blue-600 font-semibold'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {platform.platform_name[0].toLocaleUpperCase() + platform.platform_name.slice(1)}
          </button>
        ))}
      </div>

      {/* Campaigns Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Campaign Name</th>
            <th className="border-b p-2">Status</th>
            <th className="border-b p-2">Conversion</th>
          </tr>
        </thead>
        <tbody>
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => (
              <tr key={campaign.campaign_id}>
                <td className="border-b p-2 max-w-60 truncate overflow-hidden text-ellipsis">
                  <Link
                    href={`/analytics/${campaign.campaign_id}`}
                    className="text-gray-700 hover:underline"
                  >
                    {campaign.campaign_name}
                  </Link>
                </td>
                <td className="border-b p-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${campaign.status === 'ACTIVE'
                      ? 'bg-green-100 text-green-600'
                      : campaign.status === 'PAUSED'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-red-100 text-red-600'
                      }`}
                  >
                    {campaign.status}
                  </span>
                </td>
                <td className="border-b p-2">
                  {`${campaign.conversion_rate.toFixed(2)}% (${formatNumber(campaign.conversion)})`}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No campaigns available for this platform.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeaturedCampaigns;



function formatNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`; // Format millions
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}k`; // Format thousands
  } else {
    return value.toString(); // Return as is for smaller numbers
  }
}
