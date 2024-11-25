import { fetchAccessToken } from "@/lib/api/accessToken";
import { useQuery } from "@tanstack/react-query";

// Hook for getting accessToken for specific platform from supabase
export const useAccessToken = (platform: string | null) => {
    return useQuery<string, Error>({
      queryKey: ["accessToken", platform],
      queryFn: () => fetchAccessToken(platform!), // `!` because `enabled` ensures platform is not null
      enabled: !!platform,
      staleTime: 1000 * 60 * 1, // Cache token for 1 minutes
    });
  };