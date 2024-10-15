import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/utils/supabase/clients/browser';
import { handleFacebookIntegration } from '@/lib/integrations/facebook/facebook.actions'; // Server-side function
import { fetchAccessToken } from '@/lib/integrations/facebook/facebook.api';
import { Session } from '@supabase/supabase-js';  // Import Session type from Supabase

const supabase = createBrowserClient();  // Initialize browser client

interface FacebookIntegrationCallbackProps {
  session: Session | null;  // Define the session type or allow null
}

const FacebookIntegrationCallback: React.FC<FacebookIntegrationCallbackProps> = ({ session }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleIntegration = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
    
      try {
        // Get authenticated user from session passed down from the page
        const userId = session?.user?.id;
        if (!userId) {
          throw new Error('Failed to retrieve authenticated user');
        }

        // Proceed with Facebook integration
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
