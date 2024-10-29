'use server'

import { FacebookAdsApi, AdAccount, Campaign } from 'facebook-nodejs-business-sdk';
import { createSupabaseClient } from '@/lib/utils/supabase/clients/server';
import { getAdAccounts } from '@/lib/actions/user.actions';
import { parseStringify } from '@/lib/utils/utils';

interface Action {
  action_type: string;
  value: string | number;
}

interface InfoData {
  id: string;
  name: string;
  category: string;
}

interface AdAccountData {
  id: string;
}

export async function getFbAdAccounts({ userId }: getAccountsProps) {
  try {
    const supabase = createSupabaseClient();

    // Fetching the Facebook access token for the user from Supabase
    const { data } = await supabase
      .from('access_token')
      .select('facebook_access_token')
      .eq('user_id', userId)

    // Fetching facebook account info from supabase ei. name, category etc.
    const { data: accountInfo } = await supabase
    .from('facebook_pages')
    .select('facebook_page_id, facebook_page_name, category')
    .eq('user_id', userId);    

    const adAccounts = await getAdAccounts({ userId })
    const accountInfoData = accountInfo || [];

    if (!data || data.length === 0) {
      throw new Error('No access token found for the user');
    }

    const accessToken = data[0]?.facebook_access_token;

    const accounts = await Promise.all(
      adAccounts?.map(async (adAccount: FbAccountData) => {
        const campaignInsights = await fetchFacebookCampaignInsights({ adAccountId: adAccount.id, accessToken: accessToken });

        return {
          adAccountId: adAccount.id,
          campaigns: campaignInsights
        };
      })
    );

    const totalAdAccounts = accounts.length;

    return parseStringify({ data: accounts, totalAdAccounts, accountInfoData });
  } catch (error) {

  }
}

export async function getFbAdAccount({ adAccountId }: GetAdAccountProps) {
  try {
    const supabase = createSupabaseClient();

    // Get the Facebook access token for the user from Supabase
    const { data } = await supabase
      .from('access_token')
      .select('facebook_access_token')
      .single(); 
    
    const { data: accountInfo } = await supabase
      .from('facebook_pages')
      .select('facebook_page_id, facebook_page_name, category')

    if (!data || !data.facebook_access_token) {
      throw new Error('No access token found for the user');
    }

    const accessToken = data.facebook_access_token;

    // get campaign insights for the specific adAccountId
    const campaignInsights = await fetchFacebookCampaignInsights({
      adAccountId,
      accessToken,
    });

    return {
      adAccountId,
      campaigns: campaignInsights,
      accountInfo
    };
  } catch (error) {
    console.error('Error fetching campaigns for ad account:', error);
    throw new Error('Failed to retrieve campaigns for the ad account');
  }
}

// FETCH FACEBOOK USER DATA FROM SUPABASE
export async function fetchFbUserDataFromSupabase(userId: string) {
  const supabase = createSupabaseClient();  // Create a server-side Supabase client

  try {
    // Fetch ad accounts
    const { data: adAccountsData, error: adAccountsError } = await supabase
      .from('ad_accounts')
      .select('id')
      .eq('user_id', userId);

    if (adAccountsError || !adAccountsData) {
      throw new Error('Failed to fetch ad accounts');
    }

    // Fetch Facebook page info
    const { data: accountsInfoData, error: accountsInfoError } = await supabase
      .from('facebook_pages')
      .select('facebook_page_id, facebook_page_name, category')
      .eq('user_id', userId);

    if (accountsInfoError || !accountsInfoData) {
      throw new Error('Failed to fetch Facebook pages');
    }

    return { adAccounts: adAccountsData, accountsInfo: accountsInfoData };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'An unknown error occurred.');
  }
}

export async function insertFbUserDataIntoSupabase(userId: string, accessToken: string, adAccountsData: AdAccountData[], accountsInfoData: InfoData[]) {
  const supabase = createSupabaseClient();

  try {
    // Store access token
    const { error: accessTokenError } = await supabase
      .from('access_token')
      .insert({
        user_id: userId,
        facebook_access_token: accessToken,
      });

    if (accessTokenError) {
      throw new Error(`Failed to store Facebook access token: ${accessTokenError.message}`);
    }

    const { error: pagesError } = await supabase
      .from('facebook_pages')
      .upsert(
        accountsInfoData.map((page) => ({
          user_id: userId,
          facebook_page_id: page.id,
          facebook_page_name: page.name,
          category: page.category || '',
          updated_at: new Date(),
        }))
      );

    if (pagesError) {
      throw new Error(`Failed to store Facebook pages: ${pagesError.message}`);
    }

    const { error: adAccountsError } = await supabase
      .from('ad_accounts')
      .upsert(
        adAccountsData.map((account) => ({
          id: account.id,
          user_id: userId,
          last_updated: new Date(),
        }))
      );

    if (adAccountsError) {
      throw new Error(`Failed to store ad accounts: ${adAccountsError.message}`);
    }

    return { insertedadAccounts: adAccountsData, insertedaccountsInfo: accountsInfoData };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'An unknown error occurred.');
  }
}



