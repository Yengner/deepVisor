// export const fetchFacebookInsights = async (
//   adAccountId: string,
//   accessToken: string
// ) => {

//   const API_BASE_URL = process.env.FACEBOOK_GRAPH_API_BASE_URL;

//   if (!API_BASE_URL) {
//     throw new Error("FACEBOOK_GRAPH_API_BASE_URL is not set in the environment variables");
//   }

//   const url = `${API_BASE_URL}/${adAccountId}/insights?date_preset=maximum&fields=impressions,clicks,spend,actions,reach,ctr,cpc,cpm`;

//   const response = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     const errorDetails = await response.json().catch(() => ({}));
//     throw new Error(
//       errorDetails.error?.message || `Error fetching insights: ${response.statusText}`
//     );
//   }

//   const data = await response.json();
//   return data;
// };

// export const processFacebookInsights = (data: any) => {
//   return data.data.map((entry: any) => {
//     const leads = entry.actions?.find((action: any) => action.action_type === 'lead')?.value || 0;
//     const linkClicks = entry.actions?.find((action: any) => action.action_type === 'link_click')?.value || 0;
//     const postEngagement = entry.actions?.find((action: any) => action.action_type === 'post_engagement')?.value || 0;
//     const messagingConversationsStarted = entry.actions?.find(
//       (action: any) => action.action_type === 'onsite_conversion.total_messaging_connection'
//     )?.value || 0;

//     return {
//       impressions: parseInt(entry.impressions, 10),
//       clicks: parseInt(entry.clicks, 10),
//       spend: parseFloat(entry.spend).toFixed(2),
//       reach: parseInt(entry.reach, 10),
//       ctr: parseFloat(entry.ctr).toFixed(2),
//       cpc: parseFloat(entry.cpc).toFixed(2),
//       cpm: parseFloat(entry.cpm).toFixed(2),
//       leads: parseInt(leads, 10),
//       linkClicks: parseInt(linkClicks, 10),
//       postEngagement: parseInt(postEngagement, 10),
//       messagingConversationsStarted: parseInt(messagingConversationsStarted, 10),
//       dateStart: entry.date_start,
//       dateStop: entry.date_stop,
//     };
//   });
// };
