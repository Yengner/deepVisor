'use server';

import { createSupabaseClient } from "../utils/supabase/clients/server";

interface CampaignInsight {
  campaign_id: string;
  name: string;
  status: string;
  objective: string;
  daily_budget?: number;
  lifetime_budget?: number;
  stop_time?: string;
  spend: number;
  impressions: number;
  reach: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  conversions: number;
  cost_per_conversion: number;
  results: any; // JSON field for detailed results
  updated_at: string;
}

interface AdSetInsight {
  ad_set_id: string;
  name: string;
  status: string;
  daily_budget: string | null;
  lifetime_budget: string | null;
  end_time: string | null;
  optimization_goal: string | null;
  campaign_id: string; // Link to the parent campaign
  ad_account_id: string;
  spend: number;
  impressions: number;
  reach: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  conversions: number;
  cost_per_conversion: number;
  results: any; // JSON field for detailed results
  updated_time: string;
  created_time: string;
}

interface AdInsight {
  ad_id: string;
  name: string;
  status: string;
  creative: string | null;
  bid_amount: number | null;
  effective_status: string;
  ad_review_feedback: string | null;
  ad_set_id: string; // Link to the parent ad set
  ad_account_id: string;
  spend: number;
  impressions: number;
  reach: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  conversions: number;
  cost_per_conversion: number;
  results: any; // JSON field for detailed results
  updated_time: string;
  created_time: string;
}

interface AdSet {
  ad_set_id: string;
  name: string;
  status: string;
  daily_budget: string | null;
  lifetime_budget: string | null;
  end_time: string | null;
  optimization_goal: string | null;
  campaign_id: string; // Reference to the parent campaign
  ad_account_id: string; // Reference to the ad account
  updated_time: string;
  created_time: string;
}
const supabase = await createSupabaseClient();

export const upsertCampaigns = async (campaigns: any[]) => {
  const { data, error } = await supabase
    .from('campaigns')
    .upsert(campaigns, {
      onConflict: 'campaign_id', // Use an array if there are multiple unique columns
    });

  if (error) {
    throw error;
  }
  return data;
};

export const upsertCampaignInsights = async (insights: CampaignInsight[]) => {
  const { data, error } = await supabase
    .from('campaign_insights')
    .upsert(insights, {
      onConflict: 'campaign_id', // Ensure uniqueness by `campaign_id`
    });

  if (error) {
    console.error('Error upserting campaign insights:', error);
    throw error;
  }

  return data;
};

export const upsertAdSets = async (adSets: AdSet[]) => {

  const { data, error } = await supabase
    .from('ad_sets')
    .upsert(adSets, {
      onConflict: 'ad_set_id',
    });

  if (error) {
    console.error('Error upserting ad sets:', error);
    throw error;
  }

  return data;
};

export const upsertAdSetInsights = async (insights: AdSetInsight[]) => {
  const { data, error } = await supabase
    .from('ad_set_insights')
    .upsert(insights, {
      onConflict: 'ad_set_id', 
    });

  if (error) {
    console.error('Error upserting ad set insights:', error);
    throw error;
  }

  return data;
};


// export const upsertAdInsights = async (insights: AdInsight[]) => {
//   const { data, error } = await supabase
//     .from('ad_insights')
//     .upsert(insights, {
//       onConflict: 'ad_id', // Ensure uniqueness by `ad_id`
//     });

//   if (error) {
//     console.error('Error upserting ad insights:', error);
//     throw error;
//   }

//   return data;
// };

// export const upsertAds = async (ads: AdInsight[]) => {

//   const { data, error } = await supabase
//     .from('ads') // The table where ads are stored
//     .upsert(ads, {
//       onConflict: 'ad_id', // Ensure uniqueness by `ad_id`
//     });

//   if (error) {
//     console.error('Error upserting ads:', error);
//     throw error;
//   }

//   return data;
// };