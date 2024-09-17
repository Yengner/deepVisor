'use server';

import { FacebookAdsApi, AdAccount, Campaign, AdConversions } from 'facebook-nodejs-business-sdk';

interface Action {
    action_type: string;
    value: string | number;
  }

// Initialize Facebook API with access token from environment variables

// Helper function to initialize the Facebook API


// Fetch Facebook campaign insights using the user's fbId
export const fetchFacebookCampaignInsights = async (accessToken: string) => {
    FacebookAdsApi.init(accessToken);
    

  try {
    const account = new AdAccount(accessToken); // Initialize AdAccount with the access token

    // Fetch campaigns from the Facebook Ads account
    const campaigns = await account.getCampaigns([Campaign.Fields.name], { limit: 10 });

    // Fetch insights for each campaign
    const campaignData = await Promise.all(
      campaigns.map(async (campaign) => {
        const insights = await campaign.getInsights([
          'spend',
          'actions', // Includes leads
          'impressions',
          'reach',
          'clicks',
          'ctr',
          'cpc',
          'cpm',
          'conversions',
          'unique_clicks',
          'cost_per_action_type'
        ], {
          date_preset: 'maximum', // Fetch data for the maximum time period
          action_breakdowns: ['action_type'], // Break down by action type (e.g., leads)
          limit: 1,
        });

        // Extract lead count from the insights
        const leads = insights[0]?.actions?.find((action: Action) => action.action_type === 'lead')?.value || 0;
        console.log('actions:', insights[0]?.actions);
        const link_click = insights[0]?.actions?.find((action: Action) => action.action_type === "link_click")?.value || 0;
        return {
          id: campaign.id,
          name: campaign.name,
          spend: insights[0]?.spend || 0,
          link_click,
          leads,
          impressions: insights[0]?.impressions || 0,
          reach: insights[0]?.reach || 0,
          clicks: insights[0]?.clicks || 0,
          ctr: insights[0]?.ctr || 0,
          cpc: insights[0]?.cpc || 0,
          cpm: insights[0]?.cpm || 0,
          conversions: insights[0]?.conversions || 0,
        };
      })
    );

    return campaignData;
  } catch (error) {
    console.error('Error fetching Facebook campaign insights:', error);
    throw new Error('Failed to fetch Facebook campaign insights');
  }
};
