import { fetchMetrics } from '@/lib/api/platforms/meta/metrics';
import { fetchAccountInfo } from '@/lib/api/platforms/meta/accountInfo';
import { fetchCampaignMetrics } from '@/lib/api/platforms/meta/topCampaigns';
import { fetchAgeGenderCountryMetrics } from './platforms/meta/demographics';
import { fetchPerformanceMetrics } from './platforms/meta/performanceMetrics';
import { createSupabaseClient } from '@/lib/utils/supabase/clients/server';
import { fetchHourlyBreakdown } from './platforms/meta/hourlyBreakdown';

export const fetchDashboardMetrics = async (platform: string, adAccountId: string) => {
  const supabase = await createSupabaseClient();


  // Replace this with actual user ID logic (e.g., session or JWT)
  const userId = '6d9a0842-3887-43a0-8909-16589f8eae2a';

  const { data, error } = await supabase
    .from('access_tokens')
    .select('access_token')
    .eq('user_id', userId)
    .eq('platform', platform)
    .single();

  if (error || !data) {
    throw new Error('Access token not found for the user and platform');
  }

  const accessToken = data.access_token;


  // Fetch all data in parallel
  const [metrics, accountInfo, topCampaigns, ageGenderMetrics, performanceMetrics, hourlyBreakdown] = await Promise.all([
    fetchMetrics(adAccountId, accessToken),
    fetchAccountInfo(adAccountId, accessToken),
    fetchCampaignMetrics(adAccountId, accessToken),
    fetchAgeGenderCountryMetrics(adAccountId, accessToken),
    fetchPerformanceMetrics(adAccountId, accessToken),
    fetchHourlyBreakdown(adAccountId, accessToken),
  ]);

  // Combine results into one object
  return {
    metrics,
    topCampaigns,
    accountInfo,
    ageGenderMetrics,
    performanceMetrics,
    hourlyBreakdown
  };
};

