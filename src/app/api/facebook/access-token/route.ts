import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { createSupabaseClient } from '@/lib/utils/supabase/clients/server';
import { getLoggedInUser } from '@/lib/actions/user.actions';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Authorization code is required.' }, { status: 400 });
    }

    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const appSecret = process.env.FACEBOOK_APP_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI;

    // Validate environment variables
    if (!appId || !appSecret || !redirectUri) {
      throw new Error('Environment variables for Facebook OAuth are not properly set.');
    }

    // Exchange code for access token
    const tokenUrl = `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${appId}&redirect_uri=${redirectUri}&client_secret=${appSecret}&code=${code}`;
    const response = await axios.get(tokenUrl);
    const { access_token } = response.data;

    console.log('Access Token Retrieved:', access_token);

    // Insert the access token into the database
    const supabase = createSupabaseClient();
    const loggedInUser = await getLoggedInUser(); 
    const userId = loggedInUser?.id

    if (!userId) {
      throw new Error('User is not authenticated.');
    }

    const { error: insertError } = await supabase
      .from('access_tokens')
      .upsert({
        user_id: userId,
        facebook_access_token: access_token,
        updated_at: new Date(),
      }, { onConflict: 'user_id' });

    if (insertError) {
      throw new Error(`Failed to insert access token into database: ${insertError.message}`);
    }

    return NextResponse.json({ success: true, accessToken: access_token });
    //eslint-disable-next-line
  } catch (error:any) {
    console.error('Error exchanging code for access token:', error);
    const message =
      error.response?.data?.error?.message ||
      error.message ||
      'Failed to exchange code for access token.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
