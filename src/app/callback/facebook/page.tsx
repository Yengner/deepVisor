'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const FacebookCallbackPage = () => {
  const [loadingMessage, setLoadingMessage] = useState('Initializing integration...');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleFacebookCallback = async () => {
      try {
        const code = new URLSearchParams(window.location.search).get('code');
        if (!code) {
          throw new Error('Authorization code missing.');
        }

        setLoadingMessage('Fetching access token...');

       // Call a server-side API route to handle the code exchange and data fetching
        const response = await fetch(`/api/facebook/callback?code=${code}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Integration failed.');
        }

        // If successful, redirect back to the integrations page
        setLoadingMessage('Integration successful! Redirecting...');
        setTimeout(() => {
          router.push('/integration');
        }, 2000);
      } catch (error) {
        console.error('Error during Facebook integration:', error);
        setError('An unexpected error occurred.');
      }
    };

    handleFacebookCallback();
  }, [router]);

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-red-600 font-bold">Error</h1>
        <p>{error}</p>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => router.push('/integration')}
        >
          Back to Integrations
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <p>{loadingMessage}</p>
    </div>
  );
};

export default FacebookCallbackPage;
