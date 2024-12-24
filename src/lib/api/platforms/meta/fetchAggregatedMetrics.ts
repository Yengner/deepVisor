import { fetchWithValidation } from "@/lib/utils/common/apiUtils";

export const fetchMetaAggregatedMetrics = async (
  adAccountId: string,
  accessToken: string
): Promise<Record<string, any>> => {
  const API_BASE_URL = process.env.FACEBOOK_GRAPH_API_BASE_URL;

  if (!API_BASE_URL) {
    throw new Error("FACEBOOK_GRAPH_API_BASE_URL is not set in the environment variables");
  }

  // API URL for fetching insights
  const url = `${API_BASE_URL}/${adAccountId}/insights?fields=clicks,impressions,actions,ctr,cpc,cpm,spend&date_preset=maximum`;

  try {
    // Fetch insights data
    const insightsData = await fetchWithValidation(url, accessToken);

    // Extract metrics
    const data = insightsData.data || [];
    let totalClicks = 0;
    let totalImpressions = 0;
    let totalConversions = 0;
    let totalSpend = 0;
    let totalCtr = 0;
    let totalCpc = 0;
    let totalCpm = 0;

    data.forEach((entry: any) => {
      totalClicks += parseInt(entry.clicks || 0, 10);
      totalImpressions += parseInt(entry.impressions || 0, 10);
      totalSpend += parseFloat(entry.spend || 0);
      totalCtr += parseFloat(entry.ctr || 0);
      totalCpc += parseFloat(entry.cpc || 0);
      totalCpm += parseFloat(entry.cpm || 0);

      // Calculate total conversions
      const conversions = entry.actions?.reduce(
        (sum: number, action: any) => sum + (action.value || 0),
        0
      );
      totalConversions += conversions;
    });

    // Average out metrics like CTR, CPC, and CPM if multiple entries exist
    const numEntries = data.length || 1; // Avoid division by zero
    totalCtr = totalCtr / numEntries;
    totalCpc = totalCpc / numEntries;
    totalCpm = totalCpm / numEntries;

    // Return as JSON object for storage in `ad_accounts`
    return {
      clicks: totalClicks,
      impressions: totalImpressions,
      conversions: totalConversions,
      ctr: totalCtr,
      cpc: totalCpc,
      cpm: totalCpm,
      spend: totalSpend,
    };
  } catch (error) {
    console.error("Error fetching aggregated metrics:", error);
    throw new Error("Failed to fetch aggregated metrics.");
  }
};
