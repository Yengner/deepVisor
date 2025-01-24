'use client';

// import { useState } from "react";
import Image from 'next/image';

interface AggregatedMetric {
  platform_integration_id: string;
  total_spend: number;
  total_leads: number;
  total_clicks: number;
  total_ctr: number;
  total_link_clicks: number;
  total_impressions: number;
  total_messages: number;
  platform_name: string;
}

interface TopPlatformsProps {
  platforms: AggregatedMetric[];
}

const TopPlatforms = ({ platforms }: TopPlatformsProps) => {
  // const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="pl-4 pr-4 max-h-56 overflow-y-scroll">

      {/* Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-500">
            <th className="border-b py-2">Platform</th>
            <th className="border-b py-2 text-right">Spend</th>
            <th className="border-b py-2 text-right">Leads</th>
            <th className="border-b py-2 text-right">Messages</th>
            <th className="border-b py-2 text-right">Link Clicks</th>
            <th className="border-b py-2 text-right">Impressions</th>
            <th className="border-b py-2 text-right">CTR</th>
          </tr>
        </thead>
        <tbody>
          {platforms.map((platform) => (
            <tr key={platform.platform_integration_id}>
              {/* Platform Name */}
              <td className="border-b py-3 flex items-center gap-2">
                <div className="relative h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src={`/images/platforms/logo/${platform.platform_name.toLowerCase()}.png`} 
                    alt={`${platform.platform_name} logo`}
                    className="fill"
                    width={32}
                    height={32}
                  />
                </div>
                <span className="font-medium text-gray-700 capitalize">
                  {platform.platform_name}
                </span>
              </td>
              {/* Spend */}
              <td className="border-b py-3 text-right text-green-600 font-medium">
                ${platform.total_spend.toLocaleString()}
              </td>
              {/* Leads */}
              <td className="border-b py-3 text-right text-gray-700 font-medium">
                {platform.total_leads.toLocaleString()}
              </td>
              {/* Messages */}
              <td className="border-b py-3 text-right text-gray-700 font-medium">
                {platform.total_messages.toLocaleString()}
              </td>
              {/* Link Clicks */}
              <td className="border-b py-3 text-right text-gray-700 font-medium">
                {platform.total_link_clicks.toLocaleString()}
              </td>
              {/* Impressions */}
              <td className="border-b py-3 text-right text-gray-700 font-medium">
                {platform.total_impressions.toLocaleString()}
              </td>
              {/* CTR */}
              <td className="border-b py-3 text-right text-gray-700 font-medium">
                {platform.total_ctr.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopPlatforms;
