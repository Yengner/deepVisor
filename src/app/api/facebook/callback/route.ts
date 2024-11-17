import { NextRequest, NextResponse } from 'next/server';
import { insertFbUserDataIntoSupabase } from '@/lib/actions/facebook/facebook.actions';
import { fetchAdAccountsAndAccountInfo } from '@/lib/integrations/facebook/facebook.utils';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { createSupabaseClient } from '@/lib/utils/supabase/clients/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Authorization code is missing.' }, { status: 400 });
    }

    // const accessToken = await fetchAccessToken(code);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/facebook/access-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error fetching access token.');
    }

    const data: { accessToken: string } = await response.json(); 
    const accessToken = data.accessToken;

    const { adAccounts, accountsInfo } = await fetchAdAccountsAndAccountInfo(accessToken);

    const user = await getLoggedInUser();
    const userId = user?.id;

    if (!userId) {
      throw new Error('User not authenticated.');
    }

    // Save data to Supabase or another database
    await insertFbUserDataIntoSupabase(userId, accessToken, adAccounts, accountsInfo);

    const supabase = createSupabaseClient();
    const { error: integrationError } = await supabase
      .from('social_media_integrations')
      .upsert(
        {
          user_id: userId,
          platform: 'facebook',
          is_integrated: true,
          updated_at: new Date(),
        },
        { onConflict: 'user_id, platform' }
      );

    if (integrationError) {
      throw new Error(`Failed to update integration status: ${integrationError.message}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling callback:', error);
    return NextResponse.json({ error: 'Failed to handle callback.' }, { status: 500 });
  }
}
