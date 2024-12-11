import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically load ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Metrics {
  spend: string;
  leads: number;
  linkClicks: number;
  messagingConversationsStarted: number;
}

const DonutChart = ({ metrics }: { metrics: Metrics | null }) => {
  // Handle case when metrics are undefined or null
  if (!metrics) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
        <p>Loading data...</p>
      </div>
    );
  }

  // Parse spend to ensure it's a number
  const totalSpend = parseFloat(metrics.spend);

  // Calculate total actionable outcomes
  const totalActions =
    metrics.linkClicks + metrics.leads + metrics.messagingConversationsStarted;

  // Prevent division by zero
  if (totalActions === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
        <p>No data available to display.</p>
      </div>
    );
  }

  // Calculate spend allocation
  const spendAllocation = {
    clicks: (metrics.linkClicks / totalActions) * totalSpend || 0,
    leads: (metrics.leads / totalActions) * totalSpend || 0,
    messages: (metrics.messagingConversationsStarted / totalActions) * totalSpend || 0,
  };

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['Clicks', 'Leads', 'Messages'],
    legend: {
      position: 'bottom',
    },
    tooltip: {
      y: {
        formatter: (value: number) => `$${value.toFixed(2)}`,
      },
    },
    colors: ['#008FFB', '#00E396', '#FEB019'], // Custom colors for segments
  };

  const chartSeries = [
    spendAllocation.clicks,
    spendAllocation.leads,
    spendAllocation.messages,
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Spend Allocation by Outcomes</h2>
      <Chart options={chartOptions} series={chartSeries} type="donut" width="100%" />
    </div>
  );
};

export default DonutChart;
