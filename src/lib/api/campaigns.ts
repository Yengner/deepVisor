export const fetchCampaigns = async (platform: string, adAccount: string) => {
    const response = await fetch(`/api/${platform}/insights/${adAccount}`);
    if (!response.ok) {
      throw new Error('Error fetching campaigns');
    }
    const campaignss = await response.json();
    return campaignss;
  };
  