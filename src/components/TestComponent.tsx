import { fetchCampaignStatsFromSupabase } from '@/lib/integrations/facebook/facebook.actions';
import { Line } from 'react-chartjs-2';

const CampaignChart = async ({ adAccountId }: any) => {
  try {
    // Fetch campaign stats from Supabase
    const campaignStats = await fetchCampaignStatsFromSupabase(adAccountId);

    if (!campaignStats || campaignStats.length === 0) {
      return <p>No campaign data found</p>;
    }

    // You can now map the campaign data to display in a chart
    const chartData = {
      labels: campaignStats.map((stat) => `Campaign ${stat.campaign_id}`),
      datasets: [
        {
          label: 'Spend',
          data: campaignStats.map((stat) => stat.spend),
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        },
        {
          label: 'Clicks',
          data: campaignStats.map((stat) => stat.clicks),
          borderColor: 'rgba(153,102,255,1)',
          fill: false,
        },
        {
          label: 'Leads',
          data: campaignStats.map((stat) => stat.leads),
          borderColor: 'rgba(255,159,64,1)',
          fill: false,
        },
      ],
    };

    return (
      <div>
        {/* Assuming you're using Chart.js */}
        <Line data={chartData} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching campaign stats:', error);}
};

export default CampaignChart;
