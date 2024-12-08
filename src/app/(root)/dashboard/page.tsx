'use client';

import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { useGlobalState } from '@/lib/store/globalState';
import { useTotalAdAccountInsights, useTopCampaigns, usePerformanceMetrics, useAccountInfo, useAgeGenderCountryMetrics } from '@/hooks/useDashboardData';
import PerformanceMetricsGraph from '@/components/PerformanceMetricsGraph';
import MetricCard from '@/components/MetricsCard';
import AccountInfo from '@/components/AccountInfo';
import TopCampaigns from '@/components/TopCampaigns';
import DemographicsChart from '@/components/DemographicsChart';

const AudienceLocationChart = dynamic(() => import('@/components/AudienceLocationChart'), {
  ssr: false, // Disable server-side rendering for this component
});

const DashboardPage = () => {
  const { selectedPlatform, selectedAdAccount } = useGlobalState();

  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useTotalAdAccountInsights(selectedPlatform, selectedAdAccount);
  const { data: topCampaigns, isLoading: topCampaignsLoading, error: topCampaignsError } = useTopCampaigns(selectedPlatform, selectedAdAccount);
  const { data: linegraphInsights, isLoading: linegraphInsightsLoading, error: linegraphInsightsError } = usePerformanceMetrics(selectedPlatform, selectedAdAccount);
  const { data: accountInfo, isLoading: accountInfoLoading, error: accountInfoError } = useAccountInfo(selectedPlatform, selectedAdAccount);
  const { data: ageGenderCountryMetrics, isLoading: ageGenderCountryMetricsLoading, error: ageGenderCountryMetricsError } = useAgeGenderCountryMetrics(selectedPlatform, selectedAdAccount);

  if (!selectedPlatform || !selectedAdAccount) {
    return <p className="text-center mt-6">Please select a platform and ad account to view data.</p>;
  }

  const isLoading = metricsLoading || topCampaignsLoading || linegraphInsightsLoading || accountInfoLoading || ageGenderCountryMetricsLoading;
  const errors = [
    metricsError && `Metrics Error: ${metricsError.message}`,
    topCampaignsError && `Top Campaigns Error: ${topCampaignsError.message}`,
    linegraphInsightsError && `Performance Metrics Error: ${linegraphInsightsError.message}`,
    accountInfoError && `Account Info Error: ${accountInfoError.message}`,
    ageGenderCountryMetricsError && `Age, Gender, Country Metrics Error: ${ageGenderCountryMetricsError.message}`,
  ].filter(Boolean);

  // Show toast notifications for errors
  if (errors.length) {
    errors.forEach((error) => toast.error(error, { duration: 5000, position: 'bottom-right' }));
  }

  if (!selectedPlatform || !selectedAdAccount) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Please select a platform and ad account to view data.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3498db" size={50} />
      </div>
    );
  }

  if (errors.length > 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg">An error occurred while fetching data:</p>
          <ul className="mt-2 list-disc list-inside text-red-500">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-8">
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
          <section className="bg-white dark:bg-gray-800 shadow rounded-lg border p-6 flex flex-col justify-between">
            <AccountInfo accountInfo={accountInfo} />
          </section>

          {/* Performance Metrics Section */}
          <section className="lg:col-span-2 bg-white dark:bg-gray-800 shadow border rounded-lg p-6">
            {!linegraphInsightsLoading && linegraphInsights && (
              <PerformanceMetricsGraph key={selectedAdAccount} // Ensure unique key for re-render
                graphInsights={linegraphInsights} />
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
            <h2 className="text-xl font-bold mb-4 text-center">Audience by Age & Gender</h2>
            <DemographicsChart data={ageGenderCountryMetrics?.ageGenderData} />
          </div>
          {/* AudienceLocationChart */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Audience by Location</h2>
            <AudienceLocationChart data={ageGenderCountryMetrics?.countryData} />
          </div>

        </section>
        <section className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-row">
            <div className='shadow rounded-md p-2'>
              <h1 className='h-96 w-80'>
                post
              </h1>
              <h2 className='h-32'>
                items
              </h2>
            </div>

            <div>
              <h1>
                likes
              </h1>
            </div>

          </div>
        </section>
      </>
    </div>
  );
};

export default DashboardPage;
