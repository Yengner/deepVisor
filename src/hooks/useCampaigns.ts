import { useQuery } from '@tanstack/react-query';
import { useAccessToken } from './useAccessToken';
import { upsertAdSetInsights, upsertAdSets, upsertCampaignInsights, upsertCampaigns } from '@/lib/actions/campaign.actions';
import {  fetchAdSetsIds, fetchCampaignsIds, fetchFacebookAdSetInsights, fetchFacebookCampaignInsights } from '@/lib/api/campaigns';

export const useCampaignsIds = (platform: string | null, adAccountId: string | null) => {
  const { data: accessToken } = useAccessToken(platform);
  const currentTime = new Date().toISOString();

  return useQuery({
    queryKey: ['campaigns', platform, adAccountId],
    queryFn: async () => {
      const campaigns = await fetchCampaignsIds(adAccountId!, accessToken!);
      await upsertCampaigns(
        campaigns.map((campaign:any) => ({
          campaign_id: campaign.id,
          name: campaign.name,
          status: campaign.status,
          objective: campaign.objective,
          daily_budget: campaign.daily_budget,
          total_budget: campaign.lifetime_budget,
          ad_account_id: adAccountId!,
          updated_time: currentTime,
          created_time: campaign.created_time,
        }))
      );
      return campaigns;
    },
    enabled: !!platform && !!adAccountId && !!accessToken,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
};

export const useCampaignInsights = (platform: string | null, adAccountId: string | null) => {
  const { data: accessToken } = useAccessToken(platform);
  const currentTime = new Date().toISOString();

  return useQuery({
    queryKey: ['campaignInsights', platform, adAccountId],
    queryFn: async () => {
      const insights = await fetchFacebookCampaignInsights({
        adAccountId: adAccountId!,
        accessToken: accessToken!,
      });

      // Upsert the insights into Supabase
      await upsertCampaignInsights(
        insights.map((insight: any) => ({
          campaign_id: insight.campaign_id,
          name: insight.name,
          status: insight.status,
          objective: insight.objective,
          daily_budget: insight.daily_budget,
          lifetime_budget: insight.lifetime_budget,
          stop_time: insight.stop_time,
          spend: insight.spend,
          impressions: insight.impressions,
          reach: insight.reach,
          clicks: insight.clicks,
          ctr: insight.ctr,
          cpc: insight.cpc,
          cpm: insight.cpm,
          conversions: insight.conversions,
          cost_per_conversion: insight.cost_per_conversion,
          results: insight.results, // JSON of detailed results
          updated_at: currentTime,
        }))
      );

      return insights;
    },
    enabled: !!platform && !!adAccountId && !!accessToken,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
};

export const useAdSetsIds = (platform: string | null, adAccountId: string | null) => {
  const { data: accessToken } = useAccessToken(platform);
  const currentTime = new Date().toISOString();

  return useQuery({
    queryKey: ['adSets', platform, adAccountId],
    queryFn: async () => {
      const adSets = await fetchAdSetsIds(adAccountId!, accessToken!);
      await upsertAdSets(
        adSets.map((adSets:any) => ({
          ad_set_id: adSets.id,
          name: adSets.name,
          status: adSets.status,
          campaign_id: adSets.campaign_id,
          objective: adSets.objective,
          daily_budget: adSets.daily_budget,
          lifetime_budget: adSets.lifetime_budget,
          optimization_goal: adSets.optimization_goal,
          end_time: adSets.end_time,
          ad_account_id: adAccountId!,
          updated_time: currentTime,
          created_time: adSets.created_time,
        }))
      );
      return adSets;
    },
    enabled: !!platform && !!adAccountId && !!accessToken,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
};

export const useAdSetInsights = (platform: string | null, adAccountId: string | null) => {
  const { data: accessToken } = useAccessToken(platform);
  const currentTime = new Date().toISOString();

  return useQuery({
    queryKey: ['adSetInsights', platform, adAccountId],
    queryFn: async () => {
      const insights = await fetchFacebookAdSetInsights({
        adAccountId: adAccountId!,
        accessToken: accessToken!,
      });

      // Upsert the insights into Supabase
      await upsertAdSetInsights(
        insights.map((insight: any) => ({
          ad_set_id: insight.ad_set_id,
          name: insight.name, 
          status: insight.status,
          daily_budget: insight.daily_budget || null,
          lifetime_budget: insight.lifetime_budget || null,
          end_time: insight.end_time || null,
          optimization_goal: insight.optimization_goal || 'N/A',
          campaign_id: insight.campaign_id, 
          ad_account_id: adAccountId!, 
          spend: insight.spend,
          impressions: insight.impressions,
          reach: insight.reach,
          clicks: insight.clicks,
          ctr: insight.ctr,
          cpc: insight.cpc,
          cpm: insight.cpm,
          conversions: insight.conversions,
          cost_per_conversion: insight.cost_per_conversion ,
          results: insight.results || {}, 
          updated_time: insight.updated_time || currentTime, 
          created_time: insight.created_time || currentTime, 
        }))
      );

      return insights;
    },
    enabled: !!platform && !!adAccountId && !!accessToken,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
};


// export const useAdsIds = (platform: string | null, adAccountId: string | null) => {
//   const { data: accessToken } = useAccessToken(platform);
//   const currentTime = new Date().toISOString();

//   return useQuery({
//     queryKey: ['ads', platform, adAccountId],
//     queryFn: async () => {
//       // Fetch campaigns to get the campaign IDs
//       const campaigns = await fetchCampaignsIds(adAccountId!, accessToken!);

//       // Fetch ad sets for each campaign to get the ad set IDs
//       const adSets = [];
//       for (const campaign of campaigns) {
//         const campaignAdSets = await fetchAdSetsIds(adAccountId!, accessToken!, campaign.id);
//         adSets.push(...campaignAdSets);
//       }

//       // Fetch ads for each ad set
//       const ads = [];
//       for (const adSet of adSets) {
//         const adSetAds = await fetchAdsIds(adAccountId!, accessToken!, adSet.id);
//         ads.push(
//           ...adSetAds.map((ad: any) => ({
//             ad_id: ad.id,
//             name: ad.name,
//             status: ad.status,
//             creative: ad.creative,
//             bid_amount: ad.bid_amount,
//             effective_status: ad.effective_status,
//             ad_review_feedback: ad.ad_review_feedback,
//             ad_set_id: ad.ad_set_id, // Link to the parent ad set
//             ad_account_id: adAccountId!,
//             updated_time: currentTime,
//             created_time: ad.created_time,
//           }))
//         );
//       }

//       // Upsert ads into Supabase
//       await upsertAds(ads);

//       return ads;
//     },
//     enabled: !!platform && !!adAccountId && !!accessToken,
//   });
// };