'use server';

import { FacebookAdsApi, AdAccount, Campaign, AdSet, Ad } from 'facebook-nodejs-business-sdk';


export const fetchCampaignsIds = async (adAccountId: string, accessToken: string) => {
  const response = await fetch(
    `https://graph.facebook.com/v21.0/${adAccountId}/campaigns?fields=id,name,status,objective,daily_budget,lifetime_budget,created_time`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error fetching campaigns');
  }

  const data = await response.json();
  return data.data; // Returns an array of campaigns
};

export const fetchFacebookCampaignInsights = async ({ adAccountId, accessToken }: { adAccountId: string, accessToken: string }) => {
  function initFacebookApi() {
    if (!accessToken) {
      throw new Error('Facebook access token is missing');
    }
    FacebookAdsApi.init(accessToken);
  }

  initFacebookApi(); // Initialize the Facebook API with the access token

  try {
    const account = new AdAccount(adAccountId);

    // Fetch campaigns
    const campaigns = await account.getCampaigns(
      [
        Campaign.Fields.name,
        Campaign.Fields.status,
        Campaign.Fields.objective,
        Campaign.Fields.daily_budget,
        Campaign.Fields.lifetime_budget,
        Campaign.Fields.stop_time,
      ],
      { limit: 100 }
    );

    // Fetch insights for each campaign
    const campaignData = await Promise.all(
      campaigns.map(async (campaign) => {
        const insights = await campaign.getInsights(
          [
            'spend',
            'actions',
            'impressions',
            'reach',
            'clicks',
            'ctr',
            'cpc',
            'cpm',
            'conversions',
            'cost_per_action_type',
          ],
          {
            date_preset: 'maximum',
            action_breakdowns: ['action_type'],
            limit: 1,
          }
        );

        const actions = insights[0]?.actions || [];
        const results = actions.reduce(
          (acc: Record<string, number>, action: { action_type: string; value: number }) => {
            acc[action.action_type] = action.value || 0;
            return acc;
          },
          {} as Record<string, number>
        );
        return {
          campaign_id: campaign.id,
          name: campaign.name,
          status: campaign.status,
          objective: campaign.objective,
          daily_budget: campaign.daily_budget || null,
          lifetime_budget: campaign.lifetime_budget || null,
          stop_time: campaign.stop_time || null,
          spend: insights[0]?.spend || 0,
          impressions: insights[0]?.impressions || 0,
          reach: insights[0]?.reach || 0,
          clicks: insights[0]?.clicks || 0,
          ctr: insights[0]?.ctr || 0,
          cpc: insights[0]?.cpc || 0,
          cpm: insights[0]?.cpm || 0,
          conversions: insights[0]?.conversions || 0,
          cost_per_conversion: insights[0]?.cost_per_action_type?.conversion || null,
          results,
        };
      })
    );

    return campaignData;
  } catch (error) {
    console.error('Error fetching Facebook campaign insights:', error);
    throw new Error('Failed to fetch Facebook campaign insights');
  }
};