// // Fetch Facebook campaign insights and store in Supabase
export const fetchFacebookCampaignInsights = async ({ adAccountId, accessToken }: fetchFacebookCampaignInsights) => {
  function initFacebookApi() {
    if (!accessToken) {
      throw new Error('Facebook access token is missing from environment variables');
    }
    FacebookAdsApi.init(accessToken);
  }

  initFacebookApi();  // Initialize the Facebook API with the access token

  try {
    const account = new AdAccount(adAccountId);

    // Fetch campaigns from the Facebook Ads account
    const campaigns = await account.getCampaigns([Campaign.Fields.name], { limit: 10 });

    // Fetch insights for each campaign and prepare the data for Supabase
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
          action_breakdowns: ['action_type'], // breakdown action type [leads, link_clicks, etc...]
          limit: 1,
        });

        // Extract lead count and other actions from the insights
        const leads = insights[0]?.actions?.find((action: Action) => action.action_type === 'lead')?.value || 0;
        const link_click = insights[0]?.actions?.find((action: Action) => action.action_type === "link_click")?.value || 0;

        return {
          campaign_id: campaign.id,
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
          cost_per_action: insights[0]?.cost_per_action_type || {},
        };
      })
    );

    return campaignData;
  } catch (error) {
    console.error('Error fetching and storing Facebook campaign insights:', error);
    throw new Error('Failed to fetch and store Facebook campaign insights');
  }
};


// // INSERT FACEBOOK CAMPAIGN INSIGHTS INTO SUPABASE
// export const insertCampaignStatsIntoSupabase = async (campaignStats: any[]) => {

//   const supabase = createServerClient();

//   try {
//     // Upsert campaign statistics into `facebook_campaign_stats` table
//     const { data, error } = await supabase
//       .from('facebook_campaign_stats')
//       .upsert(
//         campaignStats.map((stat) => ({
//           campaign_id: stat.campaign_id, // Must link to the facebook_campaigns table
//           spend: stat.spend,
//           impressions: stat.impressions,
//           reach: stat.reach,
//           clicks: stat.clicks,
//           ctr: stat.ctr,
//           cpc: stat.cpc,
//           cpm: stat.cpm,
//           leads: stat.leads,
//           conversions: stat.conversions,
//           link_clicks: stat.link_click,
//           updated_at: new Date(), // Timestamp for when this data was updated
//         })),
//         { onConflict: 'campaign_id' } // If there's a conflict on campaign_id, update the data
//       );

//     if (error) {
//       throw new Error(`Failed to upsert campaign stats: ${error.message}`);
//     }

//     return data;
//   } catch (err) {
//     console.error('Error inserting campaign stats into Supabase:', err);
//     throw new Error('Failed to insert campaign stats into Supabase');
//   }
// };

// // INSERT FACEBOOK CAMPAIGN DATA INTO SUPABASE
// export const insertCampaignDataIntoSupabase = async (campaigns: any[]) => {
//   const supabase = createServerClient();

//   try {
//     // Upsert campaigns into `facebook_campaigns` table
//     const { data, error } = await supabase
//       .from('facebook_campaigns')
//       .upsert(
//         campaigns.map((campaign) => ({
//           ad_account_id: campaign.ad_account_id,
//           campaign_id: campaign.campaign_id,
//           campaign_name: campaign.campaign_name,
//         })),
//         { onConflict: 'campaign_id' } // If there's a conflict on campaign_id, update the data
//       );

//     if (error) {
//       throw new Error(`Failed to upsert campaign data: ${error.message}`);
//     }

//     return data;
//   } catch (err) {
//     console.error('Error inserting campaign data into Supabase:', err);
//     throw new Error('Failed to insert campaign data into Supabase');
//   }
// };


// // // FETCH FACEBOOK CAMPAIGN INSIGHTS
// // export const fetchCampaignStatsFromSupabase = async (adAccountId: string) => {
// //     const supabase = createServerClient();

// //     try {
// //         const { data, error } = await supabase
// //         .from('facebook_campaign_stats')
// //         .select('campaign_id, spend, impressions, reach, clicks, ctr, cpc, cpm, leads, conversions, link_clicks')
// //         .eq('ad_account_id', adAccountId);

// //         if (error) {
// //         throw new Error(`Failed to fetch campaign stats: ${error.message}`);
// //         }

// //         return data;
// //     } catch (err) {
// //         console.error('Error fetching campaign stats from Supabase:', err);
// //         throw new Error('Failed to fetch campaign stats from Supabase');
// //     }
// // };
