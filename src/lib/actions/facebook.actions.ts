// Fetch access token from the server
export const fetchAccessToken = async (code: string): Promise<string> => {
    
    try {
      // API call to fetch access token
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/facebook/access-token`, {
        // cache: 'no-store', // Take this out during development
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({code}),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching access token.');
      }
  
      const data = await response.json();
      const accessToken = data.accessToken;

      return accessToken;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching access token.');
    }
}

// Fetch ad accounts from Facebook using the access token
export const fetchAdAccounts = async (accessToken: string): Promise<any> => {
    try {
      // API call to fetch ad accounts
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/facebook/ad-accounts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store', // Take this out during development
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching ad accounts.');
      }
  
      const adAccountsData = await response.json();
      return adAccountsData.accounts || [];
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching ad accounts.');
    }
  };
  
  // Fetch detailed account information from accounts-info route
  export const fetchAccountInfo = async (accessToken: string): Promise<any> => {
    try {
      // API call to fetch detailed account information
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/facebook/accounts-info`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store', // Take this out during development
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching account information.');
      }
  
      const accountInfoData = await response.json();
      return accountInfoData.accounts || [];
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching account information.');
    }
  };
  
  // Function to fetch both ad accounts and account info
  export const fetchAdAccountsAndAccountInfo = async (accessToken: string): Promise<{ adAccounts: any[], accountsInfo: any[] }> => {
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
  