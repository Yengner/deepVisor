'use client';

import { useState } from 'react';

interface AggregatedMetric {
  id: string;
  user_id: string;
  platform: string;
  spend: number;
  leads: number;
  ctr: number;
  link_clicks: number;
  impressions: number;
  messages: number;
}

interface TopPlatformCardProps {
  topPlatforms: {
    leads: AggregatedMetric;
    ctr: AggregatedMetric;
    link_clicks: AggregatedMetric;
    impressions: AggregatedMetric;
    messages: AggregatedMetric;
  };
}

const TopPlatformCard = ({ topPlatforms }: TopPlatformCardProps) => {
  const [selectedMetric, setSelectedMetric] = useState<'leads' | 'ctr' | 'link_clicks' | 'impressions' | 'messages'>('leads');

  const topPlatform = topPlatforms[selectedMetric];

  return (
    <div className="bg-gradient-to-r from-purple-100 via-blue-50 to-blue-100 shadow-lg rounded-xl p-4 h-auto flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center bg-purple-200 rounded-full">
          <img
            src={`/${topPlatform.platform.toLowerCase()}.png`} 
            alt={`${topPlatform.platform} logo`}
            className="w-6 h-6"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">{topPlatform.platform.charAt(0).toUpperCase() + topPlatform.platform.slice(1)}</h2>
          <p className="text-xs text-gray-600">Top Performing Platform</p>
        </div>

        <div>
          <select
            className="bg-white border border-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            value={selectedMetric}
            onChange={(e) =>
              setSelectedMetric(
                e.target.value as 'leads' | 'ctr' | 'link_clicks' | 'impressions' | 'messages'
              )
            }
          >
            <option value="leads">Leads</option>
            <option value="messages">Messages</option>
            <option value="link_clicks">Link Clicks</option>
            <option value="impressions">Impressions</option>
            <option value="ctr">CTR</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-lg p-3 shadow-sm">
        <div className="flex justify-between py-1">
          <span className="text-gray-500 text-xs">Spend</span>
          <span className="font-medium text-green-600 text-sm">
            ${topPlatform.spend.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-gray-500 text-xs">{selectedMetric?.charAt(0).toUpperCase() + selectedMetric?.slice(1)}</span>
          <span className="font-medium text-gray-700 text-sm">
            {topPlatform[selectedMetric]?.toLocaleString()}
          </span>
        </div>

      </div>

      {/* Link */}
      <a
        href={`/analytics?platform=${topPlatform.platform}`}
        className="text-sm font-medium text-blue-600 hover:underline mt-auto"
      >
        View Analytics →
      </a>
    </div>
  );
};

export default TopPlatformCard;