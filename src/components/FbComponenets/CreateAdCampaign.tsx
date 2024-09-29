import { useState } from 'react';

interface CreateCampaignProps {
  accessToken: string;
  adAccountId: string;
}

const CreateCampaign: React.FC<CreateCampaignProps> = ({ accessToken, adAccountId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreateCampaign = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Call the server-side API route to create the campaign
      const response = await fetch('/api/facebook/create-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken, adAccountId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating campaign');
      }

      const data = await response.json();
      setSuccess(true);
      console.log('Campaign created successfully:', data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      console.error('Error creating campaign:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleCreateCampaign} disabled={loading}>
        {loading ? 'Creating Campaign...' : 'Create Campaign'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Campaign created successfully!</p>}
    </div>
  );
};

export default CreateCampaign;
