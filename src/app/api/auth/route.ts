import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Function to exchange code for access token
export const exchangeCodeForAccessToken = async (code: string) => {
  const appId = process.env.FACEBOOK_APP_ID;
  const appSecret = process.env.FACEBOOK_APP_SECRET;
  const redirectUri = process.env.FACEBOOK_REDIRECT_URI;

  const tokenUrl = `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${appId}&client_secret=${appSecret}&redirect_uri=${redirectUri}&code=${code}`;

  try {
    const response = await axios.get(tokenUrl);
    return response.data.access_token; // Return the access token
  } catch (error) {
    console.error('Error exchanging code for access token:', error);
    throw new Error('Failed to exchange code for access token.');
  }
};

// POST handler to process the incoming request
export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json(); // Extract code from the request body

    if (!code) {
      return NextResponse.json({ error: 'Authorization code is required' }, { status: 400 });
    }

    // Exchange the code for an access token
    const accessToken = await exchangeCodeForAccessToken(code);

    // Respond with the access token
    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Failed to exchange access token' }, { status: 500 });
  }
}
