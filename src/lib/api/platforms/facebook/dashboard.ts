import { AccountInfo } from "../../types";

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
// export const fetchInsights = async (
//   platform: string,
//   adAccountId: string,
//   accessToken: string
// ) => {
//   const response = await fetch(
//     `/api/${platform}/ad-accounts/${adAccountId}/insights`,
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   );

//   if (!response.ok) throw new Error('Error fetching insights');
//   return response.json();
// };

const fetchWithValidation = async (url: string, accessToken: string): Promise<any> => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
  }

  return response.json();
};


// Main function
export const fetchAccountInfo = async (
  platform: string,
  adAccountId: string,
  accessToken: string
): Promise<AccountInfo> => {
  const today = new Date().toISOString().split('T')[0];

  // URLs for API calls
  const urls = {
    balance: `https://graph.facebook.com/v21.0/${adAccountId}?fields=balance`,
    spend: `https://graph.facebook.com/v21.0/${adAccountId}/insights?fields=spend&time_range[since]=${today}&time_range[until]=${today}`,
    insights: `https://graph.facebook.com/v21.0/${adAccountId}/insights?fields=clicks,spend,actions&date_preset=maximum`,
    accountDetails: `https://graph.facebook.com/v21.0/${adAccountId}?fields=name,currency,spend_cap,amount_spent,account_status`,
    campaigns: `https://graph.facebook.com/v21.0/${adAccountId}/campaigns?fields=id`,
  };

  // Fetch all data in parallel
  const [balanceData, spendData, insightsData, accountDetailsData, campaignsData] = await Promise.all(
    Object.values(urls).map((url) => fetchWithValidation(url, accessToken))
  );

  // Validate and process data
  const processedInsights = insightsData.data?.map((entry: any) => {
    const linkClicks = entry.actions?.find((action: any) => action.action_type === 'link_click')?.value || 0;
    const postEngagement = entry.actions?.find((action: any) => action.action_type === 'post_engagement')?.value || 0;

    return {
      clicks: parseInt(entry.clicks || 0, 10),
      linkClicks: parseInt(linkClicks || 0, 10),
      postEngagement: parseInt(postEngagement || 0, 10),
    };
  }) ?? [];

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
};
export const fetchTopCampaigns = async (
  platform: string,
  adAccountId: string,
  accessToken: string
) => {
  try {
    const response = await fetch(
      `/api/${platform}/ad-accounts/${adAccountId}/top-campaigns`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      // Parse the error details returned by the server
      const errorDetails = await response.json();
      throw new Error(
        errorDetails.error
          ? `${errorDetails.error} (Status: ${response.status})`
          : `Error fetching top campaigns (Status: ${response.status})`
      );
    }

    return response.json();
  } catch (error: any) {
    console.error('fetchTopCampaigns Error:', error.message);
    throw error; // Pass the error to the caller for further handling
  }
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

    const leads = entry.actions?.find(
      (action: any) => action.action_type === 'lead'
    )?.value || 0;

    return {
      date: entry.date_start,
      cost: parseFloat(entry.spend || 0),
      impressions: parseInt(entry.impressions || 0, 10),
      clicks: parseInt(entry.clicks || 0, 10),
      leads: parseInt(leads, 10),
      messagingConversationsStarted: parseInt(messagingConversationsStarted, 10),
      reach: parseInt(entry.reach || 0, 10),
      ctr: parseFloat(entry.ctr || 0),
      cpc: parseFloat(entry.cpc || 0),
    };
  });

  return {
    cost: trendData.reduce((sum: number, item: any) => sum + item.cost, 0),
    impressions: trendData.reduce((sum: number, item: any) => sum + item.impressions, 0),
    clicks: trendData.reduce((sum: number, item: any) => sum + item.clicks, 0),
    leads: trendData.reduce((sum: number, item: any) => sum + item.leads, 0),
    messagingConversationsStarted: trendData.reduce(
      (sum: number, item: any) => sum + item.messagingConversationsStarted,
      0
    ),
    reach: trendData.reduce((sum: number, item: any) => sum + item.reach, 0),
    ctr: trendData.reduce((sum: number, item: any) => sum + item.ctr, 0) / trendData.length || 0,
    cpc: trendData.reduce((sum: number, item: any) => sum + item.cpc, 0) / trendData.length || 0,
    trendData,
  };
};

export const fetchAgeGenderCountryMetrics = async (
  adAccountId: string,
  accessToken: string
) => {

  const ageGenderUrl = `https://graph.facebook.com/v21.0/${adAccountId}/insights?breakdowns=age,gender&date_preset=maximum`
  const countryUrl = `https://graph.facebook.com/v21.0/${adAccountId}/insights?breakdowns=country&date_preset=maximum`

  const [ageGenderResponse, countryResponse] = await Promise.all([
    fetch(ageGenderUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }),
    fetch(countryUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }),
  ]);

  // Validate responses
  if (!ageGenderResponse.ok) {
    throw new Error('Failed to fetch age and gender metrics');
  }
  if (!countryResponse.ok) {
    throw new Error('Failed to fetch country metrics');
  }

  const ageGenderDatas = await ageGenderResponse.json();
  const countryDatas = await countryResponse.json();

  // Validate API data structure
  if (!ageGenderDatas.data || !Array.isArray(ageGenderDatas.data)) {
    throw new Error('Invalid age and gender data format');
  }
  if (!countryDatas.data || !Array.isArray(countryDatas.data)) {
    throw new Error('Invalid country data format');
  }

  // Transform age and gender data
  const ageGenderData = ageGenderDatas.data.map((entry: any) => ({
    age: entry.age || 'unknown',
    gender: entry.gender || 'unknown',
    impressions: parseInt(entry.impressions || '0', 10),
  }));

  // Transform country data
  const countryData = countryDatas.data.map((entry: any) => ({
    date_start: entry.date_start,
    date_stop: entry.date_stop,
    spend: entry.spend || '0',
    country: entry.country || 'unknown',
    impressions: parseInt(entry.impressions || '0', 10), // Use 'reach' or 'impressions' based on your needs
  }));

  return { ageGenderData, countryData };
  // countryData,

};

