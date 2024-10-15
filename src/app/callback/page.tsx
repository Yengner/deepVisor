'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/utils/supabase/clients/browser';
import FacebookIntegrationCallback from '@/components/Callbacks/FacebookCallback'; // Your existing component
import { Session } from '@supabase/supabase-js'; // Import the correct session type

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const supabase = createBrowserClient();  // Initialize browser client

  // New function to refresh session and check authentication
  const refreshUserSession = async () => {
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData?.session) {
        throw new Error('Failed to refresh session');
      }
      return sessionData.session;
    } catch (error) {
      console.error('Error refreshing session:', error);
      return null;
    }
  };

  useEffect(() => {
    const checkSessionAndProceed = async () => {
      try {
        // 1. Refresh session before rendering the component
        const session = await refreshUserSession();
        if (!session) {
          // If no session, redirect to login
          router.push('/login');
          return;
        }

        // 2. Set session state for use in the page/component
        setSession(session);

        // 3. If session exists, allow the Facebook integration process to begin
        setLoading(false);
      } catch (error) {
        console.error('Error checking session:', error);
        router.push('/login');  // Redirect to login in case of any issues
      }
    };

    checkSessionAndProceed();
  }, [router]);

  // If loading or session not available yet, show a loader
  if (loading) {
    return <div>Loading...</div>;
  }

  // Once session is validated, render the Facebook integration component
  return <FacebookIntegrationCallback session={session} />;
};

export default Page;
