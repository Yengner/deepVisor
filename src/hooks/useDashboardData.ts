import { useQuery } from '@tanstack/react-query';
import {
  fetchTotalAdAccountInsights,
  fetchTopCampaigns,
  fetchPerformanceMetrics,
  fetechAccountInfo,
  fetchAgeGenderCountryMetrics,
} from '@/lib/api/dashboard';
import { useAccessToken } from './useAccessToken';

export const useDashboardData = (platform: string | null, adAccountId: string | null) => {
  const { data: accessToken } = useAccessToken(platform);

  return useQuery({
    queryKey: ['dashboardData', platform, adAccountId],
    queryFn: async () => {
      if (!platform || !adAccountId || !accessToken) throw new Error('Missing required parameters');

      const [metrics, topCampaigns, performanceMetrics, accountInfo, ageGenderMetrics] = await Promise.all([
        fetchTotalAdAccountInsights(platform, adAccountId, accessToken),
        fetchTopCampaigns(platform, adAccountId, accessToken),
        fetchPerformanceMetrics(adAccountId, accessToken),
        fetechAccountInfo(platform, adAccountId, accessToken),
        fetchAgeGenderCountryMetrics(adAccountId, accessToken),
      ]);

      return {
        metrics,
        topCampaigns,
        performanceMetrics,
        accountInfo,
        ageGenderMetrics,
      };
    },
    enabled: !!platform && !!adAccountId && !!accessToken, // Fetch only when valid inputs are available
    staleTime: 1000 * 60 * 10, // Cache data for 10 minutes
  });
};
