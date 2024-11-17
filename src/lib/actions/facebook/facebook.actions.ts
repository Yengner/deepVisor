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
  user_id: string;
  platform: string;
  ad_account_id: string;
}

export async function getFbAdAccounts({ userId }: getAccountsProps) {
  try {
    const supabase = createSupabaseClient();

    const { data: FbAccessToken } = await supabase
      .from('access_tokens')
      .select('access_token')
      .eq('user_id', userId)
      .eq('platform', 'facebook')
      .single(); 
    
    // Fetching facebook account info from supabase ei. name, category etc.
    const { data: accountInfo } = await supabase
    .from('facebook_pages')
    .select('facebook_page_id, facebook_page_name, category')
    .eq('user_id', userId);    

    const adAccounts = await getAdAccounts({ userId })
    const accountInfoData = accountInfo || [];
    
    if (!FbAccessToken || !FbAccessToken.access_token) {
      throw new Error('No access token found for the user');
    }
    const accessToken = FbAccessToken.access_token;

    const accounts = await Promise.all(
      adAccounts?.map(async (adAccount: AdAccountData) => {
      const adAccountId = adAccount.ad_account_id; 

        if (!adAccount.ad_account_id) {
          console.warn(`Ad account ID missing for ad account: ${JSON.stringify(adAccount)}`);
          return null; // Skip invalid ad accounts
        }
        
        // Function to fetch campaign insights for an ad account
        const campaignInsights = await fetchFacebookCampaignInsights({ adAccountId: adAccountId, accessToken: accessToken });

        return {
          adAccountId: adAccount.ad_account_id,
          campaigns: campaignInsights
        };
      })
    );

    const totalAdAccounts = accounts.length;

    return parseStringify({ data: accounts, totalAdAccounts, accountInfoData });
  } catch (error) {
    console.error('Error fetching Facebook ad accounts:', error);
    throw new Error('Failed to fetch Facebook ad accounts.');
  }
}

export async function getFbAdAccount({ adAccountId, userId }: GetAdAccountProps) {
  try {
    const supabase = createSupabaseClient();

    // Get the Facebook access token for the user from Supabase
    const { data: FbAccessToken } = await supabase
      .from('access_tokens')
      .select('access_token')
      .eq('user_id', userId)
      .eq('platform', 'facebook')
      .single(); 
    
    const { data: accountInfo } = await supabase
      .from('facebook_pages')
      .select('facebook_page_id, facebook_page_name, category')
      .eq('user_id', userId);

    if (!FbAccessToken || !FbAccessToken.access_token) {
      throw new Error('No access token found for the user');
    }

    const accessToken = FbAccessToken.access_token;

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
  const supabase = createSupabaseClient(); 

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

export async function insertFbUserDataIntoSupabase(
  userId: string,
  accessToken: string,
  adAccountsData: AdAccountData[],
  accountsInfoData: InfoData[]
) {
  const supabase = createSupabaseClient();

  try {
    // Upsert access token into `access_token` table
    const { error: accessTokenError } = await supabase
      .from('access_tokens')
      .upsert({
        user_id: userId,
        platform: 'facebook',
        access_token: accessToken,
        updated_at: new Date(),
      },
      { onConflict: 'access_token' }
      );

    if (accessTokenError) {
      console.warn(`Failed to store Facebook access token: ${accessTokenError.message}`);
    }

    // Upsert Facebook pages into `facebook_pages` table
    const { error: pagesError } = await supabase
      .from('facebook_pages')
      .upsert(
        accountsInfoData.map((page) => ({
          user_id: userId,
          facebook_page_id: page.id,
          facebook_page_name: page.name,
          category: page.category || '',
          updated_at: new Date(),
        })),
        { onConflict: 'facebook_page_id' }
      );

    if (pagesError) {
      console.warn(`Failed to store Facebook pages: ${pagesError.message}`);
    }

    // Upsert Ad accounts into `ad_accounts` table
    const { error: adAccountsError } = await supabase
      .from('ad_accounts')
      .upsert(
        adAccountsData.map((account) => ({
          user_id: userId,
          platform: 'facebook',
          ad_account_id: account.ad_account_id,
          updated_at: new Date(),
        })),
        { onConflict: 'ad_account_id' }
      );

    if (adAccountsError) {
      console.warn(`Failed to store ad accounts: ${adAccountsError.message}`);
    }

    return { insertedAdAccounts: adAccountsData, insertedAccountsInfo: accountsInfoData };
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'An unknown error occurred.');
  }
}
// Fetch Facebook campaign insights
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
    console.error('Error fetching Facebook campaign insights:', error);
    throw new Error('Failed to fetch Facebook campaign insights');
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
