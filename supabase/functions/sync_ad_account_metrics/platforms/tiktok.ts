export const fetchTikTokAggregatedMetrics = async () => {
    // Generate fake data
    const totalClicks = Math.floor(Math.random() * 1000); // Random value between 0-999
    const totalSpend = (Math.random() * 5000).toFixed(2); // Random spend between $0-$5000
    const totalLeads = Math.floor(Math.random() * 200); // Random value between 0-199
    const totalMessages = Math.floor(Math.random() * 300); // Random value between 0-299
    const totalLinkClicks = Math.floor(Math.random() * 700); // Random value between 0-699
    const totalImpressions = Math.floor(Math.random() * 10000); // Random value between 0-9999
    const totalVideoViews = Math.floor(Math.random() * 10000); // Random value between 0-9999
    const totalReach = Math.floor(Math.random() * 8000); // Random value between 0-7999
    const totalEngagements = Math.floor(Math.random() * 1200); // Random value between 0-1199
    const totalCtr = ((totalClicks / totalImpressions) * 100).toFixed(2); // Calculate CTR percentage
    const totalCpc = (totalSpend / totalClicks).toFixed(2); // Calculate CPC
    const totalCpm = ((totalSpend / totalImpressions) * 1000).toFixed(2); // Calculate CPM
  
    const date_start = "2023-12-01";
    const date_stop = "2023-12-31";
  
    // Return the data
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
      date_stop,
    };
  };
  