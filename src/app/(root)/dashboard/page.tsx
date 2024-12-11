'use client';

import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { MdAttachMoney, MdGroup, MdKeyboardDoubleArrowRight, MdLink, MdMessage, MdMouse, MdPersonAdd, MdShowChart, MdThumbUp, MdTrendingUp, MdVisibility } from 'react-icons/md';
import { useGlobalState } from '@/lib/store/globalState';
import { useTotalAdAccountInsights, useTopCampaigns, usePerformanceMetrics, useAccountInfo, useAgeGenderCountryMetrics } from '@/hooks/useDashboardData';
import PerformanceMetricsGraph from '@/components/PerformanceMetricsGraph';
import MetricCard from '@/components/MetricsCard';
import AccountInfo from '@/components/AccountInfo';
import TopCampaigns from '@/components/TopCampaigns';
import DemographicsChart from '@/components/DemographicsChart';
import AdSpendPieChart from '@/components/AdSpendPieChart';

const AudienceLocationChart = dynamic(() => import('@/components/AudienceLocationChart'), {
  ssr: false, 
  loading: () => <ClipLoader color="#00bfa5" size={50} />,

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
        <section className="rounded-lg p-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#3e4e38] dark:text-gray-200">Dashboard Overview</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-11 gap-2">
            <MetricCard
              title="Spend"
              value={`$${Number(metrics?.spend || 0).toLocaleString()}`}
              tooltip="Total ad spend for the selected period."
              icon={<MdAttachMoney className="text-[#b6985c]" />}
              backgroundClass="bg-[#e9d094] dark:bg-gray-900"
            />
            <MetricCard
              title="Leads"
              value={Number(metrics?.leads || 0).toLocaleString()}
              tooltip="Number of leads generated through your ads."
              icon={<MdPersonAdd className="text-[#b6985c]" />}
              backgroundClass="bg-[#e9d094] dark:bg-gray-900"
            />
            <MetricCard
              title="Clicks"
              value={Number(metrics?.clicks || 0).toLocaleString()}
              tooltip="Total number of ad clicks."
              icon={<MdMouse className="text-[#b6985c]" />}
              backgroundClass="bg-[#e9d094] dark:bg-gray-900"
            />
            <MetricCard
              title="CTR"
              value={`${metrics?.ctr || 0}%`}
              tooltip="Click Through Rate (CTR): Percentage of users who clicked your ad after viewing it."
              icon={<MdShowChart className="text-[#b6985c]" />}
              backgroundClass="bg-[#e9d094] dark:bg-gray-900"
            />
            <MetricCard
              title="CPC"
              value={`$${metrics?.cpc || 0}`}
              tooltip="Cost Per Click (CPC): Average cost for each click."
              icon={<MdTrendingUp className="text-[#b6985c]" />}
              backgroundClass="bg-[#e9d094] dark:bg-gray-900"
            />
            <MetricCard
              title="Impression"
              value={Number(metrics?.impressions || 0).toLocaleString()}
              tooltip="Total number of times your ad was displayed."
              icon={<MdVisibility className="text-[#b6985c]" />}
              backgroundClass="bg-[#e9d094] dark:bg-gray-900"
            />
            <MetricCard
              title="CPM"
              value={`$${metrics?.cpm || 0}`}
              tooltip="Cost Per Mille (CPM): Average cost for 1,000 ad impressions."
              icon={<MdShowChart className="text-[#b6985c]" />}
              backgroundClass="bg-[#e9d094] dark:bg-gray-900"
            />
            <MetricCard
              title="Reach"
              value={Number(metrics?.reach || 0).toLocaleString()}
              tooltip="Total number of unique users who saw your ad."
              icon={<MdGroup className="text-[#b6985c]" />}
              backgroundClass="bg-[#e9d094] dark:bg-gray-900"
            />
            <MetricCard
              title="Post Eng."
              value={Number(metrics?.postEngagement || 0).toLocaleString()}
              tooltip="Total number of interactions (likes, shares, comments) on your posts."
              icon={<MdThumbUp className="text-[#b6985c]" />}
              backgroundClass="bg-[#e9d094] dark:bg-gray-900"
            />
            <MetricCard
              title="Link Click"
              value={Number(metrics?.linkClicks || 0).toLocaleString()}
              tooltip="Total number of link clicks on your ad."
              icon={<MdLink className="text-[#b6985c]" />}
              backgroundClass="bg-[#e9d094] dark:bg-gray-900"
            />
            <MetricCard
              title="Messages"
              value={Number(metrics?.messagingConversationsStarted || 0).toLocaleString()}
              tooltip="Number of messaging conversations started via your ad."
              icon={<MdMessage className="text-[#b6985c]" />}
              backgroundClass="bg-[#e9d094] dark:bg-gray-900"
            />
          </div>
        </section>

        {/* Section 2: Account Info + Performance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-center">

          {/* Account Info Section */}
          <section className=" bg-[#566a3d] dark:bg-gray-800 shadow rounded-lg border p-6 flex flex-col justify-between">
            <AccountInfo accountInfo={accountInfo} />
          </section>

          {/* Performance Metrics Section */}
          <section className="lg:col-span-2 bg-[#7e8649c5] dark:bg-gray-800 shadow border rounded-lg p-6">
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
          <div className="bg-[#7e8649c5] dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-center text-[#ededd2]">Audience by Age & Gender</h2>
            <DemographicsChart data={ageGenderCountryMetrics?.ageGenderData} />
          </div>
          {/* AudienceLocationChart */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Audience by Location</h2>
            <AudienceLocationChart data={ageGenderCountryMetrics?.countryData} />
          </div>

        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ad Spend Allocation Pie Chart */}
          <AdSpendPieChart metrics={metrics} />
        </section>;
      </>
    </div>
  );
};

export default DashboardPage;
