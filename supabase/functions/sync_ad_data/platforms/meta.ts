// Fetch Campaign Metrics for Meta
export async function fetchMetaCampaignMetrics(adAccount, ad_account_id, accessToken) {
    console.log(`Fetching Meta campaigns for ad account: ${ad_account_id}`);

    const url = `https://graph.facebook.com/v21.0/${ad_account_id}/campaigns?fields=name,status,objective,start_time,stop_time,insights.date_preset(maximum){clicks,impressions,spend,reach,actions,cpm,ctr,cpc}&access_token=${accessToken}`;
    const response = await fetch(url);
    
    if (!response.ok) {
        console.error("Failed to fetch Meta campaigns", await response.text());
        throw new Error(`Failed to fetch campaigns for ad account: ${ad_account_id}`);
    }

    const { data } = await response.json();
    return data.map(campaign => {
        const insights = campaign.insights?.data[0] || {}; // Access the first insights data if available
        const actions = insights.actions || [];
        console.log
        return {
            ad_account_id: ad_account_id,
            campaign_id: campaign.id,
            name: campaign.name,
            status: campaign.status,
            objective: campaign.objective,
            start_date: campaign.start_time,
            end_date: campaign.stop_time,
            clicks: parseInt(insights.clicks || 0, 10),
            impressions: parseInt(insights.impressions || 0, 10),
            spend: parseFloat(insights.spend || 0),
            reach: parseInt(insights.reach || 0, 10),
            cpm: parseFloat(insights.cpm || 0),
            ctr: parseFloat(insights.ctr || 0),
            cpc: parseFloat(insights.cpc || 0),
            leads: actions.find(action => action.action_type === "lead")?.value || 0,
            link_clicks: actions.find(action => action.action_type === "link_click")?.value || 0,
            messages: actions.find(action => action.action_type === "onsite_conversion.total_messaging_connection")?.value || 0,
            raw_data: campaign,
            updated_at: new Date().toISOString(),
        };
    });
}

// Fetch Ad Set Metrics for Meta
export async function fetchMetaAdSetMetrics(campaignId, accessToken) {
    console.log(`Fetching Meta ad sets for campaign: ${campaignId}`);
  
    const url = `https://graph.facebook.com/v21.0/${campaignId}/adsets?fields=name,status,optimization_goal,insights.date_preset(maximum){clicks,impressions,spend,reach,actions,cpm,ctr,cpc}&access_token=${accessToken}`;
    const response = await fetch(url);
  
    if (!response.ok) {
      console.error("Failed to fetch Meta ad sets", await response.text());
      throw new Error(`Failed to fetch ad sets for campaign: ${campaignId}`);
    }
  
    const { data } = await response.json();
    return data.map(adSet => {
        const insights = adSet.insights?.data[0] || {};
        const actions = insights.actions || [];
        return {
        campaign_id: campaignId,
        adset_id: adSet.id,
        name: adSet.name,
        status: adSet.status,
        start_date: insights.date_start,
        end_date: insights.date_stop,
        optimization_goal: adSet.optimization_goal,
        clicks: parseInt(insights.clicks || 0, 10),
        impressions: parseInt(insights.impressions || 0, 10),
        spend: parseFloat(insights.spend || 0),
        reach: parseInt(insights.reach || 0, 10),
        cpm: parseFloat(insights.cpm || 0),
        ctr: parseFloat(insights.ctr || 0),
        cpc: parseFloat(insights.cpc || 0),
        leads: actions.find(action => action.action_type === "lead")?.value || 0,
        link_clicks: actions.find(action => action.action_type === "link_click")?.value || 0,
        messages: actions.find(action => action.action_type === "onsite_conversion.total_messaging_connection")?.value || 0,
        raw_data: adSet, // For additional details
        };
    });
    }

// Fetch Ad Metrics for Meta
export async function fetchMetaAdMetrics(adSetId, accessToken) {
    console.log(`Fetching Meta ads for ad set: ${adSetId}`);

    const url = `https://graph.facebook.com/v21.0/${adSetId}/ads?fields=id,name,status,creative,insights.date_preset(maximum){clicks,impressions,spend,reach,actions,cpm,ctr,cpc,date_stop,date_start}&access_token=${accessToken}`;
    const response = await fetch(url);

    if (!response.ok) {
        console.error("Failed to fetch Meta ads", await response.text());
        throw new Error(`Failed to fetch ads for ad set: ${adSetId}`);
    }

    const { data } = await response.json();

    return data.map(ad => {
        const insights = ad.insights?.data[0] || {};
        const actions = insights.actions || [];

        return {
        adset_id: adSetId,
        ad_id: ad.id,
        name: ad.name,
        status: ad.status,
        start_date: insights.date_start,
        end_date: insights.date_stop,
        creative_id: ad.creative.id,
        clicks: parseInt(insights.clicks || 0, 10),
        impressions: parseInt(insights.impressions || 0, 10),
        spend: parseFloat(insights.spend || 0),
        reach: parseInt(insights.reach || 0, 10),
        cpm: parseFloat(insights.cpm || 0),
        ctr: parseFloat(insights.ctr || 0),
        cpc: parseFloat(insights.cpc || 0),
        leads: actions.find(action => action.action_type === "lead")?.value || 0,
        link_clicks: actions.find(action => action.action_type === "link_click")?.value || 0,
        messages: actions.find(action => action.action_type === "onsite_conversion.total_messaging_connection")?.value || 0,
        raw_data: ad, // For additional details
        };
    });
    }
