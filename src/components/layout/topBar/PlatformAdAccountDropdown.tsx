import { createSupabaseClient } from "@/lib/utils/supabase/clients/server";
import ClientDropdown from "./ClientDropdown";


export default async function PlatformAdAccountDropdown({ loggedInUser }: any) {
  const supabase = await createSupabaseClient();

  const userId = loggedInUser?.id;

  const { data: platforms, error: platformError } = await supabase
    .from("platform_integrations")
    .select("id, platform_name")
    .eq("user_id", userId);

  if (platformError) {
    console.error("Error fetching platforms:", platformError.message);
  }

  const { data: adAccounts, error: adAccountError } = await supabase
    .from("ad_accounts")
    .select("id, name, platform_integration_id, ad_account_id")
    .eq("user_id", userId);

  if (adAccountError) {
    console.error("Error fetching ad accounts:", adAccountError.message);
  }

  return (
    <ClientDropdown
      userInfo={loggedInUser}
      platforms={platforms || []}
      adAccounts={adAccounts || []}
    />
  );
}
