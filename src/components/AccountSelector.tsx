import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface CampaignData {
  campaign_id: string;
  name: string;
}

interface AccountInfo {
  facebook_page_id: string;
  facebook_page_name: string;
  category: string;
}
interface Account {
  adAccountId: string;
  campaigns: CampaignData[]; 
  accountInfo: AccountInfo[];
}

interface SelectAccountProps {
  accounts: Account[];
  currentAccount: Account;
  onAccountChange: (adAccountId: string, campaignId: string) => void;
}

export function SelectAccount({
  accounts,
  currentAccount,
  onAccountChange,
}: SelectAccountProps) {
  const router = useRouter();
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | undefined>(
    currentAccount.campaigns[0]?.campaign_id
  );

  useEffect(() => {
    if (currentAccount.adAccountId && selectedCampaignId) {
      // Trigger account and campaign selection for external use
      onAccountChange(currentAccount.adAccountId, selectedCampaignId);
    }
  }, [currentAccount.adAccountId, selectedCampaignId, onAccountChange]);

  const handleAccountChange = (adAccountId: string) => {
    const selectedAccount = accounts.find((account) => account.adAccountId === adAccountId);
    const initialCampaignId = selectedAccount?.campaigns[0]?.campaign_id;

    setSelectedCampaignId(initialCampaignId);
    router.push(`/?id=${adAccountId}`);
  };

  const handleCampaignChange = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    onAccountChange(currentAccount.adAccountId, campaignId);
  };
  const currentAccountDisplayName = `${currentAccount.accountInfo[0]?.facebook_page_name || 'Unknown Page'} (${currentAccount.adAccountId})`;
  const currentCampaigns = accounts.find((account) => account.adAccountId === currentAccount.adAccountId)?.campaigns || [];
  return (
    <div className="flex flex-row gap-4">
      {/* Ad Account Dropdown */}
      <Select onValueChange={handleAccountChange} defaultValue={currentAccount.adAccountId}>
        <SelectTrigger className="w-[200px] bg-gray-3 justify-between">
          <SelectValue placeholder={currentAccountDisplayName || "Select Account"} />
        </SelectTrigger>
        <SelectContent className="bg-gray-3">
          <SelectGroup>
            <SelectLabel>Accounts</SelectLabel>
            {accounts.map((account) => (
              <SelectItem
                key={account.adAccountId}
                value={account.adAccountId}
                className={`cursor-pointer ${currentAccount.adAccountId === account.adAccountId ? "text-primaryBlue bg-primaryBlue" : ""}`}
              >
                {currentAccountDisplayName || 'Unknown Page'}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Campaign Dropdown */}
      {currentCampaigns.length > 0 && (
        <Select onValueChange={handleCampaignChange} defaultValue={selectedCampaignId}>
          <SelectTrigger className="w-[200px] bg-gray-3 justify-between">
            <SelectValue placeholder={selectedCampaignId ? `Campaign: ${selectedCampaignId}` : "Select Campaign"} />
          </SelectTrigger>
          <SelectContent className="bg-gray-3">
            <SelectGroup>
              <SelectLabel>Campaigns</SelectLabel>
              {currentCampaigns.map((campaign) => (
                <SelectItem key={campaign.campaign_id} value={campaign.campaign_id}>
                  {campaign.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
