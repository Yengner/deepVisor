'use client';

import { useEffect, useState } from 'react';

const FacebookLoginPage = () => {
  const [accessToken, setAccessToken] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Load Facebook SDK
    window.fbAsyncInit = function () {
      FB.init({
        appId: process.env.FACEBOOK_APP_ID, // Your App ID
        cookie: true,  // Enable cookies to allow the server to access the session
        xfbml: true,  // Parse social plugins on this webpage
        version: 'v20.0',  // Use this Graph API version
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const handleLogin = () => {
    const config_id = process.env.FACEBOOK_CONFIG_ID
    FB.login(
      function (response) {
        if (response.authResponse) {
          console.log('Successfully logged in', response);
          setAccessToken(response.authResponse.accessToken);
          // Exchange this access token with your backend if necessary
        } else {
          console.log('User cancelled login or did not fully authorize.');
          setError('Login cancelled or not authorized.');
        }
      },
      {
        config_id: config_id, // Replace with your configuration ID for Facebook Login for Business
        response_type: 'code',
        override_default_response_type: true,
      }
    );
  };

  return { handleLogin, accessToken, error }; // Returning the necessary values

};

export default FacebookLoginPage;
