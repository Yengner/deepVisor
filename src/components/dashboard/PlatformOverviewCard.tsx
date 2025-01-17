'use client';

interface PlatformOverviewCardProps {
  data: {
    name: string;
    totalSpend: number;
    leads: number;
    impressions: number;
    clicks: number;
  };
}

const PlatformOverviewCard = ({ data }: PlatformOverviewCardProps) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold">{data.name}</h2>
      <div className="mt-4 space-y-2">
        <p><strong>Total Spend:</strong> ${data.totalSpend.toLocaleString()}</p>
        <p><strong>Leads:</strong> {data.leads.toLocaleString()}</p>
        <p><strong>Impressions:</strong> {data.impressions.toLocaleString()}</p>
        <p><strong>Clicks:</strong> {data.clicks.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default PlatformOverviewCard;
