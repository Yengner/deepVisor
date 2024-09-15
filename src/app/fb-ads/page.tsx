'use client';

import { useEffect, useState } from 'react';

const FacebookAdsPage = () => {
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [adsData, setAdsData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // This function will initiate the Facebook login flow
  const handleLogin = () => {
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const redirectUri = process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI;
    const loginUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code`;

    // Redirect the user to Facebook's login page
    window.location.href = loginUrl;
  };

  // This function fetches the access token using the authorization code
  const fetchAccessToken = async (code: string) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();

      if (response.ok) {
        setAccessToken(data.accessToken);
        fetchAdsData(data.accessToken); // Fetch ads data once the access token is available
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch access token');
    }
  };

  // This function fetches ad data from Facebook API using the access token
  const fetchAdsData = async (token: string) => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v20.0/<AD_ACCOUNT_ID>/ads?access_token=${token}`
      );
      const data = await response.json();

      if (response.ok) {
        setAdsData(data.data); // Assuming ad data is in `data` field
      } else {
        setError('Failed to fetch ad data');
      }
    } catch (err) {
      setError('Error fetching ad data');
    }
  };

  // Handle the Facebook redirect with the authorization code
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      setAuthCode(code);
      fetchAccessToken(code); // Fetch access token using the authorization code
    }
  }, []);

  return (
    <div className="container">
      <h1>Facebook Ads Page</h1>

      {/* Login button */}
      {!authCode && <button onClick={handleLogin}>Login with Facebook</button>}

      {/* Display access token */}
      {accessToken && <p>Access Token: {accessToken}</p>}

      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Ads Data */}
      {adsData.length > 0 && (
        <div>
          <h2>Fetched Ads Data</h2>
          <ul>
            {adsData.map((ad) => (
              <li key={ad.id}>
                <h3>{ad.name}</h3>
                <p>ID: {ad.id}</p>
                <p>Status: {ad.status}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FacebookAdsPage;
