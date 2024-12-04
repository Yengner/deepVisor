export const fetchCampaigns = async (platform: string, adAccount: string, accessToken: string) => {
    const response = await fetch(`/api/${platform}/campaigns/${adAccount}`, 
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

    if (!response.ok) {
      throw new Error('Error fetching campaigns');
    }
    const campaigns = await response.json();
    return campaigns;
  };
  