'use client';

import FacebookLoginButton from '@/components/fbLogin'; // Adjust the path

const FacebookLoginPage = () => {
  const { handleLogin, accessToken, error } = FacebookLoginButton();

  return (
    <div>
      <h1>Facebook Login</h1>
      <button onClick={handleLogin}>Login with Facebook</button>

      {accessToken && <p>Access Token: {accessToken}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FacebookLoginPage;
