import PlatformPages from "@/components/platforms/PlatformPage";
import { getAdAccountsData } from "@/lib/api/getAdAccountsData";
import { getTopCampaignsForAdAccounts } from "@/lib/api/getCampaignsForAdAccount";
import { getPlatformData } from "@/lib/api/getPlatformData";

export default async function PlatformPage({ params }: { params: { platform: string } }) {
  const { platform } = await params;

  const userId = '6d9a0842-3887-43a0-8909-16589f8eae2a';
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
      <PlatformPages adAccountsData={adAccountsData} topCampaignForAdAccounts={topCampaignForAdAccounts} platform={platform} platformData={platformData} />
    </div>
  );
}