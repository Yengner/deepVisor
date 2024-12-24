'use client';

import { useState } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';

interface AggregatedMetric {
  platform: string;
  spend: number;
  leads: number;
  ctr: number;
  impressions: number;
  link_clicks: number;
  messages: number;
  performanceScore: number;
  percentageChange: number;
}

interface TopPlatformsProps {
  platforms: AggregatedMetric[];
}

const TopPlatforms = ({ platforms }: TopPlatformsProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 col-span-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Top Platforms</h2>
      </div>

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
            <th className="border-b py-2 text-right relative">
              <div className="flex items-center justify-end gap-1">
                Performance Score
                <div
                  className="w-4 h-4 text-gray-700 cursor-pointer"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2a10 10 0 100 20 10 10 0 000-20zm.75 14.25a.75.75 0 11-1.5 0v-6a.75.75 0 111.5 0v6zM12 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {showTooltip && (
                  <div className="absolute bottom-10 left-4 bg-gray-100 text-gray-700 text-xs rounded-lg p-2 shadow-lg z-10">
                    <p>
                      The Performance Score is a weighted score (0-100) based on metrics like spend, leads, messages, CTR, and
                      impressions.
                    </p>
                    <p className="mt-2 text-green-600">
                      <strong className="text-gray-700">Industry Average:</strong> 24
                    </p>
                  </div>
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {platforms.map((platform) => (

            <tr key={platform.platform}>
              {/* Platform Name */}
              <td className="border-b py-3 flex items-center gap-2">
                <img
                  src={`/${platform.platform.toLowerCase()}.png`} // Replace with the correct icons
                  alt={`${platform.platform} logo`}
                  className="h-8 w-8 rounded-full"
                />
                <span className="font-medium text-gray-700 capitalize">{platform.platform}</span>
              </td>
              {/* Spend */}
              <td className="border-b py-3 text-right text-green-600 font-medium">
                ${platform.spend.toLocaleString()}
              </td>
              {/* Leads */}
              <td className="border-b py-3 text-right text-gray-700 font-medium">
                {platform.leads.toLocaleString()}
              </td>
              {/* Messages */}
              <td className="border-b py-3 text-right text-gray-700 font-medium">
                {platform.messages.toLocaleString()}
              </td>
              {/* Link Clicks */}
              <td className="border-b py-3 text-right text-gray-700 font-medium">
                {platform.link_clicks.toLocaleString()}
              </td>
              {/* Impressions */}
              <td className="border-b py-3 text-right text-gray-700 font-medium">
                {platform.impressions.toLocaleString()}
              </td>
              {/* CTR */}
              <td className="border-b py-3 text-right text-gray-700 font-medium">
                {platform.ctr.toFixed(2)}%
              </td>
              {/* Performance Score */}
              <td className="border-b py-3 text-right text-gray-700 font-medium flex items-center justify-end gap-2">
                {/* Current Performance Score */}
                  <span>{platform.performanceScore.toFixed(2)}</span>

                  {/* Percentage Change */}
                  {platform.percentageChange !== null && (
                    <span
                      className={`inline-flex items-center px-2 py-0.5 text-sm font-medium ${platform.percentageChange > 0
                          ? 'text-green-800'
                          : 'text-red-800'
                        }`}
                    >
                      {platform.percentageChange > 0 ? (
                        <AiOutlineArrowUp className="w-3 h-3 mr-1" />
                      ) : (
                        <AiOutlineArrowDown className="w-3 h-3 mr-1" />
                      )}
                      {Math.abs(platform.percentageChange).toFixed(1)}%
                    </span>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopPlatforms;