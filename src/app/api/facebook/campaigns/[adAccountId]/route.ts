import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: { adAccountId: string } }) {
  const { adAccountId } = await context.params;

  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Access token is missing or invalid' }, { status: 401 });
  }

  const accessToken = authHeader.split(' ')[1];

  if (!adAccountId) {
    return NextResponse.json({ error: 'Ad Account ID is required' }, { status: 400 });
  }

  try {
    const campaignsResponse = await fetch(
      `https://graph.facebook.com/v21.0/${adAccountId}/campaigns?fields=id,name,status,start_time,stop_time&access_token=${accessToken}`
    );
    const campaignsData = await campaignsResponse.json();

    if (!campaignsData.data) {
      return NextResponse.json({ error: 'No campaigns found' }, { status: 404 });
    }
    
    return NextResponse.json(campaignsData.data); // Return the campaigns array
  } catch (error: any) {
    console.error('Error fetching campaigns:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}