'use client';

interface TopCampaignsProps {
  campaigns: { name: string; platform: string; ctr: number; cpc: number; spend: number }[];
}

const TopCampaigns = ({ campaigns }: TopCampaignsProps) => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-lg font-semibold mb-4">Top Campaigns</h2>
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          <th className="border-b p-2">Campaign</th>
          <th className="border-b p-2">Platform</th>
          <th className="border-b p-2">CTR</th>
          <th className="border-b p-2">CPC</th>
          <th className="border-b p-2">Spend</th>
        </tr>
      </thead>
      <tbody>
        {campaigns.map((campaign, index) => (
          <tr key={index}>
            <td className="border-b p-2">{campaign.name}</td>
            <td className="border-b p-2 capitalize">{campaign.platform}</td>
            <td className="border-b p-2">{campaign.ctr}%</td>
            <td className="border-b p-2">${campaign.cpc}</td>
            <td className="border-b p-2">${campaign.spend.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TopCampaigns;
