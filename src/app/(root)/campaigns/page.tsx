'use client';

import React, { useState } from 'react';
import CampaignTable from '@/components/CampaignTable';
import { useGlobalState } from '@/lib/store/globalState';
import AdGroupTable from '@/components/AdGroupTable';
import AdTable from '@/components/AdTable';
import { useAdSetInsights, useCampaignInsights, useCampaignsIds } from '@/hooks/useCampaigns';

const CampaignsPage = () => {
  const { selectedPlatform, selectedAdAccount } = useGlobalState();
  const [activeTab, setActiveTab] = useState<'campaigns' | 'adGroups' | 'ads'>('campaigns');
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [selectedAdGroups, setSelectedAdGroups] = useState<string[]>([]);

  const { data: campaigns, isLoading: campaignsLoading } = useCampaignsIds(
    selectedPlatform,
    selectedAdAccount
  );

  const { data: campaignInsights, isLoading: campaignInsightsLoading } = useCampaignInsights(
    selectedPlatform,
    selectedAdAccount
  );

  const { data: adsetsInsights, isLoading: adsetsInsightsLoading } = useAdSetInsights(
    selectedPlatform,
    selectedAdAccount
  );

  const handleTabClick = (tab: 'campaigns' | 'adGroups' | 'ads') => setActiveTab(tab);

  const isLoading =
    campaignsLoading || campaignInsightsLoading || adsetsInsightsLoading;

  if (!selectedPlatform || !selectedAdAccount) {
    return <p>Please select a platform and ad account to view campaigns.</p>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-blue-500 text-xl">Loading data, please wait...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Tabs Header */}
      <div className="flex space-x-4 border-b border-gray-300 dark:border-gray-700 mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 'campaigns'
            ? 'text-blue-500 border-b-2 border-blue-500'
            : 'text-gray-600 dark:text-gray-400'
            }`}
          onClick={() => handleTabClick('campaigns')}
        >
          Campaigns
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'adGroups'
            ? 'text-blue-500 border-b-2 border-blue-500'
            : 'text-gray-600 dark:text-gray-400'
            }`}
          onClick={() => handleTabClick('adGroups')}
        >
          Ad Groups
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'ads'
            ? 'text-blue-500 border-b-2 border-blue-500'
            : 'text-gray-600 dark:text-gray-400'
            }`}
          onClick={() => handleTabClick('ads')}
        >
          Ads
        </button>
      </div>

      {/* Tabs Content */}
      {activeTab === 'campaigns' && (
        <CampaignTable
          platform={selectedPlatform}
          adAccountId={selectedAdAccount}
          campaigns={campaigns || []}
          insights={campaignInsights || []}
          selectedCampaigns={selectedCampaigns}
          onSelect={setSelectedCampaigns}
        />
      )}
      {activeTab === 'adGroups' && (
        <AdGroupTable
          platform={selectedPlatform}
          adAccountId={selectedAdAccount}
          selectedCampaigns={selectedCampaigns}
          onSelect={(selectedIds) => setSelectedAdGroups(selectedIds)}
        />
      )}
      {activeTab === 'ads' && (
        <AdTable
          platform={selectedPlatform}
          adAccountId={selectedAdAccount}
          selectedAdGroups={selectedAdGroups}
        />
      )}
    </div>
  );
};

export default CampaignsPage;