export const fetchAdSetsIds = async (adAccountId: string, accessToken: string) => {
  const response = await fetch(
    `https://graph.facebook.com/v21.0/${adAccountId}/adsets?fields=id,name,status,optimization_goal,daily_budget,lifetime_budget,end_time,campaign_id`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching ad sets`);
  }

  const data = await response.json();
  return data.data;
};


export const fetchFacebookAdSetInsights = async ({ adAccountId, accessToken }: { adAccountId: string; accessToken: string }) => {
  function initFacebookApi() {
    if (!accessToken) {
      throw new Error('Facebook access token is missing');
    }
    FacebookAdsApi.init(accessToken);
  }

  initFacebookApi(); // Initialize the Facebook API with the access token

  try {
    const account = new AdAccount(adAccountId);

    // Fetch Ad Sets for the given ad account
    const adSets = await account.getAdSets(
      [
        AdSet.Fields.name,
        AdSet.Fields.status,
        AdSet.Fields.daily_budget,
        AdSet.Fields.lifetime_budget,
        AdSet.Fields.end_time,
        AdSet.Fields.optimization_goal,
        AdSet.Fields.campaign_id, 

      ],
      { limit: 100 }
    );

    // Fetch insights for each Ad Set
    const adSetData = await Promise.all(
      adSets.map(async (adSet) => {
        const insights = await adSet.getInsights(
          [
            'spend',
            'actions',
            'impressions',
            'reach',
            'clicks',
            'ctr',
            'cpc',
            'cpm',
            'conversions',
            'cost_per_action_type',
          ],
          {
            date_preset: 'maximum',
            action_breakdowns: ['action_type'],
            limit: 1,
          }
        );

        const actions = insights[0]?.actions || [];
        const results = actions.reduce(
          (acc: Record<string, number>, action: { action_type: string; value: number }) => {
            acc[action.action_type] = action.value || 0;
            return acc;
          },
          {} as Record<string, number>
        );

        return {
          ad_set_id: adSet.id,
          campaign_id: adSet.campaign_id, 
          name: adSet.name,
          status: adSet.status,
          daily_budget: adSet.daily_budget || null,
          lifetime_budget: adSet.lifetime_budget || null,
          end_time: adSet.end_time || null,
          optimization_goal: adSet.optimization_goal || null,
          spend: insights[0]?.spend || 0,
          impressions: insights[0]?.impressions || 0,
          reach: insights[0]?.reach || 0,
          clicks: insights[0]?.clicks || 0,
          ctr: insights[0]?.ctr || 0,
          cpc: insights[0]?.cpc || 0,
          cpm: insights[0]?.cpm || 0,
          conversions: insights[0]?.conversions || 0,
          cost_per_conversion: insights[0]?.cost_per_action_type?.conversion || null,
          results,
        };
      })
    );

    return adSetData;
  } catch (error) {
    console.error('Error fetching Facebook Ad Set insights:', error);
    throw new Error('Failed to fetch Facebook Ad Set insights');
  }
};

// export const fetchFacebookAdInsights = async ({ adAccountId, accessToken }: { adAccountId: string; accessToken: string }) => {
//   function initFacebookApi() {
//     if (!accessToken) {
//       throw new Error('Facebook access token is missing');
//     }
//     FacebookAdsApi.init(accessToken);
//   }

//   initFacebookApi(); // Initialize the Facebook API with the access token

//   try {
//     const account = new AdAccount(adAccountId);

//     // Fetch Ads for the given ad account
//     const ads = await account.getAds(
//       [
//         Ad.Fields.name,
//         Ad.Fields.status,
//         Ad.Fields.creative,
//         Ad.Fields.bid_amount,
//         Ad.Fields.effective_status,
//         Ad.Fields.ad_review_feedback,
//       ],
//       { limit: 100 }
//     );

//     // Fetch insights for each Ad
//     const adData = await Promise.all(
//       ads.map(async (ad) => {
//         const insights = await ad.getInsights(
//           [
//             'spend',
//             'actions',
//             'impressions',
//             'reach',
//             'clicks',
//             'ctr',
//             'cpc',
//             'cpm',
//             'conversions',
//             'cost_per_action_type',
//           ],
//           {
//             date_preset: 'maximum',
//             action_breakdowns: ['action_type'],
//             limit: 1,
//           }
//         );

//         const actions = insights[0]?.actions || [];
//         const results = actions.reduce(
//           (acc: Record<string, number>, action: { action_type: string; value: number }) => {
//             acc[action.action_type] = action.value || 0;
//             return acc;
//           },
//           {} as Record<string, number>
//         );

//         return {
//           ad_id: ad.id,
//           name: ad.name,
//           status: ad.status,
//           creative: ad.creative || null,
//           bid_amount: ad.bid_amount || null,
//           effective_status: ad.effective_status || null,
//           ad_review_feedback: ad.ad_review_feedback || null,
//           spend: insights[0]?.spend || 0,
//           impressions: insights[0]?.impressions || 0,
//           reach: insights[0]?.reach || 0,
//           clicks: insights[0]?.clicks || 0,
//           ctr: insights[0]?.ctr || 0,
//           cpc: insights[0]?.cpc || 0,
//           cpm: insights[0]?.cpm || 0,
//           conversions: insights[0]?.conversions || 0,
//           cost_per_conversion: insights[0]?.cost_per_action_type?.conversion || null,
//           results,
//         };
//       })
//     );

//     return adData;
//   } catch (error) {
//     console.error('Error fetching Facebook Ad insights:', error);
//     throw new Error('Failed to fetch Facebook Ad insights');
//   }
// };


// export const fetchAdsIds = async (adAccountId: string, accessToken: string, adSetId: string) => {
//   const response = await fetch(
//     `https://graph.facebook.com/v21.0/${adAccountId}/ads?fields=id,name,status,creative,campaign_id,adset_id&filtering=[{field:'adset_id',operator:'EQUAL',value:'${adSetId}'}]`,
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Error fetching ads for ad set ${adSetId}`);
//   }

//   const data = await response.json();
//   return data.data; // Returns an array of ads
// };