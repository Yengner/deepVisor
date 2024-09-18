'use server';

import { FacebookAdsApi, AdAccount, Campaign } from 'facebook-nodejs-business-sdk';

interface Action {
  action_type: string;
  value: string | number;
}

// Initialize Facebook API with access token from environment variables
const accessToken = process.env.FB_ACCESS_TOKEN;
// Helper function to initialize the Facebook API
function initFacebookApi() {
  if (!accessToken) {
    throw new Error('Facebook access token is missing from environment variables');
  }
  FacebookAdsApi.init(accessToken);
}

// Fetch Facebook campaign insights using the user's adAccountId
export const fetchFacebookCampaignInsights = async (adAccountId: string) => {
  console.log('Fetching insights for Ad Account:', adAccountId);
  initFacebookApi();  // Initialize the Facebook API with the access token

  try {
    const account = new AdAccount(adAccountId);  // Initialize AdAccount with adAccountId

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
          'cost_per_action_type',
        ], {
          date_preset: 'maximum', // Fetch data for the maximum time period
          action_breakdowns: ['action_type'], // Break down by action type (e.g., leads)
          limit: 1,
        });

        // Extract lead count from the insights
        const leads = insights[0]?.actions?.find((action: Action) => action.action_type === 'lead')?.value || 0;
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
