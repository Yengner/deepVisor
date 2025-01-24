'use client';

import React from 'react';
import SpendTrendsGraph from './SpendTrendsGraph';
import FeaturedCampaigns from './FeaturedCampaigns';
import AdAccountsTable from './AdAccountsTable';
import LeftInfoCard from './LeftInfoCard';
// import CampaignsTable from './platforms/CampaignsTable';

// Main Platform Page

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PlatformPages = ({ adAccountsData, topCampaignForAdAccounts, platform, platformData }: any) => {

    return (
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-6 ">
            <LeftInfoCard
                platform={platform}
                overview={platformData}
                topAdAccounts={topCampaignForAdAccounts.topAdAccounts}
                topCampaigns={topCampaignForAdAccounts.topCampaigns}
            />

            {/* Main Content */}
            <div className="flex-1 space-y-8">
                {/* Ad Accounts Table */}
                <AdAccountsTable adAccountsData={adAccountsData} platform={platform} />

                {/* Featured Campaigns */}
                <FeaturedCampaigns data={topCampaignForAdAccounts} />

                {/* Spend Trends Graph */}
                <SpendTrendsGraph data={adAccountsData} />

            </div>
        </div >
    );
};

export default PlatformPages;
