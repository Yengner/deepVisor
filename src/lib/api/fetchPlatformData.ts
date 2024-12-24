interface PlatformOverview {
    name: string;
    totalSpend: number;
    leads: number;
    impressions: number;
    clicks: number;
  }
  
  export async function fetchPlatformData(platform: string): Promise<PlatformOverview> {
    // Simulate fetching overview data for a platform
    // Replace this with actual API calls to fetch platform-specific data
    const mockData = {
      facebook: { name: 'Facebook', totalSpend: 1500, leads: 200, impressions: 50000, clicks: 1000 },
      tiktok: { name: 'TikTok', totalSpend: 1200, leads: 150, impressions: 30000, clicks: 800 },
      instagram: { name: 'Instagram', totalSpend: 1800, leads: 250, impressions: 60000, clicks: 1200 },
    };
  
    return mockData[platform] || { name: platform, totalSpend: 0, leads: 0, impressions: 0, clicks: 0 };
  }
  