import { fetchAdAccounts } from "@/lib/api/adAccounts";
import { useQuery } from "@tanstack/react-query";

interface AdAccount {
  ad_account_id: string;
}

interface FetchAdAccountsResponse {
  adAccounts: AdAccount[];
  hasAdAccounts: boolean;
}

// Hook for ad accounts dynamically after getting the access token
export const useAdAccounts = (platform: string | null) => {
  return useQuery<FetchAdAccountsResponse, Error>({
    queryKey: ["adAccounts", platform],
    queryFn: () => fetchAdAccounts(platform!), // `!` because `enabled` ensures non-null values
    enabled: !!platform, // Only fetch if both platform and accessToken exist
    staleTime: 1000 * 60 * 1, // Cache data for 1 minute
  });
};
