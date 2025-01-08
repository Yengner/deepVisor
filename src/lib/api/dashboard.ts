import { fetchMetrics } from '@/lib/api/platforms/meta/metrics';
import { fetchAccountInfo } from '@/lib/api/platforms/meta/accountInfo';
import { fetchCampaignMetrics } from '@/lib/api/platforms/meta/topCampaigns';
import { fetchAgeGenderCountryMetrics } from './platforms/meta/demographics';
import { fetchPerformanceMetrics } from './platforms/meta/performanceMetrics';
import { createSupabaseClient } from '@/lib/utils/supabase/clients/server';
import { getLoggedInUser } from '../actions/user.actions';

export const fetchDashboardMetrics = async (platform: string, adAccountId: string) => {
  const supabase = await createSupabaseClient();

  // Replace this with actual user ID logic (e.g., session or JWT)
  const loggedIn = await getLoggedInUser();
  const userId = loggedIn.id;

  // Step 1: Fetch the access token
  const { data, error } = await supabase
    .from('platform_integrations')
    .select('access_token')
    .eq('user_id', userId)
    .eq('platform_name', platform)
    .single();

  if (error || !data || !data.access_token) {
    console.error('Access token not found for the user and platform:', error || 'No data');
    return { error: 'Access token not found for the user and platform.' };
  }

  const accessToken = data.access_token;

  // Step 2: Fetch all other data in parallel
  const [metrics, accountInfo, topCampaigns, ageGenderMetrics, performanceMetrics] = await Promise.allSettled([
    fetchMetrics(adAccountId, accessToken),
    fetchAccountInfo(adAccountId, accessToken),
    fetchCampaignMetrics(adAccountId, accessToken),
    fetchAgeGenderCountryMetrics(adAccountId, accessToken),
    fetchPerformanceMetrics(adAccountId, accessToken),
  ]);

  // Step 3: Handle each fetch result

  return {
    metrics: metrics,
    accountInfo: accountInfo,
    topCampaigns: topCampaigns,
    ageGenderMetrics: ageGenderMetrics,
    performanceMetrics: performanceMetrics,
  };
};
