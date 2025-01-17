'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface AggregatedMetric {
  platform_integration_id: string;
  total_spend: number;
  total_leads: number;
  total_clicks: number;
  total_ctr: number;
  total_link_clicks: number;
  total_impressions: number;
  total_messages: number;
  total_conversions: number;
  platform_name: string;
}

interface ConversionsBreakdownChartProps {
  metrics: AggregatedMetric[];
}

const ConversionsBreakdownChart = ({ metrics }: ConversionsBreakdownChartProps) => {
  const chartData = [
    {
      name: 'Leads',
      data: metrics.map((platform) => platform.total_leads),
    },
    {
      name: 'Messages',
      data: metrics.map((platform) => platform.total_messages),
    },
    {
      name: 'Link Clicks',
      data: metrics.map((platform) => platform.total_link_clicks),
    },
  ];

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: true,
      height: 350,
      toolbar: { show: true },
    },
    xaxis: {
      categories: metrics.map((platform) => platform.platform_name),
      title: {
        text: 'Platforms',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Conversions Breakdown',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: { position: 'top' },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'dark',
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
    colors: ['#1E90FF', '#FF6347', '#32CD32'], // Customize colors
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-bold mb-4">Conversions Breakdown by Platform</h2>
      <Chart options={chartOptions} series={chartData} type="bar" height={350} />
    </div>
  );
};

export default ConversionsBreakdownChart;