import { getLoggedInUser } from "@/lib/actions/user.actions";
import ECommerce from "@/components/Dashboard/E-commerce";
import { getFbAdAccount, getFbAdAccounts } from "@/lib/integrations/facebook/facebook.actions";
import Header from "@/components/Header";

const Test = async({ searchParams: { id, page }}:SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const fBAdAccounts = await getFbAdAccounts({ userId: loggedIn.id });
  
  if(!fBAdAccounts) return;

  const fBAdAccountsData = fBAdAccounts?.data;
  const adAccountId = (id as string) || fBAdAccountsData[0]?.adAccountId;

  const account = await getFbAdAccount({ adAccountId });


  // fBAdAccounts.data.forEach(adAccount => {
  //   console.log(`Ad Account Id: ${adAccount.adAccountId}`);
  //   console.log('Campaigns:', adAccount.campaigns)
  // })
  
  const adAccountCampaigns = account.campaigns
  
  return (
    <ECommerce campaignInsights={adAccountCampaigns} accounts={fBAdAccountsData} currentAccount={account}/>
  );
};

export default Test;