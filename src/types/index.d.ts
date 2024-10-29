/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};


declare type Accounts = {
    id: string;
    availableBalance: number;
    currentBalance: number;
    officialName: string;
    mask: string;
    institutionId: string;
    name: string;
    type: string;
    subtype: string;
    appwriteItemId: string;
    shareableId: string;
  };

declare interface getUserInfoProps {
    userId: string;
}

// Actions
declare interface getAccountsProps {
    userId: string;
    accessToken?: string;
}

declare interface fetchFacebookCampaignInsights {
    adAccountId: string;
    accessToken: string;
};
declare interface getAdAccountsProps {
    userId: string;
}

interface GetAdAccountProps {
    adAccountId: string;
}

declare type Campaign = {
    campaign_id: string;
    name: string;
    leads: number;
    spend: number;
    impressions: number;
    reach: number;
    clicks: number;
    ctr: number;
    cpc: number;
    cpm: number;
    conversions: number;
    cost_per_action?: { [key: string]: number };
};

declare type FbAccountData = {
    id: string;
    user_id: string;
    last_updated: string;
}
