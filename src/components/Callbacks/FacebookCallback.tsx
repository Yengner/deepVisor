'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/utils/supabase/clients/browser';
import { handleFacebookIntegration } from '@/lib/integrations/facebook/facebook.actions'; // Server-side function
import { fetchAccessToken } from '@/lib/integrations/facebook/facebook.api';

const supabase = createBrowserClient();  // Initialize browser client

const FacebookIntegrationCallback = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // New function to check if the user has already integrated Facebook
  const checkFacebookIntegration = async (userId: string) => {
    const { data, error } = await supabase
      .from('access_token') // Change this to your table where Facebook integration data is stored
      .select('facebook_access_token')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return false; // No integration found, return false
    }

    return true; // Facebook is already integrated, return true
  };

  const refreshUserSession = async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData?.session) {
      throw new Error('Failed to refresh session');
    }
    return sessionData.session;
  };


  useEffect(() => {
    const handleIntegration = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
    
      try {
        // refreshing the session
        await refreshUserSession();

        // Get authenticated user
        const { data: user, error: userError } = await supabase.auth.getUser();
        if (userError || !user?.user) {
          throw new Error('Failed to retrieve authenticated user');
        }

        const userId = user.user.id;

        // Check if the user already has Facebook integrated
        const isIntegrated = await checkFacebookIntegration(userId);
        if (isIntegrated) {
          // Redirect to dashboard if already integrated
          setLoading(false);
          router.push('/');
          return;
        }

        // Proceed with Facebook integration if not integrated
        if (!code) {
          setError('Failed to retrieve the authorization code.');
          setLoading(false);
          return;
        }

        const accessToken = await fetchAccessToken(code);
        console.log('User ID:', userId);
        console.log('Access Token:', accessToken);
        
        // Integrate Facebook account
        await handleFacebookIntegration(userId, accessToken!);

        // Redirect to dashboard after successful integration
        setLoading(false);
        router.push('/');
      } catch (error) {
        console.error('Error during Facebook integration:', error);
        setError('Failed to integrate Facebook');
        setLoading(false);
      }
    };

    handleIntegration();
  }, [router]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default FacebookIntegrationCallback;