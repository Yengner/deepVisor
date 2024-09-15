import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code is required.' });
  }

  try {
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const appSecret = process.env.FACEBOOK_APP_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI;

    const tokenUrl = `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${appId}&redirect_uri=${redirectUri}&client_secret=${appSecret}&code=${code}`;

    // Exchange code for access token
    const response = await axios.get(tokenUrl);
    const { access_token } = response.data;

    // Return the access token to the client
    return res.status(200).json({ accessToken: access_token });
  } catch (error) {
    console.error('Error exchanging code for access token:', error);
    return res.status(500).json({ error: 'Failed to exchange code for access token.' });
  }
}
