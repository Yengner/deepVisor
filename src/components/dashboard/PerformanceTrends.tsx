'use client';

import ReactApexChart from 'react-apexcharts';

interface PerformanceTrendsProps {
  data: {
    dates: string[];
    spend: number[];
    leads: number[];
    impressions: number[];
  };
}

const PerformanceTrends = ({ data }: PerformanceTrendsProps) => {
  const chartOptions = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: data.dates,
    },
    stroke: {
      curve: 'smooth',
    },
    markers: {
      size: 4,
    },
  };

  const chartSeries = [
    {
      name: 'Spend',
      data: data.spend,
    },
    {
      name: 'Leads',
      data: data.leads,
    },
    {
      name: 'Impressions',
      data: data.impressions,
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Performance Trends</h2>
      <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={350} />
    </div>
  );
};

export default PerformanceTrends;
