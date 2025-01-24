'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// come back to fix this as the impression scaling is wrong
type Metric = {
    platform_integration_id: string;
    platform_name: string;
    total_spend: number;
    total_clicks: number;
    total_link_clicks: number;
    total_impressions: number;
    total_conversions: number;
};

type StackedBarChartProps = {
    metrics: Metric[];
};

type TooltipFormatterOpts = {
    dataPointIndex: number;
    seriesName: string;
};

const StackedBarChart: React.FC<StackedBarChartProps> = ({ metrics }) => {
    const rawCategories = [
        { key: 'total_impressions', label: 'Impressions' },
        { key: 'total_clicks', label: 'Clicks' },
        { key: 'total_link_clicks', label: 'Link Clicks' },
        { key: 'total_spend', label: 'Spend' },
        { key: 'total_conversions', label: 'Conversions' },
    ];

    const scalingFactor = 10; 

    const series = metrics.map((metric) => ({
        name: metric.platform_name.charAt(0).toUpperCase() + metric.platform_name.slice(1),
        data: rawCategories.map((category) => {
            const value = Number(metric[category.key as keyof Metric]);
            return category.key === 'total_impressions'
                ? Math.round(value / scalingFactor) 
                : Math.round(value); 
        }),
    }));

    const platformColors: { [key: string]: string } = {
        Meta: '#00A0DC', // Meta's new blue
        Google: '#F4B400', // Google yellow
        TikTok: '#010101', // TikTok's black
        Twitter: '#1DA1F2', // Twitter blue
        LinkedIn: '#0077B5', // LinkedIn blue
    };

    const colors = metrics.map((metric) =>
        platformColors[metric.platform_name.charAt(0).toUpperCase() + metric.platform_name.slice(1)] || '#999999' // Default gray
    );

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: { show: true },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                dataLabels: { position: 'top' },
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: rawCategories.map((category) => category.label),
        },
        yaxis: {
            title: { text: 'Values' },
            labels: {
                formatter: (val: number) => Math.round(val).toLocaleString(),
            },
        },
        legend: {
            position: 'top',
        },
        tooltip: {
            y: {
                formatter: (val: number, opts: TooltipFormatterOpts) => {
                    const categoryIndex = opts.dataPointIndex;
                    const categoryKey = rawCategories[categoryIndex]?.key;

                    const metric = metrics.find(
                        (m) =>
                            m.platform_name.charAt(0).toUpperCase() + m.platform_name.slice(1) ===
                            opts.seriesName
                    );
                    if (metric && categoryKey) {
                        const trueValue = metric[categoryKey as keyof Metric];
                        return `${Number(trueValue).toLocaleString()}`; 
                    }
                    return val.toLocaleString(); 
                },
            },
        },
        colors,
    };

    return (
        <div>
            <Chart options={options} series={series} type="bar" height={400} />
        </div>
    );
};

export default StackedBarChart;
