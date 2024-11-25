import { fetchAdAccounts } from "@/lib/api/adAccounts";
import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "./useAccessToken";

interface AdAccount {
  id: string;
  account_id: string;
}
// Hook for ad accounts dynamically after getting the access token
export const useAdAccounts = (platform: string | null) => {
  const {
    data: accessToken,
    isLoading: tokenLoading,
    error: tokenError,
  } = useAccessToken(platform);

  return useQuery<AdAccount[], Error>({
    queryKey: ["adAccounts", platform, accessToken],
    queryFn: () => fetchAdAccounts(platform!, accessToken!), // `!` because `enabled` ensures non-null values
    enabled: !!platform && !!accessToken, // Only fetch if both platform and accessToken exist
    staleTime: 1000 * 60 * 1, // Cache data for 5 minutes
  });
};
