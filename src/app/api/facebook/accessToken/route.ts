import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// This is how you define the handler for POST requests
export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required.' }, { status: 400 });
    }
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const appSecret = process.env.FACEBOOK_APP_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI;

    const tokenUrl = `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${appId}&redirect_uri=${redirectUri}&client_secret=${appSecret}&code=${code}`;
    
    // Exchange code for access token
    const response = await axios.get(tokenUrl);
    const { access_token } = response.data;

    return NextResponse.json({ accessToken: access_token });
  } catch (error) {
    console.error('Error exchanging code for access token:', error);
    return NextResponse.json({ error: 'Failed to exchange code for access token.' }, { status: 500 });
  }
}