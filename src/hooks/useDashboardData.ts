import { useQuery } from '@tanstack/react-query';
import { fetchTotalAdAccountInsights, fetchInsights, fetchTopCampaigns, fetchPerformanceMetrics } from '@/lib/api/dashboard';
import { useAccessToken } from './useAccessToken';

export const useTotalAdAccountInsights = (platform: string | null, adAccountId: string | null) => {
  const { data: accessToken } = useAccessToken(platform);
  return useQuery({
    queryKey: ['dashboardMetrics', platform, adAccountId],
    queryFn: () => fetchTotalAdAccountInsights(platform!, adAccountId!, accessToken!),
    enabled: !!platform && !!adAccountId && !!accessToken,
  });
};

export const usePerformanceMetrics = (platform: string | null, adAccountId: string | null) => {
  const { data: accessToken } = useAccessToken(platform);
  return useQuery({
    queryKey: ['performanceMetrics', adAccountId],
    queryFn: () => fetchPerformanceMetrics(adAccountId!, accessToken!),
    enabled: !!adAccountId && !!accessToken, // Ensure both are available before fetching
    staleTime: 1000 * 60 * 3, // Cache data for 5 minutes
  });
};

export const useInsights = (platform: string | null, adAccountId: string | null, timeRange: string = 'daily') => {
  const { data: accessToken } = useAccessToken(platform);

  return useQuery({
    queryKey: ['insights', platform, adAccountId, timeRange],
    queryFn: () => fetchInsights(platform!, adAccountId!, timeRange, accessToken!),
    enabled: !!platform && !!adAccountId && !!accessToken,
  });
};

export const useTopCampaigns = (platform: string | null, adAccountId: string | null, metric: string = 'leads') => {
  const { data: accessToken } = useAccessToken(platform);

  return useQuery({
    queryKey: ['topCampaigns', platform, adAccountId, metric],
    queryFn: () => fetchTopCampaigns(platform!, adAccountId!, metric, accessToken!),
    enabled: !!platform && !!adAccountId && !!accessToken,
  });
};
