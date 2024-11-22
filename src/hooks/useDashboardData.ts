import { useQuery } from '@tanstack/react-query';

export const useDashboardMetrics = (platform: string | null, adAccountId: string | null) => {
  return useQuery({
    queryKey: ['dashboardMetrics', platform, adAccountId],
    queryFn: async () => {
      const response = await fetch(`/api/${platform}/ad-accounts/${adAccountId}/dashboard-metrics`);
      if (!response.ok) throw new Error('Error fetching dashboard metrics');
      return response.json();
    },
    enabled: !!platform && !!adAccountId,
  });
};

export const useInsights = (platform: string | null, adAccountId: string | null, timeRange: string = 'daily') => {
  return useQuery({
    queryKey: ['insights', platform, adAccountId, timeRange],
    queryFn: async () => {
      const response = await fetch(`/api/${platform}/ad-accounts/${adAccountId}/insights?time_range=${timeRange}`);
      if (!response.ok) throw new Error('Error fetching insights');
      return response.json();
    },
    enabled: !!platform && !!adAccountId,
  });
};

export const useTopCampaigns = (platform: string | null, adAccountId: string | null, metric: string = 'leads') => {
  return useQuery({
    queryKey: ['topCampaigns', platform, adAccountId, metric],
    queryFn: async () => {
      const response = await fetch(`/api/${platform}/ad-accounts/${adAccountId}/top-campaigns?metric=${metric}`);
      if (!response.ok) throw new Error('Error fetching top campaigns');
      return response.json();
    },
    enabled: !!platform && !!adAccountId,
  });
};
