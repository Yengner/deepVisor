import { getLoggedInUser } from '@/lib/actions/user.actions';
import { getAdAccountData } from '@/lib/api/adAccount/getAdAccountData';
import { getCampaignData } from '@/lib/api/adAccount/getCampaignData';
import AdAccountDashboard from '@/components/AdAccountDashboard';

interface AdAccountPageProps {
  params: {
    platform: string;
    adAccountId: string;
  };
}

export default async function AdAccountPage({ params }: AdAccountPageProps) {
  try {
    params = await params;
    if (!params?.platform || !params?.adAccountId) {
      throw new Error("Missing parameters.");
    }

    const loggedIn = await getLoggedInUser();
    if (!loggedIn) throw new Error("User not logged in.");

    const userId = loggedIn.id;

    // Fetch data in parallel for better performance
    const [adAccountData, campaignData] = await Promise.all([
      getAdAccountData(params.platform, params.adAccountId, userId),
      getCampaignData(params.platform, params.adAccountId, userId),
    ]);

    return (
      <div>
        <AdAccountDashboard adAccountData={adAccountData} campaignData={campaignData} />
      </div>
    );
  } catch (error) {
    console.error('Error in AdAccountPage:', error);
    return (
      <div className="text-red-600 font-bold p-4">
        Error loading data. Please try again later.
      </div>
    );
  }
}
