'use client';

import { getLoggedInUser } from '@/lib/actions/user.actions';
import { handleFacebookIntegration } from '@/lib/integrations/facebook/facebook.actions';
import { fetchAccessToken } from '@/lib/integrations/facebook/facebook.api';
import { useEffect, useState } from 'react';

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const code = new URLSearchParams(window.location.search).get('code');

      try {
        const user = await getLoggedInUser();
        const userId = user.id

        if (!code) {
          setError('Failed to retrieve the authorization code.');
          setLoading(false);
          return;
        }

        const accessToken = await fetchAccessToken(code)
        console.log('Access token:', accessToken);
        console.log('User ID:', userId);
        await handleFacebookIntegration(userId, accessToken);
        console.log('Facebook integration successful');

        setLoading(false);
      } catch (error) {
        console.error("Error fetching Facebook integration data:", error);
        setError('An error occurred while fetching Facebook integration data.');
      }
    };

    fetchUserInfo();
  }, []); // Empty array ensures this runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error ? <p>{error}</p> : <p>Integration successful, redirecting...</p>}
    </div>
  );
};

export default Page;
