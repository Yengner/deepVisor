
// Getting the Total Ad Account Insights | maximum time range | for dashboard
export const fetchTotalAdAccountInsights = async (
    platform: string,
    adAccountId: string,
    accessToken: string
) => {
    const response = await fetch(`/api/${platform}/ad-accounts/${adAccountId}/dashboard-metrics`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) throw new Error('Error fetching dashboard metrics');
    
    const data = await response.json();
    return data;
};

//seperator
export const fetchInsights = async (
    platform: string,
    adAccountId: string,
    timeRange: string,
    accessToken: string
) => {
    const response = await fetch(
        `/api/${platform}/ad-accounts/${adAccountId}/insights`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    );

    if (!response.ok) throw new Error('Error fetching insights');
    return response.json();
};

export const fetchTopCampaigns = async (
    platform: string,
    adAccountId: string,
    metric: string,
    accessToken: string
) => {
    const response = await fetch(
        `/api/${platform}/ad-accounts/${adAccountId}/top-campaigns?metric=${metric}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    );

    if (!response.ok) throw new Error('Error fetching top campaigns');
    return response.json();
};

export const fetchPerformanceMetrics = async (
    adAccountId: string,
    accessToken: string
  ) => {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${adAccountId}/insights?fields=impressions,clicks,spend,actions,reach,ctr,cpc,cpm&date_preset=maximum&time_increment=monthly`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch performance metrics');
    }
  
    const data = await response.json();
  
    // Process the `trendData`
    const trendData = data.data.map((entry: any) => {
      const messagingConversationsStarted = entry.actions?.find(
        (action: any) => action.action_type === 'onsite_conversion.messaging_conversation_started_7d'
      )?.value || 0;
  
      return {
        date: entry.date_start,
        cost: parseFloat(entry.spend || 0),
        impressions: parseInt(entry.impressions || 0, 10),
        clicks: parseInt(entry.clicks || 0, 10),
        conversions: parseInt(
          entry.actions?.find((a: any) => a.action_type === 'lead')?.value || 0,
          10
        ),
        messagingConversationsStarted: parseInt(messagingConversationsStarted, 10),
      };
    });
  
    return {
      cost: trendData.reduce((sum: number, item: any) => sum + item.cost, 0),
      impressions: trendData.reduce(
        (sum: number, item: any) => sum + item.impressions,
        0
      ),
      clicks: trendData.reduce((sum: number, item: any) => sum + item.clicks, 0),
      conversions: trendData.reduce(
        (sum: number, item: any) => sum + item.conversions,
        0
      ),
      messagingConversationsStarted: trendData.reduce(
        (sum: number, item: any) => sum + item.messagingConversationsStarted,
        0
      ),
      trendData,
    };
  };
  