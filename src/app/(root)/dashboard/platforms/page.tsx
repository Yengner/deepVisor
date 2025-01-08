import { fetchIntegratedPlatforms } from '@/lib/api/fetchIntegratedPlatforms';
import IntegratedPlatforms from '@/components/dashboard/IntegratedPlatforms';
import Recommendations from '@/components/dashboard/Recommendations';
import FeaturedCampaigns from '@/components/dashboard/FeaturedCampaigns';
import TopPlatforms from '@/components/dashboard/TopPlatforms';
import TopPlatformCard from '@/components/dashboard/TopPlatform';
import { getTopPlatforms } from '@/lib/api/getTopPlatforms';
import { getTopCampaignsForPlatforms } from '@/lib/api/platforms/fetchFeaturedCampaigns';
import { fetchRecommendations } from '@/lib/api/openai.ts/recommendations';
import ConversionsBreakdownChart from '@/components/dashboard/TopPlatformsChart';
import QuickActions from '@/components/dashboard/QuickActions';
import { getLoggedInUser } from '@/lib/actions/user.actions';


export default async function DashboardPage() {
  
  const loggedIn = await getLoggedInUser();
  const userId = loggedIn.id;
  const platforms = await fetchIntegratedPlatforms(userId);
  const featuredPlatformsCampaigns = await getTopCampaignsForPlatforms(userId)
  const { metrics, topPlatform, topPlatforms } = await getTopPlatforms(userId);

  const recommendations = await fetchRecommendations(userId);

  return (
    <div className="space-y-8 p-4">
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
          <FeaturedCampaigns data={featuredPlatformsCampaigns} />
        </div>
        <div className='lg:col-span-1'>
          <Recommendations recommendations={recommendations} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPlatforms platforms={topPlatforms} />
      </div>

      {/* Top Campaigns and Featured Campaigns */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickActions />
        <div className='col-span-2'>
          <ConversionsBreakdownChart metrics={metrics} />

        </div>
      </div>
    </div>
  );
}
