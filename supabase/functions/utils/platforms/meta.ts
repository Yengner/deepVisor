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
  const url = `${API_BASE_URL}/${adAccountId}/insights?fields=clicks,impressions,reach,actions,ctr,cpc,cpm,spend&date_preset=maximum`;

  try {
    // Fetch insights data
    const insightsData = await fetchWithValidation(url, accessToken);

    const data = insightsData.data || [];

    let totalClicks = 0,
      totalImpressions = 0,
      totalSpend = 0,
      totalReach = 0,
      totalVideoViews = 0;

    let totalCtr = 0,
      totalCpc = 0,
      totalCpm = 0;

    let date_start = '',
      date_stop = '';

    // Key engagement metrics
    let totalLeads = 0,
      totalMessages = 0,
      totalLinkClicks = 0,
      totalEngagements = 0;

    data.forEach((entry: any) => {
      totalClicks += parseInt(entry.clicks || 0, 10);
      totalImpressions += parseInt(entry.impressions || 0, 10);
      totalSpend += parseFloat(entry.spend || 0);
      totalReach += parseInt(entry.reach || 0, 10);


      totalCtr += parseFloat(entry.ctr || 0);
      totalCpc += parseFloat(entry.cpc || 0);
      totalCpm += parseFloat(entry.cpm || 0);

      date_start += entry.date_start;
      date_stop += entry.date_stop;

      // Process action types
      entry.actions?.forEach((action: any) => {
        const actionValue = parseInt(action.value || 0, 10);
        switch (action.action_type) {
          case 'onsite_conversion.lead_grouped':
            totalLeads += actionValue;
            break;
          case 'onsite_conversion.total_messaging_connection':
            totalMessages += actionValue;
            break;
          case 'link_click':
            totalLinkClicks += actionValue;
            break;
          case 'post_engagement':
            totalEngagements += actionValue;
            break;
          case'video_view':
            totalVideoViews += actionValue;
            break;
          default:
            break;
        }
      });
    });


    return {
      clicks: totalClicks,
      spend: totalSpend,
      leads: totalLeads,
      messages: totalMessages,
      link_clicks: totalLinkClicks,
      impressions: totalImpressions,
      video_views: totalVideoViews,
      reach: totalReach,
      engagements: totalEngagements,
      ctr: totalCtr,
      cpc: totalCpc,
      cpm: totalCpm,
      date_start,
      date_stop
    };
  } catch (error) {
    console.error('Error fetching aggregated metrics:', error);
    throw new Error('Failed to fetch aggregated metrics.');
  }
};