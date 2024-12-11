import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: { adAccountId: string } }) {
  const { adAccountId } = await context.params;

  const url = new URL(req.url);
  const timeRange = url.searchParams.get('time_range') || 'maximum'; // e.g., 'lifetime', 'daily', etc.
  const timeIncrement = url.searchParams.get('time_increment') || 'all_days'; // e.g., '1' (daily), '7' (weekly), etc.
  const accessToken = req.headers.get('Authorization')?.split(' ')[1];

  if (!accessToken) {
    return NextResponse.json({ error: 'Access token is required' }, { status: 401 });
  }

  try {
    const fbResponse = await fetch(
      `https://graph.facebook.com/v21.0/${adAccountId}/insights?fields=impressions,clicks,spend,reach,actions,ctr,cpc,cpm,date_start,date_stop&date_preset=${timeRange}&time_increment=${timeIncrement}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!fbResponse.ok) {
      const fbError = await fbResponse.json();
      return NextResponse.json({ error: fbError.error.message }, { status: fbResponse.status });
    }

    const fbData = await fbResponse.json();

    const processedData = fbData.data.map((entry: any) => {
      const messagingStarted = entry.actions?.find(
        (action: any) => action.action_type === 'onsite_conversion.messaging_conversation_started_7d'
      )?.value || 0;

      return {
        date: entry.date_start,
        impressions: parseInt(entry.impressions, 10),
        clicks: parseInt(entry.clicks, 10),
        spend: parseFloat(entry.spend).toFixed(2),
        reach: parseInt(entry.reach, 10),
        ctr: parseFloat(entry.ctr).toFixed(2),
        cpc: parseFloat(entry.cpc).toFixed(2),
        cpm: parseFloat(entry.cpm).toFixed(2),
        conversions: entry.actions?.find((action: any) => action.action_type === 'lead')?.value || 0,
        messagingStarted: parseInt(messagingStarted, 10),
      };
    });

    return NextResponse.json(processedData);
  } catch (error: any) {
    console.error('Error fetching insights:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
