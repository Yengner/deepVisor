// Define the interfaces for ad accounts and account info

interface AdAccount {
    id: string;
    account_status: number;
    account_id: string;
    name: string;
  }
  
  interface AccountInfo {
    id: string;
    name: string;
    category: string;
    category_list: { id: string; name: string }[];
    tasks: string[];
  }
  
  // Fetch access token from the server
  export const fetchAccessToken = async (code: string): Promise<string> => {
    try {
      // API call to fetch access token
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/facebook/access-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching access token.');
      }
  
      const data: { accessToken: string } = await response.json(); // Specify the expected response shape
      return data.accessToken;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching access token.');
    }
  };
  
  // Fetch ad accounts from Facebook using the access token
  export const fetchAdAccounts = async (accessToken: string): Promise<AdAccount[]> => {
    try {
      // API call to fetch ad accounts
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/facebook/ad-accounts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching ad accounts.');
      }
  
      const adAccountsData: { accounts: AdAccount[] } = await response.json();
      return adAccountsData.accounts || [];
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching ad accounts.');
    }
  };
  
  // Fetch detailed account information
  export const fetchAccountInfo = async (accessToken: string): Promise<AccountInfo[]> => {
    try {
      // API call to fetch detailed account information
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/facebook/accounts-info`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching account information.');
      }
  
      const accountInfoData: { accounts: AccountInfo[] } = await response.json();
      return accountInfoData.accounts || [];
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching account information.');
    }
  };
  
  // Fetch both ad accounts and account info concurrently
  export const fetchAdAccountsAndAccountInfo = async (
    accessToken: string
  ): Promise<{ adAccounts: AdAccount[], accountsInfo: AccountInfo[] }> => {
    try {
      const [adAccounts, accountsInfo] = await Promise.all([
        fetchAdAccounts(accessToken),
        fetchAccountInfo(accessToken),
      ]);
  
      return { adAccounts, accountsInfo };
    } catch (error) {
      console.error('Error fetching ad accounts and account info:', error);
      throw new Error('Error fetching ad accounts and account information.');
    }
  };
  