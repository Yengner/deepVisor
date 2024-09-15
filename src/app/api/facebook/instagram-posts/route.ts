import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!accessToken) {
    return NextResponse.json({ error: 'Access token is required' }, { status: 401 });
  }

  try {
    const response = await axios.get(
      'https://graph.instagram.com/me/media',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          fields: 'id,caption,media_type,media_url,permalink,timestamp',
        },
      }
    );

    return NextResponse.json({ posts: response.data.data });
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return NextResponse.json({ error: 'Failed to fetch Instagram posts' }, { status: 500 });
  }
}
