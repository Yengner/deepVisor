// import { fetchWithValidation } from "@/lib/utils/common/apiUtils";
// import { CampaignMetric } from "../../types";

// export const fetchCampaignMetrics = async (
//     adAccountId: string,
//     accessToken: string
// ): Promise<{ top3ByLeads: CampaignMetric[] }> => {

//     const API_BASE_URL = process.env.FACEBOOK_GRAPH_API_BASE_URL;

//     if (!API_BASE_URL) {
//       throw new Error("FACEBOOK_GRAPH_API_BASE_URL is not set in the environment variables");
//     }

//     try {
//         // Fetch campaigns for the given ad account
//         const campaignsUrl = `${API_BASE_URL}/${adAccountId}/campaigns?fields=id,name,status,start_time,stop_time`;
//         const campaignsData = await fetchWithValidation(campaignsUrl, accessToken);
//         if (!campaignsData.data || campaignsData.data.length === 0) {
//             throw new Error("No campaigns found");
//         }

//         // Fetch metrics for each campaign in parallel
//         const campaignMetrics: CampaignMetric[] = await Promise.all(
//             campaignsData.data.map(async (campaign: any) => {
//                 try {
//                     const insightsUrl = `${API_BASE_URL}/${campaign.id}/insights?fields=impressions,clicks,spend,actions&date_preset=maximum`;
//                     const insightsData = await fetchWithValidation(insightsUrl, accessToken);

//                     const actions = insightsData.data?.[0]?.actions || [];
//                     const leads = actions.find((action: any) => action.action_type === "lead")?.value || 0;
//                     const messages = actions.find(
//                         (action: any) => action.action_type === "onsite_conversion.messaging_conversation_started_7d"
//                     )?.value || 0;

//                     return {
//                         id: campaign.id,
//                         name: campaign.name,
//                         status: campaign.status,
//                         start_time: campaign.start_time || null,
//                         stop_time: campaign.stop_time || null,
//                         impressions: insightsData.data?.[0]?.impressions || 0,
//                         clicks: insightsData.data?.[0]?.clicks || 0,
//                         spend: insightsData.data?.[0]?.spend || 0,
//                         leads: parseInt(leads, 10),
//                         messages: parseInt(messages, 10),
//                     };
//                 } catch (error) {
//                     console.warn(`Failed to fetch insights for campaign ${campaign.id}:`, error);
//                     return {
//                         id: campaign.id,
//                         name: campaign.name,
//                         status: campaign.status,
//                         start_time: campaign.start_time || null,
//                         stop_time: campaign.stop_time || null,
//                         impressions: 0,
//                         clicks: 0,
//                         spend: 0,
//                         leads: 0,
//                         messages: 0,
//                     };
//                 }
//             })
//         );

//         // Sort and get the top 3 campaigns by leads
//         const top3ByLeads = [...campaignMetrics].sort((a, b) => b.leads - a.leads).slice(0, 3);

//         return { top3ByLeads };
//     } catch (error) {
//         console.error("Error fetching campaign metrics:", error);
//         throw new Error("Failed to fetch campaign metrics.");
//     }
// };