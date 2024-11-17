'use client';

import { useState } from 'react';

const FacebookBusinessIntegration = () => {
  const [error, setError] = useState('');

  const handleLogin = () => {
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const redirectUri = process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI;
    const configId = process.env.NEXT_PUBLIC_FACEBOOK_CONFIG_ID;

    try {
      const loginUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&config_id=${configId}&response_type=code&override_default_response_type=true`;

      // Redirect to Facebook OAuth login
      window.location.href = loginUrl; // Navigate directly to the login URL
    } catch (err) {
      setError('An error occurred during login.');
    }
  };

  return (
    <div>
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Integrate Facebook Business
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default FacebookBusinessIntegration;
