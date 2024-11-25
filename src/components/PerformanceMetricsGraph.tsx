'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface GraphMetricCardProps {
  title: string;
  value: string | number;
  isSelected: boolean;
  onClick: () => void;
}

const GraphMetricCard = ({ title, value, isSelected, onClick }: GraphMetricCardProps) => (
  <button
    onClick={onClick}
    className={`p-4 border rounded-lg ${
      isSelected ? 'bg-blue-100 dark:bg-blue-700' : 'bg-white dark:bg-gray-800'
    } shadow-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
  >
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300">{title}</h3>
    <p className="text-lg font-bold text-gray-900 dark:text-white mt-2">{value}</p>
  </button>
);

interface TrendDataPoint {
  date: string;
  cost: number;
  impressions: number;
  clicks: number;
  conversions: number;
  messagingConversationsStarted: number;
}

interface PerformanceMetricsGraphProps {
  graphInsights: {
    cost: number;
    impressions: number;
    clicks: number;
    conversions: number;
    messagingConversationsStarted: number;
    trendData: TrendDataPoint[];
  };
}

const PerformanceMetricsGraph = ({ graphInsights }: PerformanceMetricsGraphProps) => {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['cost', 'clicks']);

  const toggleMetric = (metric: string) => {
    if (selectedMetrics.includes(metric)) {
      return; // Prevent unselecting if only two metrics are selected
    }
    if (selectedMetrics.length === 2) {
      // Replace the first selected metric if two are already selected
      setSelectedMetrics((prev) => [prev[1], metric]);
    } else {
      // Add the new metric if less than two are selected
      setSelectedMetrics((prev) => [...prev, metric]);
    }
  };

  if (!graphInsights || !graphInsights.trendData) {
    return <p>No data available for the selected metrics.</p>;
  }

  const graphData = selectedMetrics.map((metric) => ({
    name: metric.charAt(0).toUpperCase() + metric.slice(1),
    data: graphInsights.trendData.map((point) =>
    Number(point[metric as keyof TrendDataPoint])
    ),
  }));

  const graphOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: { show: false },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    xaxis: {
      categories: graphInsights.trendData.map((point) => point.date),
      labels: {
        style: {
          fontSize: '12px',
          colors: ['#888'],
        },
      },
      title: {
        text: 'Date',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#666',
        },
      },
    },
    yaxis: [
      {
        title: {
          text: selectedMetrics[0].charAt(0).toUpperCase() + selectedMetrics[0].slice(1),
          style: {
            color: '#546E7A',
            fontSize: '14px',
            fontWeight: 'bold',
          },
        },
        labels: {
          style: {
            colors: ['#546E7A'],
            fontSize: '12px',
          },
        },
      },
      {
        opposite: true, // Align the second Y-axis on the right
        title: {
          text: selectedMetrics[1].charAt(0).toUpperCase() + selectedMetrics[1].slice(1),
          style: {
            color: '#33B2DF',
            fontSize: '14px',
            fontWeight: 'bold',
          },
        },
        labels: {
          style: {
            colors: ['#33B2DF'],
            fontSize: '12px',
          },
        },
      },
    ],
    tooltip: {
      theme: 'dark',
      x: { format: 'yyyy-MM-dd' },
      shared: true,
    },
    grid: {
      borderColor: '#f1f1f1',
    },
    colors: ['#546E7A', '#33B2DF'],
    markers: {
      size: 4,
      colors: ['#fff'],
      strokeColors: ['#546E7A', '#33B2DF'],
      strokeWidth: 2,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '14px',
      labels: {
        colors: ['#888'],
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Metrics Selection */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Select Metrics</h2>
        <div className="space-y-4">
          <GraphMetricCard
            title="Cost"
            value={`$${graphInsights.cost.toLocaleString()}`}
            isSelected={selectedMetrics.includes('cost')}
            onClick={() => toggleMetric('cost')}
          />
          <GraphMetricCard
            title="Impressions"
            value={graphInsights.impressions.toLocaleString()}
            isSelected={selectedMetrics.includes('impressions')}
            onClick={() => toggleMetric('impressions')}
          />
          <GraphMetricCard
            title="Clicks"
            value={graphInsights.clicks.toLocaleString()}
            isSelected={selectedMetrics.includes('clicks')}
            onClick={() => toggleMetric('clicks')}
          />
          <GraphMetricCard
            title="Conversions"
            value={graphInsights.conversions.toLocaleString()}
            isSelected={selectedMetrics.includes('conversions')}
            onClick={() => toggleMetric('conversions')}
          />
          <GraphMetricCard
            title="Messages"
            value={graphInsights.messagingConversationsStarted.toLocaleString()}
            isSelected={selectedMetrics.includes('messagingConversationsStarted')}
            onClick={() => toggleMetric('messagingConversationsStarted')}
          />
        </div>
      </div>

      {/* Metrics Graph */}
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Performance Over Time</h2>
        <Chart
          key={selectedMetrics.join('-')}
          options={graphOptions}
          series={graphData}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default PerformanceMetricsGraph;