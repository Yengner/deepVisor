"use client";

import React, { useState, useEffect } from 'react';
import { fetchFacebookCampaignInsights } from '../../lib/meta.insights';

interface Campaign {
  id: string;
  name: string;
  spend: number;
  leads: number;
  link_click: number;
  impressions: number;
  reach: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  conversions: number;
}

interface FbcampaignsProps {
  accountId: string; // Correct the prop type to be consistent with accountId
}

const Fbcampaigns: React.FC<FbcampaignsProps> = ({ accountId }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        console.log('accountId within fb_campaign component:', accountId);
        const campaignData = await fetchFacebookCampaignInsights(accountId);
        console.log('campaignData:', campaignData);
        setCampaigns(campaignData);
      } catch (err) {
        setError('Failed to fetch campaign data, check your access token and account ID or fetchFacebookCampaignInsights.');
      } finally {
        setLoading(false);
      }
    };

    getCampaigns();
  }, [accountId]);

  if (loading) return <p>Loading campaigns...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Facebook Campaigns</h1>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            <h2>{campaign.name}</h2>
            <p>Spend: {campaign.spend}</p>
            <p>Leads: {campaign.leads}</p>
            <p>Link Clicks: {campaign.link_click}</p>
            <p>Impressions: {campaign.impressions}</p>
            <p>Reach: {campaign.reach}</p>
            <p>Clicks: {campaign.clicks}</p>
            <p>CTR: {campaign.ctr}</p>
            <p>CPC: {campaign.cpc}</p>
            <p>CPM: {campaign.cpm}</p>
            <p>Conversions: {campaign.conversions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Fbcampaigns;
