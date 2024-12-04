import { useQuery } from '@tanstack/react-query';
import { fetchCampaigns } from '@/lib/api/campaigns';
import { useAccessToken } from './useAccessToken';

export const useCampaigns = (platform: string | null, adAccount: string | null) => {
  const { data: accessToken } = useAccessToken(platform);

  return useQuery({
    queryKey: ['campaigns', platform, adAccount],
    queryFn: () => fetchCampaigns(platform!, adAccount!, accessToken!),
    enabled: !!platform && !!adAccount && !!accessToken,
  });
};
