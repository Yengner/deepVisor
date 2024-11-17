import { getLoggedInUser } from "@/lib/actions/user.actions";
// import ECommerce from "@/components/Dashboard/Marketing";
import { getFbAdAccount, getFbAdAccounts } from "@/lib/actions/facebook/facebook.actions";

const Dashboard = async({ searchParams: { id }}:SearchParamProps) => {
  // const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const userId = loggedIn.id;
  const fBAdAccounts = await getFbAdAccounts({ userId });
  
  if(!fBAdAccounts) return;

  const fBAdAccountsData = fBAdAccounts?.data;
  const adAccountId = (id as string) || fBAdAccountsData[0]?.adAccountId;

  const account = await getFbAdAccount({ adAccountId, userId });

  const safeAccount = {
    ...account,
    accountInfo: account.accountInfo || [], // Fallback to empty array if `null`
  };
  // fBAdAccounts.data.forEach(adAccount => {
  //   console.log(`Ad Account Id: ${adAccount.adAccountId}`);
  //   console.log('Campaigns:', adAccount.campaigns)
  // })
  
  const adAccountCampaigns = account.campaigns
  return (
    <h1>dashboard</h1>
    // <ECommerce 
    // campaignInsights={adAccountCampaigns} 
    // accounts={fBAdAccountsData} 
    // currentAccount={safeAccount} 
    // userId={userId}
    // />
  );
};

export default Dashboard;