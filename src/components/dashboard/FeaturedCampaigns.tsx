'use client';

import { useState } from 'react';

interface Campaign {
  title: string;
  status: string;
  conversion: string;
}

interface PlatformCampaignsProps {
  platforms: {
    id: string;
    name: string;
    campaigns: Campaign[];
  }[];
}

const PlatformCampaigns = ({ platforms }: PlatformCampaignsProps) => {
  const [activePlatform, setActivePlatform] = useState(platforms[0].id);

  const activeCampaigns = platforms.find((platform) => platform.id === activePlatform)?.campaigns || [];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Featured Campaigns</h2>
          <p className="text-sm text-gray-500">75% activity growth</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zM10 10a2 2 0 104 0 2 2 0 00-4 0zM14 10a2 2 0 114 0 2 2 0 01-4 0z" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => setActivePlatform(platform.id)}
            className={`px-4 py-2 rounded ${
              activePlatform === platform.id
                ? 'bg-blue-100 text-blue-600 font-semibold'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {platform.name}
          </button>
        ))}
      </div>

      {/* Campaigns Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Email Title</th>
            <th className="border-b p-2">Status</th>
            <th className="border-b p-2">Conversion</th>
          </tr>
        </thead>
        <tbody>
          {activeCampaigns.map((campaign, index) => (
            <tr key={index}>
              <td className="border-b p-2">{campaign.title}</td>
              <td className="border-b p-2">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    campaign.status === 'Sent'
                      ? 'bg-green-100 text-green-600'
                      : campaign.status === 'In Queue'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {campaign.status}
                </span>
              </td>
              <td className="border-b p-2">{campaign.conversion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlatformCampaigns;
