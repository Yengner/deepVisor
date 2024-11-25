'use client';

import PerformanceMetricsGraph from '@/components/PerformanceMetricsGraph';
import MetricCard from '@/components/MetricsCard';
import { useTotalAdAccountInsights, useInsights, useTopCampaigns, usePerformanceMetrics } from '@/hooks/useDashboardData';
import { useGlobalState } from '@/lib/store/globalState';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const DashboardPage = () => {
  const { selectedPlatform, selectedAdAccount } = useGlobalState();

  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useTotalAdAccountInsights(selectedPlatform, selectedAdAccount);
  const { data: insights, isLoading: insightsLoading, error: insightsError } = useInsights(selectedPlatform, selectedAdAccount);
  const { data: topCampaigns, isLoading: topCampaignsLoading, error: topCampaignsError } = useTopCampaigns(selectedPlatform, selectedAdAccount);
  const { data: graphInsights, isLoading: graphInsightsLoading, error: graphInsightsError } = usePerformanceMetrics(selectedPlatform, selectedAdAccount);
  // const { data: sp}
  if (!selectedPlatform || !selectedAdAccount) {
    return <p className="text-center mt-6">Please select a platform and ad account to view data.</p>;
  }

  const isLoading = metricsLoading || topCampaignsLoading || insightsLoading || graphInsightsLoading;
  const hasError = metricsError || topCampaignsError || insightsError || graphInsightsError;

  return (
    <div className="p-2 space-y-8">
      {isLoading && <p>Loading data...</p>}
      {hasError && (
        <p className="text-red-500">
          An error occurred while fetching data. Please try again later.
        </p>
      )}

      {!isLoading && !hasError && (
        <>
          {/* Section 1: Metrics */}
          <section className=" rounded-lg p-3">
            <div className="sm:flex flex-row py-1 gap-4 mb-5 items-center text-lightGray text-sm hidden">
              <MdKeyboardDoubleArrowRight size={24} />
              <span className='text-2xl'>{new Date().toDateString()}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-11 gap-4">
              <MetricCard title="Impressions" value={Number(metrics?.impressions || 0).toLocaleString()} />
              <MetricCard title="Clicks" value={Number(metrics?.clicks || 0).toLocaleString()} />
              <MetricCard title="Spend" value={`$${Number(metrics?.spend || 0).toLocaleString()}`} />
              <MetricCard title="Reach" value={Number(metrics?.reach || 0).toLocaleString()} />
              <MetricCard title="CTR" value={`${metrics?.ctr || 0}%`} />
              <MetricCard title="CPC" value={`$${metrics?.cpc || 0}`} />
              <MetricCard title="CPM" value={`$${metrics?.cpm || 0}`} />
              <MetricCard title="Leads" value={Number(metrics?.leads || 0).toLocaleString()} />
              <MetricCard title="Post Engage." value={Number(metrics?.postEngagement || 0).toLocaleString()} />
              <MetricCard title="Link Clicks" value={Number(metrics?.linkClicks || 0).toLocaleString()} />
              <MetricCard title="Messaging conver..." value={Number(metrics?.messagingConversationsStarted || 0).toLocaleString()} />

            </div>
          </section>

          {/* Account Info + Performance Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Account Info Section */}
            <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col justify-between">
              <h2 className="text-lg font-bold mb-4">Account Info</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Available balance</p>
                  <p className="text-2xl font-bold">${metrics?.balance || '0.00'} USD</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Today's spend</p>
                  <p className="text-2xl font-bold">${metrics?.todaySpend || '0.00'} USD</p>
                </div>
              </div>
              <a href="/billing" className="text-sm text-blue-500 hover:underline mt-4">View details →</a>
            </section>

            {/* Performance Metrics Section */}
            <section className="lg:col-span-2 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              {!graphInsightsLoading && graphInsights && (
                <PerformanceMetricsGraph graphInsights={graphInsights} />
              )}

            </section>
          </div>

          {/* Section 2: Insights */}
          <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Daily Insights</h2>
            {insights?.length ? (
              <ul>
                {insights.map((data: any, index: number) => (
                  <li key={index} className="py-2">
                    {data.date || data.week || data.month}: Spend: ${data.spend}, Leads: {data.leads}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No insights available</p>
            )}
          </section>

          {/* Section 3: Top Campaigns */}
          <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Top Campaigns</h2>
            {topCampaigns?.length ? (
              <ul>
                {topCampaigns.map((campaign: any) => (
                  <li key={campaign.id} className="py-2 border-b">
                    <strong>{campaign.name}</strong>: {campaign.leads} leads, ${campaign.spend} spend
                  </li>
                ))}
              </ul>
            ) : (
              <p>No top campaigns available</p>
            )}
          </section>

          {/* Section 4: Example Charts */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Graph 1</h2>
              <p>Graph content goes here.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Graph 2</h2>
              <p>Graph content goes here.</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
