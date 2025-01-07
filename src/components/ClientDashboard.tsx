'use client';

import { useState } from 'react';
import MetricCard from '@/components/MetricsCard';
import AccountInfo from '@/components/AccountInfo';
import PerformanceMetricsGraph from '@/components/PerformanceMetricsGraph';
import TopCampaigns from '@/components/TopCampaigns';
import DemographicsChart from '@/components/DemographicsChart';
import AudienceLocationChart from '@/components/AudienceLocationChart';
import { MdAttachMoney, MdMouse, MdPersonAdd, MdShowChart, MdTrendingUp, MdVisibility } from 'react-icons/md';
// import HourlyMetricsChart from './HourlyMetricsChart';

// interface DashboardData {
//   metrics: number,
//   topCampaigns: number,
//   accountInfo: number,
//   ageGenderMetrics: number,
//   performanceMetrics: number,
//   hourlyBreakdown: number
// }

// Using `any` for now to avoid TypeScript issues while data structures are finalized
/* eslint-disable */
export default function ClientDashboard({ dashboardData }: { dashboardData: any }) {
  
  const {metrics, topCampaigns, performanceMetrics, accountInfo, ageGenderMetrics } = dashboardData;
  const [activeTab, setActiveTab] = useState('account');
  /* eslint-enable */


  return (
    <div className="p-2 space-y-8">
      <section className="rounded-lg p-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          <MetricCard
            title="Spend"
            value={`$${Number(metrics?.spend || 0).toLocaleString()}`}
            tooltip="Total ad spend for the selected period."
            icon={<MdAttachMoney className="text-[#b6985c]" />}
            backgroundClass="bg-[#fbfbe9] dark:bg-gray-900"
          />
          <MetricCard
            title="Leads"
            value={Number(metrics?.leads || 0).toLocaleString()}
            tooltip="Number of leads generated through your ads."
            icon={<MdPersonAdd className="text-[#b6985c]" />}
            backgroundClass="bg-[#fbfbe9] dark:bg-gray-900"
          />
          <MetricCard
            title="Clicks"
            value={Number(metrics?.clicks || 0).toLocaleString()}
            tooltip="Total number of ad clicks."
            icon={<MdMouse className="text-[#b6985c]" />}
            backgroundClass="bg-[#fbfbe9] dark:bg-gray-900"
          />
          <MetricCard
            title="CTR"
            value={`${metrics?.ctr || 0}%`}
            tooltip="Click Through Rate (CTR): Percentage of users who clicked your ad after viewing it."
            icon={<MdShowChart className="text-[#b6985c]" />}
            backgroundClass="bg-[#fbfbe9] dark:bg-gray-900"
          />
          <MetricCard
            title="CPC"
            value={`$${metrics?.cpc || 0}`}
            tooltip="Cost Per Click (CPC): Average cost for each click."
            icon={<MdTrendingUp className="text-[#b6985c]" />}
            backgroundClass="bg-[#fbfbe9] dark:bg-gray-900"
          />
          <MetricCard
            title="Impression"
            value={Number(metrics?.impressions || 0).toLocaleString()}
            tooltip="Total number of times your ad was displayed."
            icon={<MdVisibility className="text-[#b6985c]" />}
            backgroundClass="bg-[#fbfbe9] dark:bg-gray-900"
          />
        </div>
      </section>

      {/* Compact Section: Top Campaigns and Account Info/Performance Metrics */}
      <section className='grid grid-cols-1 md:grid-cols-3 gap-6'>

        {/* Left: Top Campaigns */}
        <div>
          <TopCampaigns campaignsData={topCampaigns} />
          {/* <HourlyMetricsChart hourlyData={hourlyBreakdown} /> */}

        </div>

        {/* Right: Account Info/Performance Metrics */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-[#566a3d] dark:bg-gray-800 shadow rounded-lg">
            {/* Tabs */}
            <div className="flex border-b border-[#a9b18f]">
              <button
                className={`flex-1 text-center py-2 font-medium ${activeTab === 'account'
                  ? 'text-[#ededd2] border-b-2 border-[#ededd2]'
                  : 'text-[#a9b18f]'
                  }`}
                onClick={() => setActiveTab('account')}
              >
                Account Info
              </button>
              <button
                className={`flex-1 text-center py-2 font-medium ${activeTab === 'performance'
                  ? 'text-[#ededd2] border-b-2 border-[#ededd2]'
                  : 'text-[#a9b18f]'
                  }`}
                onClick={() => setActiveTab('performance')}
              >
                Performance Metrics
              </button>
            </div>
            {/* Tab Content */}
            <div className="p-6 h-fit">
              {activeTab === 'account' &&  <AccountInfo accountInfo={accountInfo} />}
              {activeTab === 'performance'  && <PerformanceMetricsGraph graphInsights={performanceMetrics} />}
            </div>
          </div>

          {/* New content below the card with a different background */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 h-fit">
          </div>
        </div>
      </section>

      {/* Section 4: Example Charts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Age & Gender Pie Chart */}
        <div className="bg-[#7e8649c5] dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-center text-[#ededd2]">Audience by Age & Gender</h2>
          <DemographicsChart data={ageGenderMetrics?.ageGenderData} />
        </div>
        {/* AudienceLocationChart */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Audience by Location</h2>
          <AudienceLocationChart data={ageGenderMetrics?.countryData} />
        </div>

      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ad Spend Allocation Pie Chart */}
        {/* <AdSpendPieChart metrics={metrics} /> */}
      </section>;
    </div>
  );
};