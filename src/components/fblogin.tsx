// components/FacebookLogin.tsx

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const FacebookLogin = () => {
  const [accessToken, setAccessToken] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      // If there's a code, exchange it for an access token
      const exchangeCodeForAccessToken = async () => {
        try {
          const response = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
          });
          const data = await response.json();
          if (response.ok) {
            setAccessToken(data.accessToken);
          } else {
            setError(data.error);
          }
        } catch (err) {
          setError('Error exchanging code for access token.');
        }
      };

      exchangeCodeForAccessToken();
    }
  }, [searchParams]);

  const handleLogin = () => {
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const redirectUri = process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI;
    const configId = process.env.NEXT_PUBLIC_FACEBOOK_CONFIG_ID; // Your Facebook Business Login configuration ID
    console.log('Config ID:', configId); // Log the config ID for debugging
    console.log('App ID:', appId); // Log the app ID for debugging
    console.log('Redirect URI:', redirectUri); // Log the redirect URI for debugging
    // Construct the login URL with config_id instead of scope
    const loginUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&config_id=${configId}&response_type=code&override_default_response_type=true`;

    // Redirect to Facebook OAuth login
    window.open(loginUrl, '_blank');
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Facebook</button>
      {accessToken && <p>Access Token: {accessToken}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FacebookLogin;
