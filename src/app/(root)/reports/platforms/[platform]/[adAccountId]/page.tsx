import ClientDashboard from '@/components/ClientDashboard';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { fetchDashboardMetrics } from '@/lib/api/dashboard';
import { getAdAccountData } from '@/lib/api/adAccount/getAdAccountData';
import { getCampaignData } from '@/lib/api/adAccount/getCampaignData';

interface AdAccountPageProps {
  params: Promise<{
    platform: string;
    adAccountId: string;
  }>;
}

export default async function AdAccountPage({
  params,
}: AdAccountPageProps) {
  try {
    const resolvedParams = await params;
    const { platform, adAccountId } = resolvedParams;

    const loggedIn = await getLoggedInUser();
    const userId = loggedIn.id;

    // const adAccountData = await getAdAccountData(platform, adAccountId, userId);
    // const CampaignData = await getCampaignData(platform, adAccountId, userId);
    
    const dashboardData = await fetchDashboardMetrics(platform, adAccountId, userId);

    return (
      <ClientDashboard dashboardData={dashboardData} />
    );
  } catch (error) {
    console.error('Error resolving params or fetching dashboard data:', error);
    return (<div className="text-red-600">How did you get here?</div>)
  }
}
