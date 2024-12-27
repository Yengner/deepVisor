import { fetchIntegratedPlatforms } from '@/lib/api/fetchIntegratedPlatforms';
import { fetchPlatformData } from '@/lib/api/fetchPlatformData';
import PlatformOverviewCard from '@/components/dashboard/PlatformOverviewCard';
import IntegratedPlatforms from '@/components/dashboard/IntegratedPlatforms';
import MetricsComparison from '@/components/dashboard/MetricsComparison';
import TopAccounts from '@/components/dashboard/TopAccounts';
import TopCampaigns from '@/components/dashboard/TopCampaigns';
import PerformanceTrends from '@/components/dashboard/PerformanceTrends';
import Recommendations from '@/components/dashboard/Recommendations';
import SpendBreakdownChart from '@/components/dashboard/SpendBreakdownChart';
import LeadsComparisonChart from '@/components/dashboard/LeadsComparisonChart';
import MetricsTable from '@/components/dashboard/MetricsTable';
import PlatformCampaigns from '@/components/dashboard/FeaturedCampaigns';
import TopPlatforms from '@/components/dashboard/TopPlatforms';
import TopPlatformCard from '@/components/dashboard/TopPlatform';
import CampaignCreation from '@/components/dashboard/CampaignCreation';
import { getTopPlatforms } from '@/lib/api/getTopPlatforms';

export default async function DashboardPage() {
  const userId = '6d9a0842-3887-43a0-8909-16589f8eae2a';

  const platforms = await fetchIntegratedPlatforms(userId);
  // const platformDataPromises = platforms.map((p) => fetchPlatformData(p.platform));
  // const platformData = await Promise.all(platformDataPromises);
  const { metrics, topPlatform, topPlatforms } = await getTopPlatforms(userId);

  const campaignsData = [
    {
      id: 'google',
      name: 'Google',
      campaigns: [
        { title: 'AdWords Campaign A', status: 'Sent', conversion: '40%(1.2k)' },
        { title: 'AdWords Campaign B', status: 'In Queue', conversion: '25%(800)' },
        { title: 'AdWords Campaign C', status: 'Sent', conversion: '50%(2.4k)' },
        { title: 'AdWords Campaign D', status: 'In Draft', conversion: '0.01%(1)' },
        { title: 'AdWords Campaign E', status: 'Sent', conversion: '30%(900)' },
      ],
    },
    {
      id: 'facebook',
      name: 'Facebook',
      campaigns: [
        { title: 'iPhone Giveaway', status: 'Sent', conversion: '37%(247)' },
        { title: 'MacBook Giveaway', status: 'Sent', conversion: '18%(6.4k)' },
        { title: 'Headset Giveaway', status: 'In Queue', conversion: '0%(0)' },
        { title: 'AdSense', status: 'In Draft', conversion: '0.01%(1)' },
        { title: 'Affiliation Program', status: 'Sent', conversion: '12%(2.6k)' },
      ],
    },
    {
      id: 'instagram',
      name: 'Instagram',
      campaigns: [
        { title: 'Campaign A', status: 'Sent', conversion: '50%(3k)' },
        { title: 'Campaign B', status: 'Sent', conversion: '20%(800)' },
        { title: 'Campaign C', status: 'In Queue', conversion: '15%(400)' },
        { title: 'Campaign D', status: 'Sent', conversion: '40%(1k)' },
        { title: 'Campaign E', status: 'In Draft', conversion: '0%(0)' },
      ],
    },
  ];


  const recommendationsData = [
    {
      type: 'text',
      message: 'Consider reallocating budget to high-performing Facebook campaigns.',
    },
    {
      type: 'metric',
      message: 'Impressions on Instagram are up significantly!',
      value: 25,
      icon: '/meta.png', // Example icon for Instagram
    },
    {
      type: 'metric',
      message: 'CTR on TikTok ads has dropped slightly.',
      value: -5,
      icon: '/tiktok.png', // Example icon for TikTok
    },
    {
      type: 'metric',
      message: 'Google Ads ROI is up, generating higher revenue than expected.',
      value: 15,
      icon: '/google.png', // Example icon for Google
    },
    {
      type: 'metric',
      message: 'Engagement on X ads has decreased, adjust targeting.',
      value: -10,
      icon: '/x.png', // Example icon for X (Twitter)
    },
    {
      type: 'metric',
      message: 'Engagement on X ads has decreased, adjust targeting.',
      value: -10,
      icon: '/linkedin.png', // Example icon for X (Twitter)
    },
  ];

  const trendsData = {
    dates: ['2023-12-01', '2023-12-02', '2023-12-03'],
    spend: [1000, 1500, 1200],
    leads: [200, 250, 180],
    impressions: [50000, 60000, 55000],
  };

  const topCampaigns = [
    { name: 'Campaign A', platform: 'facebook', ctr: 3.5, cpc: 1.2, spend: 500 },
    { name: 'Campaign B', platform: 'tiktok', ctr: 2.8, cpc: 1.5, spend: 700 },
  ];


  return (
    <div className="space-y-8">
      {/* Dashboard Header */}

      {/* Integrated Platforms & Spend Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 ">

        <div className="lg:col-span-5">
          <IntegratedPlatforms platforms={platforms} />
        </div>
        <div className="lg:col-span-2">
          <TopPlatformCard topPlatforms={topPlatform} />
        </div>

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-1">
          <PlatformCampaigns platforms={campaignsData} />
        </div>
        <div className='lg:col-span-1'>
          <Recommendations recommendations={recommendationsData} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPlatforms platforms={topPlatforms} />
      </div>

      {/* Top Campaigns and Featured Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TopCampaigns campaigns={topCampaigns} />
        <SpendBreakdownChart metrics={metrics} />
        <LeadsComparisonChart metrics={metrics.map(({ platform_name, total_leads }) => ({ platform_name, total_leads }))} />

      </div>



      {/* Top Accounts and Leads Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceTrends data={trendsData} />
        <CampaignCreation />

      </div>
    </div>
  );
}
