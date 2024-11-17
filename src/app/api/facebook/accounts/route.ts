import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Define interfaces for the account data
interface FacebookAccount {
  id: string;
  name: string;
  category: string;
}

interface AccountsResponse {
  data: { id: string }[];
}

export async function GET(req: NextRequest) {
  console.log('API route hit');
  
  // Extract the access token from the request headers
  const accessToken = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!accessToken) {
    return NextResponse.json({ error: 'Access token is required' }, { status: 401 });
  }

  try {
    // Fetch business accounts
    const accountsResponse = await axios.get<AccountsResponse>('https://graph.facebook.com/v20.0/me/accounts', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const accounts = accountsResponse.data.data;

    // Fetch detailed information for each account
    const accountDetailsPromises = accounts.map(async (account): Promise<FacebookAccount> => {
      const accountDetailResponse = await axios.get<FacebookAccount>(`https://graph.facebook.com/v20.0/${account.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          fields: 'id,name,category', 
        },
      });

      return accountDetailResponse.data;
    });

    const accountsDetails = await Promise.all(accountDetailsPromises);

    return NextResponse.json({ accounts: accountsDetails });
  } catch (error) {
    console.error('Error fetching account details:', error);
    return NextResponse.json({ error: 'Failed to fetch account details' }, { status: 500 });
  }
}
