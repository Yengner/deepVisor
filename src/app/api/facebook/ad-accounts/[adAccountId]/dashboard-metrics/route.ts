import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: { adAccountId: string } }) {
  const { adAccountId } = await context.params;

  if (!adAccountId) {
    return NextResponse.json({ error: 'Ad Account ID is required' }, { status: 400 });
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Access token is missing or invalid' }, { status: 401 });
  }

  const accessToken = authHeader.split(' ')[1];

  try {
    // Call Facebook API
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${adAccountId}/insights?date_preset=maximum&fields=impressions,clicks,spend,actions,reach,ctr,cpc,cpm`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching insights from Facebook API: ${response.statusText}`);
    }

    const data = await response.json();

    // Process data
    const processedData = data.data.map((entry: any) => {
      const leads = entry.actions?.find((action: any) => action.action_type === 'lead')?.value || 0;
      const linkClicks = entry.actions?.find((action: any) => action.action_type === 'link_click')?.value || 0;
      const postEngagement = entry.actions?.find((action: any) => action.action_type === 'post_engagement')?.value || 0;
      const messagingConversationsStarted = entry.actions?.find(
        (action: any) => action.action_type === 'onsite_conversion.total_messaging_connection'
      )?.value || 0;

      return {
        impressions: parseInt(entry.impressions, 10),
        clicks: parseInt(entry.clicks, 10),
        spend: parseFloat(entry.spend).toFixed(2),
        reach: parseInt(entry.reach, 10),
        ctr: parseFloat(entry.ctr).toFixed(2),
        cpc: parseFloat(entry.cpc).toFixed(2),
        cpm: parseFloat(entry.cpm).toFixed(2),
        leads: parseInt(leads, 10),
        linkClicks: parseInt(linkClicks, 10),
        postEngagement: parseInt(postEngagement, 10),
        messagingConversationsStarted: parseInt(messagingConversationsStarted, 10),
        dateStart: entry.date_start,
        dateStop: entry.date_stop,
      };
    });

    return NextResponse.json(processedData[0]); // Return the first entry as a summary for the total insights
  } catch (error: any) {
    console.error('Error fetching and processing insights:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
