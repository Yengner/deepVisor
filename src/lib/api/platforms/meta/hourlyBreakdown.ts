// import { fetchWithValidation } from "@/lib/utils/common/apiUtils";

// export const fetchHourlyBreakdown = async (
//     adAccountId: string,
//     accessToken: string,
//     timeRange: string = "maximum"
// ): Promise<any[]> => {
//     const API_BASE_URL = process.env.FACEBOOK_GRAPH_API_BASE_URL;

//     if (!API_BASE_URL) {
//         throw new Error("FACEBOOK_GRAPH_API_BASE_URL is not set in the environment variables");
//     }

//     const url = `${API_BASE_URL}/${adAccountId}/insights?fields=impressions,clicks,ctr&breakdowns=hourly_stats_aggregated_by_advertiser_time_zone&date_preset=${timeRange}`;

//     try {
//         const data = await fetchWithValidation(url, accessToken);

//         return data.data.map((entry: any) => ({
//             hour: entry.hourly_stats_aggregated_by_advertiser_time_zone.split(" ")[0],
//             impressions: parseInt(entry.impressions, 10),
//             clicks: parseInt(entry.clicks, 10),
//             ctr: parseFloat(entry.ctr),
//         }));
//     } catch (error) {
//         console.error("Error in fetchHourlyBreakdown:", error);
//         throw new Error("Failed to fetch hourly breakdown data.");
//     }
// };
