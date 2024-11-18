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
    userId: string;
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


// Type for Facebook Page Information
declare interface InfoData {
  id: string; // Facebook Page ID
  name: string; // Facebook Page name
  category?: string; // Category of the page (optional because it might not always be present)
}

// Type for the response from the function
declare interface InsertFbUserDataResponse {
  insertedAdAccounts: AdAccountData[]; // Inserted/updated ad account data
  insertedAccountsInfo: InfoData[]; // Inserted/updated page info data
}

// Type for Social Media Integration Data
declare interface SocialMediaIntegrationData {
  user_id: string; // User ID from Supabase
  platform: string; // Platform name (e.g., 'facebook')
  access_token_id: string; // Foreign key for the access_token table
  is_integrated: boolean; // Whether the platform is integrated
  updated_at?: Date; // Timestamp for the last update
}

// Type for Access Token Insertion
declare interface AccessTokenData {
  user_id: string; // User ID
  facebook_access_token: string; // Facebook access token
  updated_at?: Date; // Timestamp for when the token was last updated
}

interface AdAccount {
  account_id: string; // Facebook Ad Account ID (numeric string)
  id: string;         // Facebook Ad Account Object ID (prefixed with 'act_')
}

interface AdAccountsResponse {
  accounts: AdAccount[]; // Array of AdAccount objects
}

type AdAccountsData = AdAccount[]; // Alias for array of AdAccount

interface AccountInfo {
  id: string;        // Facebook Page ID
  name: string;      // Facebook Page Name
  category: string;  // Page Category
}

interface AdAccount {
  account_id: string; // Facebook Ad Account ID (numeric string)
  id: string;         // Facebook Ad Account Object ID (prefixed with 'act_')
}

type AccountInfoData = AccountInfo[]; // Alias for array of AccountInfo

declare interface getUserAdAccount {
  ad_account_id: string;
}