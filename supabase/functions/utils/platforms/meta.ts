const fetchWithValidation = async (
    url: string,
    accessToken: string,
    options: RequestInit = {}
  ): Promise<any> => {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
        });
  
        if (!response.ok) {
            // Attempt to parse error details
            const errorDetails = await response.json().catch(() => ({}));
            throw new Error(
                errorDetails.error?.message ||
                `Request failed with status ${response.status}`
            );
        }
  
        return await response.json();
    } catch (error) {
        console.error(`FetchWithAuth Error: Failed to fetch from ${url}`, error);
        throw error;
    }
  };
  
  export const fetchMetaAggregatedMetrics = async (
  adAccountId: string,
  accessToken: string
  ): Promise<Record<string, any>> => {
  const API_BASE_URL = 'https://graph.facebook.com/v21.0';
  
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
      let totalSpend = 0;
      let totalCtr = 0;
      let totalCpc = 0;
      let totalCpm = 0;
  
      // Categorized metrics
      let totalLeads = 0;
      let totalMessages = 0;
      let totalEngagements = 0;
      let totalLinkClicks = 0;
      let totalVideoViews = 0;
  
      data.forEach((entry: any) => {
        totalClicks += parseInt(entry.clicks || 0, 10);
        totalImpressions += parseInt(entry.impressions || 0, 10);
        totalSpend += parseFloat(entry.spend || 0);
        totalCtr += parseFloat(entry.ctr || 0);
        totalCpc += parseFloat(entry.cpc || 0);
        totalCpm += parseFloat(entry.cpm || 0);
  
        // Process action types
        entry.actions?.forEach((action: any) => {
          const actionValue = parseInt(action.value || 0, 10);
  
          switch (action.action_type) {
            case "onsite_conversion.lead_grouped":
              totalLeads += actionValue;
              break;
  
            case "onsite_conversion.total_messaging_connection":
              totalMessages += actionValue;
              break;
  
            case "post_engagement":
            case "post_reaction":
            case "comment":
            case "like":
            case "page_engagement":
            case "post":
              totalEngagements += actionValue;
              break;
  
            case "link_click":
              totalLinkClicks += actionValue;
              break;
  
            case "video_view":
              totalVideoViews += actionValue;
              break;
  
            default:
              // Add additional cases here for other action types if needed
              break;
          }
        });
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
        spend: totalSpend,
        ctr: totalCtr,
        cpc: totalCpc,
        cpm: totalCpm,
        leads: totalLeads,
        messages: totalMessages,
        engagements: totalEngagements,
        link_clicks: totalLinkClicks,
        video_views: totalVideoViews,
      };
    } catch (error) {
      console.error("Error fetching aggregated metrics:", error);
      throw new Error("Failed to fetch aggregated metrics.");
    }
  };