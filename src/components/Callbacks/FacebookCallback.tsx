import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleFacebookIntegration } from '@/lib/integrations/facebook/facebook.actions'; // Server-side function
import { fetchAccessToken } from '@/lib/integrations/facebook/facebook.api';
import { Session } from '@supabase/supabase-js';  // Import Session type from Supabase


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
        // Check if session is available before proceeding
        if (!session) {
          throw new Error('User session is not available.');
        }

        const userId = session.user?.id;
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
        await handleFacebookIntegration(userId, accessToken);

        // Redirect to dashboard after successful integration
        setLoading(false);
        router.push('/');
      } catch (error) {
        console.error('Error during Facebook integration:', error);
        setError('Failed to integrate Facebook');
        setLoading(false);
      }
    };

    if (session) {
      handleIntegration(); // Only run if session is available
    }
  }, [router, session]); // Add session to dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error ? <p>{error}</p> : <p>Integration successful, redirecting...</p>}
    </div>
  );
};

export default FacebookIntegrationCallback;
