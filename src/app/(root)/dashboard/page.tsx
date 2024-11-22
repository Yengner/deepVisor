'use client'

import { useDashboardMetrics, useInsights, useTopCampaigns } from '@/hooks/useDashboardData';
import { useGlobalState } from '@/lib/store/globalState';

const DashboardPage = () => {
  const { selectedPlatform, selectedAdAccount } = useGlobalState();

  const { data: metrics, isLoading: metricsLoading } = useDashboardMetrics(selectedPlatform, selectedAdAccount);
  const { data: insights, isLoading: insightsLoading } = useInsights(selectedPlatform, selectedAdAccount, 'daily');
  const { data: topCampaigns, isLoading: topCampaignsLoading } = useTopCampaigns(selectedPlatform, selectedAdAccount);

  if (!selectedPlatform || !selectedAdAccount) {
    return <p>Please select a platform and ad account to view data.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {metricsLoading || insightsLoading || topCampaignsLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2 className="font-bold text-xl">Performance Metrics</h2>
          <ul>
            <li>Impressions: {metrics?.impressions}</li>
            <li>Clicks: {metrics?.clicks}</li>
            <li>Spend: {metrics?.spend}</li>
            <li>Conversions: {metrics?.conversions}</li>
          </ul>

          <h2 className="font-bold text-xl mt-4">Insights</h2>
          <ul>
            {insights?.map((data: any, index: number) => (
              <li key={index}>
                Date: {data.date || data.week || data.month}, Spend: {data.spend}, Leads: {data.leads}
              </li>
            ))}
          </ul>

          <h2 className="font-bold text-xl mt-4">Top Campaigns</h2>
          <ul>
            {topCampaigns?.map((campaign: any) => (
              <li key={campaign.id}>
                {campaign.name}: {campaign.leads} leads, {campaign.spend} spend
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
