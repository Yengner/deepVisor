'use client';

import { useState } from 'react';
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
    <div className="flex flex-col items-center pl-8 pr-8 pt-6 pb-4">
      {/* Image and Name */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative w-16 h-16">
          <Image
            src={`/images/platforms/logo/${topPlatform.platform_name.toLowerCase()}.png`}
            alt={`${topPlatform.platform_name} logo`}
            className="object-contain"
            width={64}
            height={64}
          />
        </div>
        <h2 className="text-lg font-semibold mt-2 text-gray-800">
          {topPlatform.platform_name.charAt(0).toUpperCase() + topPlatform.platform_name.slice(1)}
        </h2>
        <p className="text-sm text-gray-500">Top Performing Platform</p>
      </div>

      {/* Dropdown */}
      <div className="w-full flex justify-center mb-4">
        <select
          className="bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Stats */}
      <div className="w-full">
        <div className="flex justify-between py-2 text-sm">
          <span className="text-gray-500">Spend</span>
          <span className="font-medium text-gray-700">
            ${topPlatform.total_spend.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between py-2 text-sm">
          <span className="text-gray-500">CTR</span>
          <span className="font-medium text-gray-700">
            {topPlatform.total_ctr.toFixed(2)}%
          </span>
        </div>
        <div className="flex justify-between py-2 text-sm">
          <span className="text-gray-500">Leads</span>
          <span className="font-medium text-gray-700">
            {topPlatform.total_leads.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between py-2 text-sm">
          <span className="text-gray-500">Messages</span>
          <span className="font-medium text-gray-700">
            {topPlatform.total_messages.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between py-2 text-sm">
          <span className="text-gray-500">Link Clicks</span>
          <span className="font-medium text-gray-700">
            {topPlatform.total_link_clicks.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between py-2 text-sm">
          <span className="text-gray-500">Impressions</span>
          <span className="font-medium text-gray-700">
            {topPlatform.total_impressions.toLocaleString()}
          </span>
        </div>
      </div>

      {/* View Analytics Link */}

    </div>
  );
};

export default TopPlatformCard;
