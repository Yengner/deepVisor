import { useQuery } from '@tanstack/react-query';
import { fetchCampaigns } from '@/lib/api/campaigns';

export const useCampaigns = (platform: string | null, adAccount: string | null) => {
  return useQuery({
    queryKey: ['campaigns', platform, adAccount], // Unique query key
    queryFn: () => fetchCampaigns(platform!, adAccount!), // Use `!` since `enabled` ensures non-null
    enabled: !!platform && !!adAccount, // Fetch only when both platform and ad account are non-null
  });
};
