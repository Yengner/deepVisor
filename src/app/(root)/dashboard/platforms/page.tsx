import { getTopPlatforms } from '@/lib/api/getTopPlatforms';
import { getTopCampaignsForPlatforms } from '@/lib/api/platforms/fetchFeaturedCampaigns';
import { fetchRecommendations } from '@/lib/api/openai.ts/recommendations';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import DashboardComponent from '@/components/dashboard/DashboardComponent';


export default async function DashboardPage() {

  const loggedIn = await getLoggedInUser();
  const userId = loggedIn?.id;
  
  const featuredPlatformsCampaigns = await getTopCampaignsForPlatforms(userId) // Getting the top campaigns for the top platforms
  // const { metrics, topPlatform, topPlatforms } = await getTopPlatforms(userId);
  const metrics = await getTopPlatforms(userId); // Getting the top platform(s) metrics
  const recommendations = await fetchRecommendations(userId); // Getting Chatgpt generated recommendations

  return (
    <DashboardComponent
      featuredPlatformsCampaigns={featuredPlatformsCampaigns}
      Topmetrics={metrics}
      recommendations={recommendations} />
  );
}
