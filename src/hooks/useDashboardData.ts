import { useQuery } from '@tanstack/react-query';
import { fetchTotalAdAccountInsights, fetchInsights, fetchTopCampaigns, fetchPerformanceMetrics, fetechAccountInfo, fetchAgeGenderCountryMetrics } from '@/lib/api/dashboard';
import { useAccessToken } from './useAccessToken';

export const useTotalAdAccountInsights = (platform: string | null, adAccountId: string | null) => {
  const { data: accessToken } = useAccessToken(platform);
  return useQuery({
    queryKey: ['dashboardMetrics', platform, adAccountId],
    queryFn: () => fetchTotalAdAccountInsights(platform!, adAccountId!, accessToken!),
    enabled: !!platform && !!adAccountId && !!accessToken,
    staleTime: 1000 * 60 * 10, // Cache data for 5 minutes
  });
};

export const usePerformanceMetrics = (platform: string | null, adAccountId: string | null) => {
  const { data: accessToken } = useAccessToken(platform);
  return useQuery({
    queryKey: ['performanceMetrics', adAccountId],
    queryFn: () => fetchPerformanceMetrics(adAccountId!, accessToken!),
    enabled: !!adAccountId && !!accessToken,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
};

export const useAgeGenderCountryMetrics = (platform: string | null, adAccountId: string | null) => {
  const { data: accessToken } = useAccessToken(platform);
  return useQuery({
    queryKey: ['ageGenderMetrics', adAccountId],
    queryFn: () => fetchAgeGenderCountryMetrics(adAccountId!, accessToken!),
    enabled: !!adAccountId && !!accessToken,
    staleTime: 1000 * 60 * 10, // Cache data for 5 minutes
  });
}

export const useAccountInfo = (platform: string | null, adAccountId: string | null) => {
  const { data: accessToken } = useAccessToken(platform);
  return useQuery({
    queryKey: ['performanceMetrics', adAccountId, platform],
    queryFn: () => fetechAccountInfo(platform!, adAccountId!, accessToken!),
    enabled: !!platform && !!adAccountId && !!accessToken,
    staleTime: 1000 * 60 * 10, // Cache data for 5 minutes
  });
}

export const useTopCampaigns = (platform: string | null, adAccountId: string | null) => {
  const { data: accessToken } = useAccessToken(platform);
  return useQuery({
    queryKey: ['topCampaigns', platform, adAccountId],
    queryFn: () => fetchTopCampaigns(platform!, adAccountId!, accessToken!),
    enabled: !!platform && !!adAccountId && !!accessToken,
    staleTime: 1000 * 60 * 10, // Cache data for 5 minutes
  });
};

