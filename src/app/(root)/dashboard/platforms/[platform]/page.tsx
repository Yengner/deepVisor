import PlatformPages from "@/components/platforms/PlatformPage";
import { getAdAccountsData } from "@/lib/api/getAdAccountsData";
import { getTopCampaignsForAdAccounts } from "@/lib/api/getCampaignsForAdAccount";
import { getPlatformData } from "@/lib/api/getPlatformData";

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ platform: string }>;
}) {
  try {
    // Await the params to resolve the Promise
    const resolvedParams = await params;
    const { platform } = resolvedParams;

    const userId = '6d9a0842-3887-43a0-8909-16589f8eae2a';

    // Fetch data for the platform
    const adAccountsData = await getAdAccountsData(platform, userId);
    const adAccountsLength = adAccountsData.length;
    const topCampaignForAdAccounts = await getTopCampaignsForAdAccounts(platform, userId);
    const metric = await getPlatformData(platform, userId);
    const platformData = {
      ...metric[0],
      ad_accounts_length: adAccountsLength,
    };

    return (
      <div className="space-y-8">
        <PlatformPages
          adAccountsData={adAccountsData}
          topCampaignForAdAccounts={topCampaignForAdAccounts}
          platform={platform}
          platformData={platformData}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching platform data:", error);
    return (
      <div className="text-red-600">
        Failed to load platform data. Please try again later.
      </div>
    );
  }
}
