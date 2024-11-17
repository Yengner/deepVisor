'use client';

import { handleFacebookIntegration } from '@/lib/integrations/facebook/facebook.utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FacebookCallbackPage = () => {
  const [loadingMessage, setLoadingMessage] = useState('Initializing integration...');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleFacebookCallback = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      
      try {
        if (!code) {
          throw new Error('Authorization code missing.');
        }

        setLoadingMessage('Fetching access token...');

        const result = await handleFacebookIntegration(code);
        
        if (!result.success) {
          throw new Error(result.error || "Integration failed.");
        }

        setLoadingMessage('Integration successful!');
        setSuccess(true);

        setTimeout(() => {
          router.push('/integration');
        }, 3000);
      } catch (error) {
        console.error('Error during Facebook integration:', error);
        setError('An unexpected error occurred.');
      }
    };

    handleFacebookCallback();
  }, [router]);

  if (error) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-red-600 text-center"
        >
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="mt-4">{error}</p>
          <button
            onClick={() => router.push('/integration')}
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Back to Integrations
          </button>
        </motion.div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="rounded-full border-4 border-green-500 w-16 h-16 flex items-center justify-center">
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
          </div>
          <p className="text-green-600 font-bold mt-4 text-lg">Integration Successful!</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col items-center justify-center h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-blue-500 text-lg">{loadingMessage}</p>
        <motion.div
          className="loader mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};


export default FacebookCallbackPage;
