"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically load ApexCharts
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const EnhancedHeatmap = ({ hourlyData }: { hourlyData: any[] }) => {
const chartOptions = {
chart: {
    type: "heatmap",
    toolbar: { show: false },
    animations: { enabled: true },
},
plotOptions: {
    heatmap: {
    shadeIntensity: 0.5,
    colorScale: {
        ranges: [
        { from: 0, to: 50, color: "#e0f7fa" },
        { from: 51, to: 150, color: "#80deea" },
        { from: 151, to: 300, color: "#26c6da" },
        { from: 301, to: 500, color: "#00acc1" },
        { from: 501, to: 1000, color: "#006064" },
        ],
    },
    },
},
xaxis: {
    categories: hourlyData.map((entry) => entry.hour), // Hours as labels
    labels: { rotate: -45 },
},
dataLabels: {
    enabled: false,
},
tooltip: {
    theme: "dark",
},
responsive: [
    {
    breakpoint: 768, // For smaller screens
    options: {
        chart: { height: 250 },
    },
    },
],
};

const series = [
{
    name: "Impressions",
    data: hourlyData.map((entry) => ({
    x: entry.hour,
    y: parseInt(entry.impressions, 10),
    })),
},
{
    name: "Clicks",
    data: hourlyData.map((entry) => ({
    x: entry.hour,
    y: parseInt(entry.clicks, 10),
    })),
},
{
    name: "CTR",
    data: hourlyData.map((entry) => ({
    x: entry.hour,
    y: parseFloat(entry.ctr),
    })),
},
];

return (
<div className="w-full">
    <ApexChart options={chartOptions} series={series} type="heatmap" height={400} />
</div>
);
};

export default EnhancedHeatmap;
