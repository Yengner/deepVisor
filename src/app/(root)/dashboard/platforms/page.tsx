import { fetchIntegratedPlatforms } from '@/lib/api/fetchIntegratedPlatforms';
import { getTopPlatforms } from '@/lib/api/getTopPlatforms';
import { getTopCampaignsForPlatforms } from '@/lib/api/platforms/fetchFeaturedCampaigns';
import { fetchRecommendations } from '@/lib/api/openai.ts/recommendations';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import DashboardComponent from '@/components/dashboard/DashboardComponent';


export default async function DashboardPage() {

  const loggedIn = await getLoggedInUser();
  const userId = loggedIn?.id;
  const platforms = await fetchIntegratedPlatforms(userId);
  const featuredPlatformsCampaigns = await getTopCampaignsForPlatforms(userId)
  // const { metrics, topPlatform, topPlatforms } = await getTopPlatforms(userId);
  const metrics = await getTopPlatforms(userId);

  const recommendations = await fetchRecommendations(userId);

  return (
    <DashboardComponent 
    platforms={platforms} 
    featuredPlatformsCampaigns={featuredPlatformsCampaigns} 
    Topmetrics={metrics} 
    recommendations={recommendations} />
  );
}
