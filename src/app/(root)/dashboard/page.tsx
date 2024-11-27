'use client';

import PerformanceMetricsGraph from '@/components/PerformanceMetricsGraph';
import MetricCard from '@/components/MetricsCard';
import { useTotalAdAccountInsights, useInsights, useTopCampaigns, usePerformanceMetrics, useAccountInfo } from '@/hooks/useDashboardData';
import { useGlobalState } from '@/lib/store/globalState';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import AccountInfo from '@/components/AccountInfo';
import TopCampaigns from '@/components/TopCampaigns';
import DemographicsChart from '@/components/DemographicsChart';
import GeoHeatMap from '@/components/GeoHeatMap';

const DashboardPage = () => {
  const { selectedPlatform, selectedAdAccount } = useGlobalState();

  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useTotalAdAccountInsights(selectedPlatform, selectedAdAccount);
  const { data: topCampaigns, isLoading: topCampaignsLoading, error: topCampaignsError } = useTopCampaigns(selectedPlatform, selectedAdAccount);
  const { data: graphInsights, isLoading: graphInsightsLoading, error: graphInsightsError } = usePerformanceMetrics(selectedPlatform, selectedAdAccount);
  const { data: accountInfo, isLoading: accountInfoLoading, error: accountInfoError } = useAccountInfo(selectedPlatform, selectedAdAccount);

  const demoInsights = {
    ageGenderData: [
      { age: '18-24', gender: 'female', reach: 5000 },
      { age: '18-24', gender: 'male', reach: 3000 },
      { age: '25-34', gender: 'female', reach: 7000 },
      { age: '25-34', gender: 'male', reach: 5000 },
    ],
    geoData: [
      { country: 'US', reach: 20000 },
      { country: 'CA', reach: 15000 },
      { country: 'UK', reach: 10000 },
    ],
  };
  if (!selectedPlatform || !selectedAdAccount) {
    return <p className="text-center mt-6">Please select a platform and ad account to view data.</p>;
  }

  const isLoading = metricsLoading || topCampaignsLoading || graphInsightsLoading || accountInfoLoading;
  const hasError = metricsError || topCampaignsError || graphInsightsError || accountInfoError;
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
              <MetricCard title="Spend" value={`$${Number(metrics?.spend || 0).toLocaleString()}`} />
              <MetricCard title="Leads" value={Number(metrics?.leads || 0).toLocaleString()} />
              <MetricCard title="Clicks" value={Number(metrics?.clicks || 0).toLocaleString()} />
              <MetricCard title="CTR" value={`${metrics?.ctr || 0}%`} tooltip="Click Through Rate (CTR): Click per impression" />
              <MetricCard title="CPC" value={`$${metrics?.cpc || 0}`} tooltip="Cost Per Click (CPC): The cost for each click." />
              <MetricCard title="Impressions" value={Number(metrics?.impressions || 0).toLocaleString()} />
              <MetricCard title="CPM" value={`$${metrics?.cpm || 0}`} tooltip="Cost Per Mille (CPM): The cost of 1,000 ad impressions." />
              <MetricCard title="Reach" value={Number(metrics?.reach || 0).toLocaleString()} />
              <MetricCard title="Post Engage." value={Number(metrics?.postEngagement || 0).toLocaleString()} />
              <MetricCard title="Link Clicks" value={Number(metrics?.linkClicks || 0).toLocaleString()} />
              <MetricCard title="Messaging conver..." value={Number(metrics?.messagingConversationsStarted || 0).toLocaleString()} />
            </div>
          </section>

          {/* Section 2: Account Info + Performance Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Account Info Section */}
            <section className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col justify-between">
              <AccountInfo accountInfo={accountInfo} />
            </section>

            {/* Performance Metrics Section */}
            <section className="lg:col-span-2 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              {!graphInsightsLoading && graphInsights && (
                <PerformanceMetricsGraph key={`${selectedAdAccount}-${Date.now()}`} // Ensure unique key for re-render
                  graphInsights={graphInsights} />
              )}
            </section>

          </div>

          {/* Section 3: Top Campaigns */}

          <section>
            {/* Top Campaigns */}
            {!topCampaignsLoading && topCampaigns && (
            <TopCampaigns campaignsData={topCampaigns} />
            )}
          </section>

          {/* Section 4: Example Charts */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Age & Gender Pie Chart */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Audience by Age & Gender</h2>
              <DemographicsChart data={demoInsights.ageGenderData} />
            </div>
            {/* Geographic Heatmap */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Audience by Location</h2>
              <GeoHeatMap data={demoInsights.geoData} />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
