import React from 'react';

interface Campaign {
  id: string;
  name: string;
  status: string;
}

interface CampaignInsight {
  campaign_id: string;
  impressions?: number;
  clicks?: number;
  ctr?: string;
  spend?: number;
  conversions?: number;
}

interface CampaignTableProps {
  platform: string | null;
  adAccountId: string | null;
  campaigns: Campaign[];
  insights: CampaignInsight[];
  selectedCampaigns: string[];
  onSelect: (selectedIds: string[]) => void; // Expect an array of selected campaign IDs
}

const CampaignTable: React.FC<CampaignTableProps> = ({
    platform,
    adAccountId,
    campaigns,
    insights,
    selectedCampaigns,
    onSelect,
  }) => {
    if (!platform || !adAccountId) {
      return <p>Please select a platform and ad account to view campaigns.</p>;
    }
  
    if (!campaigns || !insights) {
      return <p>Loading campaigns...</p>;
    }
  
    const handleSelect = (campaignId: string) => {
      const updatedSelection = selectedCampaigns.includes(campaignId)
        ? selectedCampaigns.filter((id) => id !== campaignId) // Remove if already selected
        : [...selectedCampaigns, campaignId]; // Add if not selected
  
      onSelect(updatedSelection); // Pass the updated selection to the parent
    };
  
    return (
      <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
        <thead>
          <tr>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Select</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Name</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Status</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Impressions</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Clicks</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">CTR</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Spend</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Conversions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => {
            const insight = insights.find((i) => i.campaign_id === campaign.id);
  
            return (
              <tr key={campaign.id}>
                <td className="border border-gray-300 dark:border-gray-700 p-2">
                  <input
                    type="checkbox"
                    checked={selectedCampaigns.includes(campaign.id)} // Controlled by selectedCampaigns
                    onChange={() => handleSelect(campaign.id)}
                  />
                </td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">{campaign.name}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">{campaign.status}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">{insight?.impressions || 0}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">{insight?.clicks || 0}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">{insight?.ctr || '0%'}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">${insight?.spend || 0}</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">{insight?.conversions || 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  
  export default CampaignTable;