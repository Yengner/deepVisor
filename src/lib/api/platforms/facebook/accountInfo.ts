import { fetchWithValidation } from "@/lib/utils/common/apiUtils";
import { AccountInfo } from "../../types";

// Helper
const processInsights = (data: any[]) => {
  return data.map((entry: any) => {
    const linkClicks = entry.actions?.find((action: any) => action.action_type === 'link_click')?.value || 0;
    const postEngagement = entry.actions?.find((action: any) => action.action_type === 'post_engagement')?.value || 0;

    return {
      clicks: parseInt(entry.clicks || 0, 10),
      linkClicks: parseInt(linkClicks || 0, 10),
      postEngagement: parseInt(postEngagement || 0, 10),
    };
  }) ?? [];
};

export const fetchAccountInfo = async (
  adAccountId: string,
  accessToken: string
): Promise<AccountInfo> => {
  const today = new Date().toISOString().split('T')[0];

  const API_BASE_URL = process.env.FACEBOOK_GRAPH_API_BASE_URL;

  if (!API_BASE_URL) {
    throw new Error("FACEBOOK_GRAPH_API_BASE_URL is not set in the environment variables");
  }

  // API URLs for fetching data
  const urls: Record<string, string> = {
    balance: `${API_BASE_URL}/${adAccountId}?fields=balance`,
    spend: `${API_BASE_URL}/${adAccountId}/insights?fields=spend&time_range[since]=${today}&time_range[until]=${today}`,
    insights: `${API_BASE_URL}/${adAccountId}/insights?fields=clicks,spend,actions&date_preset=maximum`,
    accountDetails: `${API_BASE_URL}/${adAccountId}?fields=name,currency,spend_cap,amount_spent,account_status`,
    campaigns: `${API_BASE_URL}/${adAccountId}/campaigns?fields=id`,
  };

  try {
    // Fetch all data in parallel
    const [balanceData, spendData, insightsData, accountDetailsData, campaignsData] = await Promise.all(
      Object.entries(urls).map(async ([key, url]) => {
        try {
          return await fetchWithValidation(url, accessToken);
        } catch (error) {
          console.error(`Error fetching ${key}:`, error);
          throw new Error(`Failed to fetch ${key}`);
        }
      })
    );

    // Process insights
    const processedInsights = processInsights(insightsData.data);

    // Return
    return {
      balance: parseFloat(balanceData.balance || '0'),
      todaySpend: parseFloat(spendData.data?.[0]?.spend || '0'),
      name: accountDetailsData.name || 'Unknown',
      currency: accountDetailsData.currency || 'USD',
      spendCap: parseFloat(accountDetailsData.spend_cap || '0'),
      lifetimeSpend: parseFloat(accountDetailsData.amount_spent || '0') / 100,
      accountStatus: accountDetailsData.account_status || 0,
      totalCampaigns: campaignsData.data?.length || 0,
      insights: processedInsights[0],
    };
  } catch (error) {
    console.error("Error in fetchAccountInfo:", error);
    throw new Error("Failed to fetch account information.");
  }
};