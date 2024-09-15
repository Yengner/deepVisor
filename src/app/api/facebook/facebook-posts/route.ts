import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!accessToken) {
    return NextResponse.json({ error: 'Access token is required' }, { status: 401 });
  }

  try {
    const response = await axios.get(
      `https://graph.facebook.com/v20.0/PAGE_ID/posts`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          fields: 'id,message,created_time', 
        },
      }
    );

    return NextResponse.json({ posts: response.data.data });
  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
    return NextResponse.json({ error: 'Failed to fetch Facebook posts' }, { status: 500 });
  }
}
