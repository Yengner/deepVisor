import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { createSupabaseClient } from '@/lib/utils/supabase/clients/server';

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

    const supabase = createSupabaseClient();
    const loggedInUser = await supabase.auth.getUser(); // Replace with your user fetching logic
    const userId = loggedInUser?.data?.user?.id;

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

    return NextResponse.json({ accessToken: access_token });
  } catch (error) {
    console.error('Error exchanging code for access token:', error);
    return NextResponse.json({ error: 'Failed to exchange code for access token.' }, { status: 500 });
  }
}