import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/utils/supabase/clients/server';
import { getLoggedInUser } from '@/lib/actions/user.actions';

export async function GET() {
    try {
      const supabase = createSupabaseClient();
      const loggedInUser = await getLoggedInUser();
      const userId = loggedInUser.id;
  
      if (!userId) {
        return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
      }
  
      // Check the integration status
      const { data, error } = await supabase
        .from('social_media_integrations')
        .select('is_integrated')
        .eq('user_id', userId)
        .eq('platform', 'facebook')
        .single();
  
      if (error && error.code !== 'PGRST116') {
        throw new Error(`Failed to fetch integration status: ${error.message}`);
      }
  
      return NextResponse.json({ isIntegrated: data?.is_integrated || false, platform: 'facebook' });
    } catch (error) {
      console.error('Error checking integration status:', error);
      return NextResponse.json({ error: 'Failed to check integration status.' }, { status: 500 });
    }
  }